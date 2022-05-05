<template>
  <el-card class="box-card" shadow="never">
    <div slot="header">
      <i class="el-icon-position">导航</i>
    </div>
    <div>
      <p v-for="(item, index) in list" :key="index" class="block">
        <!-- _blank:使用新的页面打开 -->
        <a :href="item.link" target="_blank">{{ item.title }}</a>
      </p>
    </div>
  </el-card>
</template>

<script>
import {getList} from '@/api/promotion'

export default {
  name: 'Promotion',
  data() {
    return {
      list: []
    }
  },
  created() {
    this.fetchList();
  },
  methods: {
    fetchList() {
      getList().then(response => {
        const {data} = response;
        this.list = data;
      })
    }
  }
}
</script>

<style scoped>
</style>
