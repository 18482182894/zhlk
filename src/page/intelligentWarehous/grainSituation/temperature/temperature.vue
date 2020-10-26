<template>
  <div class="content">
    <div class="menuManage operationLog ">
      <div class="lookup">
        <div class="lookup-search">
          仓房：
          <select class="select-style excision" v-model="searchData.storehouseGbCode">
            <option
              v-for="item in storehouseList"
              :key="item.storehouseGbCode"
              :value="item.storehouseGbCode"
              v-text="item.storehouseName"/>
          </select>
          廒间：
          <select class="select-style excision" v-model="searchData.warehouseGbCode">
            <option
              v-for="item in granaryList"
              :key="item.warehouseGbCode"
              :value="item.warehouseGbCode"
              v-text="item.warehouseName"/>
          </select>
          时间：
          <input type="text" class="input-text Wdate" onclick="WdatePicker({maxDate:'%y-%M-%d'})" id="startTime"/>~
          <input type="text" class="input-text Wdate excision" onclick="WdatePicker({maxDate:'%y-%M-%d'})" id="endTime"/>
        </div>
        <div class="btn btn-add" @click="getGrainTemperature">
          <img src="../../../../../static/images/search.png" alt="">
          <label>查找</label>
        </div>
        <div class="btn btn-add"  @click="jumpTrend">
          <label>粮温走势</label>
        </div>
      </div>
      <div class="temperature">
        <div class="temperature-top">
          <div class="temperature-top-item" id="insideTemperature"></div>
          <div class="temperature-top-item" id="outsideTemperature"></div>
          <div class="temperature-top-item" id="insideHumidity"></div>
          <div class="temperature-top-item" id="outsideHumidity"></div>
        </div>
        <div class="temperature-bottom">
          <div class="temperature-left">
            <div id="temperature3D"></div>
            <div style="text-align: center">
              <div class="btn btn-temperature" @click="grainTemperatureCollection();">
                <label>粮温采集</label>
              </div>
              <div class="btn btn-temperature" @click="changeLayer()">
                <label>全部</label>
              </div>
              <div class="btn btn-temperature" @click="changeLayer(i)" v-for="i of maxLayer">
                <label>第{{layerTextList[i]}}层</label>
              </div>
              <div class="btn btn-temperature" @click="jumpEdit();">
                <label>全库采集</label>
              </div>
              <div class="btn btn-temperature" @click="getReportGrainTemperature">
                <label>粮温详情</label>
              </div>
            </div>
          </div>
          <div class="temperature-right">
            <fieldset>
              <legend>粮温控制</legend>
              <p>
                粮温状态：
                <input type="text" class="input-text" readonly v-model="temperatureDetail.grainTemperatureStatus"/>
              </p>
              <p>
                &emsp;最高温：
                <input type="text" class="input-text" readonly v-model="temperatureDetail.maxTemperature"/>
              </p>
              <p>
                &emsp;最低温：
                <input type="text" class="input-text" readonly v-model="temperatureDetail.minTemperature"/>
              </p>
              <p>
                &emsp;平均温：
                <input type="text" class="input-text" readonly v-model="temperatureDetail.avgTemperature"/>
              </p>
              <p>
                &emsp;仓内温：
                <input type="text" class="input-text" readonly v-model="temperatureDetail.insideTemperature"/>
              </p>
              <p>
                &emsp;仓外温：
                <input type="text" class="input-text" readonly v-model="temperatureDetail.outsideTemperature"/>
              </p>
              <p>
                &emsp;仓内湿：
                <input type="text" class="input-text" readonly v-model="temperatureDetail.insideHumidity"/>
              </p>
              <p>
                &emsp;仓外湿：
                <input type="text" class="input-text" readonly v-model="temperatureDetail.outsideHumidity"/>
              </p>
              <p>
                采集时间：
                <input type="text" class="input-text" readonly v-model="temperatureDetail.acquisitionTime"/>
              </p>
              <p>
                历史查询：
                <select class="select-style excision" v-model="historySearchData.date">
                  <option
                    v-for="item in temperatureDateList"
                    :value="item.date"
                    v-text="item.date"/>
                </select>
                <select class="select-style excision" v-model="historySearchData.time">
                  <option
                    v-for="item in temperatureTimeList"
                    :value="item.time"
                    v-text="item.time"/>
                </select>
                <a class="btn btn-add" @click="getHistoryGrainTemperature">
                  <label>查询</label>
                </a>
              </p>
            </fieldset>
          </div>
        </div>
      </div>
      <div class="detail-back">
        <button @click="$router.replace({name: 'grainSituation'})">返回</button>
      </div>

      <!-- 弹出层 -->
      <div class="popup" v-if="showPopup" id="div_print">
        <div class="popup-main">
          <div class="popup-title">
            <label style="font-size:1.4rem;">粮温监测信息</label>
            <div class="btn btn-print" @click="printData('div_print');">
              <label>打印</label>
            </div>
            <em class="popup-close" @click="showPopup=false">×</em>
          </div>
          <div class="popup-content">
            <table>
              <tr>
                <td>仓库名称</td>
                <td>{{temperatureReport.temperatureMsg.storehouseName}}</td>
                <td>仓廒名称</td>
                <td colspan="2">{{temperatureReport.temperatureMsg.warehouseName}}</td>
                <td>监测时间</td>
                <td colspan="2">{{temperatureReport.temperatureMsg.acquisitionTime}}</td>
              </tr>
              <tr>
                <td>仓内温度</td>
                <td>{{temperatureReport.temperatureMsg.insideTemperature}}</td>
				<td>仓外温度</td>
                <td>{{temperatureReport.temperatureMsg.outsideTemperature}}</td>
                <td>仓内湿度</td>
                <td>{{temperatureReport.temperatureMsg.insideHumidity}}</td>
                <td>仓外湿度</td>
                <td>{{temperatureReport.temperatureMsg.outsideHumidity}}</td>
              </tr>
            </table>
            <div class="xyz">
              <div class="y" v-for="(yList, y) in reportXYZList">
                <div class="y-label">第{{y + 1}}列</div>
                <div class="y-list">
                  <div class="z" v-for="(zList, z) in yList">
                    <div class="z-list" v-if="z===0">
                      <div class="z-item">编号</div>
                      <div class="z-item" v-for="(xList, x) in zList">第{{x + 1}}行</div>
                    </div>
                    <div class="z-list">
                      <div class="z-item">第{{z + 1}}层</div>
                      <div class="z-item" v-for="(xList, x) in zList">{{xList.temperatuer}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <table>
              <tr>
                <td>层数</td>
                <td v-for="(item, index) in temperatureReport.temperatureDetailList">{{layerTextList[index + 1]}}</td>
                <td>平均</td>
              </tr>
              <tr>
                <td>最高温</td>
                <td v-for="(item, index) in temperatureReport.temperatureDetailList">{{temperatureReport.temperatureDetailList[index].maxTem}}</td>
                <td>{{temperatureReport.avgTemp.avgMaxTem}}</td>
              </tr>
              <tr>
                <td>最低温</td>
                <td v-for="(item, index) in temperatureReport.temperatureDetailList">{{temperatureReport.temperatureDetailList[index].minTem}}</td>
                <td>{{temperatureReport.avgTemp.avgMinTem}}</td>
              </tr>
              <tr>
                <td>平均值</td>
                <td v-for="(item, index) in temperatureReport.temperatureDetailList">{{temperatureReport.temperatureDetailList[index].avgTem}}</td>
                <td>{{temperatureReport.avgTemp.avgAvgTem}}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style type="text/css" scoped>
  .lookup {
    display: flex;
    align-items: center;
  }

  .temperature-bottom {
    display: flex;
    width: 100%;
  }

  .temperature-left {
    flex: 1;
    width: 100%;
    height: 600px;
  }

  .temperature-right {
    width: 370px;
  }

  .temperature-right p {
    display: block;
    width: 100%;
    margin: 0 10px;
  }

  .temperature-top {
    display: flex;
    height: 250px;
  }

  .temperature-top-item {
    flex: 1;
    height: 100%;
  }

  #temperature3D {
    height: 600px;
  }

  .temperature-right .select-style {
    width: 8rem;
  }

  .popup {
    display: block;
    z-index: 10;
  }

  .popup-main {
    width: 1000px;
	overflow-y: scroll;
    padding-right: 1rem;
  }

  .popup-main table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
  }

  .popup-main table td {
    text-align: center;
    padding: 5px;
    font-size: 1.5rem;
    border: 1px solid #111;
  }

  .xyz {
    overflow: auto;
    border: 1px solid #111;
    margin: 10px 0;
  }

  .y {
    display: flex;
    align-items: center;
  }

  .y:not(:last-child) {
    border-bottom: 1px solid #111;
  }

  .y-label {
    width: 100px;
    font-size: 1.6rem;
    text-align: center;
  }

  .y-list {
    flex: 1;
  }

  .z {
    display: flex;
    flex-direction: column;
  }

  .z-list {
    display: flex;
    border-bottom: 1px solid #111;
  }

  .z-item {
    flex: 1;
    text-align: center;
    border-left: 1px solid #111;
    font-size: 1.5rem;
    line-height: 2.5rem;
  }

