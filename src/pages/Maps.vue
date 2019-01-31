<template>
  <div class="products">
    <product v-for="(product,index) in products" :key="index" v-if="!product.data.Name==''" :product="product"/>
  </div>
</template>

<script>
import Product from './Product'
import firebase from 'firebase'
export default {
  components: {
    Product
  },
  data(){
    return{
      products: []
    }
  },
  mounted(){var vm = this;
    firebase.firestore().collection('Products').onSnapshot((doc)=>{
      vm.products = [];
      doc.forEach((doc)=>{
        vm.products.push({
          id: doc.id,
          data: doc.data()
        });
      })
    })
  }
}
</script>

<style lang="scss" scoped>
  .products{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
</style>
