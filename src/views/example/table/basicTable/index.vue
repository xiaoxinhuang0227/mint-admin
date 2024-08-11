<script setup lang="tsx">
import { onMounted, ref } from 'vue';
import { Table } from '@/components/Table';
import TableAPI, { IBaseTableResult } from '@/api/table';

onMounted(() => {
  getData();
})

const tableData = ref<IBaseTableResult>();
const getData = async () => {
  try {
    const res: IBaseTableResult = await TableAPI.getBasicTableData();
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
  },
]

const attributesColumns = [
  ...columns,
  {
    label: '可选项',
    field: 'options',
    width: 300,
    formatter: (data: string[]) => {
      return data.join('/')
    }
  },
]
</script>

<template>
  <div class="page-table-example-basic">
    <HighlightBlock>
      Table组件，仅需传入columns表格配置和data表格数据即可渲染表格
    </HighlightBlock>
    <div>
      <p class="table-header-section text-align-center">tableColumns</p>
      <Table :columns="columns" :data="tableData?.tableColumns"></Table>
    </div>
    <div>
      <p class="table-header-section text-align-center">Table 属性</p>
      <Table :columns="attributesColumns" :data="tableData?.tableAttributes"></Table>
    </div>
  </div>
</template>