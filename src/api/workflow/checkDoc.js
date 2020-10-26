import request from '../../utils/request'

/**
 * 流程审批单据API接口
 */
//节点审批人列表查询接口
export function getCheckerList(data){
    return request({
        url:'IGIP-BWZL-WFMS/API-GATEWAY?moduleId=BWZL_BASE_060',
        method:'post',
        params:data
    })
}
//审批单据列表查询接口
export function getCheckeDocList(data){
    return request({
        url:'IGIP-BWZL-WFMS/API-GATEWAY?moduleId=BWZL_BASE_064',
        method:'post',
        params:data
    })
}
//审批单据详情接口
export function getCheckeDoc(data){
    return request({
        url:'IGIP-BWZL-WFMS/API-GATEWAY?moduleId=BWZL_BASE_065',
        method:'post',
        params:data
    })
}
//新增审批单据接口
export function addCheckeDoc(data){
    return request({
        url:'IGIP-BWZL-WFMS/API-GATEWAY?moduleId=BWZL_BASE_061',
        method:'post',
        params:data
    })
}
//修改审批单据状态并记录流程处理明细日志接口
export function editCheckeDoc(data){
    return request({
        url:'IGIP-BWZL-WFMS/API-GATEWAY?moduleId=BWZL_BASE_062',
        method:'post',
        params:data
    })
}
