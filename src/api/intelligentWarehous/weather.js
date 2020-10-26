import request from '../../utils/request'

// 智能气象列表
export function fetchWeatherList (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_012',
    method: 'get',
    params
  })
}

// 新增智能气象
export function addWeather (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_011',
    method: 'get',
    params,
  })
}
