import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
// 每次通过mutation去修改state时，会在控制台打印一条修改记录
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  // vuex严格模式，损耗性能，不建议在线上使用
  strict: debug,
  plugins: debug ? [createLogger()] : []
})