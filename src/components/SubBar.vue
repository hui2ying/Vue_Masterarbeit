<template>
  <div id="subBar">
    <router-link to="/">
      <img src="../assets/images/logo2.png" class="logo" alt="" />
    </router-link>
    <div class="message">
      <p>Welcome：{{ username }}</p>
      <p>Free tables：{{ freeNum }}</p>
      <p>Ordering：{{ orderingNum }}</p>
      <p>Eating：{{ eatingNum }}</p>
      <p>{{ tableId ? `Table number：${tableId}` : `Not selected` }}</p>
    </div>

    <ul class="action">
      <router-link to="/order" tag="li">
        <i>{{ orderingNum }}</i
        ><span class="iconfont">&#xe73d;</span>Order
      </router-link>
      <router-link to="/table" tag="li">
        <span class="iconfont">&#xe621;</span>Table
      </router-link>
      <router-link to="/admin" tag="li">
        <span class="iconfont">&#xe61e;</span>Backstage
      </router-link>
      <li @click="logout"><span class="iconfont">&#xe892;</span>Quit</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: localStorage.getItem("order:isLogin"),
    };
  },
  mounted() {
    this.$getTables();
    this.$getOrdered();
    this.$getShopped();
  },
  computed: {
    orderingNum() {
      return this.$store.getters.getOrdered.length;
    },
    eatingNum() {
      return this.$store.getters.getShopped.length;
    },
    freeNum() {
      return (
        this.$store.getters.getTables.list.length -
        this.orderingNum -
        this.eatingNum
      );
    },
    tableId() {
      return this.$store.getters.getTables.cur_id;
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("order:isLogin");
      localStorage.removeItem("order:token");
      this.$router.replace("/login");
    },
  },
};
</script>

<style scoped>
#subBar {
  width: 300px;
  height: 100vh;
  position: fixed;
  /* border: 1px solid #fff; */
}
.logo {
  width: 80%;
  display: block;
  margin: 50px auto;
}
.message {
  width: 200px;
  box-sizing: border-box;
  padding: 30px 0;
  margin: 0 auto 30px;
  /* border: 1px solid #fff; */

  color: #fff;
  line-height: 40px;
  text-align: center;
  position: relative;
}
.message::before,
.message::after,
.action::before,
.action::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 1px;
  left: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.6),
    transparent
  );
}
.message::before {
  top: 0;
}
.message::after {
  bottom: 0;
}
.action {
  height: 300px;
  display: flex;
  flex-wrap: wrap;
  position: relative;
}
.action li {
  width: 50%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: #fff;
  font-size: 20px;
  cursor: pointer;
  position: relative;
}
.action span {
  font-size: 40px;
  margin-bottom: 10px;
}
.action li.ac,
.action li:hover {
  color: #f9d163;
}
.action i {
  width: 20px;
  height: 20px;
  background: #ff8400;
  border-radius: 50%;
  font-size: 14px;
  color: #fff;
  text-align: center;
  line-height: 20px;
  font-style: normal;

  position: absolute;
  left: 70px;
  top: 26px;
}
.action::before {
  top: 50%;
}
.action::after {
  top: 50%;
  transform: rotate(90deg);
}
</style>