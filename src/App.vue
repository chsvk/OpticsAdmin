<template>
  <div>
    <notifications></notifications>
    <user-card v-if="notLoggedIn"/>
    <router-view v-else :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import UserCard from '@/pages/Profile/UserCard'
import firebase from 'firebase'
  export default {
    components: {
      UserCard
    },
    data(){
      return{
        notLoggedIn: true
      }
    },
    methods: {
      disableRTL() {
        if (!this.$rtl.isRTL) {
          this.$rtl.disableRTL();
        }
      },
      toggleNavOpen() {
        let root = document.getElementsByTagName('html')[0];
        root.classList.toggle('nav-open');
      }
    },
    mounted() {
      var vm = this;
      firebase.auth().onAuthStateChanged((user)=>{
        if(user){
          console.log(firebase.auth().currentUser)
          vm.notLoggedIn = false
        }else{
          vm.notLoggedIn = true;
        }
      })
      this.$watch('$route', this.disableRTL, { immediate: true });
      this.$watch('$sidebar.showSidebar', this.toggleNavOpen)
    }
  };
</script>

<style lang="scss"></style>
