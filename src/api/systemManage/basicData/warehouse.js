import request from '../../../utils/request'

//仓房列表
export function warehouseList(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_205',
        method:'post',
        params:data
    })
}
//仓房详情
export function warehouseDetail(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_203',
        method:'post',
        params:data
    })
}
//仓房编辑
export function warehouseEdit(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_202',
        method:'post',
        params:data
    })
}
//仓房新增
export function warehouseNew(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_201',
        method:'post',
        params:data
    })
}
//仓房删除
export function warehouseDel(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_204',
        method:'post',
        params:data
    })
}
//仓房下拉
export function warehouseDropdown(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_206',
        method:'post',
        params:data
    })
}

//仓房审批
export function warehouseApproval (data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_230',
        method:'post',
        params:data
    })
}