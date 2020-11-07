<template>
  <dl class="s-item">
    <dt>
      <img :src="meta.image" alt="图片" />
    </dt>
    <dd>
      <h3>
        <router-link :to="{ name: 'productDetail' }">{{
          meta.title
        }}</router-link>
      </h3>
      <el-rate
        v-model="meta.score"
        disabled
        show-score
        text-color="#ff9900"
        scemplate="{value}"
      ></el-rate>
      <span v-if="meta.score > 4.5">很好</span>
      <span v-else-if="meta.score > 4">好</span>
      <span v-else-if="meta.score > 3.5">不错</span>
      <span v-else-if="meta.score > 3">一般</span>
      <span v-else>很差</span>
      <span>{{ meta.score }}分</span>
      <span class="s-item-comment-total">{{ meta.commentNum }}人评论</span>
      <p>
        <span class="s-item-tab">
          <!-- <span class v-for="(v, i) in meta.tab" :key="i">{{
            v + (i < meta.tab.length - 1 ? "|" : "")
          }}</span> -->
        </span>
        <span class="s-item-addr">{{ meta.address }}</span>
        <span>
          <a href>
            <i class="el-icon-location"></i>
            查看地图
          </a>
        </span>
      </p>
      <p>
        <span class="s-item-price">人均￥{{ meta.avgPrice }}</span>
      </p>
      <ul class="deal-items">
        <li
          class="items myitems"
          v-for="(item, index) in meta.dealItems.slice(0, 2)"
          :key="index"
        >
          <p class="deal-title">
            {{ item.title }}
          </p>
          <div>
            <span class="deal-price"> ￥{{ item.price }} </span>
            <span class="deal-old-price">
              门市价￥{{ item.counterPrice }}
            </span>
            <span class="deal-sales"> 已售{{ item.saleNum }} </span>
          </div>
          <div
            class="shopping"
            v-if="status == 0"
            @click="addGoods(meta, item)"
          >
            {{ state }}
          </div>
          <div class="shopping" v-else-if="status == 1">
            {{ state }}
          </div>
        </li>
      </ul>
    </dd>
  </dl>
</template>

<script>
import api from "@/api/index.js";
export default {
  props: ["meta"],
  data() {
    return {
      state: "下单",
      status: 0,
      tel: this.$store.state.userName,
    };
  },
  created() {
    // console.log(this.$store.state.userName);
    // console.log(this.meta.type);
    // console.log(this.meta.dealItems[0].title);
    const stype = this.meta.type;
    const goods = this.meta.dealItems[0].title;

    if (this.$store.state.userName != undefined) {
      const tel = this.$store.state.userName;
      api
        .showShopping({
          tel,
          stype,
          goods,
        })
        .then((res) => {
          if (res.data.count != "0") {
            this.status = "1";
            this.state = "已下单";
          }
        });
    } else {
      const shoplist = sessionStorage.getItem("shoplist");
      if (shoplist != null) {
        const li = JSON.parse(shoplist);
        this.$store.dispatch("setCnt", li.length);
        li.forEach((ele, index) => {
          if (ele.stype == stype && ele.goods == goods) {
            this.status = "1";
            this.state = "已下单";
          }
        });
      }
    }
  },
  methods: {
    addGoods(meta, item) {
      if (this.tel) {
        api
          .addShopping({
            shoplist: [
              {
                stype: meta.type,
                goods: item.title,
                price: item.price,
                cnt: 1,
                unit: item.priceType,
                factory: meta.title,
                tel: this.tel,
              },
            ],
          })
          .then((res) => {
            if (res.data.status == "success") {
              this.$message({
                message: "下单成功",
                type: "success",
              });
              this.state = "已下单";
              this.status = 1;

              api
                .findShoppingCnt({
                  params: { tel: this.tel },
                })
                .then((data) => {
                  this.$store.state.cnt = data.data.count;
                });
            } else {
              alert(res.data.msg);
            }
          });
      } else {
        const shoptemp = {
          stype: meta.type,
          goods: item.title,
          price: item.price,
          cnt: 1,
          unit: item.priceType,
          factory: meta.title,
        };
        const shoplist = sessionStorage.getItem("shoplist");
        if (shoplist != null) {
          const li = JSON.parse(shoplist);
          li.push(shoptemp);
          sessionStorage.setItem("shoplist", JSON.stringify(li));
          this.$store.dispatch("setCnt", li.length);
          this.state = "已下单";
          this.status = 1;
        } else {
          const shoparr = [];
          shoparr.push(shoptemp);
          sessionStorage.setItem("shoplist", JSON.stringify(shoparr));
          this.$store.dispatch("setCnt", shoparr.length);
          this.state = "已下单";
          this.status = 1;
        }
      }
    },
  },
};
</script>

<style lang="css" scoped>
.myitems {
  position: relative;
}
.shopping {
  width: 120px;
  height: 80px;
  position: absolute;
  top: 0px;
  right: 0px;
  font-size: 18px;
  line-height: 50px;
  text-align: center;
}
</style>