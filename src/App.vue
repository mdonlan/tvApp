<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html, body {
  /* changed display to table to make body expand if child gets larger, which it does bc we're loading images */
  display: table;
  height: 100%;
  width: 100%;
  margin: 0px;
  padding-bottom: 1%;
  background: #373837;
}
#app {
  height: 100%;
  width: 100%;
  font-family: 'Work Sans', sans-serif;
}
</style>
