<script setup lang="tsx">
import { ref, unref, reactive } from 'vue';
import { useRouter } from 'vue-router'

import { ElMessage, ElTag, ElMessageBox } from 'element-plus';
import { Search } from '@/components/Search'
import ContentWrap from '@/components/ContentWrap/index.vue';
import { Table, TableColumn } from '@/components/Table';
import BaseButton from '@/components/BaseButton/index.vue';
import Write from './components/managerWrite.vue';
import Dialog from '@/components/Dialog/index.vue';

import { useTable } from '@/hooks/useTable';
import { CrudSchema, useCrudSchemas } from '@/hooks/useCrudSchemas';
import { formatToDateTime } from '@/utils/dateUtil';

import AuthAPI, { IManager, IManagerResult, IRole, IRoleResult } from '@/api/auth';
// import { FREEZE_STATUS } from '@/constants/conf';

const { currentRoute } = useRouter()
const pageTitle = currentRoute.value.meta.title;

const searchParams = ref({});
const roleOpts = ref();
const id = ref<number | undefined>();

const delLoading = ref(false)

const getRoleOpts = async () => {
  const res: IRoleResult = await AuthAPI.getRoleList();
  return roleOpts.value = res.items.map((v: IRole) => {
    return { label: v.name, value: v.id }
  });
}
getRoleOpts();

const { tableRegister, tableState, tableMethods } = useTable({
  fetchDataApi: async () => {
    const { pageSize, currentPage } = tableState
    const res: IManagerResult = await AuthAPI.getManagerList({
      page: unref(currentPage),
      limit: unref(pageSize),
      ...unref(searchParams)
    })
    return {
      list: res.items || [],
      total: res.total || 0
    }
  },
  fetchDelApi: async () => {
    // const res = await deleteManagerApi(id.value!)
    // return !!res
  }
})

const { total, loading, dataList, pageSize, currentPage } = tableState;
const { delList, getList } = tableMethods;

const currentRow = ref<IManager>()
const actionType = ref('')

const delData = async (row: IManager) => {
  id.value = Number(row.id);
  await delList(1).finally(() => {
    delLoading.value = false
  })
}

const AddAction = () => {
  dialogTitle.value = '新增用户'
  currentRow.value = undefined
  dialogVisible.value = true
  actionType.value = 'add'
}

// 表格操作按钮
const action = (row: IManager, type: string) => {
  dialogTitle.value = '编辑';
  actionType.value = type
  currentRow.value = row;
  dialogVisible.value = true
}

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'id',
    label: 'ID',
    form: { hidden: true },
    search: { hidden: true },
    table: { width: 100 }
  },
  {
    field: 'account',
    label: '账号',
    table: { width: 200 },
    form: {
      colProps: { span: 24 },
      component: 'Input',
      componentProps: {
        maxlength: 10,
        showWordLimit: true
      }
    }
  },
  {
    field: 'realName',
    label: '用户名',
    form: {
      colProps: { span: 24 },
      component: 'Input',
      componentProps: {
        maxlength: 10,
        showWordLimit: true
      }
    }
  },
  {
    field: 'roleId',
    label: '角色',
    table: { width: 200 },
    search: { hidden: true },
    form: {
      component: 'Select',
      colProps: { span: 24 },
      componentProps: {
        clearable: false,
        options: roleOpts
      }
    },
    formatter: (data) => {
      return data.roleName || '-';
    }
  },
  {
    field: 'phone',
    label: '手机号',
    table: { width: 200 },
    search: { hidden: true },
    form: { colProps: { span: 24 } }
  },
  {
    field: 'password',
    label: '密码',
    form: {
      component: 'InputPassword',
      colProps: { span: 24 },
      componentProps: {
        clearable: false,
        type: 'password'
      }
    },
    table: { hidden: true },
    search: { hidden: true }
  },
  {
    field: 'createdAt',
    label: '创建时间',
    table: { width: 250 },
    formatter: (data) => {
      return formatToDateTime(data.createdAt);
    },
    form: { hidden: true },
    search: { hidden: true }
  },
  {
    field: 'updatedAt',
    label: '更新时间',
    table: { width: 250 },
    formatter: (data) => {
      return formatToDateTime(data.updatedAt);
    },
    form: { hidden: true },
    search: { hidden: true }
  },
  // {
  //   field: 'status',
  //   label: '状态',
  //   search: { hidden: true },
  //   form: { hidden: true },
  //   table: { width: 100 },
  //   formatter: (data) => {
  //     const status = data.status;
  //     return (
  //       <ElTag
  //         type={ status ? 'info' : '' }
  //       >
  //         { FREEZE_STATUS[status] }
  //       </ElTag>
  //     )
  //   },
  // },
  {
    field: 'action',
    label: '操作',
    form: { hidden: true },
    detail: { hidden: true },
    search: { hidden: true },
    table: {
      width: 280,
      slots: {
        default: (data: any) => {
          const row = data.row as IManager
          return (
            <>
              <BaseButton type="primary" onClick={() => action(row, 'edit')}>编辑</BaseButton>
              {/* <BaseButton type={ !row.status ? 'warning' : 'success' } onClick={() => beforeChangeStatus(row)}>{ row.status ? '解冻' : '冻结' }</BaseButton> */}
              <BaseButton loading={ delLoading.value } type="danger" onClick={() => delData(row)}>删除</BaseButton>
            </>
          )
        }
      }
    }
  }
])
const { allSchemas } = useCrudSchemas(crudSchemas)

