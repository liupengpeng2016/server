import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    user: '',
    apiList: []
  },
  getters: {
  },
  mutations: {
    saveUserInfo (state, {data}) {
      state.user = data
    },
    saveApiList (state, {data}) {
      state.apiList = data
    }
  },
  actions: {
    fetchUserInfo ({state, commit}, {resEnd}) {
      axios.get('//172.17.20.136/userInfo', {})
        .then(function ({data: {data, msg, code}}) {
          if (code === 200) {
            commit({
              type: 'saveUserInfo',
              data: data
            })
          }
          resEnd && resEnd(code === 200, code === 200 ? data : msg)
        })
    },
    login ({state, commit}, {name, password, resEnd}) {
      axios.post('//172.17.20.136/login', {
        name,
        password
      })
        .then(function ({data: {data, msg, code}}) {
          if (code === 200) {
            commit({
              type: 'saveUserInfo',
              data: data
            })
          }
          resEnd && resEnd(code === 200, code === 200 ? data : msg)
        })
    },
    register ({state, commit, rootState}, {resEnd, name, password}) {
      axios.post('//172.17.20.136/register', {
        name,
        password
      })
        .then(res => {
          resEnd && resEnd(res.data.code === 200, res.data)
        })
        .catch(err => {
          console.log(err)
          resEnd && resEnd(false, err)
        })
    },
    saveApi ({state}, {resEnd, name, path, user, json}) {
      axios.post('//172.17.20.136/saveapi', {
        path,
        json
      })
        .then(function (res) {
          const {data: {code, data, msg}} = res
          resEnd && resEnd(code === 200, code === 200 ? data : msg)
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    editorApi ({state, commit, rootState}, {resEnd, name, path, user, json}) {
      axios.post('//172.17.20.136/editorapi', {
        path,
        name,
        json
      })
        .then(function (res) {
          const {data: {code, data, msg}} = res
          resEnd && resEnd(code === 200, code === 200 ? data : msg)
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    fetchApiList ({state, commit, rootState}, {name, resEnd}) {
      axios.post('//172.17.20.136/apilist', 'post', {
        name
      })
        .then(res => {
          const {data: {data, msg, code}} = res
          if (code === 200) {
            commit({
              type: 'saveApiList',
              data: data || []
            })
          }
          resEnd && resEnd(code === 200, code === 200 ? data : msg)
        })
        .catch(err => {
          console.log(err)
          resEnd && resEnd(false, err)
        })
    },
    delApi ({state, commit, rootState}, {path, resEnd}) {
      axios.post('//172.17.20.136/delapi', {
        path
      })
        .then(res => {
          const {data: {data, msg, code}} = res
          resEnd && resEnd(code === 200, code === 200 ? data : msg)
        })
        .catch(err => {
          console.log(err)
          resEnd && resEnd(false, err)
        })
    }
  }
})
