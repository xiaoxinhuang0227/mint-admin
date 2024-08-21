<script setup lang="tsx">
import { Form, FormSchema } from '@/components/Form';
import { useForm } from '@/hooks/useForm';
import { PropType, reactive, watch, ref, unref, nextTick } from 'vue';
import { useValidator } from '@/hooks/useValidator';
import { wholeMenuRouterMap } from '@/router';
// import { getRoleTree, getRoleDetailApi } from '@/api/role'
// import { IPermissionItem } from '@/api/role/type';

const { required } = useValidator()

const props = defineProps({
  currentRow: {
    type: Object as PropType<any>,
    default: () => null
  }
})

const treeRef = ref();
const defaultCheckedKeys = ref<string[]>([]);

const getPermitRoutes = async (all: IPermissionItem[]) => {
  const res = await getRoleDetailApi(props.currentRow.id);

  const permitRoutes = res.data.permission.filter(v => {
    const idx = all.findIndex(item => {
      return item?.children && item.code == v;
    });
    return idx == -1;
  })
  if (!res.code && permitRoutes.length) {
    defaultCheckedKeys.value = permitRoutes;
  }
}

const loading = ref<boolean>(false);
const treeData = ref([])
const getMenuList = async () => {
  try {
    loading.value = true;
    treeData.value = hanldTreeData(wholeMenuRouterMap)
    if (props.currentRow.id) {
      await getPermitRoutes(treeData.value);
    }
    await nextTick();
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
}

const hanldTreeData = (data) => {
  if (!data) return null;
  return data.map(v => {
    let node;
    if (v?.children?.length == 1) {
      node = v.children[0];
    } else {
      node = v;
    }
    return {
      name: node.name,
      label: node.meta.title,
      children: hanldTreeData(node?.children)
    }
  })
}

getMenuList()

const formSchema = ref<FormSchema[]>([
  {
    field: 'name',
    label: '角色名称',
    colProps: { span: 24 },
    component: 'Input',
    componentProps: {
      maxlength: 15,
      showWordLimit: true
    }
  },
  {
    field: 'remark',
    label: '备注',
    colProps: { span: 24 },
    component: 'Input',
    componentProps: {
      type: 'textarea',
      rows: 4,
      maxlength: 100,
      showWordLimit: true
    }
  },
  {
    field: 'permission',
    label: '菜单',
    colProps: {
      span: 24
    },
    formItemProps: {
      slots: {
        default: () => {
          return (
            <>
              <div class="flex w-full">
                <div class="flex-1">
                  <ElTree
                    ref={ treeRef }
                    show-checkbox
                    node-key="name"
                    highlight-current
                    default-checked-keys={ defaultCheckedKeys.value }
                    expand-on-click-node={ false }
                    data={ treeData.value }
                    onNode-click={ nodeClick }
                  >
                  </ElTree>
                </div>
              </div>
            </>
          )
        }
      }
    }
  }
])

const currentTreeData = ref()
const nodeClick = (treeData: any) => {
  currentTreeData.value = treeData
}

const getPermission = () => {
  return unref(treeRef)?.getCheckedNodes(false, true)?.map((v: IPermissionItem) => v.code) || [];
}

const rules = reactive({
  name: [required()],
  permission: [{
    required: true,
    validator: (_, __, callback) => {
      if (!getPermission().length) {
        callback('请选择菜单');
      } else {
        callback();
      }
    }
  }]
})

const { formRegister, formMethods } = useForm()
const { setValues, getFormData, getElFormExpose } = formMethods

const submit = async () => {
  const elForm = await getElFormExpose();
  const valid = await elForm?.validate();
  if (valid) {
    const formData = await getFormData()
    const checkedKeys = getPermission();

    formData.permission = checkedKeys || []
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
  <Form v-loading="loading" :rules="rules" @register="formRegister" :schema="formSchema" />
</template>
