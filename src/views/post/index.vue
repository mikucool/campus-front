<template>
  <div>
    <el-card shadow="never">
      <div slot="header" class="clearfix">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="最新" name="latest">
            <!-- 帖子列表信息 -->
            <article
              v-for="(item, index) in articleList"
              :key="index"
              class="media"
            >
              <div class="media-left">
                <figure class="image is-48x48">
                  <img
                    :src= item.avatar
                    style="border-radius: 5px"
                  />
                </figure>
              </div>

              <div class="media-content">
                <div class="">
                  <p>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      :content="item.title"
                      placement="top"
                    >
                      <router-link
                        :to="{ name: 'post-detail', params: { id: item.id } }"
                      >
                        <span class="is-size-6">{{ item.title }}</span>
                      </router-link>
                    </el-tooltip>
                  </p>
                  <p class="ellipsis is-ellipsis-3">
                    {{ item.content }}
                  </p>
                </div>
                <nav class="level has-text-grey is-mobile is-size-7 mt-2">
                  <div class="level-left">
                    <div class="level-left">
                      <router-link class="level-item" :to="{path: `/member/${item.username}/home`}">
                        {{ item.alias }}
                      </router-link>
                      
                      <span class="mr-1">
                        发布于：{{ dayjs(item.createTime).format("YYYY/MM/DD") }}
                      </span>
                      
                      <span v-for="(tag, index) in item.tags" :key="index" class="tag is-hidden-mobile is-success is-light mr-1">
                        <router-link :to="{ name: 'tag', params: {name:tag.name}}">
                          {{ '#' + tag.name }}
                        </router-link>
                      </span>

                      <span class="is-hidden-mobile">浏览：{{ item.view }}</span>

                    </div>
                  </div>
                </nav>
              </div>
              <div class="media-right" />
            </article>
          </el-tab-pane>

          <el-tab-pane label="热门" name="hot">
            <!-- 帖子列表信息 -->
            <article
              v-for="(item, index) in articleList"
              :key="index"
              class="media"
            >
              <!-- 头像 -->
              <div class="media-left">
                <figure class="image is-48x48">
                  <img
                    :src= item.avatar
                    style="border-radius: 5px"
                  />
                </figure>
              </div>

              <!-- 文章部分 -->
              <div class="media-content">
                <div class="">
                  <p>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      :content="item.title"
                      placement="top"
                    >
                      <router-link
                        :to="{ name: 'post-detail', params: { id: item.id } }"
                      >
                        <span class="is-size-6">{{ item.title }}</span>
                      </router-link>
                    </el-tooltip>
                  </p>
                  <p class="ellipsis is-ellipsis-3">
                    {{ item.content }}
                  </p>
                </div>
                <nav class="level has-text-grey is-mobile is-size-7 mt-2">
                  <div class="level-left">
                    <div class="level-left">
                      <router-link class="level-item" :to="{path: `/member/${item.username}/home`}">
                        {{ item.alias }}
                      </router-link>
                      
                      <span class="mr-1">
                        发布于：{{ dayjs(item.createTime).format("YYYY/MM/DD") }}
                      </span>
                      
                      <span v-for="(tag, index) in item.tags" :key="index" class="tag is-hidden-mobile is-success is-light mr-1">
                        <router-link :to="{ name: 'tag', params: {name:tag.name}}">
                          {{ '#' + tag.name }}
                        </router-link>
                      </span>

                      <span class="is-hidden-mobile">浏览：{{ item.view }}</span>

                    </div>
                  </div>
                </nav>
              </div>
              <div class="media-right" />
            </article>
          </el-tab-pane>

          <el-tab-pane label="爱好" name="hobby">
            <!-- 帖子列表信息 -->
            <article
              v-for="(item, index) in articleList"
              :key="index"
              class="media"
            >
              <div class="media-left">
                <figure class="image is-48x48">
                  <img
                    :src= item.avatar
                    style="border-radius: 5px"
                  />
                </figure>
              </div>

              <div class="media-content">
                <div class="">
                  <p>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      :content="item.title"
                      placement="top"
                    >
                      <router-link
                        :to="{ name: 'post-detail', params: { id: item.id } }"
                      >
                        <span class="is-size-6">{{ item.title }}</span>
                      </router-link>
                    </el-tooltip>
                  </p>
                  <p class="ellipsis is-ellipsis-3">
                    {{ item.content }}
                  </p>
                </div>
                <nav class="level has-text-grey is-mobile is-size-7 mt-2">
                  <div class="level-left">
                    <div class="level-left">
                      <router-link class="level-item" :to="{path: `/member/${item.username}/home}`}">
                        {{ item.alias }}
                      </router-link>
                      
                      <span class="mr-1">
                        发布于：{{ dayjs(item.createTime).format("YYYY/MM/DD") }}
                      </span>
                      
                      <span v-for="(tag, index) in item.tags" :key="index" class="tag is-hidden-mobile is-success is-light mr-1">
                        <router-link :to="{ name: 'tag', params: {name:tag.name}}">
                          {{ '#' + tag.name }}
                        </router-link>
                      </span>

                      <span class="is-hidden-mobile">浏览：{{ item.view }}</span>

                    </div>
                  </div>
                </nav>
              </div>
              <div class="media-right" />
            </article>
          </el-tab-pane>

          <el-tab-pane label="交易" name="trade">
            <!-- 帖子列表信息 -->
            <article
              v-for="(item, index) in articleList"
              :key="index"
              class="media"
            >
              <div class="media-left">
                <figure class="image is-48x48">
                  <img
                    :src= item.avatar
                    style="border-radius: 5px"
                  />
                </figure>
              </div>

              <div class="media-content">
                <div class="">
                  <p>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      :content="item.title"
                      placement="top"
                    >
                      <router-link
                        :to="{ name: 'post-detail', params: { id: item.id } }"
                      >
                        <span class="is-size-6">{{ item.title }}</span>
                      </router-link>
                    </el-tooltip>
                  </p>
                  <p class="ellipsis is-ellipsis-3">
                    {{ item.content }}
                  </p>
                </div>
                <nav class="level has-text-grey is-mobile is-size-7 mt-2">
                  <div class="level-left">
                    <div class="level-left">
                      <router-link class="level-item" :to="{path:'/member/${item.username/home}'}">
                        {{ item.alias }}
                      </router-link>
                      
                      <span class="mr-1">
                        发布于：{{ dayjs(item.createTime).format("YYYY/MM/DD") }}
                      </span>
                      
                      <span v-for="(tag, index) in item.tags" :key="index" class="tag is-hidden-mobile is-success is-light mr-1">
                        <router-link :to="{ name: 'tag', params: {name:tag.name}}">
                          {{ '#' + tag.name }}
                        </router-link>
                      </span>

                      <span class="is-hidden-mobile">浏览：{{ item.view }}</span>

                    </div>
                  </div>
                </nav>
              </div>
              <div class="media-right" />
            </article>
          </el-tab-pane>

          <el-tab-pane label="求助" name="help">
            <!-- 帖子列表信息 -->
            <article
              v-for="(item, index) in articleList"
              :key="index"
              class="media"
            >
              <div class="media-left">
                <figure class="image is-48x48">
                  <img
                    :src= item.avatar
                    style="border-radius: 5px"
                  />
                </figure>
              </div>

              <div class="media-content">
                <div class="">
                  <p>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      :content="item.title"
                      placement="top"
                    >
                      <router-link
                        :to="{ name: 'post-detail', params: { id: item.id } }"
                      >
                        <span class="is-size-6">{{ item.title }}</span>
                      </router-link>
                    </el-tooltip>
                  </p>
                  <p class="ellipsis is-ellipsis-3">
                    {{ item.content }}
                  </p>
                </div>
                <nav class="level has-text-grey is-mobile is-size-7 mt-2">
                  <div class="level-left">
                    <div class="level-left">
                      <router-link class="level-item" :to="{path:'/member/${item.username/home}'}">
                        {{ item.alias }}
                      </router-link>
                      
                      <span class="mr-1">
                        发布于：{{ dayjs(item.createTime).format("YYYY/MM/DD") }}
                      </span>
                      
                      <span v-for="(tag, index) in item.tags" :key="index" class="tag is-hidden-mobile is-success is-light mr-1">
                        <router-link :to="{ name: 'tag', params: {name:tag.name}}">
                          {{ '#' + tag.name }}
                        </router-link>
                      </span>

                      <span class="is-hidden-mobile">浏览：{{ item.view }}</span>

                    </div>
                  </div>
                </nav>
              </div>
              <div class="media-right" />
            </article>
          </el-tab-pane>

          <el-tab-pane label="问答" name="question">
            <!-- 帖子列表信息 -->
            <article
              v-for="(item, index) in articleList"
              :key="index"
              class="media"
            >
              <div class="media-left">
                <figure class="image is-48x48">
                  <img
                    src="https://cn.gravatar.com/avatar/${item.userId}?s=164&d=monsterid"
                    style="border-radius: 5px"
                  />
                </figure>
              </div>

              <div class="media-content">
                <div class="">
                  <p>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      :content="item.title"
                      placement="top"
                    >
                      <router-link
                        :to="{ name: 'post-detail', params: { id: item.id } }"
                      >
                        <span class="is-size-6">{{ item.title }}</span>
                      </router-link>
                    </el-tooltip>
                  </p>
                  <p class="ellipsis is-ellipsis-3">
                    {{ item.content }}
                  </p>
                </div>
                <nav class="level has-text-grey is-mobile is-size-7 mt-2">
                  <div class="level-left">
                    <div class="level-left">
                      <router-link class="level-item" :to="{path:'/member/${item.username/home}'}">
                        {{ item.alias }}
                      </router-link>
                      
                      <span class="mr-1">
                        发布于：{{ dayjs(item.createTime).format("YYYY/MM/DD") }}
                      </span>
                      
                      <span v-for="(tag, index) in item.tags" :key="index" class="tag is-hidden-mobile is-success is-light mr-1">
                        <router-link :to="{ name: 'tag', params: {name:tag.name}}">
                          {{ '#' + tag.name }}
                        </router-link>
                      </span>

                      <span class="is-hidden-mobile">浏览：{{ item.view }}</span>

                    </div>
                  </div>
                </nav>
              </div>
              <div class="media-right" />
            </article>
          </el-tab-pane>
        </el-tabs>
      </div>

      <!-- 分页 -->
      <pagination 
        v-show="page.total > 0"
        :total="page.total"
        :page.sync="page.current"
        :limit.sync="page.size"
        @pagination="init"
        />
    </el-card>
  </div>
</template>

<script>
import { getList } from "@/api/post";
import Pagination from '@/components/Pagination/index.vue'  //分页组件


export default {
  name: "TopicList",
  components: {Pagination},
  data() {
    return {
      activeName: "latest",
      articleList: [],
      page: {
        current: 1, // 当前页码
        size: 10, // 每页帖子数量
        total: 0, // 总页数，默认为零
        tab: 'latest' // 当前页面类型
      }
    };
  },
  created() {
    this.init(this.tab);
  },
  methods: {
    init(tab) {
      getList(this.page.current, this.page.size, tab).then((response) => {
        const { data } = response;
        this.page.current = data.current
        this.page.total = data.size
        this.articleList = data.records;
      });
    },
    // 切换帖子类型
    handleClick(tab) {
      console.log(tab);
      this.init(tab.name);
    },
  },
};
</script>
