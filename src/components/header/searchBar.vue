<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <img
          src="//s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png"
          alt="美团"
        />
      </el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <el-input
            v-model="searchWord"
            placeholder="搜索商家或地点"
            @focus="focus"
            @blur="blur"
            @input="input"
          ></el-input>
          <el-button type="primary" icon="el-icon-search"></el-button>
          <dl class="hotPlace" v-if="isHotPlace">
            <dt>热门搜索</dt>
            <dd v-for="(item, index) in hotPlaceList" :key="index">
              <router-link :to="{ name: 'goods', params: { name: item } }">{{
                item
              }}</router-link>
            </dd>
          </dl>
          <dl class="searchList" v-if="isSearchList">
            <dd v-for="(item, index) in searchList" :key="index">
              <router-link :to="{ name: 'goods', params: { name: item } }">{{
                item
              }}</router-link>
            </dd>
          </dl>
        </div>
        <p class="suggest">
          <a href="#" v-for="(item, index) in suggestList" :key="index">{{
            item
          }}</a>
        </p>
      </el-col>
      <el-col :span="4" class="center">
        <div class="cw-icon">
          <i class="el-icon-shopping-cart-full iconfont"></i>
          <a target="_blank" href="#">我的购物车</a>
          <span class="ci-count">
            {{ $store.state.cnt }}
          </span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from "@/api/index.js";
export default {
  data() {
    return {
      searchWord: "",
      isFocus: false,
      hotPlaceList: [],
      searchList: [],
      suggestList: [],
    };
  },
  created() {
    api.SearchHotWords().then((res) => {
      this.hotPlaceList = res.data.data;
      this.suggestList = res.data.data;
    });
  },
  computed: {
    isHotPlace: function () {
      return this.isFocus && !this.searchWord;
    },
    isSearchList: function () {
      return this.isFocus && this.searchWord;
    },
  },
  methods: {
    focus() {
      this.isFocus = true;
    },
    blur() {
      var self = this;
      setTimeout(function () {
        self.isFocus = false;
      }, 200);
    },
    input() {
      let value = this.searchWord;
      api.getSearchList().then((res) => {
        this.searchList = res.data.data.list.filter((item, index) => {
          return item.indexOf(value) > -1;
        });
        console.log(res);
      });
    },
  },
};
</script>

<style scoped>
.cw-icon {
  position: relative;
  width: 130px;
  height: 34px;
  background-color: #fff;
  text-align: center;
  line-height: 34px;
  border-color: #eee;
  overflow: hidden;
  z-index: 1;
  float: left;
  border: 1px solid #e3e4e5;
  color: #e1251b;
  margin-top: 20px;
}
.cw-icon a {
  color: #e1251b;
}
.cw-icon:hover {
  border-color: #e1251b;
}
.iconfont {
  margin-right: 13px;
  font-size: 16px;
}

.ci-count {
  position: absolute;
  top: 1px;
  left: 29px;
  right: auto;
  display: inline-block;
  padding: 1px 3px;
  font-size: 12px;
  line-height: 12px;
  color: #fff;
  background-color: #e1251b;
  border-radius: 7px;
  min-width: 12px;
  text-align: center;
}
</style>
