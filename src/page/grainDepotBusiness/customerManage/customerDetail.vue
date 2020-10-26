<template>
    <div class="content">
        <div class="menuManage roleManage">
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">基础信息</div>
                </div>
                <div class="tag-box-content">
                    <div class="userManage-detail">
                        <img :src="detailData.customerImage?detailData.customerImage:'../../../../static/images/user.png'" alt="">
                        <div style="width: 82%;">
                            <span>
                                客户分类：
                                <label v-text="detailData.classify?'个人客户':'企业客户'"></label>
                            </span>
                            <span>
                                客户编号：
                                <label v-text="detailData.customerId"></label>
                            </span>
                            <span>
                                客户名称：
                                <label v-text="detailData.customerName"></label>
                            </span>
                            <span>
                                联系地址：
                                <label v-text="detailData.address"></label>
                            </span>
                            <span>
                                手机号码:
                                <label v-text="detailData.mobile"></label>
                            </span>
                            <span>
                                身份证：
                                <label v-text="detailData.identification"></label>
                            </span>
                            <span>
                                电子邮件：
                                <label v-text="detailData.email"></label>
                            </span>
                            <span>
                                企业性质：
                                <label v-text="detailData.generalProperty"></label>
                            </span>
                            <span>
                                开票信息（发票抬头）：
                                <label v-text="detailData.invoiceTitle"></label>
                            </span>
                            <span>
                                税号：
                                <label v-text="detailData.taxNumber"></label>
                            </span>
                            <span>
                                开户行名称：
                                <label v-text="detailData.bankName"></label>
                            </span>
                            <span>
                                银行账户名称：
                                <label v-text="detailData.accountName"></label>
                            </span>
                            <span>
                                开户账号：
                                <label v-text="detailData.accountNumber"></label>
                            </span>
                            <span>
                                开户地址：
                                <label v-text="detailData.accountAddress"></label>
                            </span>
                            <span>
                                种植面积：
                                <label v-text="detailData.plantAcreage"></label>
                            </span>
                            <span>
                                每亩的价外补贴数量：
                                <label v-text="detailData.subsidy"></label>
                            </span>
                            <span>
                                客户分组编码：
                                <label v-text="detailData.customerGroupId"></label>
                            </span>
                            <span>
                                城市：
                                <label v-text="detailData.district"></label>
                            </span>
                            <span style="width:100%;">
                                客户描述：
                                <label v-text="detailData.remark"></label>
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
import { getCustomer } from "@/api/business/customer";
import {
  enterpriseProperty,customerGrouping
} from "@/api/systemManage/dropDown";
export default {
  name: "documentDetail",
  data() {
    return {
      postData: {
        customerId: this.$route.query.id,
        customerName: this.$route.query.customerName,
        classify: this.$route.query.classify,
        district: this.$route.query.district,
      },
      detailData: ""
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      getCustomer(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.detailData = ret.data.customer;


              enterpriseProperty({}).then(ret => {//企业性质
                  if (ret.code == 200) {
                    // console.log(JSON.stringify(ret))
                    // vm.enterpriseTypeList = ret.data.dataList;
                    for (var i = 0; i < ret.data.dataList.length; i++) {
                        if (ret.data.dataList[i].dicInfoCode== vm.detailData.generalProperty) {
                            vm.detailData.generalProperty=ret.data.dataList[i].dicInfoValue
                        }
                    }

                  } else {
                    layer.alert(ret.data, { closeBtn: 0 });
                  }
              }).catch(err => {
                  layer.alert(err.message, { closeBtn: 0 });
              });
              customerGrouping({}).then(ret => {//客户分组编码
                  if (ret.code == 200) {
                    // console.log(JSON.stringify(ret))
                    // vm.customerGroupingList = ret.data.dataList;
                    for (var i = 0; i < ret.data.dataList.length; i++) {
                        if (ret.data.dataList[i].dicInfoCode== vm.detailData.customerGroupId) {
                            vm.detailData.customerGroupId=ret.data.dataList[i].dicInfoValue
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
    detailBack:function (id,district,classify,customerName,pageNo) {//返回
      var vm = this;
      this.$router.push({
        name: "customer",
        query: {
          id: id,
          district:vm.postData.district,
          classify:vm.postData.classify,
          customerName:vm.postData.customerName,
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
