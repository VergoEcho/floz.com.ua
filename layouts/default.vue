<template>
<section class="ruller">
          <vue-particles
        color="#645288"
        :particleOpacity="0.5"
        :particlesNumber="37"
        shapeType="circle"
        :particleSize="15"
        linesColor="#dedede"
        :linesWidth="0"
        :lineLinked="false"
        :lineOpacity="0.4"
        :linesDistance="500"
        :moveSpeed="6"
        :hoverEffect="true"
        hoverMode="buble"
        :clickEffect="false"
        clickMode="push"
      >
      </vue-particles>
<el-container>
  <el-header>
    <AppNavigation />
  </el-header>
  <el-main>
    <nuxt />
  </el-main>
  <el-footer />
</el-container>
</section>
</template>

<script>
import AppNavigation from '@/components/main/Navigation'
export default {
  components: {
    AppNavigation
  }
}
</script>

<style>
  .ruller{
    overflow: hidden;
  }
  #particles-js{
    background-size: cover;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: -10;
  }
   #particles-js canvas{
    width: 100vw;
    height: 100vw;
  }
  .el-header{
    position: fixed;
    height: 60px;
    z-index: 20;
  }
  .el-main{
    margin-top: 61px;
  }
</style>
