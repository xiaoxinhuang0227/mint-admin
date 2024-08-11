<script setup lang="tsx">
import { PropType, ref, nextTick } from 'vue'
import { Descriptions, DescriptionsSchema } from '@/components/Description'
import { ElTree } from 'element-plus'
// import { getRoleTree, getRoleDetailApi } from '@/api/role'
// import { IPermissionItem } from '@/api/role/type';

let props = defineProps({
  currentRow: {
    type: Object as PropType<any>,
    default: () => undefined
  }
})

let loading = ref<boolean>(false);

const getPermitRoutes = async () => {
  const res = await getRoleDetailApi(props.currentRow.id);
  return !res.code && res.data.permission;
}

const treeRef = ref<typeof ElTree>()

const currentTreeData = ref()
const nodeClick = (treeData: any) => {
  currentTreeData.value = treeData
}

const filterRoutes = (all: IPermissionItem[], permits: string[]) => {
  const res: IPermissionItem[] = [];
  all.forEach((p: IPermissionItem) => {
    let temp: IPermissionItem = {
      code: '',
      label: '',
      children: []
    };
    const idx = permits.findIndex((v: string) => v == p.code);
    if (idx != -1) {
      temp.code = p.code;
      temp.label = p.label;
      if (p.children && p.children.length) {
        p.children.forEach(child => {
          const childIdx = permits.findIndex(v => v == child.code);
          if (childIdx != -1) {
            temp.children!.push({
              code: child.code,
              label: child.label
            })
          }
        })
      }
      res.push(temp);
    }
  });
  return res;
}

const treeData = ref<any[]>([])
const getMenuList = async () => {
  try {
    loading.value = true;
    const res = await getRoleTree()
    const permitRoutes = await getPermitRoutes();
    if (permitRoutes?.length) {
      treeData.value = filterRoutes(res.data, permitRoutes);
      await nextTick();
    }
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
}
getMenuList()

const detailSchema = ref<DescriptionsSchema[]>([
  {
    field: 'name',
    label: '角色名称'
  },
  {
    field: 'remark',
    label: '备注',
    slots: {
      default: (data) => {
        return data.remark || '-'
      }
    }
  },
  {
    field: 'permission',
    label: '菜单分配',
    span: 24,
    slots: {
      default: () => {
        return (
          <>
            <div class="flex w-full">
              <div class="flex-1">
                <ElTree
                  ref={treeRef}
                  node-key="code"
                  highlight-current
                  expand-on-click-node={false}
                  data={treeData.value}
                  onNode-click={nodeClick}
                >
                </ElTree>
              </div>
            </div>
          </>
        )
      }
    }
  }
])
</script>

<template>
  <div>
    <Descriptions v-loading="loading" :column="1" :schema="detailSchema" :data="currentRow || {}" />
  </div>
</template>

