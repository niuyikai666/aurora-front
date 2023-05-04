import request from '@/utils/request'

// 获取部门结构树
export function getStructureTree () {
  return request({
    url: '/department/structure',
    method: 'get'
  })
}

// 获取部门员工列表
export function getStructureEmployee (parameter) {
  return request({
    url: '/department/employee',
    method: 'get',
    params: parameter
  })
}

// 模糊查询部门和员工
export function searchStructureEmployee (key) {
  return request({
    url: '/department/compoundSearch',
    method: 'get',
    params: { searchInfo: key }
  })
}

// 获取员工详情
export function getEmployeeDetail (id) {
  return request({
    url: `/department/employee/${id}`,
    method: 'get'
  })
}

// 批量操作 激活/停用
export function employeeOperate (params) {
  return request({
    url: `/department/active/${params.status}?employeeIds=${params.ids}`,
    method: 'post'
  })
}

// 获取当前用户数据范围内分公司或分公司下小组
export function getEmployeeStrucInfo (type) {
  return request({
    url: `/department/permission/type?type=${type}`,
    method: 'get'
  })
}

// 获取所在分公司
export function getEmployeeCompany () {
  return request({
    url: `/department/current/company`,
    method: 'get'
  })
}
