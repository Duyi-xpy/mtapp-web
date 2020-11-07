<template>
  <div class="m-product-map">
    <img src="../../assets/img/map.png" alt />
    <div class="m-guess-like">
      <h4>猜你喜欢</h4>
      <ul>
        <li v-for="(item, index) in meta" :key="index">
          <router-link
            :to="{ name: 'productDetail', params: { name: item.itemId } }"
          >
            <img :src="item.imgUrl" alt="图片" />
            <div class="guess-title">{{ item.title }}</div>
            <div>
              <el-rate
                v-model="item.score"
                disabled
                text-color="#ff9900"
                score-template="{value}"
              ></el-rate>
              <span class="guess-comment">{{ item.commentNum }}个评价</span>
            </div>
            <div class="guess-add">{{ item.areaName }}</div>
            <div class="guess-price">
              ￥{{ item.lowPrice }}
              <span class="qi">起</span>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["meta"],

};
</script>

<style>
</style>