<template> 
 <!-- 整个页面区域 -->
  <el-container>
      <!-- 页面标题 -->
  <el-header>
      <div>
          <img src="../assets/heima.png" alt="">
          <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
  </el-header>
  <!-- 页面主体部分 -->
  <el-container>
    <el-aside width="200px">
        <!-- 侧边栏菜单区域 -->
       <el-menu
      background-color="rgb(91, 188, 233)"
      text-color="#000"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
    
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
    
    </el-menu>
    </el-aside>
    <el-main>Main</el-main>
  </el-container>
</el-container>

</template>

<script>
export default {
    methods: {
        logout () {
            // 清空token
            window.sessionStorage.clear();
            // 编程式导航重定向
            this.$router.push('/login');
        }
    }
}
</script>

<style lang="less" scoped>
.el-container {
    height: 100%;
}
.el-header {
    background-color: rgb(82, 11, 141);
    display: flex;
    justify-content: space-between;
    align-items: center;
    > div {
        display: flex;
        align-items: center;
        color: #fff;
        font-size: 30px;
        span {
            padding-left: 10px;
        }
    }
}
.el-aside {
    background-color: rgb(91, 188, 233);
}
.el-main {
    background-color: rgb(22, 226, 114);
}
</style>