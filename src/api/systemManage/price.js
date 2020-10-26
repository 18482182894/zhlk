import request from '../../utils/request'

//价格分页列表服务接口
export function priceList(data) {
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_015',
        method:'post',
        params:data
    })
}
//新增价格服务接口
export function priceNew(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_012',
        method:'post',
        params:data
    })
}
//修改价格服务接口
export function priceEdit(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_013',
        method:'post',
        params:data
    })
}
//删除价格服务接口
export function priceDel(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_014',
        method:'post',
        params:data
    })
}
//价格详细信息服务接口
export function priceDetail(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_016',
        method:'post',
        params:data
    })
}
