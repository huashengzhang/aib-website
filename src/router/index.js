import Vue from 'vue'
import Router from 'vue-router'

const routes = [
  { path: '/', component: require('../components/Index/PageIndex')},
  { path: '/about', component: require('../components/About/PageAbout') },
  { path: '/careers', component: require('../components/Career/PageCareersIndex') },
  { path: '/careers/:entry', component: require('../components/Career/PageCareersEntry') },
  { path: '/offices', component: require('../components/Offices/PageOffices') },
  { path: '/404', component: require('../components/Page404') },
  { path: '*', component: require('../components/Page404') }
]
Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes,
    scrollBehavior (to, from, savedPosition) {
      if (to.hash) {
        return {
          selector: to.hash
        }
      }
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
  })
}
