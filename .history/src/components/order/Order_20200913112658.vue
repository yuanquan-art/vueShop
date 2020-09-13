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
      <el-table :data="orderlist">
          <el-table-column type="index"></el-table-column>
          <el-table-column label=""></el-table-column>
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
