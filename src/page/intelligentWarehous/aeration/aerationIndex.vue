<template>
  <div class="content">
    <div class="actions">
      <div class="btn btn-add" @click="$router.push({name: 'aerationSet'})">
        <label>通风设置</label>
      </div>
      <div class="btn btn-add" @click="$router.push({name: 'aerationAuto'})">
        <label>通风自动操作</label>
      </div>
      <div class="btn btn-add" @click="$router.push({name: 'aerationTask'})">
        <label>通风作业</label>
      </div>
    </div>
    <!-- <div class="aerationIndex-chart">
      <div class="chart-item" id="Internet-data"></div>
      <div class="chart-item" id="local-data"></div>
      <div class="weather">
        <iframe
          width="100%"
          scrolling="no"
          height="100%"
          frameborder="0"
          allowtransparency="true"
          src="//i.tianqi.com/index.php?c=code&id=4&icon=1&wind=1&num=6&site=12"
        ></iframe>
      </div>
    </div> -->
    <div class="granary-info">
      <div class="granary-info-item">
        <div class="select-label">
          <img class="select-label-image" src="../../../../static/images/warehous.png" />
          <div class="select-label-value">仓房</div>
        </div>
        <select class="select-style excision" v-model="postData.storehouseGbCode">
          <option
            v-for="item in storehouseList"
            :key="item.storehouseGbCode"
            :value="item.storehouseGbCode"
            v-text="item.storehouseName"
          />
        </select>
      </div>
      <div class="granary-info-item">
        <div class="select-label">
          <img class="select-label-image" src="../../../../static/images/warehous.png" />
          <div class="select-label-value">廒间</div>
        </div>
        <select
          class="select-style excision"
          v-model="postData.warehouseGbCode"
          @change="getVentilation(postData.warehouseGbCode);"
        >
          <option
            v-for="item in granaryList"
            :key="item.warehouseGbCode"
            :value="item.warehouseGbCode"
            v-text="item.warehouseName"
          />
        </select>
      </div>
      <div class="granary-info-item">
        <div class="device-label">
          <img class="device-label-image" src="../../../../static/images/windows.png" />
          <div class="device-label-value">窗户</div>
        </div>
        <div class="device-info">
          <!-- <div class="device-info-item">
            <div class="device-info-label">离线</div>
            <div class="device-info-value">0</div>
          </div>-->
          <div class="device-info-item">
            <div class="device-info-label">远程控制</div>
            <div class="device-info-value">{{windowLongRangeControl}}</div>
          </div>
          <div class="device-info-item">
            <div class="device-info-label">现场控制</div>
            <div class="device-info-value">{{windowSceneControl}}</div>
          </div>
        </div>
      </div>
      <!-- <div class="granary-info-item">
        <div class="device-label">
          <img class="device-label-image" src="../../../../static/images/aeration.png">
          <div class="device-label-value">排气扇</div>
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
      </div>-->
      <div class="granary-info-item">
        <div class="device-label">
          <img class="device-label-image" src="../../../../static/images/Vent.png" />
          <div class="device-label-value">轴流风机</div>
        </div>
        <div class="device-info">
          <!-- <div class="device-info-item">
            <div class="device-info-label">离线</div>
            <div class="device-info-value">0</div>
          </div>-->
          <div class="device-info-item">
            <div class="device-info-label">远程控制</div>
            <div class="device-info-value">{{fanLongRangeControl}}</div>
          </div>
          <div class="device-info-item">
            <div class="device-info-label">现场控制</div>
            <div class="device-info-value">{{fanSceneControl}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="position">
      <div class="position-left">
        <span>正面</span>
      </div>
      <div class="position-right">
        <span>背面</span>
      </div>
    </div>
    <div class="granary-pic">
      <div
        class="granary-pic-left"
        style="background-image: url('../../../../static/images/warehouse-device-1.png')"
      >
        <div class="positive">
          <ul class="positive-window">
            <li
              v-for="windowItem in positiveWindows"
              :key="windowItem.deviceId"
              :id="windowItem.deviceId"
            ></li>
          </ul>
        </div>
      </div>
      <!-- <div class="granary-pic-right">
        <div class="granary-monitor-title">监控画面</div>
        <div class="granary-monitor-container">
            <input type="hidden" id="message" >
            <iframe src="" id="iframe" width="343px" height="158px"></iframe>
        </div>
      </div>-->
      <div
        class="granary-pic-right"
        style="background-image: url('../../../../static/images/warehouse-device-1.png')"
      >
        <div class="positive">
          <ul class="positive-window">
            <li
              v-for="windowItem in backWindows"
              :key="windowItem.deviceId"
              :id="windowItem.deviceId"
            ></li>
          </ul>
        </div>
      </div>
    </div>
    <!-- <div class="granary-pic"> -->
    <!-- <div class="granary-pic-left" style="background-image: url('../../../../static/images/warehouse-device-1.png')">
        <div class="positive">
          <ul class="positive-window">
            <li v-for="windowItem in backWindows"
              :key="windowItem.deviceId"
              :id="windowItem.deviceId"
            >
            </li>
          </ul>
        </div>
    </div>-->
    <!-- <div class="granary-pic-right">
        <div class="granary-monitor-title">监控画面</div>
        <div class="granary-monitor-container">
            <input type="hidden" id="message" >
            <iframe src="" id="iframe"></iframe>
        </div>
    </div>-->
    <!-- </div> -->

    <DeviceList :deviceList="deviceTypeList" @on-off="onOffSwitch" />
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
  /* width: 50px; */
  width: 84px;
}

