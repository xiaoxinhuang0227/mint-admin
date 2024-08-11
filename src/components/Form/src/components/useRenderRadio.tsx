import { ElButtonGroup, ElRadio } from "element-plus";
import { ComponentNameEnum, FormSchema, RadioGroupComponentProps } from "../types"

export const useRenderRadio = () => {
  const renderRadioOptions = (item: FormSchema) => {
    const componentProps = item?.componentProps as RadioGroupComponentProps;
    const valueAlias = componentProps?.props?.value || 'value';
    const labelAlias = componentProps?.props?.label || 'label';
    const disabledAlias = componentProps?.props?.disabled || 'disabled';
    const Com = item.component === ComponentNameEnum.RADIO_GROUP ? ElRadio : ElButtonGroup;

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
  return { renderRadioOptions };
}