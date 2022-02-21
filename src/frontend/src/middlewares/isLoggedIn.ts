import { IMiddlwareCallParams } from "@/common/types";

export default function isLoggedIn({
  next,
  store,
  nextMiddleware,
}: IMiddlwareCallParams) {
  if (store.state.Auth.token) {
    next("/");
  }
  return nextMiddleware();
}
