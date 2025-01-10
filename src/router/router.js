// router/router.js
import { createRouter, createWebHistory } from "vue-router"; 
import Home from "@/components/client/Home.vue";
import LoginPage from "@/views/client/LoginPage.vue";
import RegisterPage from "@/views/client/RegisterPage.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
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
  {
    path: "/job-detail/:id",
    name: "job-detail",
    component: () => import("@/views/client/JobDetail.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), 
  routes, 
});

router.scrollBehavior = function (to) {
  if (to.hash) {
    return {
      el: to.hash, 
    };
  }
};

export default router;