</style>
<script>
  import 'echarts-gl';
  import {storehouse, granary} from "@/api/systemManage/dropDown";
  import { myPrint } from "@/utils/public";
  import {
    fetchGrainTemperature,
    fetchGrainTemperatureDateList,
    fetchGrainTemperatureTimeList,
    fetchHistoryGrainTemperature,
    fetchReportGrainTemperature,
    grainTemperature
  } from "@/api/intelligentWarehous/grainSituation";

  export default {
    name: "temperature",
    data() {
      return {
        searchData: {
          storehouseGbCode: '',
          warehouseGbCode: '',
          startTime: '',
          endTime: '',
        },
        historySearchData: {
          date: '',
          time: '',
        },
        maxLayer: 0, // 最高层数
        layerTextList: ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
        temperatureDetail: {},
        temperatureArray: [],
        temperatureDateList: [],
        temperatureTimeList: [],
        storehouseList: [],//仓房下拉列表
        granaryList: [],//廒间下拉列表
        showPopup: false,
        temperatureReport: {},
        reportXYZList: [],
      };
    },
    methods: {
      getGrainTemperature() {
        if (!this.searchData.storehouseGbCode) return layer.msg("请选择仓房");
        if (!this.searchData.warehouseGbCode) return layer.msg("请选择仓廒");
        this.searchData.startTime = document.getElementById('startTime').value;
        this.searchData.endTime = document.getElementById('endTime').value;
        layer.load(2);
        fetchGrainTemperature(this.searchData)
          .then((ret) => {
            layer.closeAll("loading");
            console.log(ret)
            if (ret.code == 200) {
              this.temperatureDetail = ret.data.temperatureDetail;
              this.temperatureArray = ret.data.temperatureArray;
              this.maxLayer = Math.max(...this.temperatureArray.map(t => t.z));
              this.drawGauge('insideTemperature', '仓内温度');
              this.drawGauge('outsideTemperature', '仓外温度');
              this.drawGauge('insideHumidity', '仓内湿度');
              this.drawGauge('outsideHumidity', '仓外湿度');
              this.draw3D(this.temperatureArray.map((t) => ([t.x, t.y, t.z, t.temperatuer])));
              this.getGrainTemperatureDateList();
            } else {
              if (ret.code == "500" && ret.data == "查询错误，没有数据") {
                layer.msg("暂无数据");
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
      getHistoryGrainTemperature() {
        if (!this.searchData.storehouseGbCode) return layer.msg("请选择仓房");
        if (!this.searchData.warehouseGbCode) return layer.msg("请选择仓廒");
        if (!this.historySearchData.date) return layer.msg("请选择历史日期");
        if (!this.historySearchData.time) return layer.msg("请选择历史时间");
        layer.load(2);
        fetchHistoryGrainTemperature({
          storehouseGbCode: this.searchData.storehouseGbCode,
          warehouseGbCode: this.searchData.warehouseGbCode,
          date: this.historySearchData.date,
          time: this.historySearchData.time,
        })
          .then((ret) => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              this.temperatureDetail = ret.data.temperatureDetail;
              this.temperatureArray = ret.data.temperatureArray;
              this.maxLayer = Math.max(...this.temperatureArray.map(t => t.z));
              this.drawGauge('insideTemperature', '仓内温度');
              this.drawGauge('outsideTemperature', '仓外温度');
              this.drawGauge('insideHumidity', '仓内湿度');
              this.drawGauge('outsideHumidity', '仓外湿度');
              this.draw3D(this.temperatureArray.map((t) => ([t.x, t.y, t.z, t.temperatuer])));
            } else {
              if (ret.code == "500" && ret.data == "查询错误，没有数据") {
                layer.msg("暂无数据");
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
      getReportGrainTemperature() {
        layer.load(2);
        fetchReportGrainTemperature({grainTemperatureId: this.temperatureDetail.grainTemperatureId})
          .then((ret) => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              this.temperatureReport = ret.data;
              const {temperatureArray} = this.temperatureReport;
              let yArr = [], yList = [], y = 1;
              temperatureArray.sort((t1, t2) => t1.y - t2.y).forEach((t) => {
                if (t.y !== y) {
                  y++;
                  yArr.push(yList);
                  yList = [];
                }
                yList.push(t)
              });
              if (yList.length) {
                yArr.push(yList)
              }
              this.reportXYZList = yArr.map(yList => {
                let zArr = [], zList = [], z = 1;
                yList.sort((t1, t2) => t1.z - t2.z).forEach((t) => {
                  if (t.z !== z) {
                    z++;
                    zArr.push(zList);
                    zList = [];
                  }
                  zList.push(t)
                });
                if (zList.length) {
                  zArr.push(zList)
                }
                return zArr.map(zList => zList.sort((t1, t2) => t1.x - t2.x));
              })
              this.showPopup = true;
            } else {
              if (ret.code == "500" && ret.data == "查询错误，没有数据") {
                layer.msg("暂无数据");
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
      getGrainTemperatureDateList() {
        const {storehouseGbCode, warehouseGbCode} = this.searchData;
        layer.load(2);
        fetchGrainTemperatureDateList({storehouseGbCode, warehouseGbCode})
          .then((ret) => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              this.temperatureDateList = ret.data.dateList;
            } else {
              if (ret.code == "500" && ret.data == "查询错误，没有数据") {
                layer.msg("暂无数据");
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
      getGrainTemperatureTimeList(date) {
        const {storehouseGbCode, warehouseGbCode} = this.searchData;
        layer.load(2);
        fetchGrainTemperatureTimeList({storehouseGbCode, warehouseGbCode, date})
          .then((ret) => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              this.temperatureTimeList = ret.data.timeList;
            } else {
              if (ret.code == "500" && ret.data == "查询错误，没有数据") {
                layer.msg("暂无数据");
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
      drawGauge(type, name) {
        this.$echarts
          .init(document.getElementById(type))
          .setOption({
            title: {
              text: name,
              left: 'center',
              bottom: '15%',
            },
            tooltip: {
              formatter: "{a} : {c}"
            },
            toolbox: {
              feature: {
                restore: {},
                saveAsImage: {}
              }
            },
            series: [
              {
                name,
                type: 'gauge',
                detail: {formatter: '{value}'},
                data: [{value: this.temperatureDetail[type]}]
              }
            ]
          })
      },
      draw3D(source) {
        this.$echarts
          .init(document.getElementById('temperature3D'))
          .setOption({
            grid3D: {
              top: 'top',
            },
            tooltip: {},
            xAxis3D: {
              name: '行'
            },
            yAxis3D: {
              name: '列'
            },
            zAxis3D: {
              name: '层',
              min: 0,
              max: this.maxLayer + 1
            },
            dataset: {
              dimensions: [
                '行',
                '列',
                '层',
                '温度',
              ],
              source
            },
            series: [
              {
                type: 'scatter3D',
                symbolSize: 10,
                label: {
                  show: true,
                  position: 'top',
                  formatter(params) {
                    return params.data[3] + '℃';
                  },
                  textStyle: {
                    color: 'rgba(0,0,0,0.8)',
                    borderWidth: 0,
                    fontSize: 12
                  }
                },
                encode: {
                  x: '行',
                  y: '列',
                  z: '层',
                  tooltip: [0, 1, 2, 3]
                }
              }
            ],
            visualMap: [{
              bottom: 10,
              // min: this.temperatureDetail.minTemperature,
              // max: this.temperatureDetail.maxTemperature,
              min: -20,
              max: 80,
              calculable: true,
              dimension: 3,
              inRange: {
                color: ['#1710c0', '#0b9df0', '#00fea8', '#00ff0d', '#f5f811', '#f09a09', '#fe0300']
              },
              textStyle: {
                color: '#000'
              }
            }],
          });
      },
      changeLayer(layer) {
        let data = [];
        if (typeof layer === 'number') {
          data = this.temperatureArray.filter((t) => t.z === layer);
        } else {
          data = this.temperatureArray;
        }
        this.draw3D(data.map((t) => ([t.x, t.y, t.z, t.temperatuer])))
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
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      grainTemperatureCollection:function () {//采集粮温
          var vm=this;
          layer.msg('粮温采集中');
        layer.load(2);
        grainTemperature({warehouseGbCode:vm.searchData.warehouseGbCode})
          .then((ret) => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.getGrainTemperature();
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      printData:function (id) {//打印
        $('.popup-close').css('display','none');
        $('.btn-print').css('display','none');
        myPrint(id);
      },
      jumpTrend() {
        const {storehouseGbCode, warehouseGbCode} = this.$route.query;
        if (storehouseGbCode && warehouseGbCode) {
          this.$router.push({name: 'temperatureTrend', query: {storehouseGbCode, warehouseGbCode}});
        }
      }
    },
    watch: {
      'searchData.storehouseGbCode'(newCode, oldCode) { // 监听仓房变化获取廒间列表
        if (newCode && newCode !== oldCode) {
          if (!this.storehouseGbCodeChangeByDetail) {
            this.searchData.warehouseGbCode = '';
          }
          this.storehouseGbCodeChangeByDetail = false;
          this.granaryList = [];
          this.getGranary(newCode);
        }
      },
      'historySearchData.date'(newDate, oldDate) { // 监听历史日期变化
        if (newDate && newDate !== oldDate) {
          this.temperatureTimeList = [];
          this.historySearchData.time = '';
          this.getGrainTemperatureTimeList(newDate);
        }
      }
    },
    mounted() {
      this.getStorehouse();
      const {storehouseGbCode, warehouseGbCode} = this.$route.query;
      if (storehouseGbCode && warehouseGbCode) {
        this.storehouseGbCodeChangeByDetail = true; // 详情里面设置时不监听廒间
        this.searchData.storehouseGbCode = storehouseGbCode;
        this.searchData.warehouseGbCode = warehouseGbCode;
        this.getGrainTemperature()
      }
    }
  };

</script>
