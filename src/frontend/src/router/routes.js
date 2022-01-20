import getView from "@/common/helpers/getView";
import { auth, isLoggedIn } from "@/middlewares";

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
    meta: {
      layout: "AppLayoutClean",
      middlewares: [isLoggedIn],
    },
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
    meta: {
      layout: "AppLayoutAccount",
      middlewares: [auth],
    },
  },
  {
    path: "/orders",
    name: "Orders",
    component: getView("Orders"),
    meta: {
      layout: "AppLayoutAccount",
      middlewares: [auth],
    },
  },
];
