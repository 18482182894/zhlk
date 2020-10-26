import request from '../../utils/request'

//新增银行账户接口
export function bankNew(data) {
  return request({
    url: 'IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_119',
    method: 'post',
    params: data
  })
}
//删除银行账户接口
export function bankDel(data) {
  return request({
    url: 'IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_120',
    method: 'post',
    params: data
  })
}
//编辑银行账户接口
export function bankEdit(data) {
  return request({
    url: 'IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_121',
    method: 'post',
    params: data
  })
}
//银行账户列表
export function bankList(data) {
  return request({
    url: 'IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_122',
    method: 'post',
    params: data
  })
}

//银行账户详情
export function bankDetail(data) {
  return request({
    url: 'IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_123',
    method: 'post',
    params: data
  })
}
//提交审核银行账户接口
export function bankAudit(data) {
  return request({
    url: 'IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_124',
    method: 'post',
    params: data
  })
}
//提交账户审批更新状态服务回调接口
// export function bankAuditNew(data) {
//   return request({
//     url: 'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_IIAE_125',
//     method: 'GET',
//     params: data
//   })
// }
