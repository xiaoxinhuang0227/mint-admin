<script setup lang="tsx">
import { ref, reactive, nextTick, computed } from 'vue'
import { FormSchema } from '@/components/Form'
import { ElMessage } from 'element-plus'
import { useDraggable } from '@vueuse/core'

// 支持的表单控件列表
const componentList = [
  { 
    label: '输入框', 
    type: 'Input',
    props: {
      placeholder: '请输入',
      clearable: true
    },
    defaultValue: ''
  },
  { 
    label: '数字输入框', 
    type: 'InputNumber',
    props: {
      min: 0,
      max: 100,
      step: 1,
      precision: 0
    },
    defaultValue: 0
  },
  { 
    label: '选择器', 
    type: 'Select',
    props: {
      clearable: true,
      placeholder: '请选择',
      options: [
        { label: '选项1', value: '1' },
        { label: '选项2', value: '2' }
      ]
    },
    defaultValue: ''
  },
  { 
    label: '单选框组', 
    type: 'RadioGroup',
    props: {
      options: [
        { label: '选项1', value: '1' },
        { label: '选项2', value: '2' }
      ]
    },
    defaultValue: '1'
  },
  { 
    label: '多选框组', 
    type: 'CheckboxGroup',
    props: {
      options: [
        { label: '选项1', value: '1' },
        { label: '选项2', value: '2' }
      ]
    },
    defaultValue: []
  },
  { 
    label: '日期选择器', 
    type: 'DatePicker',
    props: {
      type: 'date',
      placeholder: '请选择日期',
      clearable: true
    },
    defaultValue: null
  },
  { 
    label: '时间选择器', 
    type: 'TimePicker',
    props: {
      placeholder: '请选择时间',
      clearable: true
    },
    defaultValue: null
  },
  { 
    label: '开关', 
    type: 'Switch',
    props: {
      activeText: '是',
      inactiveText: '否'
    },
    defaultValue: false
  },
  { 
    label: '滑块', 
    type: 'Slider',
    props: {
      min: 0,
      max: 100,
      step: 1
    },
    defaultValue: 0
  },
  { 
    label: '文本域', 
    type: 'Input',
    props: { 
      type: 'textarea',
      rows: 3,
      placeholder: '请输入'
    },
    defaultValue: ''
  }
]

const formSchema = ref<FormSchema[]>([])
const currentField = ref<FormSchema | null>(null)

// 添加新组件
const addComponent = (component) => {
  const newField: FormSchema = {
    field: `field_${Date.now()}`,
    label: component.label,
    component: component.type,
    componentProps: component.props || {},
    value: component.defaultValue
  }
  formSchema.value.push(newField)
  nextTick(() => {
    currentField.value = newField
  })
}

// 处理从左侧拖入的新组件
const onDrop = (e) => {
  const componentType = e.dataTransfer.getData('component')
  const component = componentList.find(item => item.type === componentType)
  if (component) {
    addComponent(component)
  }
}

// 处理点击添加组件
const onClickAdd = (component) => {
  addComponent(component)
}

// 处理表单项配置更新
const updateFieldConfig = (field: string, config: Partial<FormSchema>) => {
  const index = formSchema.value.findIndex(item => item.field === field)
  if (index > -1) {
    formSchema.value[index] = { ...formSchema.value[index], ...config }
    currentField.value = formSchema.value[index]
  }
}

// 导出配置
const exportConfig = () => {
  try {
    const exportableConfig = formSchema.value.map(field => {
      const { component, field: fieldName, label, required, componentProps } = field
      
      return {
        component,
        field: fieldName,
        label,
        required,
        componentProps: componentProps ? JSON.parse(JSON.stringify(componentProps)) : undefined
      }
    })

    const config = JSON.stringify(exportableConfig, null, 2)
    navigator.clipboard.writeText(config)
    ElMessage.success('配置已复制到剪贴板')
  } catch (error) {
    console.error('导出配置失败:', error)
    ElMessage.error('导出配置失败')
  }
}

