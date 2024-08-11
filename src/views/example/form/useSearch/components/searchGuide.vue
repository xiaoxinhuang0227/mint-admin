<script setup lang="tsx">
import { onMounted, ref } from 'vue';
import { Table } from '@/components/Table';
import TableAPI, { IUseSearchResult } from '@/api/table';

onMounted(() => {
  getData();
})

const tableData = ref<IUseSearchResult>();
const getData = async () => {
  try {
    const res: IUseSearchResult = await TableAPI.getUseSearchData();
    tableData.value = res;
  } catch(e) {
    console.log(e);
  }
}

const sameColumns = [
  {
    label: '属性',
    field: 'name',
    width: 300
  },
  {
    label: '说明',
    field: 'desc',
  },
]

const columns = [
  ...sameColumns,
  {
    label: '类型',
    field: 'dataType',
    width: 300,
  },
]

</script>

<template>
  <div class="page-table-example-basic">
    <HighlightBlock>
      <p>useSearch Hook + Search组件，使用步骤如下：</p>
      <ol>
        <li>@register 注册useSearch</li>
        <li>绑定 schema 表单结构</li>
        <li>绑定 @search @reset 事件，获取搜索的表单数据</li>
        <li>使用 SearchMethods 进行表单操作 </li>
      </ol>
    </HighlightBlock>
    <div>
      <p class="table-header-section text-align-center">Search组件</p>
      <Table :columns="columns" :data="tableData?.searchComponents"></Table>
    </div>
    <div>
      <p class="table-header-section text-align-center">useSearch</p>
      <Table :columns="columns" :data="tableData?.useSearch"></Table>
    </div>
  </div>
</template>