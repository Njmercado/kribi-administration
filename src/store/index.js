import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    email: '',
    name: '',
    image: '',
    description: ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setEmail(state, email) {
      state.email = email
    },
    setName(state, name) {
      state.name = name 
    },
    setImage(state, image) {
      state.image = image 
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getToken: state => state.token,
    getEmail: state => state.email,
    getName: state => state.name,
    getImage: state => state.image,
    getDescription: state => state.description,
  }
})
