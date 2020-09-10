<template>
    <div>
         <!-- 面包屑导航 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片区域 -->
        <el-card class="box-card">
           <div slot="header" class="clearfix">
             <span>卡片名称</span>
             <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
           </div>
           <div v-for="o in 4" :key="o" class="text item">
             {{'列表内容 ' + o }}
           </div>
        </el-card>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>
   .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>