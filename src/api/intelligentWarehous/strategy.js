import request from '../../utils/request'

// 新增策略
export function addStrategy (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_031',
    method: 'get',
    params
  })
}

// 编辑策略
export function editStrategy (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_032',
    method: 'get',
    params
  })
}

// 策略详情
export function fetchStrategy (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_033',
    method: 'get',
    params
  })
}

// 策略列表
export function fetchStrategyList (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_034',
    method: 'get',
    params
  })
}

// 新增粮食数量策略
export function addGrainQuantityStrategy (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_081',
    method: 'get',
    params
  })
}

// 编辑粮食数量策略
export function editGrainQuantityStrategy (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_082',
    method: 'get',
    params
  })
}

// 粮食数量策略详情
export function fetchGrainQuantityStrategy (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_083',
    method: 'get',
    params
  })
}

// 粮食数量策略列表
export function fetchGrainQuantityStrategyList (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_084',
    method: 'get',
    params
  })
}

// 新增智能气调策略
export function addAtmosphereStrategy (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_091',
    method: 'get',
    params
  })
}

// 编辑智能气调策略
export function editAtmosphereStrategy (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_092',
    method: 'get',
    params
  })
}

// 智能气调策略详情
export function fetchAtmosphereStrategy (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_093',
    method: 'get',
    params
  })
}

// 智能气调策略列表
export function fetchAtmosphereStrategyList (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_094',
    method: 'get',
    params
  })
}

// 新增熏蒸策略
export function addFumigationStrategy (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_061',
    method: 'get',
    params
  })
}

// 编辑熏蒸策略
export function editFumigationStrategy (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_062',
    method: 'get',
    params
  })
}

// 熏蒸策略详情
export function fetchFumigationStrategy (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_063',
    method: 'get',
    params
  })
}

// 熏蒸策略列表
export function fetchFumigationStrategyList (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_064',
    method: 'get',
    params
  })
}
