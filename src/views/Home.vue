<template>
  <!--公告栏-->
  <div>
    <div class="box">{{billboard}}</div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      // 展示在公告栏的数据
      billboard:"前端之王"
    }
  }
}
</script>
