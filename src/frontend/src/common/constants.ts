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
 * @constant {array} соответствие между id теста и описанием в корзине
 */
export const MAPPING_DOUGH_CAPTIONS = [
  "",
  "на тонком тесте",
  "на толстом тесте",
];

/**
 * @constant {array} соответствие между id размеров и их названиями в css
 */
export const MAPPING_SIZE = ["", "small", "normal", "big"];

/**
 * @constant {array} соответствие между id соусов и их названиями в css
 */
export const MAPPING_SAUCE = ["", "tomato", "creamy"];

/**
 * @constant {number} максимальное количество ингредиентов на пицце
 */
export const MAX_INGREDIENT_QUANTITY = 3;

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

/**
 * @constant {string} адрес доставки - самовывоз
 */
export const DELIVERY_TYPE_SELFTAKE = "selftake";

/**
 * @constant {string} адрес доставки - новый
 */
export const DELIVERY_TYPE_NEW = "new";

/**
 * @constant {number} время жизни уведомления (мс)
 */
export const MESSAGE_LIVE_TIME = 5000;

/**
 * @constant {number} левая кнопка мыши в мышиных событиях
 */
export const MOUSE_BUTTON_LEFT = 0;

/**
 * @constant {string} префикс для id новых адресов
 */
export const NEW_ID_PREFIX = "new-";

type Locale = string;
/**
 * @constant {string} локаль для вызовов Intl
 */
export const LOCALE: Locale = "ru-RU";
