import request from '../../utils/request'

// 上传数据列表
export function getUploadDataList(data){
  return request({
    url:'IGIP-BWZL-UPLOADING/API-GATEWAY?moduleId=BWZL_UPLOADING_501',
    method:'post',
    params:data
  })
}

// 查询表格类型列表
export function getQueryTableList(data){
  return request({
    url:'IGIP-BWZL-UPLOADING/API-GATEWAY?moduleId=BWZL_UPLOADING_502',
    method:'post',
    params:data
  })
}


