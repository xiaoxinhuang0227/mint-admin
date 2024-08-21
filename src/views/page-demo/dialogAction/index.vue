<script setup lang="tsx">
import { Search } from '@/components/Search'
import Dialog from '@/components/Dialog/index.vue'
import { Table } from '@/components/Table'
import TableAPI, { ITableResult, ITableData } from '@/api/table'
import { useTable } from '@/hooks/useTable'
import { ref, unref, reactive } from 'vue'
import Write from './components/write.vue'
import Detail from './components/detail.vue'
import Guide from './components/guide.vue'
import { CrudSchema, useCrudSchemas } from '@/hooks/useCrudSchemas'
import { ElInputNumber } from 'element-plus';

const ids = ref<string[]>([]);

const { tableRegister, tableState, tableMethods } = useTable({
  fetchDataApi: async () => {
    const { currentPage, pageSize } = tableState;
    const res: ITableResult = await TableAPI.getTableData({
      pageIndex: unref(currentPage),
      pageSize: unref(pageSize)
    });
    return {
      list: res.items,
      total: res.total
    } 
  },
  fetchDelApi: async () => {
    const res = await TableAPI.delTableData(unref(ids));
    return !!res;
  }
})

const { loading, dataList, total, currentPage, pageSize } = tableState;
const { getList, getElTableExpose, delList } = tableMethods;

const searchParams = ref({});
const setSearchParams = (params: any) => {
  searchParams.value = params;
  getList();
}

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'selection',
    search: {
      hidden: true
    },
    form: {
      hidden: true
    },
    detail: {
      hidden: true
    },
    table: {
      type: 'selection'
    }
  },
  {
    field: 'title',
    label: '标题',
    search: {
      component: 'Input'
    },
    form: {
      component: 'Input',
      colProps: {
        span: 24
      }
    },
    detail: {
      span: 24
    }
  },
  {
    field: 'author',
    label: '作者',
    form: {
      component: 'Input',
      colProps: {
        span: 24
      }
    },
    search: {
      hidden: true
    }
  },
  {
    field: 'display_time',
    label: '创建时间',
    search: {
      hidden: true
    },
    form: {
      component: 'DatePicker',
      colProps: {
        span: 24
      },
      componentProps: {
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss'
      }
    }
  },
  {
    field: 'pageviews',
    label: '阅读数',
    table: {
      width: 200,
      formatter: (_, row) => {
        return <ElInputNumber
                  key={ row.id }
                  v-model={ row.pageviews }
                  size='small'
                  min={1}
                  max={9999999}
                  precision={0}
               ></ElInputNumber>
      }
    },
    search: {
      hidden: true
    },
    form: {
      component: 'InputNumber',
      value: 0,
      colProps: {
        span: 24
      }
    }
  },
  {
    field: 'action',
    width: '300px',
    label: '操作',
    search: {
      hidden: true
    },
    form: {
      hidden: true
    },
    detail: {
      hidden: true
    },
    table: {
      slots: {
        default: (data: any) => {
          return (
            <>
              <el-button type="primary" onClick={() => action(data.row, 'edit')}>
                编辑
              </el-button>
              <el-button type="success" onClick={() => action(data.row, 'detail')}>
                详情
              </el-button>
              <el-button type="danger" onClick={() => delData(data.row)}>
                删除
              </el-button>
            </>
          )
        }
      }
    }
  }
])

const { allSchemas } = useCrudSchemas(crudSchemas);

const dialogVisible = ref(false);
const dialogTitle = ref('');

const currentRow = ref<ITableData | null>(null);
const actionType = ref('');

const addAction = () => {
  dialogTitle.value = '新增';
  actionType.value = 'add';
  dialogVisible.value = true;
  currentRow.value = null;
};

const delLoading = ref(false);

const delData = async (row: ITableData | null) => {
  const elTableExpose = await getElTableExpose();
  const selectedArr = elTableExpose.getSelectionRows();

  ids.value = selectedArr.map((item: ITableData) => item.id);
  delLoading.value = true;
  await delList(unref(ids).length).finally(() => {
    delLoading.value = false;
  });
};

const action = (row: ITableData, type: string) => {
  dialogTitle.value = type === 'edit' ? '编辑' : '详情';
  actionType.value = type;
  currentRow.value = row;
  dialogVisible.value = true;
}

const writeRef = ref<InstanceType<typeof Write>>();

const saveLoading = ref(false);
const save = async () => {
  const write = unref(writeRef);
  const formData = await write?.submit();
  if (!formData) return;

  saveLoading.value = true;
  try {
    await TableAPI.saveTableData(formData);
    dialogVisible.value = false;
    currentPage.value = 1;
    getList();
  } catch (e) {
    console.log(e);
  } finally {
    saveLoading.value = false;
  }
}
</script>

<template>
  <div class="dialog-page-demo">
    <div class="flex-between table-header-section">
      <Search :schema="allSchemas.searchSchema" @search="setSearchParams" @reset="setSearchParams"></Search>
      <div>
        <el-button type="primary" @click="addAction">新增</el-button>
        <el-button type="danger" :loading="delLoading" @click="delData">删除</el-button>
      </div>
    </div>
    <Table
      v-model:pageSize="pageSize"
      v-model:currentPage="currentPage"
      :columns="allSchemas.tableColumns"
      :data="dataList"
      :loading="loading"
      :pagination="{ total }"
      @register="tableRegister"
    ></Table>

    <Guide></Guide>

    <Dialog v-model="dialogVisible" fullscreen :title="dialogTitle">
      <Write
        v-if="actionType !== 'detail'"
        ref="writeRef"
        :form-schema="allSchemas.formSchema"
        :current-row="currentRow"
      ></Write>
      <Detail
        v-else
        :detail-schema="allSchemas.detailSchema"
        :current-row="currentRow"
      />
      <template #footer>
        <el-button
          v-if="actionType !== 'detail'"
          type="primary"
          :loading="saveLoading"
          @click="save"
        >保存</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </template>
    </Dialog>
  </div>
</template>