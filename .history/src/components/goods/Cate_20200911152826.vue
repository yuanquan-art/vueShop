<template>
    <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
        <!-- 添加按钮行 -->
        <el-row>
            <el-col>
                <el-button type="primary">添加分类</el-button>
            </el-col>
        </el-row>
      <!-- 用户列表渲染 -->
         <tree-table :data="goodslist" :columns="columns" :selection-type="false" :expand-type="false" show-index index-text="#"></tree-table>
    </el-card>
    </div>
</template>

<script>
export default {
    data () {
        return {
            cateInfo: {
             type: [],
             pagenum: 1,
             pagesize: 2
            },
            // 商品列表信息
            goodslist: [],
            // 总数据条数
            total: 0,
            columns: [
                { 
                 label: '分类名称',
                 prop: 'cat_name'
                }
            ]
        }
    },
    created () {
        // 获取商品分类数据
        this.getGoodsList();
    },
    methods: {
        // 获取商品分类数据
        async getGoodsList () {
            const {data:res} = await this.$http.get('categories',this.cateInfo)
            if (res.meta.status !== 200){
                return this.$message.error('获取失败！');
            }
            this.goodslist = res.data;
            this.total = res.total;
         }
    }
}
</script>

<style lang="less" scoped>

</style>