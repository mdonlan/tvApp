<template>
  <div class="wrapper">
    <div class="pageTitle">Search Results</div>
    <div class="searchResultsContainer" v-if="results">
      <div class="result" v-for="result in results" v-on:click="goToShowDetails($event)">
        <img class="showPosterImg" v-bind:src="'https://image.tmdb.org/t/p/w185' + result.poster_path">
        <div class="showText">
          <div class="showName">{{result.name}}</div>
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
  name: 'searchResults',
  data () {
    return {
      results: null,
      totalPages: null,
    }
  },
  watch: {
    '$route.params.id': function (id) {
      console.log(id)
      this.doSearch();
    }
  },
  created() {
    this.doSearch();
  },
  filters: {

  },
  methods: {
    doSearch() {
      var self = this;
      console.log(this.$route.query.query);
        axios({
          method:'get',
          //url:'http://api.themoviedb.org/3/tv/search/' + self.searchInputValue + '?api_key=75234636e15f7c2463efbf69fd35b291',
          url:'https://api.themoviedb.org/3/search/tv?api_key=75234636e15f7c2463efbf69fd35b291&language=en-US&query=' + this.$route.query.query + '&page=1',
        })
        .then(function(response) {
          self.results = response.data.results;
          self.totalPages = response.data.total_pages
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    goToShowDetails(event) {
      var self = this;
      console.log(event.target);
      // find show id
      // currently doing this by getting the show name from the DOM element
      // then using the name to loop through all the shows in data and find matching to get ID
      var clickedShowname = event.target.previousElementSibling.children[0].innerHTML;
      for(var i = 0; i < self.results.length; i++) {
        if(self.results[i].name == clickedShowname) {
          var selectedShowID = self.results[i].id;
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
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: #dddddd;
}

.searchResultsContainer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  height: 50%;
  width: 50%;
}

.result {
  position: relative;
  display: flex;
  align-items: center;
  height: 278px;
  width: 185px;
  cursor: pointer;
  margin: 10px;
}

.result:hover {
  opacity: 0.5;
}

.showPosterImg {
  height: 100%;
  width: 100%;
}

.showText {
  position: absolute;
  bottom: 0px;
  background: rgba(43, 43, 43, 0.9);
  width: 100%;
  display: flex;
  justify-content: center;
}

.showName {
  text-align: center;
}

.pageTitle {
  font-size: 32px;
  font-weight: bold; 
  margin-bottom: 50px;
}

.clickZone {
  position: absolute;
  height: 100%;
  width: 100%;
}

</style>
