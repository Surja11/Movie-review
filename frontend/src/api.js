import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use((config)=>{
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (token){
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
},(error)=>{return Promise.reject(error)})


api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;


    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem(REFRESH_TOKEN);
      if (!refreshToken) return Promise.reject(error);

      try {
        const res = await api.post("/auth/token/refresh/", { refresh: refreshToken });
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        api.defaults.headers.common["Authorization"] = `Bearer ${res.data.access}`;
        return api(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
export default api;