import jsCookie from 'js-cookie';

export const useAuthorization = () => {

  const { devIng } = useGlobal();
  // const store = useStore();
  // const entInfo = computed(() => store.getters['user/entInfo']);
  const token = ref<string>('');

  onShow(() => {
    token.value = jsCookie.get('token');
  });

  // 页面跳转，做权限判断
  const toPage = (url:string):void => {
    if (url) {
      token.value = jsCookie.get('token');
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
    if (getCurrentPages().length > 1) {
      uni.navigateBack({
        success: () => {
          uni.showToast({
            icon: 'none',
            title: msg
          });
        }
      });
    } else {
      uni.switchTab({
        url: '/pages/index/index',
        success: () => {
          uni.showToast({
            icon: 'none',
            title: msg
          });
        }
      });
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