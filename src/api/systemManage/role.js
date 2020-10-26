import request from '../../utils/request'

//角色列表
export function roleList(data){
    return request({
        url:'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_BASE_031',
        method:'post',
        params:data
    })
}
//角色编辑
export function roleEdit(data){
    return request({
        url:'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_BASE_030',
        method:'post',
        params:data
    })
}
//角色新建
export function roleNew(data){
    return request({
        url:'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_BASE_029',
        method:'post',
        params:data
    })
}
//角色删除
export function roleDel(data){
    return request({
        url:'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_BASE_089',
        method:'post',
        params:data
    })
}
//角色分配模块权限
export function roleChange(data){
    return request({
        url:'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_BASE_040',
        method:'post',
        params:data
    })
}
//查询指定角色已分配模块
export function roleAllocated(data){
    return request({
        url:'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_BASE_067',
        method:'post',
        params:data
    })
}
//查询指定角色尚未分配模块
export function roleUnassigned(data){
    return request({
        url:'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_BASE_068',
        method:'post',
        params:data
    })
}
//用户分配模块权限
export function userChange(data){
    return request({
        url:'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_BASE_041',
        method:'post',
        params:data
    })
}
