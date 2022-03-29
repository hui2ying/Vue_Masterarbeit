<template>
  <div id="wrap">
    <img src="../assets/images/logo.png" class="logo" alt="" />
    <p>
      <label for="username">Nutzername</label>
      <input
        type="text"
        id="username"
        placeholder="Bitte Nutzername eingeben"
        v-model="form.username"
      />
      <span class="tips" v-show="userTip"
        >Bitte den korrekten Nutzernamen eingeben</span
      >
    </p>
    <p>
      <label for="password">Passwort</label>
      <input
        type="password"
        id="password"
        placeholder="Bitte Passwort eingeben"
        v-model="form.password"
      />
      <span class="tips" v-show="passTip"
        >Bitte das richtige Passwort eingeben</span
      >
    </p>
    <div>
      <button @click="userAction('user', 'your login')">Einloggen</button>
      <button @click="userAction('register', 'Registrieren')">
        Registrieren
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      userTip: false,
      passTip: false,
    };
  },
  methods: {
    userAction(action, msg) {
      const require = {
        un: /^[a-zA-Z][a-zA-Z0-9]{5,15}$/,
        pw: /^[a-zA-Z0-9]{3,10}$/,
      };

      let validate = true;
      this.userTip = this.passTip = false;

      // 验证用户名
      if (!require.un.test(this.form.username)) {
        // 验证失败
        this.userTip = true;
        validate = false;
      }

      // 验证密码
      if (!require.pw.test(this.form.password)) {
        // 验证失败
        this.passTip = true;
        validate = false;
      }

      //验证失败
      if (!validate) {
        return;
      }

      // 验证后发送请求
      this.$fetch({
        url: "/auth/" + action,
        method: "POST",
        data: this.form,
      }).then((res) => {
        if (!res.success) {
          // 失败了
          this.$message.error(msg + " is failed, " + res.info);
        } else {
          // 存储
          localStorage.setItem("order:isLogin", this.form.username);
          localStorage.setItem("order:token", res.token);

          // 跳转到选座页面 + 提示信息
          this.$message({
            message: "Congratulations, " + msg + " is successful",
            type: "success",
            duration: 2000,
          });
          setTimeout(() => this.$router.replace("/table"), 2100);
        }
      });
    },
  },
};
</script>

<style scoped>
#wrap {
  height: 100vh; /* vh vw */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: #0a0909 url(../assets/images/index_bg.jpg) no-repeat center;
  background-size: cover;
}
.logo {
  width: 550px;
  margin-bottom: 100px;
}
#wrap p {
  width: 550px;
  display: flex;
  margin-bottom: 50px;
  background: #fff;
  font-size: 24px;
  border-radius: 30px;
  line-height: 65px;
  position: relative;
}
#wrap label {
  width: 200px;
  background: #ff8400;
  color: #fff;
  text-align: center;
  border-radius: 30px;
}
#wrap input {
  width: 100%;
  border: none;
  font-size: 20px;
  color: #b2b2b2;
  padding-left: 10px;
  border-radius: 0 30px 30px 0;
}
#wrap .tips {
  position: absolute;
  width: 200px;
  top: 10px;
  right: 0;
  line-height: 20px;

  font-size: 16px;
  color: red;
}
input::placeholder {
  color: #ccc;
  font-size: 16px;
}
#wrap button {
  width: 140px;
  height: 65px;
  margin: 0 10px;
  background: #ff8400;

  font-size: 24px;
  color: #fff;
  border-radius: 30px;
}
#wrap button:nth-child(2) {
  background: #cc2e2a;
}
</style>
