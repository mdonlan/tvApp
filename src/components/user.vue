<template>
  <div class="wrapper">
      <div>hello user</div>
      <div v-on:click="logOut">log out</div>
  </div>
</template>

<script>
import axios from 'axios';
import $ from 'jquery';
import firebase from 'firebase';

export default {
  name: 'user',
  data () {
    return {
      
    }
  },
  created() {

  },
  filters: {

  },
  methods: {
    logOut() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    
  }
}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>
