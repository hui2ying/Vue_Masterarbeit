<template>
  <div>
    <ul class="category">
      <li v-for="category in categorys" :key="category.id">
        <div class="icon">
          <span class="iconfont" v-html="category.icon"></span>
          <span class="name">{{ category.name }}</span>
        </div>
        <div class="edit">
          <span @click="del(category.id)" class="iconfont">&#xe8c1;</span>
          <span @click="showDialog(category)" class="iconfont">&#xe601;</span>
        </div>
      </li>
      <li @click="showDialog()" class="add">
        <span class="iconfont">&#xeaf3;</span>
      </li>
    </ul>

    <!-- 弹出层 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogFormVisible"
      width="30%"
      top="30vh"
    >
      <el-form :model="form" label-width="auto" :rules="rules" ref="ruleForm">
        <el-form-item label="Name" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="icon" prop="icon">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('ruleForm')">Cancel</el-button>
        <el-button type="primary" @click="submit('ruleForm')">Yes</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogTitle: "编辑分类", //弹出层标题
      dialogFormVisible: false, //弹出层是否显示
      form: {}, //表单的数据
      rules: {
        //表单验证规则
        name: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
        icon: [
          { required: true, message: "请输入图标对应的代码", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.$getCategory();
  },
  computed: {
    categorys() {
      return this.$store.getters.getCategory;
    },
  },
  methods: {
    del(id) {
      this.$confirm(
        "Confirm deletion, all dishes under this category will be cleared after deletion",
        "Warning",
        {
          confirmButtonText: "Yes",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(() => {
          this.$fetch({
            url: "/api/del_dish_cate",
            method: "POST",
            data: {
              id,
            },
          }).then((res) =>
            this.$store.commit("updateCategory", res.cate_lists)
          );
        })
        .catch(() => {});
    },
    showDialog(category) {
      this.dialogFormVisible = true;

      this.dialogTitle = category ? "Category edit" : "Category add";

      this.form = category ? category : {};
    },
    submit(form) {
      this.$refs[form]
        .validate()
        .then(() => {
          this.form.id ? this.addOrEdit("edit") : this.addOrEdit("add");
        })
        .catch(() => {});
    },
    addOrEdit(action) {
      this.$fetch({
        url: "/api/" + action + "_dish_cate",
        method: "POST",
        data: this.form,
      }).then((res) => {
        this.dialogFormVisible = false; //关闭弹出层
        this.$store.commit("updateCategory", res.cate_lists); //更新状态里的数据
      });
    },
    cancel(form) {
      this.dialogFormVisible = false;
      this.$refs[form].resetFields();
    },
  },
};
</script>

<style scoped>
.category {
  overflow: hidden; /* 清除浮动 */
}
.category li {
  width: 300px;
  height: 300px;
  float: left;
  margin: 0 10px 20px;
  border-radius: 5px;

  background: #fff;
  border: 1px solid #ccc;

  position: relative;
}
.category li div {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
}
.icon {
  justify-content: center;
  flex-direction: column;
}
.icon .iconfont {
  font-size: 150px;
  margin-bottom: 20px;
  color: #ff8400;
}
.icon .name {
  font-size: 24px;
  color: #aaa;
}

.edit {
  justify-content: space-around; /* 分散居中对齐 */
  background: rgba(0, 0, 0, 0.9);
  opacity: 0;
}
.edit span {
  color: #dbdbdb;
  font-size: 80px;
  cursor: pointer;
}
.edit span:hover {
  color: #ff8400;
}
.category li:hover .edit {
  opacity: 1;
  transition: 0.4s;
}

.add {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.add span {
  font-size: 200px;
  color: #ccc;
}
.add:hover {
  background: #eee;
  transition: 0.3s;
}
</style>