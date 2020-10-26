import request from '../../utils/request'

// 散气管理列表
export function fetchBulkGasList (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_125',
    method: 'get',
    params
  })
}

// 散气管理详情
export function fetchBulkGas (divergenceGasJobId) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_124',
    method: 'get',
    params: {divergenceGasJobId}
  })
}

// 散气管理新增
export function addBulkGas (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_121',
    method: 'get',
    params,
  })
}

// 散气管理修改
export function editBulkGas (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_122',
    method: 'get',
    params,
  })
}

// 散气管理删除
export function removeBulkGas (divergenceGasJobIdList) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_123',
    method: 'get',
    params: {divergenceGasJobIdList}
  })
}

// 散气管理审批
export function verifyBulkGas (divergenceGasJobId) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_126',
    method: 'get',
    params: {divergenceGasJobId}
  })
}

// 自动通风模型新增
export function addAutoAeration (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_201',
    method: 'get',
    params
  })
}

// 自动通风模型详情
export function fetchAutoAeration (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_202',
    method: 'get',
    params
  })
}

// 自动通风模型编辑
export function editAutoAeration (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_203',
    method: 'get',
    params
  })
}

// 自动通风模型列表
export function fetchAutoAerationList (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_204',
    method: 'get',
    params
  })
}

// 自动通风模型删除
export function delAutoAerationList (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_205',
    method: 'get',
    params
  })
}

// 自动通风操作新增
export function addAutoAerationAction (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_206',
    method: 'get',
    params
  })
}

// 厫间自动通风操作列表
export function fetchWarehouseAutoAerationList (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_207',
    method: 'get',
    params
  })
}

// 自动通风操作删除
export function delAutoAerationAction (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_208',
    method: 'get',
    params
  })
}

// 熏蒸管理首页
export function fetchFumigationHome (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_312',
    method: 'get',
    params
  })
}

// 熏蒸管作业人员新增
export function addFumigationStaff (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_216',
    method: 'get',
    params
  })
}

// 熏蒸管作业人员详情
export function fetchFumigationStaff (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_217',
    method: 'get',
    params
  })
}

// 熏蒸管作业人员修改
export function editFumigationStaff (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_218',
    method: 'get',
    params
  })
}

// 熏蒸管作业人员列表
export function fetchFumigationStaffList (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_219',
    method: 'get',
    params
  })
}

// 熏蒸单新增
export function addFumigationBill (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_220',
    method: 'get',
    params
  })
}

// 熏蒸单详情
export function fetchFumigationBill (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_221',
    method: 'get',
    params
  })
}

// 熏蒸单编辑
export function editFumigationBill (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_222',
    method: 'get',
    params
  })
}

// 熏蒸单列表
export function fetchFumigationBillList (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_223',
    method: 'get',
    params
  })
}

// 熏蒸单删除
export function delFumigationBill (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_224',
    method: 'get',
    params
  })
}

// 熏蒸单审批
export function applyFumigationBill (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_225',
    method: 'get',
    params
  })
}

// 熏蒸单审批系统回调
export function callbackFumigationBill (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_226',
    method: 'get',
    params
  })
}

// 熏蒸作业单新增
export function addFumigationWorkBill (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_227',
    method: 'get',
    params
  })
}

// 熏蒸作业单详情
export function fetchFumigationWorkBill (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_228',
    method: 'get',
    params
  })
}

// 熏蒸作业单修改
export function editFumigationWorkBill (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_229',
    method: 'get',
    params
  })
}

// 熏蒸作业单列表
export function fetchFumigationWorkBillList (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_230',
    method: 'get',
    params
  })
}

// 熏蒸散气作业新增
export function addDivergenceGas (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_121',
    method: 'get',
    params
  })
}

// 熏蒸散气作业编辑
export function editDivergenceGas (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_122',
    method: 'get',
    params
  })
}

// 熏蒸散气作业删除
export function delDivergenceGas (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_123',
    method: 'get',
    params
  })
}

// 熏蒸散气作业详情
export function fetchDivergenceGas (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_124',
    method: 'get',
    params
  })
}

// 熏蒸散气作业列表
export function fetchDivergenceGasList (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_125',
    method: 'get',
    params
  })
}

// 熏蒸散气作业提交审批
export function applyDivergenceGas (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_126',
    method: 'get',
    params
  })
}

// 熏蒸散气作业审批回调
export function callbackDivergenceGas (params) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_127',
    method: 'get',
    params
  })
}

// 数据采集
export function jumpData (params) {
  return request({
    url: '/IGIP-BWZL-IOT2/API-GATEWAY?moduleId=BWZL_IOT_099',
    method: 'post',
    params
  })
}