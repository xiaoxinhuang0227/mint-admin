<script setup lang="ts">
import { Form, FormSchema } from '@/components/Form'
import { useForm } from '@/hooks/useForm'
import { PropType, reactive, watch } from 'vue'
import { useValidator } from '@/hooks/useValidator'
import { IManager } from '@/api/auth'

const { required, checkPhone, checkPassward } = useValidator()

const props = defineProps({
  currentRow: {
    type: Object as PropType<IManager>,
    default: () => undefined
  },
  formSchema: {
    type: Array as PropType<FormSchema[]>,
    default: () => []
  }
})

const isEdit = (props?.currentRow?.id) ? true : false

const rules = reactive({
  realName: [required()],
  account: [required()],
  password: [checkPassward(!isEdit)],
  roleId: [required()],
  phone: [checkPhone()]
})

const { formRegister, formMethods } = useForm()
const { setValues, getFormData, getElFormExpose } = formMethods

const submit = async () => {
  const elForm = await getElFormExpose();
  const valid = await elForm?.validate();
  if (valid) {
    const formData = await getFormData();
    return formData
  }
}

watch(
  () => props.currentRow,
  (currentRow) => {
    if (!currentRow) return
    setValues(currentRow)
  },
  {
    deep: true,
    immediate: true
  }
)

defineExpose({
  submit
})
</script>

<template>
  <div>
    <Form :rules="rules" @register="formRegister" :schema="formSchema" />
  </div>
</template>
