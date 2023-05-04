import request from '@/utils/request'

// 获取角色列表
export function getRoles (parameter) {
  return request({
    url: '/role/list',
    method: 'get',
    params: parameter
  })
}

// 新建角色
export function createRole (data) {
  return request({
    url: `/role/create`,
    method: 'post',
    data
  })
}

// 修改角色
export function editRole (data) {
  return request({
    url: `/role/update`,
    method: 'post',
    data
  })
}

// 根据角色id获取权限列表
export function getAuthList (parameter) {
  return request({
    url: '/permission/byRole',
    method: 'get',
    params: parameter
  })
}

// 创建权限
export function createAuth (data) {
  return request({
    url: `/role/create/permission`,
    method: 'post',
    data
  })
}

// 根据角色id获取用户列表
export function getEmployeeById (parameter) {
  return request({
    url: '/role/employee/list',
    method: 'get',
    params: parameter
  })
}
