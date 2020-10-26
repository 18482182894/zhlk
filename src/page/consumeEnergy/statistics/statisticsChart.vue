<template>
  <div class="content">
    <div class="menuManage operationLog ">
      <div class="lookup">
        仓房：
        <select class="select-style excision" v-model="postData.storehouseGbCode"  @change="getGranary(postData.storehouseGbCode);">
            <option value=''>请选择</option>
            <option :value="item.storehouseGbCode" v-for="item in storehouseList" v-text="item.storehouseName"></option>
        </select>
        廒间：
        <select class="select-style excision" v-model="postData.warehouseGbCode">
            <option value=''>请选择</option>
            <option :value="item.warehouseGbCode" v-for="item in granaryList" v-text="item.warehouseName"></option>
        </select>
        用电项目：
        <select class="select-style excision" v-model="postData.electricConsumerItem">
            <option value=''>请选择</option>
            <option value="1" >熏蒸作业</option>
            <option value="2" >通风作业</option>
            <option value="3" >低温储粮</option>
            <option value="4" >值仓</option>
            <option value="5" >其它</option>
        </select>
          时间：
          <input type="text" class="input-text Wdate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" id="startTime">~
          <input type="text" class="input-text Wdate excision" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" id="endTime">
        <div class="btn btn-add" @click="getList(0);">
          <img src="../../../../static/images/search.png" alt="">
          <label>查找</label>
        </div>
      </div>
      <div>
        <div class="btn btn-auto" @click="jumpList();">
          <label>统计列表</label>
        </div>
      </div>
      <div class="energy-statistics">
          <div class="statistics-item" id="chart1"></div>
          <div class="statistics-item" id="chart2"></div>
          <div class="statistics-item" style="width: 100%;" id="chart3"></div>
      </div>
    </div>
  </div>
</template>
<style type="text/css" scoped>
  .excision{
    margin-right: 2rem;
  }
  .energy-statistics {
    padding-bottom: 2rem
  }
</style>
<script>
import { energyStatisticsReport, } from "@/api/energyConsumption/public";
import { graindepot, storehouse, granary, cargo} from "@/api/systemManage/dropDown";  


export default {
  name: "document",
  data() {
    return {
      sortOrder: "0", //0 顺序，1 倒序
      postData: {
        storehouseGbCode: "",
        warehouseGbCode:'',
        electricConsumerItem:'',
        startTime:'',
        endTime:'',
        pageSize: 10,
        pageNo: 0
      },
      listData: [],
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
      storehouseList:[],//仓房下拉列表
      granaryList:[],//廒间下拉列表
    };
  },
  methods: {
    changeSortOrder: function() {//倒序
      var vm = this;
      vm.listData.reverse();
    },
    getList: function(pageNo) {
      //获取列表
      var vm = this;
      vm.postData.pageNo=pageNo;
      vm.postData.startTime=$('#startTime').val();
      vm.postData.endTime=$('#endTime').val();
      layer.load(2);
      energyStatisticsReport(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
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
              if (ret.data.totalInterSections && ret.data.totalInterSections != null) { 
                for (var i = 0; i < ret.data.totalInterSections.length; i++) {
                  vm.totalInterSections.data.push({
                    value:ret.data.totalInterSections[i].sumTotalEnergyConsumption,
                    name:ret.data.totalInterSections[i].electricConsumerItem
                  });
                }
                vm.totalInterSections.storehouseName=ret.data.totalInterSections[0].storehouseName;
                vm.totalInterSections.warehouseName=ret.data.totalInterSections[0].warehouseName;
              }

              // vm.totalInterSections.storehouseName=ret.data.totalInterSections[0].storehouseName;
              // vm.totalInterSections.warehouseName=ret.data.totalInterSections[0].warehouseName;



              vm.drawingCharts();
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
    drawingCharts:function () {
      var vm=this;

              var myChart1=this.$echarts.init(document.getElementById('chart1'));
              myChart1.setOption({
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

              var myChart2=this.$echarts.init(document.getElementById('chart2'));              
              myChart2.setOption({
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

              var myChart3=this.$echarts.init(document.getElementById('chart3'));
              
              myChart3.setOption({
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
      
    },
    jumpList:function () {
      //跳转到新增
      var vm = this;
      this.$router.push({
        name: "consumeEnergy_statisticsList"
      });      
    },
    getDropDown: function() {//获取下拉项
      var vm = this;
      
      storehouse()
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            console.log(ret)
            vm.storehouseList = ret.data.dataList;
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
                vm.getList(1);
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
        var vm = this;
        vm.getDropDown();
  },
};

</script>

