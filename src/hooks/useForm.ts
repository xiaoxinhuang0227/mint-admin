import { nextTick, ref, unref } from "vue";
import { ElForm, FormProps } from "element-plus";
import { FormSetProps, Form, FormSchema } from "../components/Form";

export const useForm = () => {
  const formRef = ref<typeof Form>();
  const elFormRef = ref<InstanceType<typeof ElForm>>();

  const register = (ref: typeof Form, elRef: InstanceType<typeof ElForm>) => {
    formRef.value = ref;
    elFormRef.value = elRef;
  }

  const getForm = async () => {
    await nextTick();
    const form = unref(formRef);
    if (!form) {
      console.error('The form is not registered. Please use the register method to register');
    }
    return form;
  }

  const methods = {
    setProps: async (props: FormProps) => {
      const form = await getForm();
      form?.setProps(props);
      if (props.model) {
        form?.setValues(props.model);
      }
    },
    setValues: async (data: object) => {
      const form = await getForm();
      form?.setValues(data);
    },
    setSchema: async (schema: FormSetProps[]) => {
      const form = await getForm();
      form?.setSchema(schema);
    },
    addSchema: async (formSchema: FormSchema, index?: number) => {
      const form = await getForm();
      form?.addSchema(formSchema, index);
    },
    /**
     * @description 删除schema
     * @param field 删除哪个数据
     */
    delSchema: async (field: string) => {
      const form = await getForm();
      form?.delSchema(field);
    },
    getFormData: async () => {
      const form = await getForm();
      const model = form.formModel;
      return model;
    },
    /**
     * @description 获取表单组件的实例
     * @param field 表单项唯一标识
     * @returns component instance
     */
    getComponentExpose: async (field: string) => {
      const form = await getForm();
      return form?.getComponentExpose(field);
    },
    /**
     * @description 获取formItem组件的实例
     * @param field 表单项唯一标识
     * @returns formItem instance
     */
    getFormItemExpose: async (field: string) => {
      const form = await getForm();
      return form?.getFormItemExpose(field);
    },
    getElFormExpose: async () => {
      await getForm();
      return unref(elFormRef);
    },
    getFormExpose: async () => {
      await getForm();
      return unref(formRef);
    },
  }
  return {
    formRegister: register,
    formMethods: methods
  }
}