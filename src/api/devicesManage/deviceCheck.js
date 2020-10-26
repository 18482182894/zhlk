import request from '../../utils/request'

/**
 * 设备验收记录 API
 */

//新增设备验收记录
export function addDeviceCheck(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_021',
        method: 'post',
        params: data
    })
}
//修改设备验收单服务接口
export function editDeviceCheck(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_022',
        method: 'post',
        params: data
    })
}
//删除设备验收记录
export function deleDeviceCheck(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_023',
        method: 'post',
        params: data
    })
}
//设备验收记录详细信息服务接口
export function getDeviceCheck(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_024',
        method: 'post',
        params: data
    })
}
//设备验收记录分页列表服务接口
export function getDeviceCheckList(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_025',
        method: 'post',
        params: data
    })
}
//设备验收记录分页列表服务接口
// export function getDeviceCheckList(data) {
//     return request({
//         url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_025',
//         method: 'post',
//         params: data
//     })
// }
//设备验收记录提交审批接口
export function submitDeviceCheckByCheck(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_026',
        method: 'post',
        params: data
    })
}
//设备验收记录审批回调服务接口
export function checkDeviceCheckByCallback(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_027',
        method: 'post',
        params: data
    })
}
