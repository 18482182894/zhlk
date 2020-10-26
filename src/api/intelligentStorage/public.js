import request from '../../utils/request'
/**
 * 视频检索及查询列表API
 */
//视频检索及查询列表服务接口
export function videoList (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_031',
        method: 'post',
        params: data
    })
}
//获取当前步骤接口
export function getStep (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_500',
        method: 'post',
        params: data
    })
}
//进入下一步步骤接口
export function nextStep (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_501',
        method: 'post',
        params: data
    })
}
//登记信息接口
export function registerInfo (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_101',
        method: 'post',
        data: data,
        params: {},
    })
}
// 油罐登记信息接口
export function oilRegisterInfo (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_101_oil',
        method: 'post',
        data: data,
        params: {},
    })
}
//登记编码生成接口
export function registerCode (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_110',
        method: 'post',
        params: data
    })
}
//登记详情信息接口
export function registerDetail (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_102',
        method: 'post',
        params: data
    })
}
//登记时获取车牌接口
export function getLicensePlate () {
    return request({
        url: '/IGIP-BWZL-IOT2/API-GATEWAY?moduleId=platenService',
        method: 'post',
        params: {
            deviceBarcode:'de201901111223'
        }
    })
}
//登记时开闸
export function gateOpening () {
    return request({
        url: '/IGIP-BWZL-IOT2/API-GATEWAY?moduleId=openRoadGate',
        method: 'post',
        params: {
            deviceBarcode:'de201901221224'
        }
    })
}
//扦样管理信息接口
export function sampling (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_103',
        method: 'post',
        params: data
    })
}
// 油罐扦样管理信息接口
export function oilSampling (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_103_oil',
        method: 'post',
        params: data
    })
}
//通过卡号获取扦样部分信息接口
export function getDataByCard (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_115',
        method: 'post',
        params: data
    })
}
//扦样管理详情接口
export function samplingDetail (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_104',
        method: 'post',
        params: data
    })
}
//检验管理新增接口
export function checkout (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_105',
        method: 'post',
        params: data
    })
}
// 油罐检验管理新增接口
export function oilCheckout (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_105_oil',
        method: 'post',
        params: data
    })
}
//通过扫码获取检验管理信息接口
export function getDataByCode (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_116',
        method: 'post',
        params: data
    })
}
//检验管理获取信息接口
export function checkoutGetInfo (data) {
    return request({
        url: '/IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_350',
        method: 'post',
        params: data
    })
}
//检验管理详情接口
export function checkoutDetail (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_107',
        method: 'post',
        params: data
    })
}
//判定等级接口
export function decisionLevel  (data) {
    return request({
        url: '/IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_351',
        method: 'post',
        params: data
    })
}
//计算增扣量接口
export function CalculatingIncrement  (data) {
    return request({
        url: '/IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_353',
        method: 'post',
        params: data
    })
}
//指标项列表接口
export function checkoutItemList  (data) {
    return request({
        url: '/IGIP-BWZL-MST/API-GATEWAY?moduleId=BWZL_MST_354',
        method: 'post',
        params: data
    })
}
//检验调用LED接口
export function checkoutLED  (data) {
    return request({
        url: '/IGIP-BWZL-IOT2/API-GATEWAY?moduleId=lEDTestControlService',
        method: 'post',
        params: data
    })
}
//称重调用LED接口
export function WeightLED  (data) {
    return request({
        url: '/IGIP-BWZL-IOT2/API-GATEWAY?moduleId=lEDWeightControlService',
        method: 'post',
        params: data
    })
}
//登记列表接口--引导
export function registerList  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_108',
        method: 'post',
        params: data
    })
}
//登记列表接口--入库流程
export function registerFlowList  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_159',
        method: 'post',
        params: data
    })
}
//登记列表接口--油罐入库流程
export function oilRegisterFlowList  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_159_oil',
        method: 'post',
        params: data
    })
}
//登记列表详情接口--引导
export function registerListDetail  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_112',
        method: 'post',
        params: data
    })
}
//扦样列表接口--引导
export function samplingList  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_109',
        method: 'post',
        params: data
    })
}
//扦样列表接口--入库流程
export function samplingFlowList  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_169',
        method: 'post',
        params: data
    })
}
//扦样列表接口--油罐入库流程
export function oilSamplingFlowList  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_169_oil',
        method: 'post',
        params: data
    })
}
//扦样列表详情接口--引导
export function samplingListDetail  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_113',
        method: 'post',
        params: data
    })
}
//检验列表接口--引导
export function checkoutList  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_111',
        method: 'post',
        params: data
    })
}
//检验列表接口--入库流程
export function checkoutFlowList  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_175',
        method: 'post',
        params: data
    })
}
//检验列表接口--油罐入库流程
export function oilCheckoutFlowList  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_175_oil',
        method: 'post',
        params: data
    })
}
//检验列表详情接口--引导
export function checkoutListDetail  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_114',
        method: 'post',
        params: data
    })
}
//保存毛重信息服务接口
export function grossWeight  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_301',
        method: 'post',
        params: data
    })
}
//保存毛重信息服务接口--油罐计量
export function oilGrossWeight  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_301_oil',
        method: 'post',
        params: data
    })
}
//保存皮重信息服务接口
export function tareWeight  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_302',
        method: 'post',
        params: data
    })
}
//保存皮重信息服务接口--油罐
export function oilTareWeight  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_302_oil',
        method: 'post',
        params: data
    })
}
//称皮引导列表接口--引导
export function tareWeightList  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_308',
        method: 'post',
        params: data
    })
}
//称毛列表引导列表接口--引导
export function grossWeightList  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_309',
        method: 'post',
        params: data
    })
}
//引导称皮详情询服务接口
export function tareWeightDetail  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_310',
        method: 'post',
        params: data
    })
}
//称毛过程详情查询服务接口
export function grossWeightDetail  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_311',
        method: 'post',
        params: data
    })
}
//计量管理列表查看服务接口--入库
export function meteringFlowList  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_330',
        method: 'post',
        params: data
    })
}
//计量管理列表查看服务接口--油罐入库
export function oilMeteringFlowList  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_330_oil',
        method: 'post',
        params: data
    })
}
//通过扫码获取检验管理信息接口-入库
export function getMeteringByCardNo (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_340',
        method: 'post',
        params: data
    })
}
// RFID卡号读取服务接口计量前
export function frontByRFID () {
    return request({
        url: '/IGIP-BWZL-IOT2/API-GATEWAY?moduleId=getRFIDNumber',
        method: 'post',
        params: {
            deviceBarcode:'de201901240001'
        }
    })
}
// RFID卡号读取服务接口计量后
export function afterByRFID () {
    return request({
        url: '/IGIP-BWZL-IOT2/API-GATEWAY?moduleId=getRFIDNumber',
        method: 'post',
        params: {
            deviceBarcode:'de201901240002'
        }
    })
}
//计量获取车牌 前
export function meteringGetNumFront () {
    return request({
        url: '/IGIP-BWZL-IOT2/API-GATEWAY?moduleId=platenService',
        method: 'post',
        params: {
            deviceBarcode:'de201901240003'
        }
    })
}
//计量获取车牌 后
export function meteringGetNumAfter () {
    return request({
        url: '/IGIP-BWZL-IOT2/API-GATEWAY?moduleId=platenService',
        method: 'post',
        params: {
            deviceBarcode:'de201901240005'
        }
    })
}
//计量开道闸 前
export function meteringopenFront () {
    return request({
        url: '/IGIP-BWZL-IOT2/API-GATEWAY?moduleId=openRoadGate',
        method: 'post',
        params: {
            deviceBarcode:'de201901240004'
        }
    })
}
//计量开道闸 后
export function meteringopenAfter () {
    return request({
        url: '/IGIP-BWZL-IOT2/API-GATEWAY?moduleId=openRoadGate',
        method: 'post',
        params: {
            deviceBarcode:'de201901240006'
        }
    })
}
//红绿灯 前
export function TrafficLightsFront () {
    return request({
        url: '/IGIP-BWZL-IOT2/API-GATEWAY?moduleId=frontTrafficLightControlService',
        method: 'post',
        params: {
            deviceBarcode:'tra201901211519'
        }
    })
}
//红绿灯 后
export function TrafficLightsAfter () {
    return request({
        url: '/IGIP-BWZL-IOT2/API-GATEWAY?moduleId=behindTrafficLightControlService',
        method: 'post',
        params: {
            deviceBarcode:'tra201901211522'
        }
    })
}
//红外线（红外光栅） 前
export function meteringoInfraRedFront () {
    return request({
        url: '/IGIP-BWZL-IOT2/API-GATEWAY?moduleId=frontInfraredStateService',
        method: 'post',
        params: {
            deviceBarcode:'inf201901211524'
        }
    })
}
//红外线（红外光栅） 后
export function meteringoInfraRedAfter () {
    return request({
        url: '/IGIP-BWZL-IOT2/API-GATEWAY?moduleId=behindInfraredStateService',
        method: 'post',
        params: {
            deviceBarcode:'inf201901211526'
        }
    })
}
//发送语音
export function meteringoAudio (content) {
    return request({
        url: '/IGIP-BWZL-IOT2/API-GATEWAY?moduleId=sendVoice',
        method: 'post',
        params: {
            deviceBarcode:'de201901240007',
            content:content
        }
    })
}
//计量管理详情查看服务接口
export function meteringDetail  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_303',
        method: 'post',
        params: data
    })
}
//值仓通过卡号获取信息接口
export function valueBinGetData  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_342',
        method: 'post',
        params: data
    })
}
//值仓通过卡号获取信息接口--油罐
export function oilValueBinGetData  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_342_oil',
        method: 'post',
        params: data
    })
}
//值仓服务接口
export function valueBin  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_304',
        method: 'post',
        params: data
    })
}
//油罐值仓服务接口
export function oilValueBin  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_304_oil',
        method: 'post',
        params: data
    })
}
//值仓详情查看服务接口
export function valueBinDetail  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_305',
        method: 'post',
        params: data
    })
}
//值仓引导列表查询服务接口--引导
export function valueBinList  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_312',
        method: 'post',
        params: data
    })
}
//待值仓入库列表查询服务接口--入库
export function noValueBinList  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_332',
        method: 'post',
        params: data
    })
}
//待值仓入库列表查询服务接口--油罐入库
export function oilNoValueBinList  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_332_oil',
        method: 'post',
        params: data
    })
}
//已值仓入库列表查询服务接口--入库
export function alreadyValueBinList  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_333',
        method: 'post',
        params: data
    })
}
//已值仓入库列表查询服务接口--油罐入库
export function oilAlreadyValueBinList  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_333_oil',
        method: 'post',
        params: data
    })
}
//值仓引导详情查询服务接口
export function valueBinGuideList  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_313',
        method: 'post',
        params: data
    })
}
//作业过程引导图服务接口
export function workGuide  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_306',
        method: 'post',
        params: data
    })
}
//作业详情查询服务接口
export function workDetail  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_307',
        method: 'post',
        params: data
    })
}
//商务结算单详情
export function statementDetail  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_314',
        method: 'post',
        params: data
    })
}
//商务结算列表
export function statementList  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_315',
        method: 'post',
        params: data
    })
}
//提交报销单审批
export function submitReimbursementApproval  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_316',
        method: 'post',
        params: data
    })
}
//修改商务结算单（付款）
export function editReimbursementPayment  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_318',
        method: 'post',
        params: data
    })
}
//修改商务结算单（收款）
export function editReimbursementReceivables  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_319',
        method: 'post',
        params: data
    })
}
//删除满足条件的商务结算单
export function reimbursementDelete  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_320',
        method: 'post',
        params: data
    })
}
//新增结算单
export function reimbursementAdd  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_001',
        method: 'post',
        params: data
    })
}
//新增结算单--油罐
export function oilReimbursementAdd  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_001_oil',
        method: 'post',
        params: data
    })
}
//结算单详细信息
export function reimbursementDetail  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_002',
        method: 'post',
        params: data
    })
}
//作业过程-结算详情
export function processReimbursementDetail  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_003',
        method: 'post',
        params: data
    })
}
//作业过程-结算列表
export function processReimbursementList  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_004',
        method: 'post',
        params: data
    })
}
//入库流程-结算列表
export function settlementList  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_006',
        method: 'post',
        params: data
    })
}
//入库流程-结算列表--油罐
export function oilSettlementList  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_006_oil',
        method: 'post',
        params: data
    })
}
//入库流程-通过卡号获取结算数据
export function settlementGetInfo  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_007',
        method: 'post',
        params: data
    })
}
//入库流程-通过卡号获取结算数据--油罐
export function oilSettlementGetInfo  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_007_oil',
        method: 'post',
        params: data
    })
}
//商务结算-业务结算单
export function businessReimbursement (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_005',
        method: 'post',
        params: data
    })
}
//确认销卡
export function pinCard (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_011',
        method: 'post',
        params: data
    })
}
//出入库销卡列表
export function unsoldCardList (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_016',
        method: 'post',
        params: data
    })
}
//出入库销卡列表--油罐
export function oilUnsoldCardList (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_016_oil',
        method: 'post',
        params: data
    })
}
//卡使用记录详细信息
export function CardRecordDetail (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_013',
        method: 'post',
        params: data
    })
}
//作业过程-出门销卡详情
export function processPinCardDetail (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_014',
        method: 'post',
        params: data
    })
}
//作业过程-出门销卡列表
export function processPinCardList (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_015',
        method: 'post',
        params: data
    })
}
//卡管理信息列表
export function cardManagementList (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_233',
        method: 'post',
        params: data
    })
}
//删除卡管理信息
export function cardManagementDel (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_232',
        method: 'post',
        params: data
    })
}
//新增卡管理信息
export function cardManagementAdd (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_231',
        method: 'post',
        params: data
    })
}
//视频检索及查询列表
export function videoRetrieval (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_021',
        method: 'post',
        params: data
    })
}
//新增收款通知单
export function newReceiptNotice (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_263',
        method: 'post',
        params: data
    })
}
//收款通知单中商务结算单列表
export function noticeSettlementList (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_262',
        method: 'post',
        params: data
    })
}
//新增商务结算单
export function newBusinessStatement  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_261',
        method: 'post',
        params: data
    })
}
//新增银行账户接口
export function newBankAccount  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_119',
        method: 'post',
        params: data
    })
}
//删除银行账户
export function delBankAccount  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_120',
        method: 'post',
        params: data
    })
}
//编辑银行账户
export function editBankAccount  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_121',
        method: 'post',
        params: data
    })
}
//银行账户列表
export function bankAccountList  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_122',
        method: 'post',
        params: data
    })
}
//银行账户详情
export function bankAccountDetail  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_123',
        method: 'post',
        params: data
    })
}
//提交审核银行账户
export function bankAccountApply  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_124',
        method: 'post',
        params: data
    })
}

