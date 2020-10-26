import request from '../../utils/request'

/**
 * 设备管理，设备初始化、设备安装、设备保养API
 */

//新增设备初始化记录
export function addDeviceInit(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_301',
        method: 'post',
        params: data
    })
}
//设备初始化记录服务详情查询接口
export function getDeviceInit(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_302',
        method: 'post',
        params: data
    })
}
//设备初始化记录修改服务接口
export function editDeviceInit(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_303',
        method: 'post',
        params: data
    })
}
//分页查询设备初始化记录列表服务接口
export function getDeviceInitList(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_304',
        method: 'post',
        params: data
    })
}
//删除设备初始化记录服务接口
export function deleDeviceInit(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_305',
        method: 'post',
        params: data
    })
}
//新增设备安装记录服务接口
export function addDeviceInstall(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_306',
        method: 'post',
        params: data
    })
}
//设备安装详情查询服务接口
export function getDeviceInstall(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_307',
        method: 'post',
        params: data
    })
}
//设备安装记录修改服务接口
export function editDeviceInstall(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_308',
        method: 'post',
        params: data
    })
}
//分页查询设备安装列表服务接口
export function getDeviceInstallByList(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_309',
        method: 'post',
        params: data
    })
}
//删除设备安装记录服务接口
export function deleDeviceInstall(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_310',
        method: 'post',
        params: data
    })
}
//提交设备安装记录审批服务接口
export function submitDeviceInstallByCheck(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_311',
        method: 'post',
        params: data
    })
}
//设备安装系统审核回调接口
export function checkDeviceInstallByCallBack(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_312',
        method: 'post',
        params: data
    })
}
//新增设备保养记录服务接口
export function addMaintain(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_313',
        method: 'post',
        params: data
    })
}
//设备保养详情查询服务接口
export function getMaintain(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_314',
        method: 'post',
        params: data
    })
}
//设备保养信息修改服务接口
export function editMaintain(data) {
  console.log(data)
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_315',
        method: 'post',
        params: data
    })
}
//分页查询设备保养列表服务接口
export function getMaintainByList(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_316',
        method: 'post',
        params: data
    })
}
//删除设备保养记录服务接口
export function deleMaintain(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_317',
        method: 'post',
        params: data
    })
}
//提交设备保养记录审批服务接口
export function submitMaintainByCheck(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_318',
        method: 'post',
        params: data
    })
}
//设备保养系统审核回调服务接口
export function checkMaintainByCallback(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_319',
        method: 'post',
        params: data
    })
}
