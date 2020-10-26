import request from '../../utils/request'

/**
 * 设备入库,台账API
 */

//新增设备入库记录
export function addEquipmentEntryRecord(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_101',
        method: 'post',
        params: data
    })
}
//删除设备入库记录
export function delEquipmentEntryRecord(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_102',
        method: 'post',
        params: data
    })
}
//编辑设备信息接口
export function editEquipmentEntryRecord(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_102',
        method: 'post',
        params: data
    })
}
//设备列表信息接口
export function getEquipmentEntryRecordList(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_103',
        method: 'post',
        params: data
    })
}
//设备详细信息接口
export function getEquipmentEntryRecord(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_104',
        method: 'post',
        params: data
    })
}
//设备台账信息接口
export function getEquipmentList(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_105',
        method: 'post',
        params: data
    })
}

//编辑台账记录信息接口
export function standingEdit(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_106',
        method: 'post',
        params: data
    })
}