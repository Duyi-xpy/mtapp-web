<template>
  <div class="wrapper">
    <el-table
      :data="tableData"
      style="width: 100%"
      :summary-method="getSummaries"
      v-loading="loading"
      show-summary
    >
      <!-- :default-sort="{ prop: 'price', order: 'descending' }" -->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.goods }}</span>
            </el-form-item>
            <el-form-item label="所属店铺">
              <span>{{ props.row.factory }}</span>
            </el-form-item>
            <el-form-item label="商品单价">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="商品单位">
              <span>{{ props.row.unit }}</span>
            </el-form-item>
            <el-form-item label="商品数量">
              <span>{{ props.row.cnt }}</span>
            </el-form-item>
            <el-form-item label="总价">
              <span>{{ props.row.total }}</span>
            </el-form-item>
            
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="factory" label="店家"> </el-table-column>
      <el-table-column prop="goods" label="商品名称"> </el-table-column>
      <el-table-column prop="price" label="商品单价" width="120px">
      </el-table-column>
      <el-table-column prop="unit" label="商品单位" width="120px">
      </el-table-column>

      <el-table-column prop="cnt" label="商品数量" width="120">
      </el-table-column>
      <el-table-column prop="total" label="总价" width="80px">
      </el-table-column>

      <!-- <el-table-column prop="address" label="地址" :formatter="formatter"> -->

      <el-table-column align="right">
        <!-- <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template> -->
        <template slot-scope="scope">
          <el-button size="mini" @click="handlePlus(scope.$index, scope.row)"
            >+</el-button
          >
          <el-button size="mini" @click="handleMinus(scope.$index, scope.row)"
            >-</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >取消订单</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-row style="margin-top: 10px">
      <el-button type="primary" round class="btn" @click="open"
        >提交订单</el-button
      >
    </el-row>
  </div>
</template>
<script>
import api from "@/api/index.js";
export default {
  data() {
    return {
      search: "",
      loading: true,
      tableData: [
        // {
        //   goods: "香蕉",
        //   price: 210,
        //   unit: "元",
        //   cnt: 1,
        //   facotry: "水果店",
        //   total: 210,
        // },
        // {
        //   goods: "奶茶",
        //   price: 200,
        //   unit: "元",
        //   cnt: 1,
        //   facotry: "一点点",
        //   total: 200,
        // },
        // {
        //   goods: "炸鸡",
        //   price: 180,
        //   unit: "元",
        //   cnt: 1,
        //   facotry: "efc韩国炸鸡披萨",
        //   total: 180,
        // },
        // {
        //   goods: "四人套餐，提供免费WiFi",
        //   price: 130,
        //   unit: "元",
        //   cnt: 1,
        //   facotry: "井格重庆火锅",
        //   total: 130,
        // },
        // {
        //   date: "2016-05-02",
        //   name: "22",
        //   address: "上海市普陀区金沙江路 1518 弄",
        // },
        // {
        //   date: "2016-05-04",
        //   name: "3",
        //   address: "上海市普陀区金沙江路 1517 弄",
        // },
        // {
        //   date: "2016-05-01",
        //   name: "44",
        //   address: "上海市普陀区金沙江路 1519 弄",
        // },
        // {
        //   date: "2016-05-03",
        //   name: "55",
        //   address: "上海市普陀区金沙江路 1516 弄",
        // },
      ],
    };
  },
  created() {
    const userName = this.$store.state.userName;
    if (userName != null) {
      api
        .showShopping({
          tel: userName,
        })
        .then((data) => {
          if (data.data.count != 0) {
            this.tableData = data.data.rows;
            this.tableData.map((ele, index) => {
              ele.total = ele.price * ele.cnt;
              return ele;
            });
          }
        });
    } else {
      const sessionList = sessionStorage.getItem("shoplist");
      if (sessionList != null) {
        const li = JSON.parse(sessionList);

        this.tableData = li;
        this.tableData.map((ele, index) => {
          ele.total = ele.price * ele.cnt;
          return ele;
        });
      }
    }
    const self = this;
    setTimeout(function () {
      self.loading = false;
    }, 500);
  },

  methods: {
    formatter(row, column) {
      return row.address;
    },
    handlePlus(index, row) {
      row.cnt++;
      row.total = row.price * row.cnt;
      this.$set(this.tableData, index, { ...row });
      //   this.tableData[index].cnt + 1;
    },
    handleMinus(index, row) {
      if (row.cnt == 0) {
        return;
      }

      row.cnt--;
      row.total = row.price * row.cnt;
      this.$set(this.tableData, index, { ...row });
    },
    handleDelete(index, row) {
      const del = this.tableData.splice(index, 1);
      const userName = this.$store.state.userName;
      if (userName != null) {
        api
          .delShopping({
            shoplist: del,
          })
          .then((data) => {
            console.log(data.data);
          });
      } else {
        sessionStorage.setItem("shoplist", JSON.stringify(this.tableData));
      }

      this.$store.dispatch("setCnt", this.$store.state.cnt - 1);
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 5) {
          sums[index] = "总价";
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (!values.every((value) => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          if (index === 6) {
            sums[index] += " 元";
          } else {
            sums[index] = "";
          }
        } else {
          sums[index] = "";
        }
      });

      return sums;
    },
    open() {
      const userName = this.$store.state.userName;
      if (userName == null) {
        this.$confirm("游客状态下无法支付，前往登录？", "提示信息", {
          distinguishCancelAndClose: true,
          confirmButtonText: "登录",
          cancelButtonText: "放弃",
        })
          .then(() => {
            this.$message({
              type: "info",
              message: "提交成功，即将登录页面",
            });

            this.$router.push({ name: "login" });
          })
          .catch((action) => {
            this.$message({
              type: "info",
              message: action === "cancel" ? "登录页面" : "停留在当前页面",
            });
          });
      } else {
        this.$confirm("确认是否提交该订单信息，前往支付？", "提单提交信息", {
          distinguishCancelAndClose: true,
          confirmButtonText: "确认支付",
          cancelButtonText: "放弃支付",
        })
          .then(() => {
            this.$message({
              type: "info",
              message: "支付成功",
            });
            api
              .pay({
                shoplist: this.tableData,
                tel: this.$store.state.userName,
              })
              .then((data) => {
                this.$store.state.cnt = 0;
                this.$router.push({ name: "index" });
              });
          })
          .catch((action) => {
            this.$message({
              type: "info",
              message:
                action === "cancel" ? "放弃支付并留在本页面" : "停留在当前页面",
            });
          });
      }
    },
  },
};
</script>
<style scoped>
.wrapper {
  margin-top: 20px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.btn {
  float: right;
  margin-right: 20px;
}
</style>