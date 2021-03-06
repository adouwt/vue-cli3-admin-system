import { adminRegister, register, login, logout, getInfo ,sendEmail, uploadImg} from '@/api/login'
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
    SET_USERID: (state, _id) => {
      state._id = _id
    },
    SET_ROLE_ROUTERS: (state, roleRouters) => {
      state.roleRouters = roleRouters
    }
  },

  actions: {
    // 发送验证码
    SendEmail({ commit }, email) {
      console.log(email,'email')
      return new Promise((resolve, reject) => {
        sendEmail(email).then(response => {
          resolve(response)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    // 注册
    Register({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const roles = userInfo.roles
      const type = userInfo.type.trim()
      const email = userInfo.email
      const registerCode = userInfo.registerCode
      return new Promise((resolve, reject) => {
        register(username, userInfo.password, type, roles, email, registerCode).then(response => {
          // then 这里接收到的只要成功的提示，失败的情况已经在拦截器里面处理
          // console.log('actions', response)
          setToken(response.token) // 注册成功直接登陆 使用
          commit('SET_TOKEN', response.token) // 注册成功直接登陆 使用
          resolve(response)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    // 管理员添加用户
    adminRegister({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const roles = userInfo.roles
      const age = userInfo.age.trim()
      return new Promise((resolve, reject) => {
        // 修改成传递一个对象过来，在源头处修改，省得在很多地方逐个添加参数
        adminRegister(username, userInfo.password, roles, age).then(response => {
          // then 这里接收到的只要成功的提示，失败的情况已经在拦截器里面处理
          // console.log('actions', response)
          // setToken(response.token) // 注册成功直接登陆 使用
          // commit('SET_TOKEN', response.token) // 注册成功直接登陆 使用
          resolve(response)
        }).catch(error => {
          console.log(error)
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
          // console.log(response)
          if (response.data.expired) {
            reject('登录已经过期，请重新登录！')
          }
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar_url)
          commit('SET_USERID', data._id)
          resolve(response)
        }).catch(error => {
          // console.log(error, '115')
          reject(error)
        })
      })
    },

    UploadImage({commit}, {_id, file}) {
      // todo 过滤没有登录
      console.log(file)
      return new Promise((resolve, reject) => {
        uploadImg(_id, file)
        .then(response => {
          commit('SET_USERID', _id)
          resolve(response)
        })
        .catch(err => {
          reject(err)
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
