import request from '../../utils/request'

//报警策略列表
export function warningList(data){
  return request({
    url:'IGIP-BWZL-FWMS/API-GATEWAY?moduleId=BWZL_FWMS_502',
    method:'post',
    params:data
  })
}
//粮温报警策略删除
export function warningDel(data){
  return request({
    url:'IGIP-BWZL-FWMS/API-GATEWAY?moduleId=BWZL_FWMS_104',
    method:'post',
    params:data
  })
}
//粮温报警策略新增
export function warningTemNew(data){
  return request({
    url:'IGIP-BWZL-FWMS/API-GATEWAY?moduleId=BWZL_FWMS_101',
    method:'post',
    params:data
  })
}
//粮温报警策略详情
export function warningTemperatureDetail(data){
  return request({
    url:'IGIP-BWZL-FWMS/API-GATEWAY?moduleId=BWZL_FWMS_102',
    method:'post',
    params:data
  })
}
//气体报警策略新增
export function warningGasNew(data){
  return request({
    url:'IGIP-BWZL-FWMS/API-GATEWAY?moduleId=BWZL_FWMS_301',
    method:'post',
    params:data
  })
}
//气体报警策略详情
export function warningGasDatil(data){
  return request({
    url:'IGIP-BWZL-FWMS/API-GATEWAY?moduleId=BWZL_FWMS_303',
    method:'post',
    params:data
  })
}
//气体报警策略删除
export function warningGasDel(data){
  return request({
    url:'IGIP-BWZL-FWMS/API-GATEWAY?moduleId=BWZL_FWMS_302',
    method:'post',
    params:data
  })
}
//封仓报警策略新增
export function warningInventoryNew(data){
  return request({
    url:'IGIP-BWZL-FWMS/API-GATEWAY?moduleId=BWZL_FWMS_001',
    method:'post',
    params:data
  })
}
//封仓报警策略详情
export function warningInventoryDatil(data){
  return request({
    url:'IGIP-BWZL-FWMS/API-GATEWAY?moduleId=BWZL_FWMS_003',
    method:'post',
    params:data
  })
}
//封仓报警策略删除
export function warningInventoryDel(data){
  return request({
    url:'IGIP-BWZL-FWMS/API-GATEWAY?moduleId=BWZL_FWMS_002',
    method:'post',
    params:data
  })
}
//虫情报警策略新增
export function warningInsectNew(data){
  return request({
    url:'IGIP-BWZL-FWMS/API-GATEWAY?moduleId=BWZL_FWMS_401',
    method:'post',
    params:data
  })
}
//虫情报警策略详情
export function warningInsectDatil(data){
  return request({
    url:'IGIP-BWZL-FWMS/API-GATEWAY?moduleId=BWZL_FWMS_403',
    method:'post',
    params:data
  })
}
//虫情报警策略删除
export function warningInsectDel(data){
  return request({
    url:'IGIP-BWZL-FWMS/API-GATEWAY?moduleId=BWZL_FWMS_402',
    method:'post',
    params:data
  })
}
