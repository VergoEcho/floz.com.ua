<template>
    <el-form
      :model="controls"
      :rules="rules"
      ref="form"
      @submit.native.prevent="onSubmit"
    >
    
        <h1 class="mb">Добавить продукт</h1>

    <el-form-item label="Введите имя товара" prop="name">
        <el-input
         v-model="controls.name"
         />
      </el-form-item>

      <el-form-item label="Текст в формате .md или .html" prop="text">
        <el-input
        type="textarea"
         v-model="controls.text"
         resize="none"
         :rows="10"
         />
      </el-form-item>

      <el-button class="mb" type="success" plain @click="previewDialog = true">
          Предпросмотр
      </el-button>

        <el-dialog title="Предпросмотр"
          :visible.sync="previewDialog"
          >
          <div :key="controls.text">
          <vue-markdown>{{controls.text}}</vue-markdown>
          </div>
        </el-dialog>

        <el-form-item label="Введите цену товара" prop="price">
        <el-input
         v-model="controls.price"
         />
        </el-form-item>

        <el-form-item label="Введите количество(мл) товара" prop="maxValue">
        <el-input
         v-model="controls.maxValue"
         />
        </el-form-item>

        <el-form-item label="Введите пол (м, ж, у) на русском маленьким шрифтом" prop="sex">
         <el-input
         v-model="controls.sex"
         />
        </el-form-item>

        <el-form-item label="Введите производителя товара" prop="brand">
        <el-input
         v-model="controls.brand"
         />
        </el-form-item>

        <el-form-item label="С флаконом" prop="flask">
         <el-checkbox v-model="controls.flask">
           Да
           </el-checkbox>
        </el-form-item>

        <el-upload
      class="mb"
      drag
      ref="upload"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-change="handleImageChange"
      :auto-upload="false"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">Перетащите картинку <em>или нажмите</em></div>
      <div class="el-upload__tip" slot="tip">файлы с расширением jpg/png</div>
    </el-upload>

      <el-form-item>
        <el-button
          type="primary"
          native-type="submit"
          round
          :loading="loading"
        >
          Добавить продукт
        </el-button>
      </el-form-item>
    </el-form>
</template>

<script>
export default {
    layout: 'admin',
    middleware: ['admin-auth'],
    data() {
    return {
      image: null,
      previewDialog: false,
      loading: false,
      controls: {
        name: '',
        text: '',
        price: '',
        maxValue: '',
        sex: '',
        brand: '',
        flask: false
      },
      rules: {
        name: [
          { required: true, message: 'Название продукта не может быть пустым', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
      handleImageChange(file, fileList) {
          this.image = file.raw
      },
      onSubmit() {
          this.$refs.form.validate(async valid => {
              if(valid && this.image){
                  this.loading = true

                  const formData = {
                      name: this.controls.name,
                      text: this.controls.text,
                      image: this.image,
                      price: this.controls.price,
                      maxValue: this.controls.maxValue,
                      sex: this.controls.sex,
                      brand: this.controls.brand,
                      flask: this.controls.flask
                  }
                  console.log(formData)
                    try {
                  await this.$store.dispatch('product/create', formData)
                  this.controls.name = ''
                  this.controls.text = ''
                  this.image = null
                  this.controls.price = ''
                  this.controls.maxValue = ''
                  this.controls.sex = ''
                  this.controls.brand = ''
                  this.controls.flask = ''
                  this.$refs.upload.clearFiles()
                  this.$message.success('Продукт добавлен')
                  } catch(e) {} finally {
                      this.loading = false
                  }
              } else {
                  this.$message.warning('Форма не валидна')
              }
          })
      }
  }
}
</script>

<style lang="scss" scoped>
    form {
        width: 600px;
    }
</style>