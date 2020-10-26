<template>
  <div class="content">
    <div class="menuManage roleManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">基础信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div>
              <span>
                仓房：
                <select class="select-style excision" v-model="detail.storehouseGbCode">
                  <option
                    v-for="item in storehouseList"
                    :key="item.storehouseGbCode"
                    :value="item.storehouseGbCode"
                    v-text="item.storehouseName"/>
                </select>
              </span>
              <span>
                仓廒：
                <select class="select-style excision" v-model="detail.warehouseGbCode">
                 <option
                   v-for="item in granaryList"
                   :key="item.warehouseGbCode"
                   :value="item.warehouseGbCode"
                   v-text="item.warehouseName"/>
                </select>
              </span>
              <span>
                检查时间：
                <input type="text" class="input-text Wdate" @click="initCheckDateTime('checkDatetime')"
                       id="checkDatetime"/>
              </span>
              <br/>
              <span>
                天气：
                <input type="text" class="input-text" v-model="detail.weather"/>
              </span>
              <span>
                气温℃：
                <input type="text" class="input-text bg" disabled v-model="detail.airTemperature"/>
              </span>
              <span>
                大气湿度：
                <input type="text" class="input-text bg" disabled v-model="detail.airHumidity"/>
              </span>
              <span>
                仓温℃：
                <input type="text" class="input-text bg" disabled v-model="detail.warehouseTemperature"/>
              </span>
              <span>
                仓湿：
                <input type="text" class="input-text bg" disabled v-model="detail.warehouseHumidity"/>
              </span>
              <span>
                数量kg：
                <!-- <input type="text" class="input-text" v-model="detail.quantity"/> -->
                <input type="text" class="input-text" onkeyup="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')" v-model="detail.quantity"/>
              </span>
              <span>
                粮堆最高点温度℃：
                <input type="text" class="input-text bg" disabled v-model="detail.grainHeapMaxTemperature"/>
              </span>
              <span>
                粮堆最低点温度℃：
                <input type="text" class="input-text bg" disabled v-model="detail.grainHeapMinTemperature"/>
              </span>
              <span>
                最高点部位：
                <input type="text" class="input-text" v-model="detail.highestParts"/>
              </span>
              <span>
                最低点部位：
                <input type="text" class="input-text" v-model="detail.lowestParts"/>
              </span>
              <span>
                可疑点温度℃：
                <!-- <input type="text" class="input-text" v-model="detail.suspiciousPointsTemperature"/> -->
                <input type="text" class="input-text" onkeyup="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')" v-model="detail.suspiciousPointsTemperature"/>
              </span>
              <span>
                可疑点部位：
                <input type="text" class="input-text" v-model="detail.suspiciousPointsParts"/>
              </span>
              <span>
                整仓平均粮温℃：
                <input type="text" class="input-text bg" disabled v-model="detail.wholeAvgGrainTemperature"/>
              </span>
              <span>
                上层温度℃：
                <input type="text" class="input-text bg" disabled v-model="detail.upperLayerTemperature"/>
              </span>
              <span>
                中上层温度℃：
                <input type="text" class="input-text bg" disabled v-model="detail.upperMiddleTemperature"/>
              </span>
              <span>
                中下层温度℃：
                <input type="text" class="input-text bg" disabled v-model="detail.lowerMiddleTemperature"/>
              </span>
              <span>
                下层温度℃：
                <input type="text" class="input-text bg" disabled v-model="detail.lowerTemperature"/>
              </span>
              <span>
                虫种：
                <select class="select-style excision" v-model="detail.insectKind">
                 <option
                   v-for="item in insectKindList"
                   :key="item.dicInfoCode"
                   :value="item.dicInfoCode"
                   v-text="item.dicInfoValue"/>
                </select>
              </span>
              <span>
                虫密度：
                <input type="text" class="input-text" v-model="detail.insectDensity"/>
                <!-- <input type="text" class="input-text" onkeyup="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')" v-model="detail.insectDensity"/> -->
              </span>
              <span>
                变质：
                <input type="text" class="input-text" v-model="detail.deterioration"/>
              </span>
              <span>
                鼠、雀：
                <input type="text" class="input-text" v-model="detail.mouseSparrow"/>
              </span>
              <span>
                检查人员：
                <select class="select-style excision" v-model="detail.checkMan">
                 <option
                   v-for="item in staffListData"
                   :key="item.staff_id"
                   :value="item.staff_id"
                   v-text="item.staff_name"/>
                </select>
              </span>
              <br>
              <span style="width: 50%">
                事故：
                <textarea class="edit-textarea" v-model="detail.accident"></textarea>
              </span>
              <span style="width: 50%">
                仓房状况：
                <textarea class="edit-textarea" v-model="detail.storehouseStatus"></textarea>
              </span>
              <span style="width: 50%">
                储粮技术措施：
                <textarea class="edit-textarea" v-model="detail.storageTechnologyMeasures"></textarea>
              </span>
              <span style="width: 50%">
                其他：
                <textarea class="edit-textarea" v-model="detail.others"></textarea>
              </span>
              <span style="width: 50%">
                粮情分析：
                <textarea class="edit-textarea" v-model="detail.grainSituationAnalysis"></textarea>
              </span>
              <span style="width: 50%">
                处理意见：
                <textarea class="edit-textarea" v-model="detail.handlingOpinions"></textarea>
              </span>
              <span style="width: 50%">
                科室意见：
                <textarea class="edit-textarea" v-model="detail.departmentOpinions"></textarea>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="edit-btn">
        <button class="edit-submit" @click="submitEvent();">提交</button>
        <button class="edit-back" @click="detailBack();">返回</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .bg{
		background-color: #EBEBE4;
	}