.granary-info-item .device-label-image {
  width: 50px;
  height: 40px;
}

.granary-info-item .device-info {
  height: 70px;
  font-size: 14px;
  margin-left: 10px;
}

.granary-info-item .device-info-item {
  display: flex;
  /* line-height: 24px; */
  line-height: 36px;
}

.granary-info-item .device-info-label {
  width: 60px;
}

.granary-info-item .device-info-value {
  width: 30px;
  text-align: right;
}

.position {
  position: relative;
  top: 18px;
  width: 95%;
  height: 24px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  text-align: center;
  overflow: hidden;
}
.position .position-left,
.position-right {
  width: 49%;
  height: 24px;
  background-color: #2c3f60;
}
.position-left span {
  font-size: 18px;
  color: white;
}
.position-right span {
  font-size: 18px;
  color: white;
}
.granary-pic {
  height: auto;
  border: none;
  display: flex;
  flex-direction: row;
  /* justify-content: stretch; */
  justify-content: space-between;
}

.granary-pic .granary-pic-left {
  position: relative;
  width: 49%;
  height: 0;
  padding-top: 12.57%;
  /* padding-bottom: 18%; */
  /* background: center center no-repeat; */
  background-size: contain;
  overflow: hidden;
}
.granary-pic .granary-pic-left .positive {
  position: absolute;
  top: 30%;
  left: 31%;
  width: 61%;
  height: 29px;
  overflow: hidden;
}
.granary-pic .granary-pic-left .positive .positive-window {
  display: flex;
  justify-content: space-around;
  height: 29px;
}
.granary-pic .granary-pic-left .positive .positive-window li {
  width: 41.5px;
  height: 29px;
  background-image: url("../../../../static/images/window.png");
  background-size: contain;
}
.granary-pic .granary-pic-right {
  /* display: flex; */
  position: relative;
  width: 49%;
  height: 0;
  padding-top: 12.57%;
  background-size: contain;
  overflow: hidden;
}
.granary-pic .granary-pic-right .positive {
  position: absolute;
  top: 30%;
  left: 33%;
  width: 61%;
  height: 29px;
  overflow: hidden;
}
.granary-pic .granary-pic-right .positive .positive-window {
  display: flex;
  justify-content: space-around;
  height: 29px;
}
.granary-pic .granary-pic-right .positive .positive-window li {
  width: 41.5px;
  height: 29px;
  /* padding-top: 70%; */
  background-image: url("../../../../static/images/window.png");
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

.granary-monitor-title {
  line-height: 50px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  width: 100% !important;
  height: auto !important;
}

.granary-monitor-container {
  flex: 1;
  width: 100% !important;
  height: auto !important;
  background: #00a2d4;
}
</style>
<script>
import DeviceList from "../DeviceList";
import { getDvr } from "@/api/business/warehousingStock/inventory";
import {
  fetchAerationModeList,
  fetchAerationMode,
  weatherInfo,
  sendSwitchOrder
} from "@/api/intelligentWarehous/aeration";
import { storehouse, granary } from "@/api/systemManage/dropDown";

export default {
  name: "aerationIndex",
  components: {
    DeviceList
  },
  data() {
    return {
      postData: {
        storehouseGbCode: "",
        warehouseGbCode: ""
      },
      weatherData: {
        // 获取互联网天气数据信息所传信息
        appid: "72985319", // 账户ID
        appsecret: "fUV9Hzl4", // 账户密钥
        version: "v1", // 接口标识, 固定值: v1
        cityid: "101270402" // 不是必传项，id对应城市三台
      },
      dataList: [],
      networkMeteorologicalData: {
        AcquisitionTimeData: [],
        temperatureData: [],
        humidityData: []
      },
      oLiveView: {
        iProtocol: 1, // protocol 1：http, 2:https
        szIP: "192.168.188.240", // protocol ip
        szPort: "80", // protocol port
        szUsername: "admin", // device username
        szPassword: "12345", // device password
        iStreamType: 1, // stream 1：main stream  2：sub-stream  3：third stream  4：transcode stream
        iChannelID: 1, // channel no
        bZeroChannel: false // zero channel
      },
      storehouseList: [], //仓房下拉列表
      granaryList: [], //廒间下拉列表
      deviceTypeList: [],
      positiveWindows: [],
      backWindows: [],
      // controllerStatus: '', // 设备状态 1为远程，2为现场控制
      switchPostData: {
        deviceBarcode: "",
        warehouseGbCode: "",
        onOffSwitch: ""
      },
      windowLongRangeControl: 0,
      windowSceneControl: 0,
      fanLongRangeControl: 0,
      fanSceneControl: 0
    };
  },
  methods: {
    getWeather: function() {
      weatherInfo(this.weatherData)
        .then(ret => {
          this.dataList = ret.data[0].hours;
          var myArr = this.dataList.map(hours => ({
            ...hours,
            humidity: ret.data[0].humidity
          }));
          for (const i in myArr) {
            this.networkMeteorologicalData.humidityData.push(myArr[i].humidity);
          }
          for (const i in this.dataList) {
            this.networkMeteorologicalData.AcquisitionTimeData.push(
              this.dataList[i].day.slice(3, 6)
            );
            this.networkMeteorologicalData.temperatureData.push(
              this.dataList[i].tem.slice(0, 2)
            );
            // console.log(this.networkMeteorologicalData.temperatureData);
          }
          this.drawChart();
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    drawChart() {
      this.$echarts.init(document.getElementById("Internet-data")).setOption({
        title: {
          text: "互联网气象数据",
          left: "center"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["采样温度(℃)", "采样湿度(%)"],
          bottom: 10
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          // data: ['10:26', '10:33', '10:40', '10:55', '11:02', '11:09', '11:16', '11:24', '11:31', '11:38']
          data: this.networkMeteorologicalData.AcquisitionTimeData
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} °C"
          }
        },
        series: [
          {
            name: "采样温度(℃)",
            type: "line",
            smooth: true,
            // data: [25, 25.5, 25.7, 26, 26.2, 26.3, 26.5, 26.5, 26.6, 26.7]
            data: this.networkMeteorologicalData.temperatureData
          },
          {
            name: "采样湿度(%)",
            type: "line",
            smooth: true,
            // data: [36, 30, 30, 31, 32, 33, 34, 33, 32, 32, 33, 29, 27]
            data: this.networkMeteorologicalData.humidityData
          }
        ]
      });
      this.$echarts.init(document.getElementById("local-data")).setOption({
        title: {
          text: "本地气象站数据",
          left: "center"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["采样温度(℃)", "采样湿度(%)"],
          bottom: 10
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "10:26",
            "10:33",
            "10:40",
            "10:55",
            "11:02",
            "11:09",
            "11:16",
            "11:24",
            "11:31",
            "11:38"
          ]
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} °C"
          }
        },
        series: [
          {
            name: "采样温度(℃)",
            type: "line",
            smooth: true,
            data: [25, 25.5, 25.7, 26, 26.2, 26.3, 26.5, 26.5, 26.6, 26.7]
          },
          {
            name: "采样湿度(%)",
            type: "line",
            smooth: true,
            data: [36, 30, 30, 31, 32, 33, 34, 33, 32, 32, 33, 29, 27]
          }
        ]
      });
    },
    getStorehouse() {
      // 获取仓房列表
      storehouse("")
        .then(ret => {
          if (ret.code == 200) {
            this.storehouseList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getGranary(code) {
      // 获取廒间列表
      granary(code)
        .then(ret => {
          if (ret.code == 200) {
            this.granaryList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getVideo: function(warehouseGbCode) {
      var vm = this;
      getDvr({ warehouseGbCode })
        .then(ret => {
          if (ret.code == 200) {
            vm.oLiveView.szIP = ret.data.dataList[0].dvrIp;
            vm.oLiveView.szPort = ret.data.dataList[0].dvrPort;
            vm.oLiveView.szUsername = ret.data.dataList[0].userName;
            vm.oLiveView.szPassword = ret.data.dataList[0].userPwd;
            vm.oLiveView.iChannelID = ret.data.dataList[0].channelNo;

            // $('#message').val(JSON.stringify(vm.oLiveView));
            // document.querySelector('#iframe').src='../../../../static/html/video.html?id=message';
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getVentilation: function(warehouseGbCode) {
      layer.load(2);
      fetchAerationModeList({
        storehouseGbCode: this.postData.storehouseGbCode,
        warehouseGbCode: this.postData.warehouseGbCode,
        pageSize: 10,
        pageNo: 1
      })
        .then(ret => {
          if (ret.code == 200) {
            // console.log(ret.data.dataList[0].aerationModeId)
            fetchAerationMode({
              aerationModeId: ret.data.dataList[0].aerationModeId
            })
              .then(res => {
                layer.closeAll("loading");
                if (res.code == 200) {
                  // alert("数据获取成功")
                  layer.alert("数据获取成功", { closeBtn: 0 });
                  this.deviceTypeList = (res.data.dataMap.deviceList || []).map(
                    device => ({
                      ...device,
                      aerationMode: res.data.dataMap.aerationMode,
                      warehouseGbCode: res.data.dataMap.warehouseGbCode,
                      switchTime: "0"
                    })
                  );
                  console.log(this.deviceTypeList);
                  for (const i in this.deviceTypeList) {
                    if (this.deviceTypeList[i].type == "0") {
                      const obj = {
                        deviceId: this.deviceTypeList[i].deviceId,
                        type: this.deviceTypeList[i].type
                      };
                      this.positiveWindows.push(obj);
                    }
                    if (this.deviceTypeList[i].type == "1") {
                      const obj = {
                        deviceId: this.deviceTypeList[i].deviceId,
                        type: this.deviceTypeList[i].type
                      };
                      this.backWindows.push(obj);
                    }
                    if (this.deviceTypeList[i].deviceName.slice(-2) == "窗户") {
                      if (this.deviceTypeList[i].controllerStatus == "1") {
                        this.windowLongRangeControl += 1;
                      } else {
                        this.windowSceneControl += 1;
                      }
                    }
                    if (this.deviceTypeList[i].deviceName.slice(-4) == "轴流风机") {
                      if (this.deviceTypeList[i].controllerStatus == "1") {
                        this.fanLongRangeControl += 1;
                      } else {
                        this.fanSceneControl += 1;
                      }
                    }
                  }
                } else {
                  layer.alert(res.data, { closeBtn: 0 });
                }
              })
              .catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
              });
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    onOffSwitch(data) {
      console.log(data);
      this.deviceTypeList.forEach((item, index) => {
        if (item.deviceId == data.deviceId && item.switchTime == 0) {
          item.switchTime = "20";
          function fn () {
            item.switchTime--;
            if(item.switchTime < 0) {
              item.switchTime = "0"
              window.clearInterval(index)
            }
          }
          index = setInterval(fn, 1000)
          this.switchPostData.deviceBarcode = data.deviceId;
          this.switchPostData.warehouseGbCode = data.warehouseGbCode;
          this.switchPostData.onOffSwitch = data.onOffSwitch;
        }
      });
      this.windowSwitch();
    },
    windowSwitch() {
      console.log(this.switchPostData);
      sendSwitchOrder(this.switchPostData)
        .then(ret => {
          if (ret.code == 200) {
            console.log("开关指令发送成功");
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    }
  },
  watch: {
    "postData.storehouseGbCode"(newCode, oldCode) {
      // 监听仓房变化获取廒间列表
      if (newCode && newCode !== oldCode) {
        this.granaryList = [];
        this.positiveWindows = [];
        this.backWindows = [];
        this.postData.warehouseGbCode = "";
        this.getGranary(newCode);
        for(let i = 0; i < this.deviceTypeList.length; i++) {
          if(this.deviceTypeList[i].switchTime != "0") {
            layer.open({
              content: '请在开关倒计时结束后再点击切换'
            })
          }
        };
      }
    }
  },
  mounted() {
    // this.drawChart();
    this.getStorehouse();
    // this.getWeather();
  }
};
</script>
