/**
 * Чтобы require.context работал и в тестах
 * @see https://stackoverflow.com/questions/38332094/how-can-i-mock-webpacks-require-context-in-jest
 */
import registerRequireContextHook from "babel-plugin-require-context-hook/register";
registerRequireContextHook();
