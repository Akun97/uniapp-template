interface chartData { name: string; value: any, itemStyle?: any }

/**
 * @description echarts轮播方法返回类型
 * */ 
 type echatsCarousel = {
  initEchatsCarousel: (val: any[]) => void
}

/**
 * @description 工具方法计算大小值返回类型
 * */ 
 type sizeNumber = {
  max: number,
  min: number
}

/**
 * @description 工具方法计算echarts Y轴间隔 返回类型
 * */ 
type interval = {
  max: number,
  min: number,
  interval: number
}