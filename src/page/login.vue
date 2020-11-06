<template>
  <div class="page-login">
    <div class="login-header">
      <a class="logo" href="http://www.meituan.com"></a>
    </div>
    <div class="login-panel">
      <div class="banner">
        <img
          src="//s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg"
          width="480"
          height="370"
          alt="美团网"
        />
      </div>
      <div class="form">
        <h4 v-if="error" class="tips">{{ error }}</h4>
        <p>
          <span>账号登录</span>
        </p>
        <el-input
          :class="{ error: error && !userName }"
          prefix-icon="profile"
          v-model="userName"
          placeholder="手机号"
        ></el-input>
        <el-input
          :class="{ error: error && !password }"
          prefix-icon="password"
          v-model="password"
          type="password"
          placeholder="密码"
        ></el-input>
        <div class="foot">
          <a>忘记密码?</a>
        </div>
        <el-button class="btn-login" type="primary" @click="submit"
          >登录</el-button
        >
        <p class="reg">
          <span>还没有账号？</span>
          <router-link :to="{ name: 'register' }">免费注册</router-link>
        </p>
        <div class="oauth-warpper">
          <h3 class="title-wrapper">
            <span class="title">用合作网站站好登录</span>
          </h3>
          <div class="oauth">
            <span class="oauth__link oauth__link--qq"></span>
            <span class="oauth__link oauth__link--weibo"></span>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <ul>
        <li><a href="#">关于美团</a></li>
        <li><a href="#">加入我们</a></li>
        <li><a href="#">商家入住</a></li>
        <li><a href="#">帮组中心</a></li>
        <li><a href="#">美团手机版</a></li>
      </ul>
      <p>
        ©2020 美团网团购 meituan.com 京ICP证070791号 京公网安备11010502025545号
      </p>
    </footer>
  </div>
</template>

<script>
import api from "@/api/index.js";
export default {
  data() {
    return {
      userName: "",
      password: "",
      error: "",
    };
  },
  methods: {
    submit() {
      console.log(this.userName, this.password);
      if (!this.userName) {
        this.error = "请输入账号";

        return false;
      }
      if (!this.password) {
        this.error = "请输入密码";

        return false;
      }
      api
        .login({
          params: {
            tel: this.userName,
            spwd: this.password,
          },
        })
        .then((res) => {
          if (res.data.status == "success") {
            this.$router.push({ name: "index" });
            this.$store.state.userName = this.userName;
            sessionStorage.userName = this.userName;
            api
              .findShoppingCnt({
                params: { tel: this.userName },
              })
              .then((data) => {
                this.$store.state.cnt = data.data.count;
              });
          } else {
            this.error = res.data.msg;
          }
        });
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/css/login/index.scss";
</style>