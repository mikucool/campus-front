<template>
  <section>
      <!-- 是否登录 -->
      <login-welcome></login-welcome>
      <!-- 活动 -->
      <activity></activity>
      <!-- 推广 -->
      <promotion></promotion>
  </section>
</template>

<script>
import Activity from '@/views/card/Activity.vue'
import LoginWelcome from '@/views/card/LoginWelcome.vue'
import Promotion from '@/views/card/Promotion.vue'

export default {
  name: 'CardBar',
  components: {Activity, LoginWelcome, Promotion}
}
</script>