// 右侧配置面板的表单配置
const getConfigSchema = computed(() => {
  const baseSchema = [
    {
      field: 'field',
      label: '字段名',
      component: 'Input'
    },
    {
      field: 'label',
      label: '标签文本', 
      component: 'Input'
    },
    {
      field: 'required',
      label: '必填',
      component: 'Switch'
    }
  ]

  if (!currentField.value?.component) return baseSchema

  const component = componentList.find(item => item.type === currentField.value.component)
  if (!component?.props) return baseSchema

  // 根据组件类型添加特定配置项
  const propsSchema = Object.entries(component.props).map(([key, defaultValue]) => {
    const baseConfig = {
      field: `componentProps.${key}`,
      label: key,
    }

    if (Array.isArray(defaultValue) && key === 'options') {
      return {
        ...baseConfig,
        component: 'Input', // 临时改为 Input，后续可以自定义组件
        slot: {
          default: () => renderOptionsConfig(currentField.value)
        }
      }
    }

    if (typeof defaultValue === 'string') {
      return {
        ...baseConfig,
        component: 'Input'
      }
    }

    if (typeof defaultValue === 'number') {
      return {
        ...baseConfig,
        component: 'InputNumber'
      }
    }

    if (typeof defaultValue === 'boolean') {
      return {
        ...baseConfig,
        component: 'Switch'
      }
    }

    return null
  }).filter(Boolean)

  return [...baseSchema, ...propsSchema]
})

// 渲染选项配置
const renderOptionsConfig = (field: FormSchema) => {
  const options = field.componentProps?.options || []
  return (
    <>
      {options.map((option, index) => (
        <div class="option-item" key={index}>
          <el-input
            v-model={option.label}
            placeholder="标签"
            class="option-input"
          />
          <el-input
            v-model={option.value}
            placeholder="值"
            class="option-input"
          />
          <el-button 
            type="danger" 
            link
            onClick={() => {
              const newOptions = [...options]
              newOptions.splice(index, 1)
              updateFieldConfig(field.field, {
                componentProps: { ...field.componentProps, options: newOptions }
              })
            }}
          >
            删除
          </el-button>
        </div>
      ))}
      <el-button 
        link 
        type="primary"
        onClick={() => {
          const newOptions = [...options]
          newOptions.push({ label: `选项${newOptions.length + 1}`, value: `${newOptions.length + 1}` })
          updateFieldConfig(field.field, {
            componentProps: { ...field.componentProps, options: newOptions }
          })
        }}
      >
        添加选项
      </el-button>
    </>
  )
}
</script>

<template>
  <div class="form-generator">
    <!-- 左侧组件列表 -->
    <div class="component-list">
      <el-scrollbar>
        <div
          v-for="item in componentList"
          :key="item.type"
          class="component-item"
          draggable="true"
          @dragstart="e => e.dataTransfer.setData('component', item.type)"
          @click="onClickAdd(item)"
        >
          {{ item.label }}
        </div>
      </el-scrollbar>
    </div>

    <!-- 中间预览区域 -->
    <div class="preview-area">
      <el-scrollbar>
        <div 
          class="preview-content"
          @drop="onDrop"
          @dragover.prevent
        >
          <Form
            :schema="formSchema"
            :model="{}"
            :isCol="false"
          />
        </div>
      </el-scrollbar>
    </div>

    <!-- 右侧配置面板 -->
    <div class="config-panel">
      <el-scrollbar>
        <template v-if="currentField">
          <Form
            :schema="getConfigSchema"
            :model="currentField"
            label-width="100px"
            :isCol="false"
          />
        </template>
        <div class="actions">
          <el-button type="primary" @click="exportConfig">导出配置</el-button>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form-generator {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  
  .component-list {
    width: 200px;
    border-right: 1px solid #ddd;
    overflow: hidden;

    :deep(.el-scrollbar__wrap) {
      padding: 10px;
    }

    .component-item {
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #ddd;
      cursor: move;
      
      &:hover {
        background: #f5f7fa;
      }
    }
  }

  .preview-area {
    flex: 1;
    background: #f5f7fa;
    overflow: hidden;

    .preview-content {
      padding: 20px;
      min-height: 100%;
    }
  }

  .config-panel {
    width: 300px;
    border-left: 1px solid #ddd;
    overflow: hidden;

    :deep(.el-scrollbar__wrap) {
      padding: 20px;
    }

    .actions {
      margin-top: 20px;
      text-align: center;
      padding-bottom: 20px;
    }
  }
}

.option-item {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
  align-items: center;
  
  .option-input {
    flex: 1;
  }
}
</style> 