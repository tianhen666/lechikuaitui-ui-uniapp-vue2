import Vue from 'vue'
import Vuex from 'vuex'
import user from './mudules/user'
import cart from './mudules/cart'
import poster from './mudules/poster'
import tenant from './mudules/tenant'
import getters from './getters'

Vue.use(Vuex) // vue的插件机制

// Vuex.Store 构造器选项
const store = new Vuex.Store({
  modules: {
    user,
    cart,
    poster,
    tenant
  },
  getters
})
export default store