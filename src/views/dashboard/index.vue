<script setup>
import Echart from '@/components/Echarts/index.vue';
import { stackedAreaChartData, pieChartData, mixOption } from './charts-data.ts';
const loading = ref(true);

setTimeout(() => {
  loading.value = false;
}, 1000);
</script>

<template>
  <div class="page-dashboard">
    <DataSummary></DataSummary>
    <ElRow :gutter="20">
      <ElCol :span="8">
        <ElCard shadow="never">
          <ElSkeleton :loading="loading" :rows="10">
            <Echart :options="pieChartData"></Echart>
          </ElSkeleton>
        </ElCard>
      </ElCol>
      <ElCol :span="16">
        <ElCard shadow="never">
          <ElSkeleton :loading="loading" :rows="10">
            <Echart :options="stackedAreaChartData"></Echart>
          </ElSkeleton>
        </ElCard>
      </ElCol>
    </ElRow>
    <ElRow :gutter="20">
      <ElCol :span="24">
        <ElCard shadow="never" class="mt-3">
          <ElSkeleton :loading="loading" :rows="10">
            <Echart :options="mixOption"></Echart>
          </ElSkeleton>
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
</template>

<style scoped lang="scss">
.page-dashboard {
  background-color: #f1f1f1;
}
</style>