<template>
  <div class="content">
    <div class="aerationSet">
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
        设备操作方式：
        <select class="select-style excision" v-model="postData.aerationType">
          <option value="自动通风">自动通风</option>
          <option value="手动通风">手动通风</option>
        </select>
        <br>
        时间：
        <input type="text" class="input-text Wdate" onclick="WdatePicker()" id="leaveStartDate">~
        <input type="text" class="input-text Wdate excision" onclick="WdatePicker()" id="leaveEndDate">
        <span>
          <div class="btn btn-add" @click="getList()">
            <img src="../../../../static/images/search.png" alt="">
            <label>查找</label>
          </div>
        </span>
      </div>
      <div>
        <div class="btn btn-add" @click="jumpEdit();">
          <img src="../../../../static/images/add.png" alt="">
          <label>新增</label>
        </div>
      </div>
    </div>
    <form>
      <fieldset>
        <legend>实时数据</legend>
        <div class="chart-gauge-box">
          <div class="chart-gauge" id="insideTemperature"></div>
          <div class="chart-gauge" id="insideHumidity"></div>
          <div class="chart-gauge" id="outsideTemperature"></div>
          <div class="chart-gauge" id="outsideHumidity"></div>
        </div>
      </fieldset>
    </form>
    <div class="model-list">
      <div class="model-item" v-for="(item, i) in listData">
        <div class="model-close" @click="delData(item.lowTempAutoAerationId);">×</div>
        <div class="model-item-lt">
          <img src="../../../../static/images/air-conditioner.png"/>
        </div>
        <div class="model-item-rt">
          <div class="model-item-name">{{ item.lowTempAutoAerationName}}</div>
          <div class="model-item-condition">
            <div class="condition-label">开启条件：</div>
            <div class="condition-value">
              <div class="condition-value-item">{{item.startStr}}</div>
            </div>
          </div>
          <div class="model-item-bt">
            <div class="condition-status">运行状态：
              <span v-if="item.onOffSwitch==1">{{ '运行中' }}</span>
              <span v-if="item.onOffSwitch==0">{{ '暂停' }}</span>
            </div>
            <!--<div class="condition-params">模型参数</div>-->
          </div>
        </div>
      </div>
    </div>
    <div class="edit-btn">
      <button class="edit-submit" @click="editBack();">返回</button>
    </div>
  </div>
</template>

