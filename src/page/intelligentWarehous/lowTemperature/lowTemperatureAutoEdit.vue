<template>
  <div class="content">
    <div class="aerationSet">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">创建低温策略</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div>
              <span>
                模型名称：
                <input type="text" class="input-text" v-model="detail.m">
              </span>
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
                廒间：
                <select class="select-style excision" v-model="detail.warehouseGbCode">
                  <option
                    v-for="item in granaryList"
                    :key="item.warehouseGbCode"
                    :value="item.warehouseGbCode"
                    v-text="item.warehouseName"/>
                 </select>
              </span>
              <span>
                通风目的：
                <select class="select-style excision" v-model="detail.aerationPurpose">
                  <option value="降温">降温</option>
                  <option value="降水">降水</option>
                  <option value="处理发热粮">处理发热粮</option>
                  <option value="均衡粮温">均衡粮温</option>
                  <option value="均衡粮食水平">均衡粮食水平</option>
                  <option value="其他通风目的">其他通风目的</option>
                </select>
              </span>
              <span>
                通风类型：
                <select class="select-style excision" v-model="detail.aerationType">
                  <option value="整仓通风">整仓通风</option>
                  <option value="内环流通风">内环流通风</option>
                  <option value="微风降温通风">微风降温通风</option>
                  <option value="水源降温">水源降温</option>
                  <option value="冷谷机降温">冷谷机降温</option>
                  <option value="开窗通风">开窗通风</option>
                  <option value="隔热层通风">隔热层通风</option>
                  <option value="简仓机械">简仓机械</option>
                  <option value="空调仓通风">空调仓通风</option>
                </select>
              </span>
              <span>
                通风时长（h）：
                <input type="text" class="input-text" placeholder="" v-model="detail.aerationDuration">
              </span>
            </div>
          </div>
        </div>
        <div class="autoModel">
          <div class="autoModel-open">
            <p>开启条件</p>
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
                <input type="number" v-model="detail.ocHumidityValue">度
              </span>
              <span>
                <label>最高粮温：</label>
                <select v-model="detail.ocHighestTempJudge">
                  <option v-for="item in conditionList" :value="item">{{item}}</option>
                </select>
                <input type="number" v-model="detail.ocHighestTempValue">%
              </span>
              <span>
                <label>最低粮温：</label>
                <select v-model="detail.ocLowestTempJudge">
                  <option v-for="item in conditionList" :value="item">{{item}}</option>
                </select>
                <input type="number" v-model="detail.ocLowestTempValue">%
              </span>
            </div>
            <p>时间：<input type="text" class="input-text Wdate" onclick="WdatePicker({maxDate:'%y-%M-%d'})"
                         id="ocDatetime"></p>
          </div>
          <div class="autoModel-off">
            <p>关闭条件</p>
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
            </div>
            <p>时间：<input type="text" class="input-text Wdate" onclick="WdatePicker({maxDate:'%y-%M-%d'})"
                         id="ccDatetime"></p>
          </div>
        </div>
      </div>
    </div>
    <div class="granary-pic">
      <img src="../../../../static/images/warehouse-device.png"/>
    </div>
    <DeviceList/>
    <div class="edit-btn">
      <button class="edit-submit" @click="submitEvent();">提交</button>
      <button class="edit-back" @click="$router.back()">返回</button>
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
  import {storehouse, granary} from "@/api/systemManage/dropDown";

  export default {
    name: "lowTemperatureAutoEdit",
    components: {
      DeviceList,
    },
    data() {
      return {
        conditionList: ['不限制', '>', '<', '≥', '≤', '='],
        detail: {
          lowTempAutoAerationName: '',
          storehouseGbCode: '',
          storehouseName: '',
          warehouseGbCode: '',
          warehouseName: '',
          aerationPurpose: '',
          aerationType: '',
          aerationDuration: '',
          ocTempJudge: '',
          ocTempValue: '',
          ocHumidityJudge: '',
          ocHumidityValue: '',
          ocHighestTempJudge: '',
          ocHighestTempValue: '',
          ocLowestTempJudge: '',
          ocLowestTempValue: '',
          ocDatetime: '',
          ccTempJudge: '',
          ccTempValue: '',
          ccHumidityJudge: '',
          ccHumidityValue: '',
          ccHighestTempJudge: '',
          ccHighestTempValue: '',
          ccLowestTempJudge: '',
          ccLowestTempValue: '',
          ccDatetime: '',
          deiceTypeList: [],
        },
        storehouseList: [],//仓房下拉列表
        granaryList: [],//廒间下拉列表
      };
    },
    methods: {
      submitEvent() {},
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
    },
    watch: {
      'detail.storehouseGbCode'(newCode, oldCode) { // 监听仓房变化获取廒间列表
        if (newCode && newCode !== oldCode) {
          if (!this.storehouseGbCodeChangeByInit) {
            this.detail.warehouseGbCode = '';
          }
          this.storehouseGbCodeChangeByInit = false;
          this.granaryList = [];
          this.getGranary(newCode);
        }
      }
    },
    mounted() {
      this.getStorehouse();
    }
  };

</script>
