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
                                合同编号：
                                <input type="text" class="input-text" readonly="readonly"  v-model="submitData.contractId" placeholder="选择来合同" @click="showPopup();">
                            </span>
                            <span>
                                合同标题：
                                <input type="text" class="input-text" v-model="submitData.contractTitle" >
                            </span>
                            <!-- <span v-if="postData.applyId">
                                申请单编号：
                                <input type="text" class="input-text" v-model="submitData.applyId" >
                            </span> -->
                            <span>
                                申请单名称：
                                <input type="text" class="input-text" v-model="submitData.applyName" >
                            </span>
                            <span>
                                客户名称：
                                <input type="text" class="input-text" v-model="submitData.customerName" >
                            </span>
                            <span>
                                联系人：
                                <input type="text" class="input-text" v-model="submitData.linkman" >
                            </span>
                            <span>
                                联系方式：
                                <input type="text" class="input-text" v-model="submitData.linkmanTelephone" >
                            </span>
                            <span>
                                身份证号码：
                                <input type="text" class="input-text" v-model="submitData.customerIdentity" >
                            </span>
                            <span>
                                出入库申请单类型:
                                <select name="" class="select-style" v-model="submitData.formType">
                                    <option value="1" >入库</option>
                                    <option value="2" >出库</option>
                                </select>
                            </span>
                            <span>
                                粮食品种：
                                <div class="edit-grainVariety">
                                  <treeselect v-model="submitData.goodsKind" :multiple="false" :options="grainVarietyList" />
                                </div>
                            </span>
                            <span>
                                收获年度：
                                <input type="text" class="input-text" v-model="submitData.harvestYear">
                            </span>
                            <span>
                                粮食数量（千克）：
                                <input type="number" class="input-text" v-model="submitData.quantity">
                            </span>
                            <span>
                                粮食产地：
                                <input type="text" class="input-text" v-model="submitData.productArea">
                            </span>
                            <span>
                                粮食性质：
                                <select name="" class="select-style" v-model="submitData.grainAttribute">
                                    <option :value="item.dicInfoCode" v-for="item in grainNaturelList" v-text="item.dicInfoValue"></option>
                                </select>
                            </span>
                            <span>
                                出入库类型：
                                <select name="" class="select-style" v-model="submitData.outInType">
                                    <option :value="item.dicInfoValue" v-for="item in outStorageList" v-text="item.dicInfoValue"></option>
                                </select>
                            </span>
                            <span>
                                运输方式：
                                <select name="" class="select-style" v-model="submitData.shippingType">
                                    <option value="1" >货车</option>
                                    <option value="2" >火车</option>
                                    <option value="3" >船</option>
                                </select>
                            </span>
                            <span>
                                粮权所属：
                                <input type="text" class="input-text" v-model="submitData.grainRightsBelongto">
                            </span>
                            <span>
                                车辆：
                                <input type="number" class="input-text" v-model="submitData.vehicleNum">
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

        <!-- 选择来文弹出层 -->
        <div class="popup" :style="editPopup==1?'display:block;':''">
            <div class="popup-main planPopup-edit-main operationLog">
                <div class="popup-title">
                    <label>选择合同</label>
                    <em class="popup-close" @click="closePopup('edit');">×</em>
                </div>
                <div class="popup-content" >
                    <div class="lookup">
                      合同标题：
                      <input type="text" class="input-text excision" v-model="postListData.contractTitle">
                      合同类型：
                      <select name="" class="select-style  excision" v-model="postListData.contractType">
                        <option value="">合同类型</option>
                        <option value="1">收购合同</option>
                        <option value="2">销售合同</option>
                        <option value="3">代储合同</option>
                      </select>

                      <div class="btn btn-add" @click="getList(1);">
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
    </div>
</template>
<script>
 // import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { getRequestNote, addRequestNote, editRequestNote } from "@/api/business/requestNote";
