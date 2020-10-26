<template>
  <div class="content">
    <div class="menuManage operationLog ">
      <div class="lookup">
         结算单编号：
        <input type="text" class="input-text excision" v-model="postData.businessSettlementSheetNo">
        客户名称：
        <input type="text" class="input-text excision" v-model="postData.customerArchives">
         收款状态：
        <select name class="select-style" v-model="postData.recType">
          <option value=''>请选择</option>
          <option value='1'>已收款</option>
          <option value='2'>未收款</option>
        </select>
        <br>
         结算日期：
        <input type="text" class="input-text Wdate" onclick="WdatePicker()" id="startDate">至
        <input type="text" class="input-text Wdate excision" onclick="WdatePicker()" id="endDate">

        <div class="btn btn-add" @click="getList();">
          <img src="../../../../static/images/search.png" alt="">
          <label>查找</label>
        </div>
      </div>
      <div>
        <select name="" class="select-style" v-model="sortOrder" @change="changeSortOrder();">
          <option value="">排序方式</option>
          <option value="0">顺序</option>
          <option value="1">倒序</option>
        </select>
      </div>
      <table class="customTable">
        <thead>
          <tr>
            <th style="width:5%;"><input type="checkbox"></th>
            <th style="width:5%;">序号</th>
            <th style="width:10%;">商务结算单号</th>
            <th style="width:10%;">结算客户</th>
            <th style="width:10%;">结算价格</th>
            <th style="width:10%;">结算数量(千克)</th>
            <th style="width:10%;">结算金额</th>
            <th style="width:10%;">收款状态</th>
            <th style="width:10%;">审核状态</th>
            <th style="width:15%;">操作</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="(item,i) in listData">
                <td><input type="checkbox" ></td>
                <td v-if="sortOrder=='0'" v-text="i+1"></td>
                <td v-else v-text="listData.length-i"></td>
                <td v-text="item.businessSettlementSheetNo"></td>
                <td v-text="item.customerArchives"></td>
                <td v-text="item.settlementPrice"></td>
                <td v-text="item.settlementWeight"></td>
                <td v-text="item.settlementMoney"></td>
                <td v-text="item.recStatus"></td>
                <td v-text="item.auditState"></td>
                <td>
                      <div class="table-btn btn-change" v-if="item.recStatus=='未收款'&&item.auditState=='审核通过'" @click="showPopup(item);">收款</div>
                </td>
            </tr>
        </tbody>
      </table>
      <!-- 分页容器 -->
      <div id="PageBar"></div>
      <div class="detail-back">
          <button @click="detailBack();">返回</button>
      </div>
      <!-- 创建商务结算单弹出层 -->
        <div class="popup" :style="editPopup==1?'display:block;':''">
            <div class="popup-main planPopup-edit-main operationLog">
                <div class="popup-title">
                    <label>收款操作</label>
                    <em class="popup-close" @click="closePopup();">×</em>
                </div>
                <div class="popup-content" >
                    
                    <div class="userManage-detail userManage-edit">
                        <div>
                            <span>
                                客户名称：
                                <input type="text" class="input-text" readonly="readonly" v-model="submitData.customerName">
                            </span>
                            <span>
                                结算总金额：
                                <input type="text" class="input-text"  readonly="readonly" v-model="submitData.settlementTotalMoney">
                            </span>
                            <span>
                                付款方式：
                                <select name="" class="select-style" v-model="submitData.payType" >
                                    <option value="现金">现金</option>
                                    <option value="银行转账">银行转账</option>
                                </select>
                            </span>
                            <span>
                                是否开票：
                                <select name="" class="select-style" v-model="submitData.hasOpenTicket" >
                                    <option value="未开票">未开票</option>
                                    <option value="已开票">已开票</option>
                                </select>
                            </span>
                            <span v-if="submitData.payType=='银行转账'">
                                开户行名称：
                                <input type="text" class="input-text"  v-model="submitData.bankName">
                            </span>
                            <span  v-if="submitData.payType=='银行转账'">
                                银行账户名称：
                                <input type="text" class="input-text"  v-model="submitData.bankAccountName">
                            </span>
                            <span  v-if="submitData.payType=='银行转账'">
                                开户账号：
                                <input type="text" class="input-text"  v-model="submitData.bankAccountNo">
                            </span>
                            <span  v-if="submitData.payType=='银行转账'">
                                开户地址：
                                <input type="text" class="input-text"  v-model="submitData.bankAddress">
                            </span>
                            <span  v-if="submitData.payType=='银行转账'">
                                汇款流水单号：
                                <input type="text" class="input-text"  v-model="submitData.remittanceFlowNo">
                            </span>
                            <span  v-if="submitData.payType=='银行转账'">
                                转账时间：
                                <input type="text" class="input-text Wdate" onclick="WdatePicker()" id="transferAccounts">
                            </span>
                        </div>
                    </div>
                </div>
                <div class="edit-btn" style="margin-top: 20px;">
                    <button class="edit-submit" @click="submitEvent();">提交</button>
                    <button class="edit-back" @click="closePopup();">返回</button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<style type="text/css" scoped>
  .lookup .excision{
    margin-right: 2rem;
  }
  .userManage-detail div{
    line-height: 20px;
  }
  .planPopup-edit-main{
    height: 40%;
  }
  .popup .popup-content{
    border-bottom: 0;
  }
  .edit-btn button{
    margin-right: 60px;
  }
