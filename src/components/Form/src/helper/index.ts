import { PlaceholderModel, FormSchema, ComponentNameEnum, ColProps } from '../types'
import { isFunction } from '@/utils/is'
import { firstUpperCase, humpToDash } from '@/utils'
import { set, get } from 'lodash-es'

/**
 *
 * @param schema 对应组件数据
 * @returns 返回提示信息对象
 * @description 用于自动设置placeholder
 */
export const setTextPlaceholder = (schema: FormSchema): PlaceholderModel => {
  const textMap = [
    ComponentNameEnum.INPUT,
    ComponentNameEnum.AUTOCOMPLETE,
    ComponentNameEnum.INPUT_NUMBER,
    ComponentNameEnum.INPUT_PASSWORD
  ]
  const selectMap = [
    ComponentNameEnum.SELECT,
    ComponentNameEnum.TIME_PICKER,
    ComponentNameEnum.DATE_PICKER,
    ComponentNameEnum.TIME_SELECT,
    ComponentNameEnum.SELECT_V2
  ]
  if (textMap.includes(schema?.component as ComponentNameEnum)) {
    return {
      placeholder: '请输入'
    }
  }
  if (selectMap.includes(schema?.component as ComponentNameEnum)) {
    // 一些范围选择器
    const twoTextMap = ['datetimerange', 'daterange', 'monthrange', 'datetimerange', 'daterange']
    if (
      twoTextMap.includes(
        ((schema?.componentProps as any)?.type ||
          (schema?.componentProps as any)?.isRange) as string
      )
    ) {
      return {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        rangeSeparator: '-'
      }
    } else {
      return {
        placeholder: '请选择'
      }
    }
  }
  return {}
}

/**
 *
 * @param col 内置栅格
 * @returns 返回栅格属性
 * @description 合并传入进来的栅格属性
 */
export const setGridProp = (col: ColProps = {}): ColProps => {
  const colProps: ColProps = {
    // 如果有span，代表用户优先级更高，所以不需要默认栅格
    ...(col.span
      ? {}
      : {
          xs: 24,
          sm: 12,
          md: 12,
          lg: 12,
          xl: 12
        }),
    ...col
  }
  return colProps
}

/**
 *
 * @param item 传入的组件属性
 * @returns 默认添加 clearable 属性
 */
export const setComponentProps = (item: FormSchema) => {
  // const notNeedClearable = ['ColorPicker']
  // 拆分事件并组合
  const onEvents = (item?.componentProps as any)?.on || {}
  const newOnEvents = {}

  for (const key in onEvents) {
    if (onEvents[key]) {
      newOnEvents[`on${firstUpperCase(key)}`] = (...args: any[]) => {
        onEvents[key](...args)
      }
    }
  }

  const componentProps = {
    clearable: true,
    ...item.componentProps,
    ...newOnEvents
  }
  // 需要删除额外的属性
  if (componentProps.slots) {
    delete componentProps.slots
  }
  if (componentProps.on) {
    delete componentProps.on
  }
  return componentProps
}

/**
 *
 * @param formModel 表单数据
 * @param slotsProps 插槽属性
 */
export const setItemComponentSlots = (slotsProps = {}) => {
  const slotObj = {}
  for (const key in slotsProps) {
    if (slotsProps[key]) {
      if (isFunction(slotsProps[key])) {
        slotObj[humpToDash(key)] = (...args: any[]) => {
          return slotsProps[key]?.(...args)
        }
      } else {
        slotObj[humpToDash(key)] = () => {
          return slotsProps[key]
        }
      }
    }
  }
  return slotObj
}

/**
 *
 * @param schema Form表单结构化数组
 * @param formModel FormMoel
 * @returns FormMoel
 * @description 生成对应的formModel
 */
export const initModel = (schema: FormSchema[], formModel) => {
  const model = { ...formModel }
  schema.map((v) => {
    if (v.remove) {
      delete model[v.field]
    } else if (v.component !== 'Divider') {
      // const hasField = Reflect.has(model, v.field)
      const hasField = get(model, v.field)
      // 如果先前已经有值存在，则不进行重新赋值，而是采用现有的值
      set(
        model,
        v.field,
        hasField !== void 0 ? get(model, v.field) : v.value !== void 0 ? v.value : undefined
      )
      // model[v.field] = hasField ? model[v.field] : v.value !== void 0 ? v.value : undefined
    }
  })
  // 如果 schema 对应的 field 不存在，则删除 model 中的对应的 field
  for (let i = 0; i < schema.length; i++) {
    const key = schema[i].field
    if (!get(model, key)) {
      delete model[key]
    }
  }
  return model
}
