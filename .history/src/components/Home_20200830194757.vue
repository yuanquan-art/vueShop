<template>     
   <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header><el-button type="info" @click="logout">退出</el-button></el-header>
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

</style>