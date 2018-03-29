<template>
  <div class="wrapper">
    <div class="episodeContainer" v-if="episode">
      <div>{{episode.name}}</div>
      <div>{{episode.overview}}</div>
      <img v-bind:src="'https://image.tmdb.org/t/p/w185' + episode.still_path">
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


</style>
