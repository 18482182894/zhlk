import request from '../../utils/request'

/**
 * 物联设备管理 API
 */

//物联类型
export function wltype(data) {
    return request({
        url: 'IGIP-BWZL-IOT/API-GATEWAY?moduleId=BWZL_IOT_114',
        method: 'post',
        params: data
    })
}

//增加物联设备
export function addwl(data) {
    return request({
        url: 'IGIP-BWZL-IOT/API-GATEWAY?moduleId=BWZL_IOT_111',
        method: 'post',
        params: data
    })
}

//删除物联设备
export function delwl(data) {
    return request({
        url: 'IGIP-BWZL-IOT/API-GATEWAY?moduleId=BWZL_IOT_112',
        method: 'post',
        params: data
    })
}

//查询物联设备
export function wlInfo(data) {
    return request({
        url: 'IGIP-BWZL-IOT/API-GATEWAY?moduleId=BWZL_IOT_113',
        method: 'post',
        params: data
    })
}

//库点功能位置信息
export function locationInfo(data) {
    return request({
        url: 'IGIP-BWZL-IOT/API-GATEWAY?moduleId=BWZL_IOT_104',
        method: 'post',
        params: data
    })
}

//新增库点功能位置
export function addlocationInfo(data) {
    return request({
        url: 'IGIP-BWZL-IOT/API-GATEWAY?moduleId=BWZL_IOT_101',
        method: 'post',
        params: data
    })
}

//删除库点功能位置
export function deltlocationInfo(data) {
    return request({
        url: 'IGIP-BWZL-IOT/API-GATEWAY?moduleId=BWZL_IOT_102',
        method: 'post',
        params: data
    })
}

//库点功能位置详细 信息
export function querylocationInfo(data) {
    return request({
        url: 'IGIP-BWZL-IOT/API-GATEWAY?moduleId=BWZL_IOT_103',
        method: 'post',
        params: data
    })
}

//物联设备信息
export function equipmentInfo(data) {
    return request({
        url: 'IGIP-BWZL-IOT/API-GATEWAY?moduleId=BWZL_IOT_004',
        method: 'post',
        params: data
    })
}

//删除设备管理接口
export function delequipmentInfo(data) {
    return request({
        url: 'IGIP-BWZL-IOT/API-GATEWAY?moduleId=BWZL_IOT_002',
        method: 'post',
        params: data
    })
}

//根据廒间号查询对应设备类型列表
export function fetchEquipmentListByWarehouse(data) {
  return request({
    url: 'IGIP-BWZL-IOT/API-GATEWAY?moduleId=BWZL_IOT_014',
    method: 'post',
    params: data
  })
}
//新增管理详情接口
export function addEquipmentInfo(data) {
    return request({
        url: 'IGIP-BWZL-IOT/API-GATEWAY?moduleId=BWZL_IOT_001',
        method: 'post',
        params: data
    })
}

//设备管理详情接口
export function detailEquipmentInfo(data) {
    return request({
        url: 'IGIP-BWZL-IOT/API-GATEWAY?moduleId=BWZL_IOT_003',
        method: 'post',
        params: data
    })
}



//计算机下拉
export function computerXl(data) {
    return request({
        url: 'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_044',
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


//物联指令列表信息
export function instructions(data) {
    return request({
        url: 'IGIP-BWZL-IOT/API-GATEWAY?moduleId=BWZL_IOT_013',
        method: 'post',
        params: data
    })
}

//删除指令管理接口
export function delInstructions(data) {
    return request({
        url: 'IGIP-BWZL-IOT/API-GATEWAY?moduleId=BWZL_IOT_012',
        method: 'post',
        params: data
    })
}
//新增指令接口
export function addInstructions(data) {
    return request({
        url: 'IGIP-BWZL-IOT/API-GATEWAY?moduleId=BWZL_IOT_011',
        method: 'post',
        params: data
    })
}
//仓房设备统计列表
export function equipmentStatistics (data) {
    return request({
        url: 'IGIP-BWZL-IOT/API-GATEWAY?moduleId=BWZL_IOT_174',
        method: 'post',
        params: data
    })
}


