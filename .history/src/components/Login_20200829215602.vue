<template>
    <div class="login_container">
        <div class="login_box">
           <div class="avatar_box">
               <img src="../assets/logo.png" alt="">
           </div>
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
     width: 50px;
     height: 50px;
     border-radius: 50%;
 }
</style>
