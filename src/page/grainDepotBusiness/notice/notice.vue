<template>
  <div class="content">
    <div class="menuManage operationLog ">
      <div class="lookup">
         开单人名称：
        <input type="text" class="input-text excision" v-model="postData.billMan">
        单位名称：
        <input type="text" class="input-text excision" v-model="postData.deliveryCustomer">

        <div class="btn btn-add" @click="getList(1);">
          <img src="../../../../static/images/search.png" alt="">
          <label>查找</label>
        </div>
        <div class="userManage-detail">
            <div>
                <span>
                    合同标题：
                    <label v-text="requestData.contractTitle"></label>
                </span>
                <span>
                    合同编号：
                    <label v-text="requestData.contractId"></label>
                </span>
                <span>
                    申请单编号：
                    <label v-text="requestData.applyId"></label>
                </span>
                <span>
                    申请单名称：
                    <label v-text="requestData.applyName"></label>
                </span>
                <span>
                    客户名称：
                    <label v-text="requestData.customerName"></label>
                </span>
                <span>
                    联系方式：
                    <label v-text="requestData.linkmanTelephone"></label>
                </span>
                <span>
                    粮食数量（千克）：
                    <label v-text="requestData.quantity"></label>
                </span>
                <span>
                    车辆数量：
                    <label v-text="requestData.vehicleNum"></label>
                </span>
            </div>
        </div>
      </div>

      <div>
        <div class="btn btn-add" @click="showPopup('','add');">
          <img src="../../../../static/images/add.png" alt="">
          <label>新增</label>
        </div>
        <div class="btn btn-del" @click="delData();">
            <img src="../../../../static/images/del.png" alt="">
            <label>删除</label>
        </div>
        <div class="btn btn-print" @click="printData();">
            <label>打印</label>
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
            <th style="width:10%;">通知单编号</th>
            <th style="width:10%;">客户名称</th>
            <th style="width:10%;">开单人姓名</th>
            <th style="width:15%;">开单日期</th>
            <th style="width:7%;">数量(千克)</th>
            <th style="width:10%;">已收到总金额</th>
            <th style="width:10%;">申请单号</th>
            <th style="width:18%;">操作</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="(item,i) in listData">
                <td><input type="checkbox" :value="item.billId" v-model="delList.billIdList" @change="clickChange();"></td>
                <td v-if="sortOrder=='0'" v-text="i+1"></td>
                <td v-else v-text="listData.length-i"></td>
            <td v-text="item.billId"></td>
            <td v-text="item.deliveryCustomer"></td>
            <td v-text="item.billMan"></td>
            <td v-text="item.billDate"></td>
            <td v-text="item.shipingCount"></td>
            <td v-text="item.receivedMoney"></td>
            <td v-text="item.applyId"></td>
            <td>
              <div class="table-btn btn-yellow" @click="showPopup(item.billId,'detail');">详情</div>
              <div class="table-btn btn-red" @click="delData(item.billId);">删除</div>
            </td>
          </tr>
          </tr>
        </tbody>
      </table>
      <!-- 分页容器 -->
      <div id="PageBar"></div>
    </div>
    <!-- 详情弹出层 -->
    <div class="popup" id="printContent" :style="editPopup==1?'display:block;':''">
        <div class="popup-main planPopup-edit-main operationLog">
            <div class="popup-title">
                <label>新增通知单</label>
                <em class="popup-close" @click="closePopup('edit');">×</em>
            </div>
            <div class="popup-content" >
                <div class="userManage-detail userManage-edit">
                    <div>
                        <span v-if="showType=='detail'">
                            通知单号：
                            <label v-text="submitData.billId"></label>

                        </span>
                        <span>
                            申请单：
                            <label v-if="showType=='detail'" v-text="submitData.applyId"></label>
                            <input v-else type="text" class="input-text" v-model="submitData.applyId" >
                        </span>
                        <span>
                            本车数量(千克)：
                            <label v-if="showType=='detail'" v-text="submitData.shipingCount"></label>
                            <input v-else type="number" class="input-text" v-model="submitData.shipingCount" >
                        </span>
                        <span  v-if="showType!='detail'">
                            企业编码：
                            <select class="select-style" v-model="submitData.enterpriseCode" @change="getGraindepotGb(submitData.enterpriseCode);">
                                <option>请选择企业</option>
                                <option v-for="item in companyDataList" :value="item.enterpriseCode" v-text="item.enterpriseName"></option>
                            </select>
                        </span>
                        <span>
                            库点信息：
                            <label v-if="showType=='detail'" v-text="submitData.graindepot"></label>
                            <select v-else  class="select-style" v-model="submitData.graindepot"  @change="getStorehouse(submitData.graindepot);">
                                <option :value="item.graindepotGbCode" v-for="item in graindepotList" v-text="item.graindepotName"></option>
                            </select>
                        </span>
                        <span>
                            仓房信息：
                            <label v-if="showType=='detail'" v-text="submitData.warehouse"></label>
                            <select v-else  class="select-style" v-model="submitData.warehouse"  @change="getGranary(submitData.warehouse);">
                                <option :value="item.storehouseGbCode" v-for="item in storehouseList" v-text="item.storehouseName"></option>
                            </select>
                        </span>
                        <span>
                            廒间信息：
                            <label v-if="showType=='detail'" v-text="submitData.granary"></label>
                            <select v-else  class="select-style" v-model="submitData.granary" @change="getDropDown(3,submitData.granary);">
                                <option :value="item.warehouseGbCode" v-for="item in granaryList" v-text="item.warehouseName"></option>
                            </select>
                        </span>
                        <span>
                            货位信息：
                            <label v-if="showType=='detail'" v-text="submitData.goodsLocation"></label>
                            <select v-else  class="select-style" v-model="submitData.goodsLocation" >
                                <option :value="item.cargoPosition" v-for="item in cargoList" v-text="item.cargoName"></option>
                            </select>
                        </span>
                        <span style="width: 100%;">
                            备注：                            
                            <label v-if="showType=='detail'" v-text="submitData.memo"></label>
                            <textarea v-else class="input-text" style="width: 95%;height:90px;" v-model="submitData.memo"></textarea>
                        </span>
                    </div>
                </div>
                <div class="edit-btn" v-if="showType=='add'">
                    <button class="edit-submit" @click="submitEvent();">提交</button>
                </div>

            </div>
        </div>
    </div>

    <div class="detail-back">
        <button @click="detailBack();">返回</button>
    </div>
  </div>
