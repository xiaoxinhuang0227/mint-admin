<script setup>
import variables from '@/styles/variables.module.scss';
import { propTypes } from '@/utils/propTypes';

defineProps({
  backgroundColor: propTypes.string.def(variables.primaryLighterColor),
  borderColor: propTypes.string.def(variables.primaryColor),
  textColor: propTypes.string.def('#fff'),
})
</script>

<template>
  <div
    class="component-highlight-block"
    :style="`background: ${backgroundColor}; border: 1px solid ${borderColor}; color: ${textColor};`"
  >
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.component-highlight-block {
  padding: 20px;
  margin: 20px $page-padding;
  border-radius: 5px;
}
</style>