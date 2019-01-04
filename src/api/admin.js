import request from '@/utils/request'

export function getAllUser() {
  return request({
    url: '/get/alluser',
    method: 'get',
    data: {
    }
  })
}
export function deleteOneUser(id) {
    return request({
        url: '/post//deleteuser',
        method: 'post',
        data: {
            id: id
        }
      })
}

