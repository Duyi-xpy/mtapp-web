<template>
  <div class="category">
    <dl class="m-category">
      <dt>按拼音字母选择:</dt>
      <dd v-for="(item,index) in list" :key="index">
        <a :href="'#city-' + item">{{item}}</a>
      </dd>
    </dl>
    <dl
      class="m-category-section"
      v-for="(item,index) in cityGroup"
      :key="index"
      :id="'city-'+index"
    >
      <dt>{{index}}</dt>
      <dd>
        <span v-for="t in item" :key="t.id" @click="changeCity(t)">{{t.name}}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
import api from "@/api/index.js";
export default {
  data() {
    return {
      list: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
      cityList: [],
      cityGroup: {},
    };
  },
  methods: {},
  created() {
    api.getCityList().then((res) => {
      var obj = {};
      res.data.data.forEach(function (item, index) {
        if (!obj[item.firstChar.toUpperCase()]) {
          obj[item.firstChar.toUpperCase()] = [];
        }
        obj[item.firstChar.toUpperCase()].push(item);
      });
      this.cityGroup = obj;
    });
  },
  methods: {
    changeCity(item) {
      this.$store.dispatch('setPosition',item);
      // this.$router.push('/')
      this.$router.push({name:'index'})
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/css/changeCity/category.scss";
</style>