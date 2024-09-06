<script setup lang="tsx">
import { onMounted, ref } from 'vue';
import { Table } from '@/components/Table';
import TableAPI, { IUseTableResult } from '@/api/table';

onMounted(() => {
  getData();
})

const tableData = ref<IUseTableResult>();
const getData = async () => {
  try {
    const res: IUseTableResult = await TableAPI.getUseCurdData();
    tableData.value = res.items;
  } catch(e) {
    console.log(e);
  }
}

const sameColumns = [
  {
    label: '属性',
    field: 'name',
    width: 300
  },
  {
    label: '说明',
    field: 'desc',
  },
]

const columns = [
  ...sameColumns,
  {
    label: '类型',
    field: 'dataType',
    width: 300,
  },
]

</script>

<template>
  <div class="page-table-example-basic">
    <HighlightBlock>
      <p>ThreeJS</p>
      <p>场景Scene + 相机Camera --渲染器Renderer--> 投影图（渲染结果）</p>
      <ol>
        <li>创建3D场景 new THREE.Scene() </li>
        <li>创建物体（几何体）+ 创建材质Material（皮肤）-> 网格模型 Mesh</li>
        <li>场景Scene 中添加模型Mesh，设置位置</li>
        <li>创建相机Camera，设置位置及观察目标，可以指向模型的位置 mesh.position</li>
        <li>创建渲染器，设置渲染的Canvas画布的尺寸，进行渲染</li>
      </ol>
    </HighlightBlock>
    <!-- <div>
      <p class="table-header-section text-align-center">formSchema</p>
      <Table :columns="columns" :data="tableData"></Table>
    </div> -->
  </div>
</template>