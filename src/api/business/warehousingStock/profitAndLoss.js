import request from '../../../utils/request'

/**
 * 盘点API
 */
//新增损益记录
export function profitAndLossAdd (data) {
    return request({
        url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_312',
        method: 'post',
        params: data
    })
}
//损益详情查询
export function profitAndLossDetail (data) {
    return request({
        url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_313',
        method: 'post',
        params: data
    })
}
//损益编辑
export function profitAndLossEdit (data) {
    return request({
        url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_314',
        method: 'post',
        params: data
    })
}
//分页查询损益列表
export function profitAndLossList (data) {
    return request({
        url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_315',
        method: 'post',
        params: data
    })
}
//删除粮食损益
export function profitAndLossDel (data) {
    return request({
        url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_316',
        method: 'post',
        params: data
    })
}
//损益提交系统审批
export function profitAndLossApproval (data) {
    return request({
        url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_317',
        method: 'post',
        params: data
    })
}