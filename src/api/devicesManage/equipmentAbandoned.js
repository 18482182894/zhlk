import request from '../../utils/request'

/**
 * 设备报废管理API
 */
//新建设备报废
export function addEquipmentAbandoned(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_221',
        method: 'post',
        params: data
    })
}
//删除设备报废
export function deleEquipmentAbandoned(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_222',
        method: 'post',
        params: data
    })
}
//编辑设备报废
export function editEquipmentAbandoned(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_223',
        method: 'post',
        params: data
    })
}
//根据设备报废记录编码查询详情
export function getEquipmentAbandoned(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_224',
        method: 'post',
        params: data
    })
}
//根据前台提供信息模糊查询
export function getEquipmentAbandonedList(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_225',
        method: 'post',
        params: data
    })
}
//申请审批接口
export function submitEquipmentAbandonedByCheck(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_226',
        method: 'post',
        params: data
    })
}
//审批回调接口
export function checkEquipmentAbandonedByCallBack(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_227',
        method: 'post',
        params: data
    })
}

