import request from '../../utils/request'

/**
 * 合同管理API
 */
//新增客户不良记录
export function addCustomerBadLog(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_301',
        method: 'post',
        params: data
    })
}
//删除客户不良记录
export function deleCustomerBadLog(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_302',
        method: 'post',
        params: data
    })
}
//客户不良记录列表查询
export function getCustomerBadLogList(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_303',
        method: 'post',
        params: data
    })
}
//新增合同
export function addConstract(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_304',
        method: 'post',
        params: data
    })
}
//合同详情
export function getConstract(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_305',
        method: 'post',
        params: data
    })
}
//合同列表
export function getConstractList(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_306',
        method: 'post',
        params: data
    })
}
//删除合同
export function deleConstract(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_307',
        method: 'post',
        params: data
    })
}
//修改合同
export function editConstract(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_308',
        method: 'post',
        params: data
    })
}
//提交合同审核
export function submitConstractByCheck(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_309',
        method: 'post',
        params: data
    })
}
//新增合同系统审核回调接口
export function submitConstractByCallBack(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_310',
        method: 'post',
        params: data
    })
}
//中止合同服务接口
export function stopConstract(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_311',
        method: 'post',
        params: data
    })
}
//变更合同服务接口
export function changeConstract(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_312',
        method: 'post',
        params: data
    })
}
//合同中止系统审核回调接口
export function changeConstractByCallBack(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_313',
        method: 'post',
        params: data
    })
}
//合同选择列表
export function getConstractListBySelect(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_314',
        method: 'post',
        params: data
    })
}