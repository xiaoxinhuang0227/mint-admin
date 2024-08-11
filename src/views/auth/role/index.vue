<script setup lang="tsx">
import { reactive, ref, unref } from 'vue'
import AuthAPI, { IRoleResult, IRole } from '@/api/auth'
import { useTable } from '@/hooks/useTable'
import { Table, TableColumn } from '@/components/Table'
import { Search } from '@/components/Search'
import { FormSchema } from '@/components/Form'
import ContentWrap from '@/components/ContentWrap/index.vue'
import Write from './components/roleWrite.vue'
import Detail from './components/roleDetail.vue'
import Dialog from '@/components/Dialog/index.vue'
import BaseButton from '@/components/BaseButton/index.vue'
import { formatToDateTime } from '@/utils/dateUtil'
import { ElMessage } from 'element-plus';

const searchParams = ref({});
const id = ref<number | undefined>();

const { tableRegister, tableState, tableMethods } = useTable({
  fetchDataApi: async () => {
    const { pageSize, currentPage } = tableState;
    const res: IRoleResult = await AuthAPI.getRoleList({
      page: unref(currentPage),
      limit: unref(pageSize),
      ...unref(searchParams)
    })
    return {
      list: res.items || [],
      total: res.total
    }
  },
  fetchDelApi: async () => {
    const res = await deleteRoleApi(id.value!)
    return !!res
  }
})

const { dataList, loading, total, currentPage, pageSize } = tableState
const { getList, delList } = tableMethods

const tableColumns = reactive<TableColumn[]>([
  {
    field: 'id',
    label: 'ID',
    width: 100
  },
  {
    field: 'name',
    label: '角色名称',
    width: 150
  },
  {
    field: 'remark',
    label: '备注',
  },
  {
    field: 'createdAt',
    label: '创建时间',
    width: 250,
    formatter: (data: IRole) => {
      return formatToDateTime(data.createdAt);
    },
  },
  {
    field: 'updatedAt',
    label: '更新时间',
    width: 250,
    formatter: (data: IRole) => {
      return formatToDateTime(data.updatedAt);
    },
  },
  {
    field: 'action',
    label: '操作',
    width: 300,
    slots: {
      default: (data: any) => {
        const row = data.row
        return (
          <>
            <BaseButton type="primary" onClick={() => action(row, 'edit')}>编辑</BaseButton>
            <BaseButton type="success" onClick={() => action(row, 'detail')}>详情</BaseButton>
            <BaseButton type="danger" onClick={() => delData(data.row)}>删除</BaseButton>
          </>
        )
      }
    }
  }
])

const searchSchema = reactive<FormSchema[]>([
  {
    field: 'name',
    label: '角色名称',
    component: 'Input',
  }
])

const setSearchParams = (data: any) => {
  searchParams.value = data
  getList()
}

const save = async () => {
  try {
    const write = unref(writeRef)
    const formData = await write?.submit() as IRole;

    if (formData) {
      saveLoading.value = true
      if (actionType.value === 'add') {
        await addRoleApi(formData);
        ElMessage.success('添加成功')
      } else if (actionType.value === 'edit') {
        await editRoleApi(formData);
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

const delLoading = ref(false)

const delData = async (row: IRole | null) => {
  id.value = Number(row?.id);
  await delList(id.value!).finally(() => {
    delLoading.value = false
  })
}

// 弹窗相关
const dialogVisible = ref(false)
const dialogTitle = ref('')

const currentRow = ref()
const actionType = ref('')

const writeRef = ref()

const saveLoading = ref(false)

const action = (row: any, type: string) => {
  dialogTitle.value = type === 'edit' ? '编辑' : '详情'
  actionType.value = type
  currentRow.value = row
  dialogVisible.value = true
}

const AddAction = () => {
  dialogTitle.value = '添加'
  currentRow.value = undefined
  dialogVisible.value = true
  actionType.value = 'add'
}

</script>

<template>
  <div>
    <ContentWrap class="m-3" title="角色管理">
      <Search :schema="searchSchema" @reset="setSearchParams" @search="setSearchParams" />
      <template #action>
        <BaseButton type="primary" @click="AddAction">新增</BaseButton>
      </template>
      <Table
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :columns="tableColumns"
        default-expand-all
        node-key="id"
        :data="dataList"
        :loading="loading"
        :pagination="{
          total
        }"
        @register="tableRegister"
      />
    </ContentWrap>

    <Dialog v-model="dialogVisible" :title="dialogTitle" width="600px">
      <Write v-if="actionType !== 'detail'" ref="writeRef" :current-row="currentRow" />
      <Detail v-else :current-row="currentRow" />

      <template #footer>
        <BaseButton
          v-if="actionType !== 'detail'"
          type="primary"
          :loading="saveLoading"
          @click="save"
        >
          保存
        </BaseButton>
        <BaseButton @click="dialogVisible = false">关闭</BaseButton>
      </template>
    </Dialog>
  </div>
</template>
