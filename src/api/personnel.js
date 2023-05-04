import request from '@/utils/request'

// 获取部门结构树
export function getStructureTree() {
  return request({
    url: '/department/all',
    method: 'get'
  })
}

// 获取部门结构树
export function getStructureTreeAll() {
  return request({
    url: '/department/all/permission',
    method: 'get'
  })
}

// 获取部门结构树
export function getStructureDepartmentNone(searchName) {
  return request({
    url: `/employee/search/all/default?searchName=${searchName}`,
    method: 'get'
  })
}

// 根据部门id获取子部门列表
export function getDepartmentList(parameter) {
  return request({
    url: '/department/child',
    method: 'get',
    params: parameter
  })
}

// 模糊查询部门
export function searchStructureEmployee(key) {
  return request({
    url: '/department/compound/search',
    method: 'get',
    params: { searchInfo: key }
  })
}

// 创建部门
export function createDepartment(data) {
  return request({
    url: '/department/create',
    method: 'post',
    data
  })
}

// 编辑部门
export function editDepartment(data) {
  return request({
    url: '/department/edit',
    method: 'post',
    data
  })
}

// 获取部门详情
export function getStructureDetail(id) {
  return request({
    url: `/department/${id}`,
    method: 'get'
  })
}

// 获取员工列表
export function getEmployees(data) {
  return request({
    url: '/employee/list',
    method: 'post',
    data
  })
}

// 创建员工
export function createEmployee(data) {
  return request({
    url: '/employee/add',
    method: 'post',
    data
  })
}

// 批量创建员工
export function createEmployeeMutiple(data) {
  return request({
    url: '/employee/batch/add',
    method: 'post',
    data
  })
}

// 修改员工
export function editEmployee(data) {
  return request({
    url: '/employee/edit',
    method: 'post',
    data
  })
}

// 修改员工
export function editEmployeeMutiple(data) {
  return request({
    url: '/employee/batch/edit',
    method: 'post',
    data
  })
}

// 获取员工详情
export function getEmployeeDetail(employeeId) {
  return request({
    url: `/employee/get/${employeeId}`,
    method: 'get'
  })
}

// 根据ids批量获取员工
export function getEmployeeByIds(data) {
  return request({
    url: `/employee/batch/get`,
    method: 'post',
    data
  })
}

// 批量添加角色
export function addEmployeeRoles(data) {
  return request({
    url: '/employee/and/role/batch/set',
    method: 'post',
    data
  })
}

// 无部门归属人员所属组织变更
export function employeeStrucChange(data) {
  return request({
    url: '/employee/no/department/change',
    method: 'post',
    data
  })
}

// 搜索账号
export function employeeSearch(parameter) {
  return request({
    url: '/employee/searchByName',
    method: 'get',
    params: parameter
  })
}

// 根据姓名/手机号查询
export function employeeSearchByNameMobile(parameter) {
  return request({
    url: '/employee/searchName',
    method: 'get',
    params: parameter
  })
}

// 根据姓名手机查询员工
export function searchEmployees(parameter) {
  return request({
    url: '/employee/searchName',
    method: 'get',
    params: parameter
  })
}

// 通过员工id查询员工信息
export function getEmployeeDetailById(id) {
  return request({
    url: `/employee/empData?employeeId=${id}`,
    method: 'get'
  })
}

// 获取可选部门类型
export function getDepartmentTypeByType(id) {
  return request({
    url: `/department/type/${id}`,
    method: 'get'
  })
}
// 获取飞书部门
export function getFeishuDepartmentList(params) {
  return request({
    url: `/department/like/feishu/department`,
    method: 'get',
    params
  })
}
// 启用/停用部门
export function modifyDepartment(data) {
  return request({
    url: '/department/enableOrDisableDepartment',
    method: 'post',
    data
  })
}

// 根据部门id获取子部门
export function getDepartmentChildById(id) {
  return request({
    url: `/department/childPermission?departmentId=${id}`,
    method: 'get'
  })
}

// 获取权限列表（自用）
export function getPermissons(searchName) {
  return request({
    url: `/permission/allPermission?searchName=${searchName || ''}`,
    method: 'get'
  })
}

// 创建权限（自用）
export function modifyAuth(data) {
  return request({
    url: '/permission/insert',
    method: 'post',
    data
  })
}

// 获取菜单列表（自用）
export function getMenus() {
  return request({
    url: `/permission/permission/menus/list`,
    method: 'get'
  })
}

// 创建菜单（自用）
export function createMenu(data) {
  return request({
    url: '/permission/permission/menus/add',
    method: 'post',
    data
  })
}
// 视频号管理员列表
export function getVideoAdminList(params) {
  return request({
    url: '/wechatManager/administrator/wechat/list',
    method: 'get',
    params
  })
}
// 设置视频号微信管理员
export function setVideoAdmin(params) {
  return request({
    url: '/wechatManager/bind/administrator',
    method: 'post',
    params
  })
}
