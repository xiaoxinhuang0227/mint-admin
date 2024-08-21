<script lang="tsx">
import { defineComponent, ref, unref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { useAppStore } from '@/store/modules/app.ts';
import { usePermissionStore } from '@/store/modules/permission.ts';
import variables from "@/styles/variables.module.scss";
import { useRenderMenuItem } from './useRenderMenuItem';
import { ElScrollbar, ElMenu } from 'element-plus';

export default defineComponent({
  name: 'Sidebar',
  setup() {
    const { push } = useRouter();
    const route = useRoute();

    const { getRouters } = usePermissionStore();
    const { changeCurrentMenu } = useAppStore();
    const { isMenuCollapse } = storeToRefs(useAppStore());

    const { renderMenuItem } = useRenderMenuItem();

    const sidebarMenu = getRouters.filter(item => !item?.meta?.menuHidden);

    const resolvePath = (route) => {
      return `${route?.name}/${route?.meta?.title}`;
    }

    const defaultActive = ref();

    const init = () => {
      let path = [];
      route.matched.forEach(item => {
        const routeChildren = item?.children;
        if (!routeChildren || routeChildren?.length !== 1) {
          path.push(resolvePath(item));
        }
      })
      defaultActive.value = path[path.length - 1];
      changeCurrentMenu(path);
    }
    init();

    const changeActiveMenu = (v, path) => {
      // console.log(v, path);
      changeCurrentMenu(path);
      push({ name: v.split('/')[0] })
    }

    const goToHome = () => {
      push({ name: "home" });
    };
    
    watch(
      () => route.name,
      () => {
        defaultActive.value = resolvePath(route);
      }
    )

    return () => (
      <div class="component-sidebar">
        <div class="framework-name" onClick={ goToHome }>
          Mint { !unref(isMenuCollapse) && 'Admin' }
        </div>
        <ElScrollbar class="menu-content">
          <ElMenu
            collapse={unref(isMenuCollapse)}
            onSelect={changeActiveMenu}
            default-active={unref(defaultActive)}
            background-color={variables.sidebarBgColor}
            text-color={variables.sidebarTextColor}
          >

            {{ default: () => renderMenuItem(sidebarMenu) }}
          </ElMenu>
        </ElScrollbar>
      </div>
    )
  } 
})


</script>

<style scoped lang="scss">
.component-sidebar {
  display: flex;
  flex-direction: column;
  .framework-name  {
    height: $header-height;
    padding: 0 15px;
    font-size: 20px;
    line-height: $header-height;
    text-align: center;
    font-weight: bold;
  }
  .menu-content {
    flex: 1;
  }
}

</style>