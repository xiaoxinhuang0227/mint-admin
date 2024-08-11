<script setup>
import { onMounted, ref, watch, nextTick } from 'vue';
import * as echarts from 'echarts';
import { debounce } from 'lodash-es';

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

const echartRef = ref(null);

let echartInstance;

const resizeHandler = debounce(() => {
  if (echartRef) {
    echartRef.resize()
  }
}, 100)

onMounted(() => {
  initializeChart();
  window.addEventListener('resize', resizeHandler)
  watch(
    () => props.options,
    (newVal, oldVal) => {
      // 当 options 发生变化时，更新图表
      echartInstance.setOption(newVal, true);
    }
  );
});

async function initializeChart() {
  await nextTick(); // 等待组件渲染完成
  echartInstance = echarts.init(echartRef.value);
  echartInstance.setOption(props.options, true);
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