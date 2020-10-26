import request from '../../utils/request'

/**
 * 通知单管理API
 */
//新增通知单
export function addNotice(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_211',
        method: 'post',
        params: data
    })
}
//删除通知单
export function deleNotice(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_212',
        method: 'post',
        params: data
    })
}
//查询该通知编号的详情信息
export function getNotice(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_214',
        method: 'post',
        params: data
    })
}
//模糊查询通知单信息业务
export function getNoticeList(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_215',
        method: 'post',
        params: data
    })
}