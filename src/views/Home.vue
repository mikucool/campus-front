<template>
  <div>
    <!--公告栏-->
    <div class="box">{{billboard.description}}</div>
  </div>
</template>

<script>
import {getBillboard} from '@/api/billboard'

export default {
  name: 'Home',
  data() {
    return {
      // 展示在公告栏的数据
      billboard: {
        description: ''
      }
    }
  },
  created() {
    this.fetchBillboard()
  },
  methods : {
    // 异步方法，请求获取 billboard 的方法
    async fetchBillboard() {
      getBillboard().then((value) => {
        const { data } = value  // value：返回的 billboard 对象
        this.billboard = data
      })
    },
  }
}
</script>
