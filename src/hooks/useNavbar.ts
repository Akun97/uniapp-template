export const useNavbar = () => {

  const store = useStore();
  const systemInfo = uni.getSystemInfoSync();
  const statusBarHeight:number | undefined =  systemInfo?.statusBarHeight;
  const pagesLength = getCurrentPages().length;

  const navbarHeight = ():number => {
    /* #ifdef APP-PLUS || H5 */
    return 44;
    /* #endif */
    /* #ifdef MP */
    let height = systemInfo.platform == 'ios' ? 44 : 48;
    return height;
    /* #endif */
  }

  const back = ():void => {
    if (pagesLength != 1) {
      uni.navigateBack({});
    } else {
      store.commit('base/tabbarIndexUpdate', { index: 0 });
      uni.switchTab({
        url: '/pages/index/index'
      });
    }
  }

  const getHeight = ():number => {
    return navbarHeight() + (statusBarHeight as number);
  }

  return {
    statusBarHeight,
    pagesLength,
    navbarHeight,
    back,
    getHeight
  }

}