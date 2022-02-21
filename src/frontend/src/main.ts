import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import VueTheMask from "vue-the-mask";
import priceFormat from "@/plugins/priceFormat";
import "@/common/directives/autofocus";
import "@/plugins/ui";

Vue.use(VueTheMask);
Vue.use(priceFormat);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
