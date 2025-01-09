// router/router.js
import { createRouter, createWebHistory } from "vue-router"; // Import các phương thức từ vue-router
import Home from "@/components/client/Home.vue";
import JobDetails from "@/components/client/JobDetails.vue";
import LoginPage from "@/views/client/LoginPage.vue";
import RegisterPage from "@/views/client/RegisterPage.vue";
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
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
  },
  {
    path: "/search",
    name: "searchpage",
    component: () => import("@/views/client/SearchPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), 
  routes, 
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
