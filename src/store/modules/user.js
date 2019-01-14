import { register, login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
/** eslint disabled */
const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    roleRouters: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_ROLE_ROUTERS: (state, roleRouters) => {
      state.roleRouters = roleRouters
    }
  },

  actions: {
    // 注册
    Register({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const role = userInfo.role.trim()
      const type = userInfo.type.trim()
      return new Promise((resolve, reject) => {
        register(username, userInfo.password, type, role).then(response => {
          // then 这里接收到的只要成功的提示，失败的情况已经在拦截器里面处理
          // console.log('actions', response)
          setToken(response.token)
          commit('SET_TOKEN', response.token)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          // then 这里接收到的只要成功的提示，失败的情况已经在拦截器里面处理
          setToken(response.token)
          commit('SET_TOKEN', response.token)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          const data = response.data

          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar_url)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          console.log('out')
          commit('SET_TOKEN', '')
          commit('SET_ROLE', '')
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
