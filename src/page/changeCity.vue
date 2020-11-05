<template>
  <div>
    <div class="page-changeCity">
      <el-row>
        <province />
      </el-row>
      <el-row>
        <hot-city title="热门城市:" :list="hotList"/>
      </el-row>
      <el-row>
        <hot-city title="最近访问:" :list="rencentList"/>
      </el-row>
      <el-row>
        <category />
      </el-row>
    </div>
  </div>
</template>

<script>
import api from '@/api/index.js'
import Province from '@/components/changeCity/province.vue'
import hotCity from '@/components/changeCity/hotCity.vue'
import Category from '@/components/changeCity/category.vue'
export default {
  data(){
    return{
      hotList:[],
      rencentList:[]
    }
  },
  created(){
    api.getHotCity().then(res=>{
      console.log(res)
      this.hotList = res.data.data.map((item)=>{ return item.name})
    });
    api.getRecentCity().then(res=>{
      this.rencentList = res.data.data.map((item)=>{return item.name})
    });
  },
  components:{
    Province,
    hotCity,
    Category,
  }
}
</script>

<style>

</style>