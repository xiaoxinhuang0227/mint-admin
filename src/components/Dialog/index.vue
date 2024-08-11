<script setup lang="tsx">
import { propTypes } from '@/utils/propTypes'
import { computed, useAttrs, ref, unref } from 'vue'
import { isNumber } from '@/utils/is'

const props = defineProps({
  modelValue: propTypes.bool.def(false),
  title: propTypes.string.def('Dialog'),
  maxHeight: propTypes.oneOfType([String, Number]).def('400px'),
  width: propTypes.oneOfType([String, Number]).def('500px')
})

const getBindValue = computed(() => {
  const delArr: string[] = ['title', 'maxHeight']
  const attrs = useAttrs()
  const obj = { ...attrs, ...props }
  for (const key in obj) {
    if (delArr.indexOf(key) !== -1) {
      delete obj[key]
    }
  }
  return obj
})

const dialogHeight = ref(isNumber(props.maxHeight) ? `${props.maxHeight}px` : props.maxHeight)
const dialogWidth = ref(isNumber(props.width) ? `${props.width}px` : props.width)
const dialogStyle = computed(() => {
  return {
    maxHeight: unref(dialogHeight),
  }
})
</script>

<template>
  <el-dialog
    class="compoent-dialog"
    v-bind="getBindValue"
    destory-on-close
    lock-scroll
    draggable
    top="10%"
    :close-on-click-model="false"
    :title="title"
    :width="dialogWidth"
  >
    <el-scrollbar :style="dialogStyle">
      <slot></slot>
    </el-scrollbar>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.compoent-dialog {
  position: relative;
}
</style>