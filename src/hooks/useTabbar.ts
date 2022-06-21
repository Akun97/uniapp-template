export const useTabbar = () => {

  const store = useStore();

  const initTabbar = (index: number): void => {
    store.commit('base/tabbarIndexUpdate', { index: index });
    uni.hideTabBar({
      animation: false,
      success: res => {
        store.commit('base/tabbarShowUpdate', { show: true });
      }
    });
  }

  return {
    initTabbar
  }

}