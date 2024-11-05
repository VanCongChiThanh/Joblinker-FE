// router/router.js
import { createRouter, createWebHistory } from "vue-router"; // Import các phương thức từ vue-router
import Home from "@/components/client/Home.vue";
import JobDetails from "@/components/client/JobDetails/JobDetails.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/position/:id",
    name: "description",
    component: JobDetails,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/client/AboutPage.vue"), // Lazy-loaded
  },
];

// Tạo router với cấu hình
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // Sử dụng createWebHistory
  routes, // Đưa vào danh sách routes đã định nghĩa
});

// Cấu hình scrollBehavior
router.scrollBehavior = function (to) {
  if (to.hash) {
    return {
      el: to.hash, // Cập nhật để sử dụng el thay vì selector
    };
  }
};

// Xuất router
export default router;
