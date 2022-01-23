import { NEW_ID_PREFIX } from "@/common/constants";

/**
 * Проверяет, является ли сущность новой (не сохраненной на сервер)
 * @param {string|number} id
 * @returns {boolean}
 */
export default (id) => {
  return `${id}`.startsWith(NEW_ID_PREFIX);
};
