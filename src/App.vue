<template>
  <div class="container">
    <div id="scoreboard">
      <score />
      <clock :timeLeft="timeLeft" />
      <score />
    </div>
    <div id="teams">
      <ul>
        <li>player 1</li>
        <li>player 1</li>
        <li>player 1</li>
        <li>player 1</li>
        <li>player 1</li>
      </ul>
      <ul>
        <li>player 1</li>
        <li>player 1</li>
        <li>player 1</li>
        <li>player 1</li>
        <li>player 1</li>
      </ul>
    </div>
    <div id="tabs">{{ store.state.game.team1.name }}</div>
  </div>
</template>

<script>
import score from "./components/score";
import clock from "./components/clock";
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  name: "App",
  components: { score, clock },
  setup() {
    const timeLeft = ref(600);
    const store = useStore();
    return { timeLeft, store };
  },
};
</script>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}
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
#teams {
  display: flex;
}
#tabs {
  background-color: aqua;
}
#scoreboard {
  display: flex;
  justify-content: space-evenly;
}
ul {
  flex: 1;
  padding: 8px;
}
ul > li {
  height: 48px;
  background-color: green;
  list-style-type: none;
  margin: 8px 0;
}
</style>
