/**
 * @description echarts tooltip公共模板
 * @param {any[]} data 数据
 * @param {(value:any) => string} formatFunc 数据项格式化方法
 * @param {string} unitText 单位文本
 * @returns {string} 模板
 * */ 
export const useTooltipTemplate = (data:any[], formatFunc:(value:any, index:number) => string, marker: string[], unitText?: string):string => {
  return `
    <div class='p-[16rpx] min-w-[226rpx] flex flex-col items-start text-[#000000]/[0.8]'>
      <div class="text-[24rpx] leading-[36rpx] mb-[8rpx] font-bold">${data[0].name}</div>
      ${data.map((item, index) => {
        return item ? `<div class='w-full flex items-center justify-start text-[#000000]/[0.6] ${index === (data.length - 1) ? '' : 'mb-[10rpx]'}'>
          <div class='flex items-center'>
            ${marker[index] ? `<div class='flex justify-center items-center mr-[8rpx]'>${marker[index]}</div>` : ''}
            <div class='text-[24rpx] leading-[36rpx]'>${item.seriesName}：</div>
          </div> 
          <div class='text-[24rpx] leading-[36rpx]'>${formatFunc(item.value, index)}${unitText??''}</div> 
        </div>` : '<div></div>'
      }).join('')}
    </div>
  `
}

/**
 * @description echarts 饼图tooltip公共模板
 * @param {any[]} data 数据
 * @returns {string} 模板
 * */ 
 export const useTooltipPieTemplate = (data:any):string => {
  return `
    <div class='px-[8px] py-[12px] text-white'>
      <div class='w-full flex items-center justify-between'>
        <div class='flex items-center mr-[8px]'>
          <div class='w-[10px] h-[10px] mr-[8px]' style='background-color: ${data.color}'></div>
          <div class='text-[14px]'>${data.name}</div>
        </div> 
        <div class='flex items-center'>
          <div class='font-number text-[14px]'>${data.percent}</div>  
          <div class='text-[14px]'>%</div>  
        </div>
      </div>
    </div>
  `
}

/**
 * @description echarts 轮播
 * @param {any} chartRef ref
 * @param {number} interval 轮播间隔 ms
 * @returns {echatsCarousel} 
 * */ 
export const useEchatsCarousel = (chartRef:any, interval:number, select?:boolean):echatsCarousel => {

  // 轮播数据
  const data = reactive<{value: any[]}>({
    value: []
  });
  // 轮播下标
  const index = ref<number>(0);
  // 计时轮播
  const timer = ref<any>(null);

  const clearTimer = ():void => {
    clearInterval(timer.value);
    timer.value = null;
  }

  onMounted(() => {
    mouseEvents();
  });
  
  onUnmounted(() => {
    clearTimer();
  });

  /**
   * @description 控制高亮跟提示
   * @param {string} type （highlight：高亮（反：downplay）；showTip：显示提示（反：hideTip））
   * @param {number} dataIndex 数据项的 index
   * */ 
  const dispatchActionChart = (type:string, dataIndex:number):void => {
    chartRef.value.dispatchAction({
      type: type,
      seriesIndex: 0,
      dataIndex: dataIndex
    });
    if (select) {
      chartRef.value.dispatchAction({
        type: type,
        seriesIndex: 1,
        dataIndex: dataIndex,
      });
    }
  }

  /**
   * @description 设置轮播
   * */ 
  const setIntervalMyChart = ():void => {
    const dataLength = data.value.length;
    clearTimer();
    // 每隔 interval 进行一次切换
    timer.value = setInterval(() => {
      // 清除高亮跟提示
      dispatchActionChart(select ? "unselect" : "downplay", index.value);
      dispatchActionChart("hideTip", index.value);
      if (index.value < (dataLength - 1)) {
        // 索引增加
        index.value = index.value + 1;
      } else {
        index.value = 0;
      }
      // 激活高亮跟提示
      dispatchActionChart(select ? "select" : "highlight", index.value);
      dispatchActionChart("showTip", index.value);
    }, interval);
  }

  /**
   * @description 鼠标划入
   * */ 
  const mouseEvents = () => {
    chartRef.value.chartEvent('mouseover', () => {
      // 停止计时器， 清楚尚亮
      clearTimer();
      dispatchActionChart(select ? "unselect" : 'downplay', index.value);
      index.value = -1;
    });
    chartRef.value.chartEvent('mouseout', () => {
      // 启动轮播
      setIntervalMyChart();
    });
  }

  /**
   * @description 初始化轮播
   * @param {any[]} val 数组列表 用于计算列表长度
   * */ 
  const initEchatsCarousel = (val: any[]):void => {
    // 清除高亮跟提示
    val.map((item:any, index:number) => {
      dispatchActionChart(select ? "unselect" : "downplay", index);
      dispatchActionChart("hideTip", index);
    });
    setTimeout(() => {
      index.value = 0;
      dispatchActionChart(select ? "select" : "highlight", index.value);
      dispatchActionChart("showTip", index.value);
      data.value = val;
      setIntervalMyChart();
    }, 100);
  }

  return {
    initEchatsCarousel
  }

}