<script setup lang="tsx">
import { Form, FormSchema } from '@/components/Form'
import { useForm } from '@/hooks/useForm'
import { PropType, reactive, watch } from 'vue'
import { ITableData } from '@/api/table'
import { useValidator } from '@/hooks/useValidator'

const { required } = useValidator();

const props = defineProps({
  currentRow: {
    type: Object as PropType<ITableData>,
    default: () => null
  },
  formSchema: {
    type: Array as PropType<FormSchema[]>,
    default: () => []
  }
})

const rules = reactive({
  title: [required()],
  author: [required()],
})

const { formRegister, formMethods } = useForm();
const { setValues, getFormData, getElFormExpose } = formMethods;

const submit = async () => {
  const elForm = await getElFormExpose();
  const valid = await elForm?.validate();
  if (valid) {
    const formData = await getFormData();
    return formData;
  }
}

watch(
  () => props.currentRow,
  (currentRow) => {
    if (!currentRow) return;
    setValues(currentRow);
  }
)

defineExpose({
  submit
})
</script>

<template>
  <Form :rule="rules" @register="formRegister" :schema="formSchema"></Form>
</template>