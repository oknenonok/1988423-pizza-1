export default (view: string) => {
  return () => import(`@/views/Page${view}.vue`);
};
