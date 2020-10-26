<template>
  <div class="content">
    <div class="aerationSet">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">创建通风策略</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div>
              <span>
                模型名称：
                <input type="text" class="input-text" v-model="detail.autoAerationName">
              </span>
              <span>
                仓房：
                 <select class="select-style excision" v-model="detail.storehouseGbCode"
                         @change="storehouseChangeHandler($event)">
                  <option
                    v-for="item in storehouseList"
                    :key="item.storehouseGbCode"
                    :value="item.storehouseGbCode"
                    v-text="item.storehouseName"/>
                 </select>
              </span>
              <span>
                廒间：
                <select class="select-style excision" v-model="detail.warehouseGbCode"
                        @change="warehouseChangeHandler($event)">
                  <option
                    v-for="item in granaryList"
                    :key="item.warehouseGbCode"
                    :value="item.warehouseGbCode"
                    v-text="item.warehouseName"/>
                 </select>
              </span>
              <span>
                通风目的：
                <select class="select-style" v-model="detail.aerationPurpose">
                  <option :value="item.dicInfoCode" v-for="item in ventilationPurposeList" v-text="item.dicInfoValue"/>
                </select>
              </span>
              <span>
                通风类型：
                <select class="select-style" v-model="detail.aerationType">
                  <option :value="item.dicInfoCode" v-for="item in ventilationMethodList" v-text="item.dicInfoValue"/>
                </select>
              </span>
              <span>
                通风时长（h）：
                <input type="text" class="input-text" v-model="detail.aerationDuration">
              </span>
              <span>
                通风方式：
                <select class="select-style" v-model="detail.aerationMode">
                  <option :value="item.dicInfoCode" v-for="item in ventilationModeList" v-text="item.dicInfoValue"/>
                </select>
              </span>
            </div>
          </div>
        </div>
        <div class="autoModel">
          <div class="autoModel-open">
            <p>开启条件</p>
            <p>仓内条件：</p>
            <div class="condition">
              <span>
                <label>温度：</label>
                <select v-model="detail.ocTempJudge">
                  <option v-for="item in conditionList" :value="item">{{item}}</option>
                </select>
                <input type="number" v-model="detail.ocTempValue">度
              </span>
              <span>
                <label>湿度：</label>
                <select v-model="detail.ocHumidityJudge">
                  <option v-for="item in conditionList" :value="item">{{item}}</option>
                </select>
                <input type="number" v-model="detail.ocHumidityValue">%
              </span>
              <span>
                <label>最高粮温：</label>
                <select v-model="detail.ocHighestTempJudge">
                  <option v-for="item in conditionList" :value="item">{{item}}</option>
                </select>
                <input type="number" v-model="detail.ocHighestTempValue">度
              </span>
              <span>
                <label>最低粮温：</label>
                <select v-model="detail.ocLowestTempJudge">
                  <option v-for="item in conditionList" :value="item">{{item}}</option>
                </select>
                <input type="number" v-model="detail.ocLowestTempValue">度
              </span>
              <span>
                <label>粮食最高水分：</label>
                <select v-model="detail.ocHighestWaterJudge">
                  <option v-for="item in conditionList" :value="item">{{item}}</option>
                </select>
                <input type="number" v-model="detail.ocHighestWaterValue">%
              </span>
              <span>
                <label>粮食最低水分：</label>
                <select v-model="detail.ocLowestWaterJudge">
                  <option v-for="item in conditionList" :value="item">{{item}}</option>
                </select>
                <input type="number" v-model="detail.ocLowestWaterValue">%
              </span>
              <span>
                <label>二氧化碳：</label>
                <select v-model="detail.ocCo2Judge">
                  <option v-for="item in conditionList" :value="item">{{item}}</option>
                </select>
                <input type="number" v-model="detail.ocCo2Value">%
              </span>
              <span>
                <label>氧气：</label>
                <select v-model="detail.ocO2Judge">
                  <option v-for="item in conditionList" :value="item">{{item}}</option>
                </select>
                <input type="number" v-model="detail.ocO2Value">%
              </span>
            </div>
            <p>仓外条件：</p>
            <div class="condition">
              <span>
                <label>温度：</label>
                <select v-model="detail.ocOutsideTempJudge">
                  <option v-for="item in conditionList" :value="item">{{item}}</option>
                </select>
                <input type="number" v-model="detail.ocOutsideTempValue">度
              </span>
              <span>
                <label>湿度：</label>
                <select v-model="detail.ocOutsideHumidityJudge">
                  <option v-for="item in conditionList" :value="item">{{item}}</option>
                </select>
                <input type="number" v-model="detail.ocOutsideHumidityValue">%
              </span>
              <span>
                <label>天气：</label>
                <select v-model="detail.ocOutsideWeatherJudge">
                  <option value="不限制">不限制</option>
                  <option value="=">=</option>
                </select>
                <select v-model="detail.ocOutsideWeatherValue">
                  <option value="晴">晴</option>
                  <option value="多云">多云</option>
                  <option value="阴">阴</option>
                  <option value="雨">雨</option>
                  <option value="雪">雪</option>
                </select>
              </span>
              <span>
                <label>风力：</label>
                <select v-model="detail.ocOutsideWindPowerJudge">
                  <option value="不限制">不限制</option>
                  <option value="=">=</option>
                </select>
                <select v-model="detail.ocOutsideWindPowerValue">
                  <option :value="i" v-for="i in 9">{{i}}</option>
                </select>
              </span>
            </div>
            <p>
              时间：
              <input type="text" class="input-text Wdate" style="width: 12rem"
                     onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"
                     id="ocDatetime">
            </p>
          </div>
          <div class="autoModel-off">
            <p>关闭条件</p>
            <p>仓内条件：</p>
            <div class="condition">
              <span>
                <label>温度：</label>
                <select v-model="detail.ccTempJudge">
                  <option v-for="item in conditionList" :value="item">{{item}}</option>
                </select>
                <input type="number" v-model="detail.ccTempValue">度
              </span>
              <span>
                <label>湿度：</label>
                <select v-model="detail.ccHumidityJudge">
                  <option v-for="item in conditionList" :value="item">{{item}}</option>
                </select>
                <input type="number" v-model="detail.ccHumidityValue">度
              </span>
              <span>
                <label>最高粮温：</label>
                <select v-model="detail.ccHighestTempJudge">
                  <option v-for="item in conditionList" :value="item">{{item}}</option>
                </select>
                <input type="number" v-model="detail.ccHighestTempValue">%
              </span>
              <span>
                <label>最低粮温：</label>
                <select v-model="detail.ccLowestTempJudge">
                  <option v-for="item in conditionList" :value="item">{{item}}</option>
                </select>
                <input type="number" v-model="detail.ccLowestTempValue">%
              </span>
              <span>
                <label>粮食最高水分：</label>
                <select v-model="detail.ccHighestWaterJudge">
                  <option v-for="item in conditionList" :value="item">{{item}}</option>
                </select>
                <input type="number" v-model="detail.ccHighestWaterValue">%
              </span>
              <span>
                <label>粮食最低水分：</label>
                <select v-model="detail.ccLowestWaterJudge">
                  <option v-for="item in conditionList" :value="item">{{item}}</option>
                </select>
                <input type="number" v-model="detail.ccLowestWaterValue">%
              </span>
              <span>
                <label>二氧化碳：</label>
                <select v-model="detail.ccCo2Judge">
                  <option v-for="item in conditionList" :value="item">{{item}}</option>
                </select>
                <input type="number" v-model="detail.ccCo2Value">%
              </span>
              <span>
                <label>氧气：</label>
                <select v-model="detail.ccO2Judge">
                  <option v-for="item in conditionList" :value="item">{{item}}</option>
                </select>
                <input type="number" v-model="detail.ccO2Value">%
              </span>
            </div>
            <p> 仓外条件：</p>
            <div class="condition">
              <span>
                <label>温度：</label>
                <select v-model="detail.ccOutsideTempJudge">
                  <option v-for="item in conditionList" :value="item">{{item}}</option>
                </select>
                <input type="number" v-model="detail.ccOutsideTempValue">%
              </span>
              <span>
                <label>湿度：</label>
                <select v-model="detail.ccOutsideHumidityJudge">
                  <option v-for="item in conditionList" :value="item">{{item}}</option>
                </select>
                <input type="number" v-model="detail.ccOutsideHumidityValue">%
              </span>
              <span>
                <label>天气：</label>
                <select v-model="detail.ccOutsideWeatherJudge">
                   <option value="不限制">不限制</option>
                  <option value="=">=</option>
                </select>
                <select v-model="detail.ccOutsideWeatherValue">
                  <option value="晴">晴</option>
                  <option value="多云">多云</option>
                  <option value="阴">阴</option>
                  <option value="雨">雨</option>
                  <option value="雪">雪</option>
                </select>
              </span>
              <span>
                <label>风力：</label>
                <select v-model="detail.ccOutsideWindPowerJudge">
                  <option value="不限制">不限制</option>
                  <option value="=">=</option>
                </select>
                <select v-model="detail.ccOutsideWindPowerValue">
                  <option :value="i" v-for="i in 9">{{i}}</option>
                </select>
              </span>
            </div>
            <p>
              时间：
              <input type="text" class="input-text Wdate" style="width: 12rem"
                     onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"
                     id="ccDatetime">
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="granary-pic">
      <img src="../../../../static/images/warehouse-device.png"/>
    </div>
    <DeviceList :device-list="deviceTypeList"/>
    <div class="edit-btn">
      <button class="edit-submit" @click="submitEvent()">提交</button>
      <button class="edit-back" @click="editBack()">返回</button>
    </div>
  </div>
