import request from '../../utils/request'

//菜单（模块）列表
export function menuList(data){
    return request({
        url:'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_BASE_037',
        method:'post',
        params:data
    })
}
//菜单（模块）详情
export function menuDetail(data){
    return request({
        url:'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_BASE_038',
        method:'post',
        params:data
    })
}
//菜单（模块）编辑
export function menuEdit(data){
    return request({
        url:'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_BASE_035',
        method:'post',
        params:data
    })
}
//菜单（模块）新增
export function menuNew(data){
    return request({
        url:'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_BASE_034',
        method:'post',
        params:data
    })
}
//菜单（模块）删除
export function menuDel(data){
    return request({
        url:'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_BASE_036',
        method:'post',
        params:data
    })
}
