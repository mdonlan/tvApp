<template>
  <div class="loginWrapper">
    <input type="text" v-model="email" placeholder="Email">
    <input type="password" v-model="password" placeholder="Password">
    <div v-on:click="login">Login</div>
  </div>
</template>

<script>
import axios from 'axios';
import $ from 'jquery';
import firebase from 'firebase';

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: '',
    }
  },
  created() {

  },
  filters: {

  },
  methods: {
    login() {
      var self = this;
      firebase.auth().signInWithEmailAndPassword(self.email, self.password).then(
        function(user) {
          //alert("welcome " + firebase.auth().currentUser.uid);
          self.$router.push({
            name: 'user'
          });
        },
        function(error) {
          alert("failed to login." + error.message);
        }
      )
    },
  }
}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>
