<template>
  <div class="content">
    <div class="comprehensive">
        <div class="comprehensive-top">
            <div :class="isShow==5?'top-item top-this':'top-item'" @click="changeItem(5);">能耗统计分析</div>
            <div :class="isShow==1?'top-item top-this':'top-item'" @click="changeItem(1);">出入库统计分析</div>
            <div :class="isShow==2?'top-item top-this':'top-item'" @click="changeItem(2);">计划，合同分析</div>
            <div :class="isShow==3?'top-item top-this':'top-item'" @click="changeItem(3);">粮食易存统计</div>
            <div :class="isShow==4?'top-item top-this':'top-item'" @click="changeItem(4);">财务分析</div>
            <!--<div :class="isShow==6?'top-item top-this':'top-item'" @click="changeItem(6);">视屏监控</div>-->
            <!--<div :class="isShow==7?'top-item top-this':'top-item'" @click="changeItem(7);">设备管理</div>-->
        </div>
        <div class="lookup">
            仓房：
            <div v-if="isShow===3"  class="multiple-select excision">
                <treeselect v-model="postEasyData.storehouse_names" :multiple="true" :options="storehouseDX" />
            </div>
            <select v-else class="select-style excision" v-model="postData.storehouseGbCode"  @change="getGranary(postData.storehouseGbCode);">
                <option value=''>请选择</option>
                <option :value="item.storehouseGbCode" v-for="item in storehouseList" v-text="item.storehouseName"></option>
            </select>
            廒间：   
            <div v-if="isShow===3"  class="multiple-select excision">
                <treeselect v-model="postEasyData.warehouse_names" :multiple="true" :options="granaryDX" />
            </div>
            <select v-else class="select-style excision" v-model="postData.warehouseGbCode">
                <option value=''>请选择</option>
                <option :value="item.warehouseGbCode" v-for="item in granaryList" v-text="item.warehouseName"></option>
            </select>
            时间：
            <input type="text" v-if="isShow===5" class="input-text Wdate" onclick="WdatePicker({dateFmt:'yyyy-MM'})" id="startTime">
            <input type="text" v-else class="input-text Wdate" onclick="WdatePicker({dateFmt:'yyyy'})" id="startTime">~
            <input type="text" v-if="isShow===5" class="input-text Wdate excision" onclick="WdatePicker({dateFmt:'yyyy-MM'})" id="endTime">
            <input type="text" v-else class="input-text Wdate excision" onclick="WdatePicker({dateFmt:'yyyy'})" id="endTime">
            <!-- <div style="display: inline-block" class="btn btn-export excision" @click="getList();">
            <label>统计列表</label>
            </div> -->
            <div style="display: inline-block" class="btn btn-add" @click="getList();">
            <img src="/../../static/images/search.png" alt="">
            <label>查找</label>
            </div>
        </div>    
        <div v-if="isShow===1" class="comprehensive-content">
            <div class="item-div">
                <div class="tittle-div" @click="jumpclassContast();" >年度分类入库统计</div>
                <div class="content-div" id="annual1"></div>
            </div>
            <div class="item-div">
                <div class="tittle-div" @click="jumpclassOut();">年度分类出库统计</div>
                <div class="content-div" id="annual2"></div>
            </div>
            <div class="item-div">
                <div class="tittle-div"  @click="jumpinContast();">年度入库量对比</div>
                <div class="content-div" id="annual3"></div>
            </div>
            <div class="item-div">
                <div class="tittle-div"  @click="jumpoutContast();">年度出库量对比</div>
                <div class="content-div" id="annual4"></div>
            </div>
        </div>
        <div v-if="isShow===2" class="comprehensive-content">
            <div class="item-div">
                <div class="tittle-div" @click="jumpsignContract();">合同执行数量统计</div>
                <div class="content-div" id="contract1"></div>
            </div>
            <div class="item-div">
                <div class="tittle-div" @click="jumpsignContract();">合同执行金额统计</div>
                <div class="content-div" id="contract2"></div>
            </div>
            <div class="item-div">
                <div class="tittle-div" @click="jumpimplementPlan();">计划执行数量统计</div>
                <div class="content-div" id="implement1"></div>
            </div>
            <!-- <div class="item-div">
                <div class="tittle-div" @click="jumpimplementPlan();">计划执行金额统计</div>
                <div class="content-div" id="implement2"></div>
            </div> -->
        </div>
        <div v-if="isShow===3" class="comprehensive-content">
            <div class="item-div" v-for="(item,i) in easyData">
                <div class="tittle-div" v-text="item.storehouseName+'-'+item.warehouseName"></div>
                <div class="content-div" :id="'easy'+i"></div>
            </div>
        </div>
        <div v-if="isShow===4" class="comprehensive-content">
            <div class="item-div">
                <div class="tittle-div" @click="jumpclassificationList();">分类销售价格分析</div>
                <div class="content-div" id="finance1"></div>
            </div>
            <div class="item-div">
                <div class="tittle-div"  @click="jumpclassificationPurchase();">分类采购价格分析</div>
                <div class="content-div" id="finance2"></div>
            </div>
            <div class="item-div">
                <div class="tittle-div"  @click="jumpinContast();">入库结算数量统计</div>
                <div class="content-div" id="finance3"></div>
            </div>
            <div class="item-div">
                <div class="tittle-div"  @click="jumppayLoan();">入库结算金额统计</div>
                <div class="content-div" id="finance4"></div>
            </div>
            <div class="item-div">
                <div class="tittle-div"  @click="jumpoutContast();">出库结算数量统计</div>
                <div class="content-div" id="finance5"></div>
            </div>
            <div class="item-div">
                <div class="tittle-div" @click="jumpreturnLoan();">出库结算金额统计</div>
                <div class="content-div" id="finance6"></div>
            </div>
        </div>
        <div v-if="isShow===5" class="comprehensive-content">
            <div class="item-div">
                <div class="content-div" id="consumeEnergy_left"></div>
            </div>
            <div class="item-div">
                <div class="content-div" id="consumeEnergy_right"></div>
            </div>
            <div class="item-big-div">
                <div class="tittle-div">能耗统计</div>
                <div class="content-div" id="consumeEnergy_bottom"></div>
            </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
  .lookup .excision{
    margin-right:4%;
  }

  .content-div{
    width: 99.8%;
    height: 360px;
    border: grey 1px solid;
  }
  .tittle-div{
    width: 100%;
    height: 40px;
    line-height: 40px;
    color: black;
    font-size: 15px;
    box-shadow:  0px 1px 2px 0px grey ;
    text-align: center;
  }
  .item-big-div{
    width: 99.5%;
    padding-bottom: 2rem;
  }
  .item-div{
    width: 49%;

  }
  .comprehensive-content{
    position: inherit;
    top:0;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    background: #fff;
    padding-bottom: 2rem;
  }
