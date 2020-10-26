<template>
    <div class="content">
        <div class="menuManage roleManage">
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">基础信息</div>
                </div>
                <div class="tag-box-content">
                    <div class="userManage-detail userManage-edit">
                        <div>
                            <span>
                                客户分类：
                                <select name="" class="select-style" v-model="submitData.classify">
                                    <option value="true">个人客户</option>
                                    <option value="false">企业客户</option>
                                </select>
                            </span>
                            <span v-if="postData.customerId" >
                                客户编号：
                                <input type="text" readonly="readonly" class="input-text" v-model="submitData.customerId">
                            </span>
                            <span>
                                客户名称：
                                <input type="text" class="input-text" v-model="submitData.customerName">
                            </span>
                            <span>
                                联系地址：
                                <input type="text" class="input-text" v-model="submitData.address">
                            </span>
                            <span>
                                手机号码:
                                <input type="text" class="input-text" v-model="submitData.mobile">
                            </span>
                            <span>
                                身份证：
                                <input type="text" class="input-text" v-model="submitData.identification">
                            </span>
                            <span>
                                电子邮件：
                                <input type="text" class="input-text" v-model="submitData.email">
                            </span>
                            <span>
                                企业性质名称：
                                <select  class="select-style" v-model="submitData.generalProperty">
                                    <option v-for="item in enterpriseTypeList" :value="item.dicInfoCode" v-text="item.dicInfoValue"></option>
                                </select>
                            </span>
                            <span>
                                开票信息（发票抬头）：
                                <input type="text" class="input-text" v-model="submitData.invoiceTitle">
                            </span>
                            <span>
                                税号（可选填）：
                                <input type="text" class="input-text" v-model="submitData.taxNumber">
                            </span>
                            <span>
                                开户行名称：
                                <input type="text" class="input-text" v-model="submitData.bankName">
                            </span>
                            <span>
                                银行账户名称：
                                <input type="text" class="input-text" v-model="submitData.accountName">
                            </span>
                            <span>
                                开户账号：
                                <input type="text" class="input-text" v-model="submitData.accountNumber">
                            </span>
                            <span>
                                开户地址：
                                <input type="text" class="input-text" v-model="submitData.accountAddress">
                            </span>
                            <span>
                                种植面积：
                                <input type="text" class="input-text" v-model="submitData.plantAcreage">
                            </span>
                            <span>
                                每亩的价外补贴数量：
                                <input type="text" class="input-text" v-model="submitData.subsidy">
                            </span>
                            <span>
                                客户分组编码：
                                <select  class="select-style" v-model="submitData.customerGroupId">
                                    <option v-for="item in customerGroupingList" :value="item.dicInfoCode" v-text="item.dicInfoValue"></option>
                                </select>
                            </span>
                            <span>
                                城市：
                                <input type="text" class="input-text" v-model="submitData.district">
                            </span>
                            <span style="width: 100%;">
                                客户描述：
                                <input type="text" style="width: 95%;" class="input-text" v-model="submitData.remark">
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">图片</div>
                </div>
                <div class="tag-box-content">
                    <div class="upload-pic">
                        <div id="uploadPic"></div>
                        <img :src="submitData.customerImageUrl?submitData.customerImageUrl:'../../../../static/images/upload-pic.png'" alt="">
                        <label class="fc-red">只支持.jpg格式</label>
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
<style type="text/css" scoped>
    .popup-content{
        border-bottom: 0;
    }
    .plan-document{
      height: 480px;
      overflow-y: auto;
    }
