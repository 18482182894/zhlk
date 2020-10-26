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
                                卡号：
                                <label v-text="detailData.cardNo"></label>
                            </span>
                            <span>
                                通知单号：
                                <label v-text="detailData.billId"></label>
                            </span>
                            <span>
                                结算单号：
                                <label v-text="detailData.settlementId"></label>
                            </span>
                            <span>
                                入库类型：
                                <label v-text="detailData.registorType"></label>
                            </span>
                            <span>
                                粮食品种：
                                <label v-text="detailData.grainVariety"></label>
                            </span>
                            <span>
                                车牌号：
                                <label v-text="detailData.plateNumber"></label>
                            </span>
                            <span>
                                毛重(千克)：
                                <label v-text="detailData.grossWeight"></label>
                            </span>
                            <span>
                                皮重(千克)：
                                <label v-text="detailData.tareWeight"></label>
                            </span>
                            <span>
                                净重(千克)：
                                <label v-text="detailData.netWeight"></label>
                            </span>
                            <span>
                                水份增扣重(千克)：
                                <label v-text="detailData.waterIncrementDecrement"></label>
                            </span>
                            <span>
                                杂质增扣重(千克)：
                                <label v-text="detailData.impurityIncrementDecrement"></label>
                            </span>
                            <span>
                                其他扣重(千克)：
                                <label v-text="detailData.otherIncrementDecrement"></label>
                            </span>
                            <span>
                                扣重总计(千克)：
                                <label v-text="detailData.incrementDecrementTotal"></label>
                            </span>
                            <span>
                                水份增扣价：
                                <label v-text="detailData.waterIncreDecrePrice"></label>
                            </span>
                            <span>
                                杂质增扣价：
                                <label v-text="detailData.impurityIncreDecrePrice"></label>
                            </span>
                            <span>
                                其他扣价：
                                <label v-text="detailData.otherIncreDecrePrice"></label>
                            </span>
                            <span>
                                扣价总计：
                                <label v-text="detailData.increDecreTotalPrice"></label>
                            </span>
                            <span>
                                磅费：
                                <label v-text="detailData.poundFee"></label>
                            </span>
                            <span>
                                烘干费：
                                <label v-text="detailData.dryFee"></label>
                            </span>
                            <span>
                                其他服务费：
                                <label v-text="detailData.otherServiceFee"></label>
                            </span>
                            <span>
                                结算单价(元/千克)：
                                <label v-text="detailData.unitPrice"></label>
                            </span>
                            <span>
                                结算重量(千克)：
                                <label v-text="detailData.settlementWeight"></label>
                            </span>
                            <span>
                                结算金额：
                                <label v-text="detailData.settlementTotalMoney"></label>
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
import {reimbursementDetail} from "@/api/intelligentStorage/public"; 
import {
    grainDetail
} from '@/api/systemManage/basicData/grainVarieties'
export default {
  name: "companyDetail",
  data() {
    return {
      postData: {
        settlementId: this.$route.query.id
      },
      detailData: ""
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      reimbursementDetail(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          console.log(JSON.stringify(ret))
          if (ret.code == 200) {
            vm.detailData = ret.data.settlement;
            
             grainDetail({grainVarietyId:ret.data.settlement.grainVariety}).then(ret=>{
                  layer.closeAll('loading');
                  if (ret.code==200) {
                      vm.detailData.grainVariety=ret.data.grainVariety.grainVarietyName;
                      
                  }else{
                      layer.alert(err.message, { closeBtn: 0 }); 
                  }

              }).catch(err=>{
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
    detailBack:function () {
      var vm = this;
      if(this.$route.query.type){
        this.$router.back(-1);
      }else{
          vm.$router.push({
            name: "storageStep",
            query: {
              step: 6
            }
          });
      }
    }
  },
  mounted() {
    var vm = this;
    vm.getDetail();
  }
};
</script>
