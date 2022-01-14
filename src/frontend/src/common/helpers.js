export const getView = (view) => {
  return () => import(`@/views/${view}.vue`);
};
