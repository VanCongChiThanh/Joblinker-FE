<template>
  <div class="forbidden-page text-center">
    <h1 class="text-danger">403</h1>
    <p class="text-muted">Bạn không có quyền truy cập vào trang này.</p>
    <router-link to="/" class="btn btn-primary">Quay về trang chủ</router-link>
  </div>
</template>

<script>
export default {
  name: "ForbiddenView",
};
</script>

<style scoped>
.forbidden-page {
  margin-top: 10%;
}
h1 {
  font-size: 5rem;
}
</style>
