<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <!-- 警告区域 -->
      <el-alert title="注意：只能修改第三级的参数" type="warning" :closable="false" show-icon> </el-alert>
      <!-- 选择商品分类区域 -->
      <el-row class="cat_opt">
          <el-col>
              <span>选择商品分类：</span>
              <!-- 选择商品分类的级联选择框 -->
          </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
        // 商品分类列表
        catelist: []
    };
  },
  created() {
      this.getCateList();
  },
  methods: {
      // 获取商品分类数据列表
      async getCateList () {
        const {data:res} = await this.$http.get('categories');
        if (res.meta.status !== 200) {
            return this.$message.error('获取数据列表信息失败！');
        }
        this.catelist = res.data;
        console.log(this.catelist)
      }
  }
};
</script>

<style lang="less" scoped>
.cat_opt {
    margin: 15px 0;
}
</style>
