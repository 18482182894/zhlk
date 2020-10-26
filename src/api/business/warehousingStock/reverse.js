import request from '../../../utils/request'

/**
 * 倒仓API
 */
//新增倒仓记录
export function reverseAdd (data) {
    return request({
        url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_011',
        method: 'post',
        params: data
    })
}
//编辑倒仓记录
export function reverseEdit (data) {
    return request({
        url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_012',
        method: 'post',
        params: data
    })
}
//倒仓详情查询
export function reverseDetail (data) {
    return request({
        url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_014',
        method: 'post',
        params: data
    })
}
//倒仓删除
export function reverseDel (data) {
    return request({
        url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_013',
        method: 'post',
        params: data
    })
}
//分页查询倒仓列表
export function reverseList (data) {
    return request({
        url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_015',
        method: 'post',
        params: data
    })
}
//倒仓审批
export function reverseApproval (data) {
    return request({
        url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_016',
        method: 'post',
        params: data
    })
}