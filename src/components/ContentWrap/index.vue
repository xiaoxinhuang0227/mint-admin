<script setup>
import { useRoute } from 'vue-router';
import { Icon } from '@/components/Icon';
import { propTypes } from '@/utils/propTypes';

const { meta } = useRoute();
defineProps({
  title: propTypes.string.def(''),
  tooltipMessge: propTypes.string.def(''),
})
</script>

<template>
  <ElCard shadow="never">
    <template #header>
      <div class="flex-between">
        <slot name="title">
          <span class="fs-16">{{ title || meta.title }}</span>
          <ElTooltip v-if="tooltipMessge" effect="dark" placement="right">
            <template #content>
              <div class="max-w-200px">{{ tooltipMessge }}</div>
            </template>
            <Icon class="ml-5px" icon="vi-bi:question-circle-fill" :size="14" />
          </ElTooltip>
        </slot>
        <slot name="action"></slot>
      </div>
    </template>
    <slot></slot>
  </ElCard>
</template>