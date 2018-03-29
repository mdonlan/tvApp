<template>
  <div class="wrapper">
    <div class="seasonContainer" v-if="season">
      <div class="seasonTitle">Season {{season.season_number}}</div>
      <div class="seasonOverview">{{season.overview}}</div>
      <div class="episodeContainer">
        <div class="episode" v-for="episode in season.episodes">
          <div class="clickZone" v-on:click="clickedEpisode($event)"></div>
          <div class="episodeImgSection">
            <img class="episodeImg" v-bind:src="'https://image.tmdb.org/t/p/w185' + episode.still_path">
          </div>
          <div class="episodeTextSection">
            <div class="episodeNumber">Episode {{episode.episode_number}}</div>
            <div>
              {{episode.name}} ({{episode.season_number}}x{{episode.episode_number | checkIfOverTen}})
            </div>
            <div class="episodeOverview">
              {{episode.overview}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import $ from 'jquery';

export default {
  name: 'season',
  data () {
    return {
      showID: null,
      season: null,
      onSeason: null,
      show: null,
    }
  },
  created() {
    this.setInitialData();
    this.checkForShowID();
  },
  filters: {
    checkIfOverTen: function (string) {
      var oldString = string;
      if(string < 10) {
        string = '0' + oldString;
        return string
      } else {
        return string
      }
    },
  },
  methods: {
    setInitialData() {
      var self = this;
      self.onSeason = this.$route.query.season;
      self.show = this.$route.query.show;
      self.showID = this.$route.query.id;
    },
    checkForShowID() {
      var self = this;

      if(typeof this.$route.params.id != 'undefined') {
        self.showID = this.$route.params.id;
        this.loadSeasonData();
      } else {
        var showName = this.$route.query.show;
        axios({
          method:'get',
          url:'https://api.themoviedb.org/3/search/tv?api_key=75234636e15f7c2463efbf69fd35b291&query=' + showName,
        })
        .then(function(response) {
          self.showID = response.data.results[0].id;
          self.loadSeasonData();
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    },
    loadSeasonData() {
      var self = this;
      axios({
        method:'get',
        url:'https://api.themoviedb.org/3/tv/' + self.showID + '?api_key=75234636e15f7c2463efbf69fd35b291&append_to_response=season/' + self.onSeason,
      })
      .then(function(response) {
        self.season = response.data["season/" + self.onSeason];
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    clickedEpisode(event) {
      var self = this;
      var epsiodeClicked = event.target.parentElement.children[2].children[0].textContent;
      epsiodeClicked = epsiodeClicked.split("Episode ");
      self.$router.push({
        name: 'episode', 
        query: {show: self.show, season: self.onSeason, episode: epsiodeClicked[1], id: self.showID}, 
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
  display: flex;
  flex-direction: column;
  align-items: center;
}

.seasonContainer {
  display: flex;
  flex-direction: column;
  width: 50%;
}

.season {
  display: flex;
}

.episode {
  display: flex;
  margin-top: 5px;
  margin-bottom: 5px;
  position: relative;
}

.clickZone {
  height: 100%;
  width: 100%;
  position: absolute;
}

</style>
