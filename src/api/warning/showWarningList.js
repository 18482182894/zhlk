import request from '../../utils/request'

//预报警信息列表
export function showWarningList(data){
  return request({
    url:'IGIP-BWZL-FWMS/API-GATEWAY?moduleId=BWZL_FWMS_501',
    method:'post',
    params:data
  })
}
//预报警记录未读信息
export function noReadWaringCnts(data){
  return request({
    url:'IGIP-BWZL-FWMS/API-GATEWAY?moduleId=BWZL_FWMS_520',
    method:'post',
    params:data
  })
}
/*//预报警信息详情
export function showWarningDetail(data){
  return request({
    url:'IGIP-BWZL-FWMS/API-GATEWAY?moduleId=BWZL_FWMS_102',
    method:'post',
    params:data
  })
}*/



