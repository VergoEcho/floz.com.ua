import Cookie from 'cookie'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

export const state = () => ({
  token: null,
  user: null
})

export const mutations = {
  setToken(state, token) {
    state.token = token
  },
  setUser(state, user) {
    state.user = user
  },
  clearToken(state) {
    state.token = null
    state.user = null
  }
}

export const actions = {
  async login({ commit, dispatch }, formData) {
    try {
      const {token, candidate} = await this.$axios.$post('/api/auth/login', formData)
      await dispatch('setToken', token)
      await dispatch('setUser', candidate)
      // console.log('user', candidate)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async createUser({commit}, formData) {
    try {
      await this.$axios.$post('/api/auth/admin/create', formData)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async register({commit}, formData) {
    try {
      await this.$axios.$post('/api/auth/register', formData)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  setToken({ commit }, token) {
    this.$axios.setToken(token, 'Bearer')
    commit('setToken', token),
    Cookies.set('jwt-token', token)
  },
  setUser({commit}, user) {
    commit('setUser', user)
    JSON.stringify(user)
    Cookies.set('user', user)
  },
  logout({ commit }) {
    this.$axios.setToken(false)
    commit('clearToken')
    Cookies.remove('jwt-token')
    Cookies.remove('user')
  },
  autoLogin({dispatch}) {
    const cookieStr = process.browser
      ? document.cookie
      : this.app.context.req.headers.cookie

      const cookies = Cookie.parse(cookieStr || '') || {}
      const token = cookies['jwt-token']
      let user = cookies['user']
      
      if (isJWTValid(token)) {
        user = JSON.parse(user)
        dispatch('setToken', token)
        dispatch('setUser', user)
      } else {
        dispatch('logout')
      }
  }
}

export const getters = {
  isAuthenticated: state => Boolean(state.token),
  token: state => state.token,
  user: state => state.user
}


function isJWTValid (token) {
  if (!token) {
    return false
  }

  const jwtData = jwtDecode(token) || {}
  const expires = jwtData.exp || 0

  return (new Date().getTime() / 1000) < expires
}