<template>
    <div class="product">
        <agile :autoplay="true" :arrows="false" :dots="false" :speed=1000>
            <div v-for="(image,index) in product.data.DisplayImages" :key="index" class="slide">
                <img :src="image" alt="">
            </div>
        </agile>
        <h3>{{product.data.Name}}</h3>
        <div class="flex">
            <button @click="editProduct" class="edit">Edit</button>
            <button @click="deleteProduct" class="delete">Delete</button>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import router from '@/router/index'
export default {
    router,
    props: ['product'],
    methods: {
        editProduct(){var vm = this;
            this.$router.push({
                name: 'notifications',
                params: {
                    product: vm.product
                }
            })
        },
        deleteProduct(){var vm = this;
            if(confirm("Are You Sure?")){
                firebase.firestore().collection("Products").doc(this.product.id).delete().then(()=>{
                    vm.$toast("Product Deleted");
                })
            }
        }
    },
}
</script>

<style lang="scss" scoped>
    .product{
        height: 250px;
        width: 250px;
        h3{
            margin: 0.3em;
        }
        button{
            margin: 0.5em;
            border: none;
            border-radius: 9px;
            padding: 0.7em;
            width: 40%;
            cursor: pointer;
        }
        .edit{
            background: lightyellow;
        }
        .delete{
            background: lightpink;
        }
    }
</style>

