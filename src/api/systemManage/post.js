import request from '../../utils/request'


//岗位分页列表服务接口
export function postList(data){
    return request({
        url:'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_BASE_018',
        method:'post',
        params:data
    })
}
//新增岗位服务接口
export function postNew(data){
    return request({
        url:'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_BASE_014',
        method:'post',
        params:data
    })
}
//修改岗位服务接口
export function postEdit(data){
    return request({
        url:'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_BASE_015',
        method:'post',
        params:data
    })
}
//删除岗位服务接口
export function postDel(data){
    return request({
        url:'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_BASE_016',
        method:'post',
        params:data
    })
}
//岗位详细信息服务接口
export function postDetail(data){
    return request({
        url:'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_BASE_017',
        method:'post',
        params:data
    })
}
//岗位下拉数据服务接口
export function postDropdown(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_BASE_019',
        method:'GET',
        params:data
    })
}

