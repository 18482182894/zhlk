import request from '../../utils/request'

//部门分页列表服务接口
export function departmentList(data){
    return request({
        url:'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_BASE_006',
        method:'post',
        params:data
    })
}
//新增部门服务接口
export function departmentNew(data){
    return request({
        url:'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_BASE_002',
        method:'post',
        params:data
    })
}
//修改部门服务接口
export function departmentEdit(data){
    return request({
        url:'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_BASE_004',
        method:'post',
        params:data
    })
}
//删除部门服务接口
export function departmentDel(data){
    return request({
        url:'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_BASE_005',
        method:'post',
        params:data
    })
}
//部门详细信息服务接口
export function departmentDetail(data){
    return request({
        url:'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_BASE_003',
        method:'post',
        params:data
    })
}
//部门下拉数据服务接口
export function departmentDropdown(){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_BASE_007',
        method:'GET'
    })
}
