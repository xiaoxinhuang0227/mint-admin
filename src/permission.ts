import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { router } from './router';
import { usePermissionStore } from './store/modules/permission';
import { useUserStore } from './store/modules/user';

// 配置 NProgress
NProgress.configure({ 
  showSpinner: false, // 是否显示加载微调器
  minimum: 0.2, // 最小百分比
  easing: 'ease',
  speed: 500
})

/**
 * 不重定向白名单
 */
const NO_REDIRECT_WHITE_LIST = ['/login', '/home']

router.beforeEach((to, from, next) => {
  // 开始加载进度条
  NProgress.start()
  
  const { getAsyncRouters, generateRoutes, getIsAddRouters, setIsAddRoutes } = usePermissionStore();
  const { tokenVal, userInfo } = useUserStore();
  // console.log(111, tokenVal, to)
  if (tokenVal) {
    if (to.path === '/login') {
      // console.log(2, getAsyncRouters[0].path)
      next(getAsyncRouters[0].path)
      NProgress.done()
    } else {
      if (getIsAddRouters) {
        next();
        NProgress.done()
        return;
      }
      generateRoutes(userInfo.permissions);
      const redirect = from.query.redirect || to.path;
      const nextPath = to.path === redirect ? { ...to, replace: true } : { path: redirect };
      // console.log('2getAsyncRouters', router.getRoutes());
      setIsAddRoutes(true);
      next(nextPath);
      NProgress.done()
    }
  } else {
    if (NO_REDIRECT_WHITE_LIST.indexOf(to.path) !== -1) {
      // console.log(3)
      next()
    } else {
      // console.log(4)
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
    }
    NProgress.done()
  }
});

// 路由后置守卫
router.afterEach(() => {
  // 完成进度条
  NProgress.done()
})