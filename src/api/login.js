import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/post/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/get/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/post/user/logout',
    method: 'post'
  })
}
