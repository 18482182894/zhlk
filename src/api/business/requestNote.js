import request from '../../utils/request'

/**
 * 申请单管理API
 */
//新增申请单
export function addRequestNote(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_201',
        method: 'post',
        params: data
    })
}
//删除申请单
export function deleRequestNote(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_202',
        method: 'post',
        params: data
    })
}
//编辑申请单
export function editRequestNote(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_203',
        method: 'post',
        params: data
    })
}
//查询该申请编号的详情信息
export function getRequestNote(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_204',
        method: 'post',
        params: data
    })
}
//模糊查询申请单信息业务
export function getRequestNoteList(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_205',
        method: 'post',
        params: data
    })
}
//申请审批接口
export function submitRequestNoteByCheck(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_230',
        method: 'post',
        params: data
    })
}
//审批回调接口
export function checkRequestNoteByCallBack(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_231',
        method: 'post',
        params: data
    })
}