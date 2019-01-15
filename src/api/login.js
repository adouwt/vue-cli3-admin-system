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

export function register(username, password, type, roles) {
  // console.log('register in login.js')
  return request({
    url: '/post/register',
    method: 'post',
    data: {
      username,
      password,
      type: type,
      roles: roles
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

export function logout(token) {
  return request({
    url: '/post/logout',
    method: 'post',
    params: { token }
  })
}
