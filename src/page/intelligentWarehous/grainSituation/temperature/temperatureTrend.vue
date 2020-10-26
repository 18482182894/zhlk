<template>
  <div class="content">
    <div class="menuManage operationLog ">
      <div class="lookup">
        仓房：
        <select class="select-style excision" v-model="postData.storehouseGbCode">
          <option
            v-for="item in storehouseList"
            :key="item.storehouseGbCode"
            :value="item.storehouseGbCode"
            v-text="item.storehouseName"/>
        </select>
        廒间：
        <select class="select-style excision" v-model="postData.warehouseGbCode">
          <option
            v-for="item in granaryList"
            :key="item.warehouseGbCode"
            :value="item.warehouseGbCode"
            v-text="item.warehouseName"/>
        </select>
        时间：
        <input type="text" class="input-text Wdate"
               onclick="WdatePicker({maxDate:'%y-%M-%d', dateFmt:'yyyy-MM-dd HH:mm:ss'})" id="startTime"/>~
        <input type="text" class="input-text excision Wdate"
               onclick="WdatePicker({maxDate:'%y-%M-%d', dateFmt:'yyyy-MM-dd HH:mm:ss'})" id="endTime"/>

        <div class="btn btn-add" @click="getList(1);">
          <img src="../../../../../static/images/search.png" alt="">
          <label>查找</label>
        </div>
      </div>
      <div class="temperature" id="temperatureTrend">

      </div>
      <div class="detail-back">
        <button @click="$router.back()">返回</button>
      </div>
    </div>
  </div>
</template>
<style type="text/css" scoped>
  #temperatureTrend {
    height: 570px;
  }
</style>
<script>
  import {storehouse, granary} from "@/api/systemManage/dropDown";
  import {fetchGrainTemperatureTrend} from "@/api/intelligentWarehous/grainSituation";

  export default {
    name: "contract",
    data() {
      return {
        postData: {
          storehouseGbCode: '',
          warehouseGbCode: '',
          startTime: '',
          endTime: '',
        },
        data: [],
        storehouseList: [],//仓房下拉列表
        granaryList: [],//廒间下拉列表
      };
    },
    methods: {
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
      getList() {//获取列表
        this.postData.startTime = document.getElementById('startTime').value;
        this.postData.endTime = document.getElementById('endTime').value;
        layer.load(2);
        fetchGrainTemperatureTrend(this.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              this.data = ret.data;
              this.draw();
            } else {
              if (ret.code == "500" && ret.data == "查询错误，没有数据") {
                layer.msg("暂无数据");
                this.data = {};
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
      draw() {
        this.$echarts
          .init(document.getElementById('temperatureTrend'))
          .setOption({
            title: {
              text: ''
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['粮食均温', '仓内温', '仓外温', '仓内湿', '仓外湿']
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
            dataZoom: [
              {
                show: true,
                realtime: true,
              },
              {
                type: 'inside',
                realtime: true,
              }
            ],
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: this.data.dateTimeArray
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: '粮食均温',
                type: 'line',
                stack: '粮食均温',
                data: this.data.avgTemperatureArray
              },
              {
                name: '仓内温',
                type: 'line',
                stack: '仓内温',
                color: '#DAA520',
                data: this.data.insideTemperatureArray
              },
              {
                name: '仓外温',
                type: 'line',
                stack: '仓外温',
                color: '#00FFFF',
                data: this.data.outsideTemperatureArray
              },
              {
                name: '仓内湿',
                type: 'line',
                stack: '仓内湿',
                data: this.data.insideHumidityArray
              },
              {
                name: '仓外湿',
                type: 'line',
                stack: '仓外湿',
                color: '#FF00FF',
                data: this.data.outsideHumidityArray
              },
            ]
          });
      }
    },
    watch: {
      'postData.storehouseGbCode'(newCode, oldCode) { // 监听仓房变化获取廒间列表
        if (newCode && newCode !== oldCode) {
          if (!this.storehouseGbCodeChangeByDetail) {
            this.postData.warehouseGbCode = '';
          }
          this.storehouseGbCodeChangeByDetail = false;
          this.granaryList = [];
          this.getGranary(newCode);
        }
      }
    },
    mounted() {
      this.getStorehouse();
      const {storehouseGbCode, warehouseGbCode} = this.$route.query;
      if (storehouseGbCode && warehouseGbCode) {
        this.storehouseGbCodeChangeByDetail = true; // 详情里面设置时不监听廒间
        this.postData.storehouseGbCode = storehouseGbCode;
        this.postData.warehouseGbCode = warehouseGbCode;
        this.getList()
      }
    }
  };

</script>