</style>
<script>
import { getCustomer, addCustomer, editCustomer ,addCustomerByCheck } from "@/api/business/customer";
import {
  enterpriseProperty,customerGrouping
} from "@/api/systemManage/dropDown";
import { checkPhone, uploadPic } from "@/utils/public";
export default {
  name: "planManageEdit",
  data() {
    return {
      type:this.$route.query.type,
      postData: {
        customerId: this.$route.query.id,
        customerName: this.$route.query.customerName,
        classify: this.$route.query.classify,
        district: this.$route.query.district,
      },
      enterpriseTypeList:[],
      customerGroupingList:[],
      submitData: {
        customerId: "",
        classify: "",
        customerName: "",
        address: "",
        mobile: "",
        identification:'',
        customerImage:'',
        customerImageUrl:'',
        email:'',
        remark:'',
        generalProperty:'',
        invoiceTitle:'',
        taxNumber:'',
        bankName:'',
        accountName:'',
        accountNumber:'',
        accountAddress:'',
        plantAcreage:'',
        subsidy:'',
        customerGroupId:'',
        district:''
      }
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
            vm.submitData.customerId = ret.data.customer.customerId;
            vm.submitData.classify = ret.data.customer.classify;
            vm.submitData.customerName = ret.data.customer.customerName;
            vm.submitData.address = ret.data.customer.address;
            vm.submitData.mobile = ret.data.customer.mobile;
            vm.submitData.identification = ret.data.customer.identification;
            vm.submitData.customerImage = ret.data.customer.customerImage.split('/').pop();
            vm.submitData.customerImageUrl = ret.data.customer.customerImage;
            vm.submitData.email = ret.data.customer.email;
            vm.submitData.remark = ret.data.customer.remark;
            vm.submitData.generalProperty = ret.data.customer.generalProperty;
            vm.submitData.invoiceTitle = ret.data.customer.invoiceTitle;
            vm.submitData.taxNumber = ret.data.customer.taxNumber;
            vm.submitData.bankName = ret.data.customer.bankName;
            vm.submitData.accountName = ret.data.customer.accountName;
            vm.submitData.accountNumber = ret.data.customer.accountNumber;
            vm.submitData.accountAddress = ret.data.customer.accountAddress;
            vm.submitData.plantAcreage = ret.data.customer.plantAcreage;
            vm.submitData.subsidy = ret.data.customer.subsidy;
            vm.submitData.customerGroupId = ret.data.customer.customerGroupId;
            vm.submitData.district = ret.data.customer.district;
            vm.$nextTick(function() {
              vm.getDropDown();
            });
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
      if (vm.submitData.customerName == "") {
        layer.msg("请填写客户名称");
        return;
      }
      if (vm.submitData.address == "") {
        layer.msg("请填写客户联系地址");
        return;
      }
      if (vm.submitData.mobile == "") {
        layer.msg("请填写客户手机号");
        return;
      }else {
          if (!checkPhone(vm.submitData.mobile)) {
            layer.msg("请填写正确的客户手机号！");
            return;
          }
        }
      if (vm.submitData.identification == "") {
        layer.msg("请填写身份证");
        return;
      }
      if (vm.submitData.generalProperty == "") {
        layer.msg("请选择企业性质");
        return;
      }
      if (vm.submitData.invoiceTitle == "") {
        layer.msg("请填写开票信息");
        return;
      }
      // if (vm.submitData.taxNumber == "") {
      //   layer.msg("请填写税号");
      //   return;
      // }
      if (vm.submitData.bankName == "") {
        layer.msg("请填写开户行名称");
        return;
      }
      if (vm.submitData.accountName == "") {
        layer.msg("请填写银行账户名称");
        return;
      }
      if (vm.submitData.accountNumber == "") {
        layer.msg("请填写开户账号");
        return;
      }
      if (vm.submitData.accountAddress == "") {
        layer.msg("请填写开户地址");
        return;
      }
      if (vm.submitData.customerGroupId == "") {
        layer.msg("请填写客户分组编码");
        return;
      }
      if (vm.submitData.district == "") {
        layer.msg("请填写客户所属地区名称");
        return;
      }
      if (vm.type=='edit'||vm.type=='change') {
        layer.load(2);
        editCustomer(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              if (vm.type=='change') {
                addCustomerByCheck({ customerId: vm.postData.customerId }).then(ret => {
                    layer.closeAll("loading");
                    if (ret.code == 200) {
                        layer.msg("客户变更成功！");
                        this.$router.push({
                          name: "customer",
                          query: {
                            district:vm.postData.district,
                            classify:vm.postData.classify,
                            customerName:vm.postData.customerName,
                            pageNo:vm.postData.pageNo
                          }
                        });
                    } else {
                      layer.alert(ret.data, { closeBtn: 0 });
                    }
                }).catch(err => {
                    layer.alert(err.message, { closeBtn: 0 });
                });

              }else{
                layer.msg("编辑客户成功！");
                this.$router.push({
                  name: "customer",
                  query: {
                    district:vm.postData.district,
                    classify:vm.postData.classify,
                    customerName:vm.postData.customerName,
                    pageNo:vm.postData.pageNo
                  }
                });
              }
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          })
          .catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
          });
      } else {
        layer.load(2);
        addCustomer(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("新增客户成功！");
              this.$router.push({
                name: "customer",
                query: {
                  district:vm.postData.district,
                  classify:vm.postData.classify,
                  customerName:vm.postData.customerName,
                  pageNo:vm.postData.pageNo
                }
              });
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          })
          .catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
          });
      }
    },
    getDropDown: function() {//获取下拉项
      var vm = this;
      enterpriseProperty({}).then(ret => {//企业性质
          if (ret.code == 200) {
            console.log(JSON.stringify(ret))
            vm.enterpriseTypeList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
      }).catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
      });
      customerGrouping({}).then(ret => {//客户分组编码
          if (ret.code == 200) {
            console.log(JSON.stringify(ret))
            vm.customerGroupingList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
      }).catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
      });
    },
    detailBack:function (id,type,district,classify,customerName,pageNo) {//返回
      var vm = this;
      this.$router.push({
        name: "customer",
        query: {
          id: id,
          type:type,
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
    if (this.$route.query.id) {
        vm.getDetail();
    }else{
        vm.getDropDown();
    }
    uploadPic("uploadPic", function(ret) {
      if (ret.code == 200) {
        vm.submitData.customerImage=ret.data.fileName;
        vm.submitData.customerImageUrl=ret.data.fileUrl;
      } else {
        layer.alert("上传文件出错", { closeBtn: 0 });
      }
    });
  }
};
</script>
