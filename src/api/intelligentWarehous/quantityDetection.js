import request from '../../utils/request'

// 粮食数量检测列表
export function fetchQuantityDetectionList(params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_074',
    method: 'get',
    params
  })
}

// 粮食数量检测新增
export function addQuantityDetection(params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_071',
    method: 'get',
    params
  })
}
// 粮食数量检测设备状态
export function getGrainUseState(params) {
  return request({
    url: '/IGIP-BWZL-IOT/API-GATEWAY?moduleId=CheckGrainStateServiceImpl',
    method: 'get',
    params
  })
}
// 粮食数量检测编辑
export function editQuantityDetection(params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_072',
    method: 'get',
    params
  })
}

// 粮食数量检测详情
export function fetchQuantityDetection(params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_073',
    method: 'get',
    params
  })
}

// 获取廒间台账信息
export function fetchWarehouse(params) {
  return request({
    url: '/IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_255',
    method: 'get',
    params
  })
}
