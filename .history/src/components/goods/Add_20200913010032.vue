<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <!-- 消息提示 -->
      <el-alert
        title="添加商品信息"
        type="info"
        center
        show-icon
        :closable="false"
      >
      </el-alert>
      <!-- 步骤条区域 -->
      <el-steps
        :space="200"
        :active="activeIndex - 0"
        finish-status="success"
        align-center
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- Tabs标签栏 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" label-position="top">
      <el-tabs tab-position="left" style="height: 200px;" v-model="activeIndex">
        <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
                <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
             <el-form-item label="商品价格" prop="goods_price" type="number">
                <el-input v-model="addForm.goods_price"></el-input>
            </el-form-item>
             <el-form-item label="商品重量" prop="goods_name">
                <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
             <el-form-item label="商品数量" prop="goods_name">
                <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name="1">商品参数</el-tab-pane>
        <el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>
        <el-tab-pane label="商品图片" name="3">商品图片</el-tab-pane>
        <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
      </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '0',
      //添加商品的表单数据规则
      addForm: {
          goods_name: '',
          goods_price: 0
      },
      addFormRules: {
          goods_name: [
              {
                  required: true,message: '请输入商品名称',trigger: 'blur'
              }
          ],
          goods_price: [
              {
                  required: true,message: '请输入商品价格',trigger: 'blur'
              }
          ]
      }
    };
  },
  created() {},
  methods: {}
};
</script>

<style lang="less" scoped></style>