// 出库

//计量管理列表查看服务接口--出库
export function meteringOutFlowList  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_331',
        method: 'post',
        params: data
    })
}
//计量管理列表查看服务接口--出库--油罐
export function oilMeteringOutFlowList  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_331_oil',
        method: 'post',
        params: data
    })
}
//待值仓入库列表查询服务接口--出库
export function noValueBinOutList  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_334',
        method: 'post',
        params: data
    })
}
//待值仓入库列表查询服务接口--出库--油罐
export function oilNoValueBinOutList  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_334_oil',
        method: 'post',
        params: data
    })
}
//已值仓入库列表查询服务接口--出库
export function alreadyValueBinOutList  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_335',
        method: 'post',
        params: data
    })
}
//已值仓入库列表查询服务接口--出库--油罐
export function oilAlreadyValueBinOutList  (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_335_oil',
        method: 'post',
        params: data
    })
}
//通过扫码获取检验管理信息接口-入库
export function getMeteringOutByCardNo (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_341',
        method: 'post',
        params: data
    })
}
//视频融合
export function videoFusion (data) {
    return request({
        url: '/IGIP-BWZL-IOT2/API-GATEWAY?moduleId=BWZL_IOT_087',
        method: 'post',
        params: data
    })
}
//登记视频播放接口
export function getVideoUrlByOne (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_118',
        method: 'post',
        params: data
    })
}
//仟样视频播放接口
export function getVideoUrlByTwo (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_128',
        method: 'post',
        params: data
    })
}
//检验视频播放接口
export function getVideoUrlByThree (data) {
    return request({
        url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_138',
        method: 'post',
        params: data
    })
}
//计量时视频监控
export function meteringVideo (data) {
    return request({
        url: '/IGIP-BWZL-ISMS/API-GATEWAY?moduleId=BWZL_ISMS_301',
        method: 'post',
        params: data
    })
}
// 获取出/入库单详情
export function getStockById(data) {
  return request({
    url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_008',
    method: 'post',
    params: data
  })
}
// 获取出/入库单详情--油罐
export function getOilStockById(data) {
    return request({
      url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_008_oil',
      method: 'post',
      params: data
    })
  }
// 获取过磅单详情
export function getWeightResult(data) {
  return request({
    url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_352',
    method: 'post',
    params: data
  })
}
// 获取过磅单详情--油罐
export function getOilWeightResult(data) {
    return request({
      url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_352_oil',
      method: 'post',
      params: data
    })
}
// 获取出库单详情
export function getOutStockById(data) {
  return request({
    url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_009',
    method: 'post',
    params: data
  })
}
// 获取出库单详情 --油罐
export function getOilOutStockById(data) {
    return request({
      url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_009_oil',
      method: 'post',
      params: data
    })
}

// 获取出库单详情
export function getSheetData(data) {
  return request({
    url: '/IGIP-BWZL-IIAE/API-GATEWAY?moduleId=BWZL_IIAE_353',
    method: 'post',
    params: data
  })
}