</style>

<script>
  import {
    addGrainInspection,
    editGrainInspection,
    fetchGrainInspection,
    fetchGrainInspectionTemperature,
  } from "@/api/intelligentWarehous/grainInspection";
  import {fetchWeatherList} from "@/api/intelligentWarehous/weather";
  import {fetchQuantityDetectionList} from "@/api/intelligentWarehous/quantityDetection";
  import {graindepot, storehouse, granary, insectKindDict} from "@/api/systemManage/dropDown";
  import {staffList} from "@/api/systemManage/staff";

  export default {
    name: 'grainInspectionEdit',
    data() {
      return {
        detail: {
          grainCheckRecordId: '',
          graindepotGbCode: '',
          storehouseGbCode: '',
          storehouseName: '',
          warehouseGbCode: '',
          warehouseName: '',
          weather: '',
          airTemperature: '',
          airHumidity: '',
          warehouseTemperature: '',
          warehouseHumidity: '',
          quantity: '',
          checkDatetime: '',
          grainHeapMaxTemperature: '',
          grainHeapMinTemperature: '',
          highestParts: '',
          lowestParts: '',
          suspiciousPointsTemperature: '',
          suspiciousPointsParts: '',
          wholeAvgGrainTemperature: '',
          upperLayerTemperature: '',
          upperMiddleTemperature: '',
          lowerMiddleTemperature: '',
          lowerTemperature: '',
          insectKind: '',
          insectDensity: '',
          deterioration: '',
          mouseSparrow: '',
          checkMan: '',
          accident: '',
          storehouseStatus: '',
          storageTechnologyMeasures: '',
          others: '',
          grainSituationAnalysis: '',
          handlingOpinions: '',
          departmentOpinions: '',
        },
        storehouseList: [],
        granaryList: [],
        staffListData: [],
        insectKindList: [],
      };
    },
    methods: {
      getDetail(id) {
        layer.load(2);
        fetchGrainInspection(id)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              this.detail = ret.data.dataMap;
              document.getElementById('checkDatetime').value = this.detail.checkDatetime;
              this.initStorehouseGbCodeByDetail = true;
              this.initWarehouseGbCodeByDetail = true;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      submitEvent: function () {
        this.detail.checkDatetime = document.getElementById('checkDatetime').value;
        if (!this.detail.storehouseGbCode) return layer.msg("请选择仓房");
        if (!this.detail.warehouseGbCode) return layer.msg("请选择仓廒");
        if (!this.detail.weather) return layer.msg("请填写天气");
        if (!this.detail.airTemperature) return layer.msg("请填写气温");
        if (!this.detail.airHumidity) return layer.msg("请填写大气温度");
        if (!this.detail.warehouseTemperature) return layer.msg("请填写仓温");
        if (!this.detail.warehouseHumidity) return layer.msg("请填写仓湿");
        if (!this.detail.quantity) return layer.msg("请填写数量");
        if (!this.detail.checkDatetime) return layer.msg("请填写检查时间");
        if (!this.detail.grainHeapMaxTemperature) return layer.msg("请填写粮堆最高点温度");
        if (!this.detail.grainHeapMinTemperature) return layer.msg("请填写粮堆最低点温度");
        if (!this.detail.highestParts) return layer.msg("请填写最高点部位");
        if (!this.detail.lowestParts) return layer.msg("请填写最低点部位");
        if (!this.detail.suspiciousPointsTemperature) return layer.msg("请填写可疑点温度");
        if (!this.detail.suspiciousPointsParts) return layer.msg("请填写可疑点部位");
        if (!this.detail.wholeAvgGrainTemperature) return layer.msg("请填写整仓平均粮温");
        if (!this.detail.upperLayerTemperature) return layer.msg("请填写上层温度");
        if (!this.detail.upperMiddleTemperature) return layer.msg("请填写中上层温度");
        if (!this.detail.lowerMiddleTemperature) return layer.msg("请填写中下层温度");
        if (!this.detail.lowerTemperature) return layer.msg("请填写下层温度");
        if (!this.detail.insectKind) return layer.msg("请填写虫种");
        if (!this.detail.insectDensity) return layer.msg("请填写虫密度");
        if (!this.detail.deterioration) return layer.msg("请填写变质");
        if (!this.detail.mouseSparrow) return layer.msg("请填写鼠、雀");
        if (!this.detail.checkMan) return layer.msg("请填写检查人员");
        if (!this.detail.accident) return layer.msg("请填写事故");
        if (!this.detail.storehouseStatus) return layer.msg("请填写仓房状况");
        if (!this.detail.storageTechnologyMeasures) return layer.msg("请填写储粮技术措施");
        if (!this.detail.others) return layer.msg("请填写其他");
        if (!this.detail.grainSituationAnalysis) return layer.msg("请填写粮情分析");
        if (!this.detail.handlingOpinions) return layer.msg("请填写处理意见");
        if (!this.detail.departmentOpinions) return layer.msg("请填写科室意见");
        this.detail.storehouseName = this.storehouseList.find(storehouse => this.detail.storehouseGbCode === storehouse.storehouseGbCode).storehouseName;
        this.detail.warehouseName = this.granaryList.find(granary => this.detail.warehouseGbCode === granary.warehouseGbCode).warehouseName;
        const api = this.detail.grainCheckRecordId ? editGrainInspection : addGrainInspection;
        layer.load(2);
        api(this.detail)
          .then((ret) => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("保存成功！");
              this.$router.back();
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      detailBack: function () {
        this.$router.back();
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
      getStaff() { // 获取检查人员列表
        staffList({pageNo: 1, pageSize: 1000})
          .then((ret) => {
            if (ret.code == 200) {
              this.staffListData = ret.data.staffList;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      getInsectKind() { // 获取虫种列表
        insectKindDict({pageNo: 1, pageSize: 1000})
          .then((ret) => {
            if (ret.code == 200) {
              this.insectKindList = ret.data.dataList;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      getGrainInspectionTemperature(warehouseGbCode) { // 根据廒间获取廒间温度信息
        fetchGrainInspectionTemperature({warehouseGbCode})
          .then((ret) => {
            if (ret.code == 200) {
              const {temperature} = ret.data;
              this.detail.warehouseTemperature = temperature.insideTemp;
              this.detail.warehouseHumidity = temperature.insideHum;
              this.detail.grainHeapMaxTemperature = temperature.maxTemp;
              this.detail.grainHeapMinTemperature = temperature.minTemp;
              this.detail.wholeAvgGrainTemperature = temperature.avgTempByStorehouse;
              this.detail.upperLayerTemperature = temperature.topLayerTemp;
              this.detail.upperMiddleTemperature = temperature.upperMiddleLayerTemp;
              this.detail.lowerMiddleTemperature = temperature.lowerMiddleLayerTemp;
              this.detail.lowerTemperature = temperature.underLayerTemp;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch((err) => {
            layer.alert(err.message, {closeBtn: 0});
          })
      },
      getGrainQuantity(warehouseGbCode) { // 根据廒间获取廒间温度信息
        fetchQuantityDetectionList({warehouseGbCode, pageNo: 1, pageSize: 1})
          .then((ret) => {
            if (ret.code == 200) {
              console.log(ret);
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch((err) => {
            layer.alert(err.message, {closeBtn: 0});
          })
      },
      getWeather(checkDatetime) {
        fetchWeatherList({checkDatetime, pageSize: 1, pageNo: 1})
          .then((ret) => {
            if (ret.code == 200) {
              const {temperature} = ret.data;
              const list = ret.data.dataList || [];
              if (list.length) {
                const data = list[0];
                this.detail.airTemperature = data.temperature;
                this.detail.airHumidity = data.humidity;
              } else {
                layer.alert('没有查询到当天的天气信息', {closeBtn: 0});
              }
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch((err) => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      initCheckDateTime(id) {
        WdatePicker({
          el: id,
          maxDate: '%y-%M-%d',
          dateFmt: 'yyyy-MM-dd HH:mm:ss',
          onpicked: () => {
            this.detail.checkDateTime = document.getElementById(id).value;
            this.detail.airTemperature = '';
            this.detail.airHumidity = '';
            this.getWeather(this.detail.checkDateTime.slice(0, 10));
          },
          oncleared: () => {
            this.detail.checkDateTime = '';
            this.detail.airTemperature = '';
            this.detail.airHumidity = '';
          },
        });
      },
    },
    watch: {
      'detail.storehouseGbCode'(newCode, oldCode) { // 监听仓房变化获取廒间列表
        if (newCode && newCode !== oldCode) {
          if (!this.initStorehouseGbCodeByDetail) {
            this.detail.warehouseGbCode = '';
            this.detail.warehouseTemperature = '';
            this.detail.warehouseHumidity = '';
            this.detail.grainHeapMaxTemperature = '';
            this.detail.grainHeapMinTemperature = '';
            this.detail.wholeAvgGrainTemperature = '';
            this.detail.upperLayerTemperature = '';
            this.detail.upperMiddleTemperature = '';
            this.detail.lowerMiddleTemperature = '';
            this.detail.lowerTemperature = '';
          }
          this.initStorehouseGbCodeByDetail = false;
          this.granaryList = [];
          this.getGranary(newCode);
        }
      },
      'detail.warehouseGbCode'(newCode, oldCode) { // 监听廒间变化获取廒间信息
        if (newCode && newCode !== oldCode) {
          if (!this.initWarehouseGbCodeByDetail) {
            this.detail.warehouseTemperature = '';
            this.detail.warehouseHumidity = '';
            this.detail.grainHeapMaxTemperature = '';
            this.detail.grainHeapMinTemperature = '';
            this.detail.wholeAvgGrainTemperature = '';
            this.detail.upperLayerTemperature = '';
            this.detail.upperMiddleTemperature = '';
            this.detail.lowerMiddleTemperature = '';
            this.detail.lowerTemperature = '';
          }
          this.initWarehouseGbCodeByDetail = false;
          this.getGrainInspectionTemperature(newCode);
          // TODO this.getGrainQuantity(newCode);
        }
      },
    },
    mounted() {
      this.getStorehouse();
      this.getStaff();
      this.getInsectKind();
      if (this.$route.query.id) {
        this.getDetail(this.$route.query.id);
      }
    }
  };
</script>
