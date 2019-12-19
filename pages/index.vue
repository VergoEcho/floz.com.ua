<template>
  <el-row class="content-row" type='flex' align="middle">
    <el-carousel height="450px">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3 class="small">{{ item }}</h3>
      
      <h2 class="subTitle">Lorem ipsum dolor sit.</h2>
      </el-carousel-item>
    </el-carousel>
    <div class="list">
      
      <app-card
        v-for="product in chunk[page]"
        :key="product._id"
        :product="product"
       />

    </div>
       <el-pagination
        layout="pager"
        :total="products.length"
        :page-size="2"
        @current-change="handleCurrentChange">
      </el-pagination>
  </el-row>
</template>

<script>
import AppCard from '@/components/main/Card'
export default {
  head: {
    title: 'Главная'
  },
  data() {
    return {
      page: 0,
      pagination: [],
      
    }
  },
  async asyncData(context){
    const products = await context.store.dispatch('product/fetch')
    return {products}
  },
  computed: {
    chunk() { 
        return this._.chunk(this.products, 2)
      }
  },
  methods: {
    handleCurrentChange (val) {
      this.page = val - 1
    }
  },
  components: {
    AppCard
  }
}
</script>

<style scoped>

  .content-row{
    flex-direction: column;
  }
  .el-carousel{
    width: 100%;
  }
  .el-carousel__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
   .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .subTitle{
    margin-bottom: 40px;
  }
  .list {
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
  }
  @media screen and (min-width: 680px) {
    .list {
    grid-template-columns: 1fr 1fr;
    }
  }
  @media screen and (min-width: 950px) {
    .list {
    grid-template-columns: 1fr 1fr 1fr;
    }
  }
  @media screen and (min-width: 1170px) {
    .list {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }
  @media screen and (min-width: 1500px) {
    .list {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }
  }
</style>

