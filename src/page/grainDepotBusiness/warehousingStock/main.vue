<template>
  <div class="content">
    <div class="desktop-middle">
      <!-- <div class="desktop-item">
          <img src="" alt="">
          <p>电子邮件</p>
      </div> -->
      <div class="desktop-item" toUrl="/business/warehousingStock/inventoryAccount" @click="jump($event);">
        <img src="../../../../static/images/cckc-kctz.png" height="160" width="160" alt="">
        <p>库存台账</p>
      </div>
      <div class="desktop-item" toUrl="/business/warehousingStock/qualitative" @click="jump($event);">
        <img src="../../../../static/images/cckc-dxgl.png" height="160" width="160" alt="">
        <p>定性管理</p>
      </div>
      <div class="desktop-item" toUrl="/business/warehousingStock/profitAndLoss" @click="jump($event);">
        <img src="../../../../static/images/cckc-sygl.png" height="160" width="160" alt="">
        <p>损溢管理</p>
      </div>
      <div class="desktop-item" toUrl="/business/warehousingStock/transfer" @click="jump($event);">
        <img src="../../../../static/images/cckc-yjgl.png" height="160" width="160" alt="">
        <p>移交管理</p>
      </div>
      <div class="desktop-item" toUrl="/business/warehousingStock/reverse" @click="jump($event);">
        <img src="../../../../static/images/cckc-dczy.png" height="160" width="160" alt="">
        <p>倒仓作业</p>
      </div>
      <div class="desktop-item" toUrl="/business/warehousingStock/stockChecks" @click="jump($event);">
        <img src="../../../../static/images/cckc-kcpd.png" height="160" width="160" alt="">
        <p>库存盘点</p>
      </div>
      <div class="desktop-item" toUrl="/business/warehousingStock/account" @click="jump($event);">
        <img src="../../../../static/images/cckc-fcbgz.png" height="160" width="160" alt="">
        <p>分仓保管帐</p>
      </div>
      <div class="desktop-item" toUrl="/business/warehousingStock/generalLedger" @click="jump($event);">
        <img src="../../../../static/images/cckc-kczz.png" height="160" width="160" alt="">
        <p>库存总账</p>
      </div>
      <div class="desktop-item" toUrl="/business/warehousingStock/tankInventory" @click="jump($event);">
        <img src="../../../../static/images/cckc-kctj.png" height="160" width="160" alt="">
        <p>油罐库存</p>
      </div>
    </div>
    <div class="storage-map">
      <div class="storage-title">
        <div class="storage-title-item" v-for="item in grainVarietyList">
          <em class="sti-color" :style="'background: '+item.color+';'"></em>
          <label v-text="item.grainVarietyName"></label>
        </div>
      </div>
      <div class="storage-main">
        <div class="img2d">
          <img src="../../../../static/images/show-2d.jpg" alt="">
        </div>
        <!-- 气泡 -->
        <div class="bubble" v-for="item in granaryList" :style="'top:'+(item.Y-60)+'px;left:'+(item.X-25)+'px;'"@click="jumpDetail(item.warehouseGbCode);">
          <div class="bubble-top" :style="'background:'+item.color"></div>
          <div class="bubble-bottom" :style="'background:'+item.color"></div>
          <div class="bubble-center">
            <div :class="item.actualCapacity/item.capacity<=0.5?'left':'right'">
              <div v-if="item.actualCapacity/item.capacity<=0.5" class="left-after" :style="'transform: rotate('+item.actualCapacity/item.capacity*360+'deg)'"></div>
              <div v-else class="right-after" :style="'transform: rotate('+((item.actualCapacity/item.capacity)-0.5)*360+'deg)'"></div>
            </div>
            <div v-if="item.actualCapacity/item.capacity>0.5" class="right-left"></div>
            <div class="bubble-center-text" v-text="(item.actualCapacity/item.capacity*100).toFixed(2)+'%'" :title="item.warehouseName" ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="chart-box">
      <div class="chart-item" id="chart1">

      </div>
      <div class="chart-item" id="chart2">

      </div>
      <div class="chart-item" id="chart3">

      </div>
      <div class="chart-item" id="chart4">

      </div>
    </div>
  </div>
