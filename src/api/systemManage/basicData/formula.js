import request from '../../../utils/request'

//公式列表
export function formulaList(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_010',
        method:'post',
        params:data
    })
}
//公式详情
export function formulaDetail(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_011',
        method:'post',
        params:data
    })
}
//公式编辑
export function formulaEdit(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_008',
        method:'post',
        params:data
    })
}
//公式新增
export function formulaNew(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_007',
        method:'post',
        params:data
    })
}
//公式删除
export function formulaDel(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_009',
        method:'post',
        params:data
    })
}

//计算项新增
export function formulaItemNew(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_041',
        method:'post',
        params:data
    })
}
//计算项删除
export function formulaItemDel(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_042',
        method:'post',
        params:data
    })
}
//计算项分页列表
export function formulaItemList(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_044',
        method:'post',
        params:data
    })
}
//计算项列表
export function formulaItem(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_043',
        method:'post',
        params:data
    })
}