// mocks/index.js
import { MockMethod } from 'vite-plugin-mock';
import Mock from 'mockjs';

const tableColumns = [
  { name: 'field', desc: '唯一值，如需展示正确的数据，需要与 data 中的属性名对应	', dataType: 'string' },
  { name: 'label', desc: '表头名称', dataType: 'string' },
  { name: 'hidden', desc: '是否隐藏', dataType: 'string' },
  { name: 'formatter', desc: '格式化数据', dataType: '(data, row, column, index) => any' },
  { name: 'slots', desc: '插槽对象', dataType: 'string' },
  { name: 'children', desc: '子项，用于多级表头	', dataType: 'column[]' },
];
const formSchema = [
  { id: 1 , name: 'field', desc: '唯一值，如需展示正确的数据，需要与 schema 中的属性名对应	', dataType: 'string' },
  { id: 2 , name: 'label', desc: '表单项名称', dataType: 'string' },
  { id: 3 , name: 'hidden', desc: '是否隐藏', dataType: 'string' },
  { id: 4 , name: 'component', desc: '使用的表单组件，如Input', dataType: 'ComponentName' },
  { id: 5 , name: 'value', desc: '初始值', dataType: 'string' },
  {
    id: 6,
    name: 'colProps',
    desc: '栅格布局配置',
    dataType: '{ span: number, ... }',
    children: []
  },
  {
    id: 7,
    name: 'componentProps',
    desc: '组件传入的props，详见elementUI官方文档',
    dataType: 'object',
    children: [
      { id:  8, name: 'slots', desc: '插槽', dataType: 'object' },
      { id:  9, name: 'on', desc: '需要监听的组件事件', dataType: 'on: { change: (value: string | number) => void }' },
    ]
  },
  {
    id: 10,
    name: 'formItemProps',
    desc: '',
    dataType: 'string',
    children: []
  },
]

