import axios from "axios";
import notifier from "@/services/notifier.service";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (e) => {
    const defaultMessage = "Возникла ошибка при выполнении запроса к серверу";
    if (e?.response?.status === 401) {
      if (e?.response?.config?.headers?.Authorization) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { dispatch } = require("@/store").default;
        dispatch("Auth/logout", false);
        notifier.warning("Сессия завершена, необходимо снова войти в систему");
      }
    } else {
      notifier.error(e?.response?.data?.error?.message || defaultMessage);
    }
    return Promise.reject(e);
  }
);

export default axiosInstance;
