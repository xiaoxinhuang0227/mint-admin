<script lang="tsx">
import { ComponentSize, ElTable, ElTableColumn, ElTooltipProps } from 'element-plus'
import { computed, defineComponent, onMounted, PropType, ref, unref, watch } from 'vue';
import { propTypes } from '@/utils/propTypes.ts';
import type { TableProps, TableColumn, Pagination, TableSetProps } from './types'

export default defineComponent({
  name: 'Table',
  props: {
    pageSize: propTypes.number.def(20),
    currentPage: propTypes.number.def(1),
    // 是否所有的超出隐藏，优先级低于schema中的showOverflowTooltip,
    showOverflowTooltip: propTypes.bool.def(true),
    // 表头
    columns: {
      type: Array as PropType<TableColumn[]>,
      default: () => []
    },
    // 是否展示分页
    pagination: {
      type: Object as PropType<Pagination>,
      default: (): Pagination | undefined => undefined
    },
    // 加载状态
    loading: propTypes.bool.def(false),
    // 对齐方式
    align: propTypes.string
      .validate((v: string) => ['left', 'center', 'right'].includes(v))
      .def('left'),
    // 表头对齐方式
    headerAlign: propTypes.string
      .validate((v: string) => ['left', 'center', 'right'].includes(v))
      .def('left'),
    data: {
      type: Array,
      default: () => []
    },
    treeProps: {
      type: Object as PropType<{ hasChildren?: string; children?: string; label?: string }>,
      default: () => ({ hasChildren: 'hasChildren', children: 'children', label: 'label' })
    },
    height: propTypes.oneOfType([Number, String]),
    maxHeight: propTypes.oneOfType([Number, String]),
    stripe: propTypes.bool.def(true),
    border: propTypes.bool.def(false),
    fit: propTypes.bool.def(true),
    size: {
      type: String as PropType<ComponentSize>,
      validator: (v: ComponentSize) => ['default', 'small', 'large'].includes(v),
      default: 'default'
    },
    emptyText: propTypes.string.def('暂无数据'),
    rowKey: propTypes.string.def('id'),
    defaultExpandAll: propTypes.bool.def(false),
    highlightCurrentRow: propTypes.bool.def(false),
    tooltipEffect: {
      type: String as PropType<'dark' | 'light'>,
      default: 'dark'
    },
    tooltipOptions: {
      type: Object as PropType<
        Pick<
          ElTooltipProps,
          | 'effect'
          | 'enterable'
          | 'hideAfter'
          | 'offset'
          | 'placement'
          | 'popperClass'
          | 'popperOptions'
          | 'showAfter'
          | 'showArrow'
        >
      >,
      default: () => ({
        enterable: true,
        placement: 'top',
        showArrow: true,
        hideAfter: 200,
        popperOptions: { strategy: 'fixed' }
      })
    },
  },
  emits: ['update:pageSize', 'update:currentPage', 'register', 'refresh'],
  setup(props, { attrs, emit, slots, expose }) {
    const tableSlots = {};
    const pageSizeRef = ref(props.pageSize);
    const currentPageRef = ref(props.currentPage);

    const elTableRef = ref<InstanceType<typeof ElTable>>();
    onMounted(() => {
      const tableRef = unref(elTableRef);
      emit('register', tableRef?.$parent, elTableRef);
    })

    // useTable传入的props
    const outsideProps = ref<TableProps>({})
    const mergeProps = ref<TableProps>({});

    const getProps = computed(() => {
      const propsObj = { ...props }
      Object.assign(propsObj, unref(mergeProps))
      return propsObj
    })

    const setProps = (props: TableProps = {}) => {
      mergeProps.value = Object.assign(unref(mergeProps), props);
      outsideProps.value = { ...props } as any;
    }

    const addColumn = (column: TableColumn, index?: number) => {
      const { columns } = unref(getProps);
      if (index !== undefined) {
        columns.splice(index, 0, column);
      } else {
        columns.push(column);
      }
      setProps({ columns });
    }

    const deleteColumn = (columnField: string) => {
      const { columns } = unref(getProps);
      
      const index = columns.findIndex((item) => item.field === columnField);
      if (index !== -1) {
        columns.splice(index, 1);
      }
      setProps({ columns });
    }

    const setColumn = (columnProps: TableSetProps[], columnsChildren?: TableColumn[]) => {
      const { columns } = unref(getProps);
      for (const v of (columnsChildren || columns as TableColumn[])) {
        for (const item of columnProps) {
          if (v.field === item.field) {
            v[item.path] = item.value;
            setProps({ columns });
          } else if (v.children?.length) {
            setColumn(columnProps, v.children);
          }
        }
      }
    }

    expose ({
      setProps,
      addColumn,
      deleteColumn,
      setColumn
    })

    const getBindValue = computed(() => {
      const bindValue = { ...attrs, ...unref(getProps) }
      delete bindValue.columns
      delete bindValue.data
      return bindValue
    })

    const pagination = computed(() => {
      return Object.assign(
        {
          size: 'small',
          background: false,
          pagerCount: 7,
          layout: 'sizes, prev, pager, next, jumper, ->, total',
          pageSizes: [10, 20, 30, 40, 50, 100],
          disabled: false,
          hideOnSinglePage: false,
          total: 10
        },
        unref(getProps).pagination
      )
    })

    watch(
      () => unref(getProps).pageSize,
      (val: number) => {
        pageSizeRef.value = val;
      }
    );

    watch(
      () => unref(getProps).currentPage,
      (val: number) => {
        currentPageRef.value = val;
      }
    )
    
    const handlePageSizeChange = (val: number) => {
      emit('update:pageSize', val);
    }

    const handleCurrentPageChange = (val: number) => {
      emit('update:currentPage', val);
    }

    const renderTableColumn = (columnsChildren?: TableColumn[]) => {
      const {
        columns,
        align,
        headerAlign,
        showOverflowTooltip
      } = unref(getProps);

      return ((columnsChildren || columns) as TableColumn[]).map(v => {
        if (v.hidden) return null;
        if (v.type === 'selection') {
          return (
            <ElTableColumn
              type="selection"
              key="selection"
              align={ align }
              showOverflowTooltip={ false }
              headerAlign={ headerAlign }
              selectable={ v.selectable }
              width="60"
            ></ElTableColumn>
          )
        } else {
          const columnProps = { ...v };
          
          if (columnProps.children) delete columnProps.children;

          const slots = {
            default: (...args: any[]) => {
              const { row, column, $index } = args[0];
              const columnValue = row[v.field];

              if (columnProps?.slots?.default) {
                return columnProps.slots.default(...args);
              } else if (columnProps?.type === 'img') {
                return <el-image src={ columnValue }></el-image>
              } else {
                if (v?.formatter) {
                  return v.formatter(columnValue, row, column, $index);
                } else {
                  return typeof(columnValue) == 'number' ? (columnValue || 0) : (columnValue || '-');
                }
              }
            }
          };

          if (columnProps?.slots?.header) {
            slots['header'] = (...args: any[]) => columnProps.slots.header(...args);
          }
          return (
            <ElTableColumn
              showOverflowTooltip={ showOverflowTooltip }
              align={ align }
              headerAlign={ headerAlign }
              { ...columnProps }
              prop={ v.field }
              key={ v.field }
              onSizeChange={ handlePageSizeChange }
              onCurrentChange={ handleCurrentPageChange }
            >
              { slots }
            </ElTableColumn>
          )
        }
      })
    }
    
    return () => {
      return (
        <div v-loading={ unref(getProps).loading }>
          <el-table ref={ elTableRef } data={ unref(getProps).data } { ...unref(getBindValue) }>
            {{
              default: () => renderTableColumn(),
              ...tableSlots
            }}
          </el-table>
          {unref(getProps).pagination ? (
            <el-pagination
              v-model:pageSize={ pageSizeRef.value }
              v-model:currentPage={ currentPageRef.value }
              class="table-pagination"
              {...unref(pagination)}
              onSizeChange={ handlePageSizeChange }
              onCurrentChange={ handleCurrentPageChange }
            ></el-pagination>
          ) : undefined}
          
        </div>
      )
    }
  }
})
</script>

<style scoped lang="scss">
.table-pagination {
  margin: 20px 40px 0;
}
</style>