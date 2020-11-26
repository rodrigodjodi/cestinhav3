<template>
  <div id="app">
    <div class="container">
      <div id="score" class="bg-pink-400">a</div>
      <div id="teams" class="bg-green-400">b</div>
      <div id="tabs" class="bg-yellow-400">c</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  components: {},
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.container {
  height: 100%;
  display: grid;
  grid-gap: 0;
  grid-template-rows: 72px 320px auto;
}
</style>
