import request from '../../utils/request'

//事故隐患整改台账数据信息列表
export function rectificationList(data) {
  return request({
    url: 'IGIP-BWZL-SF/API-GATEWAY?moduleId=BWZL_SF_209',
    method: 'post',
    params: data
  })
}

//事故隐患整改台账数据信息新增
export function rectificationAdd(data) {
  return request({
    url: 'IGIP-BWZL-SF/API-GATEWAY?moduleId=BWZL_SF_201',
    method: 'post',
    params: data
  })
}

//事故隐患整改台账数据信息删除
export function rectificationDel(data) {
  return request({
    url: 'IGIP-BWZL-SF/API-GATEWAY?moduleId=BWZL_SF_203',
    method: 'post',
    params: data
  })
}

//事故隐患整改台账数据信息编辑
export function rectificationEdit(data) {
  return request({
    url: 'IGIP-BWZL-SF/API-GATEWAY?moduleId=BWZL_SF_205',
    method: 'post',
    params: data
  })
}

//事故隐患整改台账数据信息详情
export function rectificationDetail(data) {
  return request({
    url: 'IGIP-BWZL-SF/API-GATEWAY?moduleId=BWZL_SF_207',
    method: 'post',
    params: data
  })
}
