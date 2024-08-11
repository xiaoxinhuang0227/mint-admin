import { router } from './router';
import { usePermissionStore } from './store/modules/permission';
import { useUserStore } from './store/modules/user';

/**
 * 不重定向白名单
 */
const NO_REDIRECT_WHITE_LIST = ['/login', '/home']

router.beforeEach((to, from, next) => {
  const { getAsyncRouters, generateRoutes, getIsAddRouters, setIsAddRoutes } = usePermissionStore();
  const { tokenVal, userInfo } = useUserStore();
  // console.log(111, tokenVal, to)
  if (tokenVal) {
    if (to.path === '/login') {
      // console.log(2, getAsyncRouters[0].path)
      next(getAsyncRouters[0].path)
    } else {
      if (getIsAddRouters) {
        next();
        return;
      }
      generateRoutes(userInfo.permissions);
      const redirect = from.query.redirect || to.path;
      const nextPath = to.path === redirect ? { ...to, replace: true } : { path: redirect };
      // console.log('2getAsyncRouters', router.getRoutes());
      setIsAddRoutes(true);
      next(nextPath);
    }
  } else {
    if (NO_REDIRECT_WHITE_LIST.indexOf(to.path) !== -1) {
      // console.log(3)
      next()
    } else {
      // console.log(4)
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
    }
  }
});