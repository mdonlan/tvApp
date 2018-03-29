<template>
  <div class="wrapper">
    <div class="title">Popular</div> 
    <div class="popularContainer container" v-if="popularTV">
      <div class="showContainer" v-for="show in popularTV" v-on:click="goToShowDetails($event)">
        <img class="tvImg" v-bind:src="'https://image.tmdb.org/t/p/original' + show.backdrop_path">
        <div class="showText">
          <div class="showName">{{show.name}}</div>
        </div>
        <div class="clickZone"></div>
      </div>
    </div>
    <div class="morePopular">More</div>
    <div class="airingTodayTitle title">Airing Today</div>
    <div class="airingTodayContainer container" v-if="airingToday">
      <div class="showContainer" v-for="show in airingToday" v-on:click="goToShowDetails($event)">
        <img class="tvImg" v-bind:src="'https://image.tmdb.org/t/p/original' + show.backdrop_path">
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
import $ from 'jquery';

export default {
  name: 'home',
  data () {
    return {
      popularTV: null,
      airingToday: null,
    }
  },
  created() {
    this.requestPopularTV();
    this.requestAiringToday();
  },
  methods: {
    requestPopularTV() {
      var self = this;
      axios({
        method:'get',
        url:'https://api.themoviedb.org/3/discover/tv?api_key=75234636e15f7c2463efbf69fd35b291&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false',
      })
      .then(function(response) {
        // only return the first 9 shows
        self.popularTV = response.data.results.slice(0,9);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    requestAiringToday() {
      var self = this;
      axios({
        method:'get',
        url:'https://api.themoviedb.org/3/tv/airing_today?api_key=75234636e15f7c2463efbf69fd35b291',
      })
      .then(function(response) {
        // only return the first 9 shows
        self.airingToday = response.data.results.slice(0,9);
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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #373837;
  color: #dddddd;
  min-height: 100%;
}

.container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 75%;
  height: 75%;
  min-height: 75%;
}

.showContainer {
  position: relative;
  height: 33.3%;
  width: 30%;
  cursor: pointer;
}

.showContainer:hover {
  opacity: 0.5;
}

.airingTodayContainer {
}

.title {
  margin-top: 15px;
  margin-bottom: 15px;
}

.tvImg {
  background: #111111;
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

.title {
  font-size: 32px;
  font-weight: bold;
}

.morePopular {
  width: 125px;
  height: 30px;
  background: rgba(43, 43, 43, 0.9);
  text-align: center;
  font-size: 24px;
  line-height: 30px;
  border-radius: 3px;
  cursor: pointer;
  transition: 1s all;
}

.morePopular:hover {
  opacity: 0.7;
  width: 175px;
}

</style>
