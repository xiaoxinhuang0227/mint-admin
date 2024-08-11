<script setup lang="ts">
import { Icon } from '@/components/Icon'
import { propTypes } from '@/utils/propTypes'

const emit = defineEmits(['search', 'reset', 'expand'])
defineProps({
  showSearch: propTypes.bool.def(true),
  showReset: propTypes.bool.def(true),
  showExpand: propTypes.bool.def(false),
  visible: propTypes.bool.def(true),
  searchLoading: propTypes.bool.def(false),
  resetLoading: propTypes.bool.def(false)
})

const onSearch = () => {
  emit('search')
}

const onReset = () => {
  emit('reset')
}

const onExpand = () => {
  emit('expand')
}
</script>

<template>
  <el-button
    v-if="showSearch"
    type="primary"
    :loading="searchLoading"
    @click="onSearch"
  >
    <Icon icon="uil:search"></Icon>
    查询
  </el-button>
  <el-button
    v-if="showReset"
    plain
    :loading="resetLoading"
    @click="onReset"
  >
    <Icon icon="carbon:reset"></Icon>
    重置
  </el-button>
  <el-button
    v-if="showExpand"
    plain
    @click="onExpand"
  >
    <Icon :icon="!visible ? 'iconamoon:arrow-up-2-bold' : 'iconamoon:arrow-down-2-bold'"></Icon>
    {{ !visible ? '收起' : '展开' }}
  </el-button>
</template>