import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "@/store";
import { middlewarePipeline } from "@/middlewares";
import { FMiddleware } from "@/common/types";

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: "history",
});

router.beforeEach((to, from, next) => {
  if (to.meta) {
    const middlewares: FMiddleware[] = to.meta.middlewares;
    if (!middlewares?.length) {
      return next();
    }

    const context = { to, from, next, store };
    const firstMiddlewareIndex = 0;
    const nextMiddlewareIndex = 1;
    return middlewares[firstMiddlewareIndex]({
      ...context,
      nextMiddleware: middlewarePipeline(
        context,
        middlewares,
        nextMiddlewareIndex
      ),
    });
  }
});

router.afterEach((to) => {
  Vue.nextTick(() => {
    if (to.meta) {
      document.title = to.meta.title || "";
    }
  });
});

export default router;
