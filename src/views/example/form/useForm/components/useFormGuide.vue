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
    const res: IUseTableResult = await TableAPI.getUseFormData();
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
      <p>useForm Hook + Form组件，使用步骤如下：</p>
      <ol>
        <li>@register 注册useForm</li>
        <li>绑定 schema 表单结构，rules 表单验证规则</li>
        <li>使用 formMethods 进行表单操作 </li>
      </ol>
    </HighlightBlock>
    <div>
      <p class="table-header-section text-align-center">formSchema</p>
      <Table :columns="columns" :data="tableData"></Table>
    </div>
  </div>
</template>