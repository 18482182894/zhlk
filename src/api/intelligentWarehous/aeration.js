import request from '../../utils/request'

// 智能通风作业列表
export function fetchAerationWorkList (data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_105',
    method: 'get',
    params: data
  })
}

// 智能通风作业详情
export function fetchAerationWork (data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_104',
    method: 'get',
    params: data
  })
}

// 新增智能通风作业
export function addAerationWork (data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_101',
    method: 'get',
    params: data
  })
}

// 修改智能通风作业
export function editAerationWork (data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_102',
    method: 'get',
    params: data
  })
}

// 新增通风方式
export function addAerationMode (data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_001',
    method: 'get',
    params: data
  })
}

// 编辑通风方式
export function editAerationMode (data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_002',
    method: 'get',
    params: data
  })
}

// 删除通风方式
export function delAerationMode (data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_003',
    method: 'get',
    params: data
  })
}

// 通风方式详情
export function fetchAerationMode (data) {
  return request({
    // url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_004',
    url: 'http://rap2.taobao.org:38080/app/mock/241393/BWZL_WSMS_004',
    method: 'get',
    params: data
  })
}

// 通风方式列表
export function fetchAerationModeList (data) {
  return request({
    // url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_005',
    url: 'http://rap2.taobao.org:38080/app/mock/241393/BWZL_WSMS_005',
    method: 'get',
    params: data
  })
}

// 新增自动通风方式
export function addAutoAerationMode (data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_201',
    method: 'get',
    params: data
  })
}

// 编辑自动通风方式
export function editAutoAerationMode (data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_203',
    method: 'get',
    params: data
  })
}

// 自动通风方式详情
export function fetchAutoAerationMode (data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_202',
    method: 'get',
    params: data
  })
}

// 自动通风方式列表
export function fetchAutoAerationModeList (data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_204',
    method: 'get',
    params: data
  })
}

// 删除自动通风方式
export function delAutoAerationMode (data) {
  return request({
    url: '/IGIP-BWZL-WSMS/API-GATEWAY?moduleId=BWZL_WSMS_205',
    method: 'get',
    params: data
  })
}

// 窗口开关
export function sendSwitchOrder (data) {
  return request({
    // url: '/IGIP-BWZL-IOT/API-GATEWAY?moduleId=BWZL_IOT_601',
    url: 'http://rap2.taobao.org:38080/app/mock/241393/BWZL_IOT_601',
    method: 'get',
    params: data
  })
}

// 获取网络气象数据
export function weatherInfo (data) {
  return request({
    url: 'https://www.tianqiapi.com/api/?version=v1',
    method: 'get',
    params: data
  })
}