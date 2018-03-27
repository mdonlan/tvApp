<template>
  <div class="wrapper">
      
      <div></div>
      <div class="favoriteData" v-if="this.$store.state.favorites">
        <div v-for="show in favorites">
          {{show.name}}
        </div>
      </div>
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
      //favorites: this.$store.state.favorites,
    }
  },
  created() {

  },
  filters: {

  },
  computed: {
    favorites: function() {
      return this.$store.state.favorites;
    }
  },
  methods: {
    
  }
}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>