// const beforeChangeStatus = (row) => {
//   let tip = !row.status ?
//             '确认冻结账号吗？' :
//             '确认解冻吗？'
//   return new Promise((resolve, reject) => {
//     ElMessageBox.confirm(tip, '提示')
//     .then(async () => {
//       await reqStatusChange(row);
//       resolve(true);
//     })
//     .catch(() => {
//       reject();
//     })
//   })
// }

// const reqStatusChange = async (row) => {
//   try {
//     if (!row.status) {
//       await freezeUserApi(row.id);
//       ElMessage.success('冻结账号成功');
//     } else {
//       await unfreezeUserApi(row.id);
//       ElMessage.success('解冻成功');
//     }
    
//     getList();
//   } catch (e) {
//     console.log(e);
//   }
// }

// 弹窗
const dialogVisible = ref(false)
const dialogTitle = ref('')
const writeRef = ref()
const saveLoading = ref(false)

const save = async () => {
  try {
    const write = unref(writeRef)
    const formData = await write?.submit() as IManager;

    if (formData) {
      saveLoading.value = true
      if (actionType.value === 'add') {
        // await addManagerApi(formData);
        ElMessage.success('添加成功')
      } else if (actionType.value === 'edit') {
        // await editManagerApi(formData);
        ElMessage.success('修改成功')
      }
      getList();
      dialogVisible.value = false
    }
  } catch (e) {
    console.log(e);
  } finally {
    saveLoading.value = false
  }
}

const setSearchParams = (params: any) => {
  currentPage.value = 1
  searchParams.value = params
  getList()
}

</script>

<template>
  <div>
    <ContentWrap :title="pageTitle">
      <template #action>
        <BaseButton type="primary" @click="AddAction">新增</BaseButton>
      </template>

      <Search
        :schema="allSchemas.searchSchema"
        @reset="setSearchParams"
        @search="setSearchParams"
      />
      <Table
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :columns="allSchemas.tableColumns"
        :data="dataList"
        :loading="loading"
        @register="tableRegister"
        :preview="['avatar']"
        :pagination="{ total }"
      />
    </ContentWrap>

    <Dialog v-model="dialogVisible" :title="dialogTitle" width="400px" max-height="200px">
      <Write
        ref="writeRef"
        :form-schema="allSchemas.formSchema"
        :current-row="currentRow"
      />
      <template #footer>
        <BaseButton
          type="primary"
          :loading="saveLoading"
          @click="save"
        >保存</BaseButton>
        <BaseButton @click="dialogVisible = false">取消</BaseButton>
      </template>
    </Dialog>
  </div>
</template>