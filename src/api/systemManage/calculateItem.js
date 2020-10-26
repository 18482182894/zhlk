import request from '../../utils/request'

//计算项分页列表服务接口
export function calculateItemList(data){
    return request({
        url:'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_MST_044',
        method:'post',
        params:data
    })
}
//新增计算项服务接口
export function calculateItemNew(data){
    return request({
        url:'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_MST_041',
        method:'post',
        params:data
    })
}
//删除计算项服务接口
export function calculateItemDel(data){
    return request({
        url:'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_MST_042',
        method:'post',
        params:data
    })
}
//计算项下拉数据服务接口
export function calculateItemDropdown(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_043',
        method:'GET',
        params:data
    })
}