</style>

<script>
  // import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { energyStatisticsReport, } from "@/api/energyConsumption/public";
import { graindepot, storehouse, granary, cargo} from "@/api/systemManage/dropDown"; 
import { annualClass, annualQuantity,plannedContracts,inventoryStatistics,financialAnalysisPie,classifiedPurchasingSalesPrice } from "@/api/statisticalAnalysis.js"; 
    export default {
        name: "foodstuffList",
        components: { Treeselect },
      data() {
        return {
            isShow:5,
            postData: {
                storehouseGbCode: "",
                warehouseGbCode:'',
                electricConsumerItem:'',
                startTime:'',
                endTime:'',
                pageSize: 10,
                pageNo: 0
            },          
            pieChartOfTotalElectricityConsumption:{
                storehouseName:[],
                data:[]
            },//仓房耗能统计
            totalInterSections:{
                storehouseName:'',
                warehouseName:'',
                data:[]
            },//厫间各项用电项所占比率
            itemEnnergys:{
                fumigationEnnergys:[],
                aerationEnnergys:[],
                lowTemperatureStorageEnnergys:[],
                unloadingGrainEnnergys:[],
                otherEnnergys:[],
                date:[]
            },
            rkClassTJ:{
                pie:{
                    grainVariety:[],
                    data:[]
                },
                histogram:{
                    year:[],
                    grainVariety:[],
                    data:[]
                }
            },
            ckClassTJ:{
                pie:{
                    grainVariety:[],
                    data:[]
                },
                histogram:{
                    year:[],
                    grainVariety:[],
                    data:[]                    
                }
            },
            easyData:'',
            postEasyData:{
                storehouse_names:null,
                warehouse_names:null,
                start_time:"",
                end_time:"",
            },
            rkPriceTJ:{
                year:[],
                grainVariety:[],
                data:[]
            },
            ckPriceTJ:{
                year:[],
                grainVariety:[],
                data:[] 
            },
            planTJ:{
                planNum:[{
                    value:0,
                    name:'计划已完成数量'
                },{
                    value:0,
                    name:'计划未完成数量'
                }],
                contractNum:[{
                    value:0,
                    name:'合同已完成数量'
                },{
                    value:0,
                    name:'合同未完成数量'
                }],
                contractMoney:[{
                    value:0,
                    name:'合同已结算金额'
                },{
                    value:0,
                    name:'合同未结算金额'
                }]
            },
            financialTJ:{
                rkBalanceMoney:[{
                    value:0,
                    name:'未支付金额'
                },{
                    value:0,
                    name:'已支付金额'
                }],
                ckBalanceMoney:[{
                    value:0,
                    name:'未收款'
                },{
                    value:0,
                    name:'已收款'
                }],
                rkBalanceNum:[{
                    value:0,
                    name:'已结算数量'
                },{
                    value:0,
                    name:'未结算数量'
                }],
                ckBalanceNum:[{
                    value:0,
                    name:'已结算数量'
                },{
                    value:0,
                    name:'未结算数量'
                }]
            },
            storehouseList:[],//仓房下拉列表
            granaryList:[],//廒间下拉列表
            storehouseDX:[],//仓房下拉列表多选
            granaryDX:[],//廒间下拉列表多选
        };
      },
      methods: {
        jumpclassContast: function(id,type) {
          //跳转到编辑或新增页面
          var vm = this;
          this.$router.push({
            name: "classContast",
            query: {
              id: id,
              type:type
            }
          });
        },
        jumpclassOut: function(id,type) {
          //跳转到编辑或新增页面
          var vm = this;
          this.$router.push({
            name: "classOut",
            query: {
              id: id,
              type:type
            }
          });
        },
        jumpinContast: function(id,type) {
          //跳转到编辑或新增页面
          var vm = this;
          this.$router.push({
            name: "inContast",
            query: {
              id: id,
              type:type
            }
          });
        },
        jumpoutContast: function(id,type) {
          //跳转到编辑或新增页面
          var vm = this;
          this.$router.push({
            name: "outContast",
            query: {
              id: id,
              type:type
            }
          });
        },
        jumpsignContract: function(id,type) {
          //跳转到编辑或新增页面
          var vm = this;
          this.$router.push({
            name: "signContract",
            query: {
              id: id,
              type:type
            }
          });
        },
        jumpimplementPlan: function(id,type) {
          //跳转到编辑或新增页面
          var vm = this;
          this.$router.push({
            name: "implementPlan",
            query: {
              id: id,
              type:type
            }
          });
        },
        jumpclassificationList: function(id,type) {
          //跳转到编辑或新增页面
          var vm = this;
          this.$router.push({
            name: "classificationList",
            query: {
              id: id,
              type:type
            }
          }); 
        },
        jumpclassificationPurchase: function(id,type) {
          //跳转到编辑或新增页面
          var vm = this;
          this.$router.push({
            name: "classificationPurchase",
            query: {
              id: id,
              type:type
            }
          });
        },
        jumppayLoan: function(id,type) {
          //跳转到编辑或新增页面
          var vm = this;
          this.$router.push({
            name: "payLoan",
            query: {
              id: id,
              type:type
            }
          });
        },
        jumpreturnLoan: function(id,type) {
          //跳转到编辑或新增页面
          var vm = this;
          this.$router.push({
            name: "returnLoan",
            query: {
              id: id,
              type:type
            }
          });
        },
        jumpenergy: function(id,type) {
          //跳转到编辑或新增页面
          var vm = this;
          this.$router.push({
            name: "energyList",
            query: {
              id: id,
              type:type
            }
          });
        },
        getenergyList: function(pageNo) {//获取能耗列表
            var vm = this;
            vm.postData.pageNo=pageNo;
            vm.postData.startTime=$('#startTime').val();
            vm.postData.endTime=$('#endTime').val();
            layer.load(2);
            energyStatisticsReport(vm.postData)
                .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                    console.log(ret)
                    //仓房耗能统计
                    vm.pieChartOfTotalElectricityConsumption={
                        storehouseName:[],
                        data:[]
                    };
                    vm.totalInterSections={
                        storehouseName:'',
                        warehouseName:'',
                        data:[]                
                    }
                    // 假数据
                    ret.data.lowTemperatureStorageEnnergyArray = [0];
                    ret.data.unloadingGrainEnnergyArray = [21];
                    ret.data.aerationEnnergyArray = [0];
                    ret.data.fumigationEnnergyArray = [0];
                    ret.data.otherEnnergyArray = [0];
                    ret.data.yMs = [2019.11]
                    ret.data.totalInterSections = [
                          {
                            "electricConsumerItem":"4",
                            "rate":1,
                            "sumTotalEnergyConsumption":21,
                            "storehouseName":"1号仓",
                            "warehouseName":"1号仓廒间"
                          }
                        ];
                    ret.data.pieChartOfTotalElectricityConsumption = [
                        {"total":21,"rate":0.0328,"storehouseName":"1号仓"},
                        {"total":548,"rate":0.8549,"storehouseName":"2号仓"},
                        {"total":52,"rate":0.0811,"storehouseName":"3号仓"},
                        {"total":1,"rate":0.0016,"storehouseName":"4号仓"},
                        {"total":1,"rate":0.0016,"storehouseName":"6号仓"},
                        {"total":18,"rate":0.0281,"storehouseName":"8号仓"}
                    ];
                    // 假数据结束
                    if ( ret.data.totalInterSections.length>0) {
                        ret.data.totalInterSections.forEach(item => {
                            if (item.electricConsumerItem==1) {
                                item.electricConsumerItem='熏蒸作业';
                            }
                            if (item.electricConsumerItem==2) {
                                item.electricConsumerItem='通风作业';
                            }
                            if (item.electricConsumerItem==3) {
                                item.electricConsumerItem='低温储粮';
                            }
                            if (item.electricConsumerItem==4) {
                                item.electricConsumerItem='值仓';
                            }
                            if (item.electricConsumerItem==5) {
                                item.electricConsumerItem='其它';
                            }
                        });
                        
                    }
                    vm.itemEnnergys.fumigationEnnergys=ret.data.fumigationEnnergyArray;
                    vm.itemEnnergys.aerationEnnergys=ret.data.aerationEnnergyArray;
                    vm.itemEnnergys.lowTemperatureStorageEnnergys=ret.data.lowTemperatureStorageEnnergyArray;
                    vm.itemEnnergys.unloadingGrainEnnergys=ret.data.unloadingGrainEnnergyArray;
                    vm.itemEnnergys.otherEnnergys=ret.data.otherEnnergyArray;
                    vm.itemEnnergys.date=ret.data.yMs;
                    if (ret.data.pieChartOfTotalElectricityConsumption!=''||ret.data.pieChartOfTotalElectricityConsumption!=null) {                
                        for (var i = 0; i < ret.data.pieChartOfTotalElectricityConsumption.length; i++) {
                            vm.pieChartOfTotalElectricityConsumption.storehouseName.push(ret.data.pieChartOfTotalElectricityConsumption[i].storehouseName);
                            vm.pieChartOfTotalElectricityConsumption.data.push({
                                value:ret.data.pieChartOfTotalElectricityConsumption[i].total,
                                name:ret.data.pieChartOfTotalElectricityConsumption[i].storehouseName
                            });
                        }
                    }
                    if (ret.data.totalInterSections!=''||ret.data.totalInterSections!=null) { 
                        for (var i = 0; i < ret.data.totalInterSections.length; i++) {
                        vm.totalInterSections.data.push({
                            value:ret.data.totalInterSections[i].sumTotalEnergyConsumption,
                            name:ret.data.totalInterSections[i].electricConsumerItem
                        });
                        }
                    }

                    vm.totalInterSections.storehouseName=ret.data.totalInterSections[0].storehouseName;
                    vm.totalInterSections.warehouseName=ret.data.totalInterSections[0].warehouseName;



                    vm.drawChart(5);
                }else {
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
        getStorage:function () {//出入库统计
            var vm=this;
            
            vm.rkClassTJ={
                pie:{
                    grainVariety:[],
                    data:[]
                },
                histogram:{
                    year:[],
                    grainVariety:[],
                    data:[] 
                }
            };
            vm.ckClassTJ={
                pie:{
                    grainVariety:[],
                    data:[]
                },
                histogram:{
                    year:[],
                    grainVariety:[],
                    data:[]                     
                }
            };
            var enterData={
                warehouseGbCode:vm.postData.warehouseGbCode,
                startYear:$('#startTime').val(),
                endYear:$('#endTime').val(),
                noticeType:1
            }
            var outData={
                warehouseGbCode:vm.postData.warehouseGbCode,
                startYear:$('#startTime').val(),
                endYear:$('#endTime').val(),
                noticeType:2
            }
                layer.load(2);
            annualClass(enterData)
                .then(ret => {
                layer.closeAll("loading");
                    if (ret.code == 200) {
                        // console.log(ret)
                        ret.data.dataList.forEach(g => {
                            vm.rkClassTJ.pie.grainVariety.push(g.grainVariety);
                            vm.rkClassTJ.pie.data.push({
                                value:g.settlementWeight,
                                name:g.grainVariety
                            })
                        });
                        vm.drawChart(1);
                    }else {
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
            annualClass(outData)
                .then(ret => {
                layer.closeAll("loading");
                    if (ret.code == 200) {
                        // console.log(ret)
                        ret.data.dataList.forEach(g => {
                            vm.ckClassTJ.pie.grainVariety.push(g.grainVariety);
                            vm.ckClassTJ.pie.data.push({
                                value:g.settlementWeight,
                                name:g.grainVariety
                            })
                        });

                        vm.drawChart(1);
                    }else {
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
            annualQuantity(enterData).then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                    // console.log(ret)
                    
                    Object.keys(ret.data.dataMap).forEach(key => {
                        vm.rkClassTJ.histogram.year.push(key);
                        var settlementWeight=[];
                        ret.data.dataMap[key].forEach(item => {
                            settlementWeight.push(item.settlementWeight);
                        });
                        vm.rkClassTJ.histogram.data.push({
                            name: key,
                            type: 'bar',
                            data: settlementWeight
                        });
                    });
                    ret.data.dataMap[vm.rkClassTJ.histogram.year[0]].forEach(item=>{
                        vm.rkClassTJ.histogram.grainVariety.push(item.grainVariety);
                    });
                    vm.drawChart(1);
                }else {
                    if (ret.code == "500" && ret.data == "查询错误，没有数据") {
                        layer.msg("暂无数据");
                        vm.listData = [];
                    } else {
                        layer.alert(ret.data, { closeBtn: 0 });
                    }
                }
            }).catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
            });
            annualQuantity(outData).then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                    // console.log(ret)
                    
                    Object.keys(ret.data.dataMap).forEach(key => {
                        vm.ckClassTJ.histogram.year.push(key);
                        var settlementWeight=[];
                        ret.data.dataMap[key].forEach(item => {
                            settlementWeight.push(item.settlementWeight);
                        });
                        vm.ckClassTJ.histogram.data.push({
                            name: key,
                            type: 'bar',
                            data: settlementWeight
                        });
                    });
                    ret.data.dataMap[vm.ckClassTJ.histogram.year[0]].forEach(item=>{
                        vm.ckClassTJ.histogram.grainVariety.push(item.grainVariety);
                    });
                    // console.log(JSON.stringify(vm.ckClassTJ))
                    vm.drawChart(1);
                }else {
                    if (ret.code == "500" && ret.data == "查询错误，没有数据") {
                        layer.msg("暂无数据");
                        vm.listData = [];
                    } else {
                        layer.alert(ret.data, { closeBtn: 0 });
                    }
                }
            }).catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
            });
        },
        getPlan:function () {//计划合同统计
            var vm=this;
                layer.load(2);
            plannedContracts(vm.postData)
                .then(ret => {
                layer.closeAll("loading");
                    if (ret.code == 200) {
                        // console.log(ret)
                        ret.data.contractData.forEach(g => {
                            vm.planTJ.contractNum[0].value+=g.finishedQuantity;
                            vm.planTJ.contractNum[1].value+=(g.totalQuantity-g.finishedQuantity);
                            vm.planTJ.contractMoney[0].value+=g.finishedMoney;
                            vm.planTJ.contractMoney[1].value+=(g.totalMoney-g.finishedMoney);                            
                        });
                        ret.data.planData.forEach(g => {
                            vm.planTJ.planNum[0].value+=g.finishedQuantity;
                            vm.planTJ.planNum[1].value+=(g.totalQuantity-g.finishedQuantity);
                            // vm.planTJ.contractMoney[0].value+=g.finishedMoney;
                            // vm.planTJ.contractMoney[1].value+=(g.totalMoney-g.finishedMoney);                            
                        });
                        vm.drawChart(2);
                    }else {
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
        getEasy:function () {//粮食宜存统计
            var vm=this;
            if(vm.postEasyData.storehouse_names === null) {
                layer.open({
                    title: '提示',
                    content: '请选择仓房，廒间！'
                })
                return false
            }
            var postData={
                storehouse_names:vm.postEasyData.storehouse_names.join(','),
                warehouse_names:vm.postEasyData.warehouse_names.join(','),
                start_time:$('#startTime').val(),
                end_time:$('#endTime').val(),
            }
            layer.load(2);
            inventoryStatistics(postData)
                .then(ret => {
                layer.closeAll("loading");
                    if (ret.code == 200) {
                        // console.log(ret)
                        vm.easyData=ret.data.dataList;
                        vm.$nextTick(function () {
                            vm.drawChart(3);
                        });
                    }else {
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
        getFinancial:function () {//财务分析统计
            var vm=this;
                layer.load(2);
                
            vm.rkPriceTJ={
                year:[],
                grainVariety:[],
                data:[]
            };
            vm.ckPriceTJ={
                year:[],
                grainVariety:[],
                data:[] 
            };
            var enterData={
                startYear:$('#startTime').val(),
                endYear:$('#endTime').val(),
                noticeType:1
            }
            var outData={
                startYear:$('#startTime').val(),
                endYear:$('#endTime').val(),
                noticeType:2
            }
            classifiedPurchasingSalesPrice(enterData)
                .then(ret => {
                layer.closeAll("loading");
                    if (ret.code == 200) {
                        // console.log(ret)
                        Object.keys(ret.data.yearDataMap).forEach(key => {
                            vm.rkPriceTJ.year.push(key);
                            var avgPrice=[];
                            ret.data.yearDataMap[key].forEach(item => {
                                avgPrice.push(item.avgPrice);
                            });
                            vm.rkPriceTJ.data.push({
                                name: key,
                                type: 'bar',
                                data: avgPrice
                            });
                        });
                        ret.data.yearDataMap[vm.rkPriceTJ.year[0]].forEach(item=>{
                            vm.rkPriceTJ.grainVariety.push(item.grainKind);
                        });
                        vm.drawChart(4);
                    }else {
                        if (ret.code == "500" && ret.data == "查询错误，没有数据") {
                            layer.msg("暂无数据");
                        } else {
                            // layer.alert(ret.data, { closeBtn: 0 });
                        }
                    }
                })
                .catch(err => {
                    // layer.alert(err.message, { closeBtn: 0 });
                });
            classifiedPurchasingSalesPrice(outData)
                .then(ret => {
                layer.closeAll("loading");
                    if (ret.code == 200) {
                        // console.log(ret)
                        
                        Object.keys(ret.data.yearDataMap).forEach(key => {
                            vm.ckPriceTJ.year.push(key);
                            var avgPrice=[];
                            ret.data.yearDataMap[key].forEach(item => {
                                avgPrice.push(item.avgPrice);
                            });
                            vm.ckPriceTJ.data.push({
                                name: key,
                                type: 'bar',
                                data: avgPrice
                            });
                        });
                        ret.data.yearDataMap[vm.ckPriceTJ.year[0]].forEach(item=>{
                            vm.ckPriceTJ.grainVariety.push(item.grainKind);
                        });
                        vm.drawChart(4);
                    }else {
                        if (ret.code == "500" && ret.data == "查询错误，没有数据") {
                            layer.msg("暂无数据");
                        } else {
                            // layer.alert(ret.data, { closeBtn: 0 });
                        }
                    }
                })
                .catch(err => {
                    // layer.alert(err.message, { closeBtn: 0 });
                });
            financialAnalysisPie({noticeType:1})
                .then(ret => {
                layer.closeAll("loading");
                    if (ret.code == 200) {
                        // console.log(ret)
                        ret.data.dataList.forEach(g => {
                            vm.financialTJ.rkBalanceNum[0].value+=g.settlementWeight;
                            vm.financialTJ.rkBalanceNum[1].value+=g.noSettlementWeight;
                            vm.financialTJ.rkBalanceMoney[0].value+=g.settlementMoney;
                            vm.financialTJ.rkBalanceMoney[1].value+=g.noSettlementMoney;                            
                        });
                        vm.drawChart(4);
                    }else {
                        if (ret.code == "500" && ret.data == "查询错误，没有数据") {
                            layer.msg("暂无数据");
                        } else {
                            // layer.alert(ret.data, { closeBtn: 0 });
                        }
                    }
                })
                .catch(err => {
                    // layer.alert(err.message, { closeBtn: 0 });
                });
            financialAnalysisPie({noticeType:2})
                .then(ret => {
                layer.closeAll("loading");
                    if (ret.code == 200) {
                        // console.log(ret)
                        ret.data.dataList.forEach(g => {
                            vm.financialTJ.ckBalanceNum[0].value+=g.settlementWeight;
                            vm.financialTJ.ckBalanceNum[1].value+=g.noSettlementWeight;
                            vm.financialTJ.ckBalanceMoney[0].value+=g.settlementMoney;
                            vm.financialTJ.ckBalanceMoney[1].value+=g.noSettlementMoney;                            
                        });
                        vm.drawChart(4);
                    }else {
                        if (ret.code == "500" && ret.data == "查询错误，没有数据") {
                            layer.msg("暂无数据");
                        } else {
                            // layer.alert(ret.data, { closeBtn: 0 });
                        }
                    }
                })
                .catch(err => {
                    // layer.alert(err.message, { closeBtn: 0 });
                });
        },
        drawChart:function (num) {
          var vm=this;
          if (num==5) {
            var consumeEnergy_left=this.$echarts.init(document.getElementById('consumeEnergy_left'));
            var consumeEnergy_right=this.$echarts.init(document.getElementById('consumeEnergy_right'));
            var consumeEnergy_bottom=this.$echarts.init(document.getElementById('consumeEnergy_bottom'));
            
            document.getElementById('consumeEnergy_left').removeAttribute("_echarts_instance_");
            document.getElementById('consumeEnergy_right').removeAttribute("_echarts_instance_");
            document.getElementById('consumeEnergy_bottom').removeAttribute("_echarts_instance_");

            consumeEnergy_left.setOption({
                title : {
                    text: '用电总额',
                    subtext: '',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: vm.pieChartOfTotalElectricityConsumption.storehouseName
                },
                series : [
                    {
                        name: '用电总额',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:vm.pieChartOfTotalElectricityConsumption.data,
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
        
            consumeEnergy_right.setOption({
                title : {
                    text: vm.totalInterSections.storehouseName+vm.totalInterSections.warehouseName+'耗能统计',
                    subtext: '',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    type: 'scroll',
                    orient: 'vertical',
                    right: 10,
                    top: 20,
                    bottom: 20,
                    data: vm.totalInterSections.data,
                },
                series : [
                    {
                        name: '耗能统计',
                        type: 'pie',
                        radius : '55%',
                        center: ['40%', '50%'],
                        data: vm.totalInterSections.data,
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

            consumeEnergy_bottom.setOption({
                title: {
                    text: '用电项耗能统计'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['熏蒸作业','通风作业','低温储粮','值仓','其它']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: vm.itemEnnergys.date
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name:'熏蒸作业',
                        type:'line',
                        stack: '耗能',
                        data:vm.itemEnnergys.fumigationEnnergys
                    },
                    {
                        name:'通风作业',
                        type:'line',
                        stack: '耗能',
                        data:vm.itemEnnergys.aerationEnnergys
                    },
                    {
                        name:'低温储粮',
                        type:'line',
                        stack: '耗能',
                        data:vm.itemEnnergys.lowTemperatureStorageEnnergys
                    },
                    {
                        name:'值仓',
                        type:'line',
                        stack: '耗能',
                        data:vm.itemEnnergys.unloadingGrainEnnergys
                    },
                    {
                        name:'其它',
                        type:'line',
                        stack: '耗能',
                        data:vm.itemEnnergys.otherEnnergys
                    }
                ]
            });
      
          }
          if (num==1) {
            var annual1=this.$echarts.init(document.getElementById('annual1'));
            var annual2=this.$echarts.init(document.getElementById('annual2'));
            var annual3=this.$echarts.init(document.getElementById('annual3'));
            var annual4=this.$echarts.init(document.getElementById('annual4'));

            document.getElementById('annual1').removeAttribute("_echarts_instance_");
            document.getElementById('annual2').removeAttribute("_echarts_instance_");
            document.getElementById('annual3').removeAttribute("_echarts_instance_");
            document.getElementById('annual4').removeAttribute("_echarts_instance_");

            annual1.setOption( {
                title : {
                    text: '年度分类入库量统计',
                    subtext: '',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: vm.rkClassTJ.pie.grainVariety
                },
                series : [
                    {
                        name: '入库量统计',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:vm.rkClassTJ.pie.data,
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
            annual2.setOption( {
                title : {
                    text: '年度分类出库量统计',
                    subtext: '',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: vm.ckClassTJ.pie.grainVariety
                },
                series : [
                    {
                        name: '出库量统计',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:vm.ckClassTJ.pie.data,
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
            annual3.setOption( {
                title: {
                    text: '入库总量',
                    subtext: ''
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: vm.rkClassTJ.histogram.year
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    data: vm.rkClassTJ.histogram.grainVariety
                },
                series: vm.rkClassTJ.histogram.data
            });
            annual4.setOption( {
                title: {
                    text: '出库总量',
                    subtext: ''
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: vm.ckClassTJ.histogram.year
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    data: vm.ckClassTJ.histogram.grainVariety
                },
                series: vm.ckClassTJ.histogram.data
            });
          }
          if (num==2) {
            var contract1=this.$echarts.init(document.getElementById('contract1'));
            var contract2=this.$echarts.init(document.getElementById('contract2'));
            var implement1=this.$echarts.init(document.getElementById('implement1'));
            // var implement2=this.$echarts.init(document.getElementById('implement2'));

            document.getElementById('contract1').removeAttribute("_echarts_instance_");
            document.getElementById('contract2').removeAttribute("_echarts_instance_");
            document.getElementById('implement1').removeAttribute("_echarts_instance_");
            // document.getElementById('implement2').removeAttribute("_echarts_instance_");

            contract1.setOption( {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data:['合同已完成数量','合同未完成数量']
                },
                series: [
                    {
                        name:'',
                        type:'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:vm.planTJ.contractNum
                    }
                ]
            });
            contract2.setOption( {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data:['合同未结算金额','合同已结算金额']
                },
                series: [
                    {
                        name:'',
                        type:'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:vm.planTJ.contractMoney
                    }
                ]
            });
            implement1.setOption( {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data:['计划已完成数量','计划未完成数量']
                },
                series: [
                    {
                        name:'',
                        type:'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:vm.planTJ.planNum
                    }
                ]
            });
            //     implement2.setOption( {
            //         tooltip: {
            //             trigger: 'item',
            //             formatter: "{a} <br/>{b}: {c} ({d}%)"
            //         },
            //         legend: {
            //             orient: 'vertical',
            //             x: 'left',
            //             data:['未结算数量','已结算数量']
            //         },
            //         series: [
            //             {
            //                 name:'',
            //                 type:'pie',
            //                 radius: ['50%', '70%'],
            //                 avoidLabelOverlap: false,
            //                 label: {
            //                     normal: {
            //                         show: false,
            //                         position: 'center'
            //                     },
            //                     emphasis: {
            //                         show: true,
            //                         textStyle: {
            //                             fontSize: '30',
            //                             fontWeight: 'bold'
            //                         }
            //                     }
            //                 },
            //                 labelLine: {
            //                     normal: {
            //                         show: false
            //                     }
            //                 },
            //                 data:[
            //                     {value:6, name:'未结算数量'},
            //                     {value:28, name:'已结算数量'}
            //                 ]
            //             }
            //         ]
            //     });
          }
          if (num==3) {
                for (let i = 0; i < vm.easyData.length; i++) {
                    // var grain=this.$echarts.init(document.getElementById('easy'+i));            
                    // document.getElementById('easy'+i).removeAttribute("_echarts_instance_");
                    console.log('easy'+i);
                    console.log(document.getElementById('easy'+i));
                    this.$echarts.init(document.getElementById('easy'+i)).setOption( {
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            x: 'left',
                            data:['宜存数量','轻度不宜存数量','重度不宜存数量','未检测数量']
                        },
                        series: [
                            {
                                name:'',
                                type:'pie',
                                radius: ['50%', '70%'],
                                avoidLabelOverlap: false,
                                label: {
                                    normal: {
                                        show: false,
                                        position: 'center'
                                    },
                                    emphasis: {
                                        show: true,
                                        textStyle: {
                                            fontSize: '30',
                                            fontWeight: 'bold'
                                        }
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        show: false
                                    }
                                },
                                data:[
                                    {value:vm.easyData[i].survivalNum, name:'宜存数量'},
                                    {value:vm.easyData[i].lightNotSurvivalNum, name:'轻度不宜存数量'},
                                    {value:vm.easyData[i].severeNotSurvivalNum, name:'重度不宜存数量'},
                                    {value:vm.easyData[i].notCheckOutNum, name:'未检测数量'}
                                ]
                            }
                        ]
                    });
                }
            // var grain1=this.$echarts.init(document.getElementById('grain1'));            
            // document.getElementById('grain1').removeAttribute("_echarts_instance_");

            
          }
          if (num==4) {
            var finance1=this.$echarts.init(document.getElementById('finance1'));
            var finance2=this.$echarts.init(document.getElementById('finance2'));
            var finance3=this.$echarts.init(document.getElementById('finance3'));
            var finance4=this.$echarts.init(document.getElementById('finance4'));
            var finance5=this.$echarts.init(document.getElementById('finance5'));
            var finance6=this.$echarts.init(document.getElementById('finance6'));
            document.getElementById('finance1').removeAttribute("_echarts_instance_");
            document.getElementById('finance2').removeAttribute("_echarts_instance_");
            document.getElementById('finance3').removeAttribute("_echarts_instance_");
            document.getElementById('finance4').removeAttribute("_echarts_instance_");
            document.getElementById('finance5').removeAttribute("_echarts_instance_");
            document.getElementById('finance6').removeAttribute("_echarts_instance_");

            finance1.setOption( {
                title: {
                    text: '',
                    subtext: ''
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: vm.ckPriceTJ.year
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    data:  vm.ckPriceTJ.grainVariety
                },
                series: vm.ckPriceTJ.data
            });
            finance2.setOption( {
                title: {
                    text: '',
                    subtext: ''
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: vm.rkPriceTJ.year
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    data: vm.rkPriceTJ.grainVariety
                },
                series: vm.rkPriceTJ.data
            });
            finance3.setOption( {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data:['未结算数量','已结算数量']
                },
                series: [
                    {
                        name:'',
                        type:'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:vm.financialTJ.rkBalanceNum
                    }
                ]
            });
            finance4.setOption( {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data:['未支付金额','已支付金额']
                },
                series: [
                    {
                        name:'',
                        type:'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:vm.financialTJ.rkBalanceMoney
                    }
                ]
            });
            finance5.setOption( {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data:['未结算数量','已结算数量']
                },
                series: [
                    {
                        name:'',
                        type:'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:vm.financialTJ.ckBalanceNum
                    }
                ]
            });
            finance6.setOption( {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data:['已收款','未收款']
                },
                series: [
                    {
                        name:'',
                        type:'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:vm.financialTJ.ckBalanceMoney
                    }
                ]
            });
          }
        },
        getList:function () {
            var vm=this;
            switch (parseInt(vm.isShow)) {
                case 1:
                    vm.getStorage();
                    break;
                case 2:
                    vm.getPlan();
                    break;
                case 3:
                    vm.getEasy();
                    break;
                case 4:
                    vm.getFinancial();
                    break;
                case 5:
                    vm.getenergyList(0);
                    break;
            
            }
        },
        changeItem:function (num) {
            var vm=this;
            vm.isShow=num;
            // vm.postData={
            //     storehouseGbCode: "",
            //     warehouseGbCode:'',
            //     electricConsumerItem:'',
            //     startTime:'',
            //     endTime:'',
            //     pageSize: 10,
            //     pageNo: 0
            // },
            vm.getList();
            vm.$nextTick(function () {
                vm.drawChart(num);
            });
        },
        getDropDown: function() {//获取下拉项
            var vm = this;
            
            storehouse()
                .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                    vm.storehouseList = ret.data.dataList;
                    ret.data.dataList.forEach(e => {
                        vm.storehouseDX.push({
							"children": "",
							"id": e.storehouseName,
							"label": e.storehouseName
                        });
                    });
                    vm.postData.storehouseGbCode=ret.data.dataList[0].storehouseGbCode;
                    vm.getGranary(ret.data.dataList[0].storehouseGbCode,0);
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
                
            granary().then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                    ret.data.dataList.forEach(e => {
                        vm.granaryDX.push({
							"children": "",
							"id": e.warehouseName,
							"label": e.warehouseName
                        });
                    });
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
        getGranary:function (id,type) {//廒间下拉列表
            var vm = this;
            layer.load(2);
            granary(id).then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                    vm.granaryList = ret.data.dataList;
                    vm.postData.warehouseGbCode=ret.data.dataList[0].warehouseGbCode;
                    if (type==0) {
                        vm.getenergyList();
                    }
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

      },
      mounted() {
        var vm=this;
        vm.getDropDown();
        // vm.drawChart(vm.isShow);
        // vm.getList(1);
      }
    };
</script>
