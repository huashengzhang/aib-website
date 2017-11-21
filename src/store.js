// store.js
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      peopleList:[],
      allCareers:[],
      allOffices:[]
    },
    actions: {
      getAllPeople({ commit }) {
        return axios.get('http://localhost:8080/api/getAllPeople').then((res) => {
          commit('setAllPeople', res.data.list)
        })
      },
      getAllCareers({ commit }) {
        return axios.get('http://localhost:8080/api/getAllCareers').then((res) => {
          commit('setAllCareers', res.data.list)
        })
      },
      getAllOffices({ commit }) {
        return axios.get('http://localhost:8080/api/getAllOffices').then((res) => {
          commit('setAllOffices', res.data.list)
        })
      }
    },
    mutations: {
      setAllPeople (state, list) {
        state.peopleList = list
      },
      setAllCareers (state, list) {
        state.allCareers = list
      },
      setAllOffices (state, list) {
        state.allOffices = list
      }
    }
  })
}
