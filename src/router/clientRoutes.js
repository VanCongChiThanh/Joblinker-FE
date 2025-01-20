import UserDashboardLayout from "@/layout/UserDashboardLayout.vue";
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
  {
    path: "/dashboard",
    component: UserDashboardLayout,
    children: [
      {
        path: "",
        name: "Dashboard",
        component: () => import("@/views/client/User/UserDashboard.vue"),
      },
    ],
  },
  {
    path: "/cv-attachment",
    component: UserDashboardLayout,
    children: [
      {
        path: "",
        name: "CVAttachment",
        component: () => import("@/views/client/User/UserCV.vue"),
      },
    ],
  },
  {
    path: "/profile",
    component: UserDashboardLayout,
    children: [
      {
        path: "",
        name: "Profile",
        component: () => import("@/views/client/User/UserProfile.vue"),
      },
    ],
  },
];
