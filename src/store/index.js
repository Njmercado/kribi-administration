import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage,
})

export default new Vuex.Store({
  state: {
    token: '',
    email: '',
    name: '',
    image: '',
    description: '',
    userId: ''
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
    },
    setDescription(state, description) {
      state.description = description 
    },
    setUserId(state, id) {
      state.userId = id
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
    getUserId: state => state.userId,
  },
  plugins: [vuexLocalStorage.plugin]
})
