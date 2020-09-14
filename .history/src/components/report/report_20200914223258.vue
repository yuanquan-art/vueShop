<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">数据统计</a></el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
         <!--2. 为ECharts准备一个具备大小（宽高）的Dom -->
    <div id="main" style="width: 600px;height:400px;"></div>
    </el-card>
  </div>
</template>

<script>
// 1. 导入echarts
import echarts from 'echarts'
export default {
  data() {
      
  },
  created() {
  },
  // Dom元素已经渲染完毕
  async mounted() {
       // 3.基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));

         const {data: res} =await  this.$http.get('reports/type/1');
         if(res.meta.status !== 200){
             return this.$message.error('获取图表数据失败！');
         }
        // 4.指定图表的配置项和数据
       
        // 5.展示数据
        myChart.setOption(res.data);
  },
  methods: {
  }
};
</script>

<style lang="less" scoped></style>
