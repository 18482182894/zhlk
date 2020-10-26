<template>
  <div class="content">
    <div class="menuManage operationLog ">
      <div class="lookup">
         合同：
        <input type="text" class="input-text excision"  readonly="readonly"  v-model="statementPostData.contractTitle" placeholder="选择合同" @click="showPopup('select');">
        业务结算单号：
        <input type="text" class="input-text excision"  v-model="statementPostData.settlementId" >
         客户名称：
        <input type="text" class="input-text excision"  v-model="statementPostData.customerName" >
        <br>
         车牌号：
        <input type="text" class="input-text excision"  v-model="statementPostData.plateNumber" >
         结算日期：
        <input type="text" class="input-text Wdate" onclick="WdatePicker()" id="startTime">至
        <input type="text" class="input-text Wdate excision" onclick="WdatePicker()" id="endTime">

        <div class="btn btn-add" @click="getstatementList();">
          <img src="../../../../static/images/search.png" alt="">
          <label>查找</label>
        </div>
      </div>

      <div class="tag-box">
          <div class="tag-box-top">
              <div class="tag-title">基础信息</div>
          </div>
          <div class="tag-box-content">
              <div class="userManage-detail">
                  <div>
                      <span>
                          合同标题：
                          <input type="text" class="input-text" readonly="readonly" v-model="detailData.contractTitle" >
                      </span>
                      <span>
                          合同客户名称：
                          <input type="text" class="input-text" readonly="readonly" v-model="detailData.customerName">
                      </span>
                      <span>
                          合同粮食单价：
                          <input type="text" class="input-text"  readonly="readonly" v-model="detailData.grainPrice">
                      </span>
                      <span>
                          合同粮食数量(千克)：
                          <input type="text" class="input-text"  readonly="readonly" v-model="detailData.grainQuantity">
                      </span>
                      <span>
                          合同生效日期：
                          <input type="text" class="input-text"  readonly="readonly" v-model="detailData.enableDate">
                      </span>
                      <span>
                          合同截止日期：
                          <input type="text" class="input-text" readonly="readonly" v-model="detailData.disableDate">
                      </span>
                  </div>
              </div>
          </div>
      </div>
      <div class="detail-back">
          <button class="table-btn btn-submit" @click="showPopup();">创建商务结算单</button>
      </div>
      <table class="customTable">
        <thead>
          <tr>
            <th style="width:5%;"><input  type="checkbox" v-model="allChecked" @change="checkAll();" ></th>
            <th style="width:5%;">序号</th>
            <th style="width:10%;">出入库类型</th>
            <th style="width:10%;">业务结算单号</th>
            <th style="width:10%;">车牌号</th>
            <th style="width:10%;">开单日期</th>
            <th style="width:5%;">结算单价</th>
            <th style="width:8%;">粮食数量(千克)</th>
            <th style="width:5%;">结算金额</th>
            <th style="width:32%;">操作</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="(item,i) in statementListData">
                <td><input type="checkbox" :value="item" v-model="money.moneyList" @change="clickChange();"></td>
                <td v-text="i+1"></td>
                <td v-text="item.registerType"></td>
                <td v-text="item.settlementId"></td>
                <td v-text="item.plateNumber"></td>
                <td v-text="item.settlementDatetime"></td>
                <td v-text="item.unitPrice"></td>
                <td v-text="item.settlementWeight"></td>
                <td v-text="item.settlementTotalMoney"></td>
                <td>
                  <div class="table-btn btn-yellow" @click="jumpSettlementDetail(item.settlementId);">详情</div>
                </td>
            </tr>
            <tr>
              <td colspan="11" rowspan="" headers="">
                <label class="fc-blue">结算金额：<label v-text="submitData.settlementMoney"></label>元</label>
              </td>
            </tr>
        </tbody>
      </table>
      <div class="detail-back">
          <button @click="detailBack();">返回</button>
      </div>
        <!-- 选择来文弹出层 -->
        <div class="popup" :style="Popup==1?'display:block;':''">
            <div class="popup-main planPopup-edit-main contract-main">
                <div class="popup-title">
                    <label>选择合同</label>
                    <em class="popup-close" @click="closePopup('select');">×</em>
                </div>
                <div class="popup-content" >
                    <div class="lookup">
                      合同标题：
                      <input type="text" class="input-text excision" v-model="contractPostData.contractTitle">
                      合同类型：
                      <select name="" class="select-style  excision" v-model="contractPostData.contractType">
                        <option value="">合同类型</option>
                        <option value="1">收购合同</option>
                        <option value="2">销售合同</option>
                        <option value="3">代储合同</option>
                      </select>

                      <div class="btn btn-add" @click="getcontractList(1);">
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
                          <th style="width:2.5%;"><input type="checkbox"></th>
                          <th style="width:2.5%;">序号</th>
                          <th style="width:15%;">合同标题</th>
                          <th style="width:7.5%;">合同类型</th>
                          <th style="width:7.5%;">粮食品种</th>
                          <th style="width:15%;">客户名称</th>
                          <th style="width:5%;">签订人</th>
                          <th style="width:5%;">粮食单价</th>
                          <th style="width:5%;">总金额</th>
                          <th style="width:10%;">操作</th>
                        </tr>
                      </thead>
                      <tbody>
                          <tr v-for="(item,i) in listData">
                              <td><input type="checkbox"></td>
                              <td v-if="sortOrder=='0'" v-text="i+1"></td>
                              <td v-else v-text="listData.length-i"></td>
                          <td v-text="item.contractTitle"></td>
                          <td>
                            <label v-if="item.contractType==1">收购合同</label>
                            <label v-if="item.contractType==2">销售合同</label>
                            <label v-if="item.contractType==3">代储合同</label>
                          </td>
                          <td v-text="item.grainKindVlue"></td>
                          <td v-text="item.customerName"></td>
                          <td v-text="item.signingMan"></td>
                          <td v-text="item.grainPrice"></td>
                          <td v-text="item.moneyQuantity"></td>
                          <td>
                              <div class="table-btn btn-yellow" @click="checkDocument(item);">选择</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <!-- 分页容器 -->
                    <div id="PageBar"></div>
                </div>
            </div>
        </div>
        <!-- 创建商务结算单弹出层 -->
        <div class="popup" :style="editPopup==1?'display:block;':''">
            <div class="popup-main planPopup-edit-main operationLog">
                <div class="popup-title">
                    <label>创建商务结算单</label>
                    <em class="popup-close" @click="closePopup();">×</em>
                </div>
                <div class="popup-content" >
                    
                    <div class="userManage-detail userManage-edit">
                        <div>
                            <!-- <span>
                                商务结算单号：
                                <input type="text" class="input-text">
                            </span> -->
                            <span>
                                客户档案：
                                <input type="text" class="input-text" readonly="readonly" v-model="submitData.customerArchives">
                            </span>
                            <span>
                                客户编号：
                                <input type="text" class="input-text" readonly="readonly" v-model="submitData.customerId">
                            </span>
                            <span>
                                结算重量(千克)：
                                <input type="text" class="input-text" readonly="readonly" v-model="submitData.settlementWeight">
                            </span>
                            <span>
                                结算总金额：
                                <input type="text" class="input-text" readonly="readonly" v-model="submitData.settlementMoney">
                            </span>
                            <span>
                                制单人：
                                <select name="" class="select-style" v-model="submitData.makeBillPerson">
                                    <option v-for="item in staffListData" :value="item.staff_name" v-text="item.staff_name">
                                    </option>
                                </select>
                            </span>
                            <span>
                                结算日期：
                                <input type="text" class="input-text Wdate"  onclick="WdatePicker()" id="settlementDate">
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
  .planPopup-edit-main{
    width: 690px;
    height: 300px;
  }
  .contract-main{
    width: 1100px;
    height: 670px;  
  }
  .userManage-detail div span{
    width: 33%;
  }
  .detail-back button.btn-submit{
    width: auto;
    padding: 0 10px;
    background: #008EFF;
  }
  .input-text{
      width: 15rem;    
  }
