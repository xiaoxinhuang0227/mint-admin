<script setup>
import Breadcrumb from './breadcrumb.vue';
import Collapse from './collapse.vue';
import UserInfo from './userInfo.vue';
import { Screenfull } from '@/components/Screenfull/index';

</script>

<template>
  <div class="component-header flex-between">
    <div class="flex-center">
      <Collapse class="mr-5"></Collapse>
      <Breadcrumb></Breadcrumb>
    </div>
    <div class="flex-center">
      <Screenfull class="mr-5" :size="30" color="#696969"></Screenfull>
      <UserInfo></UserInfo>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>