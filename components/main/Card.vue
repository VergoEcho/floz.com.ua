<template>
<el-col class="card">
    <el-card
    shadow='hover'
    :body-style="{padding: 0}"
    class='card'
    >
    <header slot="header" class="post-header">
        <h3>{{product.name}}</h3><span></span>
    </header>
    <div class="post-body">
        <img
          :src="product.imageUrl"
          alt=""
          class="post-img"
        >
    </div>
    <footer class="post-footer">
        <div class="maxVal">{{ml}}</div>
        <el-button type="danger" @click="openItem">Подробнее</el-button>
    </footer>
    </el-card>
</el-col>
</template>

<script>
export default {
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    data(){
        return {
            ml: this.product.maxValue + " мл"
        }
    },
    methods:{
        openItem(){
            const id = this.product._id
            this.$router.push(`/product/${id}`)
        }
    }
}
</script>

<style lang="scss" scoped>
    .post-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .post-body {
        display: flex;
        justify-content: center;
    }
    .post-img {
        width: 100%;
    }
    .post-footer {
        padding: 10px;
        display: flex;
        justify-content: space-between;
    }
    .maxVal {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
    }
    .card {
        width: 250px;
        justify-self: center;
        align-self: center;
    }
</style>