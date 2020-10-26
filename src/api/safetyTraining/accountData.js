import request from '../../utils/request'

// 新增安全会议台账数据
export function addAccountData(data) {
  return request({
    url: 'IGIP-BWZL-SF/API-GATEWAY?moduleId=BWZL_SF_106',
    method: 'post',
    params: data
  })
}

// 编辑安全会议台账数据
export function editAccountData(data) {
  return request({
    url: 'IGIP-BWZL-SF/API-GATEWAY?moduleId=BWZL_SF_107',
    method: 'post',
    params: data
  })
}

// 删除安全会议台账数据
export function delAccountData(data) {
  return request({
    url: 'IGIP-BWZL-SF/API-GATEWAY?moduleId=BWZL_SF_108',
    method: 'post',
    params: data
  })
}

// 查询安全会议台账详情
export function getAccountDataDetail(data) {
  return request({
    url: 'IGIP-BWZL-SF/API-GATEWAY?moduleId=BWZL_SF_109',
    method: 'post',
    params: data
  })
}

// 查询安全会议台账列表
export function getAccountDataList(data) {
  return request({
    url: 'IGIP-BWZL-SF/API-GATEWAY?moduleId=BWZL_SF_110',
    method: 'post',
    params: data
  })
}