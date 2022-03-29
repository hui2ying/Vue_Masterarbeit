<template>
  <ul class="navWrap">
    <router-link to="/order/ordered" tag="li">
      <span class="iconfont">&#xe737;</span>
      <span class="text">Ordering</span>
    </router-link>
    <router-link to="/order/shopped" tag="li">
      <li>
        <span class="iconfont">&#xe737;</span>
        <span class="text">Ordered</span>
      </li>
    </router-link>
  </ul>
</template>

<script>
export default {};
</script>

<style scoped>
.navWrap {
  display: flex;
}
.navWrap li {
  font-size: 24px;
  margin-right: 40px;
  cursor: pointer;
}
.navWrap li:hover,
.navWrap li.active {
  color: #f9d163;
}
.navWrap li span.iconfont {
  font-size: 26px;
  margin-right: 5px;
}
</style>