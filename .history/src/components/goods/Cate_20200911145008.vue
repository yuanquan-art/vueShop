<template>
    <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
        <!-- 添加按钮行 -->
        <el-row>
            <el-col>
                <el-button type="primary">添加分类</el-button>
            </el-col>
        </el-row>
        <!-- 表格区域 -->
        <el-table>
            <el-table-column type="index"></el-table-column>
        </el-table>
    </el-card>
    </div>
</template>

<script>
export default {
    data () {
        return {}
    },
    created () {},
    methods: {}
}
</script>

<style lang="less" scoped>

</style>