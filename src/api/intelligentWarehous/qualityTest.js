import request from '../../utils/request'

// 质检列表
export function fetchQualityTestList (params) {
  return request({
    url: '/IGIP-BWZL-QTS/API-GATEWAY?moduleId=BWZL_QTS_205',
    method: 'get',
    params
  })
}

// 新增质检
export function addQualityTest (params) {
  return request({
    url: '/IGIP-BWZL-QTS/API-GATEWAY?moduleId=BWZL_QTS_201',
    method: 'get',
    params,
  })
}

// 编辑质检
export function editQualityTest (params) {
  return request({
    url: '/IGIP-BWZL-QTS/API-GATEWAY?moduleId=BWZL_QTS_203',
    method: 'get',
    params,
  })
}

// 删除质检
export function removeQualityTest (applyRecordIdList) {
  return request({
    url: '/IGIP-BWZL-QTS/API-GATEWAY?moduleId=BWZL_QTS_202',
    method: 'get',
    params: {applyRecordIdList},
  })
}

// 质检详情
export function fetchQualityTest (applyRecordId) {
  return request({
    url: '/IGIP-BWZL-QTS/API-GATEWAY?moduleId=BWZL_QTS_204',
    method: 'get',
    params: {applyRecordId},
  })
}

// 质检审核
export function verifyQualityTest (applyRecordId) {
  return request({
    url: '/IGIP-BWZL-QTS/API-GATEWAY?moduleId=BWZL_QTS_101',
    method: 'get',
    params: {applyRecordId},
  })
}

// 质检台账列表
export function fetchLedgerList (params) {
  return request({
    url: '/IGIP-BWZL-QTS/API-GATEWAY?moduleId=BWZL_QTS_303',
    method: 'get',
    params
  })
}

// 质检台账新增
export function addLedger (params) {
  return request({
    url: '/IGIP-BWZL-QTS/API-GATEWAY?moduleId=BWZL_QTS_301',
    method: 'get',
    params
  })
}

// 质检台账详情
export function fetchLedger (qualityAccountId) {
  return request({
    url: '/IGIP-BWZL-QTS/API-GATEWAY?moduleId=BWZL_QTS_302',
    method: 'get',
    params: {qualityAccountId}
  })
}

// 质检申请新增
export function addApplyRecord (params) {
  return request({
    url: '/IGIP-BWZL-QTS/API-GATEWAY?moduleId=BWZL_QTS_001',
    method: 'get',
    params
  })
}

// 质检申请详情
export function fetchApplyRecord (params) {
  return request({
    url: '/IGIP-BWZL-QTS/API-GATEWAY?moduleId=BWZL_QTS_002',
    method: 'get',
    params
  })
}

// 质检申请列表
export function fetchApplyRecordList (params) {
  return request({
    url: '/IGIP-BWZL-QTS/API-GATEWAY?moduleId=BWZL_QTS_003',
    method: 'get',
    params
  })
}
