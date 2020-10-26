import request from '../../utils/request'

/**
 * 智能安防 API
 */

//新增摄像头信息
export function addCamera(data) {
    return request({
        url: 'IGIP-BWZL-ISMS/API-GATEWAY?moduleId=BWZL_ISMS_111',
        method: 'post',
        params: data
    })
}
//编辑摄像头信息
export function editCamera(data) {
    return request({
        url: 'IGIP-BWZL-ISMS/API-GATEWAY?moduleId=BWZL_ISMS_112',
        method: 'post',
        params: data
    })
}
//删除摄像头信息
export function delCamera(data) {
    return request({
        url: 'IGIP-BWZL-ISMS/API-GATEWAY?moduleId=BWZL_ISMS_113',
        method: 'post',
        params: data
    })
}
//摄像头详细信息
export function detailCamera(data) {
    return request({
        url: 'IGIP-BWZL-ISMS/API-GATEWAY?moduleId=BWZL_ISMS_114',
        method: 'post',
        params: data
    })
}
//摄像头列表信息
export function ListCamera(data) {
    return request({
        url: 'IGIP-BWZL-ISMS/API-GATEWAY?moduleId=BWZL_ISMS_115',
        method: 'post',
        params: data
    })
}
// 模糊查询仓内监控列表
export function warehouseMonitorList (data) {
    return request({
        url: 'IGIP-BWZL-ISMS/API-GATEWAY?moduleId=BWZL_ISMS_005',
        method: 'post',
        params: data
    })
}
// 模糊查询库区监控列表
export function reservoirMonitorList (data) {
    return request({
        url: 'IGIP-BWZL-ISMS/API-GATEWAY?moduleId=BWZL_ISMS_006',
        method: 'post',
        params: data
    })
}
//新增视频报警
export function addVideoAlarm (data) {
    return request({
        url: 'IGIP-BWZL-ISMS/API-GATEWAY?moduleId=BWZL_ISMS_001',
        method: 'post',
        params: data
    })
}
//编辑视频报警
export function editVideoAlarm (data) {
    return request({
        url: 'IGIP-BWZL-ISMS/API-GATEWAY?moduleId=BWZL_ISMS_002',
        method: 'post',
        params: data
    })
}
//视频报警详细信息
export function detailVideoAlarm (data) {
    return request({
        url: 'IGIP-BWZL-ISMS/API-GATEWAY?moduleId=BWZL_ISMS_003',
        method: 'post',
        params: data
    })
}
//视频报警列表信息
export function ListVideoAlarm (data) {
    return request({
        url: 'IGIP-BWZL-ISMS/API-GATEWAY?moduleId=BWZL_ISMS_004',
        method: 'post',
        params: data
    })
}
//新增硬盘录像机信息
export function addDigitalVideoRecorder (data) {
    return request({
        url: 'IGIP-BWZL-ISMS/API-GATEWAY?moduleId=BWZL_ISMS_101',
        method: 'post',
        params: data
    })
}
//编辑硬盘录像机信息
export function editDigitalVideoRecorder (data) {
    return request({
        url: 'IGIP-BWZL-ISMS/API-GATEWAY?moduleId=BWZL_ISMS_102',
        method: 'post',
        params: data
    })
}
//删除硬盘录像机信息
export function delDigitalVideoRecorder (data) {
    return request({
        url: 'IGIP-BWZL-ISMS/API-GATEWAY?moduleId=BWZL_ISMS_103',
        method: 'post',
        params: data
    })
}
//硬盘录像机详细信息
export function detailDigitalVideoRecorder (data) {
    return request({
        url: 'IGIP-BWZL-ISMS/API-GATEWAY?moduleId=BWZL_ISMS_104',
        method: 'post',
        params: data
    })
}
//硬盘录像机列表信息
export function ListDigitalVideoRecorder (data) {
    return request({
        url: 'IGIP-BWZL-ISMS/API-GATEWAY?moduleId=BWZL_ISMS_105',
        method: 'post',
        params: data
    })
}
//查询硬盘录像机摄像头信息
export function dvrCameras (data) {
    return request({
        url: 'IGIP-BWZL-ISMS/API-GATEWAY?moduleId=BWZL_ISMS_050',
        method: 'post',
        params: data
    })
}