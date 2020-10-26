import request from '../utils/request'

//登录
export function loginapi(data) {
    return request({
        url: 'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_BASE_001',
        method: 'post',
        params: data
    })
}
//根据角色权限获取菜单
export function getModuleList(data) {
    return request({
        url: 'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_BASE_069',
        method: 'post',
        params: data
    })
}
//操作日志列表
export function logList(data) {
    return request({
        url: 'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_BASE_110',
        method: 'post',
        params: data
    })
}

