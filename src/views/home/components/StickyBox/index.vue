<template>
  <div class="com-cqq-box">
    <div class="cqq-fix" :style="{ top: `${stickyBoxTop}px` }">
      <div class="content site-width">
        <p class="title">
          title
        </p>
        <div class="desc">
          <p></p>
        </div>

        <!-- <img
          :style="{ top: `${chanTop}px` }"
          class="chan"
          src="../../img/chan.png"
          alt=""
        /> -->
        <Icon
          :style="{
            transform: `rotate(${rotateRate}deg)`,
            color: `${pentagonColor}`
          }"
          :size="608"
          class="icon-pentagon"
          icon="pepicons-print:planet-ring-circle-filled"
        ></Icon>
      </div>
      <div class="carousel-images">
        <div class="locate site-width">
          <div class="img-wrap">
            <div
              class="img-row"
              :style="{ transform: `translateX(-${imgTranslate}px)` }"
            >
              <div
                class="col"
                v-for="(item, idx) in contentConfig"
                :key="idx"
              >
                <p>{{ item.title }}</p>
                <p>{{ item.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AreaConfig } from "../../config";
import { Icon } from "@/components/Icon";
export default {
  data() {
    return {
      pentagonColor: "#FD815E",
      contentConfig: [
        {
          title: 'title1',
          content: 'content1'
        },
        {
          title: 'title2',
          content: 'content2'
        },
        {
          title: 'title3',
          content: 'content3'
        },
        {
          title: 'title4',
          content: 'content4'
        },
        {
          title: 'title5',
          content: 'content5'
        },
        {
          title: 'title6',
          content: 'content6'
        }
      ]
    };
  },
  components: {
    Icon
  },
  props: {
    currentArea: {
      type: Object,
      required: true
    },
    clientHeight: {
      type: Number,
      required: true
    }
  },
  computed: {
    stickyBoxTop() {
      // console.log("height", this.clientHeight);

      return this.clientHeight > 780 ? 78 : -20;
    },
    chanTop() {
      const { index, areaPercent } = this.currentArea;
      return index === AreaConfig["stickyBox"].index - 1 && areaPercent > 0.5
        ? -350 + 400 * areaPercent
        : 50;
    },
    rotateRate() {
      const { areaPercent, index } = this.currentArea;
      return index === AreaConfig["stickyBox"].index ? 180 * areaPercent : 0;
    },
    imgTranslate() {
      const { areaPercent, index } = this.currentArea;
      if (index < AreaConfig["stickyBox"].index) {
        return 0;
      } else if (index === AreaConfig["stickyBox"].index && areaPercent < 0.5) {
        return 750 * areaPercent;
      } else {
        return 750 * 0.5;
      }
    }
  },
  watch: {
    "currentArea.areaPercent": function() {
      const { areaPercent, index } = this.currentArea;
      if (index === AreaConfig["stickyBox"].index) {
        const rate = areaPercent.toFixed(1);
        if (rate < 0.4) {
          this.pentagonColor = "#FD815E";
        } else {
          this.pentagonColor = "#5E64FD";
        }
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.com-cqq-box {
  color: #000;
  position: relative;
  background-color: #F8F8F8;
  .cqq-fix {
    position: sticky;
    overflow: hidden;
    width: 100%;
    height: 800px;
    top: 0;
    left: 0;
  }
  .content {
    position: relative;
    margin-top: 98px;
    text-align: center;
    .marker {
      width: 125px;
    }
    .title {
      position: relative;
      font-weight: bold;
      font-size: 60px;
      z-index: 2;
    }
     .desc {
      margin-top: 10px;
      color: #959495;
      font-size: 20px;
      font-weight: bold;
    }
  }
  .carousel-images {
    position: relative;
    .bg-wrap {
      margin-top: 47px;
    }
    .locate {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 309px;
      .fix-talent {
        position: absolute;
        top: 26px;
        left: 417px;
        width: 169px;
        height: 286px;
      }
    }
    .img-wrap {
      position: absolute;
      top: 0;
      left: 500px;
      overflow: hidden;
      // border: 1px solid #000;
      .img-row {
        display: flex;
        flex-wrap: nowrap;
        .col {
          width: 400px;
          height: 500px;
          border-radius: 10px;
          padding: 20px;
          margin-right: 40px;
          background-color: #fff;
        }
      }
      img {
        width: 885px;
        height: 330px;
      }
    }
  }
  .chan {
    position: absolute;
    top: -40px;
    left: -200px;
    width: 597px;
    z-index: 2;
  }
  .icon-pentagon {
    position: absolute;
    top: -50px;
    left: -210px;
    z-index: 1;
    color: #FD815E;
    transition: color 1s ease-in-out;
  }
}
</style>
