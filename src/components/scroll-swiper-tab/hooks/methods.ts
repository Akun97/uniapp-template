import { ComponentInternalInstance } from "vue";

export const constructFunc = (props:any, emit:any) => {

  const systemInfo = uni.getSystemInfoSync();
  const tabsScrollHeight = ref<number | undefined>(undefined); // tab栏滚动视图高度
  const tabsItemWidth = ref<number | undefined>(undefined); // tab栏子项宽度
  const tabsLineHeight = ref<number>(uni.upx2px(5)); // tab栏下划线宽度
  const tabsLineWidth = ref<number>(uni.upx2px(29)); // tab栏下划线宽度
  const tabsLineOffset = ref<number>(0); // tab栏下划线位置
  const scroll = ref<boolean>(false); // 数据列表是否滚动
  const dataTop = ref<number>(0); // tab栏离顶部的距离
  const scrollIntoView = ref<string>(''); // 操作数据列表滚动到指定元素
  const { proxy } = (getCurrentInstance() as ComponentInternalInstance);
  const refresherTriggered = ref<boolean[]>([]);
  const clickTime = ref<number>(0);

  watch(() => props.data, (newV, oldV) => {
    if (refresherTriggered.value.length === 0) {
      refresherTriggered.value = newV.map((item:any) => false);
    }
  }, {
    deep: true
  });

  const getTabHeight = ():void => { // 获取tab栏高度
    uni.createSelectorQuery().in(proxy).select(".sst-tabs-scroll").boundingClientRect(data => {
      tabsScrollHeight.value = (data.height??0) + tabsLineHeight.value;
    }).exec();
  }
  
  const getTabWidth = ():void => { // 获取tab项宽度、初始化tab项下划线位置
    const widthList:number[] = [];
    uni.createSelectorQuery().in(proxy).selectAll(`.sst-tabs`).boundingClientRect(data => { 
      if (data) {
        (data as any[]).forEach((element: any) => {
          widthList.push(element.width??0);
        });
        tabsItemWidth.value = Math.max(...widthList);
        tabsLineOffset.value = (tabsItemWidth.value - tabsLineWidth.value)/2;
      }
    }).exec();
  }

  const getDataTop = ():void => { // 获取tab栏离顶部距离
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
    if (e.detail.scrollTop > (dataTop.value-50)) { // 滚动到tab栏后吸顶
      scrollIntoView.value = 'data';
      setTimeout(() => {
        scroll.value = true;
      }, 0);
    } else {
      scrollIntoView.value = '';
      scroll.value = false;
    }
  }
  
  const tabsChange = (index: number):void => {
    if (clickTime.value === 0 || (new Date().getTime() - clickTime.value > 500)) {
      clickTime.value = new Date().getTime();
      emit('update:tabsIndex', index);
    }
  }
  
  const swiperChange = (e:any):void => {
    tabsScroll(e.detail.current);
    emit('change', e.detail.current);
    emit('update:tabsIndex', e.detail.current);
  }
  
  const tabsScroll = (current: number):void => { // tab栏滚动方法
    if (tabsItemWidth.value) {
      tabsLineOffset.value = tabsItemWidth.value * current + (tabsItemWidth.value - tabsLineWidth.value)/2;
    }
  }

  const refresh = (index:number):void => {
    if (!refresherTriggered.value[index]) {
      refresherTriggered.value[index] = true;
      emit('refresh', index);
      setTimeout(() => {
        refresherTriggered.value[index] = false;
      }, 500);
    } else {
      refresherTriggered.value[index] = false;
    }
  }

  const loadmore = (index:number):void => {
    emit('loadmore', index);
  }

  return {
    tabsScrollHeight,
    tabsItemWidth,
    tabsLineOffset,
    scroll,
    scrollIntoView,
    refresherTriggered,
    getTabHeight,
    getTabWidth,
    getDataTop,
    scrollListener,
    tabsChange,
    swiperChange,
    refresh,
    loadmore
  }

}