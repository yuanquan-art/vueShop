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
        // 获取商品列表数据
        async getGoodsList () {
            const {data:res} = await this.$http.get('goods',{
                params: this.queryInfo
            }); 
            console.log(res)
        }
    }
}
</script>

<style lang="less" scoped>

</style>