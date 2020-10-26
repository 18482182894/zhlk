import request from '../../utils/request'

// 低温储量作业列表
export function fetchLowTemperatureWorkList (data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_115',
    method: 'get',
    params: data
  })
}


// 低温储量作业详情
export function fetchLowTemperatureWork (data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_114',
    method: 'get',
    params: data
  })
}
