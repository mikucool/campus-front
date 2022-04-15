<template>
  <el-card class="box-card" shadow="never">
    <div slot="header">
      <span>欢迎~~~</span>
    </div>

    <div v-if="token != null && token !== ''" class="has-text-centered">
      <router-link
        :to="{
          name: 'user-home',
          params: { username: user.username },
        }"
      >
        <el-avatar :size="64" :src="user.avatar" />
      </router-link>
      <br />
      <p class="mt-3">{{ user.alias || user.username }}</p>
      <p class="content">
        积分：<code>{{ user.score }}</code>
      </p>
    </div>
    <hr>
    <div v-if="token != null && token !== ''" class="has-text-centered">
      <b-button
        type="is-danger"
        tag="router-link"
        :to="{ path: '/post/create' }"
        outlined
        >发帖</b-button
      >
      <b-button
        type="is-primary"
        tag="router-link"
        :to="{ path: `/chat/${user.username}` }"
        outlined
        class="ml-2"
        >聊天</b-button
      >
    </div>

    <div v-else class="has-text-centered">
      <b-button
        type="is-primary"
        tag="router-link"
        :to="{ path: '/register' }"
        outlined
        >注册</b-button
      >
      <b-button
        type="is-danger"
        tag="router-link"
        :to="{ path: '/login' }"
        outlined
        class="ml-2"
        >登录</b-button
      >
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "LoginWelcome",
  // 计算属性
  computed: {
    // 获取状态数据
    ...mapGetters(["token", "user"]),
  },
};
</script>

<style scoped>
</style>