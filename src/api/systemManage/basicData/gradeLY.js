import request from '../../../utils/request'

//粮油等级列表
export function gradeLYList(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_114',
        method:'get',
        params:data
    })
}
//粮油等级详情
export function gradeLYDetail(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_115',
        method:'post',
        params:data
    })
}
//粮油等级编辑
export function gradeLYEdit(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_113',
        method:'post',
        params:data
    })
}
//粮油等级新增
export function gradeLYNew(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_111',
        method:'post',
        params:data
    })
}
//粮油等级删除
export function gradeLYDel(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_112',
        method:'post',
        params:data
    })
}
