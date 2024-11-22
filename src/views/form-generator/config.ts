export interface ComponentListItem {
  label: string
  type: string
  props: Record<string, any>
  defaultValue: any
}

export const componentList: ComponentListItem[] = [
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