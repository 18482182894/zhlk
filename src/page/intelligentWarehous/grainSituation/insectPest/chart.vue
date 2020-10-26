<template>
  <div class="content">
    <div class="menuManage operationLog company">
      <div>
        <div class="btn btn-add" @click="getChart">
          <img src="../../../../../static/images/search.png" alt="">
          <label>查找</label>
        </div>
      </div>
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
      </div>
      <div class="insectChart">
        <div class="chart-pie" id="pie"></div>
        <div class="chart-histogram" id="histogram"></div>
        <div class="chart-broken" id="broken"></div>
      </div>
      <div class="detail-back">
        <button @click="$router.back()">返回</button>
      </div>
    </div>
  </div>
</template>

<style type="text/css" scoped>
  .lookup .excision {
    margin-right: 2rem;
  }
</style>
<script>
  import {storehouse, granary} from "@/api/systemManage/dropDown";
  import {fetchInsectPestChart} from '@/api/intelligentWarehous/grainSituation';

  export default {
    name: "company",
    data() {
      return {
        postData: {
          storehouseGbCode: '',
          warehouseGbCode: '',
        },
        storehouseList: [], //仓房下拉
        granaryList: [], // 廒间下拉
      };
    },
    methods: {
      getChart() {
        var vm = this;
        layer.load(2);
        fetchInsectPestChart(vm.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              const {insectPositionList, insectTimeList, kindList} = ret.data.dataMap;
              this.drawPointChart(insectPositionList);
              this.drawKindChart(kindList);
              this.drawTimeChart(insectTimeList);
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
      drawPointChart(insectPositionList) {
        this.$echarts
          .init(document.getElementById('histogram'))
          .setOption({
            title: {
              text: '各点位虫害浓度图'
            },
            xAxis: {
              type: 'category',
              data: insectPositionList.map(p => p.pointPosition)
            },
            yAxis: {
              name : '密度(头/公斤)',
              type: 'value'
            },
            legend: {
              data: ['虫情密度']
            },
            series: [{
              name: '虫情密度',
              type: 'bar',
              barWidth: 30,
              data: insectPositionList.map(p => p.Number),
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              },
              markLine: {
                data: [
                  {type: 'average', name: '平均值'}
                ]
              }
            }]
          });
      },
      drawKindChart(kindList) {
        this.$echarts
          .init(document.getElementById('pie'))
          .setOption({
            title: {
              text: '',
            },
            legend: {
              orient: 'vertical',
              bottom: 'bottom',
              data: kindList.map(k => k.insectKind)
            },
            series: [
              {
                name: '',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: kindList.map(k => ({value: k.quantity, name: k.insectKind})),
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
      },
      drawTimeChart(insectTimeList) {
        this.$echarts
          .init(document.getElementById('broken'))
          .setOption({
            title: {
              text: '虫情趋势图',
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['虫情密度']
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: insectTimeList.map(t => t.checkTime)
            },
            yAxis: {
              name : '密度(头/公斤)',
              type: 'value',
            },
            series: [
              {
                name: '虫情密度',
                type: 'line',
                data: insectTimeList.map(t => t.Number),
                markPoint: {
                  data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                  ]
                },
                markLine: {
                  data: [
                    {type: 'average', name: '平均值'}
                  ]
                }
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
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      }
    }, watch: {
      'postData.storehouseGbCode'(newCode, oldCode) { // 监听仓房变化获取廒间列表
        if (newCode && newCode !== oldCode) {
          this.granaryList = [];
          this.postData.warehouseGbCode = '';
          this.getGranary(newCode);
        }
      }
    },
    mounted() {
      this.getChart();
      this.getStorehouse();
    }
  };
</script>
