import { ElCheckboxGroup, ElCheckbox } from "element-plus";
import { CheckboxGroupComponentProps, ComponentNameEnum, FormSchema } from "../types"

export const useRenderCheckbox = () => {
  const renderCheckboxOptions = (item: FormSchema) => {
    const componentProps = item?.componentProps as CheckboxGroupComponentProps;
    const valueAlias = componentProps?.props?.value || 'value';
    const labelAlias = componentProps?.props?.label || 'label';
    const disabledAlias = componentProps?.props?.disabled || 'disabled';
    const Com = item.component === ComponentNameEnum.CHECKBOX_GROUP ? ElCheckbox : ElCheckboxGroup;

    return componentProps?.options?.map(option => {
      return (
        <Com
          { ...option }
          disabled={ option[disabledAlias] }
          key={ option[valueAlias] }
          value={ option[valueAlias] }
          label={ option[labelAlias] }
        >
        </Com>
      )
    })
  }
  return { renderCheckboxOptions };
}