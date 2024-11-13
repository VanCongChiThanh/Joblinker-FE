const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8081, // Cổng mà bạn muốn ứng dụng Vue.js chạy trên đó
    proxy: {
      "/api": {
        target: "http://localhost:8080", // Cấu hình proxy cho API nếu cần
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
