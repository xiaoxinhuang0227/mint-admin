<script setup lang="tsx">
import { Form, FormSchema } from '@/components/Form'
import { PropType, computed, unref, ref, watch, onMounted } from 'vue'
import { propTypes } from '@/utils/propTypes'
import { useForm } from '@/hooks/useForm'
import { findIndex } from '@/utils'
import { cloneDeep } from 'lodash-es'
import { initModel } from '@/components/Form/src/helper'
import ActionButton from './components/ActionButton.vue'
import { SearchProps } from './types'
import { FormItemProp } from 'element-plus'

const props = defineProps({
  // 生成Form的布局结构数组
  schema: {
    type: Array as PropType<FormSchema[]>,
    default: () => []
  },
  // 是否需要栅格布局
  isCol: propTypes.bool.def(false),
  // 表单label宽度
  labelWidth: propTypes.oneOfType([String, Number]).def('auto'),
  // 操作按钮风格位置
  layout: propTypes.string.validate((v: string) => ['inline', 'bottom'].includes(v)).def('inline'),
  // 底部按钮的对齐方式
  buttonPosition: propTypes.string
    .validate((v: string) => ['left', 'center', 'right'].includes(v))
    .def('center'),
  showSearch: propTypes.bool.def(true),
  showReset: propTypes.bool.def(true),
  // 是否显示伸缩
  showExpand: propTypes.bool.def(false),
  // 伸缩的界限字段
  expandField: propTypes.string.def(''),
  inline: propTypes.bool.def(true),
  // 是否去除空值项
  removeNoValueItem: propTypes.bool.def(true),
  model: {
    type: Object,
    default: () => ({})
  },
  searchLoading: propTypes.bool.def(false),
  resetLoading: propTypes.bool.def(false)
})

const emit = defineEmits(['search', 'reset', 'register', 'validate']);
const visible = ref<boolean>(true);
const formModel = ref(props.model);

const newSchema = computed(() => {
  const propsComputed = unref(getProps);
  let schema: FormSchema[] = cloneDeep(propsComputed.schema);
  if (propsComputed.showExpand && propsComputed.expandField && unref(visible)) {
    const index = findIndex(schema, (v: FormSchema) => v.field === propsComputed.expandField)
    schema.map((v, i) => {
      if (i >= index) {
        v.hidden = true
      } else {
        v.hidden = false
      }
      return v
    })
  }
  if (propsComputed.layout === 'inline') {
    schema = schema.concat([
      {
        field: 'action',
        formItemProps: {
          labelWidth: '0px',
          slots: {
            default: () => {
              return (
                <div>
                  <ActionButton
                    showSearch={propsComputed.showSearch}
                    showReset={propsComputed.showReset}
                    showExpand={propsComputed.showExpand}
                    searchLoading={propsComputed.searchLoading}
                    resetLoading={propsComputed.resetLoading}
                    visible={visible.value}
                    onExpand={setVisible}
                    onReset={reset}
                    onSearch={search}
                  />
                </div>
              )
            },
            label: () => {
              return <span>&nbsp;</span>
            }
          }
        }
      }
    ])
  }
  return schema;
})

const { formRegister, formMethods } = useForm()
const { getElFormExpose, getFormData, getFormExpose } = formMethods

// useSearch传入的props
const outsideProps = ref<SearchProps>({})

const mergeProps = ref<SearchProps>({})

const getProps = computed(() => {
  const propsObj = { ...props }
  Object.assign(propsObj, unref(mergeProps))
  return propsObj
})

const setProps = (props: SearchProps = {}) => {
  mergeProps.value = Object.assign(unref(mergeProps), props)
  // @ts-ignore
  outsideProps.value = props
}

const schemaRef = ref<FormSchema[]>([])

// 监听表单结构化数组，重新生成formModel
watch(
  () => unref(newSchema),
  async (schema = []) => {
    formModel.value = initModel(schema, unref(formModel))
    schemaRef.value = schema
  },
  {
    immediate: true,
    deep: true
  }
)

const filterModel = async () => {
  return await getFormData()
}

const search = async () => {
  const elFormExpose = await getElFormExpose()
  await elFormExpose?.validate(async (isValid) => {
    if (isValid) {
      const model = await filterModel()
      emit('search', model)
    }
  })
}

const reset = async () => {
  const elFormExpose = await getElFormExpose()
  elFormExpose?.resetFields()
  const model = await filterModel()
  emit('reset', model)
}

const bottomButtonStyle = computed(() => {
  return {
    textAlign: unref(getProps).buttonPosition as unknown as 'left' | 'center' | 'right'
  }
})

const setVisible = async () => {
  visible.value = !unref(visible)
}

// 对表单赋值
const setValues = async (data = {}) => {
  formModel.value = Object.assign(props.model, unref(formModel), data)
  const formExpose = await getFormExpose()
  formExpose?.setValues(data)
}

const defaultExpose = {
  getElFormExpose,
  setProps,
  setValues,
  getFormData
}

onMounted(() => {
  emit('register', defaultExpose)
})

defineExpose(defaultExpose)

const onFormValidate = (prop: FormItemProp, isValid: boolean, message: string) => {
  emit('validate', prop, isValid, message)
}
</script>

<template>
  <div class="component-search">
    <Form
      :model="formModel"
      :is-custom="false"
      :label-width="getProps.labelWidth"
      hide-required-asterisk
      :inline="getProps.inline"
      :is-col="getProps.isCol"
      :schema="schemaRef"
      @register="formRegister"
      @validate="onFormValidate"
    />

    <template v-if="layout === 'bottom'">
      <div :style="bottomButtonStyle">
        <ActionButton
          :show-reset="getProps.showReset"
          :show-search="getProps.showSearch"
          :show-expand="getProps.showExpand"
          :search-loading="getProps.searchLoading"
          :reset-loading="getProps.resetLoading"
          :visible="visible"
          @expand="setVisible"
          @reset="reset"
          @search="search"
        />
      </div>
    </template>
  </div>
</template>