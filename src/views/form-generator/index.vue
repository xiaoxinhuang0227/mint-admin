<script setup lang="tsx">
import { ref, reactive, nextTick, computed } from 'vue'
import { FormSchema } from '@/components/Form'
import { ElMessage } from 'element-plus'
import { useDraggable } from '@vueuse/core'
import { componentMap } from '@/components/Form/src/helper/componentMap'

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

// 拖拽相关状态
const dragState = reactive({
  dragging: false,
  dragItem: null as FormSchema | null,
  dragIndex: -1,
  dragOverIndex: -1
})

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
const onDrop = (e: DragEvent, index?: number) => {
  const componentType = e.dataTransfer?.getData('component')
  if (componentType) {
    // 从左侧组件列表拖入
    const component = componentList.find(item => item.type === componentType)
    if (component) {
      const newField: FormSchema = {
        field: `field_${Date.now()}`,
        label: component.label,
        component: component.type,
        componentProps: component.props || {},
        value: component.defaultValue
      }
      
      if (typeof index === 'number') {
        formSchema.value.splice(index, 0, newField)
      } else {
        formSchema.value.push(newField)
      }
      
      nextTick(() => {
        currentField.value = newField
      })
    }
  } else {
    // 预览区域内部拖拽排序
    const dragField = e.dataTransfer?.getData('field')
    if (dragField && dragState.dragItem) {
      const dragIndex = formSchema.value.findIndex(item => item.field === dragField)
      if (dragIndex > -1) {
        formSchema.value.splice(dragIndex, 1)
        formSchema.value.splice(index || formSchema.value.length, 0, dragState.dragItem)
      }
    }
  }
  dragState.dragging = false
  dragState.dragItem = null
  dragState.dragIndex = -1
  dragState.dragOverIndex = -1
}

// 处理拖拽开始
const handleDragStart = (e: DragEvent, item: FormSchema, index: number) => {
  dragState.dragging = true
  dragState.dragItem = item
  dragState.dragIndex = index
  e.dataTransfer?.setData('field', item.field)
}

