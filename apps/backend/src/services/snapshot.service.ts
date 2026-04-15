const snapshots = [
  {
    id: "snap_demo_001",
    eventId: "evt_demo_001",
    status: "planned"
  }
];

export const snapshotService = {
  list() {
    return snapshots;
  }
};
