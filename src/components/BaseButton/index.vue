<script setup lang="ts">
import { ElButton, ComponentSize, ButtonType } from 'element-plus'
import { PropType, Component } from 'vue'

const props = defineProps({
  size: {
    type: String as PropType<ComponentSize>,
    default: undefined
  },
  type: {
    type: String as PropType<ButtonType>,
    default: 'default'
  },
  plain: {
    type: Boolean,
    default: false
  },
  round: {
    type: Boolean,
    default: false
  },
  circle: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  icon: {
    type: [String, Object] as PropType<String | Component>,
    default: undefined
  },
  disabled: {
    type: Boolean,
    default: false
  },
  style: {
    type: Object,
    default: () => ({})
  }
})


const $emit = defineEmits(['click'])

</script>

<template>
  <ElButton
     v-bind="{ ...props }"
     :style="style"
     @click="() => $emit('click')"
  >
    <slot></slot>
  </ElButton>
</template>