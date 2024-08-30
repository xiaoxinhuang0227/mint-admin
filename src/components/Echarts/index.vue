<script setup>
import { onMounted, ref, watch, nextTick } from 'vue';
import * as echarts from 'echarts';
import { debounce, merge } from 'lodash-es';

const props = defineProps({
  options: Object, // ECharts 配置项
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '400px'
  }
});

const commonOptions = {
  // 直角坐标系网格
  grid: {
    top: '20%',
    left: '80',
    right: '65',
    bottom: '15%',
  },
  tooltip: {
    trigger: 'axis',
    textStyle: {
      color: 'rgba(255, 255, 255, 0.8)',
    },
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderColor: 'rgba(0, 0, 0, 0.8)',
    borderWidth: 0,
  },
  // 工具栏
  toolbox: {
    dataView: { show: true, readOnly: false },
    saveAsImage: { show: true }
  },
  legend: {
    bottom: '0',
    itemWidth: 16,
    itemHeight: 4,
    itemGap: 20,
  },
  xAxis: [
    {
      type: 'category',
      axisPointer: {
        type: 'shadow'
      },
      axisLine: {
        onZero: false
      },
      splitLine: {
        show: false,
      },
      data: []
    }
  ],
  boundaryGap: ['5%', '5%']
}

const echartRef = ref(null);

let echartInstance;

const resizeHandler = debounce(() => {
  echartInstance?.resize()
}, 100)

onMounted(() => {
  initializeChart();
  window.addEventListener('resize', resizeHandler)
});

watch(
  () => props.options,
  (newVal, oldVal) => {
    // 当 options 发生变化时，更新图表
    const finalOptions = merge({}, commonOptions, newVal);
    echartInstance.setOption(finalOptions, true);
  }
);
async function initializeChart() {
  await nextTick(); // 等待组件渲染完成
  const finalOptions = merge({}, commonOptions, props.options);
  console.log(finalOptions)
  echartInstance = echarts.init(echartRef.value);
  echartInstance.setOption(finalOptions, true);
}

// 组件卸载时销毁 ECharts 实例
onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler)
  if (echartInstance !== null) {
    echartInstance.dispose();
  }
});
</script>

<template>
  <div ref="echartRef" class="echart"></div>
</template>

<style>
.echart {
  width: v-bind(width);
  height: v-bind(height);
}
</style>