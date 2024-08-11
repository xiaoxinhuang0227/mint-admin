<script setup lang="ts">
import { PropType, ref, unref, watch } from 'vue';
import { TableColumn } from '../types';
import { VueDraggable } from 'vue-draggable-plus';
import { cloneDeep } from 'lodash-es'
import { Icon } from '@/components/Icon';

const props = defineProps({
  columns: {
    type: Array as PropType<TableColumn[]>,
    default: () => []
  }
});

const $emit = defineEmits(['setNewColumns'])

const showSettingDrawer = defineModel<boolean>();
const checkAll = ref<boolean>(true);

const checkColumns = ref<string[]>([]);
const settingColumns = ref<TableColumn[]>([])

const toggleCheckAll = () => {
  checkAll.value = !unref(checkAll);
}

const handleCheckedColumnsChange = (val: string[]) => {
  const checkedCount = val.length;
  checkAll.value = checkedCount === unref(checkColumns).length;
}

const reset = () => {
  initColumns(props.columns);
}

const confirm = () => {
  const newColumns = unref(settingColumns).filter(item => unref(checkColumns).includes(item.field));
  $emit('setNewColumns', newColumns);
  console.log(newColumns)
  showSettingDrawer.value = false;
}

const initColumns = (columns: TableColumn[]) => {
  settingColumns.value = cloneDeep(columns);
  checkColumns.value = unref(settingColumns).map(v => v.field) || [];
}

const close = () => {
  showSettingDrawer.value = false;
  initColumns(props.columns);
}

watch(
  () => props.columns,
  (columns) => {
    initColumns(columns);
  },
  { immediate: true, deep: true }
)
</script>

<template>
  <el-drawer v-model="showSettingDrawer" title="列动态设置" size="350">
    <div class="flex-between">
      <div class="flex-align-center">
        <el-checkbox
          v-model="checkAll"
          @change="toggleCheckAll"
        ></el-checkbox>
        <span class="ml-10">{{ checkColumns?.length }} / {{ settingColumns?.length }}</span>
      </div>
      <div>排序</div>
    </div>
    <div v-if="settingColumns?.length">
      <VueDraggable
        v-model="settingColumns"
        target=".el-checkbox-group"
        handle=".handle"
        :animation="150"
      >
        <el-checkbox-group
          ref="draggableWrap"
          v-model="checkColumns"
          @change="handleCheckedColumnsChange"
        >
          <div
            v-for="item in settingColumns"
            :key="item.field"
            class="flex-between mt-10"
          >
            <el-checkbox :label="item.field">{{ item.label }}</el-checkbox>
            <Icon class="clickable handle" icon="carbon:drag-vertical"></Icon>
          </div>
        </el-checkbox-group>
      </VueDraggable>
    </div>
    <!-- <div>{{ settingColumns }}</div>
    <div class="mt-10">{{ checkColumns }}</div> -->
    <template #footer>
      <div class="flex">
        <el-button @click="close">取消</el-button>
        <el-button @click="reset">还原</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>