import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login', '/register'] // 不重定向白名单

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (store.getters.role !== '') {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          const role = res.data.role // note: roles must be a array! such as: ['editor','develop']
          // store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
          //   router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
          //   next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          // })
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
    if (from.path === '/login') {
      // console.log('这时候有登录，需要生成路由表') // 在登陆时候，通过 role 来生成不同的路由表
      if (store.getters.role !== '') {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息，在这里已经将角色的权限路由生成 放进vuex
          // 根据role权限生成可访问的路由表
          // router.options.routes.push(...store.getters.roleRouters)
          router.addRoutes(store.getters.roleRouters)
          // next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,这个方法有些问题 会重复添加roleRouters 一次
          next()
          // })
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
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
// 处理刷新问题，合并到上面的beforeEach 有问题
router.beforeEach((to, from, next) => {
  let getRoleRouters = () => {
    if (!router.options.routes.includes(...store.getters.roleRouters)) {
      router.options.routes.push(...store.getters.roleRouters)
      router.addRoutes(router.options.routes)
    }
  }
  let intervalId = setInterval(()=>{
    if(getToken() !== 'undefined' && store.getters.roleRouters.length>0) {
      getRoleRouters()
      clearInterval(intervalId)
      next()
    } else if(getToken() === 'undefined') {
      clearInterval(intervalId)
      next()
    } else {
      next()
    }
  }, 10)
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
