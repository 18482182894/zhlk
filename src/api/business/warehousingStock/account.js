import request from '../../../utils/request'

/**
 * 台账API
 */
//
//库存总账列表
export function generalLedgerList (data) {
    return request({
        url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_211',
        method: 'post',
        params: data
    })
}
//库存总账详情
export function generalLedgerDetail (data) {
    return request({
        url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_212',
        method: 'post',
        params: data
    })
}
//总账明细
export function generalLedgerMX (data) {
    return request({
        url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_212',
        method: 'post',
        params: data
    })
}
//分仓保管账列表
export function warehouseList (data) {
    return request({
        url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_232',
        method: 'post',
        params: data
    })
}
//分仓保管账月结
export function warehouseSettle (data) {
    return request({
        url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_234',
        method: 'post',
        params: data
    })
}
//结算周期设置
export function settlementCycle (data) {
    return request({
        url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_231',
        method: 'post',
        params: data
    })
}
//期初库存设置接口
export function openingInventory  (data) {
    return request({
        url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_230',
        method: 'post',
        params: data
    })
}
//出入库明细
export function SettlementMX (data) {
    return request({
        url: 'IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_255',
        method: 'post',
        params: data
    })
}
// 油罐库存列表数据
export function tankInventoryData (data) {
    return request({
        url: 'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_164',
        method: 'post',
        params: data
    })
}
// 油罐库存编辑提交
export function tankInventoryEdit(data) {
    return request({
        url: 'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_165',
        method: 'post',
        params: data
    })
}