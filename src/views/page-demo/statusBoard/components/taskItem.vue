<script setup lang="ts">
import { propTypes } from '@/utils/propTypes';
import { PropType } from 'vue';
import { IBoardData, statusConf } from '@/api/board';
import variables from '@/styles/variables.module.scss';
defineProps({
  item: {
    type: Object as PropType<IBoardData>,
    default: () => {}
  },
  color: propTypes.string.def(variables.redColor)
})
</script>

<template>
  <div class="component-task-item mb-2" :style="{ borderLeft: `4px solid ${ color }` }">
    <ElTag :type="item.status === 0 ? 'success' : 'danger'">
      {{ statusConf[item.status || 0] }}
    </ElTag>
    <div class="item-title ml-2">{{ item.title || '-' }}</div>
  </div>
</template>

<style lang="scss" scoped>
.component-task-item {
  display: flex;
  padding: 20px;
  background-color: #f8f8f8;
}
</style>