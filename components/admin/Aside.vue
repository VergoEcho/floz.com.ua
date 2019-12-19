<template>
  <el-menu
  router
   :style="{height: '100%'}"
   :default-active="$route.path"
  >
    <el-menu-item index="/admin">
      <i class="el-icon-bell"></i>
      <span>Подтверждение заказа</span>
    </el-menu-item>
        <el-menu-item index="/admin/create">
      <i class="el-icon-edit-outline"></i>
      <span>Создать</span>
    </el-menu-item>
        <el-menu-item index="/admin/products">
      <i class="el-icon-document"></i>
      <span>Продукты</span>
    </el-menu-item>
        <el-menu-item index="/admin/users">
      <i class="el-icon-s-custom"></i>
      <span>Пользователи</span>
    </el-menu-item>
    <el-menu-item index="/admin/logout">
      <i class="el-icon-close"></i>
      <span>Выйти</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>