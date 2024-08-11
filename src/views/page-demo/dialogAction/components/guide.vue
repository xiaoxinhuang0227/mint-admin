<script setup lang="tsx">
import { onMounted, ref } from 'vue';
import { Table } from '@/components/Table';
import TableAPI, { IUseTableResult } from '@/api/table';

onMounted(() => {
  getData();
})

const tableData = ref<IUseTableResult>();
const getData = async () => {
  try {
    const res: IUseTableResult = await TableAPI.getUseCurdData();
    tableData.value = res.items;
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
      <p>useCrudSchema Hook</p>
      <ol>
        <li>统一配置 Search / Form / Table / Descriptions 组件的布局配置，更详细的用法可以看组件示例</li>
        <li>const { allSchemas } = useCrudSchemas(crudSchemas)</li>
        <li>allSchemas: { fromSchema, searchSchema, detailSchema, tableColumns } 存放四个组件需要的配置数据</li>
      </ol>
    </HighlightBlock>
    <div>
      <p class="table-header-section text-align-center">formSchema</p>
      <Table :columns="columns" :data="tableData"></Table>
    </div>
  </div>
</template>