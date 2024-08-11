
import { Table, TableExpose, TableProps, TableSetProps, TableColumn } from '@/components/Table';
import { ElTable, ElMessageBox, ElMessage } from 'element-plus';
import { ref, watch, unref, nextTick, onMounted, Component } from 'vue';

interface UseTableConfig {
  /**
   * 是否初始化的时候请求一次
   */
  immediate?: boolean
  fetchDataApi: () => Promise<{
    list: any[]
    total?: number
  }>
  fetchDelApi?: () => Promise<boolean>
}


export const useTable = (config: UseTableConfig) => {
  const { immediate = true } = config;
  const loading = ref(false);
  const currentPage = ref(1);
  const pageSize = ref(10);
  const total = ref(0);
  const dataList = ref<any[]>([]);
  const tableRef = ref<typeof Table>();
  const elTableRef = ref<InstanceType<typeof ElTable>>();

  const register = (ref: typeof Table, elRef: InstanceType<typeof ElTable>) => {
    tableRef.value = ref;
    elTableRef.value = unref(elRef);
  }

  const getTableInstance = async () => {
    await nextTick();
    const table = unref(tableRef);
    if (!table) {
      throw new Error('The table is not registered. Please use the register method to register');
    }
    return table;
  }
 
  const methods = {
    getList: async () => {
      const { fetchDataApi } = config;
      if (!fetchDataApi) {
        console.warn('useTable hook: fetchDataApi is undefined');
        return;
      }

      loading.value = true;
      try {
        const res = await fetchDataApi();
        if (res) {
          dataList.value = res.list || [];
          total.value = res.total || 0;
        }
      } catch (e) {
        console.warn('useTable hook: fetchDataApi error');
      } finally {
        loading.value = false;
      }
    },
    delList: async (idsLength: number = 1) => {
      const { fetchDelApi } = config;
      if (!fetchDelApi) {
        console.warn('useTable hook: fetchDelApi is undefined');
        return;
      }
      ElMessageBox.confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await fetchDelApi();
        if (res) {
          ElMessage.success('删除成功');
          const curPage = unref(currentPage);
          // 临界点
          const current = unref(total) % unref(pageSize) === idsLength
                        ? curPage > 1 ? curPage - 1 : 1
                        : curPage;
          currentPage.value = current;
          methods.getList();
        }
      })
    },
    setProps: async (props: TableProps = {}) => {
      const table = await getTableInstance();
      table?.setProps(props);
    },
    setColumn: async (columnProps: TableSetProps[]) => {
      const table = await getTableInstance();
      table?.setColumn(columnProps);
    },
    addColumn: async (tableColumn: TableColumn, index?: number) => {
      const table = await getTableInstance();
      table?.addColumn(tableColumn, index);
    },
    delColumn: async (field: string) => {
      const table = await getTableInstance();
      table?.deleteColumn(field);
    },
    getElTableExpose: async () => {
      await getTableInstance();
      return unref(elTableRef);
    },
    refresh: () => {
      methods.getList()
    },
  }

  watch(currentPage, () => {
    methods.getList();
  });

  watch(pageSize, () => {
    if (unref(currentPage) !== 1) {
      currentPage.value = 1;
    }
    methods.getList();
  });

  onMounted(() => {
    if (immediate) {
      methods.getList();
    }
  });

  return {
    tableRegister: register,
    tableMethods: methods,
    tableState: {
      currentPage,
      pageSize,
      total,
      dataList,
      loading
    }
  }
}