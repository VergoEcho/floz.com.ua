<template>
    <div>Очищаем данные</div>
</template>

<script>
export default {
    beforeCreate() {
        this.$store.dispatch('auth/logout')
        this.$router.push('/?message=logout')
    }
}
</script>