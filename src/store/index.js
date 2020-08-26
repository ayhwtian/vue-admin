import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    breadcrumbList: []
  },
  mutations: {
    updateBreadcrumb(state, payload) {
      state.breadcrumbList = payload.item
    },
    clearBreadCrumb(state, payload){
      state.breadcrumbList = payload.item;
    }
  },
  actions: {
  },
  modules: {
  }
})
