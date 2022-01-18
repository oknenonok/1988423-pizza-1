export default (view) => {
  return () => import(`@/views/${view}.vue`);
};
