<script setup lang="tsx">
import ContentWrap from '@/components/ContentWrap/index.vue';
import { FormSchema, Form, FormItemProps } from '@/components/Form';
import { reactive, ref, unref } from 'vue';
import { useValidator } from '@/hooks/useValidator';
import { useForm } from '@/hooks/useForm';
import Guide from './components/useFormGuide.vue';

const { required } = useValidator();
const { formRegister, formMethods } = useForm();
const { setProps, delSchema, addSchema, setValues, setSchema, getFormData, getElFormExpose, getComponentExpose } = formMethods;

const isDisabled = ref<boolean>(false);
const changeDisabled = () => {
  const v = !unref(isDisabled)
  setProps({ disabled: v })
  isDisabled.value = v;
}

const formRules = reactive({
  field1: required()
})
const changeSchema = (del: boolean) => {
  if (del) {
    delSchema('field2')
  } else if (!del && schema[1].field !== 'field2') {
    addSchema(
      {
        field: 'field2',
        label: '选择器',
        component: 'Select',
        componentProps: {
          options: [
            {
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
      1
    )
  }
}

const setValue = async (reset: boolean) => {
  const elFormExpose = await getElFormExpose()
  if (reset) {
    elFormExpose?.resetFields()
  } else {
    setValues({
      field1: 'field1',
      field2: '2',
      field3: '2',
      field4: ['1', '3'],
      field5: '2022-01-27',
    })
  }
}

const index = ref(7)

const setLabel = () => {
  setSchema([
    {
      field: 'field2',
      path: 'label',
      value: `选择器 ${index.value}`
    },
    {
      field: 'field2',
      path: 'componentProps.options',
      value: [
        {
          label: 'option-1',
          value: '1'
        },
        {
          label: 'option-2',
          value: '2'
        },
        {
          label: 'option-3',
          value: '3'
        }
      ]
    }
  ])
  index.value++
}

const formValidation = async () => {
  const elFormExpose = await getElFormExpose()
  elFormExpose?.validate((isValid, v) => {
    console.log(2222, isValid, v)
  })
}


const verifyReset = async () => {
  const elFormExpose = await getElFormExpose()
  elFormExpose?.resetFields()
}

const inputFocus = async () => {
  const inputEl = await getComponentExpose('field1')
  inputEl?.focus()
}

const formValidate = async (prop: FormItemProps, isValid: boolean, message: string) => {
  const data = await getFormData()
  console.log(444, prop, data, isValid, message)
}

const schema = reactive<FormSchema[]>([
  {
    field: 'field1',
    label: '输入框',
    component: 'Input',
  },
  {
    field: 'field2',
    label: '选择器',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: 'option1',
          value: '1'
        },
        {
          label: 'option2',
          value: '2'
        }
      ]
    },
  },
  {
    field: 'field3',
    label: '单选框',
    component: 'RadioGroup',
    hidden: true,
    value: '1',
    componentProps: {
      options: [
        {
          label: 'option-1',
          value: '1'
        },
        {
          label: 'option-2',
          value: '2'
        }
      ]
    }
  },
  {
    field: 'field4',
    label: '多选框',
    component: 'CheckboxGroup',
    value: ['1'],
    remove: true,
    componentProps: {
      options: [
        {
          label: 'option-1',
          value: '1'
        },
        {
          label: 'option-2',
          value: '2'
        },
        {
          label: 'option-3',
          value: '3'
        }
      ]
    }
  },
  {
    field: 'field5',
    component: 'DatePicker',
    label: '日期选择器',
    componentProps: {
      type: 'date'
    }
  },
])
</script>

<template>
  <div>
    <ContentWrap class="mt-5 ml-10 mr-10">
      <template #title><span>UseForm 操作</span></template>
      <div>
        <el-button @click="changeDisabled()">{{ isDisabled ? '解除禁用' : '禁用' }}</el-button>
        <el-button @click="changeSchema(true)">删除选择器</el-button>
        <el-button @click="changeSchema(false)">还原选择器</el-button>
        <el-button @click="setLabel">设置选择器</el-button>
        
        <el-button @click="setValue(false)">设置值</el-button>
        <el-button @click="setValue(true)">重置值</el-button>

        <el-button @click="inputFocus">聚焦输入框</el-button>

        <el-button @click="formValidation">表单验证</el-button>
      </div>
      <div class="mt-10">
        <Form :schema="schema" @register="formRegister" :rules="formRules"></Form>
      </div>
    </ContentWrap>
    <Guide></Guide>
  </div>
</template>