import axios from "axios";

const AUTH_STORAGE_KEY = "letti-auth-user";
const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";
const apiBaseUrl = rawApiBaseUrl.replace(/\/+$/, "");

const instance = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  if (typeof window === "undefined") {
    return config;
  }

  try {
    const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    const parsedAuth = savedAuth ? JSON.parse(savedAuth) : null;
    const token = parsedAuth?.token ?? null;

    if (token) {
      config.headers.Authorization = `Token ${token}`;
    } else if (config.headers?.Authorization) {
      delete config.headers.Authorization;
    }
  } catch {
    // ignore local storage parse issues
  }

  return config;
});

export default instance;
