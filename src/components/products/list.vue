<template>
  <div class="m-product-list">
    <ul>
      <li
        v-for="(item) in nav"
        :key="item.key"
        :class="{'s-nav-active':item.active,'s-price':item.class}"
      >{{item.name}}</li>
    </ul>
    <el-row>
      <item v-for="(item,index) in productList" :key="index" :meta="item" />
    </el-row>
  </div>
</template>

<script>
import api from '@/api/index.js'
import Item from '@/components/products/item.vue'
export default {
  data() {
    return {
      nav: [
        {
          key: "s-default",
          name: "智能排序",
          active: true,
        },
        {
          key: "s-price",
          name: "价格最低",
          active: false,
          class: "s-price",
        },
        {
          key: "s-score",
          name: "人气最高",
          active: false,
        },
        {
          key: "s-comment",
          name: "评价最高",
          active: false,
        },
      ],

      productList: [
      ],
    };
  },
  created(){
    api.getProductsList().then(res=>{
      this.productList = res.data.data;
    });
  },
  components:{
    Item,
  }
};
</script>

<style lang="scss">
</style>