import request from '../../utils/request'

// 粮情管理列表
export function fetchGrainSituationList (data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_311',
    method: 'get',
    params: data
  })
}

// 虫情列表接口
export function fetchInsectPestList (data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_308',
    method: 'get',
    params: data
  })
}

// 虫情报表接口
export function fetchInsectPestChart (data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_309',
    method: 'get',
    params: data
  })
}

// 粮温详情
export function fetchGrainTemperature(data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_209',
    method: 'get',
    params: data
  })
}

// 粮温详情-历史
export function fetchHistoryGrainTemperature(data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_233',
    method: 'get',
    params: data
  })
}

// 粮温详情-报表
export function fetchReportGrainTemperature(data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_214',
    method: 'get',
    params: data
  })
}

// 粮温详情-趋势
export function fetchGrainTemperatureTrend(data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_210',
    method: 'get',
    params: data
  })
}

// 粮温详情时间列表
export function fetchGrainTemperatureDateList(data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_231',
    method: 'get',
    params: data
  })
}

// 粮温详情时间列表
export function fetchGrainTemperatureTimeList(data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_232',
    method: 'get',
    params: data
  })
}

// 气体检测数据列表
export function fetchGasList(data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_211',
    method: 'get',
    params: data
  })
}

// 气体检测数据详情-详情查询
export function fetchGasForDetail(data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_213',
    method: 'get',
    params: data
  })
}

// 气体检测数据详情-列表进入
export function fetchGasForList(data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_212',
    method: 'get',
    params: data
  })
}

// 粮温采集
export function grainTemperature(data) {
  return request({
    url: '/IGIP-BWZL-IOT2/API-GATEWAY?moduleId=BWZL_IOT_122',
    method: 'get',
    params: data
  })
}

// 查询低温储粮详情
export function lowTemAutoList(data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_044',
    method: 'post',
    params: data
  })
}

// 删除低温储粮详情
export function lowTemAutoDel(data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_042',
    method: 'post',
    params: data
  })
}