import {
  grainVariety,grainNature,outStorageType
} from "@/api/systemManage/dropDown";
import { getConstractListBySelect } from "@/api/business/contract";
export default {
  name: "planManageEdit",
  components: { Treeselect },
  data() {
    return {
      sortOrder: "0", //0 顺序，1 倒序
      postData: {
        applyId: this.$route.query.id
      },
      grainVarietyList:[],
      grainNaturelList:[],
      outStorageList:[],
      postListData:{
        contractTitle: "",
        contractType: "",
        pageSize: 6,
        pageNo:1
      },
      submitData: {
        applyName: "",
        applyId: "",
        vehicleNum: "",
        quantity: "",
        formType: "",
        customerIdentity:'',
        customerName:'',
        shippingType:'',
        productArea:'',
        harvestYear:'',
        goodsKind:null,
        linkman:'',
        linkmanTelephone:'',
        outInType:'',
        grainRightsBelongto:'',
        contractId:''
      },
      listData:[],
      editPopup: 0, // 控制菜单编辑弹出层的显影，1为显示
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      getRequestNote(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            console.log(JSON.stringify(ret))
            vm.submitData.applyName = ret.data.dataMap.applyName;
            vm.submitData.contractTitle = ret.data.dataMap.contractTitle;
            vm.submitData.applyId = ret.data.dataMap.applyId;
            vm.submitData.vehicleNum = ret.data.dataMap.vehicleNum;
            vm.submitData.applyDate = ret.data.dataMap.applyDate;
            vm.submitData.auditStaff = ret.data.dataMap.auditStaff;
            vm.submitData.status = ret.data.dataMap.status;
            vm.submitData.auditDatetime = ret.data.dataMap.auditDatetime;
            vm.submitData.quantity = ret.data.dataMap.quantity;
            vm.submitData.residueCount = ret.data.dataMap.residueCount;
            vm.submitData.shippingType = ret.data.dataMap.shippingType;
            vm.submitData.goodsKind = ret.data.dataMap.goodsKind;
            vm.submitData.productArea = ret.data.dataMap.productArea;
            vm.submitData.linkmanTelephone = ret.data.dataMap.linkmanTelephone;
            vm.submitData.harvestYear = ret.data.dataMap.harvestYear;
            vm.submitData.outInType = ret.data.dataMap.outInType;
            vm.submitData.customerName = ret.data.dataMap.customerName;
            vm.submitData.linkman = ret.data.dataMap.linkman;
            vm.submitData.customerIdentity = ret.data.dataMap.customerIdentity;
            vm.submitData.contractId = ret.data.dataMap.contractId;
            vm.submitData.grainAttribute = ret.data.dataMap.grainAttribute;
            vm.submitData.grainRightsBelongto = ret.data.dataMap.grainRightsBelongto;
            vm.submitData.formType = ret.data.dataMap.formType;

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
      var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
      var identityReg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      if (vm.postData.applyId) {
        if (vm.submitData.applyId == "") {
          layer.msg("请填写申请单编号");
          return;
        }
      }
      if (vm.submitData.applyName == "") {
        layer.msg("请填写申请单名称");
        return;
      }
      if (vm.submitData.vehicleNum == "") {
        layer.msg("请填写车辆数量");
        return;
      }
      if (vm.submitData.quantity == "") {
        layer.msg("请填写粮食数量");
        return;
      }
      if (vm.submitData.customerIdentity == "") {
        layer.msg("请填写客户身份证号码");
        return;
      }
      if(!identityReg.test(vm.submitData.customerIdentity)) {
        layer.msg("身份证格式错误!");
        return;
      }
      if (vm.submitData.formType == "") {
        layer.msg("请填写出入库申请单类型");
        return;
      }
      if (vm.submitData.customerName == "") {
        layer.msg("请填写客户名称");
        return;
      }
      if (vm.submitData.shippingType == "") {
        layer.msg("请填写运输方式");
        return;
      }
      if (vm.submitData.productArea == "") {
        layer.msg("请填写粮食产地");
        return;
      }
      if (vm.submitData.harvestYear == "") {
        layer.msg("请填写收获年度");
        return;
      }
      if (vm.submitData.goodsKind == "") {
        layer.msg("请填写粮食品种");
        return;
      }
      if (vm.submitData.linkman == "") {
        layer.msg("请填写联系人");
        return;
      }
      if (vm.submitData.linkmanTelephone == "") {
        layer.msg("请填写联系电话");
        return;
      }
      if(!phoneReg.test(vm.submitData.linkmanTelephone)) {
        layer.msg('手机号码格式错误!')
        return;
      }
      if (vm.submitData.outInType == "") {
        layer.msg("请选择出入库类型");
        return;
      }
      console.log(JSON.stringify(vm.submitData))
      if (this.$route.query.id) {
        layer.load(2);
        editRequestNote(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("编辑申请单成功！");
              if (vm.submitData.formType=='1') {
                  this.$router.push({
                    name: "request"
                  });
              }else{
                  this.$router.push({
                    name: "out_request"
                  });                
              }
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          })
          .catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
          });
      }else {
        layer.load(2);
        addRequestNote(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("新增申请单成功！");
              if (vm.submitData.formType=='1') {
                  this.$router.push({
                    name: "request",
                    query: {
                      applyName:this.$route.query.applyName,
                      pageNo:this.$route.query.pageNo
                    }
                  });
              }else{
                  this.$router.push({
                    name: "out_request",
                    query: {
                      applyName:this.$route.query.applyName,
                      pageNo:this.$route.query.pageNo
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
      }
      // this.$router.push({//提交后筛选条件带回
      //   name: "request",
      //   query: {
      //     applyName:this.$route.query.applyName,
      //     pageNo:this.$route.query.pageNo

      //   }
      // });
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
    getList: function(pageNo) {//获取合同列表
      var vm = this;
      layer.load(2);
      vm.postListData.pageNo = pageNo;
      getConstractListBySelect(vm.postListData)
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
    changeSortOrder: function() {//倒序
      var vm = this;
      vm.listData.reverse();
    },
    checkDocument:function (data) {//选择来文
      var vm=this;
      vm.submitData.contractId=data.contractId;
      vm.submitData.contractTitle=data.contractTitle;
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
      outStorageType({}).then(ret => {//出入库类型下拉
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret))
            vm.outStorageList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
      }).catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
      });
    },
    detailBack:function () {//返回
        //this.$router.back(-1);
      this.$router.push({
        name: "request",
        query: {
          applyName:this.$route.query.applyName,
          pageNo:this.$route.query.pageNo

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
  }
};
</script>
