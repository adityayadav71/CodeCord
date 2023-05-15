export const BASE_URL =
  import.meta.env.MODE === "production" ? import.meta.env.VITE_API_URL : "/api/v1";
