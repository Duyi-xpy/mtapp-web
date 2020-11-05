<template>
  <div>
    <span class="name">按省份选择</span>
    <m-select
      :list="provinceList"
      title="省份"
      :value="province"
      :showWrapperActive="provinceActive"
      @change_active="changeProvinceActive"
      @change="changeProvince"
      className="province"
    />
    <m-select
      :list="cityList"
      title="城市"
      :value="city"
      :showWrapperActive="cityActive"
      @change_active="changeCityActive"
      @change="changeCity"
      :disabled="cityDisabled"
      className="city"
    />
    <span>直接搜索</span>
    <el-select
      v-model="searchWord"
      filterable
      remote
      reserve-keyword
      placeholder="请输入关键词"
      :remote-method="remoteMethod"
      :loading="loading"
      
    >
      <el-option v-for="item in searchList" :key="item" :label="item" :value="item"></el-option>
    </el-select>
  </div>
</template>

<script>
import api from '@/api/index.js'
import MSelect from "@/components/changeCity/select.vue";
export default {
  data() {
    return {
      province: "省份",
      provinceList: [],
      city: "城市",
      cityList: [],
      provinceActive: false,
      cityActive: false,
      searchWord: "",
      searchList: ["内蒙古", "山东", "北京"],
      loading:false,
      cityDisabled:true,
    };
  },
  created(){
    api.getProvince().then(res=>{
      this.provinceList = res.data.data.map((item)=>{
        item.name = item.provinceName;
        return item;
      });
    })

  },
  components: {
    MSelect,
  },
  methods: {
    changeProvinceActive(flag) {
      this.provinceActive = flag;
      if (flag) {
        this.cityActive = false;
      }
    },
    changeCityActive(flag) {
      this.cityActive = flag;
      if (flag) {
        this.provinceActive = false;
      }
    },
    remoteMethod(e){
      console.log(e)
      //请求后端接口
    },
    changeProvince(province){
      this.province = province.name;
      this.cityDisabled =false;
      this.cityList = province.cityInfoList;
    },
    changeCity(city){
      this.city = city.name;
      this.$store.dispatch('setPosition',city);
      this.$router.push('/')
    }
  },
};
</script>

<style lang="scss">
@import "@/assets/css/changeCity/iselect.scss";
</style>