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
    path: "/my-jobs",
    component: DashboardLayout,
    children: [
      {
        path: "",
        name: "My Job",
        component: () => import("@/layout/MyJobLayout.vue"),
        children: [
          {
            path: "applied-jobs",
            name: "Applied Jobs",
            component: () => import("@/views/client/User/AppliedJobs.vue"),
          },
          {
            path: "",
            name: "Saved Jobs",
            component: () => import("@/views/client/User/SavedJobs.vue"),
          },
          {
            path: "recent-viewed-jobs",
            name: "Recent Viewed Jobs",
            component: () => import("@/views/client/User/RecentViewedJobs.vue"),
          },
        ],
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
  {
    path: "/job-apply/:id?",
    name: "JobApply",
    props: (route) => ({
      jobId: route.params.id ? route.params.id : null,
    }),
    component: () => import("@/views/client/User/JobApply.vue"),
    meta: { requiresAuth: true, requiredRole: "USER" },
  },
  {
    path: "/email-subscriptions",
    component: DashboardLayout,
    children: [
      {
        path: "",
        name: "EmailSubscription",
        component: () => import("@/views/client/User/EmailSubscription.vue"),
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
    path: "/company-management",
    component: DashboardLayout,
    children: [
      {
        path: "",
        name: "EmployerDashboard",
        component: () => import("@/views/client/Employer/CompanyManage.vue"),
      },
    ],
    meta: { requiresAuth: true, requiredRole: "EMPLOYER" },
  },
  {
    path: "/job-management",
    component: DashboardLayout,
    children: [
      {
        path: "",
        name: "JobDashboard",
        component: () => import("@/views/client/Employer/JobManage.vue"),
      },
    ],
    meta: { requiresAuth: true, requiredRole: "EMPLOYER" },
  },
  {
    path: "/resume-management/:jobId?",
    component: DashboardLayout,
    children: [
      {
        path: "",
        name: "ResumeManagement",
        component: () => import("@/views/client/Employer/ResumeManage.vue"),
      },
    ],
    meta: { requiresAuth: true, requiredRole: "EMPLOYER" },
  },
  {
    path: "/job-form/:id?",
    name: "JobForm",
    props: (route) => ({
      jobId: route.params.id ? route.params.id : null,
    }),
    component: () => import("@/views/client/Employer/JobForm.vue"),
    meta: { requiresAuth: true, requiredRole: "EMPLOYER" },
  },

  {
    path: "/forbidden",
    name: "forbidden",
    component: () => import("@/views/Error/Forbidden.vue"),
  },
];
