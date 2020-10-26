<template>
    <div class="content">
        <div class="menuManage userManage">
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">基础信息</div>
                </div>
                <div class="tag-box-content">
                    <div class="userManage-detail">
                        <div>
                            <span>
                                仓房名称：
                                <label v-text="detailData.storehouseName"></label>
                            </span>
                            <span>
                                仓房编码：
                                <label v-text="detailData.storehouseGbCode"></label>
                            </span>
                            <!-- <span>
                                库点名称：
                                <label v-text="detailData.graindepotGbCode">成都库点</label>
                            </span> -->
                            <span>
                                企业编码：
                                <label v-text="detailData.enterpriseCode"></label>
                            </span>
                            <span>
                                库点编号：
                                <label v-text="detailData.graindepotGbCode"></label>
                            </span>
                            <span>
                                仓房类型：
                                <label v-text="detailData.storehouseType"></label>
                            </span>
                            <span>
                                仓房状态：
                                <label v-text="detailData.storehouseState"></label>
                            </span>
                            <span>
                                主要业务：
                                <label v-text="detailData.primaryService"></label>
                            </span>
                            <span>
                                储粮方式：
                                <label v-text="detailData.storeWay==1?'散装':'包装'"></label>
                            </span>
                            <span>
                                使用情况：
                                <label v-text="detailData.useType"></label>
                            </span>
                            <span>
                                储存资格:
                                <label v-text="detailData.storagetype"></label>
                            </span>
                            <span>
                                省份：
                                <label v-text="detailData.provice"></label>
                            </span>
                            <span>
                                城市：
                                <label v-text="detailData.city"></label>
                            </span>
                            <span>
                                行政区：
                                <label v-text="detailData.country"></label>
                            </span>
                            <span>
                                设计容量（千克）：
                                <label v-text="detailData.designCapacity"></label>
                            </span>
                            <span>
                                实际容量（千克）：
                                <label v-text="detailData.actualCapacity"></label>
                            </span>

                            <span>
                                通风方式：
                                <label v-text="detailData.aerationType"></label>
                            </span>
                            <span>
                                隔热措施：
                                <label v-text="detailData.heatInsulationMeasures"></label>
                            </span>
                            <span>
                                气密性：
                                <label v-text="detailData.airtightness"></label>
                            </span>
                            <span>
                                建成年份：
                                <label v-text="detailData.completedYear"></label>
                            </span>
                            <span>
                                启用日期：
                                <label v-text="detailData.enableDate"></label>
                            </span>
                            <span>
                                是否国债投资：
                                <label v-text="detailData.nationalDebtInvestmentFlg"></label>
                            </span>
                            <span>
                                责任保管员：
                                <label v-text="detailData.responsibleCustodian"></label>
                            </span>
                          <span>
                                房顶结构：
                                <label v-text="detailData.roof"></label>
                            </span>
                          <span>
                                房架结构：
                                <label v-text="detailData.wall"></label>
                            </span>
                          <span>
                                仓外长：
                                <label v-text="detailData.length"></label>米
                            </span>
                          <span>
                                仓外高：
                                <label v-text="detailData.height"></label>米
                            </span>
                          <span>
                                仓外屋檐高：
                                <label v-text="detailData.outHeight"></label>米
                            </span>
                          <span>
                                仓外顶高：
                                <label v-text="detailData.outTopHeight"></label>米
                            </span>
                          <span>
                                仓外筒仓外径：
                                <label v-text="detailData.grainRadius"></label>米
                            </span>
                          <span>
                                仓内体积：
                                <label v-text="detailData.storeVolume"></label>米
                            </span>
                          <span>
                                粮堆体积：
                                <label v-text="detailData.grainVolume"></label>米
                            </span>
                          <span>
                                仓门数量：
                                <label v-text="detailData.doorNum"></label>
                            </span>
                          <span>
                                仓门位置：
                                <label v-text="detailData.doorLocation"></label>
                            </span>
                          <span>
                                仓门高度：
                                <label v-text="detailData.doorHeight"></label>米
                            </span>
                          <span>
                                仓门宽度：
                                <label v-text="detailData.doorWidth"></label>米
                            </span>
                          <span>
                                仓房是否完好：
                                <label v-text="detailData.storeCheck"></label>
                            </span>
                          <span>
                                能否散装储存：
                                <label v-text="detailData.checkStockpile"></label>
                            </span>
                          <span>
                                有无防鼠防雀防虫装置及设施：
                                <label v-text="detailData.checkInsectMouse"></label>
                            </span>
                          <span>
                                有无防火防爆防盗措施：
                                <label v-text="detailData.checkFire"></label>
                            </span>
                          <span>
                                有无粮情检测设施：
                                <label v-text="detailData.checkGrainTem"></label>
                            </span>
                          <span>
                                有无机械通风设施：
                                <label v-text="detailData.checkEquipWind"></label>
                            </span>
                          <span>
                                能否环流熏蒸杀虫：
                                <label v-text="detailData.checkEquipInsect"></label>
                            </span>
                          <span>
                                能否富氮低氧气调储粮：
                                <label v-text="detailData.checkEquipGas"></label>
                            </span>
                          <span>
                                能否仓外测虫：
                                <label v-text="detailData.checkOutInsect"></label>
                            </span>
                          <span>
                                厫间数：
                                <label v-text="detailData.warehouseNum"></label>
                            </span>
                          <span>
                                利用情况：
                                <label v-text="detailData.takeCondition"></label>
                            </span>
                          <span>
                                仓房使用情况：
                                <label v-text="detailData.use_type"></label>
                            </span>
                          <span>
                                图片列表：
                                <label v-text="detailData.picNameList"></label>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">审核状态</div>
                    <label class="audit-status">未审核</label>
                </div>
                <div class="tag-box-content">
                    <div class="userManage-detail">
                        <div>
                            <span>
                                审 核 人 ：
                                <label>张明宇</label>
                            </span>
                            <span>
                                审核日期：
                                <label>2018年10月9日</label>
                            </span>
                        </div>
                    </div>
                </div>
            </div> -->
            <div class="detail-back">
                <button @click="detailBack();">返回</button>
            </div>
        </div>
    </div>
