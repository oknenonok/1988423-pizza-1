import { getView } from "@/common/helpers";

export default [
  {
    path: "/",
    name: "Index",
    component: getView("Index"),
  },
  {
    path: "/Login",
    name: "Login",
    component: getView("Login"),
    meta: { layout: "AppLayoutClean" },
  },
  {
    path: "/cart",
    name: "Cart",
    component: getView("Cart"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: getView("Profile"),
    meta: { layout: "AppLayoutAccount" },
  },
  {
    path: "/orders",
    name: "Orders",
    component: getView("Orders"),
    meta: { layout: "AppLayoutAccount" },
  },
];
