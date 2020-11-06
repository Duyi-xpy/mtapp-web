<template>
  <div class="m-geo">
    <div class="position">
      <i class="el-icon-location" />
      {{ $store.state.position.name }}
      <router-link class="changeCity" :to="{ name: 'changeCity' }"
        >切换城市</router-link
      >[
      <a href="#" v-for="(item, index) in nearCity" :key="index">{{
        item.name
      }}</a>
      ]
      <div class="m-user" v-if="!$store.state.userName">
        <router-link class="login" :to="{ name: 'login' }"
          >立即登录</router-link
        >
        <router-link class="register" :to="{ name: 'register' }"
          >注册</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/index.js";
export default {
  data() {
    return {
      nearCity: [],
    };
  },
  watch: {
    "$store.state.position": function () {
      this.nearCity = this.$store.state.position.nearCity;
    },
  },
  created() {
    var userName = sessionStorage.userName;
    if (userName != "") {
      this.$store.dispatch("setUserName", userName);
      api
        .findShoppingCnt({
          params: { tel: userName },
        })
        .then((data) => {
          this.$store.dispatch("setCnt", data.data.count);
        });
    }
    api.getCurPosition().then((res) => {
      this.$store.dispatch("setPosition", res.data.data);
      this.nearCity = res.data.data.nearCity;
    });
  },
};
</script>

<style>
</style>
