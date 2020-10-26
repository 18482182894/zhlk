<template>
  <div class="content">
    <div class="storageDetail">
      <div class="storage">
        <span v-text="inventory.storehouseName"></span>
        <label v-text="inventory.warehouseName"></label>
      </div>
      <div class="storage-info">
        <div class="storage-info-left">
          <img :src="inventory.staffHeadImg || '../../../../static/images/user.png'"/>
          <p v-text="inventory.staffName"></p>
          <p v-text="inventory.mobileNo"></p>
        </div>
        <div class="storage-info-middle">
          <div class="userManage-detail">
            <div>
              <span>
                粮食品种：
                <label v-text="inventory.grainKind"></label>
              </span>
              <span>
                粮食等级：
                <label v-text="inventory.grainLevel"></label>
              </span>
              <span>
                收获年度：
                <label v-text="inventory.harvestYear"></label>
              </span>
              <span>
                库存容量：
                <label v-text="inventory.actualCapacity"></label>
              </span>
              <span>
                实测数量：
                <label v-text="currentQuantity"></label>
              </span>
              <span>
                粮食性质：
                <label v-text="inventory.grainAttribute"></label>
              </span>
            </div>
          </div>
        </div>
        <div class="storage-info-right">
          <p>封帐二维码</p>
          <img v-if="inventory.qrCodeUrl" :src="inventory.qrCodeUrl"/>
        </div>
      </div>
      <div class="storage-chart">
        <p class="chart-title">粮面平整图</p>
        <div class="chart-content" id="grainSurface"></div>
      </div>
      <div class="storage-chart">
        <p class="chart-title">廒间监控</p>
        <div class="chart-content ">
            <input type="hidden" id="message" >
            <iframe src="" id="iframe"></iframe>
        </div>
      </div>
      <div class="storage-chart">
        <p class="chart-title">气温走势图</p>
        <div class="chart-content" id="temperature3D"></div>
      </div>
      <div class="storage-chart">
        <p class="chart-title">其他信息</p>
        <div class="chart-content chart-content-other">
          <div class="chart-content-gauge">
            <div class="chart-gauge" id="insideTemperature"></div>
            <div class="chart-gauge" id="insideHumidity"></div>
            <div class="chart-gauge" id="outsideTemperature"></div>
            <div class="chart-gauge" id="outsideHumidity"></div>
          </div>
          <div class="chart-content-percentage">
            <div class="percentage">
              <div class="percentage-label">O<sub>2</sub></div>
              <div class="percentage-value">{{typeof gasMonitorDetail.o2 !== 'undefined' ? `${gasMonitorDetail.o2}%`: ''}}</div>
            </div>
            <div class="percentage">
              <div class="percentage-label">CO<sub>2</sub></div>
              <div class="percentage-value">{{typeof gasMonitorDetail.co2 !== 'undefined' ? `${gasMonitorDetail.co2}PPM`: ''}}</div>
            </div>
            <div class="percentage">
              <div class="percentage-label">PH<sub>3</sub></div>
              <div class="percentage-value">{{typeof gasMonitorDetail.ph3 !== 'undefined' ? `${gasMonitorDetail.ph3}%`: ''}}</div>
            </div>
            <div class="percentage">
              <div class="percentage-label">
                <img src="../../../../static/images/bug.png"/>
              </div>
              <div class="percentage-value">{{insect}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style type="text/css" scoped>
  .userManage-detail > div span {
    width: 33%;
  }

  .chart-content-other {
    display: flex;
    align-items: center;
  }

  .chart-content-gauge {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
  }

  .chart-content-gauge .chart-gauge {
    width: 50%;
    height: 150px;
  }

  .chart-content-percentage {
    width: 150px;
  }

  .percentage {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .percentage-label {
    width: 30px;
    height: 30px;
    color: #67a2da;
    font-size: 20px;
    padding-right: 20px;
  }

  .percentage-label img {
    width: 30px;
    height: 30px;
  }

  .percentage-value {
    font-size: 16px;
  }
</style>
<script>
  import 'echarts-gl';
  import axios from 'axios';
  import {fetchInventory,getDvr} from "@/api/business/warehousingStock/inventory";
  import {fetchQuantityDetectionList, fetchQuantityDetection} from '@/api/intelligentWarehous/quantityDetection';
  import {fetchGrainTemperature, fetchGasForList} from '@/api/intelligentWarehous/grainSituation';
  import {fetchFumigationHome} from '@/api/intelligentWarehous/fumigation';
  import {granaryDetail} from "@/api/systemManage/granary";
  import {staffDetail} from "@/api/systemManage/staff";
  import {grainDetail} from '@/api/systemManage/basicData/grainVarieties'
  import {grainNature, grainOilLevel} from "@/api/systemManage/dropDown";

  export default {
    name: "company",
    data() {
      return {
        inventory: {},
        gasMonitorDetail: {},
        
        oLiveView:{
            iProtocol: 1,            // protocol 1：http, 2:https
            szIP: "192.168.188.240",    // protocol ip
            szPort: "80",            // protocol port
            szUsername: "admin",     // device username
            szPassword: "12345", // device password
            iStreamType: 1,          // stream 1：main stream  2：sub-stream  3：third stream  4：transcode stream
            iChannelID: 1,           // channel no
            bZeroChannel: false      // zero channel                
        },
        currentQuantity: null, // 实测数量
        insect: null, // 虫情数量
      };
    },
    methods: {
      getInventory(warehouseGbCode) {
        layer.load(2);
        fetchInventory({warehouseGbCode})
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              const inventoryList = ret.data.detail;
              if (Array.isArray(inventoryList) && inventoryList.length) {
                const inventory = inventoryList[0];
                this.getGrainDetail(inventory);
                this.getGrainOilLevel(inventory);
                this.getGrainNature(inventory);
                this.getGrainTemperature(inventory.storehouseGbCode, inventory.warehouseGbCode);
                this.getGas(inventory.storehouseGbCode, inventory.warehouseGbCode);
                this.getInsect(inventory.storehouseGbCode, inventory.warehouseGbCode);
                this.inventory = inventory;
              }
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      getQuantityDetection(warehouseGbCode) {
        fetchQuantityDetectionList({warehouseGbCode, pageSize: 100, pageNo: 1})
          .then((ret) => {
            if (ret.code == 200) {
              const {dataList} = ret.data;
              const quantityDetection = dataList.find(qd => qd.checkNum > 0);
              if (quantityDetection) {
                this.currentQuantity = quantityDetection.checkNum;
                this.getGrainSurface(quantityDetection.id);
              }
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      getGrainDetail(inventory) {
        grainDetail({grainVarietyId: inventory.grainKind})
          .then((ret) => {
            if (ret.code == 200) {
              inventory.grainKind = ret.data.grainVariety.grainVarietyName;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      getGrainOilLevel(inventory) {
        grainOilLevel()
          .then((ret) => {
            if (ret.code == 200) {
              const grainOilLevel = ret.data.dataList.find(k => k.dicInfoCode === inventory.grainLevel);
              if (grainOilLevel) {
                inventory.grainLevel = grainOilLevel.dicInfoValue;
              }
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      getGrainNature(inventory) {
        grainNature()
          .then((ret) => {
            if (ret.code == 200) {
              const grainNature = ret.data.dataList.find(k => k.dicInfoCode === inventory.grainAttribute);
              if (grainNature) {
                inventory.grainAttribute = grainNature.dicInfoValue;
              }
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      // 获取粮面平整图json文件
      getGrainSurface(id) {
        fetchQuantityDetection({id})
          .then((ret) => {
            if (ret.code == 200) {
              const {dataMap} = ret.data;
              if (dataMap.grainInfo3dImage) {
                this.getGrainSurfaceData(dataMap.grainInfo3dImage);
              }
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch((err) => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      // 获取粮面平整图数据
      getGrainSurfaceData(url) {
        axios.get(url)
          .then((res) => {
            const {heights} = res.data;
            if (Array.isArray(heights)) {
              const data = heights.map((h) => ([h.an, h.bn, h.height]));
              this.$echarts
                .init(document.getElementById('grainSurface'))
                .setOption({
                  visualMap: {
                    show: false,
                    min: 2,
                    max: 6,
                    inRange: {
                      color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                    }
                  },
                  xAxis3D: {
                    type: 'value'
                  },
                  yAxis3D: {
                    type: 'value'
                  },
                  zAxis3D: {
                    type: 'value',
                    name: '高度',
                    // max: 10,
                    // min: 0
                  },
                  grid3D: {
                    axisLine: {},
                    axisPointer: {},
                    viewControl: {
                      // autoRotate: true
                    },
                    light: {
                      main: {
                        shadow: true,
                        quality: 'ultra',
                        intensity: 1.5
                      }
                    }
                  },
                  series: [{
                    type: 'bar3D',
                    data,
                    shading: 'lambert',
                    label: {
                      formatter: function (param) {
                        return param.value[2];
                      }
                    }
                  }]
                });
            }
          })
          .catch(() => {
          })
      },
      // 获取粮温数据
      getGrainTemperature(storehouseGbCode, warehouseGbCode) {
        fetchGrainTemperature({storehouseGbCode, warehouseGbCode})
          .then((ret) => {
            if (ret.code == 200) {
              const {temperatureDetail, temperatureArray} = ret.data;
              this.maxLayer = Math.max(...temperatureArray.map(t => t.z));
              this.drawGauge('insideTemperature', '仓内温度', +temperatureDetail.insideTemperature);
              this.drawGauge('outsideTemperature', '仓外温度', +temperatureDetail.outsideTemperature);
              this.drawGauge('insideHumidity', '仓内湿度', +temperatureDetail.insideHumidity);
              this.drawGauge('outsideHumidity', '仓外湿度', +temperatureDetail.outsideHumidity);
              this.draw3D(temperatureArray.map((t) => ([t.x, t.y, t.z, t.temperatuer])), temperatureDetail);
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch((err) => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      // 获取气体数据
      getGas(storehouseGbCode, warehouseGbCode) {
        fetchGasForList({storehouseGbCode, warehouseGbCode})
          .then((ret) => {
            if (ret.code == 200) {
              const {gasMonitorDetail} = ret.data;
              const {avCo2, avO2, avPh3} = gasMonitorDetail;
              gasMonitorDetail.ph3 = avPh3;
              gasMonitorDetail.co2 = avCo2;
              gasMonitorDetail.o2 = avO2;
              this.gasMonitorDetail = gasMonitorDetail;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch((err) => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      // 获取虫情
      getInsect(storehouseGbCode, warehouseGbCode) {
        fetchFumigationHome({storehouseGbCode, warehouseGbCode})
          .then((ret) => {
            if (ret.code == 200) {
              const {aVGInsector} = ret.data;
              if (Array.isArray(aVGInsector) && aVGInsector.length) {
                this.insect = aVGInsector[0].quantity;
              }
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch((err) => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      drawGauge(type, name, value) {
        this.$echarts
          .init(document.getElementById(type))
          .setOption({
            title: {
              text: name,
              left: 'center',
              bottom: '15%',
              textStyle: {
                fontSize: 12
              }
            },
            grad: {
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            },
            tooltip: {
              formatter: "{a} : {c}"
            },
            series: [
              {
                name,
                type: 'gauge',
                data: [{value: value}],
                axisLine: {
                  lineStyle: {
                    width: 5
                  }
                },
                axisTick: {
                  length: 8,
                  lineStyle: {
                    color: 'auto'
                  }
                },
                splitLine: {
                  length: 12,
                  lineStyle: {
                    color: 'auto'
                  }
                },
                axisLabel: {
                  distance: 0,
                  fontSize: 10
                },
                pointer: {
                  width: 5
                },
                detail: {
                  fontSize: 15,
                  formatter: '{value}'
                },
              }
            ]
          })
      },
      draw3D(source, temperatureDetail) {
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
              min: temperatureDetail.minTemperature,
              max: temperatureDetail.maxTemperature,
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
      getVideo:function (warehouseGbCode) {
          var vm=this;
        getDvr({warehouseGbCode})
          .then((ret) => {
            if (ret.code == 200) {
                vm.oLiveView.szIP=ret.data.dataList[0].dvrIp;
                vm.oLiveView.szPort=ret.data.dataList[0].dvrPort;
                vm.oLiveView.szUsername=ret.data.dataList[0].userName;
                vm.oLiveView.szPassword=ret.data.dataList[0].userPwd;
                vm.oLiveView.iChannelID=ret.data.dataList[0].channelNo;
                
                $('#message').val(JSON.stringify(vm.oLiveView)); 
                document.querySelector('#iframe').src='../../../static/html/video.html?id=message';
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch((err) => {
            layer.alert(err.message, {closeBtn: 0});
          });
      }
    },
    mounted() {
      var vm=this;
      if (this.$route.query.id) {
        this.getInventory(this.$route.query.id);
        this.getQuantityDetection(this.$route.query.id);
        this.getVideo(this.$route.query.id);
      }
      
    }
  };
</script>
