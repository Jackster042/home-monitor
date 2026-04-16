import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "../db/client";

const mockEventSchema = z.object({
  cameraKey: z.string().min(1),
  cameraName: z.string().min(1).optional(),
  location: z.string().min(1).optional(),
  type: z.string().min(1).default("motion"),
  startedAt: z.coerce.date().optional(),
  endedAt: z.coerce.date().optional(),
  hasSnapshot: z.boolean().default(true),
  hasClip: z.boolean().default(false)
});

type EventRecord = Prisma.EventGetPayload<{
  include: {
    camera: true;
    snapshots: {
      select: { id: true };
    };
    clips: {
      select: { id: true };
    };
  };
}>;

function mapEvent(event: EventRecord) {
  return {
    id: event.id,
    frigateEventId: event.frigateEventId,
    cameraId: event.cameraId,
    camera: {
      id: event.camera.id,
      name: event.camera.name,
      location: event.camera.location,
      status: event.camera.status
    },
    type: event.type,
    startedAt: event.startedAt.toISOString(),
    endedAt: event.endedAt?.toISOString() ?? null,
    acknowledgedAt: event.acknowledgedAt?.toISOString() ?? null,
    hasSnapshot: event.snapshots.length > 0,
    hasClip: event.clips.length > 0,
    snapshotCount: event.snapshots.length,
    clipCount: event.clips.length,
    createdAt: event.createdAt.toISOString(),
    updatedAt: event.updatedAt.toISOString()
  };
}

export const eventService = {
  async list() {
    const events = await prisma.event.findMany({
      include: {
        camera: true,
        snapshots: {
          select: { id: true }
        },
        clips: {
          select: { id: true }
        }
      },
      orderBy: {
        startedAt: "desc"
      }
    });

    return events.map((event) => mapEvent(event));
  },

  async getById(eventId: string) {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        camera: true,
        snapshots: {
          select: { id: true }
        },
        clips: {
          select: { id: true }
        }
      }
    });

    return event ? mapEvent(event) : null;
  },

  async ingestMock(input: unknown) {
    const parsed = mockEventSchema.parse(input);
    const startedAt = parsed.startedAt ?? new Date();

    const result = await prisma.$transaction(async (transaction) => {
      const camera = await transaction.camera.upsert({
        where: { frigateName: parsed.cameraKey },
        update: {
          name: parsed.cameraName ?? parsed.cameraKey,
          location: parsed.location
        },
        create: {
          name: parsed.cameraName ?? parsed.cameraKey,
          location: parsed.location,
          frigateName: parsed.cameraKey,
          status: "mocked"
        }
      });

      const event = await transaction.event.create({
        data: {
          frigateEventId: `mock_${camera.frigateName}_${Date.now()}`,
          cameraId: camera.id,
          type: parsed.type,
          startedAt,
          endedAt: parsed.endedAt,
          snapshots: parsed.hasSnapshot
            ? {
                create: {
                  localPath: `mock://snapshots/${camera.frigateName}-${Date.now()}.jpg`
                }
              }
            : undefined,
          clips: parsed.hasClip
            ? {
                create: {
                  localPath: `mock://clips/${camera.frigateName}-${Date.now()}.mp4`,
                  durationSec: 0
                }
              }
            : undefined
        },
        include: {
          camera: true,
          snapshots: {
            select: { id: true }
          },
          clips: {
            select: { id: true }
          }
        }
      });

      return event;
    });

    return mapEvent(result);
  }
};
