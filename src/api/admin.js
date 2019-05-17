import request from '@/utils/request'

export function getAllUser() {
  console.log(456798132)
  return request({
    url: '/get/alluser',
    method: 'get',
    data: {
      page: page
    }
  })
}
export function deleteOneUser(id) {
    return request({
        url: '/post/deleteuser',
        method: 'post',
        data: {
            id: id
        }
      })
}

export function GetAllUserFromPage(page, skip) {
  return request({
    url: '/post/getUsersFromPage',
    method: 'post',
    data: {
      page: page,
      skip: skip
    }
  })
}

export function updateSomeOneRole(id, roles) {
  return request({
      url: '/post/updatesomerole',
      method: 'post',
      data: {
          id: id,
          roles: roles
      }
    })
}
