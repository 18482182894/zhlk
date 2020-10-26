import request from '../../../utils/request'

/**
 * 仓储库存API
 */
//仓库库存比例接口
export function inventoryRatio (data) {
  return request({
    url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_201',
    method: 'post',
    params: data
  })
}
//仓容总占比接口
export function volumeRatio (data) {
  return request({
    url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_202',
    method: 'post',
    params: data
  })
}
//存粮品种统计接口
export function varietyStatistics (data) {
  return request({
    url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_203',
    method: 'post',
    params: data
  })
}
//存粮性质统计接口
export function propertyStatistics (data) {
  return request({
    url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_204',
    method: 'post',
    params: data
  })
}
//分年限实际库存接口
export function physicalInventory (data) {
  return request({
    url: 'IGIP-BWZL-WMS/API-GATEWAY?moduleId=BWZL_WMS_205',
    method: 'post',
    params: data
  })
}
//库存首页数据
export function stockMainData (data) {
  return request({
    url: 'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_666',
    method: 'post',
    params: data
  })
}
