import request from '../../utils/request'
/**
 * 能耗api
 */

//手动采集电能信息接口
export function electricAdd (data) {
  return request({
    url: '/IGIP-BWZL-ECMS/API-GATEWAY?moduleId=BWZL_ECMS_001',
    method: 'post',
    params: data
  })
}
//删除电能信息
export function electricDel (data) {
  return request({
    url: '/IGIP-BWZL-ECMS/API-GATEWAY?moduleId=BWZL_ECMS_002',
    method: 'post',
    params: data
  })
}
//电能采集列表接口
export function electricList (data) {
  return request({
    url: '/IGIP-BWZL-ECMS/API-GATEWAY?moduleId=BWZL_ECMS_004',
    method: 'post',
    params: data
  })
}
//电能记录详情接口
export function electricDetail (data) {
  return request({
    url: '/IGIP-BWZL-ECMS/API-GATEWAY?moduleId=BWZL_ECMS_003',
    method: 'post',
    params: data
  })
}
//手动采集水能信息接口
export function hydroenergyAdd (data) {
  return request({
    url: '/IGIP-BWZL-ECMS/API-GATEWAY?moduleId=BWZL_ECMS_005',
    method: 'post',
    params: data
  })
}
//删除水能信息
export function hydroenergyDel (data) {
  return request({
    url: '/IGIP-BWZL-ECMS/API-GATEWAY?moduleId=BWZL_ECMS_006',
    method: 'post',
    params: data
  })
}
//水能采集列表接口
export function hydroenergyList (data) {
  return request({
    url: '/IGIP-BWZL-ECMS/API-GATEWAY?moduleId=BWZL_ECMS_008',
    method: 'post',
    params: data
  })
}
//水能记录详情接口
export function hydroenergyDetail (data) {
  return request({
    url: '/IGIP-BWZL-ECMS/API-GATEWAY?moduleId=BWZL_ECMS_007',
    method: 'post',
    params: data
  })
}
//完成电能采集接口
export function electricFinish (data) {
  return request({
    url: '/IGIP-BWZL-ECMS/API-GATEWAY?moduleId=BWZL_ECMS_009',
    method: 'post',
    params: data
  })
}
//完成水能采集接口
export function hydroenergyFinish (data) {
  return request({
    url: '/IGIP-BWZL-ECMS/API-GATEWAY?moduleId=BWZL_ECMS_010',
    method: 'post',
    params: data
  })
}
//新增借电信息接口
export function borrowElectricityAdd (data) {
  return request({
    url: '/IGIP-BWZL-ECMS/API-GATEWAY?moduleId=BWZL_ECMS_101',
    method: 'post',
    params: data
  })
}
//借电记录详情查询服务接口
export function borrowElectricityDetail (data) {
  return request({
    url: '/IGIP-BWZL-ECMS/API-GATEWAY?moduleId=BWZL_ECMS_102',
    method: 'post',
    params: data
  })
}
//修改借电信息接口
export function borrowElectricityEdit (data) {
  return request({
    url: '/IGIP-BWZL-ECMS/API-GATEWAY?moduleId=BWZL_ECMS_103',
    method: 'post',
    params: data
  })
}
//借电管理列表查询接口
export function borrowElectricityList (data) {
  return request({
    url: '/IGIP-BWZL-ECMS/API-GATEWAY?moduleId=BWZL_ECMS_104',
    method: 'post',
    params: data
  })
}
//删除借电记录服务接口
export function borrowElectricityDel (data) {
  return request({
    url: '/IGIP-BWZL-ECMS/API-GATEWAY?moduleId=BWZL_ECMS_105',
    method: 'post',
    params: data
  })
}

//能耗统计列表查询服务接口
export function energyStatisticsList (data) {
  return request({
    url: '/IGIP-BWZL-ECMS/API-GATEWAY?moduleId=BWZL_ECMS_106',
    method: 'post',
    params: data
  })
}

//能耗统计图形报表查询服务接口
export function energyStatisticsReport (data) {
  return request({
    url: '/IGIP-BWZL-ECMS/API-GATEWAY?moduleId=BWZL_ECMS_107',
    method: 'post',
    params: data
  })
}
//设置作业前电表读数服务接口
export function beforeHomeworkMeterReading  (data) {
  return request({
    url: '/IGIP-BWZL-ECMS/API-GATEWAY?moduleId=BWZL_ECMS_108',
    method: 'post',
    params: data
  })
}
//设置作业后电表读数服务接口
export function afterHomeworkMeterReading  (data) {
  return request({
    url: '/IGIP-BWZL-ECMS/API-GATEWAY?moduleId=BWZL_ECMS_109',
    method: 'post',
    params: data
  })
}
//实时能耗电量接口
export function realTimeData (data) {
  return request({
    url: '/IGIP-BWZL-IOT2/API-GATEWAY?moduleId=BWZL_IOT_126',
    method: 'post',
    params: data
  })
}
