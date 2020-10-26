import request from '../../utils/request'

/**
 * 设备故障单管理API
 */
//新增设备故障单服务接口
export function addEquipmentFailure(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_011',
        method: 'post',
        params: data
    })
}
//修改设备故障单服务接口
export function editEquipmentFailure(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_012',
        method: 'post',
        params: data
    })
}
//删除设备故障记录
export function deleEquipmentFailure(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_013',
        method: 'post',
        params: data
    })
}
//设备故障记录详细信息服务接口
export function getEquipmentFailure(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_014',
        method: 'post',
        params: data
    })
}
//设备故障记录分页列表服务接口
export function getEquipmentFailureList(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_015',
        method: 'post',
        params: data
    })
}
//设备故障记录提交审批务接口
export function submitEquipmentFailureByCheck(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_016',
        method: 'post',
        params: data
    })
}
//设备故障记录审批回调服务接口
export function checkEquipmentFailureByCallBack(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_017',
        method: 'post',
        params: data
    })
}