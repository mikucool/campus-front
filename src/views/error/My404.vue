<template>
  <div class="columns mt-6">
    <div class="column mt-6">
      <div class="mt-6">
        <p class="content">UH OH! 页面被吃掉了</p>
        <p class="content subtitle mt-6">
          您所寻找的页面不存在， {{ times }} 秒后，将返回首页!
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "My404",
  data() {
    return {
      times: 10
    }
  },
  created() {
    this.goHome();
  },
  // 计数方法
  methods: {
    goHome: function () {
      // 这个方法启动了一个定时器，每个一秒执行一次箭头表达式
      this.timer = setInterval(() => {
        this.times--
        if (this.times === 0) {
          clearInterval(this.timer) // 清除定时器
          this.$router.push({path: '/'});
        }
      }, 1000)
    }
  }
}
</script>