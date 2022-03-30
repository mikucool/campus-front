<template>
  <div>
    <div class="mb-6">
      <Header></Header>
    </div>
    <br>
    <div class="container context">
      <router-view :key="this.$route.fullPath"></router-view>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Layout/Header.vue"

export default {
  name: "App",
  components: {Header}
};

</script>

<style>

</style>
