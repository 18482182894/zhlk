import request from '../../utils/request'
/**
 * 出入库报表API
 */

//出入库日结单
export function dailyStatement (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_201',
        method: 'post',
        params: data
    })
}
//出入库月结单
export function monthlyStatement (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_202',
        method: 'post',
        params: data
    })
}
//出入库季结单
export function quarterlyStatement (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_203',
        method: 'post',
        params: data
    })
}
//出入库年结单
export function annualStatement (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_204',
        method: 'post',
        params: data
    })
}
//后台批处理日结
export function dailyKnots (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_220',
        method: 'post',
        params: data
    })
}
//后台批处理月结
export function monthlyKnots (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_221',
        method: 'post',
        params: data
    })
}