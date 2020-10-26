<template>
  <div class="content">
    <div class="menuManage operationLog ">
      <div class="lookup">
        时间：
        <input type="text" class="input-text Wdate" onclick="WdatePicker({maxDate:'%y-%M-%d'})" id="checkDatetime"/>
        <div class="btn btn-add" @click="getList(1);">
          <img src="../../../../static/images/search.png" alt="">
          <label>查找</label>
        </div>
      </div>
      <div>
        <div class="btn btn-add" @click="jumpAdd();">
          <img src="../../../../static/images/add.png" alt="">
          <label>新增模型</label>
        </div>
        <select name="" class="select-style" v-model="sortOrder" @change="changeSortOrder();">
          <option value="">排序方式</option>
          <option value="0">顺序</option>
          <option value="1">倒序</option>
        </select>
      </div>
      
      <div id="container" class="container"></div>
      <div id="containerOne" class="container"></div>
      <div id="containerTwo" class="container"></div>
      <table class="customTable">
        <thead>
        <tr>
          <th style="width:2.5%;"><input type="checkbox"/></th>
          <th style="width:2.5%;">序号</th>
          <th style="width:7.5%;">检测时间</th>
          <th style="width:7.5%;">温度</th>
          <th style="width:10%;">湿度</th>
          <th style="width:5%;">风速</th>
          <th style="width:5%;">雨量</th>
          <th style="width:5%;">气压</th>
          <th style="width:5%;">风向</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,i) in listData">
          <td><input type="checkbox"/></td>
          <td v-if="sortOrder=='0'" v-text="i+1"></td>
          <td v-else v-text="listData.length-i"></td>
          <td v-text="item.checkDatetime"></td>
          <td v-text="item.temperature"></td>
          <td v-text="item.humidity"></td>
          <td v-text="item.windSpeed"></td>
          <td v-text="item.rainNum"></td>
          <td v-text="item.pressure"></td>
          <td v-text="item.windDirection"></td>
        </tr>
        </tbody>
      </table>
      <!-- &lt;!&ndash; 分页容器 &ndash;&gt; -->
      <div id="PageBar"></div>
    </div>
	<div class="copyright">
		<p>Copyright © 四川百威智联科技有限公司 © 版权所有 电话：028-62631082</p>
	</div>
  </div>
</template>
<style scoped>
  .container{
    height:500px;
    width: 30%;
    margin:1% 2% 0 0;
    display: inline-block;
  }
