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
        <el-table>
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
             query: "",
             pagenum: 1,
             pagesize: 2
            },
            goodslist: []
        }
    },
    created () {},
    methods: {}
}
</script>

<style lang="less" scoped>

</style>