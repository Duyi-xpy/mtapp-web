<template>
  <div class="wrapper">
    <el-table :data="tableData" style="width: 100%; margin-bottom: 20px">
      <el-table-column prop="payid" label="订单号"> </el-table-column>
      <el-table-column prop="tel" label="手机号码" width="150px">
      </el-table-column>
      <el-table-column prop="total" label="总金额" width="150px">
      </el-table-column>
      <el-table-column prop="stype" label="支付方式" width="150px">
      </el-table-column>
      <el-table-column
        prop="when_in_logged"
        label="支付时间"
        width="220px"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看订单详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-table
      v-if="tableData1.length != 0"
      :data="tableData1"
      style="width: 100%; margin-bottom: 20px"
    >
      <el-table-column prop="factory" label="店家"> </el-table-column>
      <el-table-column prop="goods" label="商品名称"> </el-table-column>
      <el-table-column prop="price" label="商品单价" width="120px">
      </el-table-column>
      <el-table-column prop="unit" label="商品单位" width="120px">
      </el-table-column>

      <el-table-column prop="cnt" label="商品数量" width="120">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import api from "@/api/index.js";
export default {
  data() {
    return {
      search: "",
      loading: true,
      tableData: [],
      tableData1: [],
    };
  },
  created() {
    const userName = this.$store.state.userName;
    if (userName != null) {
      api.getTicket(userName).then((data) => {
        if (data.data.count != 0) {
          this.tableData = data.data.rows;
          this.tableData.forEach(async (ele) => {
            ele.children = await api.getTicketShopList(ele.payid);
            ele.children = ele.children.data.rows;
          });
        }
      });
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
    handleClick(row) {
      if (this.tableData1.length === 0) {
        this.tableData1 = row.children;
      } else {
        this.tableData1 = [];
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