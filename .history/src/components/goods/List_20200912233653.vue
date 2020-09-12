<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <!-- 搜索区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getGoodsList">
            <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">
            添加按钮
          </el-button>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <el-table :data="goodslist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称"></el-table-column>
        <el-table-column
          prop="goods_price"
          label="商品价格"
          width="90px"
        ></el-table-column>
        <el-table-column
          prop="goods_weight"
          label="商品重量"
          width="75px"
        ></el-table-column>
        <el-table-column label="添加时间" width="140px">
          <template slot-scope="scope">
            {{ scope.row.add_time | dataFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130px">
          <template slot-scope="scope">
            <el-button
              class="el-icon-edit"
              type="primary"
              size="mini"
            ></el-button>
            <el-button
              type="danger"
              class="el-icon-delete"
              size="mini"
             @click="removeById(scope.row.)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页功能 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 商品查询参数
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 5
      },
      // 商品列表数据
      goodslist: [],
      // 商品数据总条数
      total: 0
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    // 根据分页获取商品列表数据
    async getGoodsList() {
      const { data: res } = await this.$http.get("goods", {
        params: this.queryInfo
      });
      if (res.meta.status !== 200) {
        return this.$message.error("获取商品列表信息失败！");
      }
      this.goodslist = res.data.goods;
      this.total = res.data.total;
    },
    // 监听页面数据的条数
    handleSizeChange (newSize) {
        this.queryInfo.pagesize = newSize;
        this.getGoodsList();
    },
    // 监听当前页的变化
    handleCurrentChange (newPage) {
        this.queryInfo.pagenum = newPage;
        this.getGoodsList();
    }
  }
};
</script>

<style lang="less" scoped></style>
