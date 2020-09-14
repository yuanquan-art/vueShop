<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <!-- 警告区域 -->
      <el-alert
        title="注意：只能修改第三级的参数"
        type="warning"
        :closable="false"
        show-icon
      >
      </el-alert>
      <!-- 选择商品分类区域 -->
      <el-row class="cat_opt">
        <el-col>
          <span>选择商品分类：</span>
          <!-- 选择商品分类的级联选择框 -->
          <el-cascader
            expand-trigger="hover"
            :options="catelist"
            :props="cateProps"
            v-model="selectedCateKeys"
            @change="handleChange"
          >
          </el-cascader>
        </el-col>
      </el-row>
      <!-- Tabs标签切换 -->
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="动态参数" name="many">
          <!-- 添加参数按钮 -->
          <el-row>
            <el-col>
              <el-button type="primary" size="mini" :disabled="isBtnDisabled">添加参数</el-button>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <!-- 添加属性按钮 -->
          <el-row>
            <el-col>
              <el-button type="primary" size="mini" :disabled="isBtnDisabled">添加属性</el-button>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 商品分类列表
      catelist: [],
      // 级联选择框的配置对象
      cateProps: {
        value: "cat_id",
        label: "cat_name",
        children: "children"
      },
      // 级联选择框双向绑定到的数组
      selectedCateKeys: [],
      // 被激活的页签名称
      activeName: "many",
      //获取参数列表
      paramslist: []
    };
  },
  created() {
    this.getCateList();
  },
  methods: {
    // 获取商品分类数据列表
    async getCateList() {
      const { data: res } = await this.$http.get("categories");
      if (res.meta.status !== 200) {
        return this.$message.error("获取数据列表信息失败！");
      }
      this.catelist = res.data;
    },
    // 级联选择框选中项变化，会触发这个函数
    async handleChange() {
      // 证明选中的不是三级分类
      if (this.selectedCateKeys.length !== 3) {
        this.selectedCateKeys = [];
      }
      // 证明选中的是三级分类
      console.log(this.selectedCateKeys);
      // 根据所选分类的Id，和当前所处的面板，获取对应的参数
      const {data:res} = await this.$http.get(`categories/${this.cateId}/attributes`,{
         params: { 
           sel: this.activeName
         }
       });
       if (res.meta.status !== 200){
         return this.$message.error('获取参数列表失败');
       }
       this.paramslist = res.data;
    },
    // Tab页签点击事件的处理函数
    handleTabClick() {
      console.log(this.activeName);
    }
  },
  // 计算属性
  computed: {
    // 如果按钮需要被禁用，则返回true,否则返回false
    isBtnDisabled() {
      if (this.selectedCateKeys.length !== 3) {
        return true;
      }
      return false; 
    },
    // 当前选中的三级分类的Id
    cateId () {
      if (this.selectedCateKeys.length === 3){
        return this.selectedCateKeys[2];
      }
      return null;
    }
  }
};
</script>

<style lang="less" scoped>
.cat_opt {
  margin: 15px 0;
}
</style>
