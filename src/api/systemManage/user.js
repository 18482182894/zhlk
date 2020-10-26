import request from '../../utils/request'

//用户列表
export function userList(data){
    return request({
        url:'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_BASE_027',
        method:'get',
        params:data
    })
}
//用户详情
export function userDetail(data){
    return request({
        url:'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_BASE_028',
        method:'post',
        params:data
    })
}
//用户编辑
export function userEdit(data){
    return request({
        url:'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_BASE_026',
        method:'post',
        params:data
    })
}
//用户新增
export function userNew(data){
    return request({
        url:'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_BASE_025',
        method:'post',
        params:data
    })
}
//给指定用户绑定角色
export function userBindingRole(data){
    return request({
        url:'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_BASE_042',
        method:'post',
        params:data
    })
}
//未绑定用户分页列表接口
export function unboundUser(data){
    return request({
        url:'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_BASE_051',
        method:'post',
        params:data
    })
}
//用户删除
export function userDel(data){
  return request({
    url:'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_BASE_099',
    method:'post',
    params:data
  })
}
//修改密码
export function changePwd(data){
    return request({
        url:'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_BASE_0026',
        method:'post',
        params:data
    })
}