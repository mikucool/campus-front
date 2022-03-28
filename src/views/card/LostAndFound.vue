<template>
  <el-card class="box-card" shadow="never">
    <div slot="header">
      <span>失物招领</span>
    </div>
    <div>
        <!-- 居左对齐 -->
      <div class="has-text-left block"> 
        {{ item.content }}
      </div>
        <!-- 居右对齐，并且距离上面的内容由 5 个像素点的距离 -->
      <div class="has-text-right mt-5 block">
        ——{{ item.poster }}
      </div>
    </div>
  </el-card>
</template>

<script>
import {getItem} from '@/api/item'

export default {
  name: 'LostAndFound',
  data() {
    return {
      item: {
        content: '',
        poster: ''
      }
    }
  },
  created() {
    this.fetchItem()
  },
  methods: {
    fetchItem() {
      getItem().then(response => {
        const { data } = response
        this.item = data
      })
    }
  }
}
</script>

<style scoped>

</style>
