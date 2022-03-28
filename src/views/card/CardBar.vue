<template>
  <section>
      <!-- 是否登录 -->
      <login-welcome></login-welcome>
      <!-- 失物招领 -->
      <lost-and-found></lost-and-found>
      <!-- 推广 -->
      <promotion></promotion>
  </section>
</template>

<script>
import LostAndFound from '@/views/card/LostAndFound.vue'
import LoginWelcome from '@/views/card/LoginWelcome.vue'
import Promotion from '@/views/card/Promotion.vue'

export default {
  name: 'CardBar',
  components: {LostAndFound, LoginWelcome, Promotion}
}
</script>
