import request from '../../utils/request'

// 粮情管理列表
export function fetchAtmosphereHome (data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_314',
    method: 'get',
    params: data
  })
}

// 气体浓度列表
export function fetchStrengthList (data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_313',
    method: 'get',
    params: data
  })
}

// 充氮降氧列表
export function fetchNitrogenAndOxygenList (data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_135',
    method: 'get',
    params: data
  })
}

// 充氮降氧新增
export function addNitrogenAndOxygen (data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_131',
    method: 'get',
    params: data
  })
}

// 充氮降氧编辑
export function editNitrogenAndOxygen (data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_132',
    method: 'get',
    params: data
  })
}

// 充氮降氧删除
export function delNitrogenAndOxygen (data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_133',
    method: 'get',
    params: data
  })
}

// 充氮降氧详情
export function fetchNitrogenAndOxygen (data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_134',
    method: 'get',
    params: data
  })
}

// 充氮降氧申请
export function applyNitrogenAndOxygen (data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_136',
    method: 'get',
    params: data
  })
}

// 充氮降氧-散气作业新增
export function addExhaustingQi (data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_141',
    method: 'get',
    params: data
  })
}

// 充氮降氧-散气作业编辑
export function editExhaustingQi (data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_142',
    method: 'get',
    params: data
  })
}

// 充氮降氧-散气作业删除
export function delExhaustingQi (data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_143',
    method: 'get',
    params: data
  })
}

// 充氮降氧-散气作业详情
export function fetchExhaustingQi (data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_144',
    method: 'get',
    params: data
  })
}

// 充氮降氧-散气作业列表
export function fetchExhaustingQiList (data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_145',
    method: 'get',
    params: data
  })
}

// 充氮降氧-散气作业审核
export function applyExhaustingQi (data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_146',
    method: 'get',
    params: data
  })
}

