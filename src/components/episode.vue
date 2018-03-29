<template>
  <div class="wrapper">
    <div class="episodeContainer" v-if="episode">
      <div class="top">
        <div class="episodeImg item">
          <img v-bind:src="'https://image.tmdb.org/t/p/w500' + episode.still_path">        
        </div>
        <div class="episodeText item">
          <div class="episodeName">{{episode.name}} ({{episode.season_number}}x{{episode.episode_number | checkIfOverTen}})</div>
          <div class="episodeOverview">{{episode.overview}}</div>
        </div>
      </div>
      <div class="bottom">
        <div class="item">
          <div>Original Air Date</div>
          <div>{{episode.air_date}}</div>
        </div>

        <!--
        <div class="crewContainer item">
          
          <div>Crew</div>
          <div class="crew" v-for="crew in episode.crew">
            <div class="crewImgContainer">
              <div class="item">
                <img class="crewImg" v-bind:src="'https://image.tmdb.org/t/p/w185' + crew.profile_path">        
              </div>
            </div>
            <div class="crewText">
              <div class="item">
                <div class="left">Job:</div>
                <div>{{crew.job}}</div>
              </div>
              <div class="item">
                <div class="left">Name:</div>
                <div>{{crew.name}}</div>
              </div>
            </div>
          </div>
          
        </div>

        <div class="guestStarsContainer">
          <div>Guest Stars</div>
          <div class="guest" v-for="guest in episode.guest_stars">
            <div class="guestImgContainer">
              <div class="item">
                <img class="guestImg" v-bind:src="'https://image.tmdb.org/t/p/w185' + guest.profile_path">        
              </div>
            </div>
            <div class="crewText">
              <div class="item">
                <div class="left">Character:</div>
                <div>{{guest.character}}</div>
              </div>
              <div class="item">
                <div class="left">Name:</div>
                <div>{{guest.name}}</div>
              </div>
            </div>
          </div>
        </div>
        -->

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import $ from 'jquery';

export default {
  name: 'episode',
  data () {
    return {
      onEpisode: null,
      show: null,
      showID: null,
      onSeason: null,
      episode: null,
    }
  },
  created() {
    this.setOnEpisodeAndShow();
    this.loadEpisodeData();
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
    setOnEpisodeAndShow() {
      var self = this;
      self.onEpisode = this.$route.query.episode;
      self.show = this.$route.query.show;
      self.showID = this.$route.query.id;
      self.onSeason = this.$route.query.season;
    },
    loadEpisodeData() {
      var self = this;
      axios({
        method:'get',
        url:'https://api.themoviedb.org/3/tv/' + self.showID + '/season/' + self.onSeason + '/episode/' + self.onEpisode + '?api_key=75234636e15f7c2463efbf69fd35b291',
      })
      .then(function(response) {
        self.episode = response.data;
      })
      .catch(function (error) {
        console.log(error);
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
  color: #dddddd;
}

.episodeContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}

.item {
  display: flex;
}

.top {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.episodeText {
  flex-direction: column;
  width: 50%;
  align-items: center;
}

.episodeImg {
  flex-direction: column;
  width: 50%;
  height: 100%;
  align-items: center;
}

.episodeName {
  font-size: 24px;
  font-weight: bold;
}

.bottom {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
}

.crewContainer, .guestContainer {
  display: flex;
  flex-direction: column;
}

.crew, .guest {
  display: flex;
  flex-direction: row;
}

.crewImg, .guestImg {
  height: 100px;
  width: 66px;
}

.crewText, .guestText {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.left {
  margin-right: 10px;
}

</style>
