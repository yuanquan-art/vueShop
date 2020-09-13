<template>
    <div>
        商品列表
    </div>
</template>

<script>
export default {
    data () {
        return {
            // 商品查询参数
            queryInfo : {
               query: '',
               pagenum: 1,
               pagesize: 2
            },
            // 商品列表数据
            goodslist: []
        }
    },
    created () {
        this.getGoodsList();
    },
    methods: {
        // 根据分页获取商品列表数据
        async getGoodsList () {
            const {data:res} = await this.$http.get('goods',{
                params: this.queryInfo
            }); 
            if (res.meta.status !== 200){
                return this.$message.error('获取商品列表信息失败！');
            }
            this.$message.success('获取商品列表信息成功！');
            this.goodslist = res.data;
        }
    }
}
</script>

<style lang="less" scoped>

</style>