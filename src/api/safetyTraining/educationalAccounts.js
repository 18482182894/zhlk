import request from '../../utils/request'

// 新增安全培训教育台账信息
export function addEducationalAccount(data) {
  return request({
    url: 'IGIP-BWZL-SF/API-GATEWAY?moduleId=BWZL_SF_001',
    method: 'post',
    params: data
  })
}

// 删除安全培训教育台账信息
export function delEducationalAccount(data) {
  return request({
    url: 'IGIP-BWZL-SF/API-GATEWAY?moduleId=BWZL_SF_002',
    method: 'post',
    params: data
  })
}

// 编辑安全培训教育台账信息
export function editEducationalAccount(data) {
  return request({
    url: 'IGIP-BWZL-SF/API-GATEWAY?moduleId=BWZL_SF_003',
    method: 'post',
    params: data
  })
}

// 查询安全培训教育台账信息详情
export function getEducationalAccountDetail(data) {
  return request({
    url: 'IGIP-BWZL-SF/API-GATEWAY?moduleId=BWZL_SF_004',
    method: 'post',
    params: data
  })
}

// 查询安全培训教育台账信息列表
export function getEducationalAccountList(data) {
  return request({
    url: 'IGIP-BWZL-SF/API-GATEWAY?moduleId=BWZL_SF_005',
    method: 'post',
    params: data
  })
}