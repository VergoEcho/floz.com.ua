<template>
    <div class="page-wrap">
    <el-breadcrumb class="mb" separator="/">
        <el-breadcrumb-item to="/admin/products">Товары</el-breadcrumb-item>
        <el-breadcrumb-item>{{product.name}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form
      :model="controls"
      :rules="rules"
      ref="form"
      @submit.native.prevent="onSubmit"
    >
      <!-- <h2>Войти в панель администратора</h2> -->

      <el-form-item label="Текст в формате .md или .html" prop="text">
        <el-input
        type="textarea"
         v-model.trim="controls.text"
         resize="none"
         :rows="10"
         />
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          native-type="submit"
          round
          :loading="loading"
        >
          Обновить
        </el-button>
      </el-form-item>
    </el-form>
    </div>
</template>

<script>
export default {
    layout: 'admin',
    middleware: ['admin-auth'],
    head() {
        return {
            title: `${this.product.name}`
        }
    },
    validate({params}) {
        return Boolean(params.id)
    },
    async asyncData({store, params}) {
        const product = await store.dispatch('product/fetchAdminById', params.id)
        return {product}
    },
    data() {
    return {
      loading: false,
      controls: {
        text: ''
      },
      rules: {
        // text: [
        //   { required: true, message: 'Текст не должен быть пустым', trigger: 'blur' }
        // ]
      }
    }
  },
  mounted() {
    this.controls.text = this.product.text
  },
  methods: {
      onSubmit() {
          this.$refs.form.validate(async valid => {
              if (valid){
                  this.loading = true
            
              const formData = {
                  text: this.controls.text,
                  id: this.product._id
              }
                try {
                    await this.$store.dispatch('product/update', formData)
                    this.$message.success('Продукт обновлен')
                    this.loading = false
                } catch (e) {
                    this.loading = false
                }
              }
          })
      }
  }
}
</script>

<style lang="scss" scoped>
    .page-wrap {
        width: 600px;
    }
</style>