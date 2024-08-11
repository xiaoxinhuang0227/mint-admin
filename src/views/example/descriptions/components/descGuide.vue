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
    const res: IUseTableResult = await TableAPI.getUseDescData();
    tableData.value = res.items;
  } catch(e) {
    console.log(e);
  }
}

const sameColumns = [
  {
    label: '属性',
    field: 'name',
    width: 200
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
  {
    label: '可选项',
    field: 'options',
    width: 300,
    formatter: (data: string[]) => {
      return data?.length ? data.join('/') : '-'
    }
  },
]

</script>

<template>
  <div class="page-table-example-basic">
    <div>
      <p class="table-header-section text-align-center">Descriptions 组件传入参数</p>
      <Table :columns="columns" :data="tableData"></Table>
    </div>
  </div>
</template>