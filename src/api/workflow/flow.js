import request from '../../utils/request'

/**
 * 流程API接口
 */

//自定义流程服务接口
export function customFlow(data){
    return request({
        url:'IGIP-BWZL-WFMS/API-GATEWAY?moduleId=BWZL_BASE_048',
        method:'post',
        params:data
    })
}
//修改流程接口
export function editFlow(data){
    return request({
        url:'IGIP-BWZL-WFMS/API-GATEWAY?moduleId=BWZL_BASE_049',
        method:'post',
        params:data
    })
}
// 流程详情
export function detailFlow(data){
  return request({
    url:'IGIP-BWZL-WFMS/API-GATEWAY?moduleId=BWZL_BASE_101',
    method:'post',
    params:data
  })
}

//删除流程接口
export function deleFlow(data){
    return request({
        url:'IGIP-BWZL-WFMS/API-GATEWAY?moduleId=BWZL_BASE_050',
        method:'post',
        params:data
    })
}
//分页查询流程列表服务接口
export function getFlowList(data){
    return request({
        url:'IGIP-BWZL-WFMS/API-GATEWAY?moduleId=BWZL_BASE_051',
        method:'post',
        params:data
    })
}
//查询流程下拉列表
export function getFlowSelect(data){
    return request({
        url:'IGIP-BWZL-WFMS/API-GATEWAY?moduleId=BWZL_BASE_074',
        method:'post',
        params:data
    })
}
//业务流程开关创建服务接口
export function addFlowPower(data){
    return request({
        url:'IGIP-BWZL-WFMS/API-GATEWAY?moduleId=BWZL_BASE_071',
        method:'post',
        params:data
    })
}
//查询业务流程开关列表
export function getFlowPowerList(data){
    return request({
        url:'IGIP-BWZL-WFMS/API-GATEWAY?moduleId=BWZL_BASE_072',
        method:'post',
        params:data
    })
}
//业务流程开关启用与关闭
export function editFlowPowerOpenOrClose(data){
    return request({
        url:'IGIP-BWZL-WFMS/API-GATEWAY?moduleId=BWZL_BASE_073',
        method:'post',
        params:data
    })
}
//查询流程是否启用服务接口
export function getFlowPower(data){
    return request({
        url:'IGIP-BWZL-WFMS/API-GATEWAY?moduleId=BWZL_BASE_075',
        method:'post',
        params:data
    })
}