</template>

<script>
import {
    warehouseDetail
} from '@/api/systemManage/basicData/warehouse'
import {
    UsageSituation,StorageQualification,VentilationMode,mainBusiness
} from '@/api/systemManage/dropDown'
export default {
  name: 'warehouseDetail',
  data () {
    return {
        postData:{
            storehouseGbCode:this.$route.query.id
        },
        UsageSituationList:[],//使用情况
        companyDataList:[],//企业
        VentilationModeList:[],//通风方式
        mainBusinessList:[],//主要业务
        StorageQualificationList:[],//储存资格
        detailData:''
    }
  },
  methods: {
      getDetail:function () {
        var vm=this;
          layer.load(2);
          warehouseDetail(vm.postData).then(ret=>{
              layer.closeAll('loading');
              if (ret.code==200) {
                //console.log(ret.data.dataMap);
                  vm.detailData=ret.data.dataMap;
                  vm.detailData.storehouseType=ret.data.dataMap.storehouseType[0].dicInfoValue;
                  vm.detailData.storehouseState=ret.data.dataMap.storehouseState[0].dicInfoValue;
                  const completedTime = vm.detailData.completedYear.slice(0,4)
                  const enablationTime = vm.detailData.enableDate.slice(0,4)
                  vm.detailData.completedYear = completedTime
                  vm.detailData.enableDate = enablationTime
                  UsageSituation()
                    .then(ret => {//使用情况
                      layer.closeAll("loading");
                      if (ret.code == 200) {
                        vm.UsageSituationList = ret.data.dataList;
                        for (var i = vm.UsageSituationList.length - 1; i >= 0; i--) {
                          if (vm.UsageSituationList[i].dicInfoCode==vm.detailData.useType) {
                            vm.detailData.useType=vm.UsageSituationList[i].dicInfoValue;
                          }
                        }
                      } else {
                        layer.alert(ret.data, { closeBtn: 0 });
                      }
                    })
                    .catch(err => {
                      layer.alert(err.message, { closeBtn: 0 });
                    });

                    StorageQualification()
                      .then(ret => {//储存资格
                        layer.closeAll("loading");
                        if (ret.code == 200) {
                          vm.StorageQualificationList = ret.data.dataList;

                          for (var i = vm.StorageQualificationList.length - 1; i >= 0; i--) {
                            if (vm.StorageQualificationList[i].dicInfoCode==vm.detailData.storagetype) {

                              vm.detailData.storagetype=vm.StorageQualificationList[i].dicInfoValue;
                            }
                          }
                        } else {
                          layer.alert(ret.data, { closeBtn: 0 });
                        }
                      })
                      .catch(err => {
                        layer.alert(err.message, { closeBtn: 0 });
                      });

                    VentilationMode()
                    .then(ret => {//通风方式
                      layer.closeAll("loading");
                      if (ret.code == 200) {
                        vm.VentilationModeList = ret.data.dataList;

                        for (var i = vm.VentilationModeList.length - 1; i >= 0; i--) {
                          if (vm.VentilationModeList[i].dicInfoCode==vm.detailData.aerationType) {

                            vm.detailData.aerationType=vm.VentilationModeList[i].dicInfoValue;
                          }
                        }
                      } else {
                        layer.alert(ret.data, { closeBtn: 0 });
                      }
                    })
                    .catch(err => {
                      layer.alert(err.message, { closeBtn: 0 });
                    });

                    mainBusiness({})
                    .then(ret => {//主要业务
                      layer.closeAll("loading");
                      if (ret.code == 200) {
                        vm.mainBusinessList = ret.data.dataList;

                        for (var i = vm.mainBusinessList.length - 1; i >= 0; i--) {
                          if (vm.mainBusinessList[i].dicInfoCode==vm.detailData.primaryService) {

                            vm.detailData.primaryService=vm.mainBusinessList[i].dicInfoValue;
                          }
                        }
                      } else {
                        layer.alert(ret.data, { closeBtn: 0 });
                      }
                    })
                    .catch(err => {
                      layer.alert(err.message, { closeBtn: 0 });
                    });

                   vm.$nextTick(function() {

                    });

              }else{
                  layer.alert(ret.data, { closeBtn: 0 });
              }

          }).catch(err=>{
              layer.alert(err.message, { closeBtn: 0 });
          });
      },
        detailBack:function () {
          this.$router.push({
            name: "warehouse",
            query: {
              storehouseGbCode:this.$route.query.storehouseGbCode,
              storehouseName:this.$route.query.storehouseName,
              pageNo:this.$route.query.pageNo
            }
          });
        }
  },
  mounted () {
      var vm=this;
      vm.getDetail();
  }
}
</script>
