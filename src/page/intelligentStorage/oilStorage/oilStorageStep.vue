<template>
  <div class="content">
    <div class="guide-top">
      <p class="guide-title">流程</p>
      <div class="guide-main step">
        <div :class="guideStep==1?'guide-item guide-item-on':'guide-item'" @click="checkStep(1);">登记</div>
        <div :class="guideStep==2?'guide-item guide-item-on':'guide-item'" @click="checkStep(2);">扦样</div>
        <div :class="guideStep==3?'guide-item guide-item-on':'guide-item'" @click="checkStep(3);">检验</div>
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
            <th style="width:10%;">油罐</th>
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
                <td v-text="item.oilCanName"></td>
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
    <div v-if="guideStep==2" class="menuManage operationLog ">
      <div class="tag-box">
          <div class="tag-box-top">
              <div class="tag-title">扦样数据</div>
          </div>
          <div class="tag-box-content">
              <div class="lookup">
                粮食品种：
                <div class="grainVariety excision">
                    <treeselect v-model="samplingPostData.grainVariety" :multiple="false" :options="grainVarietyList" />
                </div>
                车牌号：
                <input type="text" class="input-text excision" v-model="samplingPostData.plateNumber">

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
            <th style="width:10%;">扦样编号</th>
            <th style="width:10%;">样品状态</th>
            <th style="width:10%;">粮食品种</th>
            <th style="width:10%;">粮食性质</th>
            <th style="width:10%;">油罐</th>
            <th style="width:30%;">操作</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="(item,i) in listData">
                <td><input type="checkbox" ></td>
                <td v-if="sortOrder=='0'" v-text="i+1"></td>
                <td v-else v-text="listData.length-i"></td>
                <td v-text="item.samplingId"></td>
                <td>有效</td>
                <td v-text="item.grainVariety"></td>
                <td v-text="item.grainAttributeName"></td>
                <td v-text="item.oilCanName"></td>
                <td>
                    <div class="table-btn btn-yellow" @click="jumpDetail(item.registorNo,item.grainVariety);">详情</div>
                    <!-- <div class="table-btn btn-green" @click="jumpEdit(item.samplingId);">编辑</div> -->
                </td>
            </tr>
        </tbody>
      </table>
      <!-- 分页容器 -->
      <div id="PageBar2"  class="PageBar"></div>
    </div>
    <div v-if="guideStep==3" class="menuManage operationLog ">
      <div class="tag-box">
          <div class="tag-box-top">
              <div class="tag-title">检验数据</div>
          </div>
          <div class="tag-box-content">
              <div class="lookup">
                粮食品种：
                <div class="grainVariety excision">
                    <treeselect v-model="checkPostData.grainVariety" :multiple="false" :options="grainVarietyList" />
                </div>
                车牌号：
                <input type="text" class="input-text excision" v-model="checkPostData.plateNumber">
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
            <th style="width:10%;">检验人</th>
            <th style="width:10%;">检验结果</th>
            <th style="width:10%;">车牌号</th>
            <th style="width:20%;">粮食品种</th>
            <th style="width:10%;">油罐</th>
            <th style="width:20%;">操作</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="(item,i) in listData">
                <td><input type="checkbox"></td>
                <td v-if="sortOrder=='0'" v-text="i+1"></td>
                <td v-else v-text="listData.length-i"></td>
                <td v-text="item.testPerson"></td>
                <td v-text="item.totalLevel"></td>
                <td v-text="item.plateNumber"></td>
                <td v-text="item.grainVariety"></td>
                <td v-text="item.oilCanName"></td>
                <td>
                      <div class="table-btn btn-yellow" @click="jumpDetail(item.registorNo);">详情</div>
                      <!-- <div class="table-btn btn-green" @click="jumpEdit(item.testRecordId);">编辑</div> -->
                </td>
            </tr>
        </tbody>
      </table>
      <!-- 分页容器 -->
      <div id="PageBar3"  class="PageBar"></div>
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
            <th style="width:9%;">油罐</th>
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
                <td v-text="item.oilCanName"></td>
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
            <th style="width:10%;">入库单号</th>
            <th style="width:10%;">入库类型</th>
            <th style="width:10%;">粮食性质</th>
            <th style="width:10%;">粮食品种</th>
            <th style="width:10%;">粮食等级</th>
            <th style="width:10%;">油罐</th>
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
                <td v-text="item.oilCanName"></td>
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
            <th style="width:10%;">入库单号</th>
            <th style="width:10%;">入库类型</th>
            <th style="width:10%;">粮食性质</th>
            <th style="width:10%;">粮食品种</th>
            <th style="width:10%;">粮食等级</th>
            <th style="width:10%;">油罐</th>
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
                <td v-text="item.oilCanName"></td>
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
            <th style="width:10%;">入库类型</th>
            <th style="width:10%;">粮食品种</th>
            <th style="width:10%;">结算重量(千克)</th>
            <th style="width:10%;">油罐</th>
            <th style="width:20%;">操作</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="(item,i) in listData">
                <td><input type="checkbox"></td>
                <td v-if="sortOrder=='0'" v-text="i+1"></td>
                <td v-else v-text="listData.length-i"></td>
                <td v-text="item.registerType"></td>
                <td v-text="item.grainKind"></td>
                <td v-text="item.totalWeight"></td>
                <td v-text="item.oilCanName"></td>
                <td>
                  <div class="table-btn btn-yellow" v-if="item.settlementId" @click="jumpDetail(item.settlementId);">详情</div>
                  <div class="table-btn btn-green" v-else @click="jumpEdit();">结算</div>
                  <div class="table-btn btn-blue" v-if="item.settlementId" @click="jumpData(item.settlementId);">入库单</div>
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
            <th style="width:20%;">入库单号</th>
            <th style="width:10%;">油罐</th>
            <th style="width:20%;">操作</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="(item,i) in listData">
                <td><input type="checkbox" ></td>
                <td v-if="sortOrder=='0'" v-text="i+1"></td>
                <td v-else v-text="listData.length-i"></td>
                <td v-text="item.cardNo"></td>
                <td v-text="item.registerNo"></td>
                <td v-text="item.oilCanName"></td>
                <td>
                  <div class="table-btn btn-yellow" @click="jumpDetail('',item);">详情</div>
                  <div class="table-btn btn-green" v-if="item.currentBusinessStep!='出门销卡'" @click="showPopup(item);">销卡</div>
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
</style>
<script>
  // import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { oilRegisterFlowList, oilSamplingFlowList, oilCheckoutFlowList, oilMeteringFlowList, oilNoValueBinList, oilAlreadyValueBinList, oilSettlementList, processPinCardFlowList, oilUnsoldCardList ,pinCard} from "@/api/intelligentStorage/public";
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
      grainVarietyList:[],
      registerPostData: {
        customerName: "",
        plateNumber:'',
        noticeType:1,
        pageSize: 10,
        pageNo: 0
      },
      samplingPostData:{
        grainVariety:null,
        plateNumber:'',
        pageSize: 10,
        pageNo: 0
      },
      checkPostData:{
        grainVariety:null,
        plateNumber:'',
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
        noticeType:1,
        pageSize: 10,
        pageNo: 0
      },
      unsoldCardPostData:{
        cardNo:'',
        noticeType:1,
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
        vm.startNum=vm.number;
        layer.alert('点太快了，请稍后再试！', { closeBtn: 0 });
      }else{
        vm.startNum=vm.number;
        vm.guideStep=num;
        vm.getList(0);
      }
    },
    /*checkStep:function (num) {
      var vm=this;
      vm.guideStep=num;
      vm.getList(0);
    },*/
    getList: function(pageNo,type) {//获取列表
      var vm = this;
      layer.load(2);
      switch(vm.guideStep)
      {
          case 1:
            vm.registerPostData.pageNo = pageNo;
            oilRegisterFlowList(vm.registerPostData)
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
          case 2:
            vm.samplingPostData.pageNo = pageNo;
            oilSamplingFlowList(vm.samplingPostData)
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  //console.log(JSON.stringify(ret))
                  vm.listData = ret.data.dataList;
                  laypage({
                      //分页
                      cont: "PageBar2", //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
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
          case 3:
            vm.checkPostData.pageNo = pageNo;
            oilCheckoutFlowList(vm.checkPostData)
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  vm.listData = ret.data.dataList;
                  laypage({
                      //分页
                      cont: "PageBar3", //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
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
            oilMeteringFlowList(vm.meteringPostData)
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  vm.listData = ret.data.inWeighingList;
                  //console.log(vm.listData);
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
              oilNoValueBinList(vm.valueBinPostData)
                .then(ret => {
                  if (type) {
                    layer.closeAll("loading");
                  }else{
                    ISnoValueBin=1;
                    isOnload();
                  }
                  if (ret.code == 200) {
                    vm.noListData = ret.data.inOndutyNList;
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
              oilAlreadyValueBinList(vm.valueBinPostData)
                .then(ret => {
                  if (type) {
                    layer.closeAll("loading");
                  }else{
                    ISalreadyValueBin=1;
                    isOnload();
                  }
                  if (ret.code == 200) {
                    vm.alreadyListData = ret.data.inOndutyYList;
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
            if(type){
                if (type=='no') {
                  noValueBin();
                }else{
                  alreadyValueBin();
                }
            }else{
                noValueBin();
                alreadyValueBin();
            }
            break;
          case 6:
            vm.settlementPostData.pageNo = pageNo;
            oilSettlementList(vm.settlementPostData)
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
            oilUnsoldCardList(vm.unsoldCardPostData)
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
      switch(vm.guideStep){
          case 1:
              url='oilRegisterDetail';
          break;
          case 2:
              url='oilSamplingDetail';
          break;
          case 3:
              url='oilCheckoutDetail';
          break;
          case 4:
              url='oilMeteringDetail';
          break;
          case 5:
              url='oilValueBinDetail';
          break;
          case 6:
              url='oilSettleDetail';
          break;
          case 7:
              url='oilPinCardDetail';
          break;
      }
      this.$router.push({
        name: url,
        query: {
          id: id,
          data:data
        }
      });
    },
    jumpEdit: function(id) {//跳转到编辑或新增页面
      var vm = this;
      var url;
      switch(vm.guideStep){
          case 1:
              url='oilRegisterEdit';
          break;
          case 2:
              url='oilSamplingEdit';
          break;
          case 3:
              url='oilCheckout';
          break;
          case 4:
              url='oilMeteringEdit';
          break;
          case 5:
              url='oilValueBinEdit';
          break;
          case 6:
              url='oilSettleEdit';
          break;
          case 7:
              url='pinCard';
          break;
      }

      this.$router.push({
        name: url,
        query: {
          id: id
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

          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    jumpWeigh:function (id) {
      this.$router.push({
        name:'oilWeighDetail',
        query:{
          id:id
        }
      })
    },
    jumpData:function (id) {
      this.$router.push({
        name: "oilWarehousingDetail",
        query: {
          id:id
        }
      })
    }
  },
  mounted() {
    var vm=this;
    vm.guideStep=this.$route.query.step?this.$route.query.step:1;
    vm.getList(1);
    vm.getDropDown();
    vm.reckonByTime();
  }
};

</script>