const descSchema = [
  { name: 'span', desc: '栅格占比	', dataType: 'number', options: [] },
  { name: 'field', desc: '字段名，唯一值，需要与 data 中的属性名对应', dataType: 'string', options: [] },
  { name: 'label', desc: '列表标题', dataType: 'string', options: [] },
  { name: 'width', desc: '列表宽度', dataType: 'string/number', options: [] },
  { name: 'minWidth', desc: '列表最小宽度', dataType: 'string/number', options: [] },
  { name: 'align', desc: '内容对齐方式', dataType: 'string', options: ['left', 'center', 'right'] },
  { name: 'labelAlign', desc: '标题对齐方式', dataType: 'string', options: ['left', 'center', 'right'] },
  { name: 'className', desc: '自定义内容标签类名', dataType: 'string', options: [] },
  { name: 'labelClassName', desc: '自定义标题标签类名', dataType: 'string', options: [] },
  { name: 'slots', desc: '插槽对象', dataType: 'object', options: [] },
]
export default [
  {
    url: '/api/v1/table/basic',
    method: 'get',
    response: () => {
      return {
        code: 0,
        msg: 'success',
        data: {
          tableColumns,
          tableAttributes: [
            { name: 'data', desc: '表格数据	', dataType: 'any[]', options: [], default: '' },
            { name: 'columns', desc: '表头结构', dataType: 'TableColumn[]', options: [], default: '' },
            { name: 'showOverflowTooltip', desc: '是否所有的超出隐藏，优先级低于schema中的showOverflowTooltip', dataType: 'boolean', options: [], default: '' },
            { name: 'pagination', desc: '是否展示分页', dataType: 'Pagination分页器配置 / undefined', options: [], default: '' },
            { name: 'align/headerAlign', desc: '内容对齐方式', dataType: 'string', options: ['left', 'center', 'right'], default: '' },
            { name: 'treeProps', desc: '树形结构表格配置', dataType: '{ hasChildren: "判断是否有子项的字段", children: "子项数据的字段" }', options: [], default: '' },
            { name: 'border', desc: '是否有边框', dataType: 'boolean', options: [], default: '' },
            { name: 'stripe', desc: '是否有斑马纹', dataType: 'boolean', options: [], default: '' },
            { name: 'fit', desc: '列的宽度是否自撑开', dataType: 'boolean', options: [], default: '' },
            { name: 'size', desc: 'Table 的尺寸', dataType: 'string', options: ['medium', 'small', 'mini'], default: '' },
            { name: 'emptyText', desc: '无数据时显示的文本', dataType: 'string', options: [], default: '' },
            { name: 'rowKey', desc: '行数据的 Key', dataType: 'string', options: [], default: '' },
            { name: 'defaultExpandAll', desc: '是否默认展开所有行', dataType: 'boolean', options: [], default: '' },
            { name: 'tooltipEffect', desc: 'tooltip提示的样式', dataType: 'string', options: ['dark', 'light'], default: '' },
            { name: 'tooltipOptions', desc: 'tooltip配置', dataType: '', options: [], default: '' },
          ],
        }
      };
    },
  },
  {
    url: '/api/v1/table/useTable',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'success',
        data: {
          items: [
            { id: 1, name: 'tableRegister', desc: '注册useTable，用于获取实例', dataType: 'string', options: [], default: '' },
            {
              id: 2,
              name: 'tableState',
              desc: '绑定的数据',
              dataType: 'array',
              children: [
                { id: 4, name: 'dataList', desc: '表格数据', dataType: 'any[]', options: [] },
                { id: 5, name: 'loading', desc: '加载状态', dataType: 'boolean', options: [] },
                { id: 6, name: 'currentPage', desc: '当前页', dataType: 'number', options: [] },
                { id: 7, name: 'pageSize', desc: '每页显示多少条数据', dataType: 'number', options: [] },
                { id: 8, name: 'total', desc: '数据总数', dataType: 'number', options: [] },
              ]
            },
            {
              id: 3,
              name: 'tableMethods',
              desc: '暴露的方法',
              dataType: 'array',
              children: [
                { name: 'setProps', desc: '设置表格属性，会和表格其他属性自动合并', dataType: '(props) => void' },
                { name: 'setColumn', desc: '设置表头结构，替代原有结构', dataType: '(columnProps) => void' },
                { name: 'addColumn', desc: '新增表头结构', dataType: '(TableColumn, index) => void' },
                { name: 'deleteColumn', desc: '删除表头结构，根据field字段判断需要删除哪列数据' },
                { name: 'getList', desc: '获取表格数据', dataType: '() => void' },
                { name: 'delList', desc: '删除表格数据', dataType: '(idsLength) => void' },
                { name: 'getElTableExpose', desc: '获取表格实例', dataType: '() => ElTable' },
              ],
            },
          ],
          total: 0
        }
      }
    }
  },
  {
    url: '/api/v1/table/delTable',
    method: 'delete',
    response: () => {
      return {
        code: 0,
        message: 'success',
        data: {
          message: '删除成功'
        }
      }
    }
  },
  {
    url: '/api/v1/table/basicForm',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'success',
        data: {
          formSchema,
          formAttributes: [
            { name: 'model', desc: '表单数据', dataType: 'object', options: [], default: '' },
            { name: 'schema', desc: '表单结构', dataType: 'FormSchema[]', options: [], default: '' },
            { name: 'isCol', desc: '是否需要栅格布局', dataType: 'boolean', options: [], default: '' },
            { name: 'labelWidth', desc: '表单 label 宽度', dataType: 'string/number', options: [], default: '' },
            { name: 'rules', desc: '表单验证规则', dataType: '', options: [], default: '' },
            { name: 'labelPosition', desc: 'label 位置', dataType: 'string', options: ['left', 'right', 'top'], default: '' },
            { name: 'disabled', desc: '表单禁用', dataType: 'boolean', options: [], default: '' },
            { name: 'showMessage', desc: '是否显示校验错误信息', dataType: 'boolean', options: [] },
            { name: 'inlineMessage', desc: '以行内形式展示校验信息	', dataType: 'boolean', options: [] },
            { name: 'hide-required-asterisk	', desc: '是否隐藏必填字段的标签旁边的红色星号	', dataType: 'boolean', options: [] },
            { name: 'size', desc: '大小', options: ["medium", "small", "mini"], dataType: 'string' },
          ],
        }
      }
    }
  },
  {
    url: '/api/v1/table/useForm',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'success',
        data: {
          items: [
            { id: 1, name: 'formRegister', desc: '注册useForm，用于获取实例', dataType: 'string', options: [], default: '' },
            {
              id: 3,
              name: 'formMethods',
              desc: '暴露的方法',
              dataType: 'object',
              children: [
                { name: 'setValues', desc: '设', dataType: '(data) => void' },
                { name: 'setProps', desc: '设置表单属性，会和表单其他属性自动合并', dataType: '(props) => void' },
                { name: 'setSchema', desc: '设置表单结构，替代原有结构', dataType: '(schemaProps) => void' },
                { name: 'addSchema', desc: '新增表单结构', dataType: '(formSchema, index) => void' },
                { name: 'delSchema', desc: '删除表单结构，根据field字段判断需要删除哪列数据', dataType: '(field) => void' },
                { name: 'getFormData', desc: '获取表单数据', dataType: '() => void' },
                { name: 'delList', desc: '删除表单数据', dataType: '(idsLength) => void' },
                { name: 'getFormData', desc: '获取表单数据', dataType: '() => ElTable' },
                { name: 'getComponentExpose', desc: '获取表单组件实例，如 ElInput 实例', dataType: '(field) => any' },
                { name: 'getFormItemExpose', desc: '获取 formItem 组件实例', dataType: '(field) => ElFormItem' },
                { name: 'getElFormExpose', desc: '获取 elForm 组件实例', dataType: '() => ElForm' },
                { name: 'getFormExpose', desc: '获取二次封装的 Form 组件实例', dataType: '() => Form' },
              ],
            },
          ],
          total: 0
        }
      }
    }
  },
  {
    url: '/api/v1/table/search',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'success',
        data: {
          searchComponents: [
            {
              id: 1,
              name: 'props',
              desc: 'Search 组件可以传入的属性',
              dataType: '',
              children: [
                { id: 13, name: 'model', desc: '绑定值', dataType: 'object' },
                { id: 2, name: 'schema', desc: '生成Form的布局结构数组', dataType: 'formSchema' },
                { id: 3, name: 'isCol', desc: '是否需要栅格布局', dataType: 'boolean' },
                { id: 4, name: 'labelWidth', desc: '表单label宽度', dataType: 'string/number' },
                { id: 5, name: 'layout', desc: '操作按钮位置', dataType: 'string', options: ['inline', 'bottom'] },
                { id: 6, name: 'buttonPosition', desc: 'bottom按钮的对齐方式', dataType: 'string', options: ['left', 'center', 'right'] },
                { id: 7, name: 'showSearch', desc: '是否显示搜索按钮', dataType: 'boolean' },
                { id: 71, name: 'searchLoading', desc: '搜索按钮loading', dataType: 'boolean' },
                { id: 8, name: 'showReset', desc: '是否显示重置按钮', dataType: 'boolean' },
                { id: 8, name: 'resetLoading', desc: '重置按钮loading', dataType: 'boolean' },
                { id: 9, name: 'showExpand', desc: '是否显示伸缩按钮', dataType: 'boolean' },
                { id: 10, name: 'expandField', desc: '伸缩的界限字段', dataType: 'string' },
                { id: 11, name: 'inline', desc: '是否使用行内布局	', dataType: 'boolean' },
                { id: 12, name: 'removeNoValueItem', desc: '是否去除空值项	', dataType: 'boolean' },
              ]
            },
            {
              id: 30,
              name: 'event',
              desc: 'emit 传出的事件',
              dataType: '',
              children: [
                { id: 31, name: 'search', desc: '获取搜索的数据', dataType: '(value) => void' },
                { id: 31, name: 'reset', desc: '获取重置的数据', dataType: '(value) => void' },
                { id: 31, name: 'register', desc: '组件组册事件', dataType: '() => void' },
                { id: 31, name: 'validate', desc: '表单验证', dataType: '(prop, isValid, message) => void' },
              ]
            },
            {
              id: 14,
              name: 'methods',
              desc: 'Search 组件暴露的方法',
              dataType: '',
              children: [
                { id: 15, name: 'setValues', desc: '设置表单值', dataType: '(data) => void' },
                { id: 16, name: 'setProps', desc: '设置表单属性', dataType: '(props) => void' },
                { id: 17, name: 'getElFormExpose', desc: '用于获取 Form 组件的实例', dataType: '() => ElForm' },
                { id: 18, name: 'getFormData', desc: '用于获取表单数据', dataType: '() => Promise' },
              ]
            },
          ],
          useSearch: [
            { id: 20, name: 'searchRegister', desc: '注册搜索组件', dataType: '' },
            { id: 21, name: 'searchMethods', desc: '搜索组件方法，同 Search 组件暴露的方法', dataType: '' }
          ]
        }
      }
    }
  },
  {
    url: '/api/v1/table/getTable',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'success',
        data: Mock.mock({
            'items|1-10': [{
              'id|+1': 1,
              title: '@ctitle(5, 10)',
              author: '@cname',
              display_time: '@datetime',
              pageviews: '@integer(300, 5000)'
            }],
            total: 5
          })
      }
    }
  },
  {
    url: '/api/v1/table/saveTable',
    method: 'post',
    response: () => {
      return {
        code: 0,
        message: 'success',
        data: null
      }
    }
  },
  {
    url: '/api/v1/table/desc',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'success',
        data: {
          items: [
            { id: 1, name: 'title', desc: '标题', dataType: 'string', options: [] },
            { id: 11, name: 'schema', desc: '布局结构数据', dataType: 'DescriptionsSchema[]', options: [], children: descSchema },
            { id: 12, name: 'data', desc: '展示的数据	', dataType: 'object', options: [] },
            { id: 13, name: 'border', desc: '是否显示边框', dataType: 'boolean', options: [] },
            { id: 14, name: 'column', desc: '列数', dataType: 'number', options: [] },
            { id: 15, name: 'size', desc: '大小', dataType: 'string', options: ['large', 'default', 'small'] },
            { id: 16, name: 'direction', desc: '方向', dataType: 'string', options: ['horizontal', 'vertical'] },
          ]
        }
      }
    }
  },
  {
    url: '/api/v1/table/curd',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'success',
        data: {
          items: [
            { id: 2, name: 'field', desc: '字段名，需要与 data 中的属性名对应，自动合并到四个组件的配置中', dataType: 'string' },
            { id: 1, name: 'label', desc: '字段标签名，自动合并到四个组件的配置中', dataType: 'string' },
            { id: 3, name: 'table', desc: 'tableColumns 配置', dataType: '', children: tableColumns },
            { id: 4, name: 'form', desc: 'fromSchema 配置', dataType: '', children: formSchema },
            { id: 5, name: 'search', desc: 'searchSchema 配置，同fromSchema', dataType: '', children: [] },
            { id: 6, name: 'detail', desc: 'DescriptionsSchema 配置', dataType: '', children: descSchema },
          ]
        }
      }
    }
  }
] as MockMethod[];
