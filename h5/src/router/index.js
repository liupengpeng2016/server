import Vue from 'vue'
import Router from 'vue-router'
import apiDetail from '../components/api-detail'
Vue.use(Router)
const access = () => import('../components/access')
const apilist = () => import('../components/apilist')

export default new Router({
  routes: [
    {
      path: '/access/:action',
      name: 'access',
      props: true,
      component: access
    }, {
      path: '/apilist',
      name: 'apilist',
      props: true,
      component: apilist,
      children: [{
        path: ':path/:order',
        name: 'apidetail',
        props: true,
        component: apiDetail
      }]
    }
  ]
})
