import request from '../../utils/request'

/**
 * 请假申请管理API
 */
//新增请假申请
export function addLeaveApplication(data) {
    return request({
        url: 'IGIP-BWZL-OA/API-GATEWAY?moduleId=BWZL_OA_201',
        method: 'post',
        params: data
    })
}
//删除请假申请
export function deleLeaveApplication(data) {
    return request({
        url: 'IGIP-BWZL-OA/API-GATEWAY?moduleId=BWZL_OA_202',
        method: 'post',
        params: data
    })
}
//编辑请假申请信息
export function editLeaveApplication(data) {
    return request({
        url: 'IGIP-BWZL-OA/API-GATEWAY?moduleId=BWZL_OA_203',
        method: 'post',
        params: data
    })
}
//根据请假申请编号查询详情
export function getLeaveApplication(data) {
    return request({
        url: 'IGIP-BWZL-OA/API-GATEWAY?moduleId=BWZL_OA_204',
        method: 'post',
        params: data
    })
}
//根据前台提供信息模糊查询
export function getLeaveApplicationList(data) {
    return request({
        url: 'IGIP-BWZL-OA/API-GATEWAY?moduleId=BWZL_OA_205',
        method: 'post',
        params: data
    })
}
//申请审批接口
export function submitLeaveApplicationByCheck(data) {
    return request({
        url: 'IGIP-BWZL-OA/API-GATEWAY?moduleId=BWZL_OA_206',
        method: 'post',
        params: data
    })
}
//审批回调接口
export function checkLeaveApplicationByCallBack(data) {
    return request({
        url: 'IGIP-BWZL-OA/API-GATEWAY?moduleId=BWZL_OA_207',
        method: 'post',
        params: data
    })
}