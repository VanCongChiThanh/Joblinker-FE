import { createRouter, createWebHistory } from "vue-router";
import { clientRoutes } from "./clientRoutes";
import { authRoutes } from "./authRoutes";
import store from "@/store";
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
router.beforeEach(async (to, from, next) => {
  await store.dispatch("auth/checkAuthentication");
  const isAuthenticated = store.getters["auth/isAuthenticated"];
  const requiredRole = to.meta.requiredRole;
  const user = store.getters["auth/user"];

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: "login" });
  }

  if (requiredRole && (!user || user.role !== requiredRole)) {
    return next({ name: "forbidden" });
  }

  next();
});


export default router;
