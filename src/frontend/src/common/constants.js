/**
 * @constant {number} id теста по умолчанию
 */
export const DEFAULT_DOUGH = 1;

/**
 * @constant {number} id размера по умолчанию
 */
export const DEFAULT_SIZE = 2;

/**
 * @constant {number} id соуса по умолчанию
 */
export const DEFAULT_SAUCE = 1;

/**
 * @constant {array} соответствие между id теста и их названиями в css
 */
export const MAPPING_DOUGH = ["", "light", "large"];

/**
 * @constant {array} соответствие между id размеров и их названиями в css
 */
export const MAPPING_SIZE = ["", "small", "normal", "big"];

/**
 * @constant {array} соответствие между id соусов и их названиями в css
 */
export const MAPPING_SAUCE = ["", "tomato", "creamy"];

/**
 * @constant {array} соответствие между классами css и количеством ингредиентов
 */
export const MAPPING_FILLING_CLASS = [
  "",
  "",
  "pizza__filling--second",
  "pizza__filling--third",
];

/**
 * @constant {number} максимальное количество ингредиентов на пицце
 */
export const MAX_INGREDIENT_COUNT = 3;

/**
 * @constant {string} эффект при перетаскивании
 */
export const EFFECT_LINK = "link";

/**
 * @constant {string} тип данных при перетаскивании
 */
export const DATA_TRANSFER_PAYLOAD = "text/plain";

/**
 * @constant {string} шаблон по умолчанию
 */
export const APP_DEFAULT_LAYOUT = "AppLayoutDefault";
