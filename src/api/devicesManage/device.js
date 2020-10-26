import request from '../../utils/request'

/**
 * 设备API
 */

//新增设备服务接口
export function addDevice(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_401',
        method: 'post',
        params: data
    })
}
//编辑设备服务接口
export function editDevice(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_402',
        method: 'post',
        params: data
    })
}
//设备详情服务接口
export function getDevice(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_403',
        method: 'post',
        params: data
    })
}
//设备删除服务接口
export function deleDevice(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_404',
        method: 'post',
        params: data
    })
}
//设备查询服务接口
export function getDeviceList(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_405',
        method: 'post',
        params: data
    })
}