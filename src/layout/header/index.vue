<script setup>
import Breadcrumb from './breadcrumb.vue';
import Collapse from './collapse.vue';
import UserInfo from './userInfo.vue';


</script>

<template>
  <div class="component-header flex-between">
    <div class="flex-center">
      <Collapse class="mr-5"></Collapse>
      <Breadcrumb></Breadcrumb>
    </div>
    <div>
      <UserInfo></UserInfo>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>