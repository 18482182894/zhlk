import request from '../../utils/request'

/**
 * 公告管理API
 */
//新建公告信息接口
export function addNotice(data) {
    return request({
        url: 'IGIP-BWZL-OA/API-GATEWAY?moduleId=BWZL_OA_101',
        method: 'post',
        params: data
    })
}
//删除公告信息接口
export function deleNotice(data) {
    return request({
        url: 'IGIP-BWZL-OA/API-GATEWAY?moduleId=BWZL_OA_102',
        method: 'post',
        params: data
    })
}
//编辑公告信息接口
export function editNotice(data) {
    return request({
        url: 'IGIP-BWZL-OA/API-GATEWAY?moduleId=BWZL_OA_103',
        method: 'post',
        params: data
    })
}
//公告信息列表接口
export function getNoticeList(data) {
    return request({
        url: 'IGIP-BWZL-OA/API-GATEWAY?moduleId=BWZL_OA_104',
        method: 'post',
        params: data
    })
}
//公告详情接口
export function noticeDetail(data) {
    return request({
        url: 'IGIP-BWZL-OA/API-GATEWAY?moduleId=BWZL_OA_105',
        method: 'post',
        params: data
    })
}
//我的流程列表接口
export function getMyNoticeList(data) {
    return request({
        url: 'IGIP-BWZL-OA/API-GATEWAY?moduleId=BWZL_OA_106',
        method: 'post',
        params: data
    })
}
//我的流程删除接口
export function deleMyNotice(data) {
    return request({
        url: 'IGIP-BWZL-OA/API-GATEWAY?moduleId=BWZL_OA_107',
        method: 'post',
        params: data
    })
}