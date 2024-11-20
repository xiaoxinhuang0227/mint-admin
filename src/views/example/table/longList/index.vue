<script setup lang="tsx">
import { ref } from 'vue';
import FrontPagination from './components/FrontPagination.vue';
import VirtualList from './components/VirtualList.vue';

const activeTab = ref('frontPagination');
const tabList = [
  {
    key: 'frontPagination',
    name: '前端分页',
    component: FrontPagination
  },
  {
    key: 'virtualList',
    name: '虚拟列表',
    component: VirtualList
  }
];
</script>

<template>
  <div class="table-example">
    <el-tabs v-model="activeTab">
      <el-tab-pane
        v-for="item in tabList" 
        :key="item.key"
        :label="item.name" 
        :name="item.key"
      >
        <component :is="item.component" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>
.table-example {
  padding: 20px;
}
</style>