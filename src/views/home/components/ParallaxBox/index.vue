<template>
  <div class="com-jx-box">
    <div
      class="content"
      :style="{ transform: `translateY(-${titleTranslate}px)` }"
    >
      <div class="title" :style="{ opacity: `${titleOpacity}` }">
        title
      </div>
      <div class="desc">
        <p>
          desc
        </p>
      </div>
      <div class="img-wrap">
        <div
          class="web-img"
          :style="{ transform: `translateX(-${translateDistance}px)` }"
        >
          <div class="scroll-wrap">
            <div
              :style="{ transform: `translateY(-${webTranslateDistance}px)` }"
              class="scroll-col"
            >
              <img src="../../img/web-inner.png" alt="" />
            </div>
          </div>
        </div>
        <div
          class="wx-img"
          :style="{ transform: `translateX(${translateDistance}px)` }"
        >
          <div class="scroll-wrap">
            <div
              :style="{ transform: `translateY(-${wxTranslateDistance}px)` }"
              class="scroll-col"
            >
              <img src="../../img/wx-inner.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AreaConfig } from "../../config";
export default {
  props: {
    currentArea: {
      type: Object,
      required: true
    }
  },
  computed: {
    titleOpacity() {
      const { areaPercent, index } = this.currentArea;
      return index === AreaConfig["ParallaxBox"].index - 1 ? areaPercent + 0.1 : 1;
    },
    titleTranslate() {
      const { index, areaPercent } = this.currentArea;
      return index === AreaConfig["ParallaxBox"].index - 1
        ? 200 - 200 * areaPercent
        : 0;
    },
    webTranslateDistance() {
      const { areaPercent, height, index } = this.currentArea;
      return index === AreaConfig["ParallaxBox"].index
        ? areaPercent * height * 0.3
        : 0;
    },
    wxTranslateDistance() {
      const { areaPercent, height, index } = this.currentArea;
      return index === AreaConfig["ParallaxBox"].index
        ? areaPercent * height * 0.1
        : 0;
    },
    translateDistance() {
      const { areaPercent, index } = this.currentArea;
      return index === AreaConfig["ParallaxBox"].index - 1
        ? 200 - areaPercent * 200
        : 0;
    }
  },
};
</script>

<style lang="scss" scoped>
.com-jx-box {
  position: relative;
  // height: 900px;
  background-color: #F5F5F7;
  .content {
    padding-top: 150px;
    text-align: center;
    .title {
      font-size: 70px;
      font-weight: bold;
    }
    .desc {
      margin-top: 17px;
      margin-bottom: 24px;
      color: #86868B;
      font-size: 20px;
      font-weight: bold;
      line-height: 30px;
    }
    .img-wrap {
      position: relative;
      width: 1257px;
      height: 576px;
      margin: 83px auto 0;
      .web-img {
        width: 1031px;
        height: 100%;
        transform: translateX(-200px);
        background-image: url("../../img/web-outer.png");
        background-size: cover;
        background-position: center;
        .scroll-wrap {
          overflow: hidden;
          position: absolute;
          width: 979px;
          height: 509px;
          bottom: 0;
          left: 33px;
          .scroll-col {
            position: absolute;
            top: 0;
            left: 0;
            width: 946px;
            height: 509px;
            transform-origin: top;
            img {
              width: 100%;
            }
          }
        }
      }
      .wx-img {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 249px;
        height: 457px;
        border-radius: 20px;
        transform: translateX(200px);
        background-image: url("../../img/wx-outer.png");
        background-size: cover;
        background-position: center;
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.12);
        .scroll-wrap {
          overflow: hidden;
          position: absolute;
          width: 211px;
          height: 290px;
          top: 152px;
          right: 18px;
          .scroll-col {
            position: absolute;
            top: 0;
            left: 0;
            width: 211px;
            height: 490px;
            transform-origin: top;
            img {
              width: 100%;
            }
          }
        }
      }
      .scroll-col {
        line-height: 100px;
      }
    }
  }
}
</style>
<style lang="scss">
.chat-qrcode-popover {
  min-width: 123px !important;
  padding: 10px;
  width: 123px;
  height: 123px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
