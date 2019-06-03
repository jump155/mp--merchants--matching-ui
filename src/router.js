import Vue from 'vue'
import Router from 'vue-router'
import Units from './components/TitleMatching/Units.vue'
import Home from './components/Home.vue'
import CategoriesMarket from './components/CategoriesMatching/CategoriesMarket.vue'
import CategoriesLM from './components/CategoriesMatching/CategoriesLM.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/units',
      name: 'units',
      component: Units
    },
    {
      path: '/categories-market',
      name: 'categories-market',
      component: CategoriesMarket
    },
    {
      path: '/categories-lm',
      name: 'categories-lm',
      component: CategoriesLM
    }
  ]
})