</template>
<style type="text/css" scoped>
  .granary-pic {
    margin-top: 0;
    padding-bottom: 25.67%;
    height: auto;
    position: relative;
  }

  .granary-pic img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .edit-btn {
    margin-bottom: 30px;
  }
</style>
<script>
  import DeviceList from '../DeviceList';
  import dictListMixin from '@/mixin/dictList';
  import {addAutoAerationMode, editAutoAerationMode, fetchAutoAerationMode} from "@/api/intelligentWarehous/aeration";
  import {fetchEquipmentListByWarehouse} from "@/api/IOT/iot";

  export default {
    name: "aerationAutoEdit",
    components: {
      DeviceList,
    },
    mixins: [dictListMixin],
    data() {
      return {
        conditionList: ['不限制', '>', '<', '≥', '≤', '='],
        postData:{
          storehouseGbCode:this.$route.query.storehouseGbCode,
          warehouseGbCode: this.$route.query.warehouseGbCode,
          pageNo:this.$route.query.pageNo!=null?this.$route.query.pageNo:1,
          tabIndex:this.$route.query.tabIndex,
          autoAerationName:this.$route.query.autoAerationName,
        },
        detail: {
          autoAerationId: '',
          autoAerationName: '',
          storehouseGbCode: '',
          warehouseGbCode: '',
          storehouseName: '',
          warehouseName: '',
          aerationPurpose: '',
          aerationType: '',
          aerationDuration: '',
          aerationMode: '',
          ocTempJudge: '',
          ocTempValue: '',
          ocHumidityJudge: '',
          ocHumidityValue: '',
          ocHighestTempJudge: '',
          ocHighestTempValue: '',
          ocLowestTempJudge: '',
          ocLowestTempValue: '',
          ocHighestWaterJudge: '',
          ocHighestWaterValue: '',
          ocLowestWaterJudge: '',
          ocLowestWaterValue: '',
          ocCo2Judge: '',
          ocCo2Value: '',
          ocO2Judge: '',
          ocO2Value: '',
          ocOutsideTempJudge: '',
          ocOutsideTempValue: '',
          ocOutsideHumidityJudge: '',
          ocOutsideHumidityValue: '',
          ocOutsideWeatherJudge: '',
          ocOutsideWeatherValue: '',
          ocOutsideWindPowerJudge: '',
          ocOutsideWindPowerValue: '',
          ocDatetime: '',
          ccTempJudge: '',
          ccTempValue: '',
          ccHumidityJudge: '',
          ccHumidityValue: '',
          ccHighestTempJudge: '',
          ccHighestTempValue: '',
          ccLowestTempJudge: '',
          ccLowestTempValue: '',
          ccHighestWaterJudge: '',
          ccHighestWaterValue: '',
          ccLowestWaterJudge: '',
          ccLowestWaterValue: '',
          ccCo2Judge: '',
          ccCo2Value: '',
          ccO2Judge: '',
          ccO2Value: '',
          ccOutsideTempJudge: '',
          ccOutsideTempValue: '',
          ccOutsideHumidityJudge: '',
          ccOutsideHumidityValue: '',
          ccOutsideWeatherJudge: '',
          ccOutsideWeatherValue: '',
          ccOutsideWindPowerJudge: '',
          ccOutsideWindPowerValue: '',
          ccDatetime: '',
          memo: '',
        },
        deviceTypeList: [],
        tabIndex:this.$route.query.tabIndex?this.$route.query.tabIndex:1,
      };
    },
    methods: {
      getDetail(autoAerationId) {
        layer.load(2);
        fetchAutoAerationMode({autoAerationId})
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              const {autoAerationDetail} = ret.data;
              this.detail = autoAerationDetail;
              this.deviceTypeList = (autoAerationDetail.autoAerationDetailList || []).map((device) => ({
                ...device,
                remote: true,
              }));
              document.getElementById('ocDatetime').value = this.detail.ocDatetime;
              document.getElementById('ccDatetime').value = this.detail.ccDatetime;
              this.getGranary(autoAerationDetail.storehouseGbCode);
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      submitEvent() {
        this.detail.ocDatetime = document.getElementById('ocDatetime').value;
        this.detail.ccDatetime = document.getElementById('ccDatetime').value;
        if (!this.detail.autoAerationName) return layer.msg("请填写模型名称");
        if (!this.detail.storehouseGbCode) return layer.msg("请选择仓房");
        if (!this.detail.warehouseGbCode) return layer.msg("请选择廒间");
        if (!this.detail.aerationPurpose) return layer.msg("请选择通风目的");
        if (!this.detail.aerationType) return layer.msg("请选择通风类型");
        if (!this.detail.aerationDuration) return layer.msg("请填写通风时长");
        if (!this.detail.aerationMode) return layer.msg("请选择通风方式");
        if (!this.detail.ocTempJudge) return layer.msg("请选择开启条件-温度判断公式");
        if (this.detail.ocTempJudge !== '不限制' && !this.detail.ocTempValue) return layer.msg("请填写开启条件-温度判断值");
        if (!this.detail.ocHumidityJudge) return layer.msg("请选择开启条件-湿度判断公式");
        if (this.detail.ocHumidityJudge !== '不限制' && !this.detail.ocHumidityValue) return layer.msg("请填写开启条件-湿度判断值");
        if (!this.detail.ocHighestTempJudge) return layer.msg("请选择开启条件-最高粮温判断公式");
        if (this.detail.ocHighestTempJudge !== '不限制' && !this.detail.ocHighestTempValue) return layer.msg("请填写开启条件-最高粮温判断值");
        if (!this.detail.ocLowestTempJudge) return layer.msg("请选择开启条件-最低粮温判断公式");
        if (this.detail.ocLowestTempJudge !== '不限制' && !this.detail.ocLowestTempValue) return layer.msg("请填写开启条件-最高粮温判断值");
        if (!this.detail.ocHighestWaterJudge) return layer.msg("请选择开启条件-粮食最高水分判断公式");
        if (this.detail.ocHighestWaterJudge !== '不限制' && !this.detail.ocHighestWaterValue) return layer.msg("请填写开启条件-粮食最高水分判断值");
        if (!this.detail.ocLowestWaterJudge) return layer.msg("请选择开启条件-粮食最低水分判断公式");
        if (this.detail.ocLowestWaterJudge !== '不限制' && !this.detail.ocLowestWaterValue) return layer.msg("请填写开启条件-粮食最低水分判断值");
        if (!this.detail.ocCo2Judge) return layer.msg("请选择开启条件-二氧化碳判断公式");
        if (this.detail.ocCo2Judge !== '不限制' && !this.detail.ocCo2Value) return layer.msg("请填写开启条件-二氧化碳判断值");
        if (!this.detail.ocO2Judge) return layer.msg("请选择开启条件-氧气判断公式");
        if (this.detail.ocO2Judge !== '不限制' && !this.detail.ocO2Value) return layer.msg("请填写开启条件-氧气判断值");
        if (!this.detail.ocOutsideTempJudge) return layer.msg("请选择开启条件-仓外温度判断公式");
        if (this.detail.ocOutsideTempJudge !== '不限制' && !this.detail.ocOutsideTempValue) return layer.msg("请填写开启条件-仓外温度判断值");
        if (!this.detail.ocOutsideHumidityJudge) return layer.msg("请选择开启条件-仓外湿度判断公式");
        if (this.detail.ocOutsideHumidityJudge !== '不限制' && !this.detail.ocOutsideHumidityValue) return layer.msg("请填写开启条件-仓外湿度判断值");
        if (!this.detail.ocOutsideWeatherJudge) return layer.msg("请选择开启条件-仓外天气判断公式");
        if (this.detail.ocOutsideWeatherJudge !== '不限制' && !this.detail.ocOutsideWeatherValue) return layer.msg("请填写开启条件-仓外天气判断值");
        if (!this.detail.ocOutsideWindPowerJudge) return layer.msg("请选择开启条件-仓外风力判断公式");
        if (this.detail.ocOutsideWindPowerJudge !== '不限制' && !this.detail.ocOutsideWindPowerValue) return layer.msg("请填写开启条件-仓外风力判断值");
        if (!this.detail.ocDatetime) return layer.msg("请选择开启条件-时间");
        if (!this.detail.ccTempJudge) return layer.msg("请选择关闭条件-温度判断公式");
        if (this.detail.ccTempJudge !== '不限制' && !this.detail.ccTempValue) return layer.msg("请填写关闭条件-温度判断值");
        if (!this.detail.ccHumidityJudge) return layer.msg("请选择关闭条件-湿度判断公式");
        if (this.detail.ccHumidityJudge !== '不限制' && !this.detail.ccHumidityValue) return layer.msg("请填写关闭条件-湿度判断值");
        if (!this.detail.ccHighestTempJudge) return layer.msg("请选择关闭条件-最高粮温判断公式");
        if (this.detail.ccHighestTempJudge !== '不限制' && !this.detail.ccHighestTempValue) return layer.msg("请填写关闭条件-最高粮温判断值");
        if (!this.detail.ccLowestTempJudge) return layer.msg("请选择关闭条件-最低粮温判断公式");
        if (this.detail.ccLowestTempJudge !== '不限制' && !this.detail.ccLowestTempValue) return layer.msg("请填写关闭条件-最高粮温判断值");
        if (!this.detail.ccHighestWaterJudge) return layer.msg("请选择关闭条件-粮食最高水分判断公式");
        if (this.detail.ccHighestWaterJudge !== '不限制' && !this.detail.ccHighestWaterValue) return layer.msg("请填写关闭条件-粮食最高水分判断值");
        if (!this.detail.ccLowestWaterJudge) return layer.msg("请选择关闭条件-粮食最低水分判断公式");
        if (this.detail.ccLowestWaterJudge !== '不限制' && !this.detail.ccLowestWaterValue) return layer.msg("请填写关闭条件-粮食最低水分判断值");
        if (!this.detail.ccCo2Judge) return layer.msg("请选择关闭条件-二氧化碳判断公式");
        if (this.detail.ccCo2Judge !== '不限制' && !this.detail.ccCo2Value) return layer.msg("请填写关闭条件-二氧化碳判断值");
        if (!this.detail.ccO2Judge) return layer.msg("请选择关闭条件-氧气判断公式");
        if (this.detail.ccO2Judge !== '不限制' && !this.detail.ccO2Value) return layer.msg("请填写关闭条件-氧气判断值");
        if (!this.detail.ccOutsideTempJudge) return layer.msg("请选择关闭条件-仓外温度判断公式");
        if (this.detail.ccOutsideTempJudge !== '不限制' && !this.detail.ccOutsideTempValue) return layer.msg("请填写关闭条件-仓外温度判断值");
        if (!this.detail.ccOutsideHumidityJudge) return layer.msg("请选择关闭条件-仓外湿度判断公式");
        if (this.detail.ccOutsideHumidityJudge !== '不限制' && !this.detail.ccOutsideHumidityValue) return layer.msg("请填写关闭条件-仓外湿度判断值");
        if (!this.detail.ccOutsideWeatherJudge) return layer.msg("请选择关闭条件-仓外天气判断公式");
        if (this.detail.ccOutsideWeatherJudge !== '不限制' && !this.detail.ccOutsideWeatherValue) return layer.msg("请填写关闭条件-仓外天气判断值");
        if (!this.detail.ccOutsideWindPowerJudge) return layer.msg("请选择关闭条件-仓外风力判断公式");
        if (this.detail.ccOutsideWindPowerJudge !== '不限制' && !this.detail.ccOutsideWindPowerValue) return layer.msg("请填写关闭条件-仓外风力判断值");
        if (!this.detail.ccDatetime) return layer.msg("请选择关闭条件-时间");
        this.detail.storehouseName = this.storehouseList.find(storehouse => this.detail.storehouseGbCode === storehouse.storehouseGbCode).storehouseName;
        this.detail.warehouseName = this.granaryList.find(granary => this.detail.warehouseGbCode === granary.warehouseGbCode).warehouseName;
        const api = this.detail.autoAerationId ? editAutoAerationMode : addAutoAerationMode;
        layer.load(2);
        api({...this.detail, autoAerationDetailList: JSON.stringify(this.deviceTypeList)})
          .then((ret) => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("保存成功！");
              this.editBack();
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      editBack() {
        this.$router.push({
          name: "aerationAuto",
          query: {
            storehouseGbCode:this.postData.storehouseGbCode,
            warehouseGbCode: this.postData.warehouseGbCode,
            pageNo:this.postData.pageNo,
            tabIndex:this.postData.tabIndex,
            autoAerationName:this.postData.autoAerationName,
          },
        })
        console.log(this.postData);
      },
      getEquipmentList(warehouseGbCode) {
        layer.load(2);
        fetchEquipmentListByWarehouse({warehouseGbCode, funcPositionName: '通风'})
          .then((ret) => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              this.deviceTypeList = (ret.data.dataList || []).map((device) => ({
                ...device,
                remote: true,
                onOffSwitch: '0',
                type: '0',
              }));
            } else {
              this.deviceTypeList = [];
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      storehouseChangeHandler(e) {
        this.detail.storehouseGbCode = e.target.value;
        this.detail.warehouseGbCode = '';
        this.granaryList = [];
        this.getGranary(e.target.value);
      },
      warehouseChangeHandler(e) {
        this.detail.warehouseGbCode = e.target.value;
        this.getEquipmentList(e.target.value);
      },
    },
    mounted() {
      //console.log(JSON.stringify(this.postData))
      this.getStorehouse();
      this.getVentilationModeList();
      this.getVentilationPurposeList();
      this.getVentilationMethodList();
      if (this.$route.query.id) {
        this.getDetail(this.$route.query.id);
      }
    }
  };

</script>
