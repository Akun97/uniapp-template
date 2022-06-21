import { ComponentInternalInstance } from "vue";

export const constructFunc = () => {

  const systemInfo = uni.getSystemInfoSync();
  const scroll = ref<boolean>(false); // 数据列表是否滚动
  const dataTop = ref<number>(0); // 吸顶头部离顶部的距离
  const scrollIntoView = ref<string>(''); // 操作数据列表滚动到指定元素
  const { proxy } = (getCurrentInstance() as ComponentInternalInstance);

  const getDataTop = ():void => { // 获取吸顶头部离顶部距离
    uni.createSelectorQuery().in(proxy).select("#data").boundingClientRect(data => {
      dataTop.value = (data.top??0) - (navbarHeight() + (systemInfo?.statusBarHeight??0));
    }).exec();
  }

  const navbarHeight = ():number => { // navbar高度
    /* #ifdef APP-PLUS || H5 */
    return 44;
    /* #endif */
    /* #ifdef MP */
    let height = systemInfo.platform == 'ios' ? 44 : 48;
    return height;
    /* #endif */
  }

  const scrollListener = (e:any):void => { // 开启吸顶后监听滚动
    if (e.detail.scrollTop > (dataTop.value-50)) { // 滚动到吸顶头部后吸顶
      scrollIntoView.value = 'data';
      setTimeout(() => {
        scroll.value = true;
      }, 0);
    } else {
      scrollIntoView.value = '';
      scroll.value = false;
    }
  }

  return {
    scroll,
    scrollIntoView,
    getDataTop,
    scrollListener
  }

}