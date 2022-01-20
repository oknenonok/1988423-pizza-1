export default function auth({ next, store, nextMiddleware, to }) {
  if (!store.state.Auth.user) {
    next(`/login?back=${to.path}`);
  }
  return nextMiddleware();
}
