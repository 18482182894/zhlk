import request from '../../../utils/request'

/**
 * 移交API
 */
//新增移交记录
export function transferAdd (data) {
    return request({
        url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_001',
        method: 'post',
        params: data
    })
}
//编辑移交记录
export function transferEdit (data) {
    return request({
        url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_002',
        method: 'post',
        params: data
    })
}
//移交详情查询
export function transferDetail (data) {
    return request({
        url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_004',
        method: 'post',
        params: data
    })
}
//移交删除
export function transferDel (data) {
    return request({
        url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_003',
        method: 'post',
        params: data
    })
}
//分页查询移交列表
export function transferList (data) {
    return request({
        url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_005',
        method: 'post',
        params: data
    })
}
//移交记录
export function transferRecord (data) {
    return request({
        url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_006',
        method: 'post',
        params: data
    })
}