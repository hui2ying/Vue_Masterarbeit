<template>
  <el-dialog
    title="Food information"
    :visible.sync="dialogVisible"
    top="15vh"
    :before-close="handleClose"
  >
    <el-form :model="curDish" :rules="rules" ref="form" label-width="auto">
      <el-form-item label="Name" prop="name">
        <el-input v-model="curDish.name"></el-input>
      </el-form-item>

      <el-form-item label="Price" prop="price">
        <el-input v-model.number="curDish.price"></el-input>
      </el-form-item>

      <el-form-item label="Introduction" prop="desc">
        <el-input type="textarea" roes="5" v-model="curDish.desc"></el-input>
      </el-form-item>

      <el-form-item label="Recommended score">
        <el-rate v-model="curDish.stars"></el-rate>
      </el-form-item>

      <el-form-item label="whether to recommend">
        <el-switch
          v-model="curDish.recommend"
          active-color="#ff8400"
          inactive-color="#ccc"
        ></el-switch>
      </el-form-item>

      <el-form-item label="Photo">
        <el-upload
          class="avatar-uploader"
          action="http://order-api.chenxuehui.com/auth/upload_img"
          :show-file-list="false"
          :on-success="uploadSuccess"
          :before-upload="beforeUpload"
          name="image"
        >
          <img
            v-if="curDish.image"
            :src="'http://order-api.chenxuehui.com/' + curDish.image"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">Cancel</el-button>
      <el-button @click="submitForm" type="primary">Ok</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogVisible: Boolean,
    curDish: Object,
  },
  data() {
    return {
      rules: {
        name: [
          {
            required: true,
            message: "请输入菜名",
            trigger: "blur",
          },
        ],
        price: [
          {
            required: true,
            message: "价格必须是数字",
            type: "number",
            trigger: "blur",
          },
        ],
        desc: [
          {
            required: true,
            message: "请输入简介",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleClose() {
      this.$emit("closeDialog");
      this.$refs["form"].resetFields(); //移除表单的验证结果
    },
    uploadSuccess(res) {
      this.$emit("changeImage", res.url);
    },
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 1;

      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 或 PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 1MB!");
      }
      return isJPG && isLt2M;
    },
    submitForm() {
      this.$refs["form"].validate().then(() => {
        this.$fetch({
          url: "/api/edit_dish",
          method: "POST",
          data: this.curDish,
        })
          .then(() => this.handleClose())
          .catch(() => {});
      });
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>