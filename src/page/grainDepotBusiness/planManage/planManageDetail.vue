<template>
    <div class="content">
        <div class="menuManage roleManage">
            <div class="tag-box" v-if="detailData.documentId">
                <div class="tag-box-top">
                    <div class="tag-title">来文信息</div>
                </div>
                <div class="tag-box-content">
                    <div class="userManage-detail">
                        <div>
                            <span>
                                来文编号：
                                <label v-text="detailData.documentId"></label>
                            </span>
                            <span style="width: 50%">
                                来文名称：
                                <label v-text="fileName"></label>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">计划信息</div>
                </div>
                <div class="tag-box-content">
                    <div class="userManage-detail">
                        <div>
                            <span>
                                计划编号：
                                <label v-text="detailData.planId"></label>
                            </span>
                            <span>
                                计划名称：
                                <label v-text="detailData.planName"></label>
                            </span>
                            <span>
                                计划描述：
                                <label v-text="detailData.planDesc"></label>
                            </span>
                            <span>
                                计划文号：
                                <label v-text="detailData.referenceNumber"></label>
                            </span>
                            <span>
                                计划类型：
                                <label v-if="detailData.executeType==1">收储计划</label>
                                <label v-if="detailData.executeType==2">销售计划</label>
                                <label v-if="detailData.executeType==3">轮换计划</label>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">粮食信息</div>
                </div>
                <div class="tag-box-content">
                    <div class="userManage-detail">
                        <div>
                            <span>
                                粮食品种：
                                <label v-text="detailData.grainKind"></label>
                            </span>
                            <span>
                                粮食年期：
                                <label v-text="detailData.grainAnnual"></label>
                            </span>
                            <span>
                                粮食等级：
                                <label v-text="detailData.grainOilLevel"></label>
                            </span>
                            <span>
                                粮食性质：
                                <label v-text="detailData.grainAttribute"></label>
                            </span>
                            <span>
                                要求数量(千克)：
                                <label v-text="detailData.demandQuantity"></label>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">基础信息</div>
                </div>
                <div class="tag-box-content">
                    <div class="userManage-detail">
                        <div>
                            <span v-if="detailData.executeType==1||detailData.executeType==3">
                                计划粮收储单价(元/千克)：
                                <label v-text="detailData.storagePrice"></label>
                            </span>
                            <span v-if="detailData.executeType==1||detailData.executeType==3">
                                计划粮收储开始日期：
                                <label v-text="detailData.storageBeginTime"></label>
                            </span>
                            <span v-if="detailData.executeType==1||detailData.executeType==3">
                                收储完成数量(千克)：
                                <label v-text="detailData.instoreCount"></label>
                            </span>
                            <span v-if="detailData.executeType==1||detailData.executeType==3">
                                计划粮收储截止日期：
                                <label v-text="detailData.storageEndTime"></label>
                            </span>
                            <span>
                                库点：
                                <label v-text="detailData.graindepotGbCode"></label>
                            </span>
                            <span v-if="detailData.executeType==2||detailData.executeType==3">
                                计划销售开始日期：
                                <label v-text="detailData.salesBeginTime"></label>
                            </span>
                            <span v-if="detailData.executeType==2||detailData.executeType==3">
                                计划粮销售价格(元/千克)：
                                <label v-text="detailData.salesPrice"></label>
                            </span>
                            <span v-if="detailData.executeType==2||detailData.executeType==3">
                                销售完成数量(千克)：
                                <label v-text="detailData.outstoreCount"></label>
                            </span>
                            <span v-if="detailData.executeType==2||detailData.executeType==3">
                                计划销售截止时间：
                                <label v-text="detailData.salesEndTime"></label>
                            </span>
                            <span>
                                计划隶属分类编码：
                                <label v-text="detailData.planGroupId"></label>
                            </span>
                            <!-- <span>
                                原计划名称：
                                <label v-text="detailData.planGroupName"></label>
                            </span> -->
                            <span>
                                下单单位：
                                <label v-text="detailData.planCustomer"></label>
                            </span>
                            <!-- <span>
                                创建人名称：
                                <label v-text="detailData.creater"></label>
                            </span> -->
                            <span>
                                计划进度：
                                <label v-text="detailData.planProgress"></label>
                            </span>
                        </div>
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
import { getPlanById } from "@/api/business/plan";
import { getDocRevice } from "@/api/business/docRevices";
import {
  grainVariety,grainOilLevel,grainNature,planTypeCode,graindepot
} from "@/api/systemManage/dropDown";
import { libraryDetail } from "@/api/systemManage/basicData/library";
import {
    grainDetail
} from '@/api/systemManage/basicData/grainVarieties'
export default {
  name: "planManageDetail",
  data() {
    return {
      postData: {
        planId: this.$route.query.id,
        planName: this.$route.query.planName,
        executeType: this.$route.query.executeType,
        grainKindId: this.$route.query.grainKindId,
        grainAttributeId: this.$route.query.grainAttributeId,
        pageNo:this.$route.query.pageNo
      },
      fileName:'',
      grainVarietyList:[],//粮食品种
      grainOilLevelList:[],//粮食等级
      grainNaturelList:[],//粮食性质
      graindepotlList:[],//库点
      planTypeCodelList:[],
      detailData: ""
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      getPlanById(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret))
            vm.detailData = ret.data.plan;
            const storageBeginTime = vm.detailData.storageBeginTime.slice(0,10)
            const storageEndTime = vm.detailData.storageEndTime.slice(0,10)
            const salesBeginTime = vm.detailData.salesBeginTime.slice(0,10)
            const salesEndTime = vm.detailData.salesEndTime.slice(0,10)
            vm.detailData.storageBeginTime = storageBeginTime
            vm.detailData.storageEndTime = storageEndTime
            vm.detailData.salesBeginTime = salesBeginTime
            vm.detailData.salesEndTime = salesEndTime
              grainOilLevel({}).then(ret => {//粮食等级
                  if (ret.code == 200) {
                    vm.grainOilLevelList = ret.data.dataList;
                    for (var i = 0; i < vm.grainOilLevelList.length; i++) {//取粮食等级
                        if (vm.grainOilLevelList[i].dicInfoCode== vm.detailData.grainOilLevel) {
                            vm.detailData.grainOilLevel=vm.grainOilLevelList[i].dicInfoValue
                        }
                    }
                  } else {
                    layer.alert(ret.data, { closeBtn: 0 });
                  }
              }).catch(err => {
                  layer.alert(err.message, { closeBtn: 0 });
              });
              if (vm.detailData.documentId) {
                  getDocRevice({documentId:vm.detailData.documentId})
                    .then(ret => {
                      layer.closeAll("loading");
                      if (ret.code == 200) {
                        // console.log(JSON.stringify(ret))
                        vm.fileName = ret.data.receivedDocument.fileName;

                      } else {
                        layer.alert(ret.data, { closeBtn: 0 });
                      }
                    })
                    .catch(err => {
                      layer.alert(err.message, { closeBtn: 0 });
                    });

              }
              grainDetail({grainVarietyId:ret.data.plan.grainKind}).then(ret=>{
                  layer.closeAll('loading');
                  if (ret.code==200) {
                      vm.detailData.grainKind=ret.data.grainVariety.grainVarietyName;

                  }else{
                      layer.alert(err.message, { closeBtn: 0 });
                  }

              }).catch(err=>{
                  layer.alert(err.message, { closeBtn: 0 });
              });
              grainNature({}).then(ret => {//粮食性质
                  if (ret.code == 200) {
                    vm.grainNaturelList = ret.data.dataList;
                    for (var i = 0; i < vm.grainNaturelList.length; i++) {//粮食性质
                        if (vm.grainNaturelList[i].dicInfoCode== vm.detailData.grainAttribute) {
                            vm.detailData.grainAttribute=vm.grainNaturelList[i].dicInfoValue
                        }
                    }
                  } else {
                    layer.alert(ret.data, { closeBtn: 0 });
                  }
              }).catch(err => {
                  layer.alert(err.message, { closeBtn: 0 });
              });


              libraryDetail({graindepotGbCode:vm.detailData.graindepotGbCode}).then(ret => {//库点
                  if (ret.code == 200) {
                    vm.detailData.graindepotGbCode=ret.data.dataMap.graindepotName;
                  } else {
                    layer.alert(ret.data, { closeBtn: 0 });
                  }
              }).catch(err => {
                  layer.alert(err.message, { closeBtn: 0 });
              });

            planTypeCode({}).then(ret => {//计划隶属分类编码
                if (ret.code == 200) {
                  // console.log(JSON.stringify(ret));
                  vm.planTypeCodelList = ret.data.dataList;
                  for (var i = 0; i < vm.planTypeCodelList.length; i++) {//
                      if (vm.planTypeCodelList[i].dicInfoCode== vm.detailData.planGroupId) {
                          vm.detailData.planGroupId=vm.planTypeCodelList[i].dicInfoValue
                      }
                  }
                } else {
                  layer.alert(ret.data, { closeBtn: 0 });
                }
            }).catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
            });


          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    detailBack: function(id,planName,executeType,grainKindId,pageNo,grainAttributeId) {
      var vm = this;
      this.$router.push({
        name: "planManage",
        query: {
          id: id,
          planName:vm.postData.planName,
          executeType:vm.postData.executeType,
          grainKindId:vm.postData.grainKindId,
          grainAttributeId:vm.postData.grainAttributeId,
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