// 处理拖拽经过
const handleDragOver = (e: DragEvent, index: number) => {
  e.preventDefault()
  dragState.dragOverIndex = index
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

// 渲染选项配置
const renderOptionsConfig = (field: FormSchema) => {
  const options = field.componentProps?.options || []
  
  return (
    <div class="options-config">
      <div class="options-list">
        {options.map((option, index) => (
          <div class="option-item" key={index}>
            <el-input
              v-model={option.label}
              placeholder="选项文本"
              class="option-input"
              onChange={() => updateOptions(field, options)}
            />
            <el-input
              v-model={option.value}
              placeholder="选项值"
              class="option-input"
              onChange={() => updateOptions(field, options)}
            />
            <el-button 
              type="danger" 
              link
              onClick={() => {
                options.splice(index, 1)
                updateOptions(field, options)
              }}
            >
              删除
            </el-button>
          </div>
        ))}
      </div>
      <el-button 
        link 
        type="primary"
        onClick={() => {
          options.push({
            label: `选项${options.length + 1}`,
            value: `${options.length + 1}`
          })
          updateOptions(field, options)
        }}
      >
        添加选项
      </el-button>
    </div>
  )
}

// 更新选项配置
const updateOptions = (field: FormSchema, options: any[]) => {
  updateFieldConfig(field.field, {
    componentProps: {
      ...field.componentProps,
      options: [...options]
    }
  })
}

// 获取配置面板的表单结构
const getConfigSchema = computed(() => {
  if (!currentField.value) return []
  
  const baseSchema = [
    {
      field: 'label',
      label: '字段标签',
      component: 'Input',
      componentProps: {
        placeholder: '请输入标签'
      }
    },
    {
      field: 'field',
      label: '字段名称',
      component: 'Input',
      componentProps: {
        placeholder: '请输入字段名'
      }
    }
  ]

  // 如果是有选项的控件，添加选项配置
  if (['Select', 'RadioGroup', 'CheckboxGroup'].includes(currentField.value.component)) {
    baseSchema.push({
      field: 'options',
      label: '选项配置',
      component: 'Custom',
      formItemProps: {
        slots: {
          default: () => renderOptionsConfig(currentField.value!)
        }
      }
    })
  }

  return baseSchema
})

// 处理表单项点击
const handleItemClick = (item: FormSchema) => {
  currentField.value = item
  // 滚动右侧配置面板到顶部
  const configPanel = document.querySelector('.config-panel .el-scrollbar__wrap')
  if (configPanel) {
    configPanel.scrollTop = 0
  }
}

// 处理表单项删除
const handleItemDelete = (item: FormSchema) => {
  const index = formSchema.value.findIndex(field => field.field === item.field)
  if (index > -1) {
    formSchema.value.splice(index, 1)
    if (currentField.value?.field === item.field) {
      currentField.value = null
    }
  }
}

const getOptionComponent = (type: string) => {
  const componentMap = {
    'Select': 'el-option',
    'RadioGroup': 'el-radio',
    'CheckboxGroup': 'el-checkbox'
  }
  return componentMap[type]
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
            :isCustom="true"
          >
            <template #default>
              <template v-for="(item, index) in formSchema" :key="item.field">
                <div 
                  class="preview-form-item"
                  :class="{
                    active: currentField?.field === item.field,
                    'drag-over': dragState.dragOverIndex === index
                  }"
                  draggable="true"
                  @click="handleItemClick(item)"
                  @dragstart="e => handleDragStart(e, item, index)"
                  @dragover="e => handleDragOver(e, index)"
                  @drop="e => onDrop(e, index)"
                  @dragend="() => dragState.dragging = false"
                >
                  <el-form-item
                    :label="item.label"
                    :prop="item.field"
                  >
                    <component
                      :is="componentMap[item.component]"
                      v-bind="item.componentProps"
                      v-model="item.value"
                    >
                      <template v-if="item.component === 'Select'">
                        <el-option
                          v-for="option in item.componentProps?.options"
                          :key="option.value"
                          :label="option.label"
                          :value="option.value"
                        />
                      </template>
                      <template v-else-if="item.component === 'RadioGroup'">
                        <el-radio
                          v-for="option in item.componentProps?.options"
                          :key="option.value"
                          :label="option.value"
                        >
                          {{ option.label }}
                        </el-radio>
                      </template>
                      <template v-else-if="item.component === 'CheckboxGroup'">
                        <el-checkbox
                          v-for="option in item.componentProps?.options"
                          :key="option.value"
                          :label="option.value"
                        >
                          {{ option.label }}
                        </el-checkbox>
                      </template>
                    </component>
                  </el-form-item>
                  <div class="preview-form-actions">
                    <el-button 
                      type="danger" 
                      link
                      @click.stop="handleItemDelete(item)"
                    >
                      删除
                    </el-button>
                  </div>
                </div>
              </template>
            </template>
          </Form>
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
  background: #f5f7fa;
  
  .component-list {
    width: 250px;
    background: #fff;
    border-right: 1px solid #ebeef5;
    overflow: hidden;

    :deep(.el-scrollbar__wrap) {
      padding: 16px;
    }

    .component-item {
      padding: 12px 16px;
      margin-bottom: 12px;
      border: 1px dashed #dcdfe6;
      border-radius: 4px;
      cursor: move;
      transition: all 0.3s;
      
      &:hover {
        border-color: #409eff;
        background: rgba(64, 158, 255, 0.05);
      }
    }
  }

  .preview-area {
    flex: 1;
    overflow: hidden;
    padding: 20px;

    .preview-content {
      background: #fff;
      border-radius: 4px;
      min-height: 100%;
      padding: 20px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
    }
  }

  .config-panel {
    width: 350px;
    background: #fff;
    border-left: 1px solid #ebeef5;
    overflow: hidden;

    :deep(.el-scrollbar__wrap) {
      padding: 20px;
    }

    .actions {
      margin-top: 20px;
      text-align: center;
      padding: 16px;
      border-top: 1px solid #ebeef5;
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

.preview-form-item {
  position: relative;
  padding: 12px;
  border: 1px dashed transparent;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 12px;
  
  &:hover {
    border-color: #409eff;
    background-color: rgba(64, 158, 255, 0.05);
    
    .preview-form-actions {
      opacity: 1;
    }
  }
  
  &.active {
    border-color: #409eff;
    background-color: rgba(64, 158, 255, 0.1);
    box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
    
    .preview-form-actions {
      opacity: 1;
    }
  }

  .preview-form-actions {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;
    transition: opacity 0.3s;
    background-color: #fff;
    padding: 4px 8px;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  :deep(.el-form-item) {
    margin-bottom: 0;
    padding-right: 100px;
  }

  &.drag-over {
    border-color: #409eff;
    border-style: dashed;
    
    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: -2px;
      height: 2px;
      background-color: #409eff;
    }
  }
  
  &.dragging {
    opacity: 0.5;
  }
}

.options-config {
  .options-list {
    border: 1px solid #ebeef5;
    border-radius: 4px;
    padding: 12px;
    margin-bottom: 12px;
  }
  
  .option-item {
    display: flex;
    gap: 8px;
    margin-bottom: 8px;
    align-items: center;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .option-input {
      flex: 1;
    }
  }
}
</style> 