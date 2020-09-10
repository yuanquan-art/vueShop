<template>
    <div>
         <!-- 面包屑导航 -->
        <el-breadcrumb separator="/home">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>

</style>