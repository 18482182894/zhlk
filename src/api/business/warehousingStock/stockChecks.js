import request from '../../../utils/request'

/**
 * 盘点API
 */
//新增盘点记录
export function stockChecksAdd (data) {
    return request({
        url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_308',
        method: 'post',
        params: data
    })
}
//盘点详情查询
export function stockChecksDetail (data) {
    return request({
        url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_309',
        method: 'post',
        params: data
    })
}
//分页查询盘点列表
export function stockChecksList (data) {
    return request({
        url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_310',
        method: 'post',
        params: data
    })
}
//库存盘点选择列表
export function stockChecksCheck (data) {
    return request({
        url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_311',
        method: 'post',
        params: data
    })
}