import request from '../../../utils/request'

//货位列表
export function goodsList(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_305',
        method:'post',
        params:data
    })
}
//货位详情
export function goodsDetail(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_302',
        method:'post',
        params:data
    })
}
//货位编辑
export function goodsEdit(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_303',
        method:'post',
        params:data
    })
}
//货位新增
export function goodsNew(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_301',
        method:'post',
        params:data
    })
}
//货位删除
export function goodsDel(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_304',
        method:'post',
        params:data
    })
}
