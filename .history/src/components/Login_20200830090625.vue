<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像区域 -->
           <div class="avatar_box">
               <img src="../assets/logo.png" alt="">
           </div>
           <!-- 登录表单区域 -->
           <el-form label-width="0px">
               <!-- 用户名 -->
              <el-form-item>
                 <el-input></el-input>
              </el-form-item>
              <!-- 密码 -->
              <el-form-item>
                 <el-input></el-input>
              </el-form-item>
              <!-- 登录 -->
<el-row>
  <el-button>默认按钮</el-button>
  <el-button type="primary">主要按钮</el-button>
  <el-button type="success">成功按钮</el-button>
  <el-button type="info">信息按钮</el-button>
  <el-button type="warning">警告按钮</el-button>
  <el-button type="danger">危险按钮</el-button>
</el-row>
              <!-- 重置 -->
           </el-form>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
 .login_container {
     background-color: rgb(91, 176, 209);
     height: 100%;
     position: relative;
 }
 .login_box {
    height: 400px;
    width: 500px;
    border-radius: 3px;
    background-color: rgb(194, 57, 228);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
 }
 .avatar_box {
     width: 100px;
     height: 100px;
     background-color: #ccc;
     border-radius: 50%;
     padding: 10px;
     margin: -50px auto 0;
     border: 1px solid #ccc;
     box-shadow: 0 0 10px #ddd;
     img {
         width: 100px;
         width: 100px;
         border-radius: 50%;
     }
 }
</style>
