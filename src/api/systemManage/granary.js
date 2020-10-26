import request from '../../utils/request'

//廒间列表服务接口
export function granaryList(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_218',
        method:'post',
        params:data
    })
}
//新增廒间服务接口
export function granaryNew(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_213',
        method:'post',
        params:data
    })
}
//修改廒间服务接口
export function granaryEdit(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_215',
        method:'post',
        params:data
    })
}
//删除廒间服务接口
export function granaryDel(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_214',
        method:'post',
        params:data
    })
}
//廒间详细信息服务接口
export function granaryDetail(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_216',
        method:'post',
        params:data
    })
}
//廒间下拉数据服务接口
export function granaryDropdown(){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_217',
        method:'GET'
    })
}

//廒间审批
export function granaryApproval (data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_240',
        method:'post',
        params:data
    })
}