import apiClient from "./api"; // Đảm bảo rằng bạn có apiClient đúng cách

const authService = {
  // Đăng nhập
  async login(username, password) {
    try {
      const response = await apiClient.post("/auth/login", {
        username,
        password,
      });
      const user = response.data.data.user;
      const token = response.data.data.access_token;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("access_token", token);

      return user;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  },

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
  },
};

export default authService;
