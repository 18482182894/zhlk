import request from '../../utils/request'

//岗位下拉列表列表服务接口
export function positionList(data){
  return request({
    url:'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_BASE_019',
    method:'post',
    params:data
  })
}
//岗位类型下拉列表列表服务接口
export function positionTypeList(data){
  return request({
    url:'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_BASE_013',
    method:'post',
    params:data
  })
}
//部门下拉列表列表服务接口
export function departmentList(data){
  return request({
    url:'IGIP-BWZL-BASE/API-GATEWAY?moduleId=BWZL_BASE_007',
    method:'get',
    params:data
  })
}
//仓储企业性质
export function enterpriseProperty(){//25
  return request({
    url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_250',
    method:'get',
    params:{
      dicTypeId:25
    }
  })
}
//隶属关系
export function relateType(){//26
  return request({
    url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_250',
    method:'get',
    params:{
      dicTypeId:26
    }
  })
}
//业务类型
export function businessType(){//27
  return request({
    url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_250',
    method:'get',
    params:{
      dicTypeId:27
    }
  })
}
//库存性质
export function inventoryProperty(data){
  return request({
    url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_117',
    method:'get',
    params:data
  })
}
//粮食品种
export function grainVariety(data){
  return request({
    url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_020',
    method:'get',
    params:data
  })
}
//粮食等级
export function grainOilLevel(){//6
  return request({
    url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_250',
    method:'get',
    params:{
      dicTypeId:6
    }
  })
}
//粮食性质
export function grainNature(){//5
  return request({
    url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_250',
    method:'get',
    params:{
      dicTypeId:5
    }
  })
}
//企业下拉列表
export function companyList(data){
  return request({
    url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_175',
    method:'get',
    params:data
  })
}
//库点信息下拉列表
export function graindepot(data){
  return request({
    url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_211',
    method:'get',
    params:{
      enterpriseCode:data
    }
  })
}
//仓房信息下拉列表
export function storehouse(data){
  return request({
    url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_206',
    method:'get',
    params:{
      graindepotGbCode:data
    }
  })
}
//仓房类型下拉列表
export function storehouseType(){//3
  return request({
    url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_250',
    method:'get',
    params:{
      dicTypeId:3
    }
  })
}
//廒间信息下拉列表
export function granary(data){
  return request({
    url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_217',
    method:'get',
    params:{
      storehouseGbCode:data
    }
  })
}
//货位信息下拉列表
export function cargo(data){
  return request({
    url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_323',
    method:'get',
    params:{
      warehouseGbCode:data
    }
  })
}
//油罐状态下拉列表
export function oilState(){//35
  return request({
    url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_250',
    method:'get',
    params:{
      dicTypeId:35
    }
  })
}
//使用情况下拉列表
export function usage(){//31
  return request({
    url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_250',
    method:'get',
    params:{
      dicTypeId:31
    }
  })
}
//装备情况（打孔）下拉列表
export function equipState(){//36
  return request({
    url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_250',
    method:'get',
    params:{
      dicTypeId:36
    }
  })
}
//指标项下拉列表
export function indicator(data){//indicatorType 指标分类(1:质量指标,2:储存品质指标)
  return request({
    url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_324',
    method:'get',
    params:data
  })
}
//支付方式下拉
export function payType(){//98
  return request({
    url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_250',
    method:'get',
    params:{
      dicTypeId:98
    }
  })
}
//出入库类型下拉
export function outStorageType(){//08
  return request({
    url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_250',
    method:'get',
    params:{
      dicTypeId:8
    }
  })
}
//计划隶属分类编码
export function planTypeCode(){//97
  return request({
    url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_250',
    method:'get',
    params:{
      dicTypeId:97
    }
  })
}
//不良记录类型
export function badRecordType(){//92
  return request({
    url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_250',
    method:'get',
    params:{
      dicTypeId:92
    }
  })
}
//设备类型
export function unitType(){//18
  return request({
    url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_250',
    method:'get',
    params:{
      dicTypeId:18
    }
  })
}
//计量单位编码
export function unitsCode(){//16
  return request({
    url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_250',
    method:'get',
    params:{
      dicTypeId:16
    }
  })
}
//请假类型
export function leaveType(){//94
  return request({
    url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_250',
    method:'get',
    params:{
      dicTypeId:94
    }
  })
}
//设备状态
export function deviceStatus(){//17
  return request({
    url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_250',
    method:'get',
    params:{
      dicTypeId:17
    }
  })
}
//通风类型
export function VentilationMethod(){//12
  return request({
    url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_250',
    method:'get',
    params:{
      dicTypeId:12
    }
  })
}
//通风方式
export function VentilationMode(){//13
  return request({
    url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_250',
    method:'get',
    params:{
      dicTypeId:13
    }
  })
}
//通风目的
export function VentilationPurpose(){//14
  return request({
    url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_250',
    method:'get',
    params:{
      dicTypeId:14
    }
  })
}
//通风机械
export function VentilationMechanics(){//15
  return request({
    url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_250',
    method:'get',
    params:{
      dicTypeId:15
    }
  })
}
//使用情况
export function UsageSituation(){//31
  return request({
    url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_250',
    method:'get',
    params:{
      dicTypeId:31
    }
  })
}
//储存资格
export function StorageQualification(){//34
  return request({
    url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_250',
    method:'get',
    params:{
      dicTypeId:34
    }
  })
}
//仓房状态
export function StorehouseStatus(){//30
  return request({
    url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_250',
    method:'get',
    params:{
      dicTypeId:30
    }
  })
}
//廒间状态
export function granaryStatus(){//91
  return request({
    url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_250',
    method:'get',
    params:{
      dicTypeId:91
    }
  })
}
//主要业务
export function mainBusiness(){//27
  return request({
    url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_250',
    method:'get',
    params:{
      dicTypeId:27
    }
  })
}
// 客户分组编码
export function customerGrouping(){//96
  return request({
    url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_250',
    method:'get',
    params:{
      dicTypeId:96
    }
  })
}
// 药品列表
export function medicineCode(){//10
  return request({
    url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_250',
    method:'get',
    params:{
      dicTypeId:10
    }
  })
}

//指令作用
export function directiveFunction(){//89
  return request({
    url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_250',
    method:'get',
    params:{
      dicTypeId:89
    }
  })
}
//物联设备名称
export function deviceNameWL(){//90
  return request({
    url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_250',
    method:'get',
    params:{
      dicTypeId:90
    }
  })
}
//虫种
export function insectKindDict(){//9
  return request({
    url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_250',
    method:'get',
    params:{
      dicTypeId:9
    }
  })
}
//熏蒸方式
export function fumigationType(){//11
  return request({
    url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_250',
    method:'get',
    params:{
      dicTypeId:11
    }
  })
}
//堆装方式
export function stackingMethod(){//21
  return request({
    url:'IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_250',
    method:'get',
    params:{
      dicTypeId:21
    }
  })
}
//低温储粮
export function lowTemList(data){//21
  return request({
    url:'IGIP-BWZL-IOT/API-GATEWAY?moduleId=BWZL_IOT_014',
    method:'post',
    params:data
  })
}
// 低温储粮开关
export function coolSwitch(data){//21
  return request({
    url:'/IGIP-BWZL-IOT2/API-GATEWAY?moduleId=BWZL_IOT_077',
    method:'get',
    params:data
  })
}
//磅单数据
export function poundList(data){//21
  return request({
    url:'IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_352',
    method:'post',
    params:data,
  })
}
//结算单数据
export function inReceiptList(data){//21
  return request({
    url:'IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_008',
    method:'post',
    params:data,
  })
}


