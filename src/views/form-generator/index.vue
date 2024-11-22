<script setup lang="tsx">
import { ref, reactive, nextTick } from 'vue'
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

// 渲染组件特定配置
const renderComponentConfig = (field: FormSchema) => {
  const component = componentList.find(item => item.type === field.component)
  if (!component?.props) return null

  return () => (
    <>
      {Object.entries(component.props).map(([key, defaultValue], index) => {
        // 处理选项类配置(Select/Radio/Checkbox)
        if (Array.isArray(defaultValue) && key === 'options') {
          const options = field.componentProps?.options || defaultValue
          return (
            <el-form-item label={key} key={`${field.field}-${key}-${index}`}>
              {options.map((option, optionIndex) => (
                <div class="option-item" key={optionIndex}>
                  <el-input
                    modelValue={option.label}
                    onUpdate:modelValue={(val) => {
                      const newOptions = [...options]
                      newOptions[optionIndex] = { ...option, label: val }
                      updateFieldConfig(field.field, {
                        componentProps: { ...field.componentProps, options: newOptions }
                      })
                    }}
                    placeholder="标签"
                    class="option-input"
                  />
                  <el-input
                    modelValue={option.value}
                    onUpdate:modelValue={(val) => {
                      const newOptions = [...options]
                      newOptions[optionIndex] = { ...option, value: val }
                      updateFieldConfig(field.field, {
                        componentProps: { ...field.componentProps, options: newOptions }
                      })
                    }}
                    placeholder="值"
                    class="option-input"
                  />
                  <el-button 
                    type="danger" 
                    link
                    onClick={() => {
                      const newOptions = [...options]
                      newOptions.splice(optionIndex, 1)
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
            </el-form-item>
          )
        }
        
        // 处理字符串类型配置
        if (typeof defaultValue === 'string') {
          return (
            <el-form-item label={key} key={`${field.field}-${key}-${index}`}>
              <el-input 
                modelValue={field.componentProps?.[key]}
                onUpdate:modelValue={(val) => {
                  updateFieldConfig(field.field, {
                    componentProps: { ...field.componentProps, [key]: val }
                  })
                }}
                placeholder={`请输入${key}`}
              />
            </el-form-item>
          )
        }
        
        // 处理数字类型配置
        if (typeof defaultValue === 'number') {
          return (
            <el-form-item label={key} key={`${field.field}-${key}-${index}`}>
              <el-input-number 
                modelValue={field.componentProps?.[key]}
                onUpdate:modelValue={(val) => {
                  updateFieldConfig(field.field, {
                    componentProps: { ...field.componentProps, [key]: val }
                  })
                }}
                placeholder={`请输入${key}`}
              />
            </el-form-item>
          )
        }
      })}
    </>
  )
}
</script>

<template>
  <div class="form-generator">
    <!-- 左侧组件列表 -->
    <div class="component-list">
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
    </div>

    <!-- 中间预览区域 -->
    <div 
      class="preview-area"
      @drop="onDrop"
      @dragover.prevent
    >
      <Form
        :schema="formSchema"
        :model="{}"
      />
    </div>

    <!-- 右侧配置面板 -->
    <div class="config-panel">
      <template v-if="currentField">
        <el-form label-width="100px">
          <el-form-item label="字段名">
            <el-input v-model="currentField.field" />
          </el-form-item>
          <el-form-item label="标签文本">
            <el-input v-model="currentField.label" />
          </el-form-item>
          <el-form-item label="必填">
            <el-switch v-model="currentField.required" />
          </el-form-item>
          <!-- 渲染组件特定配置 -->
          <template v-if="currentField.component">
            <component :is="renderComponentConfig(currentField)" />
          </template>
        </el-form>
      </template>
      <div class="actions">
        <el-button type="primary" @click="exportConfig">导出配置</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form-generator {
  display: flex;
  height: 100%;
  
  .component-list {
    width: 200px;
    border-right: 1px solid #ddd;
    padding: 10px;

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
    padding: 20px;
    background: #f5f7fa;
  }

  .config-panel {
    width: 300px;
    border-left: 1px solid #ddd;
    padding: 20px;

    .actions {
      margin-top: 20px;
      text-align: center;
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