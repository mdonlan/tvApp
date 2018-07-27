<template>
  <div class="airingTodayContainer">
    <div class="pageTitle">Airing Today</div>
    <div class="airingTodayShows">
      <div class="showContainer" v-for="show in airingTodayShows" v-on:click="goToShowDetails($event, show)">
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

export default {
  name: 'airingToday',
  data () {
    return {
     airingTodayShows: null,
     totalPages: null,
     onPage: 1,
    }
  },
  created() {
    this.getAiringToday();
  },
  filters: {

  },
  methods: {

    getAiringToday() {
      //console.log('loading airing today shows')
      var self = this;
      axios({
        method:'get',
        url:'https://api.themoviedb.org/3/tv/airing_today?api_key=75234636e15f7c2463efbf69fd35b291&page=' + self.onPage,
      })
      .then(function(response) {

        let data = response.data;
        self.totalPages = data.total_pages;
        self.onPage = data.page;

        // if shows have already been added 
        if(self.airingTodayShows) {
          let oldShows = self.airingTodayShows;
          let newShows = data.results;
          newShows.forEach(function(show) {
            oldShows.push(show);
          }) 
          self.airingTodayShows = oldShows;
        } else {
          self.airingTodayShows = data.results;
        }
        
        // if not all pages have loaded keep loading them
        if(self.onPage < self.totalPages) {
          self.onPage = self.onPage + 1;
          self.getAiringToday()
        } else if(self.onPage == self.totalPages) {
          // if all data is loaded 
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },

    goToShowDetails(event, show) {
      var self = this;
      
      self.$router.push({
        name: 'show', 
        query: {name: show.name}, 
        params: {id: show.id}
      });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.airingTodayContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.airingTodayShows {
  width: 75%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 50px;
}

.pageTitle {
  font-size: 24px;
  color: #dddddd;
  margin-top: 50px;
}

.showContainer {
  position: relative;
  height: 33.3%;
  width: 30%;
  cursor: pointer;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
}

.showContainer:hover {
  opacity: 0.5;
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

</style>
