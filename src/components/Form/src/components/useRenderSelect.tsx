import { FormSchema, SelectOption } from "../types";
import { ElOptionGroup, ElOption } from 'element-plus';

export const useRenderSelect = () => {
  const renderSelectOptions = (item: FormSchema) => {
    const componentProps = item?.componentProps;
    const optionGroupDefaultSlot = componentProps?.slots?.optionGroupDefault;
    const labelAlias = componentProps?.props?.label;
    const keyAlias = componentProps?.props?.key;

    return componentProps?.options?.map(option => {
      if (option?.options?.length) {
        return optionGroupDefaultSlot ? (
          optionGroupDefaultSlot(option)
        ) : (
          <ElOptionGroup label={ option[labelAlias || 'label'] } key={ option[keyAlias || 'key'] }>
            {{
              default: () => option?.options?.map(v => {
                
                return renderSelectOptionItem(item, v);
              })
            }}
          </ElOptionGroup>
        )
      } else {
        return renderSelectOptionItem(item, option);
      }
    })
  }

  const renderSelectOptionItem = (item: FormSchema, option: SelectOption) => {
    const componentProps = item?.componentProps;
    const labelAlias = componentProps?.props?.label || 'label';
    const keyAlias = componentProps?.props?.key || 'label';
    const valueAlias = componentProps?.props?.value || 'value';
    const optionDefaultSlot = componentProps.slots?.optionDefault;

    return (
      <ElOption
        { ...option }
        key={ option[keyAlias] }
        label={ option[labelAlias] }
        value={ option[valueAlias] }
      >
        {{ default: () => (optionDefaultSlot && optionDefaultSlot(option)) }}
      </ElOption>
    )
  }
  return { renderSelectOptions };
}