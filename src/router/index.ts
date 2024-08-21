import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

import Layout from '@/layout/index.vue';
import { App } from 'vue';

export const constantRouterMap: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Root',
    redirect: '/home',
    meta: {
      menuHidden: true
    }
  },
  {
    path: '/home',
    component: () => import('@/views/home/index.vue'),
    name: 'home',
    meta: {
      menuHidden: true
    }
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: {
      menuHidden: true
    }
  },
  {
    path: '/404',
    component: () => import('@/views/error/404.vue'),
    name: 'NoFind',
    meta: {
      menuHidden: true,
      title: '404',
    }
  }
]

export const wholeMenuRouterMap: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    component: Layout,
    name: 'dashboard',
    redirect: '/dashboard/analysis',
    children: [
      {
        path: 'analysis',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'dashboardAnalysis',
        meta: {
          title: '首页',
          icon: 'ant-design:dashboard-outlined'
        }
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    name: 'example',
    redirect: '/example/table/basic-table',
    meta: {
      title: '组件示例',
      icon: 'ant-design:table-outlined'
    },
    children: [
      {
        path: 'table',
        name: 'table',
        component: () => import('@/views/example/table/index.vue'),
        redirect: '/example/table/basic-table',
        meta: {
          title: '表格组件'
        },
        children: [
          {
            path: 'basic-table',
            component: () => import('@/views/example/table/basicTable/index.vue'),
            name: 'basicTableExample',
            meta: {
              title: '基础示例'
            }
          },
          {
            path: 'use-table',
            component: () => import('@/views/example/table/useTable/index.vue'),
            name: 'useTableExample',
            meta: {
              title: 'useTable'
            }
          },
          {
            path: 'merge-cell',
            component: () => import('@/views/example/table/mergeCell/index.vue'),
            name: 'mergeCellExample',
            meta: {
              title: '原生合并表格'
            }
          }
        ]
      },
      {
        path: 'form',
        name: 'form',
        component: () => import('@/views/example/form/index.vue'),
        redirect: '/example/form/basic-form',
        meta: {
          title: '表单组件'
        },
        children: [
          {
            path: 'basic-form',
            component: () => import('@/views/example/form/basicForm/index.vue'),
            name: 'basicFormExample',
            meta: {
              title: '基础示例'
            }
          },
          {
            path: 'use-form',
            component: () => import('@/views/example/form/useForm/index.vue'),
            name: 'useFormExample',
            meta: {
              title: 'useForm'
            }
          },
          {
            path: 'use-search',
            component: () => import('@/views/example/form/useSearch/index.vue'),
            name: 'useSearchExample',
            meta: {
              title: '搜索组件'
            }
          },
          {
            path: 'rich-text',
            component: () => import('@/views/example/form/richText/index.vue'),
            name: 'richTextExample',
            meta: {
              title: '富文本'
            }
          },
        ]
      },
      {
        path: 'descriptions',
        component: () => import('@/views/example/descriptions/index.vue'),
        name: 'descriptionsExample',
        meta: {
          title: 'detail 描述组件'
        }
      },
      {
        path: 'map',
        component: () => import('@/views/example/map/index.vue'),
        name: 'mapExample',
        meta: {
          title: '腾讯地图组件'
        }
      }
    ]
  },
  {
    path: '/page-demo',
    component: Layout,
    name: 'pageDemo',
    redirect: '/page-demo/dialog-action',
    meta: {
      title: '页面综合实例',
      icon: 'ant-design:dashboard-outlined'
    },
    children: [
      {
        path: 'dialog-action',
        component: () => import('@/views/page-demo/dialogAction/index.vue'),
        name: 'dialogPageDemo',
        meta: {
          title: '增删改查页面'
        }
      },
      {
        path: 'status-board',
        component: () => import('@/views/page-demo/statusBoard/index.vue'),
        name: 'statusBoardPageDemo',
        meta: {
          title: '状态看板'
        }
      }
    ]
  },
  {
    path: '/auth',
    component: Layout,
    name: 'auth',
    redirect: '/auth/role',
    meta: {
      title: '权限管理',
      icon: 'ant-design:dashboard-outlined'
    },
    children: [
      {
        path: 'role',
        component: () => import('@/views/auth/role/index.vue'),
        name: 'role',
        meta: {
          title: '角色管理',
          icon: 'ant-design:dashboard-outlined'
        }
      },
      {
        path: 'manager',
        component: () => import('@/views/auth/manager/index.vue'),
        name: 'manager',
        meta: {
          title: '用户管理',
          icon: 'ant-design:dashboard-outlined'
        }
      }
    ]
  },
]

export const router = createRouter({
  history: createWebHistory('/mint-admin'),
  routes: constantRouterMap,
  scrollBehavior: () => { top: 0 }
})

export const setupRouter = (app: App<Element>) => {
  app.use(router)
}