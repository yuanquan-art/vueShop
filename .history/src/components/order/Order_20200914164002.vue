<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">订单管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <el-row>
        <el-col :span="8">
          <!-- 搜索框区域 -->
          <el-input
            placeholder="请输入内容"
          >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- Table表格区域 -->
      <el-table :data="orderlist" border stripe>
          <el-table-column type="index"></el-table-column>
          <el-table-column label="订单编号" prop="order_number"></el-table-column>
          <el-table-column label="订单价格" prop="order_price"></el-table-column>
          <el-table-column label="是否付款">
            <template slot-scope="scope">
                <el-tag type="success" v-if="scope.row.pay_status ==='1'">已付款</el-tag>
                <el-tag type="danger" v-else>未付款</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="是否发货" prop="is_send"></el-table-column>
          <el-table-column label="下单时间" >
              <template slot-scope="scope">
                  {{ scope.row.create_time | dataFormat }}
              </template>
          </el-table-column>
          <el-table-column label="操作">
              <template>
                  <el-button type="primary" size="mini" class="el-icon-edit"></el-button>
                  <el-button type="primary" size="mini" class="el-icon-location"></el-button>
              </template>
          </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
        // 查询参数
        queryInfo:{
            query: '',
            pagenum: 1,
            pagesize: 2
        },
        // 订单列表数据
        orderlist: [],
        // 订单总条数
        total: 0
    };
  },
  created() {
      this.getOrderList();
  },
  methods: {
      // 获取订单数据列表
      async getOrderList(){
        const {data:res} = await this.$http.get('orders',{
            params: this.queryInfo
        });
        if (res.meta.status !== 200){
            return this.$message.error('获取订单数据列表失败！');
        }
        this.orderlist = res.data.goods;
        this.total = res.data.total;
      }
  }
};
</script>

<style lang="less" scoped></style>
