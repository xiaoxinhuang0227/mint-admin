<template>
  <div class="com-scroll-box">
    <div class="fix-box">
      <div class="fix-box-container">
        <div class="content-wrap">
          <img class="bg" src="https://www.apple.com.cn/v/mac/home/bz/images/overview/consider/mac_ease__bvgkz2zdltxy_xlarge_2x.jpg" alt="">
        </div>
        <div
          v-for="(item, idx) in config"
          :key="idx"
          class="content-wrap"
          :style="{
            transform: `scaleY(${
              currentArea.index === idx + 1
                ? videoPercent
                : currentArea.index > idx + 1
                ? 1
                : 0
            })`
          }"
        >
          <video
            v-if="item.type === 'video'"
            class="bg"
            :style="{
              transform: `scaleY(${
                currentArea.index === idx + 1 ? videoScaleY : 1
              })`
            }"
            :src="item.src"
            muted
            autoplay
            :loop="item.loop"
          />
          <img
            v-else
            :src="item.src"
            :style="{
              transform: `scaleY(${
                currentArea.index === idx + 1 ? videoScaleY : 1
              })`
            }"
            class="bg"
            alt=""
          />
        </div>
      </div>
    </div>
    <div
      :style="{ marginTop: isMobile ? 0 : '-100vh' }"
      class="scroll-section-wrap"
    >
      <div class="section white">
        <div class="content site-width">
          <div class="brand-wrap">
            <!-- <div class="logo-box">
              
            </div> -->
            <div>
              <p class="name" style="color: #000;">Mint Admin</p>
              <!-- <p class="url">后台集成方案</p> -->
            </div>
          </div>

          <div class="desc">
            <!-- <p class="title">知识沉淀累积，集合多种业务场景</p> -->
            <p class="text">
              本项目是Web端中后台管理系统，使用较新的技术栈，集合了多种功能，包含二次封装组件，动态菜单，hooks，utils等功能，不适合二次开发，代码冗余较多，学习实验为主。
            </p>
            <p class="text">功能正在逐步更新中...</p>
          </div>

          <!-- <a target="_blank">
            <LinkBtn />
          </a> -->
        </div>
      </div>

      <div class="section blue">
        <div class="content site-width">
          <div class="brand-wrap">
            <!-- <div class="logo-box">
             
            </div> -->
            <div>
              <p class="name">需要掌握的知识</p>
              <!-- <p class="url">technology stack</p> -->
            </div>
          </div>

          <div class="desc">
            <!-- <p class="title">需要掌握的知识</p> -->
            <p class="text">
              Vue3 / Vite / TypeScript / ES6
            </p>
            <p class="text">Pinia / Vue Router</p>
            <p class="text">Element Plus / Scss / UnoCss</p>
            <p class="text">Axios / Mockjs</p>
          </div>

          <!-- <a target="_blank">
            <LinkBtn />
          </a> -->
        </div>
      </div>

      <div class="section red">
        <div class="content site-width">
          <div class="brand-wrap">
            <!-- <div class="logo-box">
              
            </div> -->
            <div>
              <p class="name">功能组件</p>
              <!-- <p class="url">components</p> -->
            </div>
          </div>

          <div class="desc">
            <!-- <p class="title">逐步更新中</p> -->
            <div class="text">
              <p>Form表单组件，高度封装，搭配 useForm Hook，传入配置构建视图</p>
              <p>Table表格组件，搭配useTable Hook</p>
            </div>
          </div>

          <!-- <a target="_blank">
            <LinkBtn />
          </a> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LinkBtn from "../LinkBtn";
