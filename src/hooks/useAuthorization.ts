import jsCookie from 'js-cookie';

export const useAuthorization = () => {

  const { devIng } = useGlobal();
  // const store = useStore();
  // const entInfo = computed(() => store.getters['user/entInfo']);
  const token = ref<string>('');

  onShow(() => {
    token.value = jsCookie.get('uni-Token');
  });

  // 页面跳转，做权限判断
  const toPage = (url:string):void => {
    if (url) {
      token.value = jsCookie.get('uni-Token');
      if (token.value) {
        uni.navigateTo({
          url: url
        });
      } else {
        uni.navigateTo({
          url: `/member/pages/login/index?targetUrl=${url}`
        });
      }
    } else {
      devIng();
    }
  }
  
  // 跳到登录页面
  const toLogin = ():void => {
    uni.navigateTo({
      url: '/member/pages/login/index'
    });
  }

  // const getEntInfo = ():void => {
  //   store.dispatch('user/getEntInfo', { callback: null });
  // }

  // 表单提交成功返回
  const submitBack = (msg:string = '提交成功'):void => {
    const toast = ():void => {
      uni.showToast({
        icon: 'none',
        title: msg
      });
    }
    if (getCurrentPages().length > 1) {
      uni.navigateBack({
        success: () => {
          msg && toast();
        }
      });
    } else {
      /* #ifdef MP */
      uni.switchTab({
        url: '/pages/index/index',
        success: () => {
          msg && toast();
        }
      });
      /* #endif */
      /* #ifdef APP-PLUS || H5 */
      // history.back();
      // setTimeout(() => {
      //   msg && toast();
      // }, 0);
      /* #endif */
    }
  }

  return {
    // entInfo, //用户信息
    token, // 登录凭证
    toPage, // 页面跳转，做权限判断
    toLogin, // 跳到登录页面
    // getEntInfo, // 获取用户信息
    submitBack // 表单提交成功返回交互
  }

}