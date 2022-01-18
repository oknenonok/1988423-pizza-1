import Notifier from "@/plugins/notifier";
import createResources from "@/common/helpers/createResources";

export default function(store) {
  store.$notifier = new Notifier(store);
  store.$api = createResources(store.$notifier);
}