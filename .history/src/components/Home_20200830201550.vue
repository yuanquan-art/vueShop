<template>     
  <el-container>
  <el-header>
      <div>
          <img src="../assets/heima.png" alt="">
          <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
  </el-header>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
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
    }
}
.el-aside {
    background-color: rgb(91, 188, 233);
}
.el-main {
    background-color: rgb(22, 226, 114);
}
</style>