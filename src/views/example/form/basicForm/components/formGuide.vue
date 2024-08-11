<script setup lang="tsx">
import { onMounted, ref } from 'vue';
import { Table } from '@/components/Table';
import TableAPI, { IBaseFormResult } from '@/api/table';

onMounted(() => {
  getData();
})

const tableData = ref<IBaseFormResult>();
const getData = async () => {
  try {
    const res: IBaseFormResult = await TableAPI.getBasicFormData();
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
      Form组件，仅需传入schema即可渲染表单
    </HighlightBlock>
    <div>
      <p class="table-header-section text-align-center">formSchema</p>
      <Table :columns="columns" :data="tableData?.formSchema"></Table>
    </div>
    <div>
      <p class="table-header-section text-align-center">Form 属性</p>
      <Table :columns="attributesColumns" :data="tableData?.formAttributes"></Table>
    </div>
  </div>
</template>