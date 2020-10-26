import request from '../../../utils/request'

//油罐列表
export function oilTankList(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_310',
        method:'get',
        params:data
    })
}
//油罐详情
export function oilTankDetail(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_307',
        method:'post',
        params:data
    })
}
//油罐编辑
export function oilTankEdit(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_308',
        method:'post',
        params:data
    })
}
//油罐新增
export function oilTankNew(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_306',
        method:'post',
        params:data
    })
}
//油罐删除
export function oilTankDel(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_309',
        method:'post',
        params:data
    })
}
//油罐审批
export function oilTankApproval (data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_330',
        method:'post',
        params:data
    })
}
