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
                                 合同标题：
                                <label v-text="detailData.contractTitle"></label>
                            </span>
                            <span>
                                合同客户名称：
                                <label v-text="detailData.customerName"></label>
                            </span>
                            <span>
                                合同粮食单价：
                                <label v-text="detailData.contractTitle"></label>
                            </span>
                            <span>
                                合同粮食数量（千克）：
                                <label v-text="detailData.grainQuantity"></label>
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
                                 商务结算单号：
                                <label v-text="detailData.businessSettlementSheetNo "></label>
                            </span>
                            <span>
                                开票单位：
                                <label v-text="detailData.ticketOpenCompany"></label>
                            </span>
                            <span>
                                客户档案：
                                <label v-text="detailData.customerArchives"></label>
                            </span>
                            <span>
                                客户编号
                                <label v-text="detailData.customerId"></label>
                            </span>
                            <span>
                                结算重量（千克）：
                                <label v-text="detailData.settlementWeight"></label>
                            </span>
                            <span>
                                 结算总金额：
                                <label v-text="detailData.settlementMoney"></label>
                            </span>
                            <span>
                                 制单人：
                                <label v-text="detailData.makeBillPerson"></label>
                            </span>
                            <span>
                                付款状态：
                                <label v-text="detailData.noticeBillStatus"></label>
                            </span>
                            <span>
                                开票状态：
                                <label v-text="detailData.hasOpenTicket"></label>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <table class="customTable">
              <thead>
                <tr>
                  <th style="width:5%;"><input type="checkbox" ></th>
                  <th style="width:5%;">序号</th>
                  <th style="width:10%;">出入库类型</th>
                  <th style="width:15%;">业务结算单号</th>
                  <th style="width:10%;">车牌号</th>
                  <th style="width:10%;">开单日期</th>
                  <th style="width:10%;">结算单价(元/千克)</th>
                  <th style="width:10%;">粮食数量(千克)</th>
                  <th style="width:10%;">结算金额</th>
                  <th style="width:15%;">操作</th>
                </tr>
              </thead>
              <tbody>
                  <tr v-for="(item,i) in detailData.settlementList">
                      <td><input type="checkbox" ></td>
                      <td v-text="i+1"></td>
                      <td v-text="item.registorType"></td>
                      <td v-text="item.initSettlementSheetNo"></td>
                      <td v-text="item.plateNumber"></td>
                      <td v-text="item.settlementDate"></td>
                      <td v-text="item.settelmentPrice"></td>
                      <td v-text="item.settelmentQuantity"></td>
                      <td v-text="item.settelmentMoney"></td>
                      <td>
                        <div class="table-btn btn-yellow" @click="jumpSettlementDetail(item.initSettlementSheetNo);">详情</div>
                      </td>
                  </tr>
                  <tr>
                    <td colspan="11" rowspan="" headers="">
                      <label class="fc-blue">结算金额：<label v-text="detailData.settlementMoney"></label>元</label>
                    </td>
                  </tr>
              </tbody>
            </table>
            <div class="detail-back">
                <button @click="detailBack();">返回</button>
            </div>
        </div>
    </div>
</template>

<script>
import { financeDetail} from "@/api/business/finance";
export default {
  name: "documentDetail",
  data() {
    return {
      type:this.$route.query.type,
      postData: {
        businessSettlementSheetNo: this.$route.query.id
      },
      detailData: ""
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      financeDetail(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.detailData = ret.data.businessSettlementSheetDetail;
            if(vm.detailData.noticeBillStatus == 1) {
              vm.detailData.noticeBillStatus = '已付款'
            } else if (vm.detailData.noticeBillStatus == 2) {
              vm.detailData.noticeBillStatus = '未付款'
            }     
            for(var i in vm.detailData.settlementList) {
              vm.detailData.settlementList[i].settlementDate = vm.detailData.settlementList[i].settlementDate.slice(0,10)
            }
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    jumpSettlementDetail:function (id) {
      var vm = this;
      this.$router.push({
        name: "settleOutDetail",
        query: {
          id: id
        }
      });
    },
    detailBack:function () {
        this.$router.back(-1);
    }
  },
  mounted() {
    var vm = this;
    vm.getDetail();
  }
};
</script>
