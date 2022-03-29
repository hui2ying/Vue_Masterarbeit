<template>
  <el-scrollbar wrap-class="scrollWrap" :native="false" id="content">
    <Nodata v-if="!shopped.length" />
    <ul class="orderBox shopped" v-if="shopped.length">
      <li v-for="table in shopped" :key="table.table_id">
        <table>
          <thead>
            <tr>
              <th>Serial number</th>
              <th>Name</th>
              <th>Price/Number</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(dish, dishIndex) in table.order_items"
              :key="dish.dish_id"
            >
              <td>{{ dishIndex + 1 }}</td>
              <td>
                <img
                  :src="'http://order-api.chenxuehui.com/' + dish.image"
                  alt=""
                />
                <span>{{ dish.name }}</span>
              </td>
              <td>{{ dish.price }}€ x {{ dish.num }}</td>
              <td>{{ dish.status ? "served" : "to be served" }}</td>
            </tr>
          </tbody>
        </table>
        <div class="foot">
          <div>
            <span
              >Table number：<strong>{{ table.table_id }}</strong></span
            >
            <span>People number：{{ table.people_number }}</span>
            <span>Order number：{{ table.order_sn }}</span>
            <span>Order time：{{ table.paytime }}</span>
          </div>
          <div>
            <span
              >Total Price：<strong>{{ table.amount }}</strong
              >€</span
            >
          </div>
        </div>
      </li>
    </ul>
  </el-scrollbar>
</template>

<script>
import Nodata from "../Nodata";

export default {
  computed: {
    shopped() {
      return this.$store.getters.getShopped;
    },
  },
  components: {
    Nodata,
  },
};
</script>

<style scoped>
.shopped li {
  padding: 0;
}
.shopped th {
  height: 60px;
  background: rgba(255, 255, 255, 0.25);
  color: #fff;
  text-align: center;
  font-weight: normal;
}
.shopped td:nth-child(2) {
  width: 25%;
  text-align: left;
  padding-left: 60px;
}
.shopped img {
  margin-right: 10px;
  vertical-align: middle;
}
.shopped td:nth-child(4) {
  font-size: 16px;
}
.shopped .foot {
  padding: 15px 20px;
}
</style>