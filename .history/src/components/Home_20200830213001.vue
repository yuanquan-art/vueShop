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
      <!-- 一级菜单 -->
      <el-submenu index="1" v-for="item in menulist">
          <!-- 一级菜单模板区域 -->
        <template slot="title">
            <!-- 图标 -->
          <i class="el-icon-location"></i>
             <!-- 文本 -->
          <span>导航一</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item index="1-4-1">
            <template slot="title">
            <!-- 图标 -->
          <i class="el-icon-location"></i>
             <!-- 文本 -->
          <span>导航一</span>
        </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
    </el-aside>
    <el-main>Main</el-main>
  </el-container>
</el-container>

</template>

<script>
export default {
    data () {
        return {
            // 左侧菜单数据
            menulist: []
        }
    },
    created () {
       this.getMenuList();
    },
    methods: {
        // 自定义方法
        logout () {
            // 清空token
            window.sessionStorage.clear();
            // 编程式导航重定向
            this.$router.push('/login');
        },
        async getMenuList () {
           const { data: res } = await this.$http.get('menus');
           console.log(res)
           if ( res.meta.status !== 200 ) return this.$message.error(res.meta.msg);
           this.menulist = res.data;
           console.log(res)
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