<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <p>Đang xác thực, vui lòng chờ...</p>
  </div>
</template>

<script>
export default {
  mounted() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get("token");

      if (accessToken && accessToken.trim() !== "") {
        localStorage.setItem("access_token", accessToken);
        this.$router.replace("/"); // Sử dụng replace để tránh lưu lịch sử redirect
      } else {
        console.warn("Không tìm thấy token hợp lệ!");
        this.$router.replace("/login"); // Chuyển hướng về trang đăng nhập
      }
    } catch (error) {
      console.error("Lỗi khi xử lý token:", error);
      this.$router.replace("/login");
    }
  },
};
</script>

<style scoped>
/* Căn giữa nội dung khi đang load */
.d-flex {
  display: flex;
}
.vh-100 {
  height: 100vh;
}
</style>

