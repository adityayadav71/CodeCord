export const BASE_URL =
  import.meta.env.MODE === "production"
    ? "code-cord-backend.vercel.app/api/v1"
    : "/api/v1";

export const SOCKET_URL = 
    import.meta.env.MODE === "production"
      ? "code-cord-backend.vercel.app/"
      : "http://localhost:5000/";
