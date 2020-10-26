<template>
  <div class="content">
    <div class="guide-top">
      <div class="guide-main step">
        <div :class="guideStep==0?'guide-item guide-item-on':'guide-item'" @click="checkStep(0);">结算报表</div>
        <div :class="guideStep==1?'guide-item guide-item-on':'guide-item'" @click="checkStep(1);">出入库日结单</div>
        <div :class="guideStep==2?'guide-item guide-item-on':'guide-item'" @click="checkStep(2);">出入库月结单</div>
        <div :class="guideStep==3?'guide-item guide-item-on':'guide-item'" @click="checkStep(3);">出入库季结单</div>
        <div :class="guideStep==4?'guide-item guide-item-on':'guide-item'" @click="checkStep(4);">出入库年结单</div>
      </div>
    </div>
    <div v-if="guideStep==0" class="menuManage operationLog ">
      <div class="lookup">
        开始时间：
        <input type="text" class="input-text Wdate" onclick="WdatePicker({maxDate:'%y-%M-%d'})" id="startDate">~
        <input type="text" class="input-text Wdate excision" onclick="WdatePicker({maxDate:'%y-%M-%d'})" id="endDate">
        报表类型：
        <select name="" class="select-style excision" v-model="type">
          <option value="1">日</option>
          <option value="2">月</option>
          <option value="3">季</option>
          <option value="4">年</option>
        </select>

        <div class="btn btn-add" @click="getList(0);">
          <img src="../../../../static/images/search.png" alt="">
          <label>查找</label>
        </div>
      </div>
      <div class="report">
          <div class="w100" id="chart1">

          </div>
          <div class="w50">
            显示类型：
            <select name="" class="select-style excision" v-model="showType" @change="drawingChart(2,showType)">
              <option value="1">入库粮食、粮油数量(千克)</option>
              <option value="2">出库库粮食、粮油数量(千克)</option>
              <option value="3">入库单数</option>
              <option value="4">出库单数</option>
              <option value="5">入库结算总额</option>
              <option value="6">出库结算总额</option>
            </select>
            <div  id="chart2" style="height: 80%;"></div>

          </div>
          <div class="w50" id="chart3">

          </div>
      </div>
    </div>
    <div v-if="guideStep==1" class="menuManage operationLog ">
      <div class="lookup">
        开始时间：
        <input type="text" class="input-text Wdate" onclick="WdatePicker({})" id="startDate">~
        <input type="text" class="input-text Wdate excision" onclick="WdatePicker({})" id="endDate">
        粮食品种：
        <div class="grainVariety excision">
            <treeselect v-model="dailyStatementPostData.grainVariety" :multiple="false" :options="grainVarietyList" />
        </div>

        <div class="btn btn-add" @click="getList(0);">
          <img src="../../../../static/images/search.png" alt="">
          <label>查找</label>
        </div>
      </div>
      <div>
        <!-- <div class="btn btn-add" @click="createDailyStatement();">
            <img src="../../../../static/images/add.png" alt="">
            <label>创建日结单</label>
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
            <th style="width:2.5%;"><input type="checkbox" ></th>
            <th style="width:2.5%;">序号</th>
            <th style="width:10%;">日期</th>
            <th style="width:10%;">粮食品种</th>
            <th style="width:10%;">粮食性质</th>
            <th style="width:9%;">入库粮食数量(千克)</th>
            <th style="width:9%;">出库粮食数量(千克)</th>
            <th style="width:7.5%;">入库结算总金额</th>
            <th style="width:7.5%;">出库结算总金额</th>
            <th style="width:7.5%;">入库流水单数量</th>
            <th style="width:7.5%;">出库流水单数量</th>
            <th style="width:7.5%;">总流水单数</th>
            <th style="width:7%;">操作</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="(item,i) in listData">
                <td><input type="checkbox" ></td>
                <td v-if="sortOrder=='0'" v-text="i+1"></td>
                <td v-else v-text="listData.length-i"></td>
                <td v-text="item.settlementDate"></td>
                <td v-text="item.grainVariety"></td>
                <td v-text="item.grainAttribute"></td>
                <td v-text="item.importGrainNum"></td>
                <td v-text="item.exportGrainNum"></td>
                <td v-text="item.importSettlementTotalMoney"></td>
                <td v-text="item.exportSettelmentTotalMoney"></td>
                <td v-text="item.importBillNum"></td>
                <td v-text="item.exportBillNum"></td>
                <td v-text="item.totalBillNum"></td>
                <td>
                  <div class="table-btn btn-yellow" @click="jumpDetail(item.settlementDate,item.grainVarietyCode);">详情</div>
                  <div class="table-btn btn-blue" @click="jumpData(
                    item.settlementDate,
                    item.grainVariety,
                    item.grainAttribute,
                    item.importGrainNum,
                    item.exportGrainNum,
                    item.importBillNum
                    );">打印</div>
                </td>
            </tr>

        </tbody>
      </table>
      <!-- 分页容器 -->
      <div id="PageBar"></div>
    </div>
    <div v-if="guideStep==2" class="menuManage operationLog ">
      <div class="lookup">
        开始时间：
        <input type="text" class="input-text Wdate" onclick="WdatePicker({dateFmt:'yyyy-MM'})" id="startDate2">~
        <input type="text" class="input-text Wdate excision" onclick="WdatePicker({dateFmt:'yyyy-MM'})" id="endDate2">
        粮食品种：
        <div class="grainVariety excision">
            <treeselect v-model="monthlyStatementPostData.grainVariety" :multiple="false" :options="grainVarietyList" />
        </div>

        <div class="btn btn-add" @click="getList(0);">
          <img src="../../../../static/images/search.png" alt="">
          <label>查找</label>
        </div>
      </div>
      <div>
        <!-- <div class="btn btn-add" @click="jumpEdit();">
            <img src="../../../../static/images/add.png" alt="">
            <label>创建月结单</label>
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
            <th style="width:2.5%;"><input type="checkbox" ></th>
            <th style="width:2.5%;">序号</th>
            <th style="width:10%;">月份</th>
            <th style="width:10%;">粮食品种</th>
            <th style="width:10%;">粮食性质</th>
            <th style="width:9%;">入库粮食数量(千克)</th>
            <th style="width:9%;">出库粮食数量(千克)</th>
            <th style="width:7.5%;">入库结算总金额</th>
            <th style="width:7.5%;">出库结算总金额</th>
            <th style="width:7.5%;">入库流水单数量</th>
            <th style="width:7.5%;">出库流水单数量</th>
            <th style="width:7.5%;">总流水单数</th>
            <th style="width:7%;">操作</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="(item,i) in listData">
                <td><input type="checkbox" ></td>
                <td v-if="sortOrder=='0'" v-text="i+1"></td>
                <td v-else v-text="listData.length-i"></td>
                <td v-text="item.settlementDate"></td>
                <td v-text="item.grainVariety"></td>
                <td v-text="item.grainAttribute"></td>
                <td v-text="item.importGrainNum"></td>
                <td v-text="item.exportGrainNum"></td>
                <td v-text="item.importSettlementTotalMoney"></td>
                <td v-text="item.exportSettelmentTotalMoney"></td>
                <td v-text="item.importBillNum"></td>
                <td v-text="item.exportBillNum"></td>
                <td v-text="item.totalBillNum"></td>
                <td>
                  <div class="table-btn btn-yellow" @click="jumpDetail(item.settlementDate,item.grainVarietyCode);">详情</div>
                  <div class="table-btn btn-blue" @click="jumpMonth(
                    item.settlementDate,
                    item.grainVariety,
                    item.grainAttribute,
                    item.importGrainNum,
                    item.exportGrainNum,
                    item.importBillNum
                    );">打印</div>
                </td>
            </tr>
        </tbody>
      </table>
      <!-- 分页容器 -->
      <div id="PageBar2" class="PageBar"></div>
    </div>
    <div v-if="guideStep==3" class="menuManage operationLog ">
      <div class="lookup">
        开始时间：
        <input type="text" class="input-text Wdate" onclick="WdatePicker({maxDate:'%y-%M-%d'})" id="startDate3">~
        <input type="text" class="input-text Wdate excision" onclick="WdatePicker({maxDate:'%y-%M-%d'})" id="endDate3">
        粮食品种：
        <div class="grainVariety excision">
            <treeselect v-model="quarterlyStatementPostData.grainVariety" :multiple="false" :options="grainVarietyList" />
        </div>

        <div class="btn btn-add" @click="getList(0);">
          <img src="../../../../static/images/search.png" alt="">
          <label>查找</label>
        </div>
      </div>
      <div>
        <!-- <div class="btn btn-add" @click="jumpEdit();">
            <img src="../../../../static/images/add.png" alt="">
            <label>创建季结单</label>
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
            <th style="width:2.5%;"><input type="checkbox" ></th>
            <th style="width:2.5%;">序号</th>
            <th style="width:10%;">季度</th>
            <th style="width:10%;">粮食品种</th>
            <th style="width:10%;">粮食性质</th>
            <th style="width:9%;">入库粮食数量(千克)</th>
            <th style="width:9%;">出库粮食数量(千克)</th>
            <th style="width:7.5%;">入库结算总金额</th>
            <th style="width:7.5%;">出库结算总金额</th>
            <th style="width:7.5%;">入库流水单数量</th>
            <th style="width:7.5%;">出库流水单数量</th>
            <th style="width:7.5%;">总流水单数</th>
            <th style="width:7%;">操作</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="(item,i) in listData">
                <td><input type="checkbox" ></td>
                <td v-if="sortOrder=='0'" v-text="i+1"></td>
                <td v-else v-text="listData.length-i"></td>
                <td v-text="item.settlementDate"></td>
                <td v-text="item.grainVariety"></td>
                <td v-text="item.grainAttribute"></td>
                <td v-text="item.importGrainNum"></td>
                <td v-text="item.exportGrainNum"></td>
                <td v-text="item.importSettlementTotalMoney"></td>
                <td v-text="item.exportSettelmentTotalMoney"></td>
                <td v-text="item.importBillNum"></td>
                <td v-text="item.exportBillNum"></td>
                <td v-text="item.totalBillNum"></td>
                <td>
                  <div class="table-btn btn-yellow" @click="jumpDetail(item.settlementDate,item.grainVarietyCode);">详情</div>
                  <div class="table-btn btn-blue" @click="jumpQuart(
                    item.settlementDate,
                    item.grainVariety,
                    item.grainAttribute,
                    item.importGrainNum,
                    item.exportGrainNum,
                    item.importBillNum
                    );">打印</div>
                </td>
            </tr>
        </tbody>
      </table>
      <!-- 分页容器 -->
      <div id="PageBar3" class="PageBar"></div>
    </div>
    <div v-if="guideStep==4" class="menuManage operationLog ">
      <div class="lookup">
        开始时间：
        <input type="text" class="input-text Wdate" onclick="WdatePicker({dateFmt:'yyyy'})" id="startDate4">~
        <input type="text" class="input-text Wdate excision" onclick="WdatePicker({dateFmt:'yyyy'})" id="endDate4">
        粮食品种：
        <div class="grainVariety excision">
            <treeselect v-model="annualStatementPostData.grainVariety" :multiple="false" :options="grainVarietyList" />
        </div>
        <div class="btn btn-add" @click="getList(0);">
          <img src="../../../../static/images/search.png" alt="">
          <label>查找</label>
        </div>
      </div>
      <div>
        <!-- <div class="btn btn-add" @click="jumpEdit();">
            <img src="../../../../static/images/add.png" alt="">
            <label>创建年结单</label>
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
            <th style="width:2.5%;"><input type="checkbox" ></th>
            <th style="width:2.5%;">序号</th>
            <th style="width:10%;">年份</th>
            <th style="width:10%;">粮食品种</th>
            <th style="width:10%;">粮食性质</th>
            <th style="width:9%;">入库粮食数量(千克)</th>
            <th style="width:9%;">出库粮食数量(千克)</th>
            <th style="width:7.5%;">入库结算总金额</th>
            <th style="width:7.5%;">出库结算总金额</th>
            <th style="width:7.5%;">入库流水单数量</th>
            <th style="width:7.5%;">出库流水单数量</th>
            <th style="width:7.5%;">总流水单数</th>
            <th style="width:7%;">操作</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="(item,i) in listData">
                <td><input type="checkbox" ></td>
                <td v-if="sortOrder=='0'" v-text="i+1"></td>
                <td v-else v-text="listData.length-i"></td>
                <td v-text="item.settlementYear"></td>
                <td v-text="item.grainVariety"></td>
                <td v-text="item.grainAttribute"></td>
                <td v-text="item.importGrainNum"></td>
                <td v-text="item.exportGrainNum"></td>
                <td v-text="item.importSettlementTotalMoney"></td>
                <td v-text="item.exportSettelmentTotalMoney"></td>
                <td v-text="item.importBillNum"></td>
                <td v-text="item.exportBillNum"></td>
                <td v-text="item.totalBillNum"></td>
                <td>
                  <div class="table-btn btn-yellow" @click="jumpDetail(item.settlementDate,item.grainVarietyCode);">详情</div>
                  <div class="table-btn btn-blue" @click="jumpYear(
                    item.settlementYear,
                    item.grainVariety,
                    item.grainAttribute,
                    item.importGrainNum,
                    item.exportGrainNum,
                    item.importBillNum
                    );">打印</div>
                </td>
            </tr>
        </tbody>
      </table>
      <!-- 分页容器 -->
      <div id="PageBar4" class="PageBar"></div>
    </div>
  </div>
