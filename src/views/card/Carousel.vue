<template>
  <b-carousel
    :indicator-inside="true"
    :autoplay="autoPlay"
    :pause-hover="pauseHover"
    :interval="interval"
    :repeat="repeat"
    :indicator="indicator"
    :indicator-background="indicatorBackground"
    :indicator-mode="indicatorMode"
    :indicator-position="indicatorPosition"
    :indicator-style="indicatorStyle"
  >
    >
    <b-carousel-item v-for="(item, i) in imgs.length" :key="i">
        
      <div>
        <router-link
          :to="{ name: 'post-detail', params: { id: topicVOs[i].id } }"
        >
          <el-image
            class="image"
            :src="imgs[i]"
            style="width: 1080px; height: 450px"
            :fit="fit"
          ></el-image>
        </router-link>
        <h1>
          <strong>{{ topicVOs[i].title }}</strong>
          <figure class="image is-48x48">
            <el-avatar :size="34" :src="topicVOs[i].avatar" />
          </figure>
        </h1>
        <h5>
          <router-link
            class="level-item"
            :to="{ path: `/member/${topicVOs[i].username}/home` }"
          >
            {{ topicVOs[i].alias }}
          </router-link>
        </h5>
      </div>
    </b-carousel-item>
  </b-carousel>
</template>

<script>
import { getEssenceTopic } from "@/api/post";
export default {
  data() {
    return {
      topicVOs: [],
      imgs: [],
      fit: "cover",

      autoPlay: true,
      pauseHover: false,
      pauseInfo: false,
      repeat: true,
      pauseType: "is-primary",
      interval: 5000,

      indicator: true,
      indicatorBackground: true,
      indicatorInside: true,
      indicatorMode: "hover",
      indicatorPosition: "is-bottom",
      indicatorStyle: "is-lines",
    };
  },

  created() {
    getEssenceTopic().then((response) => {
      const { data } = response;
      this.topicVOs = data;
      // 取出每一精贴的第一张图片存放到imgs中,matcher[2]为匹配出来图片url
      for (let i = 0; i < this.topicVOs.length; i++) {
        let str = this.topicVOs[i].content;
        const pattern = /!\[(.*?)\]\((.*?)\)/gm;
        let matcher;
        if ((matcher = pattern.exec(str)) !== null) {
          this.imgs.push(matcher[2]);
        }
      }
    });
  },
  methods: {},
};
</script>

<style>
.is-active .al img {
  filter: grayscale(0%);
}
.al img {
  filter: grayscale(100%);
}

div {
  position: relative;
}
h1 {
  font-size: 32px;
  color: rgb(0, 0, 0);
  position: absolute;
  top: 300px;
  left: 40px;
}

h5 {
  font-size: 17px;
  color: rgb(0, 0, 0);
  position: absolute;
  top: 360px;
  left: 80px;
}
</style>