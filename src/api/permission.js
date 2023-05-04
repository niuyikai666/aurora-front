import request from '@/utils/request'

// 获取当前登录用户菜单
export function getMenusMine () {
  // return null
  return request({
    url: '/permission/permissionMenus',
    method: 'get'
  })
}

// 获取菜单列表(所有)
export function getMenus () {
  return request({
    url: '/menus',
    method: 'get',
    params: { enabled: true }
  })
}

// 获取当前登录用户 页面可操作的权限
export function getPageOperation () {
  // return null
  return request({
    url: '/operations/mine',
    method: 'get'
  })
}
