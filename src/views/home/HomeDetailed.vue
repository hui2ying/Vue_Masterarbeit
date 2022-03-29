<template>
  <div id="detailed">
    <div class="con">
      <img :src="'http://order-api.chenxuehui.com/' + food.image" alt="" />
      <div class="text">
        <h2>{{ food.name }}</h2>
        <p class="intro">
          {{ food.desc }}
        </p>
        <p class="recommend">
          <strong>Recommended：</strong>
          <el-rate v-model="food.stars" disabled text-color="#ff9900">
          </el-rate>
        </p>
        <p class="price">
          <span>Price：</span>
          <span>{{ food.price }}</span>
          <span>€</span>
        </p>
      </div>
      <div class="close" @click="$emit('closeDetailed')">
        <span class="iconfont">&#xe609;</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    food: Object,
  },
};
</script>

<style scoped>
#detailed {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1024;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.con {
  display: flex;
  position: relative;
}

.con img {
  width: 500px;
  height: 500px;
  margin-right: 30px;
  border-radius: 10px;
}

.con .text {
  width: 400px;
  color: #fff;
}

.con h2 {
  font-size: 40px;
  color: #ccc;
  line-height: 30px;
  margin-bottom: 100px;
}

.recommend {
  display: flex;
  margin-top: 50px;
}

.recommend strong {
  font-weight: normal;
  font-size: 18px;
}

/* .el-rate {
  line-height: 1px;
} */

.price {
  margin-top: 20px;
  font-size: 16px;
}

.price span:nth-child(3) {
  color: #e4c45d;
}
.price span:nth-child(2) {
  color: #e4c45d;
  font-size: 40px;
}

.close {
  position: absolute;
  right: -30px;
  top: -70px;
  color: #fff;
  cursor: pointer;
}

.close span {
  font-size: 40px;
}
</style>