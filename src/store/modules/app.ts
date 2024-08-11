import { defineStore } from "pinia";

export const useAppStore = defineStore('xx_app', {
  state: () => {
    return {
      isCollapse: false,
      activeMenu: ''
    }
  },
  getters: {
    isMenuCollapse() {
      return this.isCollapse;
    },
    currentMenu() {
      return this.activeMenu;
    }
  },
  actions: {
    toggleMenuCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    changeCurrentMenu(routes: string[]) {
      this.activeMenu = routes;
    }
  },
  persist: true
});
