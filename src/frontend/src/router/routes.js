export default [
  {
    path: "/",
    name: "Index",
    component: () => import("@/views/Index.vue"),
  },
  {
    path: "/Login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
    meta: { layout: "AppLayoutClean" },
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("@/views/Cart.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile.vue"),
    meta: { layout: "AppLayoutAccount" },
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("@/views/Orders.vue"),
    meta: { layout: "AppLayoutAccount" },
  },
];
