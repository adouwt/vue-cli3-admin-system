import Cookies from 'js-cookie'

const TokenKey = 'erlinger'
const routeKey = 'route'
/**
 * 将用户token存储 
 */
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
/**
 * 将路由存储 
 */
export function setRouteToken(route) {
  return Cookies.set(routeKey, route)
}

export function getRouteToken() {
  return Cookies.get(routeKey)
}

export function removeRouteToken() {
  return Cookies.remove(routeKey)
}
