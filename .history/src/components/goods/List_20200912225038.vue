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
          <el-input
            placeholder="请输入内容"
          >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
            <el-button type="primary">
                添加按钮
            </el-button>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <el-table :data="goodslist">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="goods_name" label="商品名称"></el-table-column>
          <el-table-column prop="goods_price" label="商品价格"></el-table-column>
          <el-table-column prop="goods_weight" label="商品重量"></el-table-column>
          <el-table-column prop="add_time" label="添加时间"></el-table-column>
          <el-table-column label="caozuo">
              <template slot-scope="scope">
                  <el-button class="el-icon-edit" type="warning">编辑</el-button>
                  <el-button type="danger" class="el-icon-delete">删除</el-button>
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
      // 商品查询参数
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 2
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
      this.$message.success("获取商品列表信息成功！");
      
      this.goodslist = res.data.goods;
      this.total = res.data.total;
console.log(this.total)
    }
  }
};
</script>

<style lang="less" scoped></style>
