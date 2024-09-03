<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import Echart from '@/components/Echarts/index.vue';
import { Table } from '@/components/Table';
import { useTable } from '@/hooks/useTable';
import { CrudSchema, useCrudSchemas } from '@/hooks/useCrudSchemas';

const option = ref();
const sunburstRef = ref();

const chartData = [
  {
    id: 1,
    name: '一级1',
    children: [
      {
        id: 2,
        name: '二级1-1',
        value: 15,
      },
      {
        id: 3,
        name: '二级1-2',
        value: 10,
      }
    ]
  },
  {
    id: 4,
    name: '一级2',
    children: [
      {
        id: 5,
        name: '二级2-1',
        value: 12
      }
    ]
  }
];

const { tableRegister, tableState, tableMethods } = useTable({
  fetchDataApi: async () => {
    return {
      list: chartData,
      total: chartData.length
    } 
  },
})
const { dataList } = tableState;
const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'name',
    label: '名称'
  },
  {
    field: 'value',
    label: '值'
  }
])

const { allSchemas } = useCrudSchemas(crudSchemas);
const { getElTableExpose } = tableMethods;
const loadOption = () => {
  option.value = {
    title: {
      text: '旭日图'
    },
    series: {
      type: 'sunburst',
      data: chartData,
      radius: [60, '90%'],
      itemStyle: {
        borderRadius: 7,
        borderWidth: 2
      },
      label: {
        show: false,
      }
    },
    tooltip: {
      trigger: 'item',
    },
    toolbox: {
      feature: {
        dataView: { show: false }
      }
    },
    xAxis: {
      show: false
    }
  }
}

onMounted(() => {
  loadOption();
})

const chartMouseOver = (params) => {
  let row = {};
  dataList.value.forEach(item => {
    const curId = params.data.id;
    if (item.id === curId) {
      row = item;
    } else {
      const findChild = item?.children.find(v => v.id === curId)
      if (findChild) {
        row = findChild;
      }
    }
  });
  setTableHighlight(row);
}

const chartMouseOut = () => {
  setTableHighlight(null);
}

const setTableHighlight = async (row) => {
  const elRef = await getElTableExpose();
  elRef.setCurrentRow(row);
}

const tableCellMouseEnter = (row) => {
  sunburstRef?.value?.dispatchAction({
    type: 'highlight',
    name: row.name
  })
}

const tableCellMouseLeave = (row) => {
  sunburstRef?.value?.dispatchAction({
    type: 'downplay',
    name: row.name
  })
}
</script>

<template>
  <div class="flex">
    <Echart
      class="mr-5 flex-shrink-0"
      v-if="option"
      ref="sunburstRef"
      @mouseover="chartMouseOver"
      @mouseout="chartMouseOut"
      :options="option"
      width="300px"
      height="300px"
    ></Echart>
    <Table
      class="flex-1"
      :columns="allSchemas.tableColumns"
      :data="dataList"
      @register="tableRegister"
      :defaultExpandAll="true"
      :highlightCurrentRow="true"
      @mouseEnter="tableCellMouseEnter"
      @mouseLeave="tableCellMouseLeave"
    ></Table>
  </div>
</template>