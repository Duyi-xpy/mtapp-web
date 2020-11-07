<template>
  <div class="page-product">
    <el-row class="m-crumbs">
      <crumbs />
    </el-row>
    <el-row>
      <el-col :span="19">
        <el-row>
          <categroy />
        </el-row>
        <el-row>
          <list />
        </el-row>
      </el-col>
      <el-col :span="5">
        <m-map :meta="guessList" />
      </el-col>
    </el-row>
    <router-view></router-view>
  </div>
</template>

<script>
import api from "@/api/index.js";
import Crumbs from "@/components/products/crumbs.vue";
import Categroy from "@/components/products/categroy.vue";
import List from "@/components/products/list.vue";
import MMap from "@/components/products/map.vue";
export default {
  components: {
    Crumbs,
    Categroy,
    List,
    MMap,
  },
  data() {
    return {
      guessList: [
        {
          itemId: "2412338",
          title: "金真子纸上烤肉（双桥店）",
          imgUrl:
            "https://p0.meituan.net/bbia/f58fafc0be2bc3a69dfcac20260888c2201000.jpg@237w_132h_1e_1c",
          score: 4.5,
          consumeNum: null,
          areaName: "双桥",
          lowPrice: "58.0",
          saleNum: null,
          commentNum: 16449,
          detailUrl: "",
          firstCate: [1, 20632, 20426, 20557],
          avgPrice: 59,
        },
        {
          itemId: "2412338",
          title: "木北护肤造型（四路通店）",
          imgUrl:
            "https://p0.meituan.net//dpmerchantpic/b4f08dbd06a9f02c6aed7ab24b09acbd129481.jpg@188w_106h_1e_1c",
          score: 4.5,
          consumeNum: null,
          areaName: "杨桥/木樨园",
          lowPrice: "58.0",
          saleNum: null,
          commentNum: 16449,
          detailUrl: "",
          firstCate: [1, 20632, 20426, 20557],
          avgPrice: 59,
        },
        {
          itemId: "2412338",
          title: "吉野家（龙湖大兴天街店）",
          imgUrl:
            "https://p0.meituan.net//bbia/3e36af692ce40ea56575b7c19dc3581c464792.png@188w_106h_1e_1c",
          score: 4.5,
          consumeNum: null,
          areaName: "黄村",
          lowPrice: "2.5",
          saleNum: null,
          commentNum: 16449,
          detailUrl: "",
          firstCate: [1, 20632, 20426, 20557],
          avgPrice: 59,
        },
        {
          itemId: "2412338",
          title: "屯老二农家铁锅炖",
          imgUrl:
            "https://p1.meituan.net//bbia/66fd7b3ea9b59d4687b42e07a514013593187.jpg@188w_106h_1e_1c",
          score: 4.5,
          consumeNum: null,
          areaName: "黄村",
          lowPrice: "88",
          saleNum: null,
          commentNum: 16449,
          detailUrl: "",
          firstCate: [1, 20632, 20426, 20557],
          avgPrice: 59,
        },
      ],
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/css/products/index.scss";
</style>