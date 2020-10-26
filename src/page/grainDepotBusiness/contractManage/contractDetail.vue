<template>
    <div class="content">
        <div class="menuManage roleManage">
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">基础信息</div>
                </div>
                <div class="tag-box-content">
                    <div class="userManage-detail">
                        <div>
                            <span>
                                计划编号：
                                <label v-text="detailData.planId"></label>
                            </span>
                            <span>
                                合同编号：
                                <label v-text="detailData.contractId"></label>
                            </span>
                            <span>
                                合同标题：
                                <label v-text="detailData.contractTitle"></label>
                            </span>
                            <span>
                                合同客户编号：
                                <label v-text="detailData.customerId"></label>
                            </span>
                            <span>
                                合同客户名称：
                                <label v-text="detailData.customerName"></label>
                            </span>
                            <span>
                                合同粮食单价(元/千克)：
                                <label v-text="detailData.grainPrice"></label>
                            </span>
                            <span>
                                总金额：
                                <label v-text="detailData.moneyQuantity"></label>
                            </span>
                            <span>
                                合同签订人：
                                <label v-text="detailData.signingMan"></label>
                            </span>
                            <span>
                                合同签订时间：
                                <label v-text="detailData.signingTime"></label>
                            </span>
                            <span>
                                合同生效日期：
                                <label v-text="detailData.enableDate"></label>
                            </span>
                            <span>
                                合同截止日期：
                                <label v-text="detailData.disableDate"></label>
                            </span>
                            <span>
                                合同粮食数量(千克)：
                                <label v-text="detailData.grainQuantity"></label>
                            </span>
                            <span>
                                合同变更记录标志：
                                <label v-text="detailData.changeRecordFlag?'不是变更记录':'是原合同的变更记录'"></label>
                            </span>
                            <span>
                                合同创建时间：
                                <label v-text="detailData.createTime"></label>
                            </span>
                            <span>
                                合同变更原因：
                                <label v-text="detailData.changeReason"></label>
                            </span>
                            <span>
                                合同类型：
                                <label v-if="detailData.contractType==1">收购合同</label>
                                <label v-if="detailData.contractType==2">销售合同</label>
                                <label v-if="detailData.contractType==3">代储合同</label>
                            </span>
                            <!-- <span>
                                粮食年限：
                                <label v-text="detailData.district"></label>
                            </span> -->
                            <span>
                                原合同编号：
                                <label v-text="detailData.originalContract"></label>
                            </span>
                            <span>
                                合同创建人：
                                <label v-text="detailData.createMan"></label>
                            </span>
                            <span>
                                粮食品种：
                                <label v-text="detailData.grainKind"></label>
                            </span>
                            <span>
                                粮食年期：
                                <label v-text="detailData.grainAnnual"></label>
                            </span>
                            <span>
                                价外补贴单价：
                                <label v-text="detailData.subsidyUnitPrice"></label>
                            </span>
                            <span>
                                价外补贴上限：
                                <label v-text="detailData.subsidyUpperLimit"></label>
                            </span>
                            <span>
                                价外补贴启用下限：
                                <label v-text="detailData.subsidyEffectiveFloor"></label>
                            </span>
                            <span>
                                支付方式：
                                <label v-text="detailData.contractPayType"></label>
                            </span>
                            <span>
                                已完成数量(千克)：
                                <label v-text="detailData.finishedQuantity"></label>
                            </span>
                            <span>
                                已完成数量金额：
                                <label v-text="detailData.moneyOfFinishedQuantity"></label>
                            </span>
                            <span>
                                粮食性质：
                                <label v-text="detailData.grainAttribute"></label>
                            </span>
                            <span>
                                已结算价外补贴数量：
                                <label v-text="detailData.closedSubsidyAmount"></label>
                            </span>
                            <span>
                                每亩补贴数量：
                                <label v-text="detailData.subsidy"></label>
                            </span>
                            <span>
                                客户种粮面积：
                                <label v-text="detailData.plantAcreage"></label>
                            </span>
                            <span>
                                合同备注：
                                <label v-text="detailData.remark"></label>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tag-box" v-if="type=='suspend'">
                <div class="tag-box-top">
                    <div class="tag-title">中止信息</div>
                </div>
                <div class="tag-box-content">
                    <div class="userManage-detail">
                        <div>
                            <span style="width: 100%;">
                                中止合同原因：
                                <textarea class="edit-textarea" v-model="postSuspendData.stopReason" ></textarea>
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
                        <img :src="detailData.attachmentFile" alt="" @click="bigPic($event);">
                    </div>
                </div>
            </div>
            <div v-if="type=='suspend'" class="edit-btn">
                <button class="edit-submit" @click="suspendContract();">提交</button>
                <button class="edit-back" @click="detailBack();">返回</button>
            </div>
            <div v-else class="detail-back">
                <button @click="detailBack();">返回</button>
            </div>
        </div>
    </div>
</template>

<script>
import { getConstract, stopConstract } from "@/api/business/contract";
import { lookPic } from "@/utils/public";
import {
    grainDetail
} from '@/api/systemManage/basicData/grainVarieties'
import {grainNature,payType} from "@/api/systemManage/dropDown";
export default {
  name: "documentDetail",
  data() {
    return {
        type:this.$route.query.type,
      postData: {
        contractId: this.$route.query.id,
        contractTitle: this.$route.query.contractTitle,
        contractType: this.$route.query.contractType
      },
      postSuspendData: {
        contractId: this.$route.query.id,
        stopReason:''
      },
      detailData: ""
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      getConstract(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.detailData = ret.data.contractDetail;
              grainDetail({grainVarietyId:ret.data.contractDetail.grainKind}).then(ret=>{
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
            payType({}).then(ret => {//支付方式下拉
                if (ret.code == 200) {
                    for(var i=0;i<ret.data.dataList.length;i++){
                        if(ret.data.dataList[i].dicInfoCode==vm.detailData.contractPayType){
                            vm.detailData.contractPayType=ret.data.dataList[i].dicInfoValue;
                        }
                    }
                } else {
                    layer.alert(ret.data, { closeBtn: 0 });
                }
            }).catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
            });

            console.log(JSON.stringify(vm.detailData))
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    suspendContract:function () {
      var vm = this;
      if (vm.postSuspendData.stopReason == "") {
        layer.msg("请填写中止合同原因");
        return;
      }
      layer.load(2);
      stopConstract(vm.postSuspendData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
              layer.msg("合同已中止！");
              this.$router.push({
                name: "contract"
              });
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });

    },
    bigPic:function (event) {
        lookPic(event.currentTarget);
    },
    detailBack:function (id,contractType,pageNo,contractTitle) {//返回
      var vm = this;
      this.$router.push({
        name: "contract",
        query: {
          id: id,
          contractType:vm.postData.contractType,
          contractTitle:vm.postData.contractTitle,
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
