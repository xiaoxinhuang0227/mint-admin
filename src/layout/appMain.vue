<script setup>

</script>

<template>
  <div class="component-app-main">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <el-scrollbar>
          <component class="main-content" :is="Component" />
        </el-scrollbar>
      </keep-alive>
    </router-view>
  </div>
</template>

<style scoped lang="scss">

</style>