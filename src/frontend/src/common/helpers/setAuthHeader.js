import axios from "@/plugins/axios";

export default (store) => {
  const token = store.state.Auth.token;
  axios.defaults.headers.common["Authorization"] = token
    ? `Bearer ${token}`
    : "";
};
