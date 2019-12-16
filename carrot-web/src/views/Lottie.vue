<template>
  <div id="lottie" class="lottie"></div>
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
