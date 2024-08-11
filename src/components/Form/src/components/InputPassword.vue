<script setup lang="ts">
import { ref, unref, watch } from 'vue'
import { propTypes } from '@/utils/propTypes'

const props = defineProps({
  modelValue: propTypes.string.def('')
})

const emit = defineEmits(['update:modelValue'])

// 输入框的值
const valueRef = ref(props.modelValue)

watch(
  () => props.modelValue,
  (val: string) => {
    if (val === unref(valueRef)) return
    valueRef.value = val
  }
)

// 监听
watch(
  () => valueRef.value,
  (val: string) => {
    emit('update:modelValue', val)
  }
)

</script>

<template>
  <ElInput v-bind="$attrs" v-model="valueRef" showPassword />
</template>