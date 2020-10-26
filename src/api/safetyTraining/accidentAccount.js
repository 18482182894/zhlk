import request from '../../utils/request'

//事故台账信息列表
export function accidentList(data) {
  return request({
    url: 'IGIP-BWZL-SF/API-GATEWAY?moduleId=BWZL_SF_010',
    method: 'post',
    params: data
  })
}

//事故台账信息列表新增
export function accidentAdd(data) {
  return request({
    url: 'IGIP-BWZL-SF/API-GATEWAY?moduleId=BWZL_SF_006',
    method: 'post',
    params: data
  })
}

//事故台账信息列表删除
export function accidentDel(data) {
  return request({
    url: 'IGIP-BWZL-SF/API-GATEWAY?moduleId=BWZL_SF_007',
    method: 'post',
    params: data
  })
}

//事故台账信息列表详情
export function accidentDetail(data) {
  return request({
    url: 'IGIP-BWZL-SF/API-GATEWAY?moduleId=BWZL_SF_009',
    method: 'post',
    params: data
  })
}

//事故台账信息列表修改
export function accidentEdit(data) {
  return request({
    url: 'IGIP-BWZL-SF/API-GATEWAY?moduleId=BWZL_SF_008',
    method: 'post',
    params: data
  })
}
