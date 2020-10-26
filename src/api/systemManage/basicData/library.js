import request from '../../../utils/request'

//库点类型列表
export function libraryList(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_212',
        method:'post',
        params:data
    })
}
//库点类型详情
export function libraryDetail(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_210',
        method:'post',
        params:data
    })
}
//库点类型编辑
export function libraryEdit(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_209',
        method:'post',
        params:data
    })
}
//库点类型新增
export function libraryNew(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_207',
        method:'post',
        params:data
    })
}
//库点类型删除
export function libraryDel(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_208',
        method:'post',
        params:data
    })
}
//库点下拉
export function libraryDropdown(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_211',
        method:'post',
        params:data
    })
}
//库点类型下拉
export function libraryTypeDropdown(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_004',
        method:'get',
        params:data
    })
}
//库点审批
export function libraryApproval (data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_260',
        method:'post',
        params:data
    })
}
