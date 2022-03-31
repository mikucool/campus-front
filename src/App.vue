<template>
  <div>
    <div class="mb-6">
      <Header></Header>
    </div>
    <br>
    <div class="container context">
      <router-view :key="this.$route.fullPath"></router-view>
    </div>

    <div>
      <Footer></Footer>
    </div>
    
  </div>
</template>

<script>
import Header from "@/components/Layout/Header.vue"
import Footer from "@/components/Layout/Footer.vue"


export default {
  name: "App",
  components: {Header, Footer}
};

</script>

<style>

</style>
