import request from '../../../utils/request'

//仓储企业列表
export function companyList(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_104',
        method:'post',
        params:data
    })
}
//仓储企业详情
export function companyDetail(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_105',
        method:'post',
        params:data
    })
}
//仓储企业编辑
export function companyEdit(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_103',
        method:'post',
        params:data
    })
}
//仓储企业新增
export function companyNew(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_101',
        method:'post',
        params:data
    })
}
//仓储企业删除
export function companyDel(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_102',
        method:'post',
        params:data
    })
}
//仓储企业提交审核
export function companyApproval(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_118',
        method:'post',
        params:data
    })
}
