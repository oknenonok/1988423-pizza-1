import Vue from "vue";
import App from "@/App";
import "@/plugins/ui";
import "@/plugins/priceFormat";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
