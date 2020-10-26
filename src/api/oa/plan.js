import request from '../../utils/request'

/**
 * 工作计划管理API
 */
//新增工作计划
export function addPlan(data) {
    return request({
        url: 'IGIP-BWZL-OA/API-GATEWAY?moduleId=BWZL_OA_001',
        method: 'post',
        params: data
    })
}
//编辑工作计划
export function editPlan(data) {
    return request({
        url: 'IGIP-BWZL-OA/API-GATEWAY?moduleId=BWZL_OA_002',
        method: 'post',
        params: data
    })
}
//删除工作计划
export function delePlan(data) {
    return request({
        url: 'IGIP-BWZL-OA/API-GATEWAY?moduleId=BWZL_OA_003',
        method: 'post',
        params: data
    })
}
//工作计划详情
export function getPlan(data) {
    return request({
        url: 'IGIP-BWZL-OA/API-GATEWAY?moduleId=BWZL_OA_004',
        method: 'post',
        params: data
    })
}
//工作计划列表
export function getPlanList(data) {
    return request({
        url: 'IGIP-BWZL-OA/API-GATEWAY?moduleId=BWZL_OA_005',
        method: 'post',
        params: data
    })
}