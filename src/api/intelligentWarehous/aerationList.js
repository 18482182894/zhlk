import request from '../../utils/request'

// 通风列表查询
export function getAerationList (data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=searchAerationRecordService',
    method: 'get',
    params: data
  })
}
// 新增通风信息
export function addAerationRecordService (data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=registerAerationRecordService',
    method: 'post',
    params: data
  })
}

// 通风信息详情
export function getAerationRecordDetail (data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=detailAerationRecordService',
    method: 'get',
    params: data
  })
}

// 删除单个通风信息
export function deleteAerationRecord (data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=deleteAerationRecordService',
    method: 'post',
    params: data
  })
}