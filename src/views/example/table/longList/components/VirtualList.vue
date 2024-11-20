<script setup lang="tsx">
import { Table } from '@/components/Table';
import { ref, computed } from 'vue';

// 生成大量模拟数据
const mockData = Array.from({ length: 10000 }).map((_, index) => ({
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

// 虚拟列表相关配置
const itemHeight = 40; // 每行高度
const visibleCount = 10; // 可见行数

const scrollTop = ref(0);
const containerHeight = computed(() => itemHeight * visibleCount);
const totalHeight = computed(() => itemHeight * mockData.length);

// 计算当前可见数据
const visibleData = computed(() => {
  const start = Math.floor(scrollTop.value / itemHeight);
  const end = start + visibleCount;
  return mockData.slice(start, end);
});

const handleScroll = (e) => {
  scrollTop.value = e.target.scrollTop;
};
</script>

<template>
  <div>
    <HighlightBlock>
      <p>虚拟列表简单示例：</p>
      <ul>
        <li>适用于大数据量场景(10000+数据),只渲染可视区域的数据</li>
      </ul>
      
      <p class="mt-4">实现思路：</p>
      <ol>
        <li>设置固定的容器高度 itemHeight * visibleCount = 400px</li>
        <li>创建一个和完整列表等高的占位容器 itemHeight * totalCount = 40000px</li>
        <li>监听滚动事件,根据 scrollTop 计算当前需要显示的数据范围, start = Math.floor(scrollTop.value / itemHeight)</li>
        <li>显示区域 根据scrollTop 来定位当前显示的内容，否则会滚走</li>
        <li>通过计算只渲染可视区域的数据,大大减少DOM节点数量</li>
      </ol>
    </HighlightBlock>

    <div 
      class="virtual-list-container" 
      :style="{ height: containerHeight + 'px' }"
      @scroll="handleScroll"
    >
      <div 
        class="virtual-list-phantom" 
        :style="{ height: totalHeight + 'px' }"
      />
      <div 
        class="virtual-list" 
        :style="{ transform: `translateY(${scrollTop}px)` }"
      >
        <Table
          :columns="columns"
          :data="visibleData"
          :show-pagination="false"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.virtual-list-container {
  overflow-y: auto;
  position: relative;
  border: 1px solid #eee;
}

.virtual-list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.virtual-list {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
}
</style> 