import request from '../../../utils/request'

//检化验标准列表
export function testSetupList(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_320',
        method:'post',
        params:data
    })
}
//检化验标准详情
export function testSetupDetail(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_317',
        method:'post',
        params:data
    })
}
//检化验标准编辑
export function testSetupEdit(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_318',
        method:'post',
        params:data
    })
}
//检化验标准新增
export function testSetupNew(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_316',
        method:'post',
        params:data
    })
}
//检化验标准删除
export function testSetupDel(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_319',
        method:'post',
        params:data
    })
}
//指标项列表
export function indexItemList(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_315',
        method:'post',
        params:data
    })
}
//指标项删除
export function indexItemDel(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_314',
        method:'post',
        params:data
    })
}
//指标项详情
export function indexItemDetail(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_312',
        method:'post',
        params:data
    })
}
//指标项编辑
export function indexItemEdit(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_313',
        method:'post',
        params:data
    })
}
//指标项新增
export function indexItemNew(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_311',
        method:'post',
        params:data
    })
}
//增扣项列表
export function deductionQuantityList(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_344',
        method:'post',
        params:data
    })
}
//增扣项删除
export function deductionQuantityDel(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_343',
        method:'post',
        params:data
    })
}
//增扣项详情
export function deductionQuantityDetail(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_341',
        method:'post',
        params:data
    })
}
//增扣项新增
export function deductionQuantityNew(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_340',
        method:'post',
        params:data
    })
}
//增扣项编辑
export function deductionQuantityEdit(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_342',
        method:'post',
        params:data
    })
}

//存储指标列表
export function storageIndexList(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_133',
        method:'post',
        params:data
    })
}
//存储指标删除
export function storageIndexDel(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_131',
        method:'post',
        params:data
    })
}
//存储指标详情
export function storageIndexDetail(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_132',
        method:'post',
        params:data
    })
}
//存储指标新增
export function storageIndexNew(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_129',
        method:'post',
        params:data
    })
}
//存储指标编辑
export function storageIndexEdit(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_130',
        method:'post',
        params:data
    })
}
//存储指标判断
export function storageIndexCheck(data){
    return request({
        url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_134',
        method:'post',
        params:data
    })
}
