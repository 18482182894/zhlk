import request from '../../utils/request'

// 新增安全生产台账记录
export function addProductionAccount(data) {
  return request({
    url: 'IGIP-BWZL-SF/API-GATEWAY?moduleId=BWZL_SF_101',
    method: 'post',
    params: data
  })
}

// 编辑安全生产台账记录
export function editProductionAccount(data) {
  return request({
    url: 'IGIP-BWZL-SF/API-GATEWAY?moduleId=BWZL_SF_102',
    method: 'post',
    params: data
  })
}

// 删除安全生产台账记录
export function deleProductionAccount(data) {
  return request({
    url: 'IGIP-BWZL-SF/API-GATEWAY?moduleId=BWZL_SF_103',
    method: 'post',
    params: data
  })
}

// 安全生产台账记录详情
export function getProductionAccountDetail(data) {
  return request({
    url: 'IGIP-BWZL-SF/API-GATEWAY?moduleId=BWZL_SF_104',
    method: 'post',
    params: data
  })
}

// 安全生产台账记录列表查询
export function getProductionAccountList(data) {
  return request({
    url: 'IGIP-BWZL-SF/API-GATEWAY?moduleId=BWZL_SF_105',
    method: 'post',
    params: data
  })
}
