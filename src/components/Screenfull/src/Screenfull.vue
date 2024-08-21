<script setup lang="ts">
import { Icon } from '@/components/Icon'
import { useFullscreen } from '@vueuse/core'
import { propTypes } from '@/utils/propTypes'

defineProps({
  color: propTypes.string.def(''),
  size: propTypes.number.def(20)
})

const { toggle, isFullscreen } = useFullscreen()

const toggleFullscreen = () => {
  toggle()
}
</script>

<template>
  <div class="component-screenfull" @click="toggleFullscreen">
    <Icon
      :size="size"
      :icon="isFullscreen ? 'ic:baseline-fullscreen-exit' : 'ic:twotone-fullscreen'"
      :color="color"
    />
  </div>
</template>

<style lang="scss" scoped>
.component-screenfull {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
