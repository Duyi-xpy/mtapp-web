import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  position: '内蒙古',
  cnt: 0
}

const mutations = {
  setPosition (state, val) {
    state.position = val
  },
  setCnt (state, val) {
    state.cnt = val
  }
}
const actions = {
  setPosition ({ commit }, val) {
    // 异步请求数据后端获取当前位置数据
    commit('setPosition', val)
  },
  setCnt ({commit}, val) {
    commit('setCnt', val)
  }
}
export default new Vuex.Store({
  state,
  mutations,
  actions
})
