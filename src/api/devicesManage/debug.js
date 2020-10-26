import request from '../../utils/request'

/**
 * 设备调试记录单管理API
 */
//新增设备调试单服务接口
export function addDebug(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_001',
        method: 'post',
        params: data
    })
}
//修改设备调试单服务接口
export function editDebug(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_002',
        method: 'post',
        params: data
    })
}
//删除设备调试记录
export function deleDebug(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_003',
        method: 'post',
        params: data
    })
}
//设备调试记录详细信息服务接口
export function getDebug(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_004',
        method: 'post',
        params: data
    })
}
//设备调试记录分页列表服务接口
export function getDebugList(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_005',
        method: 'post',
        params: data
    })
}
//设备调试记录提交审批务接口
export function submitDebugByCheck(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_006',
        method: 'post',
        params: data
    })
}
//设备调试记录审批回调服务接口
export function checkDebugByCallBack(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_007',
        method: 'post',
        params: data
    })
}

