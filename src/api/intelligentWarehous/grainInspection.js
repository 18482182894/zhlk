import request from '../../utils/request'

// 新增粮情检测
export function addGrainInspection(params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_301',
    method: 'post',
    params,
  })
}

// 删除粮情检测
export function removeGrainInspection(grainCheckRecordId) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_302',
    method: 'post',
    params: {grainCheckRecordId},
  })
}

// 编辑粮情检测
export function editGrainInspection(params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_303',
    method: 'post',
    params,
  })
}

// 粮情检测列表
export function fetchGrainInspectionList(params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_304',
    method: 'get',
    params,
  })
}

// 粮情检测详情
export function fetchGrainInspection(grainCheckRecordId) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_305',
    method: 'get',
    params: {grainCheckRecordId},
  })
}

// 粮情检测审核
export function verifyGrainInspection(grainCheckRecordId) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_306',
    method: 'post',
    params: {grainCheckRecordId},
  })
}

// 粮情检测回调
export function callbackGrainInspection(params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_307',
    method: 'post',
    params,
  })
}

// 根据廒间获取温度信息
export function fetchGrainInspectionTemperature(params) {
  return request({
    url: '/IGIP-BWZL-IOT/API-GATEWAY?moduleId=BWZL_IOT_121',
    method: 'post',
    params,
  })
}
