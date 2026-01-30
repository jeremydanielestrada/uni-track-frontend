import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  withCredentials: true,
});

// interceptor to include token in all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Let Axios set multipart boundaries automatically
  if (config.data instanceof FormData) {
    config.headers?.delete?.("Content-Type");
    delete config.headers?.["Content-Type"];
  } else {
    config.headers = config.headers ?? {};
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});
