<template>
  <card class="card" type="user">
    <p class="card-text">
    </p>
    <div class="author">
      <div class="block block-one"></div>
      <div class="block block-two"></div>
      <div class="block block-three"></div>
      <div class="block block-four"></div>
      <a href="#">
        <img class="avatar" src="../../assets/user.png" alt="...">
      </a>
      <br>
      <form @submit.prevent="Login">
        <input type="email" placeholder="Enter E-Mail Address" v-model="Username">
        <input type="password" placeholder="Enter Password" v-model="Password">
        <br>
        <button @click="Login">Login</button>
      </form>
    </div>
  </card>
</template>

<script>
import firebase from 'firebase'
  export default {
    props: {
      user: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },
    data(){
      return {
        Username: '',
        Password: ''
      }
    },
    methods: {
      Login(){
        if(this.Username == 'admin@opticshub.com'){
          firebase.auth().signInWithEmailAndPassword(this.Username, this.Password).then((doc)=>{
            console.log(doc)
          }).catch((err)=>{
              this.$toast(err.message);
          })
        }else{
          this.$toast('Wrong Credentials. Please Try Again')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .card{
    form{
      input{
        padding: 0.7em;
        margin: 1em;
      }
      button{
        color: white;
        padding: 0.7em;
        background: black;
        border-radius: 9px;
        width: 200px;
        cursor: pointer;
        margin: 1em;
      }
    }
  }
</style>

