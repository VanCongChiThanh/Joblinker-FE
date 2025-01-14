import apiClient from "./api";

const authService = {
  async login(username, password) {
    try {
      const response = await apiClient.post("/auth/login", {
        username,
        password,
      });
      const token = response.data.data.access_token;

      localStorage.setItem("access_token", token);

      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  },
  async refreshToken() {
    try {
      const response = await apiClient.get("/auth/refresh");
      const newAccessToken = response.data.data.access_token;

      localStorage.setItem("access_token", newAccessToken);

      return newAccessToken;
    } catch (error) {
      console.error("Token refresh failed:", error);
      throw error;
    }
  },
  async fetchUser() {
    try {
      const response = await apiClient.get("/auth/account");
      return response.data.data.user;
    } catch (error) {
      console.error("Failed to fetch user:", error);
      throw error;
    }
  },
  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },
  async register({ name, email, password }) {
    try {
      const response = await apiClient.post("/auth/register", {
        name,
        email,
        password,
        role: {
          id: 3, // Role user(default)
        },
      });
      return response.data;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  },
};

export default authService;
