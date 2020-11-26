<template>
  <div class="container mx-auto">
    <h1 class="text-6xl text-center">{{ message }}</h1>
  </div>
</template>

<script>
import { ref, toRefs } from "vue";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  setup(props) {
    const { msg } = toRefs(props);
    return { message: msg };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
