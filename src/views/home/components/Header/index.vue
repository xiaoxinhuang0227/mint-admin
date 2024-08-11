<script setup>
import { propTypes } from '@/utils/propTypes';
import { onMounted, onUnmounted, ref, unref } from 'vue';
import { useUserStore } from '@/store/modules/user';

const { tokenVal } = useUserStore();

const props = defineProps({
  bgColor: propTypes.string.def('black'),
  bgTransparent: propTypes.bool.def(false),
  offset: propTypes.number.def(58),
});

const transparent = ref(props.bgTransparent);
const backgroundColor = ref(props.bgColor);

const handleWindowScroll = () => {
  if (props.bgTransparent) {
    let offsetTop = document.body.scrollTop || document.documentElement.scrollTop;
    if (offsetTop > props.offset) {
      transparent.value = false;
      backgroundColor.value = 'black';
    } else {
      transparent.value = true;
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleWindowScroll);
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleWindowScroll);
})
</script>

<template>
  <div
    class="com-brand-header"
    :class="{
      transparent: transparent,
      bgWhite: backgroundColor === 'white',
      bgBlack: backgroundColor === 'black'
    }"
  >
    <div class="header-wrapper">
      <!-- <div class="logo-wrapper">
        <router-link :to="{ name: 'home' }" class="logo">
          <img src="" alt="logo" />
        </router-link>
      </div> -->
      <div class="nav">
        <router-link :to="{ name: 'login' }" class="nav-item">
          {{ tokenVal ? '进入后台' : '登录' }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.com-brand-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 58px;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  z-index: 2000;
  padding: 0 60px 0 50px;
  background-color: rgba(255, 255, 255, 0.9);
  transition: background-color 0.5s cubic-bezier(0.28, 0.11, 0.32, 1);
  &.transparent {
    background-color: transparent !important;
    backdrop-filter: blur(0) !important;
    -webkit-backdrop-filter: blur(0) !important;
  }
  &.bgWhite {
    .header-wrapper {
      .nav {
        .nav-item {
          color: #fff;
          font-weight: bold;
          &:hover {
            color: #000;
          }
          &.router-link-exact-active {
            color: #000;
          }
        }
      }
    }
  }
  &.bgBlack {
    .header-wrapper {
      .nav {
        .nav-item {
          color: #fff;
          &:hover {
            color: #fff;
          }
          &.router-link-exact-active {
            color: #fff;
          }
        }
      }
    }
    background-color: rgba(0, 0, 0, 0.5);
  }
  .header-wrapper {
    display: flex;
    height: 100%;
    align-items: center;
    .logo-wrapper {
      display: flex;
      align-items: center;
      .logo {
        display: flex;
        align-items: center;
        width: 139px;
        height: 46px;
        margin-right: 14px;
        img {
          width: 100%;
        }
      }
      .icon-panel {
        width: 24px;
        height: 24px;
      }
    }
    .nav {
      display: flex;
      align-items: center;
      margin-left: auto;
      .nav-item {
        margin-left: 57px;
        color: #000;
        &:hover {
          cursor: pointer;
          font-weight: bold;
        }
        &.router-link-exact-active {
          font-weight: bold;
        }
      }
    }
  }
}
</style>