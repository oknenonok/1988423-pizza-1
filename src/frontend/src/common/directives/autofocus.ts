import Vue from "vue";

Vue.directive("autofocus", {
  inserted(el, binding) {
    if (
      !Object.prototype.hasOwnProperty.call(binding, "value") ||
      binding.value
    ) {
      el.focus();
    }
  },
});
