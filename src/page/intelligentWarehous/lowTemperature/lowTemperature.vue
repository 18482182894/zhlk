<template>
  <div class="content">
    <div class="actions">
      <div class="btn btn-add" @click="$router.push({name: 'lowTemperatureAuto'})">
        <label>低温储量自动模型</label>
      </div>
      <div class="btn btn-add" @click="$router.push({name: 'jobLog'})">
        <label>低温作业记录</label>
      </div>
    </div>
    <!-- <div class="aerationIndex-chart">
      <div class="chart-item" id="Internet-data"></div>
      <div class="chart-item" id="local-data"></div>
      <div class="weather">
        <iframe width="100%" scrolling="no" height="100%" frameborder="0" allowtransparency="true"
                src="//i.tianqi.com/index.php?c=code&id=4&icon=1&wind=1&num=6&site=12"></iframe>
      </div>
    </div> -->
    <div class="granary-info">
      <div class="granary-info-item">
        <div class="select-label">
          <img class="select-label-image" src="../../../../static/images/warehous.png">
          <div class="select-label-value">仓房</div>
        </div>
        <select class="select-style excision" v-model="postData.storehouseGbCode">
          <option
            v-for="item in storehouseList"
            :key="item.storehouseGbCode"
            :value="item.storehouseGbCode"
            v-text="item.storehouseName"/>
        </select>
      </div>
      <div class="granary-info-item">
        <div class="select-label">
          <img class="select-label-image" src="../../../../static/images/warehous.png">
          <div class="select-label-value">廒间</div>
        </div>
        <select class="select-style excision" v-model="postData.warehouseGbCode">
          <option
            v-for="item in granaryList"
            :key="item.warehouseGbCode"
            :value="item.warehouseGbCode"
            v-text="item.warehouseName"/>
        </select>
      </div>
      <div class="granary-info-item">
        <div class="device-label">
          <img class="device-label-image" src="../../../../static/images/cool-machine.png">
          <div class="device-label-value">空&nbsp;&nbsp;&nbsp;调</div>
        </div>
        <div class="device-info">
          <div class="device-info-item">
            <div class="device-info-label">离线</div>
            <div class="device-info-value">{{offLineNum}}</div>
          </div>
          <div class="device-info-item">
            <div class="device-info-label">远程控制</div>
            <div class="device-info-value">{{longRangeControl}}</div>
          </div>
          <div class="device-info-item">
            <div class="device-info-label">现场控制</div>
            <div class="device-info-value">{{sceneControl}}</div>
          </div>
        </div>
      </div>
      <!-- <div class="granary-info-item">
        <div class="device-label">
          <img class="device-label-image" src="../../../../static/images/cool-machine-move.png">
          <div class="device-label-value">移动谷物冷却机</div>
        </div>
        <div class="device-info">
          <div class="device-info-item">
            <div class="device-info-label">离线</div>
            <div class="device-info-value">0</div>
          </div>
          <div class="device-info-item">
            <div class="device-info-label">远程控制</div>
            <div class="device-info-value">0</div>
          </div>
          <div class="device-info-item">
            <div class="device-info-label">现场控制</div>
            <div class="device-info-value">0</div>
          </div>
        </div>
      </div> -->
    </div>
    <div class="granary-pic">
      <div class="granary-pic-left" style="background-image: url('../../../../static/images/warehouse-device-1.png')">
        <div class="cooling">
          <ul class="cooling-machine">
            <li v-for="coolItem in deviceListData"
              :key="coolItem.deviceId"
              :id="coolItem.deviceId"
             >
            </li>
          </ul>
        </div>
      </div>
      <!-- <div class="granary-pic-right">
        <div class="granary-monitor-title">监控画面</div>
        <div class="granary-monitor-container"></div>
      </div> -->
    </div>
    <!-- <DeviceList/> -->
    <DeviceList :deviceList="deviceListData" @on-off="onOffSwitch"/>
  </div>
