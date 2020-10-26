import request from '../utils/request'

//年度分类统计
export function annualClass(data) {
    return request({
        url: 'IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_287',
        method: 'post',
        params: data
    })
}
//年度数量统计
export function annualQuantity(data) {
    return request({
        url: 'IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_288',
        method: 'post',
        params: data
    })
}
// 计划合同分析
export function plannedContracts(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_021',
        method: 'post',
        params: data
    })
}
// 粮食易存统计接口
export function inventoryStatistics (data) {
    return request({
        url: 'IGIP-BWZL-QTS/API-GATEWAY?moduleId=BWZL_QTS_503',
        method: 'post',
        params: data
    })
}
// 财务分析饼状图接口
export function financialAnalysisPie (data) {
    return request({
        url: 'IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_284',
        method: 'post',
        params: data
    })
}
// 年度出入库量对比表
export function crkContrast (data) {
    return request({
        url: 'IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_022',
        method: 'post',
        params: data
    })
}
// 年度分类出库统计
export function exportClass (data) {
    return request({
        url: 'IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_351',
        method: 'post',
        params: data
    })
}
// 年度分类入库统计
export function putClass (data) {
    return request({
        url: 'IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_350',
        method: 'post',
        params: data
    })
}
// 合同签订情况
export function contractSigning (data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_315',
        method: 'post',
        params: data
    })
}
// 计划执行情况
export function planExecution (data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_268',
        method: 'post',
        params: data
    })
}
// 货款支付情况
export function goodsPay (data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_316',
        method: 'post',
        params: data
    })
}
// 货款回笼情况
export function  goodsWithdrawal (data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_317',
        method: 'post',
        params: data
    })
}
// 分类采购或销售价格分析
export function  classifiedPurchasingSalesPrice (data) {
    return request({
        url: 'IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_023',
        method: 'post',
        params: data
    })
}