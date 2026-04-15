const cameras = [
  {
    id: "front-door",
    name: "Front Door",
    location: "Entrance",
    status: "planned"
  }
];

export const cameraService = {
  list() {
    return cameras;
  }
};
