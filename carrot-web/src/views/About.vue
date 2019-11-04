<template>
  <div class="about">
    <h1>{{ greet }}</h1>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class About extends Vue {
  greet: string = "This is an about page";
  mounted() {
    // console.log(123);
  }
}
</script>
