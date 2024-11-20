<script setup lang="tsx">
import { Table } from '@/components/Table';
import { ref, computed } from 'vue';

// 模拟数据
const mockData = Array.from({ length: 100 }).map((_, index) => ({
  id: index + 1,
  name: `Item ${index + 1}`,
  age: Math.floor(Math.random() * 50) + 20,
  address: `地址 ${index + 1}`,
  date: new Date().toLocaleDateString()
}));

const columns = [
  {
    type: 'selection',
    field: 'selection',
    label: '选择'
  },
  {
    label: '姓名',
    field: 'name',
    width: 150
  },
  {
    label: '年龄', 
    field: 'age',
    width: 100
  },
  {
    label: '地址',
    field: 'address'
  },
  {
    label: '日期',
    field: 'date',
    width: 150
  }
];

// 分页相关
const currentPage = ref(1);
const pageSize = ref(10);
const total = computed(() => mockData.length);

// 计算当前页数据
const currentData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return mockData.slice(start, end);
});

// 表格加载状态
const loading = ref(false);

// 模拟加载效果
const refresh = async () => {
  loading.value = true;
  await new Promise(resolve => setTimeout(resolve, 500));
  loading.value = false;
};
</script>

<template>
  <div>
    <HighlightBlock>
      <p>前端分页示例：</p>
      <ol>
        <li>数据在前端进行分页处理，使用computed计算当前页数据</li>
        <li>适用于小数据量的场景，可以实现快速切换分页</li>
      </ol>
    </HighlightBlock>

    <Table
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :columns="columns"
      :data="currentData"
      :loading="loading"
      :pagination="{ total }"
      @refresh="refresh"
    />
  </div>
</template> 