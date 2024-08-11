import { defineStore, storeToRefs } from "pinia";
import { useUserStore } from './user';
import { constantRouterMap, wholeMenuRouterMap } from "@/router";
import { router } from '@/router';
import { type RouteRecordRaw } from 'vue-router';

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    routers: constantRouterMap,
    addRouters: constantRouterMap,
    isAddRouters: false
  }),
  getters: {
    getRouters: (state) => state.routers,
    getAsyncRouters: (state) => state.addRouters,
    getIsAddRouters: (state) => state.isAddRouters
  },
  actions: {
    generateRoutes(routeNames?: string[]) {
      const { userInfo } = storeToRefs(useUserStore());

      return new Promise((resolve) => {
        let newRouters: RouteRecordRaw[] = [];
        if (userInfo.value.role === 'admin') {
          newRouters = wholeMenuRouterMap;
        } else {
          // newRouters = routers;
        }
        this.addRouters = newRouters.concat([
          {
            path: '/:path(.*)*',
            redirect: '/404',
            name: '404Page',
            meta: {
              menuHidden: true
            }
          }
        ])
        this.addRouters.forEach((route: RouteRecordRaw) => router.addRoute(route));
        this.routers = constantRouterMap.concat(this.addRouters);
        resolve(this.routers);
      })
    },
    setIsAddRoutes(isAddRouters: boolean) {
      this.isAddRouters = isAddRouters;
    },
    clearPetmitRoutes() {
      this.addRouters = constantRouterMap;
      this.routers = constantRouterMap;
      this.isAddRouters = false;
    }
  },
  persist: {
    paths: ['routers', 'addRouters']
  }
})