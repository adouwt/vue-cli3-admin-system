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
// 像这样的结构不好，前端页面添加一个参数，这里也相应的添加
export function register(username, password, type, roles, email, registerCode) {
  // console.log('register in login.js')
  return request({
    url: '/post/register',
    method: 'post',
    data: {
      username,
      password,
      type: type,
      roles: roles,
      email: email,
      registerCode: registerCode
    }
  })
}

// 管理员添加用户
export function adminRegister(username, password, roles) {
  // console.log('register in login.js')
  return request({
    url: '/post/adminRegister',
    method: 'post',
    data: {
      username,
      password,
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

export function sendEmail(email) {
  return request({
    url: '/post/sendEmailCode',
    method: 'post',
    data: {
      email
    }
  })
}
