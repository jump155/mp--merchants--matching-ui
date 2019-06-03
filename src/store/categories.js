import axios from 'axios'

// initial state
const state = {
  units: null,
  host: process.env.VUE_APP_MATCHING_TITLES_API_URL,
  matching_category_tree: [],
  matching_category_data: null,
  active_category: null,
  unused_categories: null
}

// getters
const getters = {
}

// actions
const actions = {
  getMatchingCategoryTree ({ commit, state }) {
    let host = state.host
    axios.get(host.concat('categories/matching_category_tree'), {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      const resp = response.data
      let tree = resp['tree']
      if (tree) {
        commit('setMatchingCategoryTree', { tree })
      }
    })
      .catch(e => {
        console.log(e)
      })
  },
  getUnusedCategories ({ commit, state }) {
    let host = state.host
    axios.get(host.concat('categories/unused_categories'), {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      const resp = response.data
      let unusedCategories = resp['response']
      if (unusedCategories) {
        commit('setUnusedCategories', { unusedCategories })
      }
    })
      .catch(e => {
        console.log(e)
      })
  },
  getMatchingCategoryData ({ commit, state }, matchingCategoryId) {
    let host = state.host
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    let params = {
      matching_category_id: matchingCategoryId
    }
    axios.get(host.concat('categories/matching_category_data'), {
      params: params,
      headers: headers
    }).then(response => {
      const resp = response.data
      let categoryData = resp['category_data']
      if (categoryData) {
        commit('setMatchingCategoryData', { categoryData })
      }
    })
      .catch(e => {
        console.log(e)
      })
  }
}

// mutations
const mutations = {
  setMatchingCategoryTree (state, { tree }) {
    state.matching_category_tree = tree
  },
  setMatchingCategoryData (state, { categoryData }) {
    state.matching_category_data = categoryData
  },
  setUnusedCategories (state, { unusedCategories }) {
    state.unused_categories = unusedCategories
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
