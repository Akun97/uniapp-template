export const initFunc = () => {

  const { initTabbar } = useTabbar();

  onShow(() => {
    initTabbar(4);
  });

}