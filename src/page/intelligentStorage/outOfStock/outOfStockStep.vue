<template>
  <div class="content">
    <div class="guide-top">
      <p class="guide-title">流程</p>
      <div class="guide-main step">
        <div :class="guideStep==1?'guide-item guide-item-on':'guide-item'" @click="checkStep(1);">登记</div>
        <div :class="guideStep==4?'guide-item guide-item-on':'guide-item'" @click="checkStep(4);">计量</div>
        <div :class="guideStep==5?'guide-item guide-item-on':'guide-item'" @click="checkStep(5);">值仓</div>
        <div :class="guideStep==6?'guide-item guide-item-on':'guide-item'" @click="checkStep(6);">结算</div>
        <div :class="guideStep==7?'guide-item guide-item-on':'guide-item'" @click="checkStep(7);">销卡</div>
      </div>
    </div>
    <div v-if="guideStep==1" class="menuManage operationLog ">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">登记数据</div>
        </div>
        <div class="tag-box-content">
          <div class="lookup">
            车牌：
            <input type="text" class="input-text excision" v-model="registerPostData.plateNumber">
            客户姓名：
            <input type="text" class="input-text excision" v-model="registerPostData.customerName">

            <div class="btn btn-add" @click="getList(0);">
              <img src="../../../../static/images/search.png" alt="">
              <label>查找</label>
            </div>
          </div>
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
          <th style="width:10%;"><input type="checkbox" ></th>
          <th style="width:10%;">序号</th>
          <th style="width:10%;">客户名称</th>
          <th style="width:10%;">承运人</th>
          <th style="width:10%;">车牌号</th>
          <th style="width:10%;">仓房</th>
          <th style="width:15%;">日期</th>
          <th style="width:20%;">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,i) in listData">
          <td><input type="checkbox"></td>
          <td v-if="sortOrder=='0'" v-text="i+1"></td>
          <td v-else v-text="listData.length-i"></td>
          <td v-text="item.customerName"></td>
          <td v-text="item.carrier"></td>
          <td v-text="item.plateNumber"></td>
          <td v-text="item.storehouseName"></td>
          <td v-text="item.registorDate"></td>
          <td>
            <div class="table-btn btn-yellow" @click="jumpDetail(item.registorNo);">详情</div>
            <!-- <div class="table-btn btn-green" @click="jumpEdit(item.registorNo);">编辑</div> -->
          </td>
        </tr>
        </tbody>
      </table>
      <!-- 分页容器 -->
      <div id="PageBar1"  class="PageBar"></div>
    </div>
    <div v-if="guideStep==4" class="menuManage operationLog ">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">计量数据</div>
        </div>
        <div class="tag-box-content">
          <div class="lookup">
            车牌号：
            <input type="text" class="input-text excision" v-model="meteringPostData.plateNumber">

            <div class="btn btn-add" @click="getList(0);">
              <img src="../../../../static/images/search.png" alt="">
              <label>查找</label>
            </div>
          </div>
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
          <th style="width:5%;"><input type="checkbox" ></th>
          <th style="width:5%;">序号</th>
          <th style="width:8%;">粮食品种</th>
          <th style="width:10%;">毛重(千克)</th>
          <th style="width:10%;">皮重(千克)</th>
          <th style="width:10%;">净重(千克)</th>
          <th style="width:8%;">扣量总计(千克)</th>
          <th style="width:10%;">车牌号</th>
          <th style="width:9%">仓房</th>
          <th style="width:15%;">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,i) in listData">
          <td><input type="checkbox" ></td>
          <td v-if="sortOrder=='0'" v-text="i+1"></td>
          <td v-else v-text="listData.length-i"></td>
          <td v-text="item.grainVarietyValue"></td>
          <td v-text="item.grossWeight"></td>
          <td v-text="item.tareWeight"></td>
          <td v-text="item.netWeight"></td>
          <td v-text="item.incrementDecrementTotal"></td>
          <td v-text="item.plateNumber"></td>
          <td v-text="item.storehouseName"></td>
          <td>
            <div class="table-btn btn-yellow" @click="jumpDetail(item.registorNo);">详情</div>
             <div class="table-btn btn-green" @click="jumpWeigh(item.registorNo);">过磅单</div>
          </td>
        </tr>
        </tbody>
      </table>
      <!-- 分页容器 -->
      <div id="PageBar4"  class="PageBar"></div>
    </div>
    <div v-if="guideStep==5" class="menuManage operationLog ">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">值仓数值</div>
        </div>
        <div class="tag-box-content">
          <div class="lookup">
            粮食品种：
            <div class="grainVariety excision">
              <treeselect v-model="valueBinPostData.grainVariety" :multiple="false" :options="grainVarietyList" />
            </div>
            <div class="btn btn-add" @click="getList(0);">
              <img src="../../../../static/images/search.png" alt="">
              <label>查找</label>
            </div>
          </div>
        </div>
      </div>

      <div>
        <select name="" class="select-style" v-model="sortOrder" @change="changeSortOrder();">
          <option value="">排序方式</option>
          <option value="0">顺序</option>
          <option value="1">倒序</option>
        </select>
      </div>
      <p class="table-name">未值仓出入库单</p>
      <table class="customTable">
        <thead>
        <tr>
          <th style="width:5%;"><input type="checkbox" ></th>
          <th style="width:5%;">序号</th>
          <th style="width:7.5%;">出库单号</th>
          <th style="width:7.5%;">出库类型</th>
          <th style="width:7.5%;">粮食性质</th>
          <th style="width:7.5%;">粮食品种</th>
          <th style="width:7.5%;">粮食等级</th>
          <th style="width:7.5%;">仓房</th>
          <th style="width:7.5%;">廒间</th>
          <th style="width:7.5%;">货位</th>
          <th style="width:10%;">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,i) in noListData">
          <td><input type="checkbox"></td>
          <td v-if="sortOrder=='0'" v-text="i+1"></td>
          <td v-else v-text="listData.length-i"></td>
          <td v-text="item.registorNo"></td>
          <td v-text="item.registorType"></td>
          <td v-text="item.grainAttributeValue"></td>
          <td v-text="item.grainVarietyValue"></td>
          <td v-text="item.totalLevel"></td>
          <td v-text="item.storehouseName  "></td>
          <td v-text="item.warehouseName"></td>
          <td v-text="item.cargoName"></td>
          <td>
            <div class="table-btn btn-green" @click="jumpEdit(item.registorNo);">值仓</div>
          </td>
        </tr>

        </tbody>
      </table>
      <!-- 分页容器 -->
      <div id="PageBar5_a" class="PageBar"></div>
      <div>
        <select name="" class="select-style" v-model="sortOrder" @change="changeSortOrder();">
          <option value="">排序方式</option>
          <option value="0">顺序</option>
          <option value="1">倒序</option>
        </select>
      </div>
      <p  class="table-name">已值仓出入库单</p>
      <table class="customTable">
        <thead>
        <tr>
          <th style="width:5%;"><input type="checkbox" ></th>
          <th style="width:5%;">序号</th>
          <th style="width:7.5%;">出库单号</th>
          <th style="width:7.5%;">出库类型</th>
          <th style="width:7.5%;">粮食性质</th>
          <th style="width:7.5%;">粮食品种</th>
          <th style="width:7.5%;">粮食等级</th>
          <th style="width:7.5%;">仓房</th>
          <th style="width:7.5%;">廒间</th>
          <th style="width:7.5%;">货位</th>
          <th style="width:10%;">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,i) in alreadyListData">
          <td><input type="checkbox"></td>
          <td v-if="sortOrder=='0'" v-text="i+1"></td>
          <td v-else v-text="listData.length-i"></td>
          <td v-text="item.registorNo"></td>
          <td v-text="item.registorType"></td>
          <td v-text="item.grainAttributeValue"></td>
          <td v-text="item.grainVarietyValue"></td>
          <td v-text="item.totalLevel"></td>
          <td v-text="item.storehouseName  "></td>
          <td v-text="item.warehouseName"></td>
          <td v-text="item.cargoName"></td>
          <td>
            <div class="table-btn btn-yellow" @click="jumpDetail(item.registorNo);">详情</div>
            <!-- <div class="table-btn btn-green" @click="jumpEdit(item.registorNo);">编辑</div> -->
          </td>
        </tr>
        </tbody>
      </table>
      <!-- 分页容器 -->
      <div id="PageBar5_b"  class="PageBar"></div>
    </div>
    <div v-if="guideStep==6" class="menuManage operationLog ">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">结算数据</div>
        </div>
        <div class="tag-box-content">
          <div class="lookup">
            客户名称：
            <input type="text" class="input-text excision" v-model="settlementPostData.customerName">
            车牌号：
            <input type="text" class="input-text excision" v-model="settlementPostData.plateNumber">
            <div class="btn btn-add" @click="getList(0);">
              <img src="../../../../static/images/search.png" alt="">
              <label>查找</label>
            </div>
          </div>
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
          <th style="width:5%;"><input type="checkbox" ></th>
          <th style="width:5%;">序号</th>
          <th style="width:10%;">结算单号</th>
          <th style="width:10%;">出库类型</th>
          <th style="width:10%;">粮食品种</th>
          <th style="width:10%;">结算重量(千克)</th>
          <th style="width:10%;">仓房</th>
          <th style="width:20%;">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,i) in listData">
          <td><input type="checkbox"></td>
          <td v-if="sortOrder=='0'" v-text="i+1"></td>
          <td v-else v-text="listData.length-i"></td>
          <td v-text="item.billId"></td>
          <td v-text="item.registerType"></td>
          <td v-text="item.grainKind"></td>
          <td v-text="item.totalWeight"></td>
          <td v-text="item.storehouseName"></td>
          <td>
            <div class="table-btn btn-yellow" v-if="item.settlementId" @click="jumpDetail(item.settlementId);">详情</div>
            <div class="table-btn btn-green" v-else @click="jumpEdit();">结算</div>
            <div class="table-btn btn-blue" v-if="item.settlementId" @click="jumpData(item.settlementId);">出库单</div>
          </td>
        </tr>

        </tbody>
      </table>
      <!-- 分页容器 -->
      <div id="PageBar6"  class="PageBar"></div>
    </div>
    <div v-if="guideStep==7" class="menuManage operationLog ">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">销卡管理</div>
        </div>
        <div class="tag-box-content">
          <div class="lookup">
            卡号：
            <input type="text" class="input-text excision" v-model="unsoldCardPostData.cardNo">
            <div class="btn btn-add" @click="getList(0);">
              <img src="../../../../static/images/search.png" alt="">
              <label>查找</label>
            </div>
          </div>
        </div>
      </div>

      <div>
        <!-- <div class="btn btn-add" @click="jumpEdit();">
            <img src="../../../../static/images/add.png" alt="">
            <label>新增</label>
        </div> -->
        <select name="" class="select-style" v-model="sortOrder" @change="changeSortOrder();">
          <option value="">排序方式</option>
          <option value="0">顺序</option>
          <option value="1">倒序</option>
        </select>
      </div>
      <table class="customTable">
        <thead>
        <tr>
          <th style="width:5%;"><input type="checkbox" ></th>
          <th style="width:5%;">序号</th>
          <th style="width:20%;">卡号</th>
          <th style="width:20%;">出库单号</th>
          <th style="width:10%;">仓房</th>
          <th style="width:10%;">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,i) in listData">
          <td><input type="checkbox" ></td>
          <td v-if="sortOrder=='0'" v-text="i+1"></td>
          <td v-else v-text="listData.length-i"></td>
          <td v-text="item.cardNo"></td>
          <td v-text="item.billId"></td>
          <td v-text="item.storehouseName"></td>
          <td>
            <div class="table-btn btn-yellow" @click="jumpDetail('',item);">详情</div>
            <div class="table-btn btn-green"  v-if="item.currentBusinessStep!='出门销卡'" @click="showPopup(item);">销卡</div>
          </td>
        </tr>
        </tbody>
      </table>
      <!-- 分页容器 -->
      <div id="PageBar7" class="PageBar"></div>
    </div>

    <!-- 弹出层 -->
    <div class="popup" :style="editPopup==1?'display:block;':''">
      <div class="popup-main planPopup-edit-main operationLog">
        <div class="popup-title">
          <label>销卡</label>
          <em class="popup-close" @click="closePopup('edit');">×</em>
        </div>
        <div class="popup-content">

          <p class="text-justify">
            <label>是否复查:</label>
            <select name="" class="select-style" v-model="pinCardSubmitData.checkFlag" >
              <option value="1" >是</option>
              <option value="2" >否</option>
            </select>
          </p>
          <p class="text-justify">
            <label>卡号:</label>
            <input type="text" v-model="pinCardSubmitData.cardNo" readonly="readonly" >
          </p>
        </div>
        <div>
          <button class="query" @click="pinCard();">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style type="text/css" scoped >
  .table-name{
    line-height: 35px;
    font-size: 16px;
  }
  .planPopup-edit-main{
    width: 320px;
    height: 260px;
  }
  .step{
    width: 70%;
    margin: 0 auto;
  }
  .step .guide-item{
    width: 20%;
  }
