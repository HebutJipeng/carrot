<template>
  <div>
    <div id="lottie" class="lottie"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import lottie from "lottie-web";
const data = require("../assets/json/lf20_zizREI.json");

@Component({})
export default class Lottie extends Vue {
  mounted() {
    lottie.loadAnimation({
      container: document.getElementById("lottie"), // the dom element that will contain the animation
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: data
    });
  }
}
</script>

<style lang="scss" scoped>
.lottie {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 0 auto;
  width: 100%;
  max-width: 500px;
}
</style>
