import { api } from "../../../src/lib/api";

export const userService = {
  getProfile: () => api.get("/api/profile"),
  updateProfile: (data: any) => api.post("/api/profile", data),
  // Add more user-related API calls here
};
