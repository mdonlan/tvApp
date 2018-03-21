<template>
  <div class="wrapper">
    <div class="popularTVWrapper">
      <div class="showContainer" v-if="popularTV" v-for="show in popularTV" v-on:click="goToShowDetails($event)">
        <img class="tvImg" v-bind:src="'https://image.tmdb.org/t/p/w500' + show.backdrop_path">
        <div class="showText">
          <div class="showName">{{show.name}}</div>
        </div>
        <div class="clickZone"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'home',
  data () {
    return {
      popularTV: null,
    }
  },
  created() {
    this.requestPopularTV();
  },
  methods: {
    requestPopularTV() {
      var self = this;
      axios({
        method:'get',
        url:'https://api.themoviedb.org/3/discover/tv?api_key=75234636e15f7c2463efbf69fd35b291&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false',
        //url:'https://api.themoviedb.org/3/tv/popular?api_key=75234636e15f7c2463efbf69fd35b291',
      })
      .then(function(response) {
        self.popularTV = response.data.results;
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    goToShowDetails(event) {
      var self = this;
      
      // find show id
      // currently doing this by getting the show name from the DOM element
      // then using the name to loop through all the shows in data and find matching to get ID
      var clickedShowname = event.target.previousElementSibling.children[0].innerHTML;
      for(var i = 0; i < self.popularTV.length; i++) {
        if(self.popularTV[i].name == clickedShowname) {
          var selectedShowID = self.popularTV[i].id;
        }
      }
      //clickedShowname = clickedShowname.replace(/\s+/g, '');
      self.$router.push({
        name: 'show', 
        query: {name: clickedShowname}, 
        params: {id: selectedShowID}
      });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.wrapper {
  height: 100%;
  width: 100%;
}

.popularTVWrapper {
  display: flex;
  flex-wrap: wrap;
}

.showContainer {
  position: relative;
  margin: 15px;
}

.tvImg {
  height: 100%;
  width: 100%;
}

.showText {
  position: absolute;
  bottom: 0px;
  padding-left: 10px;
  width: calc(100% - 10px);
  height: 25px;
  line-height: 25px;
  background: rgba(43, 43, 43, 0.9);
}

.showName {
  color: #dddddd;
}

.clickZone {
  position: absolute;
  top: 0px;
  height: 100%;
  width: 100%;
}

</style>