</template>
<style type="text/css" scoped>
  .actions {
    padding: 30px 30px 30px;
  }

  .granary-info {
    display: flex;
    padding: 0 30px;
  }

  .granary-info-item {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(232, 232, 232, 1);
    padding: 10px;
  }

  .granary-info-item .select-label {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .granary-info-item .select-label-image {
    width: 48px;
    height: 42px;
  }

  .granary-info-item .select-label-value {
    line-height: 28px;
    font-size: 20px;
    color: rgba(51, 51, 51, 1);
  }

  .granary-info-item .select-style {
    width: 110px;
    height: 40px;
    background: #eee;
    margin-left: 10px;
  }

  .granary-info-item .device-label {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50px;
  }

  .granary-info-item .device-label-image {
    width: 50px;
    height: 40px;
  }

  .granary-info-item .device-info {
    margin-left: 10px;
  }

  .granary-info-item .device-info-item {
    display: flex;
    line-height: 24px;
  }

  .granary-info-item .device-info-label {
    width: 60px;
  }

  .granary-info-item .device-info-value {
    width: 30px;
    text-align: right;
  }

  .granary-pic {
    height: auto;
    border: none;
    display: flex;
    justify-content: stretch;
  }

  .granary-pic .granary-pic-left {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 25.7%;
    /* padding-bottom: 18%;
    background: center center no-repeat; */
    background-size: contain;
    overflow: hidden;
  }
  .granary-pic .granary-pic-left .cooling {
    position: absolute;
    top: 30%;
    left: 33%;
    width: 58%;
    height: 50px;
    margin: 0 auto;
    overflow: hidden;
  }
  .granary-pic .granary-pic-left .cooling .cooling-machine {
    display: flex;
    justify-content: space-around;
    height: 50px;
  }
  .granary-pic .granary-pic-left .cooling .cooling-machine li {
    width: 51px;
    height: 44px;
    background-image: url("../../../../static/images/cool-machine.png");
    background-size: contain;
  }

  /* .granary-pic .granary-pic-right {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-left: 5px;
    border: 1px solid #ccc;
    height: auto;
  } */

  /* .granary-monitor-title {
    line-height: 50px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    width: 100% !important;
    height: auto !important;
  } */

  /* .granary-monitor-container {
    flex: 1;
    width: 100% !important;
    height: auto !important;
    background: #00a2d4;
  } */
</style>
<script>
  import DeviceList from '../DeviceList';
  import {storehouse, granary,lowTemList,coolSwitch} from "@/api/systemManage/dropDown";
  import {weatherInfo} from "@/api/intelligentWarehous/aeration"
  export default {
    name: "lowTemperature",
    components: {
      DeviceList,
    },
    data() {
      return {
        postData: {
          storehouseGbCode: '',
          warehouseGbCode: '',
        },
        weatherData: { // 获取互联网天气数据信息所传信息
          appid: '72985319', // 账户ID
          appsecret: 'fUV9Hzl4', // 账户密钥
          version: 'v1', // 接口标识, 固定值: v1
          cityid: '101270402' // 不是必传项，id对应城市三台
        },
        dataList: [],
        networkMeteorologicalData: {
          AcquisitionTimeData: [],
          temperatureData: [],
          humidityData: []
        },
        storehouseList: [],//仓房下拉列表
        granaryList: [],//廒间下拉列表
        deviceListData: [],
        switchPostData: {
          deviceId: '',
          type: ''
        },
        onLineNum: 0,
        offLineNum: 0,
        longRangeControl: 0,
        sceneControl: 0
      };
    },
    methods: {
      getWeather: function() {
        weatherInfo(this.weatherData)
          .then(ret => {
            console.log(ret);
            this.dataList = ret.data[0].hours; 
            var myArr = (this.dataList).map((hours) => ({
              ...hours,
              humidity: ret.data[0].humidity,
            }));
            for(const i in myArr) {
              this.networkMeteorologicalData.humidityData.push(myArr[i].humidity)
            }
            for(const i in this.dataList) {
              this.networkMeteorologicalData.AcquisitionTimeData.push(this.dataList[i].day.slice(3,6));
              this.networkMeteorologicalData.temperatureData.push(this.dataList[i].tem.slice(0,2));
              console.log(this.networkMeteorologicalData.temperatureData)
            }
            this.drawChart();
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      drawChart() {
        this.$echarts
          .init(document.getElementById('Internet-data'))
          .setOption({
            title: {
              text: '互联网气象数据',
              left: 'center',
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['采样温度(℃)', '采样湿度(%)'],
              bottom: 10,
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              // data: ['10:26', '10:33', '10:40', '10:55', '11:02', '11:09', '11:16', '11:24', '11:31', '11:38']
              data: this.networkMeteorologicalData.AcquisitionTimeData
            },
            yAxis: {
              type: 'value',
              axisLabel: {
                formatter: '{value} °C'
              }
            },
            series: [
              {
                name: '采样温度(℃)',
                type: 'line',
                smooth: true,
                // data: [25, 25.5, 25.7, 26, 26.2, 26.3, 26.5, 26.5, 26.6, 26.7]
                data: this.networkMeteorologicalData.temperatureData
              },
              {
                name: '采样湿度(%)',
                type: 'line',
                smooth: true,
                // data: [36, 30, 30, 31, 32, 33, 34, 33, 32, 32, 33, 29, 27]
                data: this.networkMeteorologicalData.humidityData
              }
            ]
          });
        this.$echarts
          .init(document.getElementById('local-data'))
          .setOption({
            title: {
              text: '本地气象站数据',
              left: 'center',
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['采样温度(℃)', '采样湿度(%)'],
              bottom: 10,
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: ['10:26', '10:33', '10:40', '10:55', '11:02', '11:09', '11:16', '11:24', '11:31', '11:38']
            },
            yAxis: {
              type: 'value',
              axisLabel: {
                formatter: '{value} °C'
              }
            },
            series: [
              {
                name: '采样温度(℃)',
                type: 'line',
                smooth: true,
                data: [25, 25.5, 25.7, 26, 26.2, 26.3, 26.5, 26.5, 26.6, 26.7]
              },
              {
                name: '采样湿度(%)',
                type: 'line',
                smooth: true,
                data: [36, 30, 30, 31, 32, 33, 34, 33, 32, 32, 33, 29, 27]
              }
            ]
          });
      },
      getStorehouse() { // 获取仓房列表
        storehouse('')
          .then((ret) => {
            if (ret.code == 200) {
              this.storehouseList = ret.data.dataList;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      getGranary(code) { // 获取廒间列表
        granary(code)
          .then((ret) => {
            if (ret.code == 200) {
              this.granaryList = ret.data.dataList;
              this.postData.warehouseGbCode=this.granaryList[0].warehouseGbCode;
              this.getList(this.postData.warehouseGbCode);
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
       getList: function(warehouseGbCode) {
        //获取列表
        var vm = this;
        layer.load(2);
        lowTemList({warehouseGbCode, funcPositionName: '低温储粮'})
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              // vm.listData = ret.data.dataList;
              // console.log(vm.listData);
              this.deviceListData = (ret.data.dataList || []).map((device) => ({
                ...device,
                onOffSwitch: device.onlineStatus,
                controllerStatus: device.controllerStatus,
                switchTime: "0"
              }))
              console.log(this.deviceListData)
              for(let i in this.deviceListData) {
                if(this.deviceListData[i].onlineStatus == '1') {
                  this.onLineNum += 1
                } else{
                  this.offLineNum += 1
                }
                if(this.deviceListData[i].controllerStatus == '1') {
                  this.longRangeControl += 1
                }else{
                  this.sceneControl += 1
                }
              }
              console.log(this.onLineNum,this.offLineNum)

            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      onOffSwitch (data) {
        console.log(data)
        this.deviceListData.forEach(item => {
          if(item.deviceId == data.deviceId) {
            this.switchPostData.deviceId = data.deviceId;
            this.switchPostData.type = data.onOffSwitch;
          }
        });
        this.coolingSwitch();
      },
      coolingSwitch () {
        console.log(this.switchPostData)
        coolSwitch (this.switchPostData)
          .then((ret) => {
            if(ret.code == 200) {
              console.log('开关指令发送成功');
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      }
    },
    watch: {
      'postData.storehouseGbCode'(newCode, oldCode) { // 监听仓房变化获取廒间列表
        if (newCode && newCode !== oldCode) {
          if (!this.storehouseChangeByInit) {
            this.postData.warehouseGbCode = '';
          }
          this.granaryList = [];
          this.getGranary(newCode);
        }
      },
    },
    mounted() {
      this.getStorehouse();
      // this.drawChart();
      // this.getWeather();
    }
  };

</script>