</template>
<style type="text/css" scoped>
  .img2d{
    width: 1658px;
    height:896px;
  }
  .img2d img{
    width: 100%;
    height:100%;
  }
  .desktop-middle{
    padding: 20px 30px 25px 30px;
  }
  .desktop-middle .desktop-item{
    width: 11.1%;
  }
  .storage-map{
    height: 600px;
    overflow: auto;
  }
  .storage-main{
    position: relative;
  }
  .chart-box .chart-item{
    width: 32%;
  }
</style>
<script>
  import { inventoryRatio, volumeRatio, varietyStatistics, propertyStatistics, physicalInventory,stockMainData } from "@/api/business/warehousingStock/stockMain";
  export default {
    name: 'desktop',
    data () {
      return {
        volumeRatioData:{
          dataList:[],
        },
        varietyStatisticsData:{
          grainKindList:[],
          dataList:[]
        },
        propertyData:{
          attrList:[],
          dataList:[]
        },
        InventoryData:{
          yearList:[],
          dataList:[]
        },
        colorList:['#005757','#ff0000','#8f00d2','#F2E252','#007AAE','#C785C8','#44000A','#808080','#BFB500','#00B0F0','#DAAADB'],
        grainVarietyList:[],
        granaryList:[],
      }
    },
    methods: {
      getCountData:function () {
        var vm=this;
        volumeRatio({}).then(ret => {//获取仓容总占比
          layer.closeAll("loading");
          console.log(JSON.stringify(ret))
          if (ret.code == 200) {
            vm.volumeRatioData.dataList.push({
              value:ret.data.dataList[0].totalActualCapacity-ret.data.dataList[0].totalCurrentQuantity,
              name:'剩余容量'
            });
            vm.volumeRatioData.dataList.push({
              value:ret.data.dataList[0].totalCurrentQuantity,
              name:'当前容量'
            });

            console.log(JSON.stringify( vm.volumeRatioData.dataList))
            vm.drawChart(1);
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        }).catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
        varietyStatistics({}).then(ret => {//获取存粮品种统计
          layer.closeAll("loading");
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret.data.dataList))
            for (var i = 0; i < ret.data.dataList.length; i++) {
              vm.varietyStatisticsData.grainKindList.push(ret.data.dataList[i].grainKind);
              vm.varietyStatisticsData.dataList.push(ret.data.dataList[i].totalCurrenQuantity
              );
            }
            console.log(JSON.stringify(vm.varietyStatisticsData))
            vm.drawChart(2);
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        }).catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
        propertyStatistics({}).then(ret => {//获取存粮性质统计
          layer.closeAll("loading");
          if (ret.code == 200) {
            for (var i = 0; i < ret.data.dataList.length; i++) {
              vm.propertyData.attrList.push(ret.data.dataList[i].grainAttribute);
              vm.propertyData.dataList.push(ret.data.dataList[i].totalCurrenQuantity
              );
            }
            console.log(JSON.stringify(vm.propertyData))
            vm.drawChart(3);
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        }).catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
        physicalInventory({}).then(ret => {//获取分年限实际库存
          layer.closeAll("loading");
          console.log(JSON.stringify(ret))
          if (ret.code == 200) {
            if (ret.data.dataList==[]) {
              for (var i = 0; i < ret.data.dataList.length; i++) {
                vm.InventoryData.yearList.push(ret.data.dataList[i].stateYear);
                vm.InventoryData.dataList.push({
                  value:ret.data.dataList[i].actualCapacity,
                  name:ret.data.dataList[i].stateYear
                });
              }
              // console.log(JSON.stringify(vm.propertyData))
              vm.drawChart(4);
            }else{
              $('#chart4').hide();
            }
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        }).catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
      },
      drawChart:function (num) {
        var vm=this;
        if (num==1) {
          var myChart1=this.$echarts.init(document.getElementById('chart1'));
          myChart1.setOption({
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
              orient: 'vertical',
              x: 'left',
              data:['剩余容量','当前容量']
            },
            series: [
              {
                name:'仓容总占比',
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
                data:vm.volumeRatioData.dataList
              }
            ]
          });
        }
        if (num==2) {
          //console.log(vm.varietyStatisticsData.grainKindList)
          var myChart2=this.$echarts.init(document.getElementById('chart2'));
          myChart2.setOption({
            title: {
              text: '存粮品种统计'
            },
            color: ['#3398DB'],
            tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis : [
              {
                type : 'category',
                axisLabel: {
                  interval: 0,
                  formatter:function(value)
                  {
                    // debugger
                    var ret = "";//拼接加\n返回的类目项
                    var maxLength = 2;//每项显示文字个数
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
                },
                data : vm.varietyStatisticsData.grainKindList,
                axisTick: {
                  alignWithLabel: true
                }
              }
            ],
            yAxis : [
              {
                type : 'value'
              }
            ],
            series : [
              {
                name:'存粮品种统计',
                type:'bar',
                barWidth: '60%',
                data:vm.varietyStatisticsData.dataList
              }
            ]
          });
        }
        if (num==3) {
          var myChart3=this.$echarts.init(document.getElementById('chart3'));
          myChart3.setOption({
            title: {
              text: '存粮性质统计'
            },
            color: ['#3398DB'],
            tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis : [
              {
                type : 'category',
                axisLabel: {
                  interval: 0,
                  formatter:function(value)
                  {
                    // debugger
                    var ret = "";//拼接加\n返回的类目项
                    var maxLength = 2;//每项显示文字个数
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
                },
                data : vm.propertyData.attrList,
                axisTick: {
                  alignWithLabel: true
                }
              }
            ],
            yAxis : [
              {
                type : 'value'
              }
            ],
            series : [
              {
                name:'存粮性质统计',
                type:'bar',
                barWidth: '60%',
                data:vm.propertyData.dataList
              }
            ]
          });
        }
        if (num==4) {
          var myChart4=this.$echarts.init(document.getElementById('chart4'));
          myChart4.setOption({
            title : {
              text: '分年限实际库存',
              x:'center'
            },
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: vm.InventoryData.yearList
            },
            series : [
              {
                name: '分年限实际库存',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:vm.InventoryData.dataList,
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
        }
      },
      jump (event) {
        var vm=this;
        var dom=event.currentTarget;
        var url = dom.getAttribute('toUrl');
        console.log('dom', dom)
        console.log('url', url)
        this.$router.push(url);
      },
      jumpDetail:function(id){
        var vm = this;
        vm.$router.push({
          name: "storageDetails",
          query: {
            id: id
          }
        });
      },
      getInfo:function (){
        var vm=this;
        stockMainData({}).then(ret => {//库存首页数据
          layer.closeAll("loading");
          if (ret.code == 200) {
            ret.data.grainList.forEach((element,i) => {
              vm.grainVarietyList.push({
                grainVarietyName:element,
                color:vm.colorList[i]
              });
            });
             //console.log(vm.grainVarietyList);
            ret.data.dataList.forEach((element,i) => {
              vm.grainVarietyList.forEach((item,j) =>{
                if (element.grainVarietyName==item.grainVarietyName) {
                  vm.granaryList.push({
                    capacity:element.capacity,
                    actualCapacity:element.actualCapacity,
                    X:element.x,
                    Y:element.y,
                    warehouseName:element.warehouseName,
                    warehouseGbCode:element.warehouseGbCode,
                    grainVarietyName:element.grainVarietyName,
                    color:item.color
                  });
                }
              });
            });
            // console.log(vm.grainVarietyList);
            // console.log(vm.granaryList)
          } else {
            // layer.alert(ret.data, { closeBtn: 0 });
          }
        }).catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });

      }

    },
    mounted() {
      var vm=this;
      vm.getInfo();
      vm.getCountData();
      vm.drawChart();
    },
  }

</script>
