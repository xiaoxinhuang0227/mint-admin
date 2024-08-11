<template>
  <div class="com-link-btn">
    <i class="el-icon-right left"></i>
    <i class="el-icon-right right"></i>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.com-link-btn {
  position: relative;
  width: 88px;
  height: 88px;
  overflow: hidden;
  border-radius: 50%;
  cursor: pointer;
  background-color: #fff;
  &:hover {
    .left {
      animation: left2Center 0.5s ease-in-out;
    }
    .right {
      animation: center2Right 0.5s ease-in-out;
    }
  }
  .el-icon-right {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 38px;
    font-weight: bold;
    color: #000;
    &.left {
      left: -20%;
    }
  }
}
@keyframes left2Center {
  0% {
    left: -20%;
  }
  100% {
    left: 50%;
  }
}
@keyframes center2Right {
  0% {
    left: 50%;
  }
  100% {
    left: 120%;
  }
}
</style>
