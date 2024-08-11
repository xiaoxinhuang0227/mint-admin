<script setup lang="ts">
import { PropType } from 'vue'
import { ITableData } from '@/api/table'
// import { Descriptions, DescriptionsSchema } from '@/components/Description/index.ts'
type DescriptionsSchema = {}
defineProps({
  currentRow: {
    type: Object as PropType<ITableData>,
    default: () => null
  },
  detailSchema: {
    type: Array as PropType<DescriptionsSchema[]>,
    default: () => []
  }
})
</script>

<template>
  <Descriptions :schema="detailSchema" :data="currentRow || {}" />
</template>
