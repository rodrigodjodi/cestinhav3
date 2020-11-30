<template>
  <div>
    <button>{{ clockTime }}</button>
  </div>
</template>


<script>
import { computed } from "vue";
export default {
  name: "clock",
  props: ["timeLeft"],
  setup(props) {
    const clockTime = computed(() => {
      var seconds = props.timeLeft % 60;
      if (seconds.toString().length <= 1) {
        seconds = "0" + seconds.toString();
      }
      var minutes = Math.trunc(props.timeLeft / 60) % 60;
      return minutes + ":" + seconds;
    });
    return { clockTime };
  },
};
</script>
<style scoped>
button {
  font-size: 2em;
  margin-top: 12px;
}
</style>