</style>
<script>
  import {fetchWeatherList} from "@/api/intelligentWarehous/weather";

  export default {
    name: "weather",
    data() {
      return {
        sortOrder: "0", //0 顺序，1 倒序
        postData: {
          checkDatetime1: "",
          pageSize: 10,
          pageNo: 0
        },
        listData: []
      };
    },
    methods: {
      changeSortOrder() {//倒序
        this.listData.reverse();
      },
      getList(pageNo) {//获取列表
        var vm = this;
        var timeData=[];
        var pressure=[];
        var rainNum=[];
        var temperature=[];
        var humidity=[];
        var windSpeed='';
        var windDirection='';
        var option = null;
        vm.postData.pageNo = pageNo;
        vm.postData.checkDatetime1 = document.getElementById('checkDatetime').value;
        layer.load(2);
        fetchWeatherList(vm.postData)
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
                jump: function (obj, first) {
                  //触发分页后的回调
                  if (!first) {
                    //一定要加此判断，否则初始时会无限刷新
                    vm.getList(obj.curr);
                  }
                }
              });
              //雨量和气压
              //检测时间
              for(var i=0;i<=vm.listData.length-1;i++){
                timeData[i]=vm.listData[i].checkDatetime;
              }
              //气压
              for(var i=0;i<=vm.listData.length-1;i++){
                pressure[i]=vm.listData[i].pressure;
              }
              //雨量
              for(var i=0;i<=vm.listData.length-1;i++){
                if(vm.listData[i].rainNum =='无'){
                  rainNum[i]=0;
                }else{
                  // rainNum[i]=1;
                  rainNum[i]=vm.listData[i].rainNum;
                }
              }
              //风速
              /*for(var i=0;i<=vm.listData.length-1;i++){
                windSpeed[i]=vm.listData[9].windSpeed;
              }*/
              if(vm.listData[0].windSpeed == 'info_error') {
                vm.listData[0].windSpeed = ''
              }
              windSpeed=Number(vm.listData[0].windSpeed);
              //风向
              /*for(var i=0;i<=vm.listData.length-1;i++){
                windDirection[i]=vm.listData[i].windDirection;
              }*/
              if(vm.listData[0].windDirection == 'info_error') {
                vm.listData[0].windDirection = ''
              }
              windDirection=vm.listData[0].windDirection;
              /*var timeData = [
                 '2009/6/12 2:00', '2009/6/12 3:00', '2009/6/12 4:00', '2009/6/12 5:00', '2009/6/12 6:00'];*/
              //温度
              for(var i=0;i<=vm.listData.length-1;i++){
                temperature[i]=vm.listData[i].temperature;
              }
              //温度
              for(var i=0;i<=vm.listData.length-1;i++){
                humidity[i]=vm.listData[i].humidity;
              }
              timeData = timeData.map(function (str) {
                return str.replace('2018/', '');
              });
              option={
                title: {
                  text: '雨量气压图',
                  //subtext: '数据来自西安兰特水电测控技术有限公司',
                  x: 'center'
                },
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    animation: false
                  }
                },
                legend: {
                  data:['气压','雨量'],
                  x: 'left'
                },
                toolbox: {
                  feature: {
                    dataZoom: {
                      yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                  }
                },
                axisPointer: {
                  link: {xAxisIndex: 'all'}
                },
                dataZoom: [
                  {
                    show: true,
                    realtime: true,
                    start: 30,
                    end: 70,
                    xAxisIndex: [0, 1]
                  },
                  {
                    type: 'inside',
                    realtime: true,
                    start: 30,
                    end: 70,
                    xAxisIndex: [0, 1]
                  }
                ],
                grid: [{
                  left: 50,
                  right: 50,
                  height: '35%'
                }, {
                  left: 50,
                  right: 50,
                  top: '55%',
                  height: '35%'
                }],
                xAxis : [
                  {
                    type : 'category',
                    boundaryGap : false,
                    axisLine: {onZero: true},
                    data: timeData
                  },
                  {
                    gridIndex: 1,
                    type : 'category',
                    boundaryGap : false,
                    axisLine: {onZero: true},
                    data: timeData,
                    position: 'top'
                  }
                ],
                yAxis : [
                  {
                    name : '气压(hpa)',
                    type : 'value',
                    max : 1500
                  },
                  {
                    gridIndex: 1,
                    name : '雨量(mm)',
                    type : 'value',
                    inverse: true
                  }
                ],
                series : [
                  {
                    name:'气压',
                    type:'line',
                    symbolSize: 8,
                    hoverAnimation: false,
                    data:pressure
                    /*data:[
                      0.97,0.96,0.96,0.95,0.95]*/
                  },
                  {
                    name:'雨量',
                    type:'line',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    symbolSize: 8,
                    hoverAnimation: false,
                    data:rainNum
                    /*data: [
                     0.005,0.017,0.017,0.017,0.017]*/
                  }
                ]
              };;
              if (option && typeof option === "object") {
                vm.$echarts.init(document.getElementById('container')).setOption(option, true);
              }
              //风向和风速
              option = {
                title:{
                  text:'风向和风速图'
                },
                tooltip : {
                  formatter: "{a} <br/>{b} : {c}%"
                },
                toolbox: {
                  feature: {
                    restore: {},
                    saveAsImage: {}
                  }
                },
                series: [
                  {
                    name: '业务指标',
                    type: 'gauge',
                    detail: {formatter:'{value}m/s'},
                    data: [{value:windSpeed, name:windDirection}]
                  }
                ]
              };
              if (option && typeof option === "object") {
                vm.$echarts.init(document.getElementById('containerOne')).setOption(option, true);
              }
              //温度和湿度
              //console.log(temperature,humidity)
              option = {
                title: {
                  text: '温度和湿度图',
                  //subtext: '纯属虚构'
                },
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    type: 'cross',
                    label: {
                      backgroundColor: '#283b56'
                    }
                  }
                },
                legend: {
                  data:['温度', '湿度']
                },
                toolbox: {
                  show: true,
                  feature: {
                    dataView: {readOnly: false},
                    restore: {},
                    saveAsImage: {}
                  }
                },
                dataZoom: {
                  show: false,
                  start: 0,
                  end: 100
                },
                xAxis: [
                  {
                    type: 'category',
                    boundaryGap: true,
                    // data: (function (){
                    //   var now = new Date();
                    //   var res = [];
                    //   var len = 10;
                    //   while (len--) {
                    //     res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                    //     now = new Date(now - 2000);
                    //   }
                    //   return res;
                    // })()
                    data: timeData
                  },
                  {
                    type: 'category',
                    boundaryGap: true,
                    // data: (function (){
                    //   var res = [];
                    //   var len = 10;
                    //   while (len--) {
                    //     res.push(10 - len - 1);
                    //   }
                    //   return res;
                    // })()
                    data: timeData
                  }
                ],
                yAxis: [
                  {
                    type: 'value',
                    scale: true,
                    name: '温度',
                    max: 80,
                    min: -20,
                    boundaryGap: [0.2, 0.2]
                  },
                  {
                    type: 'value',
                    scale: true,
                    name: '湿度',
                    // max: 1200,
                    min: 0,
                    boundaryGap: [0.2, 0.2]
                  }
                ],
                series: [
                  {
                    name:'湿度',
                    type:'bar',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    data:humidity
                    /*(function (){
                      var res = [];
                      var len = 10;
                      while (len--) {
                        res.push(Math.round(Math.random() * 1000));
                      }
                      return res;
                    })()*/
                  },
                  {
                    name:'温度',
                    type:'line',
                    data:temperature
                    /*(function (){
                      var res = [];
                      var len = 0;
                      while (len < 10) {
                        res.push((Math.random()*10 + 5).toFixed(1) - 0);
                        len++;
                      }
                      return res;
                    })()*/
                  }
                ]
              };
              app.count = 11;
              // setInterval(function (){
              //   var axisData = timeData;
              //   var data0 = option.series[0].data;
              //   var data1 = option.series[1].data;
              //   data0.shift();
              //   data0.push(Math.round(Math.random() * 1000));
              //   data1.shift();
              //   data1.push((Math.random() * 10 + 5).toFixed(1) - 0);

              //   option.xAxis[0].data.shift();
              //   option.xAxis[0].data.push(axisData);
              //   option.xAxis[1].data.shift();
              //   option.xAxis[1].data.push(app.count++);
              //   vm.$echarts.init(document.getElementById('containerTwo')).setOption(option);
              // }, 2100);
              if (option && typeof option === "object") {
                vm.$echarts.init(document.getElementById('containerTwo')).setOption(option, true);
              }
            } else {
              if (ret.code == "500" && ret.data == "查询错误，没有数据") {
                layer.msg("暂无数据");
                vm.listData = [];
              } else {
                layer.alert(ret.data, {closeBtn: 0});
              }
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      jumpAdd() {
        this.$router.push({
          name: "weatherEdit",
          query: {postData:this.postData}
        });
      },
    },
    mounted() {
      if(this.$route.query.postData){
        this.postData=this.$route.query.postData;
        $("#checkDatetime").val(this.postData.checkDatetime);
      }
      this.getList(this.postData.pageNo);
      /*if (option && typeof option === "object") {
        myChart.setOption(option, true);
      }*/
    }
  };

</script>
