<template>
    <div class="content">
        <div class="menuManage roleManage">
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">合同信息</div>
                </div>
                <div class="tag-box-content">
                    <div class="userManage-detail userManage-edit">
                        <div>
                            <!-- <span v-if="type=='change'">
                                原合同编号：
                                <input type="text" class="input-text" v-model="submitData.originalContract" >
                            </span> -->
                            <span v-if="type=='edit'">
                                原合同编号：
                                <input type="text" class="input-text" readonly v-model="submitData.originalContract" >
                            </span>
                            <span v-if="type=='edit'">
                                合同编号：
                                <input type="text" class="input-text" readonly v-model="submitData.contractId" >
                            </span>
                            <span v-if="type=='add'">
                                合同编号：
                                <input type="text" class="input-text" v-model="submitData.contractId" >
                            </span>
                            <span>
                                合同标题：
                                <input type="text" class="input-text" v-model="submitData.contractTitle" >
                            </span>
                            <span>
                                合同客户编号：
                                <input type="text" class="input-text" v-model="submitData.customerId" readonly="readonly" @click="showPopup();">
                            </span>
                            <span>
                                合同客户名称：
                                <input type="text" class="input-text" v-model="submitData.customerName" >
                            </span>
                            <span>
                                合同粮食单价(元/千克)：
                                <input type="text" class="input-text" v-model="submitData.grainPrice" >
                            </span>
                            <span>
                                总金额：
                                <input type="text" class="input-text" v-model="submitData.moneyQuantity" >
                            </span>
                            <span>
                                合同签订人：
                                <input type="text" class="input-text" v-model="submitData.signingMan" >
                            </span>
                            <span>
                                合同签订时间：
                                <input type="text" class="input-text Wdate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"  id="signingTime" >
                            </span>
                            <span>
                                合同生效日期：
                                <input type="text" class="input-text Wdate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"  id="enableDate" >
                            </span>
                            <span>
                                合同截止日期：
                                <input type="text" class="input-text Wdate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"  id="disableDate" >
                            </span>
                            <span>
                                合同粮食数量(千克)：
                                <input type="text" class="input-text" v-model="submitData.grainQuantity" >
                            </span>
                            <span>
                                合同变更记录标志：
                                <input type="text" class="input-text" v-model="submitData.changeRecordFlag==0?'不是变更记录':'变更记录'" disabled="disabled" >
                            </span>
                            <span>
                                合同创建时间：
                                <input type="text" class="input-text Wdate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"  id="createTime" >
                            </span>
                            <span>
                                合同类型：
                                <select name="" class="select-style" v-model="submitData.contractType">
                                    <option value="1">收购合同</option>
                                    <option value="2">销售合同</option>
                                    <option value="3">代储合同</option>
                                </select>
                            </span>
                            <span>
                                合同创建人：
                                <input type="text" class="input-text" v-model="submitData.createMan">
                            </span>
                            <span>
                                粮食品种：
                                  <div class="edit-grainVariety">
                                    <treeselect v-model="submitData.grainKind" :multiple="false" :options="grainVarietyList" />
                                  </div>
                            </span>
                            <span>
                                粮食年期：
                                <input type="text" class="input-text" v-model="submitData.grainAnnual">
                            </span>
                            <span>
                                价外补贴单价：
                                <input type="number" class="input-text" v-model="submitData.subsidyUnitPrice">
                            </span>
                            <span>
                                价外补贴上限：
                                <input type="number" class="input-text" v-model="submitData.subsidyUpperLimit">
                            </span>
                            <span>
                                价外补贴启用下限：
                                <input type="number" class="input-text" v-model="submitData.subsidyEffectiveFloor">
                            </span>
                            <span>
                                支付方式：
                                <select name="" class="select-style" v-model="submitData.contractPayType">
                                    <option :value="item.dicInfoCode" v-for="item in payTypeList" v-text="item.dicInfoValue"></option>
                                </select>
                            </span>
                            <span>
                                已完成数量(千克)：
                                <input type="number" class="input-text" v-model="submitData.finishedQuantity">
                            </span>
                            <span>
                                已完成数量金额：
                                <input type="number" class="input-text" v-model="submitData.moneyOfFinishedQuantity">
                            </span>
                            <span>
                                粮食性质：
                                <select name="" class="select-style" v-model="submitData.grainAttribute">
                                    <option :value="item.dicInfoCode" v-for="item in grainNaturelList" v-text="item.dicInfoValue"></option>
                                </select>
                            </span>
                            <span>
                                已结算价外补贴数量：
                                <input type="number" class="input-text" v-model="submitData.closedSubsidyAmount">
                            </span>
                            <span>
                                每亩补贴数量：
                                <input type="number" class="input-text" v-model="submitData.subsidy">
                            </span>
                            <span>
                                客户种粮面积：
                                <input type="text" class="input-text" v-model="submitData.plantAcreage">
                            </span>
                            <span>
                                计划编号：
                                <select name="" class="select-style" v-model="submitData.planId">
                                    <option :value="item.planId" v-for="item in PlanList" v-text="item.planName"></option>
                                </select>
                            </span>
                            <span style="width: 100%;">
                                合同备注：
                                <input type="text" class="input-text" style="width: 95%;" v-model="submitData.remark">
                            </span>
                            <span style="width: 100%;">
                                合同变更原因：
                                <input type="text" class="input-text" style="width: 95%;" v-model="submitData.changeReason">
                            </span>

                            <!-- <span v-if="type=='change'" style="width: 100%;">
                                合同变更原因：
                                <input type="text" class="input-text" style="width: 95%;" v-model="submitData.changeReason" >
                            </span> -->
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
                        <img :src="submitData.attachmentUrl?submitData.attachmentUrl:'../../../../static/images/upload-pic.png'" alt="">
                        <label class="fc-red">只支持.jpg格式</label>
                    </div>
                </div>
            </div>
            <div class="edit-btn">
                <button class="edit-submit" @click="submitEvent();">提交</button>
                <button class="edit-back" @click="detailBack();">返回</button>
            </div>
        </div>
        <!-- 选择客户弹出层 -->
        <div class="popup" :style="editPopup==1?'display:block;':''">
            <div class="popup-main planPopup-edit-main operationLog">
                <div class="popup-title">
                    <label>选择客户</label>
                    <em class="popup-close" @click="closePopup('edit');">×</em>
                </div>
                <div class="popup-content" >
                    <div class="lookup">
                      客户名称：
                      <input type="text" class="input-text excision" v-model="postListData.customerName">
                      客户类型：
                      <select name="" class="select-style  excision" v-model="postListData.classify">
                        <option value="">客户类型</option>
                        <option value="true">个人客户</option>
                        <option value="false">企业客户</option>
                      </select>
                      城 市：
                      <input type="text" class="input-text excision" v-model="postListData.district">

                      <div class="btn btn-add" @click="getList(1);">
                        <img src="../../../../static/images/search.png" alt="">
                        <label>查找</label>
                      </div>
                    </div>
                    <div>
                      <div class="btn btn-add" @click="jumpEdit();">
                        <img src="../../../../static/images/add.png" alt="">
                        <label>新增</label>
                      </div>
                      <select name="" class="select-style" v-model="sortOrder" @change="changeSortOrder();">
                        <option value="">排序方式</option>
                        <option value="0">顺序</option>
                        <option value="1">倒序</option>
                      </select>
                    </div>
                    <table class="customTable">
                      <thead>
                        <tr>
                          <th style="width:5%;"><input type="checkbox" v-model="allChecked" @change="checkAll();"></th>
                          <th style="width:5%;">序号</th>
                          <th style="width:10%;">客户名称</th>
                          <th style="width:10%;">客户类型</th>
                          <th style="width:10%;">企业性质</th>
                          <th style="width:10%;">城市</th>
                          <th style="width:20%;">联系电话</th>
                          <th style="width:10%;">客户描述</th>
                          <th style="width:10%;">操作</th>
                        </tr>
                      </thead>
                      <tbody>
                          <tr v-for="(item,i) in listData">
                              <td><input type="checkbox" :value="item.customerId" v-model="delList.customerIdList" @change="clickChange();"></td>
                              <td v-if="sortOrder=='0'" v-text="i+1"></td>
                              <td v-else v-text="listData.length-i"></td>
                          <td v-text="item.customerName"></td>
                          <td v-text="item.classify?'个人客户':'企业客户'" ></td>
                          <td v-text="item.generalProperty"></td>
                          <td v-text="item.district"></td>
                          <td v-text="item.mobile"></td>
                          <td v-text="item.remark"></td>
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
    </div>
