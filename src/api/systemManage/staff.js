import request from '../../utils/request'

//职员分页列表服务接口
export function staffList(data){
    return request({
        url:'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_BASE_024',
        method:'post',
        params:data
    })
}
//新增职员服务接口
export function staffNew(data){
    return request({
        url:'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_BASE_020',
        method:'post',
        params:data
    })
}
//修改职员服务接口
export function staffEdit(data){
    return request({
        url:'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_BASE_021',
        method:'post',
        params:data
    })
}
//删除职员服务接口
export function staffDel(data){
    return request({
        url:'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_BASE_022',
        method:'post',
        params:data
    })
}
//职员详细信息服务接口
export function staffDetail(data){
    return request({
        url:'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_BASE_023',
        method:'post',
        params:data
    })
}
//职员绑定系统账户
export function staffbindUser(data){
    return request({
        url:'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_BASE_043',
        method:'post',
        params:data
    })
}
