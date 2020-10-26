import request from '../../../utils/request'

/**
 * 定性管理API
 */
//分页查询粮食定性列表
export function qualitativeApi (data) {
    return request({
        url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_304',
        method: 'post',
        params: data
    })
}
//修改粮食定性
export function qualitativeEditApi (data) {
    return request({
        url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_303',
        method: 'post',
        params: data
    })
}
//定性详情
export function qualitativeDetailApi (data) {
    return request({
        url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_302',
        method: 'post',
        params: data
    })
}
//新增粮食定性
export function qualitativeAddApi (data) {
    return request({
        url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_301',
        method: 'post',
        params: data
    })
}
//删除粮食定性
export function qualitativeDelApi (data) {
    return request({
        url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_305',
        method: 'post',
        params: data
    })
}
//提交粮食定性审批
export function qualitativeApprovalApi (data) {
    return request({
        url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_306',
        method: 'post',
        params: data
    })
}