</template>
<style type="text/css" scoped>
  .userManage-detail div{
    line-height: 20px;
  }
  .planPopup-edit-main{
    height:400px;
  }
  .popup .popup-content{
    border-bottom: 0;
  }
  .edit-btn button{
    margin-right: 60px;
  }
</style>
<script>
import { getNoticeList, deleNotice ,addNotice,getNotice} from "@/api/business/notice";
import {companyList,graindepot, storehouse,granary,cargo } from "@/api/systemManage/dropDown";  
import { myPrint} from "@/utils/public"; 


export default {
  name: "document",
  data() {
    return {
      sortOrder: "0", //0 顺序，1 倒序
      requestData:this.$route.query.data,
      postData: {
        applyId:this.$route.query.data.applyId,
        billMan: "",
        deliveryCustomer:'',
        pageSize: 10,
        pageNo: 0
      },
      showType:'',
      submitData:{
        billId:'',
        applyId:this.$route.query.data.applyId,
        graindepot:'',
        warehouse:'',
        granary:'',
        goodsLocation:'',
        shipingCount:'',
        memo:''
      },
      grainVarietyList: "",
      grainOilLevelList: "",
      inventoryPropertyList: "",
      allChecked: false,
      delList: {
        billIdList: []
      },
      // detailData:'',
      listData: [],
      companyDataList:[],//企业
      graindepotList:[],//库点下拉列表
      storehouseList:[],//仓房下拉列表
      granaryList:[],//廒间下拉列表
      cargoList:[],//货位下拉列表
      editPopup: 0, // 控制菜单编辑弹出层的显影，1为显示
    };
  },
  methods: {
    changeSortOrder: function() {//倒序
      var vm = this;
      vm.listData.reverse();
    },
    getList: function(pageNo) {//获取列表
      var vm = this;
      vm.postData.pageNo = pageNo;
      layer.load(2);
      getNoticeList(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.listData = ret.data.dataList;
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
    delData: function(id) {
      //删除
      var vm = this;
      if (id) {
        vm.delList.billIdList = [];
        vm.delList.billIdList.push(id);
      } else {
        if (vm.delList.billIdList.length == 0) {
          layer.msg("请至少选择一条数据！");
          return;
        }
      }
      layer.load(2);
      var delStr = vm.delList.billIdList.join(",");
      deleNotice({ billIdList: delStr })
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            layer.msg("删除成功！");
            vm.getList(1);
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    printData:function () {//打印
      var vm = this;
      if (vm.delList.billIdList.length == 0) {
        layer.msg("请选择一条数据！");
        return;
      }else{
        if (vm.delList.billIdList.length > 1) {
          layer.msg("只能选择一条数据！");
          return;
        }else{
            // vm.showPopup(vm.delList.billIdList[0],'detail');
            // myPrint('printContent');
            vm.showType='detail';
            layer.load(2);

              getNotice({billId:vm.delList.billIdList[0]})
                .then(ret => {
                  layer.closeAll("loading");
                  if (ret.code == 200) {
                    vm.detailData = ret.data.dataMap;
                    vm.editPopup = 1;
                    vm.$nextTick(function () {
                        myPrint('printContent');
                    });
                  } else {
                    layer.alert(ret.data, { closeBtn: 0 });
                  }
                })
                .catch(err => {
                  layer.alert(err.message, { closeBtn: 0 });
                });
        }
      }
    },
    checkAll: function() {
      //全选
      var vm = this;
      if (vm.allChecked) {
        for (var i = 0; i < vm.listData.length; i++) {
          vm.delList.billIdList.push(vm.listData[i].billId);
        }
      } else {
        vm.delList.billIdList = [];
      }
    },
    clickChange: function() {
      //监听input选中状态，控制全选input的选中
      var vm = this;
      if (vm.delList.billIdList.length == vm.listData.length) {
        vm.allChecked = true;
      } else {
        vm.allChecked = false;
      }
    },
    detailBack:function () {
        this.$router.back(-1);
    },
    submitEvent: function() {
      var vm = this;

      if (vm.submitData.applyId == "") {
        layer.msg("请填写申请单编号");
        return;
      }
      if (vm.submitData.shipingCount == "") {
        layer.msg("请填写本车数量");
        return;
      }
      if (vm.submitData.graindepot == "") {
        layer.msg("请选择库点");
        return;
      }
      if (vm.submitData.warehouse == "") {
        layer.msg("请选择仓房");
        return;
      }
      if (vm.submitData.granary == "") {
        layer.msg("请选择廒间");
        return;
      }
      if (vm.submitData.goodsLocation == "") {
        layer.msg("请选择货位");
        return;
      }

      layer.load(2);
      addNotice(vm.submitData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            layer.msg("新增通知单成功！");
            vm.getList(1);
            vm.closePopup();
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    showPopup: function(id,type) {// 展示弹出层
        var vm = this;
        vm.showType=type;
        if (type=='detail') {
          vm.getDetail(id);
        }else{
          vm.getDropDown(0);
        }
        vm.editPopup = 1;
    },
    closePopup: function() {// 隐藏弹出层
        var vm = this;
        vm.editPopup = 0;
    },
    getDetail: function(id) {
      var vm = this;
      layer.load(2);
      getNotice({billId:id})
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.submitData.billId=ret.data.dataMap.billId;
            // vm.getGraindepotGb(ret.data.dataMap.enterpriseCode);
            vm.submitData.graindepot=ret.data.dataMap.graindepot;
            // vm.getStorehouse(ret.data.dataMap.graindepot);
            vm.submitData.applyId=ret.data.dataMap.applyId;
            vm.submitData.warehouse=ret.data.dataMap.warehouse;
            // vm.getGranary(ret.data.dataMap.warehouse);
            vm.submitData.granary=ret.data.dataMap.granary;
            // vm.getDropDown(3,ret.data.dataMap.granary);
            vm.submitData.goodsLocation=ret.data.dataMap.goodsLocation;
            vm.submitData.shipingCount=ret.data.dataMap.shipingCount;
            vm.submitData.memo=ret.data.dataMap.memo;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },

    getGraindepotGb:function (id) {//获取库点
      var vm = this;
      layer.load(2);
        graindepot(id)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            console.log(JSON.stringify(ret))
            vm.graindepotList = ret.data.dataList;
          } else {
            if (ret.code == 500&&ret.data=='查询错误，没有数据') {
                vm.graindepotList=[];
            }else{
                layer.alert(ret.data, { closeBtn: 0 });
            }
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getStorehouse:function (id) {//仓房
      var vm = this;
      layer.load(2);
      storehouse(id)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.storehouseList = ret.data.dataList;
          } else {
            if (ret.code == 500&&ret.data=='查询错误，没有数据') {
                vm.storehouseList=[];
            }else{
                layer.alert(ret.data, { closeBtn: 0 });
            }
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
        
    },
    getGranary:function (id) {//廒间下拉列表
      var vm = this;
      layer.load(2);
      granary(id).then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.granaryList = ret.data.dataList;
          } else {
            if (ret.code == 500&&ret.data=='查询错误，没有数据') {
                vm.granaryList=[];
            }else{
                layer.alert(ret.data, { closeBtn: 0 });
            }
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
        
    },
    getDropDown: function(num,id) {//获取下拉项
      var vm = this;
      if (num==0) {
        companyList({})
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.companyDataList = ret.data.dataList;
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          })
          .catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
          });
      }
      if (num==3) {
        cargo(id).then(ret => {//货位
            if (ret.code == 200) {
              // console.log(JSON.stringify(ret));
              vm.cargoList = ret.data.cargoList;
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
        }).catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
        });
      }
    }
  },
  mounted() {
    this.getList(1);
  }
};

</script>
