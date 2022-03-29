import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from  './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义模块，便于管理存储的数据
  modules: {
    user
  },
  getters
})

export default store