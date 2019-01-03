import { register, login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken, setRouteToken, getRouteToken, removeRouteToken } from '@/utils/auth'
// import { testRoute } from '@/router'
import { constantRouterMap } from '@/router'
/** eslint disabled */
const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    role: '',
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
    SET_ROLE: (state, role) => {
      state.role = role
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
          commit('SET_ROLE', response.user.role)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          if (data.role && data.role !== '') {
            let rolesRouters = constantRouterMap.filter((item) => {
              return item.meta.role === data.role
            })

            commit('SET_ROLE', data.role)
            commit('SET_ROLE_ROUTERS', rolesRouters)
          } else {
            reject('getInfo: role must be a non-null String !')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar_url)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 生成用户路由
    GenerateRoutes({ commit}, data) {
      return new Promise((resolve, reject) => {
        let role = data;
        // console.log(role) 
        // 根据role 遍历所有router，
        // 这里设置getter上的routers 采用过滤器 筛选出对应role 路由
        // console.log(constantRouterMap)
        let rolesRouters = constantRouterMap.filter((item) => {
          return item.role === role
        })
        // console.log(rolesRouters)
        commit('SET_ROLE_ROUTERS', rolesRouters)
        // 将rolesRouters 存cookie ，获取用户信息的时候 再重新获取
        resolve(rolesRouters)
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
