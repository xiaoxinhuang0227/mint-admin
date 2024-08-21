<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus';
import TaskItem from './components/taskItem.vue';
import variables from '@/styles/variables.module.scss';
import { ref } from 'vue';

const todoList = ref([
  { id: 1, title: '权限系统完善' },
  { id: 2, title: '错误页面UI' },
])

const doingList = ref([
  { id: 3, title: '看板拖拽模块' },
])

const completedList = ref([
  { id: 4, title: 'Echarts组件' },
  { id: 5, title: '页面布局' },
  { id: 6, title: '首页' },
  { id: 7, title: '地图组件' },
  { id: 8, title: '路由权限跳转' },
  { id: 9, title: '编辑器组件' },
])

function onUpdate() {
  console.log('update')
}
function onAdd() {
  console.log('add')
}
function remove() {
  console.log('remove')
}
</script>

<template>
  <div class="page-status-board">
    <div class="board-wrap flex m-3">
      <ContentWrap class="flex-1 mr-5">
        <template #title>代办的</template>
        <VueDraggable
          class="drag-list"
          :animation="150"
          v-model="todoList"
          group="task"
          @update="onUpdate"
          @add="onAdd"
          @remove="remove"
        >
          <div v-for="item in todoList" :key="item.id" class="drag-item">
            <TaskItem color="green" :item="item"></TaskItem>
          </div>
        </VueDraggable>
      </ContentWrap>
      <ContentWrap class="flex-1 mr-5">
        <template #title>进行中</template>
        <VueDraggable
          class="drag-list"
          :animation="150"
          v-model="doingList"
          group="task"
          @update="onUpdate"
          @add="onAdd"
          @remove="remove"
        >
          <div v-for="item in doingList" :key="item.id" class="drag-item">
            <TaskItem :color="variables.primaryColor" :item="item"></TaskItem>
          </div>
        </VueDraggable>
      </ContentWrap>
      <ContentWrap class="flex-1">
        <template #title>已完成</template>
        <VueDraggable
          class="drag-list"
          :animation="150"
          v-model="completedList"
          group="task"
          @update="onUpdate"
          @add="onAdd"
          @remove="remove"
        >
          <div v-for="item in completedList" :key="item.id" class="drag-item">
            <TaskItem :item="item"></TaskItem>
          </div>
        </VueDraggable>
      </ContentWrap>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-status-board {
  position: relative;
}
</style>
