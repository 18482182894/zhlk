import request from '../../../utils/request'

//新增卡管理接口
export function cardNew(data) {
  return request({
    url: 'IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_231',
    method: 'post',
    params: data
  })
}
//删除卡管理接口
export function cardDel(data) {
  return request({
    url: 'IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_232',
    method: 'post',
    params: data
  })
}
//卡管理列表
export function cardList(data) {
  return request({
    url: 'IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_233',
    method: 'post',
    params: data
  })
}