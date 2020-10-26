import request from '../../utils/request'

/**
 * 设备维修记录单 API
 */

//新建设备维修记录单
export function addRepair(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_201',
        method: 'post',
        params: data
    })
}
//删除设备维修记录单
export function deleRepair(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_202',
        method: 'post',
        params: data
    })
}
//编辑设备维修记录单
export function editRepair(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_203',
        method: 'post',
        params: data
    })
}
//根据设备维修记录编码查询详情
export function getRepair(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_204',
        method: 'post',
        params: data
    })
}
//根据前台提供信息模糊查询
export function getRepairList(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_205',
        method: 'post',
        params: data
    })
}
//申请审批接口
export function submitRepairByCheck(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_206',
        method: 'post',
        params: data
    })
}
//审批回调接口
export function checkRepairByCallback(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_207',
        method: 'post',
        params: data
    })
}