</template>
<style type="text/css" scoped >
  .guide-main{
    padding-top: 0;
  }
  .step .guide-item{
    width: 25%;
  }
  .report{
    display: flex;
    flex-wrap: wrap;
  }
  .report .w100{
    width: 100%;
    height: 300px;
    box-sizing: border-box;
    padding: 15px;
  }
  .report .w50{
    width: 50%;
    height: 300px;
    box-sizing: border-box;
    padding: 15px;
  }
</style>
<script>
  // import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

import { dailyStatement, monthlyStatement, quarterlyStatement, annualStatement,dailyKnots, monthlyKnots } from "@/api/intelligentStorage/report";

import { grainVariety,} from "@/api/systemManage/dropDown";


export default {
  name: "document",
  components: { Treeselect },
  data() {
    return {
      sortOrder: "0", //0 顺序，1 倒序
      guideStep:this.$route.query.guideStep?this.$route.query.guideStep:0,
      type:1,
      requestData:'',
      dailyStatementPostData: {
        grainVariety: null,
        startDate:'',
        endDate:'',
        sheetFlg:'',
        pageSize: 10,
        pageNo: 0
      },
      monthlyStatementPostData: {
        grainVariety: null,
        startDate:'',
        endDate:'',
        sheetFlg:'',
        pageSize: 10,
        pageNo: 0
      },
      quarterlyStatementPostData: {
        grainVariety: null,
        startDate:'',
        endDate:'',
        sheetFlg:'',
        pageSize: 10,
        pageNo: 0
      },
      annualStatementPostData: {
        grainVariety: null,
        startDate:'',
        endDate:'',
        sheetFlg:'',
        pageSize: 10,
        pageNo: 0
      },
      showType:1,
      brokenLineData:{//折线统计图数据
          settlementDate:[],
          importGrainNum:[],
          exportGrainNum:[],
          importSettlementTotalMoney:[],
          exportSettelmentTotalMoney:[],
          importBillNum:[],
          exportBillNum:[],
      },
      sectorChartData:{
          grainVarietyList:[],
          data:{
            settlementDate:[],
            importGrainNum:[],
            exportGrainNum:[],
            importSettlementTotalMoney:[],
            exportSettelmentTotalMoney:[],
            importBillNum:[],
            exportBillNum:[],
          }
      },
      grainVarietyList: [],
      grainOilLevelList: "",
      inventoryPropertyList: "",
      allChecked: false,
      delList: {
        billIdList: []
      },
      detailData:'',
      listData: [],
      mergeListData:[],
      editPopup: 0, // 控制菜单编辑弹出层的显影，1为显示
    };
  },
  methods: {
    changeSortOrder: function() {//倒序
      var vm = this;
      vm.listData.reverse();
    },
    checkStep:function (num) {
      var vm=this;
      vm.guideStep=num;
      vm.brokenLineData={
          settlementDate:[],
          importGrainNum:[],
          exportGrainNum:[],
          importSettlementTotalMoney:[],
          exportSettelmentTotalMoney:[],
          importBillNum:[],
          exportBillNum:[],
      }
      vm.guideStep=num;
      vm.getList(0);
    },
    getList: function(pageNo) {//获取列表
      var vm = this;
      layer.load(2);
      switch(parseInt(vm.guideStep))
      {
        case 1:
            vm.dailyStatementPostData.pageNo=pageNo;
            vm.dailyStatementPostData.startDate=$('#startDate').val();
            vm.dailyStatementPostData.endDate=$('#endDate').val();
            vm.dailyStatementPostData.pageSize=10;
            vm.dailyStatementPostData.sheetFlg='';
            dailyStatement(vm.dailyStatementPostData)
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

            break;
        case 2:
            vm.monthlyStatementPostData.pageNo=pageNo;
            vm.monthlyStatementPostData.startDate=$('#startDate2').val();
            vm.monthlyStatementPostData.endDate=$('#endDate2').val();
            vm.monthlyStatementPostData.pageSize=10;
            vm.monthlyStatementPostData.sheetFlg='';
            monthlyStatement(vm.monthlyStatementPostData)
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
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
            vm.quarterlyStatementPostData.pageNo=pageNo;
            vm.quarterlyStatementPostData.startDate=$('#startDate3').val();
            vm.quarterlyStatementPostData.endDate=$('#endDate3').val();
                vm.quarterlyStatementPostData.pageSize=10;
            vm.quarterlyStatementPostData.sheetFlg='';

            quarterlyStatement(vm.quarterlyStatementPostData)
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
            vm.annualStatementPostData.pageNo=pageNo;
            vm.annualStatementPostData.startDate=$('#startDate4').val();
            vm.annualStatementPostData.endDate=$('#endDate4').val();
                vm.annualStatementPostData.pageSize=10;
            vm.annualStatementPostData.sheetFlg='';
            annualStatement(vm.annualStatementPostData)
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  vm.listData = ret.data.dataList;
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
        case 0:
              var dome=document.getElementsByClassName('laypage_main');
              if (dome.length>0) {
                for (let i = 0; i < dome.length; i++) {
                  const element = dome[i];
                  element.remove();
                }
              }
              switch ( parseInt(vm.type) ) {
                case 1:
                    vm.dailyStatementPostData.startDate=$('#startDate').val();
                    vm.dailyStatementPostData.endDate=$('#endDate').val();
                    vm.dailyStatementPostData.sheetFlg=1;
                    dailyStatement(vm.dailyStatementPostData)
                      .then(ret => {
                        layer.closeAll("loading");
                        if (ret.code == 200) {
                          vm.brokenLine(ret.data.dataList);


                          vm.dailyStatementPostData.sheetFlg=2;
                          dailyStatement(vm.dailyStatementPostData)
                            .then(ret => {
                              layer.closeAll("loading");
                              if (ret.code == 200) {
                                vm.pie(ret.data.dataList);

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
                    vm.monthlyStatementPostData.startDate=$('#startDate').val();
                    vm.monthlyStatementPostData.endDate=$('#endDate').val();
                    vm.monthlyStatementPostData.sheetFlg=1;
                    monthlyStatement(vm.monthlyStatementPostData)
                      .then(ret => {
                        layer.closeAll("loading");
                        if (ret.code == 200) {
                          vm.brokenLine(ret.data.dataList);


                          vm.monthlyStatementPostData.sheetFlg=2;
                          monthlyStatement(vm.monthlyStatementPostData)
                            .then(ret => {
                              layer.closeAll("loading");
                              if (ret.code == 200) {
                                vm.pie(ret.data.dataList);

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
                    vm.quarterlyStatementPostData.startDate=$('#startDate').val();
                    vm.quarterlyStatementPostData.endDate=$('#endDate').val();
                    vm.quarterlyStatementPostData.sheetFlg=1;
                    quarterlyStatement(vm.quarterlyStatementPostData)
                      .then(ret => {
                        layer.closeAll("loading");
                        if (ret.code == 200) {
                          vm.brokenLine(ret.data.dataList);


                          vm.quarterlyStatementPostData.sheetFlg=2;
                          quarterlyStatement(vm.quarterlyStatementPostData)
                            .then(ret => {
                              layer.closeAll("loading");
                              if (ret.code == 200) {
                                vm.pie(ret.data.dataList);

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
                    vm.annualStatementPostData.startDate=$('#startDate').val();
                    vm.annualStatementPostData.endDate=$('#endDate').val();
                    vm.annualStatementPostData.sheetFlg=1;
                    annualStatement(vm.annualStatementPostData)
                      .then(ret => {
                        layer.closeAll("loading");
                        if (ret.code == 200) {
                          vm.brokenLine(ret.data.dataList);


                          vm.annualStatementPostData.sheetFlg=2;
                          annualStatement(vm.annualStatementPostData)
                            .then(ret => {
                              layer.closeAll("loading");
                              if (ret.code == 200) {
                                vm.pie(ret.data.dataList);

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
          break;

      }
    },
    brokenLine:function(initialData){
        var vm=this;
        vm.brokenLineData={
            settlementDate:[],
            importGrainNum:[],
            exportGrainNum:[],
            importSettlementTotalMoney:[],
            exportSettelmentTotalMoney:[],
            importBillNum:[],
            exportBillNum:[],
        };
        for (var i = 0; i < initialData.length; i++) {
            if(parseInt(vm.type)==4){
                vm.brokenLineData.settlementDate.push(initialData[i].settlementYear.substr(0,10)) ;
            }else{
                vm.brokenLineData.settlementDate.push(initialData[i].settlementDate.substr(0,10)) ;
            }

            vm.brokenLineData.importGrainNum.push(initialData[i].importGrainNum) ;
            vm.brokenLineData.exportGrainNum.push(initialData[i].exportGrainNum) ;
            vm.brokenLineData.importSettlementTotalMoney.push(initialData[i].importSettlementTotalMoney) ;
            vm.brokenLineData.exportSettelmentTotalMoney.push(initialData[i].exportSettelmentTotalMoney) ;
            vm.brokenLineData.importBillNum.push(initialData[i].importBillNum) ;
            vm.brokenLineData.exportBillNum.push(initialData[i].exportBillNum) ;

        }
        vm.drawingChart(1);
    },
    pie:function(initialData){
        var vm=this;
        vm.sectorChartData={
            grainVarietyList:[],
            data:{
              settlementDate:[],
              importGrainNum:[],
              exportGrainNum:[],
              importSettlementTotalMoney:[],
              exportSettelmentTotalMoney:[],
              importBillNum:[],
              exportBillNum:[],
            }
        };
        for (var i = 0; i < initialData.length; i++) {
              vm.sectorChartData.grainVarietyList.push(initialData[i].grainVariety);
              vm.sectorChartData.data.importGrainNum.push({
                name:initialData[i].grainVariety,
                value:initialData[i].importGrainNum
              });
              vm.sectorChartData.data.exportGrainNum.push({
                name:initialData[i].grainVariety,
                value:initialData[i].exportGrainNum
              });
              vm.sectorChartData.data.importSettlementTotalMoney.push({
                name:initialData[i].grainVariety,
                value:initialData[i].importSettlementTotalMoney
              });
              vm.sectorChartData.data.exportSettelmentTotalMoney.push({
                name:initialData[i].grainVariety,
                value:initialData[i].exportSettelmentTotalMoney
              });
              vm.sectorChartData.data.importBillNum.push({
                name:initialData[i].grainVariety,
                value:initialData[i].importBillNum
              });
              vm.sectorChartData.data.exportBillNum.push({
                name:initialData[i].grainVariety,
                value:initialData[i].exportBillNum
              });
        }
        // vm.drawingChart(2,'1');
        console.log(vm.sectorChartData)
        vm.drawingChart(2, vm.showType + '');
    },
    drawingChart:function (num,showType) {//绘制图表
      var vm=this;
      switch(num){
          case 1:
              var myChart1=this.$echarts.init(document.getElementById('chart1'));
              myChart1.setOption({
                  tooltip: {
                      trigger: 'axis'
                  },
                  legend: {
                      data:['入库粮食数量','出库库粮食数量','入库单数','出库单数','入库结算总额','出库结算总额']
                  },
                  grid: {
                      left: '3%',
                      right: '4%',
                      bottom: '3%',
                      containLabel: true
                  },
                  xAxis: {
                      type: 'category',
                      boundaryGap: false,
                      data: vm.brokenLineData.settlementDate
                  },
                  yAxis: {
                      type: 'value'
                  },
                  series: [
                      {
                          name:'入库粮食数量',
                          type:'line',
                          stack: '总量',
                          data:vm.brokenLineData.importGrainNum
                      },
                      {
                          name:'出库库粮食数量',
                          type:'line',
                          stack: '总量',
                          color: '#FF1493',
                          data:vm.brokenLineData.exportGrainNum
                      },
                      {
                          name:'入库单数',
                          type:'line',
                          stack: '总量',
                          data:vm.brokenLineData.importBillNum
                      },
                      {
                          name:'出库单数',
                          type:'line',
                          stack: '总量',
                          color: '#00BFFF',
                          data:vm.brokenLineData.exportBillNum
                      },
                      {
                          name:'入库结算总额',
                          type:'line',
                          stack: '总量',
                          color: '#006400',
                          data:vm.brokenLineData.importSettlementTotalMoney
                      },
                      {
                          name:'出库结算总额',
                          type:'line',
                          stack: '总量',
                          color: '#DAA520',
                          data:vm.brokenLineData.exportSettelmentTotalMoney
                      }
                  ]
              });
              break;
          case 2:
              var seriesData='';
              switch(showType){
                  case '1':
                      seriesData=vm.sectorChartData.data.importGrainNum;
                      break;
                  case '2':
                      seriesData=vm.sectorChartData.data.exportGrainNum;
                      break;
                  case '3':
                      // seriesData=vm.sectorChartData.data.importSettlementTotalMoney;
                      seriesData=vm.sectorChartData.data.importBillNum
                      break;
                  case '4':
                      // seriesData=vm.sectorChartData.data.exportSettelmentTotalMoney;
                      seriesData=vm.sectorChartData.data.exportBillNum;
                      break;
                  case '5':
                      // seriesData=vm.sectorChartData.data.importBillNum;
                      seriesData=vm.sectorChartData.data.importSettlementTotalMoney;
                      break;
                  case '6':
                      // seriesData=vm.sectorChartData.data.exportBillNum;
                      seriesData=vm.sectorChartData.data.exportSettelmentTotalMoney;
                      break;

              }
              console.log(seriesData)
              // console.log(JSON.stringify(seriesData))
              var myChart2=this.$echarts.init(document.getElementById('chart2'));
              myChart2.setOption( {
                  title : {
                      text: '粮食、粮油品种',
                      //subtext: '纯属虚构',
                      x:'center'
                  },
                  tooltip : {
                      trigger: 'item',
                      formatter: "{a} <br/>{b} : {c} ({d}%)"
                  },
                  legend: {
                      orient: 'vertical',
                      left: 'left',
                      data: vm.sectorChartData.grainVarietyList
                  },
                  series : [
                      {
                          name: '粮食品种',
                          type: 'pie',
                          radius : '55%',
                          center: ['50%', '60%'],
                          data: seriesData,
                          itemStyle: {
                              emphasis: {
                                  shadowBlur: 10,
                                  shadowOffsetX: 0,
                                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                              }
                          }
                      }
                  ]
              });
            break;
          case 3:
              var myChart3=this.$echarts.init(document.getElementById('chart3'));
              myChart3.setOption( {
                  title : {
                      text: '某站点用户访问来源',
                      subtext: '纯属虚构',
                      x:'center'
                  },
                  tooltip : {
                      trigger: 'item',
                      formatter: "{a} <br/>{b} : {c} ({d}%)"
                  },
                  legend: {
                      orient: 'vertical',
                      left: 'left',
                      data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                  },
                  series : [
                      {
                          name: '访问来源',
                          type: 'pie',
                          radius : '55%',
                          center: ['50%', '60%'],
                          data:[
                              {value:335, name:'直接访问'},
                              {value:310, name:'邮件营销'},
                              {value:234, name:'联盟广告'},
                              {value:135, name:'视频广告'},
                              {value:1548, name:'搜索引擎'}
                          ],
                          itemStyle: {
                              emphasis: {
                                  shadowBlur: 10,
                                  shadowOffsetX: 0,
                                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                              }
                          }
                      }
                  ]
              });
            break;
      }

    },
    jumpDetail: function(date,grainVariety) {//跳转到详情
      var vm = this;
      console.log(date)
      switch(vm.guideStep){
          case 1:
              this.$router.push({
                name: 'generalLedgerMX',
                query: {
                  settlementDate:date,
                  settlementMonth:'',
                  settlementQuarter:'',
                  settlementYear:'',
                  grainVariety:grainVariety,
                  guideStep:vm.guideStep,
                  name: "report"
                }
              });
          break;
          case 2:
              this.$router.push({
                name: 'generalLedgerMX',
                query: {
                  settlementDate:'',
                  settlementMonth:date.substr(5,2),
                  settlementQuarter:'',
                  settlementYear:date.substr(0,4),
                  grainVariety:grainVariety,
                  guideStep:vm.guideStep,
                  name: "report"
                }
              });
          break;
          case 3:
              this.$router.push({
                name: 'generalLedgerMX',
                query: {
                  settlementDate:'',
                  settlementMonth:'',
                  settlementQuarter:date.substr(5,1),
                  settlementYear:date.substr(0,4),
                  grainVariety:grainVariety,
                  guideStep:vm.guideStep,
                  name: "report"
                }
              });
          break;
          case 4:
              this.$router.push({
                name: 'generalLedgerMX',
                query: {
                  settlementDate:'',
                  settlementMonth:'',
                  settlementQuarter:'',
                  settlementYear:date,
                  grainVariety:grainVariety,
                  guideStep:vm.guideStep,
                  name: "report"
                }
              });
          break;
      }
    },
    jumpData:function (date,grainVariety,grainAttribute,importGrainNum,exportGrainNum,importBillNum) {
      var vm=this;
      this.$router.push({
        name: "dailyStatement",
        query: {
          settlementDate:date,
          grainVariety:grainVariety,
          grainAttribute:grainAttribute,
          importGrainNum:importGrainNum,
          exportGrainNum:exportGrainNum,
          importBillNum:importBillNum
        }
      });
    },
    jumpMonth:function (date,grainVariety,grainAttribute,importGrainNum,exportGrainNum,importBillNum) {
      var vm=this;
      this.$router.push({
        name:'monthlyStatement',
        query:{
          settlementDate:date,
          grainVariety:grainVariety,
          grainAttribute:grainAttribute,
          importGrainNum:importGrainNum,
          exportGrainNum:exportGrainNum,
          importBillNum:importBillNum
        }
      })
    },
    jumpQuart:function (date,grainVariety,grainAttribute,importGrainNum,exportGrainNum,importBillNum) {
    var vm=this;
    this.$router.push({
      name:'quarterlyStatement',
      query:{
        settlementDate:date,
        grainVariety:grainVariety,
        grainAttribute:grainAttribute,
        importGrainNum:importGrainNum,
        exportGrainNum:exportGrainNum,
        importBillNum:importBillNum
      }
    })
  },
    jumpYear:function (date,grainVariety,grainAttribute,importGrainNum,exportGrainNum,importBillNum) {
    var vm=this;
    this.$router.push({
      name:'annualStatement',
      query:{
        settlementDate:date,
        grainVariety:grainVariety,
        grainAttribute:grainAttribute,
        importGrainNum:importGrainNum,
        exportGrainNum:exportGrainNum,
        importBillNum:importBillNum
      }
    })
  },
    // jumpEdit: function(id) {//跳转到编辑或新增页面
    //   var vm = this;
    //   var url;
    //   switch(vm.guideStep){
    //       case 1:
    //           url='registerEdit';
    //       break;
    //       case 2:
    //           url='samplingEdit';
    //       break;
    //       case 3:
    //           url='checkout';
    //       break;
    //       case 4:
    //           url='meteringEdit';
    //       break;
    //       case 5:
    //           url='valueBinEdit';
    //       break;
    //       case 6:
    //           url='settleEdit';
    //       break;
    //       case 7:
    //           url='pinCard';
    //       break;
    //   }

    //   this.$router.push({
    //     name: url,
    //     query: {
    //       id: id
    //     }
    //   });
    // },
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
  },
  mounted() {
    // this.getList(1);
    var vm=this;
    vm.getDropDown();
    vm.getList(0);

  }
};

</script>
