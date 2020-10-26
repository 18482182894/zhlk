import request from '../../utils/request'


//安全生产检查台账数据信息列表
export function checkList(data) {
  return request({
    url: 'IGIP-BWZL-SF/API-GATEWAY?moduleId=BWZL_SF_210',
    method: 'post',
    params: data
  })
}

//安全生产检查台账新增
export function checkAdd(data) {
  return request({
    url: 'IGIP-BWZL-SF/API-GATEWAY?moduleId=BWZL_SF_202',
    method: 'post',
    params: data
  })
}

//安全生产检查台账详情
export function checkDetail(data) {
  return request({
    url: 'IGIP-BWZL-SF/API-GATEWAY?moduleId=BWZL_SF_208',
    method: 'post',
    params: data
  })
}

//安全生产检查台账修改
export function checkEdit(data) {
  return request({
    url: 'IGIP-BWZL-SF/API-GATEWAY?moduleId=BWZL_SF_206',
    method: 'post',
    params: data
  })
}

//安全生产检查台账删除
export function checkDel(data) {
  return request({
    url: 'IGIP-BWZL-SF/API-GATEWAY?moduleId=BWZL_SF_204',
    method: 'post',
    params: data
  })
}
