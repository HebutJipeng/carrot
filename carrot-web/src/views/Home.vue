<template>
  <section class="home">
    <h1>Peng's Collection</h1>
    <ul>
      <li>
        <router-link :to="{ name: 'game' }">List of discount games</router-link>
      </li>
    </ul>
    <Lottie />
  </section>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Lottie from "@/views/Lottie.vue";

export default {
  name: "home",
  components: {
    Lottie
  }
};
</script>

<style lang="scss" scoped>
.home {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 0 auto;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h1 {
    text-align: center;
  }
  ul {
    li {
      a {
        color: #584f60;
      }
    }
  }
}
</style>
