<script setup lang="tsx">
import { ref, reactive, nextTick, computed } from 'vue'
import { FormSchema } from '@/components/Form'
import { ElMessage } from 'element-plus'
import { useDraggable } from '@vueuse/core'
import { componentMap } from '@/components/Form/src/helper/componentMap'
import { componentList } from './config'

const formSchema = ref<FormSchema[]>([])
const currentField = ref<FormSchema | null>(null)

// 拖拽相关状态
const dragState = reactive({
  dragging: false,
  dragItem: null as FormSchema | null,
  dragIndex: -1,
  dragOverIndex: -1
})

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
    const component = componentList.find(item => item.type === componentType)
    if (component) {
      const newField = createField(component)
      insertField(newField, index)
      nextTick(() => {
        currentField.value = newField
      })
    }
  } else {
    handlePreviewDrop(e, index)
  }
  resetDragState()
}

// 插入字段
const insertField = (field: FormSchema, index?: number) => {
  if (typeof index === 'number') {
    formSchema.value.splice(index, 0, field)
  } else {
    formSchema.value.push(field)
  }
}

// 处理预览区域内部拖拽
const handlePreviewDrop = (e: DragEvent, index?: number) => {
  const dragField = e.dataTransfer?.getData('field')
  if (dragField && dragState.dragItem) {
    const dragIndex = formSchema.value.findIndex(item => item.field === dragField)
    if (dragIndex > -1) {
      formSchema.value.splice(dragIndex, 1)
      insertField(dragState.dragItem, index)
    }
  }
}

// 处理拖开始
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

// 预览区域拖拽排序
const previewRef = ref<HTMLElement | null>(null)
const { isDragging: isPreviewDragging } = useDraggable(previewRef, {
  onStart: (el, { x, y }) => {
    const item = formSchema.value.find(field => field.field === el.dataset.field)
    if (item) {
      dragState.dragItem = item
      dragState.dragIndex = formSchema.value.indexOf(item)
    }
  },
  onEnd: (el, { x, y }) => {
    if (dragState.dragItem && dragState.dragOverIndex > -1) {
      const newIndex = dragState.dragOverIndex
      const oldIndex = dragState.dragIndex
      
      if (newIndex !== oldIndex) {
        const item = formSchema.value.splice(oldIndex, 1)[0]
        formSchema.value.splice(newIndex, 0, item)
      }
    }
    resetDragState()
  }
})

// 重置拖拽状态
const resetDragState = () => {
  dragState.dragging = false
  dragState.dragItem = null
  dragState.dragIndex = -1 
  dragState.dragOverIndex = -1
}

// 创建新字段
const createField = (component: any): FormSchema => {
  return {
    field: `field_${Date.now()}`,
    label: component.label,
    component: component.type,
    componentProps: component.props || {},
    value: component.defaultValue
  }
}
</script>

<template>
  <div class="form-generator">
    <!-- 左侧组件列表 -->
    <div class="component-list">
      <el-scrollbar>
        <p class="section-title">表单控件</p>
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
            v-show="formSchema?.length > 0"
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
                    'drag-over': dragState.dragOverIndex === index,
                    dragging: dragState.dragItem?.field === item.field
                  }"
                  :data-field="item.field"
                  draggable="true"
                  @click="handleItemClick(item)"
                  @dragstart="e => handleDragStart(e, item, index)"
                  @dragover="e => handleDragOver(e, index)"
                  @drop="e => onDrop(e, index)"
                  @dragend="resetDragState"
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
          <p class="empty-tip" v-show="formSchema?.length === 0">请从左侧拖拽组件到表单中</p>
        </div>
      </el-scrollbar>
    </div>

    <!-- 右侧配置面板 -->
    <div class="config-panel">
      <el-scrollbar>
        <p class="section-title">控件配置</p>
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
  inset: 0;
  background: #f5f7fa;
  
  // 左侧组件列表
  .component-list {
    width: 280px;
    background: #fff;
    border-right: 1px solid #ebeef5;
    
    :deep(.el-scrollbar__wrap) {
      padding: 20px;
    }
    
    .title {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 16px;
      color: #1f2f3d;
    }
    
    .component-item {
      padding: 12px 16px;
      margin-bottom: 12px;
      border: 1px dashed #dcdfe6;
      border-radius: 4px;
      cursor: move;
      transition: all 0.3s;
      color: #606266;
      
      &:hover {
        border-color: var(--el-color-primary);
        color: var(--el-color-primary);
        background: var(--el-color-primary-light-9);
      }
      
      &:active {
        cursor: grabbing;
      }
    }
  }

  // 中间预览区域
  .preview-area {
    flex: 1;
    padding: 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    
    :deep(.el-scrollbar) {
      flex: 1;
      height: 100%;
    }
    
    .preview-content {
      background: #fff;
      border-radius: 8px;
      min-height: 100%;
      height: 100%;
      padding: 24px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
      display: flex;
      flex-direction: column;
    }
    
    .empty-tip {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--el-text-color-secondary);
      font-size: 14px;
    }
  }

  // 右侧配置面板
  .config-panel {
    width: 350px;
    background: #fff;
    border-left: 1px solid #ebeef5;
    
    .title {
      font-size: 16px;
      font-weight: 500;
      padding: 16px 20px;
      border-bottom: 1px solid #ebeef5;
      color: #1f2f3d;
    }
    
    :deep(.el-scrollbar__wrap) {
      padding: 20px;
    }
    
    .actions {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 16px;
      text-align: center;
      background: #fff;
      border-top: 1px solid #ebeef5;
    }
  }
}

// 预览区域表单项
.preview-form-item {
  position: relative;
  padding: 16px;
  border: 1px dashed transparent;
  border-radius: 8px;
  cursor: move;
  transition: all 0.3s;
  margin-bottom: 16px;
  
  &:hover {
    border-color: var(--el-color-primary);
    background: var(--el-color-primary-light-9);
  }
  
  &.active {
    border-color: var(--el-color-primary);
    background: var(--el-color-primary-light-8);
    box-shadow: 0 0 0 2px var(--el-color-primary-light-5);
  }
  
  &.drag-over {
    border-style: dashed;
    border-color: var(--el-color-primary);
    
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border: 2px solid var(--el-color-primary);
      border-radius: 8px;
      pointer-events: none;
    }
  }
  
  &.dragging {
    opacity: 0.5;
    cursor: grabbing;
  }
  
  :deep(.el-form-item) {
    margin-bottom: 0;
    padding-right: 100px;
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

.section-title {
  position: relative;
  font-size: 16px;
  font-weight: 500;
  color: var(--el-text-color-primary);
  margin: 0 0 16px;
  padding-left: 12px;
  line-height: 1.4;
  text-align: center;
}
</style> 