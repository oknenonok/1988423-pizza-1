import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/"
});

axiosInstance.interceptors.response.use(res => res, e => {
  const defaultMessage = "Возникла ошибка при выполнении запроса к серверу";
  if (e?.response?.status === 401 && e?.response?.config?.headers?.Authorization) {
    const { dispatch } = require("@/store").default;
    dispatch("Auth/logout", false);
    axiosInstance.$notifier.warning("Сессия завершена, необходимо снова войти в систему");
  } else {
    axiosInstance.$notifier.error(
      e?.response?.data?.error?.message || defaultMessage
    );
  }
  return Promise.reject(e);
});

export default axiosInstance;
