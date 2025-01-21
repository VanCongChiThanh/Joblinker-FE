import DashboardLayout from "@/layout/DashboardLayout.vue";
export const clientRoutes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/components/client/Home.vue"),
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
  //user
  {
    path: "/dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "",
        name: "Dashboard",
        component: () => import("@/views/client/User/UserDashboard.vue"),
      },
    ],
    meta: { requiresAuth: true, requiredRole: "USER" },
  },
  {
    path: "/cv-attachment",
    component: DashboardLayout,
    children: [
      {
        path: "",
        name: "CVAttachment",
        component: () => import("@/views/client/User/UserCV.vue"),
      },
    ],
    meta: { requiresAuth: true, requiredRole: "USER" },
  },
  {
    path: "/profile",
    component: DashboardLayout,
    children: [
      {
        path: "",
        name: "Profile",
        component: () => import("@/views/client/User/UserProfile.vue"),
      },
    ],
    meta: { requiresAuth: true, requiredRole: "USER" },
  },
  //employer
  {
    path: "/employer-dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "",
        name: "EmployerDashboard",
        component: () =>
          import("@/views/client/Employer/EmployerDashboard.vue"),
      },
    ],
    meta: { requiresAuth: true, requiredRole: "EMPLOYER" },
  },
  {
    path: "/manage-company",
    component: DashboardLayout,
    children: [
      {
        path: "",
        name: "EmployerDashboard",
        component: () =>
          import("@/views/client/Employer/CompanyManage.vue"),
      },
    ],
    meta: { requiresAuth: true, requiredRole: "EMPLOYER" },
  },
  {
    path: "/forbidden",
    name: "forbidden",
    component: () => import("@/views/Error/Forbidden.vue"),
  },
];
