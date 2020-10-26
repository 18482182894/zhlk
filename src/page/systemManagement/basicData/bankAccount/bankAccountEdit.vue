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
                银行名称：
                <input type="text" class="input-text" v-model="submitData.bankName">
              </span>
              <span>
                开户行信息：
                <input type="text" class="input-text" v-model="submitData.bankInformation">
              </span>
              <span>
                开户姓名：
                <input type="text" class="input-text" v-model="submitData.accountUserName">
              </span>
              <span>
                账号：
                <input type="text" class="input-text" v-model="submitData.accountNo">
              </span>
              <span>
                开户地址：
                <input type="text" class="input-text" v-model="submitData.bankInformationAddr">
              </span>
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
import { bankDetail, bankEdit, bankNew } from "@/api/systemManage/bank";
export default {
  name: "bankEdit",
  data() {
    return {
      type:this.$route.query.type,
      postData: {
        bankAccountId:this.$route.query.id,
      },
      submitData: {
        bankAccountId: "",
        bankName: "",
        bankInformation: "",
        accountUserName: "",
        accountNo: "",
        bankInformationAddr: ""
      },
      addCheckAll: false, //全选按钮
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      bankDetail(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret))
            vm.submitData.bankAccountId = ret.data.dataMap.bankAccountId;
            vm.submitData.bankName = ret.data.dataMap.bankName;
            vm.submitData.bankInformation = ret.data.dataMap.bankInformation;
            vm.submitData.accountUserName = ret.data.dataMap.accountUserName;
            vm.submitData.accountNo = ret.data.dataMap.accountNo;
            vm.submitData.bankInformationAddr =ret.data.dataMap.bankInformationAddr;
          } else {
            layer.alert(err.message, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    submitEvent: function() {
      var vm = this;

      if (vm.submitData.bankName == "") {
        layer.msg("请填写银行名称");
        return;
      }
      if (vm.submitData.bankInformation == "") {
        layer.msg("请填写银开户行信息");
        return;
      }
      if (vm.submitData.accountUserName == "") {
        layer.msg("请填写开户姓名");
        return;
      }
      if (vm.submitData.accountNo == "") {
        layer.msg("请填写账号");
        return;
      }
      if (vm.submitData.bankInformationAddr == "") {
        layer.msg("请填写开户地址");
        return;
      }
      layer.load(2);
      if (vm.type=='edit') {
        bankEdit(vm.submitData).then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
              layer.msg("编辑银行账户成功！");
              // console.log(vm.postData);
              this.$router.push({
                name: "bankAccount",
                query: {
                  bankInformation:this.$route.query.bankInformation,
                  bankName:this.$route.query.bankName,
                  pageNo:this.$route.query.pageNo
                }
              });

          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });

      }else{
        vm.submitData.bankAccountId='';
        bankNew(vm.submitData).then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
              layer.msg("新增银行账户成功！");
              // console.log(vm.postData);
              this.$router.push({
                name: "bankAccount",
                query: {
                  bankInformation:this.$route.query.bankInformation,
                  bankName:this.$route.query.bankName,
                  pageNo:this.$route.query.pageNo
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
    detailBack: function() {
      /*this.$router.back(-1);*/
      this.$router.push({
        name: "bankAccount",
        query: {
          bankInformation:this.$route.query.bankInformation,
          bankName:this.$route.query.bankName,
          pageNo:this.$route.query.pageNo
        }
      });
    }
  },
  mounted() {
    var vm = this;
    if (vm.type!='') {
      vm.getDetail();
    }
  }
};
</script>
