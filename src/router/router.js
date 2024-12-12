// router/router.js
import { createRouter, createWebHistory } from "vue-router"; // Import các phương thức từ vue-router
import Home from "@/components/client/Home.vue";
import JobDetails from "@/components/client/JobDetails.vue";

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
  }
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
