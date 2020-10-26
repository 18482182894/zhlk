import request from '../../utils/request'

/**
 * 通知单管理API
 */
//新增报销申请单
export function addReimbursement(data) {
    return request({
        url: 'IGIP-BWZL-OA/API-GATEWAY?moduleId=BWZL_OA_301',
        method: 'post',
        params: data
    })
}
//报销申请单详情
export function getReimbursement(data) {
    return request({
        url: 'IGIP-BWZL-OA/API-GATEWAY?moduleId=BWZL_OA_302',
        method: 'post',
        params: data
    })
}
//修改报销申请单
export function editReimbursement(data) {
    return request({
        url: 'IGIP-BWZL-OA/API-GATEWAY?moduleId=BWZL_OA_303',
        method: 'post',
        params: data
    })
}
//分页查询报销单列表服务接口
export function getReimbursementList(data) {
    return request({
        url: 'IGIP-BWZL-OA/API-GATEWAY?moduleId=BWZL_OA_304',
        method: 'post',
        params: data
    })
}
//批量删除报销单服务接口
export function deleReimbursementByBatch(data) {
    return request({
        url: 'IGIP-BWZL-OA/API-GATEWAY?moduleId=BWZL_OA_305',
        method: 'post',
        params: data
    })
}
//提交报销单审批服务接口
export function submitReimbursementByCheck(data) {
    return request({
        url: 'IGIP-BWZL-OA/API-GATEWAY?moduleId=BWZL_OA_306',
        method: 'post',
        params: data
    })
}
//申请报销系统审核回调接口
export function checkReimbursementByCallBack(data) {
    return request({
        url: 'IGIP-BWZL-OA/API-GATEWAY?moduleId=BWZL_OA_307',
        method: 'post',
        params: data
    })
}