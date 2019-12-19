<template>
    <article class="product">
        <header class="product-header">
            <div class="product-title">
                <h1>{{product.name}}</h1>

            </div>
            <div class="product-img">
                <img :src="product.imageUrl" alt="product img">
            </div>
        </header>
        <main class="product-content">
            <vue-markdown>{{product.text}}</vue-markdown>
        </main>
        <footer>
            <app-comment-form
                v-if="auth"
                @created="createCommentHandler"
            />

            <div class="comments" v-if="product.comments.length">
                <app-comment
                    v-for="comment in product.comments"
                    :key="comment"
                    :comment="comment"
             />
            </div>
            <div class="text-center" v-else>Коментариев нет</div>
        </footer>
    </article>
</template>

<script>
import AppComment from '@/components/main/Comment'
import AppCommentForm from '@/components/main/CommentForm'
import { async } from 'q'
export default {
    validate({params}){
        return Boolean(params.id)
    },
    async asyncData({store, params}) {
        const product = await store.dispatch('product/fetchById', params.id)
        return {product}
    },
    data() {
        return{
            canAddComment: true
        }
    },
    methods: {
        createCommentHandler() {
            this.canAddComment = false
        }
    },
    computed: {
        user () {
            return this.$store.getters['auth/user']
        },
        auth () {
            return this.$store.getters['auth/isAuthenticated']
        }
    },
    components: {AppComment , AppCommentForm}
}
</script>

<style lang="scss" scoped>
    .product {
        max-width: 600px;
        margin: 0 auto;
    }

    .product-title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }

    .product-info{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: .5rem;
    }

    .product-img img{
        width: 100%;
        height: auto;
    }

    .product-header{
        margin-bottom: 1.5rem;
    }

    .product-content{
        margin-bottom: 2rem;
    }
</style>