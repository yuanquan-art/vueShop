<template>
    <div>
        商品列表
    </div>
</template>

<script>
export default {
    data () {
        return {
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
            const {data:res} = await this.$http.get('') 
        }
    }
}
</script>

<style lang="less" scoped>

</style>