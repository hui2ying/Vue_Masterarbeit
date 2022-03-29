<template>
  <ul class="navWrap">
    <li :class="{ active: 0 == cur }" @click="showFood()">
      <span class="iconfont">&#xe606;</span>
      <span class="text">Recommend</span>
    </li>
    <li
      v-for="(nav, index) in navs"
      :key="nav.id"
      :class="{ active: index + 1 == cur }"
      @click="showFood(index + 1, nav.id)"
    >
      <span class="iconfont" v-html="nav.icon"></span>
      <span class="text">{{ nav.name }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      cur: 0, //当前点的导航的索引值
    };
  },
  mounted() {
    this.$getCategory(); //获取分类数据
    this.showFood();
  },
  computed: {
    navs() {
      return this.$store.getters.getCategory;
    },
  },
  methods: {
    showFood(index = 0, id = 0) {
      this.cur = index;

      this.getFood({ category_id: id });
    },
    getFood(data) {
      this.$fetch({
        url: "/api/dish_lists",
        data,
      }).then((res) => {
        this.$set(res, "curCategoryId", data ? data.category_id : 0);
        this.$store.commit("updateFoodList", res);
      });
    },
  },
};
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