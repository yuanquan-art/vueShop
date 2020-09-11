<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">权限管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
        123
    </el-card>
  </div>
</template>

<script>
export default {
    data () {
        return {
            //权限列表
            rightsList: []
        }
    },
    created () {
      // 获取所有权限
      this.getRightsList();
    },
    getRightsList () {
      // 获取权限列表
      this.$http.get('users/list')
    }
};
</script>

<style lang="less" scoped></style>
