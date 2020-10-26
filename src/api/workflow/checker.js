import request from '../../utils/request'

/**
 * 审批人API接口
 */
//添加审批人
export function addChecker(data){
    return request({
        url:'IGIP-BWZL-WFMS/API-GATEWAY?moduleId=BWZL_BASE_057',
        method:'post',
        params:data
    })
}
//删除节点审批人接口
export function deleChecker(data){
    return request({
        url:'IGIP-BWZL-WFMS/API-GATEWAY?moduleId=BWZL_BASE_058',
        method:'post',
        params:data
    })
}
//调整审批人顺序
export function editCheckerSqueue(data){
    return request({
        url:'IGIP-BWZL-WFMS/API-GATEWAY?moduleId=BWZL_BASE_059',
        method:'post',
        params:data
    })
}