<style type="text/css" scoped>
  .content {
    padding-bottom: 20px;
  }

  form {
    margin: 0 30px 10px;
  }

  .chart-gauge-box {
    display: flex;
  }

  .chart-gauge {
    flex: 1;
    height: 150px;
  }

  .model-list {
    margin: 0 30px 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .model-item {
    width: calc(50% - 10px);
    display: flex;
    border: 1px solid #979797;
    padding-bottom: 20px;
    margin-bottom: 20px;
    box-sizing: border-box;
    position: relative;
  }

  .model-close {
    position: absolute;
    top: 10px;
    left: 10px;
    width:20px;
    height:20px;
    background:rgba(255,50,50,1);
    border-radius: 50%;
    text-align: center;
    line-height: 20px;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
  }

  .model-item-lt {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
  }

  .model-item-lt img {
    width: 190px;
    height: 88px;
  }

  .model-item-rt {
    flex: 1;
  }

  .model-item-name {
    background: rgba(149, 201, 62, 1);
    font-size: 16px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 40px;
    text-align: center;
    cursor: pointer;
  }

  .model-item-condition {
    display: flex;
    align-items: center;
    margin: 20px 20px 20px 0;
  }

  .condition-label {
    font-size: 16px;
    font-weight: 400;
    color: rgba(149, 201, 62, 1);
  }

  .condition-value {
    flex: 1;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(151, 151, 151, 1);
    padding: 5px;
    height: 66px;
  }

  .condition-value-item {
    font-size: 14px;
    font-weight: 400;
    color: rgba(74, 74, 74, 1);
    line-height: 22px;
  }

  .model-item-bt {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: 20px;
  }

  .condition-params {
    width: 100px;
    text-align: center;
    line-height: 40px;
    border: 1px solid rgba(149, 201, 62, 1);
    font-size: 16px;
    font-weight: 400;
    color: rgba(149, 201, 62, 1);
    cursor: pointer;
  }
</style>

<script>
  import {fetchGrainTemperature,lowTemAutoList,lowTemAutoDel} from '@/api/intelligentWarehous/grainSituation';
  import {storehouse, granary} from "@/api/systemManage/dropDown";

  export default {
    name: "lowTemperatureAuto",
    data() {
      return {
        postData: {
          storehouseGbCode: this.$route.query.storehouseGbCode,
          warehouseGbCode: this.$route.query.warehouseGbCode,
          aerationType:this.$route.query.aerationType,
          leaveStartDate:this.$route.query.leaveStartDate,
          leaveEndDate:this.$route.query.leaveEndDate,
          pageSize: 10,
          pageNo:1,
        },
        listData: [],
        storehouseList: [],//仓房下拉列表
        granaryList: [],//廒间下拉列表
      };
    },
    methods: {
      getList() {
        var vm=this;
        vm.postData.leaveStartDate = $("#leaveStartDate").val();
        vm.postData.leaveEndDate = $("#leaveEndDate").val();
        lowTemAutoList(vm.postData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                vm.listData = ret.data.dataList;
                //console.log(vm.listData);
              } else {
                layer.alert(ret.data, { closeBtn: 0 });
              }
            })
            .catch(err => {
              layer.alert(err.message, { closeBtn: 0 });
            });
        },
      // 获取粮温数据
      getGrainTemperature(storehouseGbCode, warehouseGbCode) {
        fetchGrainTemperature({storehouseGbCode, warehouseGbCode})
          .then((ret) => {
            if (ret.code == 200) {
              const {temperatureDetail} = ret.data;
              this.drawGauge('insideTemperature', '仓内温度', +temperatureDetail.insideTemperature);
              this.drawGauge('outsideTemperature', '仓外温度', +temperatureDetail.outsideTemperature);
              this.drawGauge('insideHumidity', '仓内湿度', +temperatureDetail.insideHumidity);
              this.drawGauge('outsideHumidity', '仓外湿度', +temperatureDetail.outsideHumidity);
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
      jumpEdit(){
        var condition=this.postData;
        this.$router.push({
          name: 'lowTemperatureAutoEdit',
          query: {
            storehouseGbCode: this.postData.storehouseGbCode,
            warehouseGbCode: this.postData.warehouseGbCode,
            aerationType:this.postData.aerationType,
            leaveStartDate:this.postData.leaveStartDate,
            leaveEndDate:this.postData.leaveEndDate,
            pageNo: this.postData.pageNo,
          }
        });
      },
      getStorehouse() { // 获取仓房列表
        storehouse()
          .then((ret) => {
            if (ret.code == 200) {
              this.storehouseList = ret.data.dataList;
              this.postData.storehouseGbCode=this.storehouseList[0].storehouseGbCode;
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
              this.getList();
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      delData: function(id) {
        //删除
        var vm = this;
        layer.confirm(
          "确定删除？",
          {
            btn: ["确定", "取消"] //按钮
          },
          function() {
            layer.load(2);
            lowTemAutoDel({lowTempAutoAerationId:id})
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  layer.msg("删除成功！");
                  vm.getList();
                } else {
                  layer.alert(ret.data, { closeBtn: 0 });
                }
              })
              .catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
              });
          }
        );
      },
      editBack(){
        this.$router.push({
          name: "lowTemperature",
          query: {
            storehouseGbCode: this.postData.storehouseGbCode,
            warehouseGbCode: this.postData.warehouseGbCode,
            aerationType:this.postData.aerationType,
            leaveStartDate:this.postData.leaveStartDate,
            leaveEndDate:this.postData.leaveEndDate,
            pageNo:this.postData.pageNo,
          }
        })
      }
    },
    watch: {
      'postData.storehouseGbCode'(newCode, oldCode) { // 监听仓房变化获取廒间列表
        if (newCode && newCode !== oldCode) {
          this.granaryList = [];
          this.postData.warehouseGbCode = '';
          this.getGranary(newCode);
        }
      },
      'postData.warehouseGbCode'(newCode, oldCode) { // 监听廒间变化获取图表数据
        if (newCode && newCode !== oldCode) {
          this.getGrainTemperature(this.postData.storehouseGbCode, newCode);
        }
      }
    },
    mounted() {
      this.getStorehouse();
    }
  };

</script>
