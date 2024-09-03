<script setup>
import Echart from '@/components/Echarts/index.vue';

const option = ref();
const chartData = {
  Jane: {
    brain: 80,
    ability: 70,
    mental: 60,
    power: 90,
    speed: 50
  },
}
const loadOption = () => {
  const config = {
    brain: '智力',
    ability: '能力',
    mental: '心理',
    power: '体力',
    speed: '速度'
  }
  const legend = Object.keys(chartData);
  const legendName = Object.keys(config);
  const indicator = Object.keys(config).map(key => ({ name: config[key], max: 100 }));
  const data = legend.map(item => {
    const itemData = chartData[item];
    return {
      value: legendName.map(key => itemData[key]),
      name: item,
      areaStyle: {
        color: 'rgba(55, 130, 255, 0.1)'
      }
    }
  })
  option.value = {
    title: {
      text: 'Radar Chart'
    },
    legend: {
      data: legend
    },
    radar: {
      indicator
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        type: 'radar',
        data,
        emphasis: {
          lineStyle: {
            width: 2
          },
          areaStyle: {
            color: 'rgba(55, 130, 255, 0.5)'
          }
        },
      }
    ]
  }
  console.log(option.value)
}

loadOption();

</script>

<template>
  <div>
    <Echart :options="option" height="300px"></Echart>
  </div>
</template>