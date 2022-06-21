export const initFunc = () => {

  const { initTabbar } = useTabbar();

  onShow(() => {
    initTabbar(1);
  });

}