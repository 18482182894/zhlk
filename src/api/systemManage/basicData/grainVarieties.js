import request from '../../../utils/request'

//粮食品种列表
export function grainList(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_021',
        method:'post',
        params:data
    })
}
//粮食品种下一级列表
export function grainNextList(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_022',
        method:'post',
        params:data
    })
}
//粮食品种详情
export function grainDetail(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_023',
        method:'post',
        params:data
    })
}
//粮食品种编辑
export function grainEdit(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_018',
        method:'post',
        params:data
    })
}
//粮食品种新增
export function grainNew(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_017',
        method:'post',
        params:data
    })
}
//粮食品种删除
export function grainDel(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_019',
        method:'post',
        params:data
    })
}
//粮食品种下拉
export function grainDropdown(){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_020',
        method:'get'
    })
}
