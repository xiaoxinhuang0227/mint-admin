<script setup lang="tsx">
import { propTypes } from '@/utils/propTypes';
import { computed, useAttrs, ref, unref } from 'vue';
import { isNumber } from '@/utils/is';
import { Icon } from '@/components/Icon/index';

const props = defineProps({
  modelValue: propTypes.bool.def(false),
  title: propTypes.string.def('Dialog'),
  fullscreen: propTypes.bool.def(true),
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

const isFullscreen = ref(false)

const toggleFull = () => {
  isFullscreen.value = !unref(isFullscreen)
}

</script>

<template>
  <el-dialog
    class="compoent-dialog"
    v-bind="getBindValue"
    destory-on-close
    lock-scroll
    draggable
    top="10%"
    :fullscreen="isFullscreen"
    :close-on-click-model="false"
    :width="dialogWidth"
    :show-close="false"
  >
    <template #header="{ close }">
      <div class="dialog-title flex-between">
        <slot name="title">{{ title }}</slot>
        <div>
          <Icon
            class="icon mr-2"
            :size="20"
            v-if="fullscreen"
            :icon="
              isFullscreen ? 'ic:baseline-fullscreen-exit' : 'ic:twotone-fullscreen'
            "
            @click="toggleFull"
          />
          <Icon
            class="icon"
            :size="20"
            icon="ic:twotone-close"
            @click="close"
          />
        </div>
      </div>
    </template>
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
  .icon {
    cursor: pointer;
  }
}
</style>