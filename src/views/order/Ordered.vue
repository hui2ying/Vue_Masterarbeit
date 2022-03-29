<template>
  <el-scrollbar wrap-class="scrollWrap" :native="false" id="content">
    <Nodata v-if="!ordered.length" />
    <ul class="orderBox">
      <li v-for="(table, tableIndex) in ordered" :key="table.table_id">
        <table>
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
              </td>
              <td>{{ dish.name }}</td>
              <td>
                <button @click="addOrDel(dish, -1, table.table_id)">
                  <span class="iconfont">&#xe729;</span>
                </button>
                <span class="num">{{ dish.num }}</span>
                <button @click="addOrDel(dish, 1, table.table_id)">
                  <span class="iconfont">&#xeaf3;</span>
                </button>
              </td>
              <td>￥{{ dish.price }} x {{ dish.num }}</td>
              <td>{{ dish.remarks }}</td>
              <td>
                <button @click="select(dish, table.table_id)" class="select">
                  <span v-if="dish.selected" class="iconfont">&#xebe6;</span>
                </button>
              </td>
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
            <button @click="addDishes(table.table_id)" class="addDishes">
              add
            </button>
          </div>
          <div>
            <span
              >total price：€<strong>{{ totalPrice(tableIndex) }}</strong></span
            >
            <button @click="submitOrder(table)" class="pay">confirm</button>
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
    ordered() {
      return this.$store.getters.getOrdered;
    },
    totalPrice() {
      return function (tableIndex) {
        let total = 0;
        this.ordered[tableIndex].order_items.forEach(
          (dish) => (total += dish.price * dish.num)
        );
        return total;
      };
    },
    curTableId() {
      return this.$store.getters.getTables.cur_id;
    },
  },
  components: {
    Nodata,
  },
  methods: {
    addOrDel(dish, num, table_id) {
      dish.num += num;
      dish.selected = true;

      if (dish.num <= 0) {
        dish.num = 0;
        dish.selected = false;
      }

      //点菜
      this.orderDishes(dish, table_id);
    },
    orderDishes(dish, table_id) {
      this.$fetch({
        url: "/api/add_order_item",
        method: "POST",
        data: {
          table_id,
          dish_id: dish.dish_id,
          num: dish.num,
          remarks: dish.remarks,
          selected: dish.selected,
        },
      });
    },
    select(dish, table_id) {
      dish.selected = !dish.selected;
      //点菜
      this.orderDishes(dish, table_id);
    },
    addDishes(table_id) {
      //添菜
      if (table_id != this.curTableId) {
        this.$fetch({
          url: "/api/choose_table",
          method: "POST",
          data: {
            table_id,
          },
        }).then(() => this.$store.commit("updateCurId", table_id));
      }

      this.$router.push("/");
    },
    submitOrder(table) {
      this.$fetch({
        url: "/api/submit_order",
        method: "POST",
        data: {
          order_id: table.order_id,
        },
      }).then(() => {
        this.$getOrdered();
        this.$getShopped();

        if (table.table_id == this.curTableId) {
          this.$store.getters.getTables.curid = 0;
        }
      });
    },
  },
};
</script>

<style scoped>
.addDishes {
  width: 50px;
  height: 25px;
  background: #a65335;
  border-radius: 5px;
  border: none;
}
.pay {
  width: 80px;
  height: 35px;
  background: #ff8400;
  font-style: 18px;
  border: none;
  border-radius: 5px;
}
</style>