import axios from "axios";
import secure from "./secure";

export const ADDRESS = "192.168.137.1:8000";
// export const ADDRESS = "localhost:8000";
// export const ADDRESS = 'b86a5b2b71d6.ngrok-free.app'

const api = axios.create({
  baseURL: "http://" + ADDRESS,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    try {
      const tokens = await secure.get("tokens");
      if (tokens?.access) {
        config.headers.Authorization = `Bearer ${tokens.access}`;
      }
    } catch (error) {
      console.error("Error getting tokens:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const tokens = await secure.get("tokens");
        if (tokens?.refresh) {
          const response = await axios.post(`http://${ADDRESS}/api/token/refresh/`, {
            refresh: tokens.refresh,
          });

          const newTokens = {
            access: response.data.access,
            refresh: tokens.refresh,
          };

          await secure.set("tokens", newTokens);

          originalRequest.headers.Authorization = `Bearer ${newTokens.access}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // Clear invalid tokens
        await secure.remove("tokens");
        await secure.remove("credentials");
      }
    }

    return Promise.reject(error);
  }
);

export default api;