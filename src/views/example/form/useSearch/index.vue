<script setup lang="tsx">
import { reactive, ref, unref } from 'vue';
import { FormSchema } from '@/components/Form';
import { useSearch } from '@/hooks/useSearch';
import ContentWrap from '@/components/ContentWrap/index.vue';
import Guide from './components/searchGuide.vue';

const { searchRegister, searchMethods } = useSearch()
const { setValues, getFormData } = searchMethods

const schema = reactive<FormSchema[]>([
  {
    field: 'field1',
    label: '输入框',
    component: 'Input'
  },
  {
    field: 'field2',
    label: '选择器',
    component: 'Select',
    componentProps: {
      style: {
        width: '200px',
      },
      options: [
        {
          disabled: true,
          label: 'option1',
          value: '1'
        },
        {
          label: 'option2',
          value: '2'
        }
      ]
    }
  },
  {
    field: 'field3',
    label: '输入框',
    component: 'Input'
  },
  {
    field: 'field4',
    component: 'DatePicker',
    label: '日期选择器',
    componentProps: {
      type: 'date'
    }
  },
  {
    field: 'field5',
    label: '输入框',
    component: 'Input'
  },
  {
    field: 'field6',
    label: '输入框',
    component: 'Input'
  },
  {
    field: 'field7',
    label: '输入框',
    component: 'Input'
  },
  {
    field: 'field8',
    label: '输入框',
    component: 'Input'
  },
])


const layout = ref('inline')

const changeLayout = () => {
  layout.value = unref(layout) === 'inline' ? 'bottom' : 'inline'
}

const buttonPosition = ref('left')

const changePosition = (position: string) => {
  layout.value = 'bottom'
  buttonPosition.value = position
}

const handleSearch = async (data: any) => {
  const formData = await getFormData()
  console.log(formData)
  console.log(data)
}

const setValue = () => {
  setValues({
    field1: 'Joy'
  })
}

const searchLoading = ref(false)
const changeSearchLoading = () => {
  searchLoading.value = true
  setTimeout(() => {
    searchLoading.value = false
  }, 2000)
}

const resetLoading = ref(false)
const changeResetLoading = () => {
  resetLoading.value = true
  setTimeout(() => {
    resetLoading.value = false
  }, 2000)
}
</script>

<template>
  <div class="page-use-search">
    <ContentWrap class="mt-5 ml-10 mr-10">
      <template #title>查询 - 动态操作</template>
      <el-button @click="changeLayout">按钮布局 {{ layout === 'inline' ? 'bottom' : 'inline' }}</el-button>
      <el-button @click="changePosition('left')">位置 - 左</el-button>
      <el-button @click="changePosition('center')">位置 - 中</el-button>
      <el-button @click="changePosition('right')">位置 - 右</el-button>
      <el-button @click="setValue">设置值</el-button>
      <el-button @click="changeSearchLoading">查询</el-button>
      <el-button @click="changeResetLoading">重置</el-button>
      <Search
        class="mt-5"
        :schema="schema"
        :layout="layout"
        :button-position="buttonPosition"
        :search-loading="searchLoading"
        :reset-loading="resetLoading"
        show-expand
        expand-field="field4"
        @search="handleSearch"
        @reset="handleSearch"
        @register="searchRegister"
      />
    </ContentWrap>
    <Guide></Guide>
  </div>
</template>