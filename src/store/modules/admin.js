import { getAllUser, deleteOneUser, updateSomeOneRole } from '@/api/admin'
/** eslint disabled */
const admin = {
  state: {
  },

  mutations: {
  },

  actions: {
    // 获取所有用户
    GetAllUser({ commit }, {}) {
        return new Promise((resolve, reject) => {
            getAllUser().then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
      })
    },
    // 删除用户
    DeleteOneUser ({ commit }, {id}) {
        return new Promise((resolve, reject) => {
            deleteOneUser(id).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
          })
    },
    // 修改用户
    UpdateSomeOneRole ({ commit }, {id, roles}) {
        console.log(roles)
        return new Promise((resolve, reject) => {
            updateSomeOneRole(id, roles).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
          })
    },
  }
}

export default admin
