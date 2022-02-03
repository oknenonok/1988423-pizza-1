export default (view) => {
  return () => import(`@/views/Page${view}.vue`);
};
