import { getAllUser, GetAllUserFromPage, deleteOneUser, updateSomeOneRole } from '@/api/admin'
/** eslint disabled */
const admin = {
  state: {
  },

  mutations: {
  },

  actions: {
    // 获取所有用户
    GetAllUser({ commit }, {page}) {
        return new Promise((resolve, reject) => {
            getAllUser(page).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
      })
    },
    // 获取所有用户(分页获取)
    GetAllUserFromPage({ commit }, {page}) {
        return new Promise((resolve, reject) => {
            GetAllUserFromPage(page).then(response => {
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
