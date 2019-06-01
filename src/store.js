import Vue from 'vue'
import Vuex from 'vuex'
import units from './store/units'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    units
  }
})