import { Icon } from '@/components/Icon';
export default {
  data() {
    return {
      config: [
        {
          type: "img",
          src: 'https://www.apple.com.cn/iphone/home/images/overview/consider/safety__d9zsvrorjfcm_xlarge_2x.jpg'
        },
        {
          type: "img",
          src:
            "https://www.apple.com.cn/ipad/home/images/overview/essentials/bc_keyboard__b2j4vh67cw76_xlarge_2x.png",
        },
        {
          type: "img",
          src:
            "https://www.apple.com.cn/v/iphone/home/bv/images/overview/consider/battery__f9km4l6jlv6u_xlarge_2x.jpg",
        }
      ]
    };
  },
  components: {
    LinkBtn,
    Icon
  },
  props: {
    videoPercent: {
      type: Number,
      required: true
    },
    currentArea: {
      type: Object,
      required: true
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 视频因矫正需要放大的大小
    videoScaleY() {
      return 1 / this.videoPercent;
    }
  },
};
</script>

<style lang="scss" scoped>
.com-scroll-box {
  position: relative;
  overflow: initial;
  z-index: 2;
  .scroll-section-wrap {
    margin-top: -100vh;
  }
  a {
    display: block;
    width: 88px;
  }
  .section {
    height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    &.white {
      // /deep/.com-link-btn {
      //   background-color: #FE7D34;
      //   .el-icon-right {
      //     color: #fff;
      //   }
      // }
    }
    &.red {
      background-color: #E46A6A;
      // /deep/.el-icon-right {
      //   color: #E46A6A;
      // }
      .text {
        color: rgba(255,255,255,.7) !important;
      }
    }
    &.blue {
      background-color: #3EA2EB;
      // /deep/.el-icon-right {
      //   color: #3EA2EB;
      // }
      .text {
        color: rgba(255,255,255,.7) !important;
      }
    }
    &.app {
      background-color: #FFDC00;
      // /deep/.com-link-btn {
      //   background-color: #000;
      //   .el-icon-right {
      //     color: #fff;
      //   }
      // }
      
      .desc {
        color: #000 !important;
      }
      .text {
        color: #000 !important;
      }
    }
    &.red, &.blue {
      color: #fff;
      .content {
        .brand-wrap {
          .logo-wrap {
            width: 104px;
            height: 104px;
            background-color: #fff;
            img {
              width: 72px;
            }
          }
        }
        .url {
          color: #fff !important;
        }
        .desc {
          color: #fff !important;
          .title {
            color: #fff !important;
          }
        }
      }
    }
    .content {
      position: relative;
      padding-left: 100px;
      .brand-wrap {
        display: flex;
        align-items: center;
        .logo-box {
          width: 104px;
          height: 104px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 30px;
          background-color: #fff;
          margin-right: 31px;
          .logo {
            width: 83px;
            height: 83px;
          }
        }
      }
      .name {
        font-size: 42px;
        font-weight: bold;
      }
      .url {
        font-size: 24px;
        font-weight: lighter;
        color: #333;
      }
      .desc {
        margin-top: 68px;
        width: 364px;
        font-weight: bold;
        .title {
          margin-bottom: 17px;
          font-size: 28px;
          color: #000;
        }
        .text {
          line-height: 40px;
          color: #959495;
          font-size: 20px;
        }
      }

      // .com-link-btn {
      //   width: 88px;
      //   margin-top: 40px;
      // }
    }
  }
  .fix-box {
    position: sticky;
    width: 500px;
    height: 100vh;
    top: 0;
    left: 50%;
    z-index: 2;
    display: flex;
    align-content: center;
    justify-content: center;
    .fix-box-container {
      position: absolute;
      overflow: hidden;
      top: 50%;
      left: 0;
      width: 960px;
      height: 560px;
      transform: translateY(-50%);
      box-shadow: 15px 20px 30px rgba(0, 0, 0, 0.15);
    }
    .content-wrap {
      position: absolute;
      top: 0;
      left: 0;
      width: 960px;
      height: 560px;
      overflow: hidden;
      transform-origin: bottom;
      background-color: #fff;
      .bg {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transform-origin: bottom;
      }
    }
  }
}
</style>
