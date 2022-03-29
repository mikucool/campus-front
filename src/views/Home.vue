<template>
  <div>
    <!--公告栏-->
    <div class="box">{{billboard.description}}</div>
    <!-- 使用 bulma 做出两列的布局 -->
    <div class="columns">
      <div class="column is-three-quarters">
        <TopicList></TopicList>
      </div>
      <div class="column ">
        <CardBar></CardBar>
      </div>
    </div>
  </div>
</template>

<script>
import {getBillboard} from '@/api/billboard'  // 公告栏组件
import CardBar from '@/views/card/CardBar'  // 侧边栏组件
import PostList from '@/views/post/index'   // 帖子列表组件

export default {
  name: 'Home',
  components: {CardBar, TopicList: PostList},
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
