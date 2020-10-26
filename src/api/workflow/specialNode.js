import request from '../../utils/request'

/**
 * 指定节点相关API接口 
 */

//给指定流程追加新的节点
export function addNewNode(data){
    return request({
        url:'IGIP-BWZL-WFMS/API-GATEWAY?moduleId=BWZL_BASE_052',
        method:'post',
        params:data
    })
}
//指定流程的特定节点进行修改
export function editNode(data){
    return request({
        url:'IGIP-BWZL-WFMS/API-GATEWAY?moduleId=BWZL_BASE_053',
        method:'post',
        params:data
    })
}
//指定流程的废弃节点进行删除
export function deleNode(data){
    return request({
        url:'IGIP-BWZL-WFMS/API-GATEWAY?moduleId=BWZL_BASE_054',
        method:'post',
        params:data
    })
}
//指定流程的所有节点列表展示
export function getNodeList(data){
    return request({
        url:'IGIP-BWZL-WFMS/API-GATEWAY?moduleId=BWZL_BASE_055',
        method:'post',
        params:data
    })
}
//指定流程的指定节点顺序变更
export function editNodeSqueue(data){
    return request({
        url:'IGIP-BWZL-WFMS/API-GATEWAY?moduleId=BWZL_BASE_056',
        method:'post',
        params:data
    })
}
//根据员工编号查询该员工是否存在未审核或审核流程中的工单
export function getNodeByExists(data){
    return request({
        url:'IGIP-BWZL-WFMS/API-GATEWAY?moduleId=BWZL_BASE_057',
        method:'post',
        params:data
    })
}