import request from '@/utils/request'

// 获取合同列表
export function getContracts (data) {
  return request({
    url: '/contract/base/list',
    method: 'get',
    params: data
  })
}

// 新增合同
export function contractCreate (data) {
  return request({
    url: `/contract/base/add`,
    method: 'post',
    data
  })
}

// 编辑合同
export function contractEdit (data) {
  return request({
    url: `/contract/base/update`,
    method: 'post',
    data
  })
}

// 合同详情
export function contractDetail (id) {
  return request({
    url: `/contract/base/info/${id}`,
    method: 'get'
  })
}

// 获取合同详情tab
export function contractDetailTab (id) {
  return request({
    url: `/contract/agreement/list/for/tab/${id}`,
    method: 'get'
  })
}

// 获取绑定账号列表
export function getContractAccountList (contractId) {
  return request({
    url: `/cr/${contractId}`,
    method: 'get'
  })
}

// 绑定账号
export function contractBindAccount (data) {
  return request({
    url: `/cr/bind`,
    method: 'post',
    data
  })
}

// 删除绑定账号关系
export function deletContractAccount (contractRelationId) {
  return request({
    url: `/cr/del/${contractRelationId}`,
    method: 'delete'
  })
}

// 获取补充合同列表
export function getExtraContracts (data) {
  return request({
    url: '/contract/agreement/list',
    method: 'get',
    params: data
  })
}

// 新增补充合同
export function extraContractCreate (data) {
  return request({
    url: `/contract/agreement/add`,
    method: 'post',
    data
  })
}

// 编辑补充合同
export function extraContractEdit (data) {
  return request({
    url: `/contract/agreement/update`,
    method: 'post',
    data
  })
}

// 合同补充详情
export function extraContractDetail (id) {
  return request({
    url: `/contract/agreement/${id}`,
    method: 'get'
  })
}

// 获取合同调取列表
export function getExtractList (data) {
  return request({
    url: `/contract/apply/list`,
    method: 'post',
    data
  })
}

// 根据 身份证号 获取合同标题
export function getTitleInfoByIdCard (id) {
  return request({
    url: `/contract/apply/name?idCard=${id}`,
    method: 'get'
  })
}

// 合同调取
export function extractApply (data) {
  return request({
    url: `/contract/apply/insert`,
    method: 'post',
    data
  })
}

// 合同内容查看
export function extractContent (id) {
  return request({
    url: `/contract/apply/check?id=${id}`,
    method: 'get'
  })
}

// 获取合同调取记录列表
export function getExtractRecordList (data) {
  return request({
    url: `/contract/apply/record`,
    method: 'post',
    data
  })
}

// 审核通过/拒绝
export function extractCheck (data) {
  return request({
    url: `/contract/apply/update`,
    method: 'post',
    data
  })
}

// 重新审核
export function getExtractCheckInfo (id) {
  return request({
    url: `/contract/apply/echo?id=${id}`,
    method: 'get'
  })
}
