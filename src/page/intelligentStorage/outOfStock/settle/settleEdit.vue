<template>
    <div class="content">
        <div class="menuManage userManage">
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">基础信息</div>
                </div>
                <div class="tag-box-content">
                    <div class="userManage-detail userManage-edit">
                        <div>
                            <span>
                                卡号：
                                <input type="text" class="input-text" v-model="submitData.cardNo" @change="getData(submitData.cardNo);">
                            </span>
                            <span>
                                通知单号：
                                <input type="text" class="input-text" v-model="submitData.billId">
                            </span>
                            <!-- <span>
                                结算单号：
                                <input type="text" class="input-text" v-model="detailData.grainNumber">
                            </span> -->
                            <span>
                                入库类型：
                                <input type="text" class="input-text" v-model="detailData.registerType">
                            </span>
                            <span>
                                粮食品种：
                                <input type="text" class="input-text" v-model="detailData.grainKind">
                            </span>
                            <span>
                                车牌号：
                                <input type="text" class="input-text" v-model="detailData.plateNumber">
                            </span>
                            <span>
                                毛重(千克)：
                                <input type="text" class="input-text " v-model="detailData.grossWeight">
                            </span>
                            <span>
                                皮重(千克)：
                                <input type="text" class="input-text" v-model="detailData.tareWeight">
                            </span>
                            <span>
                                净重(千克)：
                                <input type="text" class="input-text" v-model="detailData.netWeight">
                            </span>
                            <span>
                                水份增扣重(千克)：
                                <input type="text" class="input-text" v-model="detailData.waterIncrementDecrement">
                            </span>
                            <span>
                                杂质增扣重(千克)：
                                <input type="text" class="input-text" v-model="detailData.impurityIncrementDecrement">
                            </span>
                            <span>
                                其他扣重(千克)：
                                <input type="text" class="input-text" v-model="detailData.otherIncrementDecrement">
                            </span>
                            <span>
                                扣重总计(千克)：
                                <input type="text" class="input-text" v-model="detailData.incrementDecrementTotal">
                            </span>
                            <span>
                                水份增扣价：
                                <input type="text" class="input-text" v-model="submitData.waterIncreDecrePrice">
                            </span>
                            <span>
                                杂质增扣价：
                                <input type="text" class="input-text" v-model="submitData.impurityIncreDecrePrice">
                            </span>
                            <span>
                                其他扣价：
                                <input type="text" class="input-text" v-model="submitData.otherIncreDecrePrice">
                            </span>
                            <span>
                                扣价总计：
                                <input type="text" class="input-text" v-model="submitData.increDecreTotalPrice">
                            </span>
                            <span>
                                磅费：
                                <input type="text" class="input-text" v-model="submitData.poundFee">
                            </span>
                            <span>
                                烘干费：
                                <input type="text" class="input-text" v-model="submitData.dryFee">
                            </span>
                            <span>
                                其他服务费：
                                <input type="text" class="input-text" v-model="submitData.otherServiceFee">
                            </span>
                            <span>
                                结算单价(元/千克)：
                                <input type="text" class="input-text" v-model="detailData.unitPrice">
                            </span>
                            <span>
                                结算重量(千克)：
                                <input type="text" class="input-text" v-model="detailData.totalWeight">
                            </span>
                            <!-- <span>
                                结算金额：
                                <input type="text" class="input-text" v-model="submitData.grainNumber">
                            </span>  -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="edit-btn">
                <button class="edit-submit" @click="submitEvent();">提交</button>
                <button class="edit-back" @click="detailBack();">返回</button>
            </div>
        </div>
    </div>
</template>

<script>
import {reimbursementAdd,settlementGetInfo} from "@/api/intelligentStorage/public";
import { mul,add} from "@/utils/public";
export default {
  name: "warehouseEdit",
  data() {
    return {
        submitData:{
            billId:'',
            poundFee:'',
            dryFee:'',
            waterIncreDecrePrice:'',
            impurityIncreDecrePrice:'',
            otherIncreDecrePrice:'',
            otherServiceFee:'',
            increDecreTotalPrice:'',
            unitPrice:''
        },
        totalDeduction:'',
        detailData:''
    }
  },
  methods: {
    getData: function(id) {
      var vm = this;
      layer.load(2);
      settlementGetInfo({cardNo:id,noticeType:2})
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            console.log(JSON.stringify(ret))
            vm.detailData=ret.data.detail;
            vm.submitData.billId=ret.data.detail.billId;
            vm.submitData.unitPrice=ret.data.detail.unitPrice;
            vm.submitData.waterIncreDecrePrice=mul(ret.data.detail.unitPrice,ret.data.detail.waterIncrementDecrement);
            vm.submitData.impurityIncreDecrePrice=mul(ret.data.detail.unitPrice,ret.data.detail.impurityIncrementDecrement);
            vm.submitData.otherIncreDecrePrice=mul(ret.data.detail.unitPrice,ret.data.detail.otherIncrementDecrement);
            vm.submitData.increDecreTotalPrice= mul(ret.data.detail.unitPrice,ret.data.detail.incrementDecrementTotal);
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    submitEvent: function() {
      var vm = this;

        layer.load(2);
        reimbursementAdd(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("结算单提交成功！");
              vm.$router.push({
                name: "outOfStockStep",
                query: {
                    step: 6,
                    condition:this.$route.query.condition
                }
              });
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          })
          .catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
          });
    },
    detailBack:function () {
      var vm = this;
          vm.$router.push({
            name: "outOfStockStep",
            query: {
              step: 6,
              condition:this.$route.query.condition
            }
          });
    }
  },
  mounted () {
      var vm=this;
  }
}
</script>
