<template>
    <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
        <!-- 添加按钮行 -->
        <el-row>
            <el-col>
                <el-button type="primary">添加分类</el-button>
            </el-col>
        </el-row>
      <!-- 用户列表渲染 -->
        <el-table :data="goodslist">
            <el-table-column type="index"></el-table-column>
            <el-table-column label="分类名称" prop="username"></el-table-column>
            <el-table-column label="是否有效" prop="email"></el-table-column>
            <el-table-column label="排序" prop="mobile"></el-table-column>
            <el-table-column label="操作"></el-table-column>
        </el-table>
    </el-card>
    </div>
</template>

<script>
export default {
    data () {
        return {
            cateInfo: {
             type: [],
             pagenum: 1,
             pagesize: 2
            },
            goodslist: []
        }
    },
    created () {
        this.getGoodsList();
    },
    methods: {
        async getGoodsList () {
            const {data:res} = await this.$http.get('categories',this.cateInfo)
            if (res.meta.status !== 200){
                return this.$message.error('获取失败！');
            }
            this.goodslist = res.data;
         }
    }
}
</script>

<style lang="less" scoped>

</style>