</style>
<script>
import { statementList,receivableStatement } from "@/api/business/finance";
import { getConstractListBySelect, getConstract } from "@/api/business/contract";  
  import { staffList} from "@/api/systemManage/staff";

export default {
  name: "document",
  data() {
    return {
      sortOrder: "0", //0 顺序，1 倒序
      requestData:this.$route.query.data,
      statementPostData: {
        noticeType: 2,
        contractId:'',
        contractTitle:'',
        settlementId:'',
        customerName:'',
        plateNumber:'',
        startTime:'',
        endTime:'',
      },
      contractPostData: {
        contractTitle: "",
        contractType: "",
        pageSize: 6,
        pageNo:1
      },
      detailData:'',//合同详情
      submitData:{
          contractId:'',
          ticketOpenCompany:'',
          customerArchives:'',
          customerId:'',
          settlementWeight:0,
          settlementMoney:0,
          settlementType:2,
          makeBillPerson:'',
          settlementDate:'',
          dataList:{
            dataList:[]
          }
      },
      allChecked: false,
      money: {
        moneyList: []
      },
      detailData:'',
      listData: [],//合同列表
      statementListData: [],//结算单列表
      staffListData:[],//职工列表
      editPopup: 0, // 控制弹出层的显影，1为显示
      Popup:0,// 控制合同弹出层的显影，1为显示
    };
  },
  methods: {
    changeSortOrder: function() {//倒序
      var vm = this;
      vm.listData.reverse();
    },
    showPopup: function(type) {// 展示弹出层
        var vm = this;
        if (type=='select') {
            vm.getcontractList(1);
            vm.Popup = 1;
        }else{
            vm.editPopup = 1;          
        }
    },
    closePopup: function(type) {// 隐藏弹出层
        var vm = this;
        if (type=='select') {
            vm.Popup = 0;
        }else{
            vm.editPopup = 0;          
        }
    },
    getstatementList: function() {//获取结算单列表
      var vm = this;
      layer.load(2);
      statementList(vm.statementPostData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.statementListData = ret.data.dataList;
            
            // vm.submitData.dataList.dataList= ret.data.dataList;
          } else {
              layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getcontractList: function(pageNo) {//获取合同列表
      var vm = this;
      layer.load(2);
      vm.contractPostData.pageNo = pageNo;
      getConstractListBySelect(vm.contractPostData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.listData = ret.data.contractList;
            laypage({
              //分页
              cont: "PageBar", //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
              pages: ret.page.totalPages, //通过后台拿到的总页数
              curr: pageNo,
              skin: "#95C93E", //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
              jump: function(obj, first) {
                //触发分页后的回调
                if (!first) {
                  //一定要加此判断，否则初始时会无限刷新
                  vm.getcontractList(obj.curr);
                }
              }
            });
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
    checkDocument:function (data) {//选择合同
      var vm=this;
      
      getConstract({contractId:data.contractId})
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.detailData = ret.data.contractDetail;
            vm.statementPostData.contractTitle=ret.data.contractDetail.contractTitle;
            vm.statementPostData.contractId=ret.data.contractDetail.contractId;
            vm.submitData.contractId=ret.data.contractDetail.contractId;
            vm.submitData.customerArchives=ret.data.contractDetail.customerName;
            vm.submitData.customerId=ret.data.contractDetail.customerId;
            vm.getstatementList();
          } else {
              layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
      vm.closePopup('select');
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
    // delData: function(id) {
    //   //删除
    //   var vm = this;
    //   if (id) {
    //     vm.money.moneyList = [];
    //     vm.money.moneyList.push(id);
    //   } else {
    //     if (vm.money.moneyList.length == []) {
    //       layer.msg("请至少选择一条数据！");
    //       return;
    //     }
    //   }
    //   layer.load(2);
    //   var delStr = vm.money.moneyList.join(",");
    //   deleNotice({ moneyList: delStr })
    //     .then(ret => {
    //       layer.closeAll("loading");
    //       if (ret.code == 200) {
    //         layer.msg("删除成功！");
    //         vm.getList(1);
    //       } else {
    //         layer.alert(ret.data, { closeBtn: 0 });
    //       }
    //     })
    //     .catch(err => {
    //       layer.alert(err.message, { closeBtn: 0 });
    //     });
    // },
    checkAll: function() {
      //全选
      var vm = this;
      if (vm.allChecked) {
        vm.money.moneyList=[];
        for (var i = 0; i < vm.statementListData.length; i++) {
          vm.money.moneyList.push(vm.statementListData[i]);
        }
      } else {
        vm.money.moneyList = [];
      }
      vm.submitData.settlementMoney=0;
      vm.submitData.settlementWeight=0;
      for (var i = 0; i < vm.money.moneyList.length; i++) {
        vm.submitData.settlementMoney+=vm.money.moneyList[i].settlementTotalMoney;
        vm.submitData.settlementWeight+=vm.money.moneyList[i].settlementWeight;
      }
    },
    clickChange: function() {
      //监听input选中状态，控制全选input的选中
      var vm = this;
      if (vm.money.moneyList.length == vm.statementListData.length) {
        vm.allChecked = true;
      } else {
        vm.allChecked = false;
      }
      vm.submitData.settlementMoney=0;
      vm.submitData.settlementWeight=0;
      for (var i = 0; i < vm.money.moneyList.length; i++) {
        vm.submitData.settlementMoney+=vm.money.moneyList[i].settlementTotalMoney;
        vm.submitData.settlementWeight+=vm.money.moneyList[i].settlementWeight;
      }
      vm.submitData.dataList.dataList=[];
      for (var i = 0; i < vm.money.moneyList.length; i++) {
              vm.submitData.dataList.dataList.push({
                initSettlementSheetNo:vm.money.moneyList[i].settlementId,
                settelmentPrice:vm.money.moneyList[i].unitPrice,
                settelmentQuantity:vm.money.moneyList[i].settlementWeight,
                settelmentMoney:vm.money.moneyList[i].settlementTotalMoney,
              });
            }
    },
    submitEvent:function () {
      var vm = this;
      vm.submitData.settlementDate=$('#settlementDate').val();

      if (vm.submitData.makeBillPerson == "") {
        layer.msg("请选择制单人");
        return;
      }
      if (vm.submitData.settlementDate == "") {
        layer.msg("请选择结算日期");
        return;
      }
      if (vm.submitData.dataList.dataList.length == 0) {
        layer.msg("该合同下没有结算单，无法创建");
        return;
      }
      receivableStatement(vm.submitData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
              layer.msg(ret.data.result);

              this.$router.push({
                name: "receivablesDetail"
              });
                    
          } else {
              layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getDropDown: function() {//获取下拉项
      var vm = this;
      staffList({
          pageSize: 1000,
          pageNo: 0
        }).then(ret => {//职工列表
            if (ret.code == 200) {
              // console.log(JSON.stringify(ret))
              // for (var i = 0; i < ret.data.staffList.length; i++) {
              //   vm.staffListData.push({
              //     staff_id:ret.data.staffList[i].staff_id,
              //     staff_name:ret.data.staffList[i].staff_name
              //   });
              // }
              vm.staffListData = ret.data.staffList;
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
        }).catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
        });
    },
    detailBack:function () {
        this.$router.back(-1);
    }
  },
  mounted() {
    var vm=this;
    vm.getDropDown();

  }
};

</script>
