export default function isLoggedIn({ next, store, nextMiddleware }) {
  if (store.state.Auth.token) {
    next("/");
  }
  return nextMiddleware();
}
