import { createRouter, createWebHistory } from "vue-router";
import { clientRoutes } from "./clientRoutes";
import { authRoutes } from "./authRoutes";

const routes = [
  ...clientRoutes, 
  ...authRoutes, 
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
