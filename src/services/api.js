import axios from "axios";
import authService from "./authService";
const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
apiClient.interceptors.response.use(
  (response) => response, 
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {

        await authService.refreshToken();

        const newToken = localStorage.getItem("access_token");
        error.config.headers["Authorization"] = `Bearer ${newToken}`;

        return apiClient.request(error.config);
      } catch (refreshError) {
        console.error("Unable to refresh token:", refreshError);
        await authService.logout();
        window.location.href = "/login"; 
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
export default apiClient;
