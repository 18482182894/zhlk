import request from '../../utils/request'

/**
 * 设备借出管理API
 */

//新建设备借出记录单
export function addBorrow(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_211',
        method: 'post',
        params: data
    })
}
//删除设备借出记录信息
export function deleBorrow(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_212',
        method: 'post',
        params: data
    })
}
//编辑设备借出记录信息
export function editBorrow(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_213',
        method: 'post',
        params: data
    })
}
//根据设备维修记录编码查询详情
export function getBorrow(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_214',
        method: 'post',
        params: data
    })
}
//根据前台提供信息模糊查询
export function getBorrowList(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_215',
        method: 'post',
        params: data
    })
}
//借出申请审批接口
export function submitBorrowByCheck(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_216',
        method: 'post',
        params: data
    })
}
//归还申请审批接口
export function submitBackByCheck(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_218',
        method: 'post',
        params: data
    })
}
//借出审批回调接口
export function checkBorrowByCallback(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_217',
        method: 'post',
        params: data
    })
}
//归还审批回调接口
export function checkBackByCallback(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_219',
        method: 'post',
        params: data
    })
}