import request from '../../utils/request'

// 药剂销毁新增
export function addDestroy(params) {
  return request({
    url: '/IGIP-BWZL-MMS/API-GATEWAY?moduleId=BWZL_MMS_011',
    method: 'get',
    params
  })
}

// 药剂销毁详情
export function fetchDestroy(params) {
  return request({
    url: '/IGIP-BWZL-MMS/API-GATEWAY?moduleId=BWZL_MMS_012',
    method: 'get',
    params
  })
}

// 药剂销毁列表
export function fetchDestroyList(params) {
  return request({
    url: '/IGIP-BWZL-MMS/API-GATEWAY?moduleId=BWZL_MMS_013',
    method: 'get',
    params
  })
}

// 药剂归还新增
export function addGiveBack(params) {
  return request({
    url: '/IGIP-BWZL-MMS/API-GATEWAY?moduleId=BWZL_MMS_001',
    method: 'get',
    params
  })
}

// 药剂归还详情
export function fetchGiveBack(params) {
  return request({
    url: '/IGIP-BWZL-MMS/API-GATEWAY?moduleId=BWZL_MMS_002',
    method: 'get',
    params
  })
}

// 药剂归还列表
export function fetchGiveBackList(params) {
  return request({
    url: '/IGIP-BWZL-MMS/API-GATEWAY?moduleId=BWZL_MMS_003',
    method: 'get',
    params
  })
}

// 药剂入库新增
export function addImport(params) {
  return request({
    url: '/IGIP-BWZL-MMS/API-GATEWAY?moduleId=BWZL_MMS_308',
    method: 'get',
    params
  })
}

// 药剂入库详情
export function fetchImport(params) {
  return request({
    url: '/IGIP-BWZL-MMS/API-GATEWAY?moduleId=BWZL_MMS_309',
    method: 'get',
    params
  })
}

// 药剂入库列表
export function fetchImportList(params) {
  return request({
    url: '/IGIP-BWZL-MMS/API-GATEWAY?moduleId=BWZL_MMS_310',
    method: 'get',
    params
  })
}

// 系统回调药品采购申请审批更新申请单状态服务接口任务书
export function changeImportStatus(params) {
  return request({
    url: '/IGIP-BWZL-MMS/API-GATEWAY?moduleId=BWZL_MMS_307',
    method: 'get',
    params
  })
}

// 药剂出库新增
export function addExport(params) {
  return request({
    url: '/IGIP-BWZL-MMS/API-GATEWAY?moduleId=BWZL_MMS_211',
    method: 'get',
    params
  })
}

// 药剂出库详情
export function fetchExport(params) {
  return request({
    url: '/IGIP-BWZL-MMS/API-GATEWAY?moduleId=BWZL_MMS_212',
    method: 'get',
    params
  })
}

// 药剂出库列表
export function fetchExportList(params) {
  return request({
    url: '/IGIP-BWZL-MMS/API-GATEWAY?moduleId=BWZL_MMS_213',
    method: 'get',
    params
  })
}

// 新增药剂领用申请
export function addUse(params) {
  return request({
    url: '/IGIP-BWZL-MMS/API-GATEWAY?moduleId=BWZL_MMS_201',
    method: 'get',
    params
  })
}

// 删除药剂领用申请
export function delUse(params) {
  return request({
    url: '/IGIP-BWZL-MMS/API-GATEWAY?moduleId=BWZL_MMS_202',
    method: 'get',
    params
  })
}

// 编辑药剂领用申请
export function editUse(params) {
  return request({
    url: '/IGIP-BWZL-MMS/API-GATEWAY?moduleId=BWZL_MMS_203',
    method: 'get',
    params
  })
}

// 药剂领用申请详情
export function fetchUse(params) {
  return request({
    url: '/IGIP-BWZL-MMS/API-GATEWAY?moduleId=BWZL_MMS_204',
    method: 'get',
    params
  })
}

// 药剂领用申请列表
export function fetchUseList(params) {
  return request({
    url: '/IGIP-BWZL-MMS/API-GATEWAY?moduleId=BWZL_MMS_205',
    method: 'get',
    params
  })
}

// 药剂领用申请审批
export function applyUse(params) {
  return request({
    url: '/IGIP-BWZL-MMS/API-GATEWAY?moduleId=BWZL_MMS_206',
    method: 'get',
    params
  })
}

// 药剂领用申请审批回调
export function callbackUse(params) {
  return request({
    url: '/IGIP-BWZL-MMS/API-GATEWAY?moduleId=BWZL_MMS_207',
    method: 'get',
    params
  })
}

// 药剂初始化
export function initMedicine(params) {
  return request({
    url: '/IGIP-BWZL-MMS/API-GATEWAY?moduleId=BWZL_MMS_101',
    method: 'get',
    params
  })
}

// 药剂库存列表
export function fetchMedicineList(params) {
  return request({
    url: '/IGIP-BWZL-MMS/API-GATEWAY?moduleId=BWZL_MMS_102',
    method: 'get',
    params
  })
}

// 药剂信息带出接口
export function fetchMedicine(params) {
  return request({
    url: '/IGIP-BWZL-MMS/API-GATEWAY?moduleId=BWZL_MMS_103',
    method: 'get',
    params
  })
}

// 药剂详情
export function fetchMedicineDetail(params) {
  return request({
    url: '/IGIP-BWZL-MMS/API-GATEWAY?moduleId=BWZL_MMS_104',
    method: 'get',
    params
  })
}

// 药剂采购申请新增
export function addPurchase(params) {
  return request({
    url: '/IGIP-BWZL-MMS/API-GATEWAY?moduleId=BWZL_MMS_301',
    method: 'get',
    params
  })
}

// 药剂采购申请详情
export function fetchPurchase(params) {
  return request({
    url: '/IGIP-BWZL-MMS/API-GATEWAY?moduleId=BWZL_MMS_302',
    method: 'get',
    params
  })
}

// 药剂采购申请编辑
export function editPurchase(params) {
  return request({
    url: '/IGIP-BWZL-MMS/API-GATEWAY?moduleId=BWZL_MMS_303',
    method: 'get',
    params
  })
}

// 药剂采购申请删除
export function delPurchase(params) {
  return request({
    url: '/IGIP-BWZL-MMS/API-GATEWAY?moduleId=BWZL_MMS_304',
    method: 'get',
    params
  })
}

// 药剂采购申请列表
export function fetchPurchaseList(params) {
  return request({
    url: '/IGIP-BWZL-MMS/API-GATEWAY?moduleId=BWZL_MMS_305',
    method: 'get',
    params
  })
}

// 药剂采购已审核申请列表
export function fetchPurchaseAppliedList(params) {
  return request({
    url: '/IGIP-BWZL-MMS/API-GATEWAY?moduleId=BWZL_MMS_311',
    method: 'get',
    params
  })
}

// 药剂采购申请提交审批
export function applyPurchase(params) {
  return request({
    url: '/IGIP-BWZL-MMS/API-GATEWAY?moduleId=BWZL_MMS_306',
    method: 'get',
    params
  })
}
