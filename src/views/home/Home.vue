<template>
  <div>
    <SubBar />
    <router-view></router-view>
  </div>
</template>

<script>
import SubBar from "../../components/SubBar";
export default {
  components: {
    SubBar,
  },
};
</script>

<style>
body {
  background: url(../../assets/images/productor_bg.jpg) no-repeat top;
  background-size: cover;
  background-attachment: fixed; /* 图片固定不会跟着滚动条走动 */
}

#content {
  position: fixed;
  top: 80px;
  right: 20px;
  bottom: 20px;
  left: 300px;
  background: rgba(255, 255, 255, 0.2);

  box-sizing: border-box;
  padding: 10px;

  overflow: hidden;
}

#navBar {
  position: fixed;
  left: 300px;
  right: 0;

  height: 80px;
  padding: 0 20px;
  box-sizing: border-box;

  display: flex;
  justify-content: space-between; /* 两端对齐 */
  align-items: center;

  color: #fff;
}

/* 滚动条样式 */
.scrollWrap {
  padding: 10px;
  width: 102%;
  height: 101%;
}

.el-scrollbar__bar.is-vertical {
  right: 5px;
}

.el-scrollbar__thumb {
  background-color: rgba(255, 255, 255, 0.5);
}

.el-scrollbar__thumb:hover {
  background-color: rgba(255, 255, 255, 0.5);
}
</style>