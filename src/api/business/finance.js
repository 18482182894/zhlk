import request from '../../utils/request'

/**
 * 通知单管理API
 */
//商务结算列表服务列表
export function financeList (data) {
    return request({
        url: 'IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_315',
        method: 'post',
        params: data
    })
}
//商务结算详情服务列表
export function financeDetail (data) {
    return request({
        url: 'IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_314',
        method: 'post',
        params: data
    })
}
//商务结算提交审批服务列表
export function financeApproval (data) {
    return request({
        url: 'IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_316',
        method: 'post',
        params: data
    })
}
//商务结算-业务结算单列表服务接口
export function statementList (data) {
    return request({
        url: 'IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_005',
        method: 'post',
        params: data
    })
}
//新增商务结算单
export function receivableStatement (data) {
    return request({
        url: 'IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_261',
        method: 'post',
        params: data
    })
}
//收款通知单中商务结算单列表接口
export function receivablesList (data) {
    return request({
        url: 'IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_262',
        method: 'post',
        params: data
    })
}
//新增收款通知单接口
export function receivablesAdd (data) {
    return request({
        url: 'IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_263',
        method: 'post',
        params: data
    })
}
//付款通知单中商务结算单列表接口
export function payList (data) {
    return request({
        url: 'IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_031',
        method: 'post',
        params: data
    })
}
//新增付款通知单接口
export function payAdd (data) {
    return request({
        url: 'IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_032',
        method: 'post',
        params: data
    })
}