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
                                记录编号：
                                <label v-text="detailData.transferId"></label>
                            </span>
                            <span>
                                移交仓房：
                                <label v-text="detailData.newStorehouseName"></label>
                            </span>
                            <span>
                                移交廒间：
                                <label v-text="detailData.newWarehouseName"></label>
                            </span>
                            <!-- <span>
                                移交货位：
                                <label v-text="detailData.relateType"></label>
                            </span> -->
                            <span>
                                原保管员：
                                <label v-text="detailData.nowAdmin"></label>
                            </span>
                            <span>
                                新保管员：
                                <label v-text="detailData.newAdmin"></label>
                            </span>
                            <span>
                                交换日期：
                                <label v-text="detailData.exchangeDate"></label>
                            </span>
                            <span>
                                监交人：
                                <label v-text="detailData.monitor"></label>
                            </span>
                            <span>
                                登记日期：
                                <label v-text="detailData.registorDate"></label>
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
  import { transferDetail } from "@/api/business/warehousingStock/transfer";
import { staffDetail } from "@/api/systemManage/staff";
export default {
  name: "companyDetail",
  data() {
    return {
      postData: {
        transferId: this.$route.query.id
      },
      detailData: ""
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      transferDetail(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.detailData = ret.data.transfer;
            const exchangeDate = vm.detailData.exchangeDate.slice(0,10)
            const registorDate = vm.detailData.registorDate.slice(0,10)
            vm.detailData.exchangeDate = exchangeDate
            vm.detailData.registorDate = registorDate
            staffDetail({staff_id:ret.data.transfer.nowAdmin})
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  vm.detailData.nowAdmin = ret.data.staffDetail.staff_name;
                } else {
                  layer.alert(ret.data, { closeBtn: 0 });
                }
              })
              .catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
              });
            staffDetail({staff_id:ret.data.transfer.newAdmin})
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  vm.detailData.newAdmin = ret.data.staffDetail.staff_name;
                } else {
                  layer.alert(ret.data, { closeBtn: 0 });
                }
              })
              .catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
              });
            staffDetail({staff_id:ret.data.transfer.monitor})
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  vm.detailData.monitor = ret.data.staffDetail.staff_name;
                } else {
                  layer.alert(ret.data, { closeBtn: 0 });
                }
              })
              .catch(err => {
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
        //this.$router.back(-1);
      this.$router.push({
        name: "transfer",
        query: {
          storehouseGbCode: this.$route.query.storehouseGbCode,
          nowAdmin: this.$route.query.nowAdmin,
          newAdmin: this.$route.query.newAdmin,
          pageNo: this.$route.query.pageNo,
          exchangeStartDate: this.$route.query.exchangeStartDate,
          exchangeEndDate: this.$route.query.exchangeEndDate,
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
