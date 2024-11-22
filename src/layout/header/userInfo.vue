<script setup>
import { useUserStore } from '@/store/modules/user';
import { ArrowDown } from '@element-plus/icons-vue';

const { logout, userInfo } = useUserStore();
const handleLogout = () => {
  logout();
}

const viewCode = () => {
  window.open('https://github.com/xiaoxinhuang0227/mint-admin');
}
</script>

<template>
  <div class="component-userinfo flex-center">
    <div class="flex-center">
      <ElAvatar :src="userInfo?.avatar">
        <span>{{ userInfo?.username[0] || '-' }}</span>
      </ElAvatar>
      <ElDropdown>
        <div class="cursor-pointer flex-center">
          <span class="ml-2">{{ userInfo?.username || '-' }}</span>
        </div>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="viewCode">查看源码</el-dropdown-item>
            <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </ElDropdown>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>