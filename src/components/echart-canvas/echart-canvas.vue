<template>
  <div
    ref="chartRef"
    :id="id"
    :class="[className]"
    :style="{
      height: height,
      width: width
    }"
  >
  </div>
</template>

<script setup lang="ts">
import theme from './theme'; // 引入默认主题
import * as echarts from 'echarts';
import chinaJSON from './china.json';

interface Props {
  id?: string,
  className?: string,
  height: string,
  width: string,
  options?: any
}
const props = withDefaults(defineProps<Props>(), {
  className: 'chart',
  options: () => {}
});

const chartRef = ref<HTMLElement>()
const charts:{ chart: any } = {
  chart: null
}

echarts.registerMap('china',  JSON.parse(JSON.stringify(chinaJSON)));

/**
 * 初始化echart
 * @param data 数据项
 * @param clearCaching 是否清除缓存
 */
const initChart = (data?: any, clearCaching = false) => {
  if (data || props.options) {
    charts.chart.setOption(data || props.options, clearCaching)
  }
}

const resize = () => {
  charts.chart.resize();
}

const clear = () => {
  charts.chart.clear();
}

const dispatchAction = (obj?:any):void => {
  charts.chart.dispatchAction(obj);
}

const chartEvent = (event:string, callback:void):void => {
  charts.chart.on(event, callback);
}

// 生命周期
onMounted(() => {
  // 定义实例
  echarts.registerTheme('myTheme', theme) // 覆盖默认主题
  echarts.env.wxa = false;
  echarts.env.domSupported = true;
  echarts.env.svgSupported = true;
  echarts.env.transform3dSupported = true;
  echarts.env.transformSupported = true;
  charts.chart = echarts.init(chartRef.value as HTMLElement, 'myTheme')
  initChart()
})

onBeforeUnmount(() => {
  charts.chart.dispose()
  charts.chart = null
})

// 监听改变
watch(
  () => props.options,
  val => {
    val && initChart(val)
  },
  {
    deep: true
  }
)

// 对外暴露接口
defineExpose({
  chartRef,
  initChart,
  dispatchAction,
  chartEvent,
  resize,
  clear
});

</script>