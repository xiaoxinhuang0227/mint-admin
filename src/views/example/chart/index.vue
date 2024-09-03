<script setup>
import Rada from './components/rada.vue';
import Sunburst from './components/sunburst.vue';
import StackBar from './components/stackBar.vue';
</script>

<template>
  <div class="page-chart">
    <ElRow :gutter="20">
      <ElCol :span="6">
        <ElCard shadow="never">
          <Rada></Rada>
        </ElCard>
      </ElCol>
      <ElCol :span="18">
        <ElCard shadow="never">
          <Sunburst></Sunburst>
        </ElCard>
      </ElCol>
    </ElRow>
    <ElRow :gutter="20">
      <ElCol :span="24">
        <ElCard shadow="never" class="mt-5">
          <StackBar></StackBar>
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