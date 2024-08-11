<script lang="tsx">
import { computed, defineComponent, onMounted, PropType, ref, unref, watch } from 'vue';
import { ElForm, ComponentSize, FormRules } from 'element-plus';
import { ComponentNameEnum, FormProps, FormSchema, FormSetProps } from './types';
import { propTypes } from '@/utils/propTypes';
import { getSlot } from '@/utils/tsxHelper';
import { componentMap } from './helper/componentMap';
import { get, set } from 'lodash-es';
import { initModel, setComponentProps, setGridProp, setItemComponentSlots, setTextPlaceholder } from './helper';
import { useRenderSelect } from './components/useRenderSelect';
import { useRenderRadio } from './components/useRenderRadio';
import { useRenderCheckbox } from './components/useRenderCheckbox';

const { renderSelectOptions } = useRenderSelect();
const { renderRadioOptions } = useRenderRadio();
const { renderCheckboxOptions } = useRenderCheckbox();

export default defineComponent({
  name: 'Form',
  props: {
    // 生成Form的布局结构数组
    schema: {
      type: Array as PropType<FormSchema[]>,
      default: () => []
    },
    // 是否需要栅格布局
    isCol: propTypes.bool.def(true),
    // 表单数据对象
    model: {
      type: Object as PropType<any>,
      default: () => ({})
    },
    // 是否自动设置placeholder
    autoSetPlaceholder: propTypes.bool.def(true),
    // 是否自定义内容
    isCustom: propTypes.bool.def(false),
    // 表单label宽度
    labelWidth: propTypes.oneOfType([String, Number]).def('auto'),
    rules: {
      type: Object as PropType<FormRules>,
      default: () => ({})
    },
    labelPosition: propTypes.oneOf(['left', 'right', 'top']).def('right'),
    labelSuffix: propTypes.string.def(''),
    hideRequiredAsterisk: propTypes.bool.def(false),
    requireAsteriskPosition: propTypes.oneOf(['left', 'right']).def('left'),
    showMessage: propTypes.bool.def(true),
    inlineMessage: propTypes.bool.def(false),
    statusIcon: propTypes.bool.def(false),
    validateOnRuleChange: propTypes.bool.def(true),
    size: {
      type: String as PropType<ComponentSize>,
      default: undefined
    },
    disabled: propTypes.bool.def(false),
    scrollToError: propTypes.bool.def(false),
    scrollToErrorOffset: propTypes.oneOfType([Boolean, Object]).def(undefined)
  },
  emits: ['register'],
  setup(props, { slots, emit, expose }) {
    const elFormRef = ref<InstanceType<typeof ElForm>>();
    
    const formModel = ref(props.model);
    const setValues = (data = {}) => {
      formModel.value = Object.assign(unref(formModel), data);
    }

    const mergeProps = ref<FormProps>({})

    const getProps = computed(() => {
      const propsObj = { ...props }
      Object.assign(propsObj, unref(mergeProps))
      return propsObj
    });

    const setProps = (props: FormProps = {}) => {
      mergeProps.value = Object.assign(unref(mergeProps), props)
    }

    // 存储表单实例
    const formComponents = ref({})

    // 存储form-item实例
    const formItemComponents = ref({})

    /**
     * @description: 获取表单组件实例
     * @param field 表单字段
     */
     const getComponentExpose = (field: string) => {
      return unref(formComponents)[field]
    }

    /**
     * @description: 获取formItem实例
     * @param field 表单字段
     */
    const getFormItemExpose = (field: string) => {
      return unref(formItemComponents)[field]
    }

    const setComponentRefMap = (ref: any, field: string) => {
      formComponents.value[field] = ref
    }

    const setFormItemRefMap = (ref: any, field: string) => {
      formItemComponents.value[field] = ref
    }

    const delSchema = (field: string) => {
      const schema = unref(getProps).schema as FormSchema[];
      const index = schema.findIndex((item: FormSchema) => item.field === field);
      if (index > -1) {
        schema.splice(index, 1);
      }
    }

    const addSchema = (formSchema: FormSchema, index?: number) => {
      const schema = unref(getProps).schema as FormSchema[];
      if (index !== void 0) {
        schema.splice(index, 0, formSchema);
        return;
      }
      schema.push(formSchema);
    }

    const setSchema = (schemaProps: FormSetProps[]) => {
      const schema = unref(getProps).schema as FormSchema[];
      for (const v of schema) {
        for (const item of schemaProps) {
          if (v.field === item.field) {
            v[item.path] = item.value;
          }
        }
      }
    }

    onMounted(() => {
      emit('register', unref(elFormRef)?.$parent, unref(elFormRef))
    })

    watch(
      () => unref(getProps).schema,
      (schema) => {
        formModel.value = initModel(schema as FormSchema[], unref(formModel));
      },
      {
        immediate: true,
        deep: true
      }
    )
    
    expose({
      setValues,
      formModel,
      setProps,
      delSchema,
      addSchema,
      setSchema,
      getComponentExpose,
      getFormItemExpose
    })

    // 渲染包裹标签，是否使用栅格布局
    const renderWrap = () => {
      const { isCol } = unref(getProps);
      const content = isCol ? (
        <el-row gutter={ 20 }>{ renderFormItemWrap() }</el-row>
      ) : (
        renderFormItemWrap()
      )
      return content;
    }

    const renderFormItemWrap = () => {
      const { schema = [], isCol } = unref(getProps);

      return schema
        .filter((v: FormSchema) => !v.hidden)
        .map((item: FormSchema) => {
          const isDivider = item.component === 'Divider';
          return isDivider ? (
            <el-divider { ...item.componentProps }>{ item?.label }</el-divider>
          ) : isCol ? (
            <el-col {...setGridProp(item.colProps)}>
              { renderFormItem(item) }
            </el-col>
          ) : (
            renderFormItem(item)
          )
        })
    }

    const renderFormItem = (item: FormSchema) => {
      const formItemSlots = {
        default: () => {
          const defaultSlot = item?.formItemProps?.slots?.default;
          const { autoSetPlaceholder } = unref(getProps);
          if (defaultSlot) {
            return defaultSlot(formModel.value);
          } else {
            const Com = componentMap[item.component];
            const componentSlots = item?.componentProps?.slots || {};

            const slotsMap = {
              ...setItemComponentSlots(componentSlots)
            }
            
            if (item.component === ComponentNameEnum.SELECT) {
              // select 选择器
              slotsMap.default = !componentSlots.default
                ? () => renderSelectOptions(item)
                : () => {
                  return componentSlots.default(unref(item?.componentProps?.options))
                }
            } else if (item.component === ComponentNameEnum.RADIO_GROUP || item.component === ComponentNameEnum.RADIO_BUTTON) {
              // 单选框组
              slotsMap.default = !componentSlots.default
                ? () => renderRadioOptions(item)
                : () => {
                  return componentSlots.default(unref(item?.componentProps?.options))
                }
            } else if (item.component === ComponentNameEnum.CHECKBOX_GROUP || item.component === ComponentNameEnum.CHECKBOX_BUTTON) {
              // 多选框组
              slotsMap.default = !componentSlots.default
                ? () => renderCheckboxOptions(item)
                : () => {
                  return componentSlots.default(unref(item?.componentProps?.options))
                }
            }

            const Comp = () => {
              const itemVal = computed({
                get: () => {
                  return get(formModel.value, item.field);
                },
                set: (val) => {
                  set(formModel.value, item.field, val);
                }
              })
              return (
                <Com
                  vModel={ itemVal.value }
                  ref={ (el: any) => setComponentRefMap(el, item.field) }
                  { ...(autoSetPlaceholder && setTextPlaceholder(item)) }
                  { ...setComponentProps(item) }
                  style={
                    item.componentProps?.style || { width: '100%' }
                  }
                >
                  { slotsMap }
                </Com>
              )
            }

            return <>{ Comp() }</>
          }
        }
      }

      const slots = item?.formItemProps?.slots;
      if (slots?.label) {
        formItemSlots.label = (args) => {
          return (slots.label!(args));
        }
      }
      return (
        <el-form-item
          v-show={ !item.hidden }
          ref={ (el: any) => setFormItemRefMap(el, item.field) }
          { ...(item.formItemProps || {}) }
          prop={ item.field }
          label={ item.label }
        >
          { formItemSlots }
        </el-form-item>
      )
    }

    // 过滤传入Form组件的属性
    const getFormBindValue = () => {
      // 避免在标签上出现多余的属性
      const delKeys = ['schema', 'isCol', 'autoSetPlaceholder', 'isCustom', 'model']
      const props = { ...unref(getProps) }
      for (const key in props) {
        if (delKeys.indexOf(key) !== -1) {
          delete props[key]
        }
      }
      return props as FormProps
    }

    return () => {
      return (
        <ElForm
          ref={elFormRef}
          {...getFormBindValue()}
          model={unref(getProps).isCustom ? unref(getProps).model : formModel}
          // @ts-ignore
          onSubmit={(e: Event) => {
            e.preventDefault()
          }}
        >
          {{
            // 如果需要自定义，就什么都不渲染，而是提供默认插槽
            default: () => {
              const { isCustom } = unref(getProps)
              return isCustom ? getSlot(slots, 'default') : renderWrap()
            }
          }}
        </ElForm>
      )
    }
  }
})
</script>