<script setup>
import Rada from './components/rada.vue';
</script>

<template>
  <div class="page-chart">
    <ElRow :gutter="20">
        <ElCol :span="12">
          <ElCard shadow="never">
            <Rada></Rada>
          </ElCard>
        </ElCol>
    </ElRow>
  </div>
</template>

<style lang="scss" scoped>
.page-chart {
  background-color: #eee;
}
</style>