import Vue from "vue";
import { MOUSE_BUTTON_LEFT } from "@/common/constants";

Vue.directive("click-outside", {
  bind(el, binding, vNode) {
    el.clickOutsideEvent = function (event) {
      if (el !== event.target && !el.contains(event.target) && event.button === MOUSE_BUTTON_LEFT) {
        vNode.context[binding.expression](event);
      }
    };
    document.body.addEventListener("mousedown", el.clickOutsideEvent);
  },
  unbind(el) {
    document.body.removeEventListener("mousedown", el.clickOutsideEvent);
  },
});
