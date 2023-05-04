import request from '@/utils/request'

// 获取员工列表
export function getEmployees (id) {
  return request({
    url: `roles/${id}/employees`,
    method: 'get'
  })
}

// 获取普通管理员列表（新）
export function getEmployeesOrdinary (tag) {
  return request({
    url: `/roles/current/department/employees`,
    method: 'get',
    params: { tagType: tag }
  })
}

// 获取权限列表
export function getPrivileges (enabled) {
  return request({
    url: `/privileges`,
    method: 'get',
    params: { enabled: true }
  })
}

// 获取员工权限列表(附加用户的权限及范围)
export function getPrivilegesWidthEmployee (data) {
  return request({
    url: `/privileges/with-employee-settings`,
    method: 'get',
    params: { enabled: true }
  })
}

// 查询角色权限列表（附加权限及范围以及分配权限）
export function getPrivilegesByRole (id) {
  return request({
    url: `/privileges/with-settings-and-authorized/by-role/${id}`,
    method: 'get'
  })
}

// 查询员工权限列表（附加权限及范围以及分配权限）
export function getPrivilegesByEmployee (id) {
  return request({
    url: `/privileges/with-settings-and-authorized/by-employee/${id}`,
    method: 'get'
  })
}

// 设置部门权限
export function setDepartmentPrivileges (data) {
  return request({
    url: `/privileges/department/setting`,
    method: 'post',
    data
  })
}

// 设置部门权限
export function setRolePrivileges (data) {
  return request({
    url: `/privileges/role/setting`,
    method: 'post',
    data
  })
}

// 设置员工权限
export function setEmployeePrivileges (data) {
  return request({
    url: `/privileges/employee/setting`,
    method: 'post',
    data
  })
}

// 删除员工角色
export function delEmployeeRoles (id, employeeId) {
  return request({
    url: `/roles/${id}/${employeeId}/rm`,
    method: 'put'
  })
}

// 设置员工角色
export function setEmployeeRoles (id, employeeId) {
  return request({
    url: `/roles/${id}/${employeeId}/set`,
    method: 'put'
  })
}

// 获取树结构
export function getScopes (id) {
  return request({
    url: `/privileges/${id}/scopes`,
    method: 'get'
  })
}

// 搜索员工
export function employeesSearch (keyword) {
  return request({
    url: `/employees/search?keyword=${keyword}`,
    method: 'get'
  })
}

// 查询员工详情
export function getEmployeeDetail (id) {
  return request({
    url: `/employees/${id}`,
    method: 'get'
  })
}

// 查询部门管理员候选人列表
export function getDepartmentTree (id) {
  return request({
    url: `/employees/4-department-admin`,
    method: 'get'
  })
}

// 批量设置员工角色
export function setBathRoles (id, data) {
  return request({
    url: `/roles/${id}/batch-set`,
    method: 'put',
    data
  })
}
