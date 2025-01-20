export const authRoutes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/client/LoginPage.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/client/RegisterPage.vue"),
  },
];
