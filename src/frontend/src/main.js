import Vue from "vue";
import App from "@/App";
import router from "@/router";
import store from "@/store";
import "@/common/directives/clickOutside";
import "@/common/directives/autofocus";
import "@/plugins/ui";
import "@/plugins/priceFormat";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
