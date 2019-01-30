<template>
  
</template>


<script>
import firebase from 'firebase'
import router from '@/router/routes'
  export default {
    router,
    mounted(){
      if(firebase.auth().currentUser){

      }else{
        router.push({
          name: 'Login'
        })
      }
    }
  };
</script>


<style>
</style>
