<script setup lang="tsx">
import { reactive } from 'vue';
import { Icon } from '@/components/Icon';
import { SelectOption, FormSchema, Form } from '@/components/Form';
import { ElOption } from 'element-plus';
import Guide from './components/formGuide.vue';
const options3 = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          {
            value: 'consistency',
            label: 'Consistency'
          },
          {
            value: 'feedback',
            label: 'Feedback'
          },
          {
            value: 'efficiency',
            label: 'Efficiency'
          },
          {
            value: 'controllability',
            label: 'Controllability'
          }
        ]
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation'
          },
          {
            value: 'top nav',
            label: 'Top Navigation'
          }
        ]
      }
    ]
  },
  {
    value: 'component',
    label: 'Component',
    children: [
      {
        value: 'basic',
        label: 'Basic',
        children: [
          {
            value: 'layout',
            label: 'Layout'
          },
          {
            value: 'color',
            label: 'Color'
          },
          {
            value: 'typography',
            label: 'Typography'
          },
          {
            value: 'icon',
            label: 'Icon'
          },
          {
            value: 'button',
            label: 'Button'
          }
        ]
      },
      {
        value: 'form',
        label: 'Form',
        children: [
          {
            value: 'radio',
            label: 'Radio'
          },
          {
            value: 'checkbox',
            label: 'Checkbox'
          },
          {
            value: 'input',
            label: 'Input'
          },
          {
            value: 'input-number',
            label: 'InputNumber'
          },
          {
            value: 'select',
            label: 'Select'
          },
          {
            value: 'cascader',
            label: 'Cascader'
          },
          {
            value: 'switch',
            label: 'Switch'
          },
          {
            value: 'slider',
            label: 'Slider'
          },
          {
            value: 'time-picker',
            label: 'TimePicker'
          },
          {
            value: 'date-picker',
            label: 'DatePicker'
          },
          {
            value: 'datetime-picker',
            label: 'DateTimePicker'
          },
          {
            value: 'upload',
            label: 'Upload'
          },
          {
            value: 'rate',
            label: 'Rate'
          },
          {
            value: 'form',
            label: 'Form'
          }
        ]
      },
      {
        value: 'others',
        label: 'Others',
        children: [
          {
            value: 'dialog',
            label: 'Dialog'
          },
          {
            value: 'tooltip',
            label: 'Tooltip'
          },
          {
            value: 'popover',
            label: 'Popover'
          },
          {
            value: 'card',
            label: 'Card'
          },
          {
            value: 'carousel',
            label: 'Carousel'
          },
          {
            value: 'collapse',
            label: 'Collapse'
          }
        ]
      }
    ]
  }
]
const schema = reactive<FormSchema[]>([
  {
    field: 'field1',
    component: 'Divider',
    label: '输入框'
  },
  {
    field: 'field2',
    label: '默认',
    component: 'Input',
    componentProps: {
      formatter: (value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      parser: (value) => value.replace(/\$\s?|(,*)/g, '')
    }
  },
  {
    field: 'field3',
    label: '图标',
    component: 'Input',
    componentProps: {
      suffixIcon: <Icon icon="ep:calendar" />,
      prefixIcon: <Icon icon="ep:share" />
    }
  },
  {
    field: 'field4',
    label: `插槽式图标`,
    component: 'Input',
    componentProps: {
      slots: {
        suffix: () => {
          return <Icon icon="ep:share" />
        },
        prefix: () => <Icon icon="ep:calendar" />
      }
    }
  },
  {
    field: 'field5',
    label: '复合型图标',
    component: 'Input',
    componentProps: {
      slots: {
        prepend: () => <Icon icon="ep:calendar" />,
        append: () => <Icon icon="ep:share" />
      }
    }
  },
  // {
  //   field: 'input-field7',
  //   label: '密码框',
  //   component: 'Input',
  //   componentProps: {
  //     showPassword: true
  //   }
  // },
  {
    field: 'field6',
    label: '多行文本',
    component: 'Input',
    componentProps: {
      type: 'textarea',
      rows: 2
    }
  },
  {
    field: 'field10',
    component: 'Divider',
    label: '数字输入框'
  },
  {
    field: 'field11',
    label: '默认',
    component: 'InputNumber',
    value: 0
  },
  {
    field: 'field13',
    label: '选择器',
    component: 'Divider'
  },
  {
    field: 'field14',
    label: '默认',
    component: 'Select',
    componentProps: {
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
    field: 'field15',
    label: 'Icon插槽',
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
      ],
      slots: {
        default: (options: SelectOption[]) => {
          if (options.length) {
            return options?.map((v) => {
              return <ElOption key={v.value} label={v.label} value={v.value} />
            })
          } else {
            return null
          }
        },
        prefix: () => <Icon icon="ep:calendar" />
      }
    }
  },
  {
    field: 'select-field18',
    label: '选项插槽',
    component: 'Select',
    componentProps: {
      options: [
        {
          value: 'Beijing',
          label: '北京'
        },
        {
          value: 'Shanghai',
          label: '上海'
        },
        {
          value: 'Nanjing',
          label: '南京'
        },
      ],
      slots: {
        optionDefault: (option: SelectOption) => {
          return (
            <>
              <span style="float: left">{option.label}</span>
              <span style="float: right; color: var(--el-text-color-secondary); font-size: 13px;">
                {option.value}
              </span>
            </>
          )
        }
      }
    }
  },
  {
    field: 'field17',
    label: `选项分组插槽`,
    component: 'Select',
    componentProps: {
      options: [
        {
          label: 'option1',
          options: [
            {
              label: 'option1-1',
              value: '1-1'
            },
            {
              label: 'option1-2',
              value: '1-2'
            }
          ]
        },
        {
          label: 'option2',
          options: [
            {
              label: 'option2-1',
              value: '2-1'
            },
            {
              label: 'option2-2',
              value: '2-2'
            }
          ]
        }
      ],
      slots: {
        optionGroupDefault: (option: SelectOption) => {
          return (
            <ElOptionGroup key={option.label} label={`${option.label}`}>
              {option?.options?.map((v) => {
                return <ElOption key={v.value} label={v.label} value={v.value} />
              })}
            </ElOptionGroup>
          )
        }
      }
    }
  },
  {
    field: 'field23',
    label: '级联选择器',
    component: 'Divider'
  },
  {
    field: 'field24',
    label: '默认',
    component: 'Cascader',
    componentProps: {
      options: options3,
      props: {
        multiple: true
      }
    }
  },
  {
    field: 'field25',
    label: '插槽',
    component: 'Cascader',
    componentProps: {
      options: options3,
      slots: {
        default: ({ data, node }) => {
          return (
            <>
              <span>{data.label}</span>
              {!node.isLeaf ? <span> ({data.children.length}) </span> : null}
            </>
          )
        }
      }
    }
  },
  {
    field: 'field26',
    label: '开关',
    component: 'Divider'
  },
  {
    field: 'field27',
    label: '默认',
    component: 'Switch',
    value: false
  },
  {
    field: 'field28',
    label: '图标',
    component: 'Switch',
    value: false,
    componentProps: {
      activeIcon: <Icon icon="ep:check" />,
      inactiveIcon: <Icon icon="ep:close" />
    }
  },
  {
    field: 'field29',
    label: '评分',
    component: 'Divider'
  },
  {
    field: 'field30',
    label: '默认',
    component: 'Rate',
    value: 0
  },
  {
    field: 'field31',
    label: '图标',
    component: 'Rate',
    value: null,
    componentProps: {
      voidIcon: <Icon icon="ep:chat-round" />,
      icons: [
        <Icon icon="ep:chat-round" />,
        <Icon icon="ep:chat-line-round" />,
        <Icon icon="ep:chat-dot-round" />
      ]
    }
  },
  {
    field: 'field38',
    label: '单选框',
    component: 'Divider'
  },
  {
    field: 'field39-2',
    label: '单选框组',
    component: 'RadioGroup',
    componentProps: {
      options: [
        {
          // disabled: true,
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
    field: 'field40',
    label: '按钮',
    component: 'RadioButton',
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
    field: 'field41',
    label: '多选框',
    component: 'Divider'
  },
  {
    field: 'field42-2',
    label: '多选框组',
    component: 'CheckboxGroup',
    value: [],
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
    field: 'field44',
    component: 'Divider',
    label: '滑块'
  },
  {
    field: 'field45',
    component: 'Slider',
    label: '默认',
    value: 0
  },
  {
    field: 'field46',
    component: 'Divider',
    label: '日期选择器'
  },
  {
    field: 'field47',
    component: 'DatePicker',
    label: '默认',
    componentProps: {
      type: 'date'
    }
  },
  {
    field: 'field48',
    component: 'DatePicker',
    label: '快捷选项',
    componentProps: {
      type: 'date',
      disabledDate: (time: Date) => {
        return time.getTime() > Date.now()
      },
      shortcuts: [
        {
          text: '今天',
          value: new Date()
        },
        {
          text: '昨天',
          value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            return date
          }
        },
        {
          text: '一周前',
          value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            return date
          }
        }
      ]
    }
  },
  {
    field: 'field49',
    component: 'DatePicker',
    label: '周',
    componentProps: {
      type: 'week',
    }
  },
  {
    field: 'field50',
    component: 'DatePicker',
    label: '年',
    componentProps: {
      type: 'year'
    }
  },
  {
    field: 'field51',
    component: 'DatePicker',
    label: '月',
    componentProps: {
      type: 'month'
    }
  },
  {
    field: 'field52',
    component: 'DatePicker',
    label: '日期',
    componentProps: {
      type: 'dates'
    }
  },
  {
    field: 'field53',
    component: 'DatePicker',
    label: '日期范围',
    componentProps: {
      type: 'daterange'
    }
  },
  {
    field: 'field54',
    component: 'DatePicker',
    label: '月份范围',
    componentProps: {
      type: 'monthrange'
    }
  },
  {
    field: 'field56',
    component: 'Divider',
    label: '日期选择器'
  },
  {
    field: 'field57',
    component: 'DatePicker',
    label: '默认',
    componentProps: {
      type: 'datetime'
    }
  },
  {
    field: 'field58',
    component: 'DatePicker',
    label: '快捷选项',
    componentProps: {
      type: 'datetime',
      shortcuts: [
        {
          text: '今天',
          value: new Date()
        },
        {
          text: '昨天',
          value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            return date
          }
        },
        {
          text: '一周前',
          value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            return date
          }
        }
      ]
    }
  },
  {
    field: 'field60',
    component: 'Divider',
    label: '时间选择器'
  },
  {
    field: 'field61',
    component: 'TimePicker',
    label: '默认'
  },
  {
    field: 'field62',
    component: 'Divider',
    label: '时间选择'
  },
  {
    field: 'field63',
    component: 'TimeSelect',
    label: '默认'
  },
])
</script>

<template>
  <div class="m-5">
    <Form :schema="schema" />
  </div>
  <Guide></Guide>
</template>