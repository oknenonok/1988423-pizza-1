import { IMiddlwareCallParams } from "@/common/types";

export default function auth({
  next,
  store,
  nextMiddleware,
  to,
}: IMiddlwareCallParams) {
  if (!store.state.Auth.user) {
    next(`/login?back=${to.path}`);
  }
  return nextMiddleware();
}
