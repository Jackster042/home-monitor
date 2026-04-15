const events = [
  {
    id: "evt_demo_001",
    cameraId: "front-door",
    type: "motion",
    startedAt: new Date().toISOString(),
    hasClip: false,
    hasSnapshot: false
  }
];

export const eventService = {
  list() {
    return events;
  },
  getById(eventId: string) {
    return events.find((event) => event.id === eventId) ?? null;
  }
};
