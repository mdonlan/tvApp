<template>
  <div class="searchWrapper">
    <div class="searchBarContainer">
        <div class="searchInput" contenteditable="true" spellcheck="false" v-on:keyup="checkKey" placeholder="search..."></div>
        <div class="searchSubmitButton" v-on:click="clickedSearch()">Search</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import $ from 'jquery';

export default {
  name: 'search',
  data () {
    return {
        searchInputValue: null,
    }
  },
  created() {

  },
  filters: {

  },
  methods: {
    clickedSearch() {
      var self = this;
      var searchInputValue = $(".searchInput")[0].textContent;
      if(searchInputValue != '') {
        self.searchInputValue = searchInputValue;
        
          self.$router.push({
            name: 'searchResults', 
            query: {query: self.searchInputValue}, 
            params: {id: ''}
          });
        
        // forces search results page to refresh when entering new search when already on search results page
        /*
        this.$router.go({
            name: 'searchResults', 
            query: {query: self.searchInputValue}, 
            params: {id: ''}
          })
        */
      }
    },
    checkKey(event) {
      var key = event.keyCode;
      if(key == 13) {
        event.preventDefault();
        console.log('clicked enter');
        return false;
      }
    },
  }
}

$(document).on('keypress', '.searchInput', function(e){
  if(e.which == 13) {
    $(".searchSubmitButton").trigger("click"); 
  }
  return e.which != 13;
}); 

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.searchWrapper {
  margin-top: 25px;
  margin-bottom: 25px;
}

.searchBarContainer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 30px;
  width: 350px;
}

.searchInput {
  height: 100%;
  width: 60%;
  background: #222222;
  color: #dddddd;
  line-height: 30px;
  padding-left: 5px;
  border-radius: 3px;
  overflow: hidden;
  position: relative;
  outline: none;
  transition: 1s;
}

/* 
  use this to put placeholder text in contentedible 
  placeholder var is placeholder value in div
*/
[contenteditable=true]:empty:not(:focus):before{
  content: attr(placeholder);
  display: block; /* For Firefox */
  opacity: 0.7;
  cursor:text;
}

.searchSubmitButton {
  border: 1px solid #dddddd;
  color: #dddddd;
  transition: 0.2s all linear;
  height: 25px;
  line-height: 25px;
  width: 30%;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
}

.searchSubmitButton:hover {
  background: #18c97f;
  color: #222222;
}

@media screen and (max-width: 480px) {
  .searchBarContainer {
    width: 100%;
  }

  .searchWrapper {
    width: 80%;
  }
}

</style>
