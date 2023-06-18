export const BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://codecord.tech/api/v1"
    : "/api/v1";

export const SOCKET_URL = 
    import.meta.env.MODE === "production"
      ? "https://codecord.tech/"
      : "http://localhost:5000/";
