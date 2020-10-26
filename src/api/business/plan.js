import request from '../../utils/request'

/**
 * 计划管理API
 */

//新增、再申请、变更计划
export function addPlan(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_001',
        method: 'post',
        params: data
    })
}
//编辑计划
export function editPlan(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_002',
        method: 'post',
        params: data
    })
}
//删除计划
export function delePlan(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_003',
        method: 'post',
        params: data
    })
}
//计划详情
export function getPlanById(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_004',
        method: 'post',
        params: data
    })
}
//计划列表
export function getPlanList(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_005',
        method: 'post',
        params: data
    })
}
//计划提交审批
export function addPlanByCheck(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_006',
        method: 'post',
        params: data
    })
}
//计划审批回调
export function planCheckCallBack(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_007',
        method: 'post',
        params: data
    })
}