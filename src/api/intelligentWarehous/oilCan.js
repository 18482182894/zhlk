import request from '../../utils/request'

// 油罐管理
export function getOilList (data) {
    return request({
      url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=getOilCanTemperatureDataList',
      method: 'post',
      params: data
    })
}

// 油罐管理温度详情
export function getOilTemperatureList (data) {
    return request({
      url: 'IGIP-BWZL-WSMS/API-GATEWAY?moduleId=queryTankInfoService',
      method: 'post',
      params: data
    })
}

// 油罐管理温度每层
export function getOilTemperatureListOne (data) {
    return request({
      url: 'IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_209_oil',
      method: 'post',
      params: data
    })
}

// 油罐管理温度每层
export function getOilHeight (data) {
    return request({
      url: 'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_307',
      method: 'post',
      params: data
    })
}