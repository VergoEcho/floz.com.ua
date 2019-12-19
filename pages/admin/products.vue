<template>
    <el-table
    :data="products"
    style="width: 100%"
    :highlight-current-row="products.flask"
    >

    <el-table-column
        prop="name"
        label="Название"
    />
    <el-table-column
        prop="price"
        label="Цена/1мл"
    />
    <el-table-column
        prop="maxValue"
        label="Кол-во мл"
    />
    <el-table-column
        prop="sex"
        label="Пол"
    />
    <el-table-column
        prop="brand"
        label="Бренд"
    />
    <el-table-column
        prop="flask"
        label="Флакон"
    />

    <el-table-column
      label="Коментарии">
      <template slot-scope="{row: {comments}}">
        <i class="el-icon-chat-dot-square"></i>
        <span style="margin-left: 10px">{{ comments.length }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="Изменить">
      <template slot-scope="{row}">

      <el-button
          icon="el-icon-edit"
          @click="open(row._id)"
          />

    </template>
    </el-table-column>
    <el-table-column
    label="Удалить">
    <template slot-scope="{row}">

      <el-button
          icon="el-icon-delete"
          type="danger"
          @click="remove(row._id)"
          />

        
        
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
    layout: 'admin',
    middleware: ['admin-auth'],
    async asyncData({store}) {
        const products = await store.dispatch('product/fetchAdmin')
        products.forEach(el => {
            el.flask = el.flask.toString()
            })
        return {products}
    },
    data() {
        return{
           
        }
    },
    methods: {
        open(id) {
            this.$router.push(`/admin/product/${id}`)
        },
        async remove(id) {
            try {
                await this.$confirm('Удалить продукт?', "Внимание!", {
                    confirmButtonText: 'Да',
                cancelButtonText: 'Отменить',
                type: 'warning'
            })
            await this.$store.dispatch('product/remove', id)
            this.products = this.products.filter(p => p._id !== id)
            
            this.$message.success('Товар удален')
            } catch (e) {

            }  
        }
    }
}
</script>