import request from '../../utils/request'

/**
 * 来文管理API
 */

//新增来文
export function addDocRevice(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_101',
        method: 'post',
        params: data
    })
}
//删除来文
export function deleDocRevice(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_102',
        method: 'post',
        params: data
    })
}
//编辑来文
export function editDocRevice(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_103',
        method: 'post',
        params: data
    })
}
//来文详情
export function getDocRevice(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_105',
        method: 'post',
        params: data
    })
}
//来文列表
export function getDocReviceList(data) {
    return request({
        url: 'IGIP-BWZL-GDB/API-GATEWAY?moduleId=BWZL_GDB_104',
        method: 'post',
        params: data
    })
}