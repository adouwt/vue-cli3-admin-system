import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login', '/register'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  // console.log('permission', getToken())
  if (getToken()) {
    // console.log(to, 'to')
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (store.getters.role !== '') {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          // console.log('GetInfo')
          next()
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
      store.dispatch('GetInfo').then(res => { // 拉取用户信息
        // console.log('getInfo') // 登录成功 或者注册成功 都会经过这里拉取用户信息
        next()
      }).catch((err) => {
        store.dispatch('FedLogOut').then(() => {
          Message.error(err || 'Verification failed, please login again')
          next({ path: '/' })
        })
      })
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
