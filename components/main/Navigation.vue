<template>
<el-row class="nav" type="flex" justify="space-between">

    <nuxt-link class="logo-block" to="/">
        <img class="logo" src="@/assets/logo.svg" alt="">
        <h1 hidden-xs-only class="logo-text">Парфюмерия на распив</h1>
    </nuxt-link>
<el-menu router class="" active-text-color="#775696" mode="horizontal">
    <el-menu-item v-if="!auth" index="/login">Войти</el-menu-item>
    <el-menu-item v-if="!auth" index="/register">Зарегистрироваться</el-menu-item>
  
  <el-submenu v-else  index="4">
    <template slot="title">{{user.login}}</template>
    <el-menu-item index="2-1"><i class="el-icon-s-custom"></i>My page</el-menu-item>
    <el-menu-item ><i class="el-icon-shopping-cart-2"></i> Cart</el-menu-item>
    <el-menu-item index="/logout"><i class="el-icon-delete"></i> Logout</el-menu-item>
  </el-submenu>
  
  
</el-menu>
</el-row>
</template>

<script>
export default {
    data (){
        return {
            activeIndex: '1'
        }
    },
    computed: {
        user () {
            return this.$store.getters['auth/user']
        },
        auth () {
            return this.$store.getters['auth/isAuthenticated']
        }
    }    
}
</script>

<style lang="scss" scoped>
    .logo-block{
        display: flex;
    }
    .logo{
        height: 71px;
        top: 0;
        position: fixed;
    }
    .logo-text{
        font-family: 'Marck Script', cursive;
        font-size: 20px;
        margin-left: 75px;
        color: #645288;
        display: none;
    }
    h1{
        text-align: center;
        align-self: center;
    }
    .nav{
        width: calc(100vw - 56px);
        background-color: white;
        border-bottom: 1px solid #e6e6e6;
    }
    .el-menu{
        border-bottom: none;
    }
    @media screen and (min-width: 600px) {
    .logo-text {
        display: inline;
    }
  }
</style>