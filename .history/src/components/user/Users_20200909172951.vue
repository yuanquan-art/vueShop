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
           <!-- 搜索与添加 -->
           <div style="margin-top: 15px;">
              <el-input placeholder="请输入内容" >
              <el-button slot="append" icon="el-icon-search"></el-button>
             </el-input>
           </div>
        </el-card>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>

</style>