</template>
<script>
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { getConstract, addConstract, changeConstract, editConstract } from "@/api/business/contract";
import {
  grainVariety,grainNature,payType
} from "@/api/systemManage/dropDown";
import { getCustomerList } from "@/api/business/customer";
import { getPlanList } from "@/api/business/plan";
import { checkPhone, uploadPic } from "@/utils/public";
export default {
  name: "planManageEdit",
  components: { Treeselect },
  data() {
    return {
      postData: {
        contractId: this.$route.query.id,
        contractTitle: this.$route.query.contractTitle,
        contractType: this.$route.query.contractType
      },
      type:this.$route.query.type,
      sortOrder: "0", //0 顺序，1 倒序
      postListData:{
        customerName: "",
        classify: "",
        district: "",
        pageSize: 6,
        pageNo:1
      },
      grainVarietyList:[],
      grainNaturelList:[],
      payTypeList:[],
      PlanList:[],
      submitData: {
        contractId: "",
        contractTitle: "",
        customerId: "",
        customerName: "",
        grainPrice: "",
        moneyQuantity:'',
        signingMan:'',
        signingTime:'',
        enableDate:'',
        disableDate:'',
        grainQuantity:'',
        createTime:'',
        changeReason:'',
        contractType:'',
        originalContract:this.$route.query.id,
        createMan:'',
        grainKind:null,
        grainAnnual:'',
        subsidyUnitPrice:'',
        subsidyUpperLimit:'',
        subsidyEffectiveFloor:'',
        contractPayType:'',
        finishedQuantity:'',
        moneyOfFinishedQuantity:'',
        grainAttribute:'',
        closedSubsidyAmount:'',
        subsidy:'',
        plantAcreage:'',
        planId:'',
        changeRecordFlag:0,
        remark:'',
        attachmentFile:'',
        attachmentUrl:''
      },
      allChecked: false,
      delList: {
        customerIdList: []
      },
      listData: [],
      editPopup: 0, // 控制菜单编辑弹出层的显影，1为显示
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
            console.log(JSON.stringify(ret))
            if (vm.type=="change") {
              vm.submitData.changeRecordFlag=1;
            }
            vm.submitData.contractId = ret.data.contractDetail.contractId;
            vm.submitData.contractTitle = ret.data.contractDetail.contractTitle;
            vm.submitData.customerId = ret.data.contractDetail.customerId;
            vm.submitData.customerName = ret.data.contractDetail.customerName;
            vm.submitData.grainPrice = ret.data.contractDetail.grainPrice;
            vm.submitData.moneyQuantity = ret.data.contractDetail.moneyQuantity;
            vm.submitData.signingMan = ret.data.contractDetail.signingMan;
            vm.submitData.signingTime = ret.data.contractDetail.signingTime;
            $('#signingTime').val(ret.data.contractDetail.signingTime);
            vm.submitData.enableDate = ret.data.contractDetail.enableDate;
            $('#enableDate').val(ret.data.contractDetail.enableDate);
            vm.submitData.disableDate = ret.data.contractDetail.disableDate;
            $('#disableDate').val(ret.data.contractDetail.disableDate);
            vm.submitData.grainQuantity = ret.data.contractDetail.grainQuantity;
            vm.submitData.createTime = ret.data.contractDetail.createTime;
            $('#createTime').val(ret.data.contractDetail.createTime);
            vm.submitData.changeReason = ret.data.contractDetail.changeReason;
            vm.submitData.contractType = ret.data.contractDetail.contractType;
            // vm.submitData.originalContract = ret.data.contractDetail.originalContract;

            vm.submitData.createMan = ret.data.contractDetail.createMan;
            vm.submitData.grainKind = ret.data.contractDetail.grainKind;
            vm.submitData.grainAnnual = ret.data.contractDetail.grainAnnual;
            vm.submitData.subsidyUnitPrice = ret.data.contractDetail.subsidyUnitPrice;
            vm.submitData.subsidyUpperLimit = ret.data.contractDetail.subsidyUpperLimit;
            vm.submitData.subsidyEffectiveFloor = ret.data.contractDetail.subsidyEffectiveFloor;
            vm.submitData.contractPayType = ret.data.contractDetail.contractPayType;
            vm.submitData.finishedQuantity = ret.data.contractDetail.finishedQuantity;
            vm.submitData.moneyOfFinishedQuantity = ret.data.contractDetail.moneyOfFinishedQuantity;
            vm.submitData.grainAttribute = ret.data.contractDetail.grainAttribute;
            vm.submitData.closedSubsidyAmount = ret.data.contractDetail.closedSubsidyAmount;
            vm.submitData.subsidy = ret.data.contractDetail.subsidy;
            vm.submitData.plantAcreage = ret.data.contractDetail.plantAcreage;
            vm.submitData.planId = ret.data.contractDetail.planId;
            vm.submitData.remark = ret.data.contractDetail.remark;
            vm.submitData.attachmentFile = ret.data.contractDetail.attachmentFile.split('/').pop();
            vm.submitData.attachmentUrl = ret.data.contractDetail.attachmentFile;

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
      vm.submitData.signingTime=$('#signingTime').val();
      vm.submitData.enableDate=$('#enableDate').val();
      vm.submitData.disableDate=$('#disableDate').val();
      vm.submitData.createTime=$('#createTime').val();
      if (vm.submitData.contractId == "") {
        layer.msg("请填写合同编号");
        return;
      }
      if (vm.submitData.contractTitle == "") {
        layer.msg("请填写合同标题");
        return;
      }
      if (vm.submitData.customerId == "") {
        layer.msg("请选择合同客户编号");
        return;
      }
      if (vm.submitData.customerName == "") {
        layer.msg("请填写合同客户名称");
        return;
      }
      if (vm.submitData.grainPrice === "") {
        layer.msg("请填写合同粮食单价");
        return;
      }
      if (vm.submitData.grainQuantity === "") {
        layer.msg("请填写合同粮食数量");
        return;
      }
      if (vm.submitData.moneyQuantity === "") {
        layer.msg("请填写总金额");
        return;
      }
      if (vm.submitData.signingMan == "") {
        layer.msg("请填写合同签订人");
        return;
      }
      if (vm.submitData.signingTime == "") {
        layer.msg("请填写合同签订时间");
        return;
      }
      if (vm.submitData.enableDate == "") {
        layer.msg("请填写合同生效日期");
        return;
      }
      if (vm.submitData.contractType == "") {
        layer.msg("请填写合同类型");
        return;
      }
      if (vm.submitData.grainAttribute == "") {
        layer.msg("请填写粮食性质");
        return;
      }
      if (vm.submitData.grainKind == "") {
        layer.msg("请填写粮食品种");
        return;
      }
      if (vm.submitData.finishedQuantity === "") {
        layer.msg("请填写已完成数量");
        return;
      }
      if (vm.submitData.moneyOfFinishedQuantity === "") {
        layer.msg("请填写已完成数量金额");
        return;
      }
      if (vm.submitData.remark == "") {
        layer.msg("请填写合同备注");
        return;
      }

      // if (vm.type=='change') {

      //   if (vm.submitData.changeReason == "") {
      //     layer.msg("请填写合同变更原因");
      //     return;
      //   }
      //   layer.load(2);
      //   changeConstract(vm.submitData)
      //     .then(ret => {
      //       layer.closeAll("loading");
      //       if (ret.code == 200) {
      //         layer.msg("合同变更成功！");
      //         this.$router.push({
      //           name: "contract",
      //           query: {
      //             contractType:vm.postData.contractType,
      //             contractTitle:vm.postData.contractTitle,
      //             pageNo:vm.postData.pageNo
      //           }
      //         });
      //       } else {
      //         layer.alert(ret.data, { closeBtn: 0 });
      //       }
      //     })
      //     .catch(err => {
      //       layer.alert(err.message, { closeBtn: 0 });
      //     });
      // }

      if (vm.type=='edit') {
        if (vm.submitData.changeReason == "") {
          layer.msg("请填写合同变更原因");
           return;
        }
        layer.load(2);
        editConstract(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("编辑合同成功！");
              this.$router.push({
                name: "contract",
                query: {
                  contractType:vm.postData.contractType,
                  contractTitle:vm.postData.contractTitle,
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
      if (vm.type=='add') {
        layer.load(2);
        addConstract(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("新增合同成功！");
              this.$router.push({
                name: "contract",
                query: {
                  contractType:vm.postData.contractType,
                  contractTitle:vm.postData.contractTitle,
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
    showPopup: function() {// 展示弹出层
        var vm = this;
        vm.getList(0);
        vm.editPopup = 1;
    },
    closePopup: function() {// 隐藏弹出层
        var vm = this;
        vm.editPopup = 0;
    },
    getList: function(pageNo) {//获取客户列表
      var vm = this;
      vm.postListData.pageNo = pageNo;
      layer.load(2);
      getCustomerList(vm.postListData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.listData = ret.data.customerList;
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
                  vm.getList(obj.curr);
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
    checkDocument:function (data) {//选择客户
      var vm=this;
      vm.submitData.customerId=data.customerId;
      vm.submitData.customerName=data.customerName;
      vm.closePopup();
    },
    getDropDown: function() {//获取下拉项
      var vm = this;
      grainVariety({}).then(ret => {//粮食品种
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret));
            vm.grainVarietyList = ret.data.grainVarietyList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
      }).catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
      });
      grainNature({}).then(ret => {//粮食性质
          if (ret.code == 200) {
            vm.grainNaturelList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
      }).catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
      });
      payType({}).then(ret => {//支付方式下拉
          if (ret.code == 200) {
            vm.payTypeList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
      }).catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
      });
      getPlanList({
        pageSize: 1000,
        pageNo: 0
      }).then(ret => {//计划
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret));
            for (var i = 0; i < ret.data.planList.length; i++) {
              if (ret.data.planList[i].planStatus==2) {
                vm.PlanList.push(ret.data.planList[i]);
              }
            }
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
      }).catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
      });
    },
    detailBack:function (id,type,contractType,pageNo,contractTitle) {//返回
      var vm = this;
      this.$router.push({
        name: "contract",
        query: {
          id: id,
          type:type,
          contractType:vm.postData.contractType,
          contractTitle:vm.postData.contractTitle,
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
        vm.submitData.changeReason = '不是变更记录'
    }
    uploadPic("uploadPic", function(ret) {
      if (ret.code == 200) {
        vm.submitData.attachmentFile=ret.data.fileName;
        vm.submitData.attachmentUrl=ret.data.fileUrl;
      } else {
        layer.alert("上传文件出错", { closeBtn: 0 });
      }
    });
  }
};
</script>
