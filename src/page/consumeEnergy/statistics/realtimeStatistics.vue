<template>
  <div class="content">
    <div class="menuManage operationLog ">
      <div class="lookup">
        仓房：
        <select class="select-style excision" v-model="postData.storehouseGbCode"@change="getGranary(postData.storehouseGbCode);">
          <option value=''>请选择</option>
          <option :value="item.storehouseGbCode" v-for="item in storehouseList" v-text="item.storehouseName"></option>
        </select>
        廒间：
        <select class="select-style excision" v-model="postData.warehouseGbCode">
          <option value=''>请选择</option>
          <option :value="item.warehouseGbCode" v-for="item in granaryList" v-text="item.warehouseName"></option>
        </select>
        <div class="btn btn-add" @click="getList(0);">
          <img src="../../../../static/images/search.png" alt="">
          <label>查找</label>
        </div>
      </div>
      <div class="energy-statistics">
          <div class="statistics-item" id="chart1"></div>
      </div>
    </div>
  </div>
</template>
<style type="text/css" scoped>
  .lookup{
    display: none;
  }
  .excision{
    margin-right: 2rem;
  }
  #chart1{
    height: 600px;
    width: 100%;
    padding: 2rem;
  }
</style>
<script>
import { realTimeData } from "@/api/energyConsumption/public";
import { graindepot, storehouse, granary, cargo} from "@/api/systemManage/dropDown";


export default {
  name: "realtimeStatistics",
  data() {
    return {
      postData: {
        storehouseGbCode: '',
        warehouseGbCode:'',
        pageSize: 10,
        pageNo: 0
      },
      listData: [],
      powerList:{
        warehouseName:[],
        data:[]
      },
     /* pieChartOfTotalElectricityConsumption:{
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
      },*/
      storehouseList:[],//仓房下拉列表
      granaryList:[],//廒间下拉列表
    };
  },
  methods: {
    /*changeSortOrder: function() {//倒序
      var vm = this;
      vm.listData.reverse();
    },*/
    getList: function(pageNo) {
      //获取列表
      var vm = this;
      layer.load(2);
      realTimeData(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
              //仓房耗能统计
            vm.powerList={
              warehouseName:[],
              data:[]
            };
            if (ret.data.powerList!=''||ret.data.powerList!=null) {
              for (var i = 0; i < ret.data.powerList.length; i++) {
                //console.log(ret.data.powerList[i].warehouseName);
                vm.powerList.warehouseName.push(ret.data.powerList[i].warehouseName);
                vm.powerList.data.push({
                  value:ret.data.powerList[i].powerComsume,
                  name:ret.data.powerList[i].warehouseName
                });
              }
            }
              /*vm.pieChartOfTotalElectricityConsumption={
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
              if (ret.data.totalInterSections!=''||ret.data.totalInterSections!=null) {
                for (var i = 0; i < ret.data.totalInterSections.length; i++) {
                  vm.totalInterSections.data.push({
                    value:ret.data.totalInterSections[i].sumTotalEnergyConsumption,
                    name:ret.data.totalInterSections[i].electricConsumerItem
                  });
                }
              }
              vm.totalInterSections.storehouseName=ret.data.totalInterSections[0].storehouseName;
              vm.totalInterSections.warehouseName=ret.data.totalInterSections[0].warehouseName;*/
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
              text: '能耗实时监控',
              subtext: '',
              x:'left'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          toolbox: {
            feature: {
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          legend: {
              orient: 'vertical',
              left: 'center',
              data: ['电量','水量']
          },
          xAxis: [
            {
              type: 'category',
              data: vm.powerList.warehouseName,
              axisPointer: {
                type: 'shadow'
              },
              axisLabel: {
                interval: 0,
                formatter:function(value)
                {
                  //debugger
                  var ret = "";//拼接加\n返回的类目项
                  var maxLength = 5;//每项显示文字个数
                  var valLength = value.length;//X轴类目项的文字个数
                  var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                  if (rowN > 1)//如果类目项的文字大于3,
                  {
                    for (var i = 0; i < rowN; i++) {
                      var temp = "";//每次截取的字符串
                      var start = i * maxLength;//开始截取的位置
                      var end = start + maxLength;//结束截取的位置
                      //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                      temp = value.substring(start, end) + "\n";
                      ret += temp; //凭借最终的字符串
                    }
                    return ret;
                  }
                  else {
                    return value;
                  }
                }
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '电量',
              axisLabel: {
                formatter: '{value} Kw/h'
              }
            },
            {
              type: 'value',
              name: '水量',
              axisLabel: {
                formatter: '{value} m^3'
              }
            },
          ],
          series : [
            {
              name:'电量',
              type:'bar',
              data:vm.powerList.data,
              //data:[1,10,15,20,18,0,16,1,9,8,10,11,12,14]
            },
            {
              name:'水量',
              type:'bar',
              data:vm.powerList.data,
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
            //console.log(ret)
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
        //vm.getList();
  },
};

</script>

