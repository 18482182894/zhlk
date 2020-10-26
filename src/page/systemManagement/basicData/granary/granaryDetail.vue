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
                                廒间名称：
                                <label v-text="detailData.warehouseName"></label>
                            </span>
                            <span>
                                廒间编号：
                                <label v-text="detailData.warehouseGbCode"></label>
                            </span>
                            <span>
                                库点编码：
                                <label v-text="detailData.graindepotGbCode"></label>
                            </span>
                            <span>
                                仓房编号：
                                <label v-text="detailData.storehouseGbCode"></label>
                            </span>
                            <span>
                                企业编码：
                                <label v-text="detailData.enterpriseCode"></label>
                            </span>
                            <span>
                                责任保管员：
                                <label v-text="detailData.responsibleCustodian"></label>
                            </span>
                            <span>
                                所在省份：
                                <label v-text="detailData.provice"></label>
                            </span>
                            <span>
                                所在城市：
                                <label v-text="detailData.city"></label>
                            </span>
                            <span>
                                行政区：
                                <label v-text="detailData.country"></label>
                            </span>
                            <span>
                                是否国债投资：
                                <label v-text="detailData.nationalDebtInvestmentFlg"></label>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">廒间信息</div>
                </div>
                <div class="tag-box-content">
                    <div class="userManage-detail">
                        <div>
                            <span>
                                当前状态：
                                <label v-text="detailData.currentState"></label>
                            </span>
                            <span>
                                预计装粮：
                                <label v-text="detailData.expectedGrainLoading"></label>
                            </span>
                            <span>
                                实际装粮:
                                <label v-text="detailData.realGrainLoading"></label>
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
                                现有数量（千克）：
                                <label v-text="detailData.nowQuantity"></label>
                            </span>
                            <span>
                                长：
                                <label v-text="detailData.length"></label>
                            </span>
                            <span>
                                宽：
                                <label v-text="detailData.width"></label>
                            </span>
                            <span>
                                高：
                                <label v-text="detailData.height"></label>
                            </span>
                            <span>
                                窗户数量：
                                <label v-text="detailData.windowNumber"></label>
                            </span>
                            <span>
                                窗户状态：
                                <label v-text="detailData.windowStatus"></label>
                            </span>
                            <span>
                                通风方式：
                                <label v-text="detailData.aerationType"></label>
                            </span>
                            <span>
                                廒间使用状态：
                                <label v-text="detailData.useStatus"></label>
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
                                <label v-text="detailData.builtYear"></label>
                            </span>
                            <span>
                                启用日期：
                                <label v-text="detailData.enableDate"></label>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">附件</div>
                </div>
                <div class="tag-box-content">
                    <div class="upload-pic">
                        <img :src="detailData.imagUrl+'/'+detailData.imageName" alt="">
                    </div>
                </div>
            </div>
            <div class="detail-back">
                <button @click="detailBack();">返回</button>
            </div>
        </div>
    </div>
</template>

<script>
import { granaryDetail } from "@/api/systemManage/granary";
import { granaryStatus,VentilationMode  } from "@/api/systemManage/dropDown";
import { staffDetail } from "@/api/systemManage/staff";
import {
    grainDetail
} from '@/api/systemManage/basicData/grainVarieties'
export default {
  name: "granaryDetail",
  data() {
    return {
      postData: {
        warehouseGbCode: this.$route.query.id,
        storehouseName: this.$route.query.storehouseName,
        warehouseName: this.$route.query.warehouseName
      },
      granaryStatusList:[],
        VentilationModeList:[],//通风方式
      detailData: ""
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      granaryDetail(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.detailData = ret.data.dataMap;
            const completedTime = vm.detailData.builtYear.slice(0,4)
            const enablationTime = vm.detailData.enableDate.slice(0,4)
            vm.detailData.builtYear = completedTime
            vm.detailData.enableDate = enablationTime
              granaryStatus()
                .then(ret => {//当前状态
                  layer.closeAll("loading");
                  if (ret.code == 200) {
                    vm.granaryStatusList = ret.data.dataList;

                      for (var i = vm.granaryStatusList.length - 1; i >= 0; i--) {
                        if (vm.granaryStatusList[i].dicInfoCode==vm.detailData.currentState) {

                          vm.detailData.currentState=vm.granaryStatusList[i].dicInfoValue;
                        }
                      }
                  } else {
                    layer.alert(ret.data, { closeBtn: 0 });
                  }
                })
                .catch(err => {
                  layer.alert(err.data, { closeBtn: 0 });
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
                  layer.alert(err.data, { closeBtn: 0 });
                });


                grainDetail({grainVarietyId:ret.data.dataMap.expectedGrainLoading}).then(ret=>{
                    layer.closeAll('loading');
                    if (ret.code==200) {
                        vm.detailData.expectedGrainLoading=ret.data.grainVariety.grainVarietyName;

                    }else{
                        // layer.alert(ret.data, { closeBtn: 0 });
                    }

                }).catch(err=>{
                    // layer.alert(err.data, { closeBtn: 0 });
                });
                grainDetail({grainVarietyId:ret.data.dataMap.realGrainLoading}).then(ret=>{
                    layer.closeAll('loading');
                    if (ret.code==200) {
                        vm.detailData.realGrainLoading=ret.data.grainVariety.grainVarietyName;

                    }else{
                        // layer.alert(ret.data, { closeBtn: 0 });
                    }

                }).catch(err=>{
                    // layer.alert(err.data, { closeBtn: 0 });
                });


          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.data, { closeBtn: 0 });
        });
    },
    detailBack:function (id,storehouseName,warehouseName,pageNo) {
      var vm=this;
      this.$router.push({
        name: "granary",
        query: {
          id:id,
          storehouseName:vm.postData.storehouseName,
          warehouseName:vm.postData.warehouseName,
          pageNo:vm.postData.pageNo
        }
      });
    }
  },
  mounted() {
    var vm = this;
    vm.getDetail();
  }
};
</script>
