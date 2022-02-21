import axios from "@/plugins/axios";

export default (token: string | null) => {
  axios.defaults.headers.common["Authorization"] = token
    ? `Bearer ${token}`
    : "";
};
