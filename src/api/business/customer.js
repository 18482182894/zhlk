import request from '../../utils/request'

/**
 * 客户管理API
 */
//新增客户
export function addCustomer(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_011',
        method: 'post',
        params: data
    })
}
//修改、变更客户
export function editCustomer(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_012',
        method: 'post',
        params: data
    })
}
//删除客户
export function deleCustomer(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_013',
        method: 'post',
        params: data
    })
}
//客户详情
export function getCustomer(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_014',
        method: 'post',
        params: data
    })
}
//客户列表
export function getCustomerList(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_015',
        method: 'post',
        params: data
    })
}
//客户信息变更，提交审批
export function addCustomerByCheck(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_016',
        method: 'post',
        params: data
    })
}
//客户信息变更审批回调
export function customerCheckCallBack(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_017',
        method: 'post',
        params: data
    })
}
//删除生效客户信息提交审批服务接口
export function deleCustomerByCheck(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_018',
        method: 'post',
        params: data
    })
}
//删除生效客户信息提交审批之后，回调服务接口
export function deleCustomerCheckByCallBack(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_019',
        method: 'post',
        params: data
    })
}

