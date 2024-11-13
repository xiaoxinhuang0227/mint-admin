<script setup lang="tsx">
import { Table } from '@/components/Table';
import { useTable } from '@/hooks/useTable';
import { Icon } from '@/components/Icon';
import ColumnSetting from '@/components/Table/src/components/columnSetting.vue';
import { ref, unref, onMounted, onUnmounted, nextTick } from 'vue';

import TableAPI from '@/api/table';
import { TableColumn } from '@/components/Table/src/types';

const columns = [
  {
    type: 'selection',
    field: 'selection',
    label: '选择'
  },
  {
    label: '属性',
    field: 'name',
    width: 250
  },
  {
    label: '说明',
    field: 'desc',
  },
  {
    label: '类型',
    field: 'dataType',
  },
]

const { tableMethods, tableState, tableRegister } = useTable({
  fetchDataApi: async () => {
    const { currentPage, pageSize } = tableState;
    const res = await TableAPI.getUseTableData({
      pageIndex: unref(currentPage),
      pageSize: unref(pageSize)
    });
    return {
      list: res.items,
      total: res.total
    }
  },
});

const { currentPage, pageSize, total, dataList, loading } = tableState;
const { setColumn, delColumn, addColumn, getElTableExpose, refresh } = tableMethods;

const titleIdx = ref<number>(1);
const changeTitle = () => {
  setColumn([{
    field: 'name',
    path: 'label',
    value: `属性${ unref(titleIdx) }`
  }]);
  titleIdx.value = unref(titleIdx) + 1;
}

const showOperate = ref<boolean>(true);
const delOrAddAction = () => {
  const oldVal = unref(showOperate);
  if (oldVal) {
    delColumn('dataType');
  } else {
    addColumn({
      label: '类型',
      field: 'dataType',
    })
  }
  showOperate.value = !oldVal;
}

const isSelectedAll = ref<boolean>(false);
const changeSelectedStatus = async () => {
  const elTableRef = await getElTableExpose()
  elTableRef?.toggleAllSelection();
  isSelectedAll.value = !isSelectedAll.value;
}

const showSettingDrawer = ref<boolean>(false);
const newColumns = ref<TableColumn[]>([])
const openSettingDrawer = () => {
  showSettingDrawer.value = true;
}
const setNewColumns = (columns: TableColumn[]) => {
  newColumns.value = columns;
}

const showCustomMenu = ref<boolean>(false);
const tableRowContextMenu = async (row, col, event) => {
  event.preventDefault(); // 阻止默认的右键菜单
  showCustomMenu.value = true;
  
  await nextTick();
  const menu = document.getElementById('custom-menu');
  menu.style.left = event.pageX - 182 + 'px';
  menu.style.top = event.pageY - 52 + 'px';
  menu.addEventListener('contextmenu', function(event) {
    event.preventDefault();
  });
}

const hideCustomMenu = (e) => {
  if ((e.button === 0 || e.which === 1) && showCustomMenu.value) {
    showCustomMenu.value = false;
  }
}

onMounted(() => {
  window.addEventListener('click', hideCustomMenu)
})

onUnmounted(() => {
  window.removeEventListener('click', hideCustomMenu)
})
</script>

<template>
  <div class="page-table-example-basic">
    <HighlightBlock>
      <p>useTable Hook + Table组件，使用步骤如下：</p>
      <ol>
        <li>@register 注册useTable</li>
        <li>useTable()传入数据请求方法：fetchDataApi / fetchDelApi </li>
        <li>传入 tableState：columns / data / currentPage / pageSize / total</li>
        <li>使用 tableMethods 进行表格操作</li>
      </ol>
      <p>右键显示自定义菜单</p>
    </HighlightBlock>
    <div class="flex-between table-header-section">
      <div>
        <el-button @click="changeTitle">修改标题</el-button>
        <el-button @click="delOrAddAction">{{ showOperate ? '删除操作列' : '添加操作列' }}</el-button>
        <el-button @click="changeSelectedStatus">{{ isSelectedAll ? '取消全选' : '全选' }}</el-button>
      </div>
     
      <Icon class="clickable" icon="tdesign:setting-1" @click="openSettingDrawer"></Icon>
    </div>
    <Table
      @register="tableRegister"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :columns="newColumns.length ? newColumns : columns"
      :data="dataList"
      :loading="loading"
      :defaultExpandAll="true"
      :pagination="{ total }"
      @refresh="refresh"
      @row-contextmenu="tableRowContextMenu"
    ></Table>
    <ColumnSetting v-model="showSettingDrawer" @setNewColumns="setNewColumns" :columns="columns"></ColumnSetting>
    
    <div id="custom-menu" :style="`display: ${ showCustomMenu ? 'block' : 'none' };`">
     <p>自定义右键菜单</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>

#custom-menu {
 display: none;
 position: absolute;
 overflow: hidden;
 z-index: 1000;
 width: 150px;
 font-size: 14px;
 border-radius: 5px;
 background: white;
 border: 1px solid #dadada;
 box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
}

#custom-menu p {
 padding: 8px 12px;
 cursor: pointer;
 color: black;
}

#custom-menu p:hover {
 background-color: #f3f3f3;
}

</style>