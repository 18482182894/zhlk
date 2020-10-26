import request from '../../../utils/request'

/**
 * 台账API
 */
//
//库存台账列表
export function inventoryList (data) {
    return request({
        url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_102',
        method: 'post',
        params: data
    })
}
//库存台账详情
export function inventoryDetail (data) {
    return request({
        url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_104',
        method: 'post',
        params: data
    })
}
//粮库业务-库存台账详情
export function fetchInventory (data) {
    return request({
        url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_111',
        method: 'post',
        params: data
    })
}
//历史台账列表
export function inventoryHistoryList (data) {
    return request({
        url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_103',
        method: 'post',
        params: data
    })
}
//封仓操作
export function barn (data) {
    return request({
        url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_101',
        method: 'post',
        params: data
    })
}
//根据廒间查询对应摄像头信息
export function getDvr (data) {
    return request({
        url: 'IGIP-BWZL-ISMS/API-GATEWAY?moduleId=BWZL_ISMS_177',
        method: 'post',
        params: data
    })
}

