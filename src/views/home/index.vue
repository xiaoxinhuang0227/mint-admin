<script setup>
import { ref, unref, computed, onMounted, onUnmounted } from 'vue';
import { cloneDeep } from 'lodash-es';

import { Icon } from '@/components/Icon';
import Header from "./components/Header/index.vue";
import ScrollBox from "./components/ScrollBox";
// import StickyBox from "./components/StickyBox/index.vue";
// import ParallaxBox from "./components/ParallaxBox/index.vue";
import { AreaConfig } from "./config";

const videoPercent = ref(0);
const areaScrolled = ref(0);
const currentArea = ref({
  offsetTop: 0, // 当前区域距离document顶端的距离
  height: "100vh", // 当前区域的高度
  index: 0, // 第几块区域
  areaPercent: 0 // 当前区域滚动比率
})
const headerBgColor = ref('white');
const clientHeight = ref(0);

const titleTranslate = computed(() => {
  const { index, areaPercent } = currentArea.value;
  return index === AreaConfig["banner"].index
    ? 200 - 150 * areaPercent
    : 100;
})

onMounted(() => {
  saveAreaInfo();
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", reset);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", reset);
});

const handleScroll = () => {
  computeAreaPercent(document.documentElement);
  computedVideoPercent(document.documentElement);
}

// 计算当前区域滚动百分比
const computeAreaPercent = ({ scrollTop, clientHeight }) => {
  judgeArea(scrollTop, clientHeight);
  
  if (currentArea.value.height === "100vh") {
    currentArea.value.height = clientHeight;
  }
  const { offsetTop, height } = currentArea.value;
  areaScrolled.value = scrollTop - offsetTop;
  // 当前区域已滚动的百分比
  currentArea.value.areaPercent = unref(areaScrolled) / height;
  // console.log('areaPercent', currentArea.value.areaPercent)
}

// scroll-box相关的计算
const computedVideoPercent = ({ scrollTop }) => {
  videoPercent.value = 0;
  const { offsetTop, height } = currentArea.value;
  const oFixedEl = document.querySelector(".fix-box-container");
  const offsetHeight = oFixedEl && oFixedEl.offsetHeight;
  const fixElemTop = oFixedEl ? oFixedEl.getBoundingClientRect().top : 0;

  const offsetBottom = height - fixElemTop - offsetHeight;
  const min = offsetBottom + offsetTop;
  const max = min + offsetHeight;

  if (scrollTop >= min && scrollTop <= max) {
    const scrolled = areaScrolled.value - offsetBottom;
    videoPercent.value = scrolled / offsetHeight;
  } else if (scrollTop < min) {
    videoPercent.value = 0;
  } else if (scrollTop > max) {
    videoPercent.value = 1;
  }
  // console.log('videoPercent', videoPercent.value)
}

// 记录区域信息
const saveAreaInfo = () => {
  clientHeight.value = document.documentElement.clientHeight;

  for (let key in AreaConfig) {
    const val = AreaConfig[key];
    val.offsetTop = document.querySelector(`.${key}`).offsetTop;
    if (key === "white" || key === "red" || key === "blue" || key === "app") {
      val.offsetTop += document.documentElement.clientHeight;
    }
  }
}

const judgeArea = (scrollTop) => {
  let name = "banner";
  for (let key in AreaConfig) {
    let item = AreaConfig[key];
    if (scrollTop > item.offsetTop) {
      name = key;
      headerBgColor.value = item.bg;
    }
  }
  currentArea.value = cloneDeep(AreaConfig[name]);
}

const reset = () => {
  saveAreaInfo();
  handleScroll();
}
</script>

<template>
  <div
    class="page-brand-home"
  >
    <Header :bgColor="headerBgColor" :bgTransparent="true"></Header>
    <!-- banner -->
    <div class="banner">
      <div class="content">
        <div
          class="text"
          :style="{ transform: `translateY(-${titleTranslate}px)` }"
        >
          <p class="sub">
            Mint Admin
          </p>
          <p class="slogan">
            Vue3 + Vite + Element Plus + TS + Pinia 中后台集成方案
          </p>
        </div>
      </div>
      <Icon class="arrow-up" :size="40" color="#fff" icon="oui:arrow-up" />
      <!-- <video
        id="video-bg"
        class="video-bg"
        src=""
        muted
        autoplay
      /> -->
      <img id="video-bg" class="video-bg" src="@/assets/login-bg.jpg" alt="">
    </div>
    
    <ScrollBox
      class="scroll-box"
      :videoPercent="videoPercent"
      :currentArea="currentArea"
    ></ScrollBox>
   
    <!-- <StickyBox
      class="stickyBox"
      :clientHeight="clientHeight"
      :currentArea="currentArea"
      :style="{ height: `${AreaConfig.stickyBox.height}px` }"
    ></StickyBox> -->
   
    <!-- <ParallaxBox
      class="ParallaxBox"
      :currentArea="currentArea"
      :style="{ height: `${AreaConfig.ParallaxBox.height}px` }"
    ></ParallaxBox> -->
    
  </div>
</template>

<style lang="scss" scoped>
.page-brand-home {
  position: relative;
  min-width: 1300px;
  background-color: #fff;
  color: #fff;
  &.mobile{
    padding-bottom: 100px;
  }
  .banner {
    position: relative;
    height: 100vh;
    display: flex;
    overflow: hidden;
    justify-content: center;
    text-align: center;
    background-color: #eee;
    #video-bg {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      object-fit: cover;
      min-height: 800px;
    }
    .content {
      transform: translateY(40%);
      z-index: 2;
      .text {
        padding-top: 200px;

      }
      .slogan {
        font-size: 40px;
        font-weight: bold;
        animation: fadeIn 1s ease-in-out;
      }
      .sub {
        font-size: 60px;
        color: #fff;
        font-weight: bold;
      }
    }
    .arrow-up {
      position: absolute;
      left: 50%;
      bottom: 5%;
      opacity: 0.1;
      width: 20px;
      height: 20px;
      color: #000;
      z-index: 3;
      font-weight: bold;
      animation: arrow 2s linear infinite;
    }
  }
  .mobile-tip{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 100px 0;
    background: #fff;
    border-radius: 8px;
    z-index: 999;
   
    .inner{
      display: flex;
      align-items: center;
      justify-content: center;
      transform: scale(3);
    }
    img{
      width: 17px;
      height: 17px;
      margin: 0 5px;
    }
    span{
      font-weight: bold;
    }
    a{
      margin-left: 10px;
      color: #2878F0;
      font-weight: bold;
    }
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0
  }
  100% {
    opacity: 1;
  }
}

@keyframes arrow {
  0% {
    opacity: 0;
    bottom: 3%;
  }
  50% {
    opacity: 1;
    bottom: 6%;
  }
  100% {
    opacity: 0;
    bottom: 9%;
  }
}
</style>