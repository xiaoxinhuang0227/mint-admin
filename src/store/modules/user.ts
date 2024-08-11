import { defineStore } from "pinia";
import { usePermissionStore } from '@/store/modules/permission';
import { ElMessage, ElMessageBox } from "element-plus";
import { router } from '@/router'

export const useUserStore = defineStore('xx_user_info', {
  state: () => {
    return {
      user: {
        username: '游客',
        avatar: '',
        role: '',
        roleId: '',
        permissions: [],
        token: '',
      },
    }
  },
  getters: {
    userInfo: (state) => state?.user,
    tokenVal: (state) => state?.user?.token,
  },
  actions: {
    updateUserInfo(v) {
      this.user = v;
    },
    updateTokenInfo(v) {
      this.user.token = v;
    },
    logout() {
      ElMessageBox.confirm('确定退出吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.user = null;
        const { clearPetmitRoutes } = usePermissionStore();
        clearPetmitRoutes();

        ElMessage({
          type: 'success',
          message: '退出成功',
        });

        router.replace('/login');
      });
    }
  },
  persist: true
});