</style>
<script>
  // import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import { registerFlowList, meteringOutFlowList, noValueBinOutList, alreadyValueBinOutList, settlementList, processPinCardFlowList,unsoldCardList ,pinCard} from "@/api/intelligentStorage/public";
  import { grainVariety, } from "@/api/systemManage/dropDown";


  export default {
    name: "document",
    components: { Treeselect },
    data() {
      return {
        sortOrder: "0", //0 顺序，1 倒序
        guideStep:this.$route.query.step?this.$route.query.step:1,
        editPopup: 0, // 控制菜单编辑弹出层的显影，1为显示
        requestData:'',
        grainVarietyList:[],//粮食品种
        registerPostData: {
          customerName: "",
          plateNumber:'',
          noticeType:2,//1为入库，2为出库
          pageSize: 10,
          pageNo: 0
        },
        meteringPostData:{
          plateNumber:'',
          pageSize: 10,
          pageNo: 0
        },
        valueBinPostData:{
          grainVariety:null,
          pageSize: 10,
          pageNo: 0
        },
        settlementPostData:{
          plateNumber:'',
          customerName:'',
          noticeType:2,//1为入库，2为出库
          pageSize: 10,
          pageNo: 0
        },
        unsoldCardPostData:{
          cardNo:'',
          noticeType:2,//1为入库，2为出库
          pageSize: 10,
          pageNo: 0
        },
        pinCardSubmitData:{
          registerNo:'',
          cardNo: '',
          checkFlag: 1
        },
        showType:'',
        allChecked: false,
        delList: {
          billIdList: []
        },
        listData: [],
        alreadyListData: [],//已值仓列表
        noListData: [],//未值仓列表
        startNum:0,
        number:0
      };
    },
    methods: {
      changeSortOrder: function() {//倒序
        var vm = this;
        vm.listData.reverse();
      },
      reckonByTime:function () {
        setTimeout(() => {
          this.number++;
          this.reckonByTime();
        }, 1000);
      },
      checkStep:function (num) {
        var vm=this;
        if (vm.number-vm.startNum<0) {
          vm.startNum = vm.number;
          layer.alert('点太快了，请稍后再试！', {closeBtn: 0});
        }else{
          vm.startNum=vm.number;
          vm.registerPostData.customerName='';
          vm.registerPostData.plateNumber='';
          vm.meteringPostData.plateNumber='';
          vm.valueBinPostData.grainVariety=null;
          vm.settlementPostData.customerName='';
          vm.settlementPostData.plateNumber='';
          vm.unsoldCardPostData.cardNo='';
          vm.guideStep=num;
          vm.getList(0);
        }
      },
      getList: function(pageNo,type) {//获取列表
        var vm = this;
        layer.load(2);
        switch(vm.guideStep)
        {
          case 1:
            // alert(111);
            vm.registerPostData.pageNo = pageNo;
            registerFlowList(vm.registerPostData)
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  vm.listData = ret.data.dataList;
                  for(var i in vm.listData) {
                    const time = vm.listData[i].registorDate.slice(0,10)
                    vm.listData[i].registorDate = time
                  }
                  laypage({
                    //分页
                    cont: "PageBar1", //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
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
            break;
          case 4:
            vm.meteringPostData.pageNo = pageNo;
            meteringOutFlowList(vm.meteringPostData)
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  vm.listData = ret.data.outWeighingList;
                  laypage({
                    //分页
                    cont: "PageBar4", //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
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
            break;
          case 5:
            var ISnoValueBin,ISalreadyValueBin;
            vm.valueBinPostData.pageNo = pageNo;
          function noValueBin() {
            noValueBinOutList(vm.valueBinPostData)
              .then(ret => {
                if (type) {
                  layer.closeAll("loading");
                }else{
                  ISnoValueBin=1;
                  isOnload();
                }
                if (ret.code == 200) {
                  vm.noListData = ret.data.outOndutyNList;
                  vm.noListData.forEach(item => {
                    if(item.totalLevel == '01') {
                      item.totalLevel = '一等'
                    }
                    if(item.totalLevel == '02') {
                      item.totalLevel = '二等'
                    }
                    if(item.totalLevel == '03') {
                      item.totalLevel = '三等'
                    }
                    if(item.totalLevel == '04') {
                      item.totalLevel = '四等'
                    }
                    if(item.totalLevel == '05') {
                      item.totalLevel = '五等'
                    }
                    if(item.totalLevel == '06') {
                      item.totalLevel = '等外'
                    }
                  })
                  laypage({
                    //分页
                    cont: "PageBar5_a", //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                    pages: ret.page.totalPages, //通过后台拿到的总页数
                    curr: pageNo,
                    skin: "#95C93E", //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                    jump: function(obj, first) {
                      //触发分页后的回调
                      if (!first) {
                        //一定要加此判断，否则初始时会无限刷新
                        vm.getList(obj.curr,'no');
                      }
                    }
                  });
                } else {
                  if (ret.code == "500" && ret.data == "查询错误，没有数据") {
                    layer.msg("暂无数据");
                    vm.noListData = [];
                  } else {
                    layer.alert(ret.data, { closeBtn: 0 });
                  }
                }
              })
              .catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
              });
          }
          function alreadyValueBin() {
            alreadyValueBinOutList(vm.valueBinPostData)
              .then(ret => {
                if (type) {
                  layer.closeAll("loading");
                }else{
                  ISalreadyValueBin=1;
                  isOnload();
                }
                if (ret.code == 200) {
                  vm.alreadyListData = ret.data.outOndutyYList;
                  vm.alreadyListData.forEach(item => {
                    if(item.totalLevel == '01') {
                      item.totalLevel = '一等'
                    }
                    if(item.totalLevel == '02') {
                      item.totalLevel = '二等'
                    }
                    if(item.totalLevel == '03') {
                      item.totalLevel = '三等'
                    }
                    if(item.totalLevel == '04') {
                      item.totalLevel = '四等'
                    }
                    if(item.totalLevel == '05') {
                      item.totalLevel = '五等'
                    }
                    if(item.totalLevel == '06') {
                      item.totalLevel = '等外'
                    }
                  })
                  laypage({
                    //分页
                    cont: "PageBar5_b", //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                    pages: ret.page.totalPages, //通过后台拿到的总页数
                    curr: pageNo,
                    skin: "#95C93E", //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                    jump: function(obj, first) {
                      //触发分页后的回调
                      if (!first) {
                        //一定要加此判断，否则初始时会无限刷新
                        vm.getList(obj.curr,'already');
                      }
                    }
                  });
                } else {
                  if (ret.code == "500" && ret.data == "查询错误，没有数据") {
                    layer.msg("暂无数据");
                    vm.alreadyListData = [];
                  } else {
                    layer.alert(ret.data, { closeBtn: 0 });
                  }
                }
              })
              .catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
              });
          }

          function isOnload() {
            if(ISalreadyValueBin==1&&ISnoValueBin==1){
              layer.closeAll("loading");
            }
          }
            if (type=='no') {
              noValueBin();
            }else{
              if (type=='already') {
                alreadyValueBin();
              }else{
                noValueBin();
                alreadyValueBin();
              }
            }

            break;
          case 6:
            vm.settlementPostData.pageNo = pageNo;
            settlementList(vm.settlementPostData)
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  vm.listData = ret.data.dataList;
                  laypage({
                    //分页
                    cont: "PageBar6", //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                    pages: ret.page.totalPages, //通过后台拿到的总页数
                    curr: pageNo,
                    skin: "#95C93E", //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                    jump: function(obj, first) {
                      //触发分页后的回调
                      if (!first) {
                        //一定要加此判断，否则初始时会无限刷新
                        vm.getList(obj.curr,'already');
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
            break;
          case 7:
            vm.unsoldCardPostData.pageNo = pageNo;
            unsoldCardList(vm.unsoldCardPostData)
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  vm.listData = ret.data.dataList;
                  laypage({
                    //分页
                    cont: "PageBar7", //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                    pages: ret.page.totalPages, //通过后台拿到的总页数
                    curr: pageNo,
                    skin: "#95C93E", //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                    jump: function(obj, first) {
                      //触发分页后的回调
                      if (!first) {
                        //一定要加此判断，否则初始时会无限刷新
                        vm.getList(obj.curr,'already');
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
            break;
        }
      },
      jumpDetail: function(id,data) {//跳转到详情
        var vm = this;
        var url;
        var condition={};
        switch(vm.guideStep){
          case 1:
            condition=vm.registerPostData;
            url='registerOutDetail';
            break;
          case 4:
            condition=vm.meteringPostData;
            url='meteringOutDetail';
            break;
          case 5:
            condition=vm.valueBinPostData;
            url='valueBinOutDetail';
            break;
          case 6:
            condition=vm.settlementPostData;
            url='settleOutDetail';
            break;
          case 7:
            condition=vm.unsoldCardPostData;
            url='pinCardOutDetail';
            break;
        }
        this.$router.push({
          name: url,
          query: {
            id: id,
            data:data,
            condition:condition
          }
        });
      },
      jumpEdit: function(id) {//跳转到编辑或新增页面
        var vm = this
        var url;
        var condition={};
        switch(vm.guideStep){
          case 1:
            condition=vm.registerPostData;
            url='registerOutEdit';
            break;
          case 4:
            condition=vm.meteringPostData;
            url='meteringOutEdit';
            break;
          case 5:
            condition=vm.valueBinPostData;
            url='valueBinOutEdit';
            break;
          case 6:
            condition=vm.settlementPostData;
            url='settleOutEdit';
            break;
          case 7:
            condition=vm.unsoldCardPostData;
            url='pinCard';
            break;
        }

        this.$router.push({
          name: url,
          query: {
            id: id,
            condition:condition
          }
        });
      },
      showPopup: function(data) {
        // 展示弹出层
        var vm = this;
        vm.pinCardSubmitData.registerNo=data.registerNo;
        vm.pinCardSubmitData.cardNo=data.cardNo;
        vm.pinCardSubmitData.checkFlag=data.checkFlag;
        vm.editPopup = 1;

      },
      closePopup: function() {
        // 隐藏弹出层
        var vm = this;
        vm.editPopup = 0;
        vm.pinCardSubmitData.registerNo='';
        vm.pinCardSubmitData.cardNo='';
        vm.pinCardSubmitData.checkFlag=1;
      },
      pinCard:function () {
        var vm=this;
        layer.load(2);
        pinCard(vm.pinCardSubmitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("销卡成功！");
              vm.guideStep=7;
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
      getDropDown: function() {
        //获取下拉项
        var vm = this;
        grainVariety({})
          .then(ret => {
            //粮食品种
            if (ret.code == 200) {
              // console.log(JSON.stringify(ret));
              vm.grainVarietyList = ret.data.grainVarietyList;
              if(vm.$route.query.condition){
                vm.valueBinPostData=vm.$route.query.condition;
              }
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          })
          .catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
          });
      },
      jumpData:function (id) {
        this.$router.push({
          name: "outgoingDetail",
          query: {
            id:id
          }
        })
      },
      jumpWeigh:function (id) {
        this.$router.push({
          name: "outWeighDetail",
          query: {
            id:id
          }
        })
      }
    },
    mounted() {
      var vm=this;
      vm.guideStep=this.$route.query.step?this.$route.query.step:1;
      if(this.$route.query.condition){
        switch(vm.guideStep){
          case 1:
            vm.registerPostData=this.$route.query.condition;
            break;
          case 4:
            vm.meteringPostData=this.$route.query.condition;
            break;
          case 5:
            vm.valueBinPostData=this.$route.query.condition;
            break;
          case 6:
            vm.settlementPostData=this.$route.query.condition;
            break;
          case 7:
            vm.unsoldCardPostData=this.$route.query.condition;
            break;
        }
      }
      vm.getDropDown();
      vm.reckonByTime();
      // vm.getList(1);
      switch(vm.guideStep){
        case 1:
          vm.getList(vm.registerPostData.pageNo)
          break;
        case 4:
          vm.getList(vm.meteringPostData.pageNo)
          break;
        case 5:
          vm.getList(vm.valueBinPostData.pageNo)
          break;
        case 6:
          vm.getList(vm.settlementPostData.pageNo)
          break;
        case 7:
          vm.getList(vm.unsoldCardPostData.pageNo)
          break;
      }

    }
  };

</script>
