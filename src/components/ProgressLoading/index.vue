<script setup>
import { propTypes } from '@/utils/propTypes';

defineProps({
  text: propTypes.string.def('加载中...'),
  percentage: propTypes.number.def(0),
  strokeWidth: propTypes.number.def(26),
  textInside: propTypes.bool.def(true)
})
</script>

<template>
  <div class="component-progress-loading">
    <ElProgress
      :text-inside="textInside"
      :stroke-width="strokeWidth"
      :percentage="percentage"
    ></ElProgress>
    <p class="tip">{{ text }}</p>
  </div>
</template>

<style scoped lang="scss">
.component-progress-loading {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 200px;
  transform: translate(-50%, -50%);
  text-align: center;
  .tip {
    margin-top: 4px;
    font-size: 12px;
  }
}
</style>