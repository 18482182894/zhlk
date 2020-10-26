import request from '../../../utils/request'

//库点类型列表
export function libraryTypeList(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_005',
        method:'post',
        params:data
    })
}
//库点类型详情
export function libraryTypeDetail(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_006',
        method:'post',
        params:data
    })
}
//库点类型编辑
export function libraryTypeEdit(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_002',
        method:'post',
        params:data
    })
}
//库点类型新增
export function libraryTypeNew(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_001',
        method:'post',
        params:data
    })
}
//库点类型删除
export function libraryTypeDel(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_003',
        method:'post',
        params:data
    })
}
