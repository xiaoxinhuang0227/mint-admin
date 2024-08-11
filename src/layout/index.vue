<script setup>
import AppMain from './appMain.vue';
import SideBar from './sidebar/index.vue';
import Header from './header/index.vue';

</script>

<template>
  <div class="layout">
    <SideBar class="sidebar"></SideBar>
    <div class="right">
      <Header class="header"></Header>
      <AppMain class="app-main"></AppMain>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout {
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .sidebar {
    // width: $sidebar-width;
    background-color: $sidebar-bg-color;
    font-size: $sidebar-font-size;
    color: $sidebar-text-color;
    flex-shrink: 0;
    // border-right: 1px solid $border-color;
  }
  .right {
    display: flex;
    flex-direction: column;
    flex: auto;
    width: 0;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: $header-height;
      padding: 0 $page-padding;
      line-height: $header-height;
      background-color: $header-bg-color;
      font-size: $header-font-size;
      color: $header-text-color;
      border-bottom: 2px solid #eee;
    }
    .app-main {
      flex: 1;
      min-width: 800px;
      overflow: scroll;
      padding-bottom: 20px;
      // padding: $page-padding;
      background-color: $page-bg-color;
    }
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: $sidebar-width;
}
</style>