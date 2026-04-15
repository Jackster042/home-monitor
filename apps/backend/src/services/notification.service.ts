const notifications = [
  {
    id: "notif_demo_001",
    type: "daily-digest",
    channel: "email",
    status: "planned"
  }
];

export const notificationService = {
  list() {
    return notifications;
  }
};
