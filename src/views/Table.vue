<template>
  <el-scrollbar
    wrap-class="scrollWrap"
    view-class="scrollView"
    :native="false"
    id="content"
  >
    <ul class="legend">
      <li>
        <div><span class="iconfont">&#xe60f;</span></div>
        <span>Free</span>
      </li>
      <li>
        <div><span class="iconfont">&#xe60f;</span></div>
        <span>Ordering</span>
      </li>
      <li>
        <div><span class="iconfont">&#xe60f;</span></div>
        <span>Eating</span>
      </li>
    </ul>
    <ul class="table">
      <li
        v-for="table in tables.list"
        :key="table.table_id"
        :class="{ ordering: table.status == 1, eating: table.status == 2 }"
        @click="chooseTable(table)"
      >
        <div><span class="iconfont">&#xe60f;</span></div>
        <span>Table {{ table.table_id }}</span>
      </li>
    </ul>
  </el-scrollbar>
</template>

<script>
export default {
  computed: {
    tables() {
      return this.$store.getters.getTables;
    },
  },
  methods: {
    chooseTable(table) {
      if (table.status == 1) {
        this.requestTable(table.table_id, table.people_number);
        return;
      }
      if (table.status == 2) {
        alert("正在用餐中，无法点餐");
        return;
      }

      this.$prompt("Please enter the number of people", {
        confirmButtonText: "Ok",
        cancelButtonText: "Cancel",
        inputPattern: /^(10|[1-9])$/,
        inputErrorMessage: "The number of people entered is incorrect",
      })
        .then((res) => this.requestTable(table.table_id, res.value))
        .catch(() => {});
    },
    requestTable(table_id, people_number) {
      this.$fetch({
        url: "/api/choose_table",
        method: "POST",
        data: {
          table_id,
          people_number,
        },
      }).then((res) => {
        var This = this;

        this.$getTables();

        this.$message({
          message: "Success, the page is about to jump to the menu page",
          type: "success",
          duration: 1000,
          onClose() {
            This.$router.push("/");
          },
        });
      });
    },
  },
};
</script>

<style scoped>
.legend {
  color: #fff;
  display: flex;
  justify-content: flex-end;
  padding-top: 30px;
}
.legend li {
  display: flex;
  margin-right: 30px;
  align-items: center;
}
.legend li div {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  text-align: center;
  line-height: 40px;
  margin-right: 10px;
}
.legend li div span {
  font-size: 25px;
}
.legend li:nth-child(1) div,
.table div {
  background: #66a8a6;
}
.legend li:nth-child(2) div,
.table .ordering div {
  background: #f79700;
}
.legend li:nth-child(3) div,
.table .eating div {
  background: #e5553f;
}

.table {
  width: 90%;
  margin: 40px auto 0;
}
.table li {
  display: inline-block;
  text-align: center;
  margin: 0 37px 50px;
  cursor: pointer;
  color: #fff;
}
.table div {
  width: 120px;
  height: 120px;
  line-height: 120px;
  border-radius: 50%;
  margin-bottom: 10px;
}
.table div span {
  font-size: 80px;
}
</style>