</style>
<script>
import { receivablesList,receivablesAdd } from "@/api/business/finance";


export default {
  name: "document",
  data() {
    return {
      sortOrder: "0", //0 顺序，1 倒序
      // requestData:this.$route.query.data,
      postData: {
        businessSettlementSheetNo: this.$route.query.id,
        customerArchives:'',
        startDate: '',
        endDate: '',
        recType: '',
      },
      submitData:{
          businessSettlementSheetNo:'',
          customerName:'',
          settlementTotalMoney:'',
          payType:'现金',
          hasOpenTicket:'未开票',
          bankName:'',
          bankAccountName:'',
          bankAccountNo:'',
          bankAddress:'',
          remittanceFlowNo:'',
          transferAccounts:'',
      },
      showType:'',
      listData: [],
      editPopup: 0, // 控制菜单编辑弹出层的显影，1为显示
    };
  },
  methods: {
    changeSortOrder: function() {//倒序
      var vm = this;
      vm.listData.reverse();
    },
    showPopup: function(data) {// 展示弹出层
        var vm = this;
        vm.submitData.businessSettlementSheetNo=data.businessSettlementSheetNo;
        vm.submitData.settlementTotalMoney=data.settlementMoney;
        vm.submitData.customerName=data.customerArchives;
        vm.editPopup = 1;
    },
    closePopup: function() {// 隐藏弹出层
        var vm = this;
        vm.editPopup = 0;
    },
    getList: function() {//获取列表
      var vm = this;
      vm.postData.startDate=$('#startDate').val();
      vm.postData.endDate=$('#endDate').val();
      layer.load(2);
      receivablesList(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.listData = ret.data.dataList;
          } else {
            if (ret.code == "500" && ret.data == "查询错误，没有数据") {
              layer.msg("暂无数据");
              vm.listData = [];
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    submitEvent:function () {
      var vm = this;
      vm.submitData.transferAccounts=$('#transferAccounts').val();
      if (vm.submitData.payType=='银行转账') {

          if (vm.submitData.bankName == "") {
            layer.msg("请填写开户行名称");
            return;
          }
          if (vm.submitData.bankAccountName == "") {
            layer.msg("请填写银行账户名称");
            return;
          }
          if (vm.submitData.bankAccountNo == "") {
            layer.msg("请填写开户账号");
            return;
          }
          if (vm.submitData.bankAddress == "") {
            layer.msg("请填写开户地址");
            return;
          }
          if (vm.submitData.remittanceFlowNo == "") {
            layer.msg("请填写汇款流水单号");
            return;
          }
          if (vm.submitData.transferAccounts == "") {
            layer.msg("请填写转账时间");
            return;
          }
      }
      layer.load(2);
      receivablesAdd(vm.submitData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
              layer.msg(ret.data.result);

              this.$router.push({
                name: "balance"
              });
          } else {
              layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });      
    },
    detailBack:function () {//返回
        this.$router.back(-1);
    }
  },
  mounted() {
    var vm=this;
    vm.getList(1);
  }
};

</script>
