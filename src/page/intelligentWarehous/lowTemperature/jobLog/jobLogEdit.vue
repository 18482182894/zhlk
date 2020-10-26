<template>
  <div class="content">
    <div class="menuManage userManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">基础信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div>
              <span>
                粮情分析记录：
                <input type="text" class="input-text" placeholder="点击选择" readonly
                       v-model="detail.grainInfoCheckAnalysis" @click="isShowGrainInspectionPopup=true">
              </span>
              <span>
                仓房：
                <input type="text" class="input-text" readonly v-model="detail.storehouseName">
              </span>
              <span>
                廒间：
                <input type="text" class="input-text" readonly v-model="detail.warehouseName">
              </span>
              <span>
               货位：
                <select class="select-style excision" v-model="detail.cargoCode">
                  <option
                    v-for="item in cargoList"
                    :key="item.cargoPosition"
                    :value="item.cargoPosition"
                    v-text="item.cargoName"/>
                </select>
              </span>
              <span>
                作业类型：
                <select class="select-style excision" v-model="detail.jobType">
                  <option value="自然降温">自然降温</option>
                  <option value="冷却降温">冷却降温</option>
                </select>
              </span>
              <span>
                冷源方式：
                <select class="select-style excision" v-model="detail.coldSourceMode">
                  <option value="风冷">风冷</option>
                  <option value="水冷">水冷</option>
                  <option value="地冷">地冷</option>
                  <option value="上风下水">上风下水</option>
                </select>
              </span>
              <span>
                开始时间：
                <input type="text" class="input-text Wdate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" id="aerationStartDatetime">
              </span>
              <span>
                结束时间：
                <input type="text" class="input-text Wdate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" id="aerationEndDatetime">
              </span>
              <span>
                气温最高值：
                <input type="number" class="input-text" v-model="detail.maxTempValue">
              </span>
              <span>
                湿度最高值：
                <input type="number" class="input-text" v-model="detail.maxHumidityValue">
              </span>
              <span>
                作业前粮温最高值：
                <input type="number" class="input-text" v-model="detail.beforeJobMaxTempValue">
              </span>
              <span>
                作业后粮温最高值：
                <input type="number" class="input-text" v-model="detail.afterJobMaxTempValue">
              </span>
              <span>
                气温最低值：
                <input type="number" class="input-text" v-model="detail.minTempValue">
              </span>
              <span>
                湿度最低值：
                <input type="number" class="input-text" v-model="detail.minHumidityValue">
              </span>
              <span>
                作业前粮温最低值：
                <input type="number" class="input-text" v-model="detail.beforeJobMinTempValue">
              </span>
              <span>
                作业后粮温最低值：
                <input type="number" class="input-text" v-model="detail.afterJobMinTempValue">
              </span>
              <span>
                气温平均值：
                <input type="number" class="input-text" v-model="detail.avgTempValue">
              </span>
              <span>
                湿度平均值：
                <input type="number" class="input-text" v-model="detail.avgHumidityValue">
              </span>
              <span>
                作业前粮温平均值：
                <input type="number" class="input-text" v-model="detail.beforeJobAvgTempValue">
              </span>
              <span>
                作业后粮温平均值：
                <input type="number" class="input-text" v-model="detail.beforeJobAvgHumidityValue">
              </span>
              <span>
                作业前粮温梯度值：
                <input type="number" class="input-text" v-model="detail.beforeJobTempGv">
              </span>
              <span>
                作业后粮温梯度值：
                <input type="number" class="input-text" v-model="detail.afterJobTempGv">
              </span>
              <span>
                总耗电：
                <input type="number" class="input-text" v-model="detail.totalConsumePower">
              </span>
              <span>
                累计总风量：
                <input type="number" class="input-text" v-model="detail.totalWindPower">
              </span>
              <br>
              <span style="width: 100%;">
                作业目的：
                <textarea class="edit-textarea" v-model="detail.jobPurpose"></textarea>
              </span>
            </div>
          </div>
        </div>
      </div>
      <table class="customTable">
        <thead>
        <tr>
          <th style="width:10%;"><input type="checkbox"></th>
          <th style="width:10%;">序号</th>
          <th style="width:10%;">机械种类</th>
          <th style="width:10%;">机械名称</th>
          <th style="width:10%;">通风总耗能（瓦特）</th>
          <th style="width:10%;">开启时间</th>
          <th style="width:30%;">结束时间</th>
          <th style="width:30%;">合计时间（小时）</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><input type="checkbox"></td>
          <td>1</td>
          <td>CF2394949</td>
          <td>空调</td>
          <td>120</td>
          <td>2019-03-08 05:12:20</td>
          <td>2019-03-08 09:12:20</td>
          <td>4</td>
        </tr>
        </tbody>
      </table>
      <div class="edit-btn">
        <button class="edit-submit" @click="submitEvent();">提交</button>
        <button class="edit-back" @click="$router.back()">返回</button>
      </div>
    </div>
    <SelectTablePopup
      v-if="isShowGrainInspectionPopup"
      title="请选择粮情分析记录"
      list-key="dataList"
      :api="fetchGrainInspectionList"
      @hide="isShowGrainInspectionPopup=false">
      <template slot-scope="scope">
        <table class="customTable">
          <thead>
          <tr>
            <th style="width:5%;">序号</th>
            <th style="width:7.5%;">仓房</th>
            <th style="width:7.5%;">廒间</th>
            <th style="width:7.5%;">粮堆最高点温度</th>
            <th style="width:7.5%;">粮堆最低点温度</th>
            <th style="width:7.5%;">整仓平均粮温</th>
            <th style="width:7.5%;">检查人员</th>
            <th style="width:7.5%;">检查时间</th>
            <th style="width:7.5%;">编辑状态</th>
            <th style="width:7.5%;">审核状态</th>
            <th style="width:10%;">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,i) in scope.list">
            <td v-text="i+1"></td>
            <td v-text="item.storehouseName"></td>
            <td v-text="item.warehouseName"></td>
            <td v-text="item.grainHeapMaxTemperature"></td>
            <td v-text="item.grainHeapMinTemperature"></td>
            <td v-text="item.wholeAvgGrainTemperature"></td>
            <td v-text="item.checkMan"></td>
            <td v-text="item.checkDatetime"></td>
            <td v-text="draftStatusMap[item.draftStatus]"></td>
            <td v-text="auditStateMap[item.auditState]"></td>
            <td>
              <div class="table-btn btn-green" @click="selectGrainInspection(item)">选择</div>
            </td>
          </tr>
          </tbody>
        </table>
      </template>
    </SelectTablePopup>
  </div>
</template>

<style type="text/css" scoped>
  .tag-box .edit-btn {
    margin-top: 15px;
  }
</style>
<script>
  import SelectTablePopup from '@/components/SelectTablePopup';
  import {fetchGrainInspectionList} from "@/api/intelligentWarehous/grainInspection";
  import {fetchLowTemperatureWork} from "@/api/intelligentWarehous/lowTemperature";
  import {cargo} from "@/api/systemManage/dropDown";

  export default {
    name: "jobLogEdit",
    components: {
      SelectTablePopup,
    },
    data() {
      return {
        auditStateMap: {
          '-1': '尚未提交',
          '0': '审核不通过',
          '10': '未审核',
          '11': '审核中',
          '99': '审核通过'
        },
        draftStatusMap: {
          '0': '草稿',
          '1': '正式文档'
        },
        detail: {
          storehouseGbCode: '',
          storehouseName: '',
          warehouseGbCode: '',
          warehouseName: '',
          cargoCode: '',
          jobType: '',
        },
        isShowGrainInspectionPopup: false,
        cargoList: [], // 货位列表
      }
    },
    methods: {
      fetchGrainInspectionList,
      getDetail (ltAerationJobRecordId) {
        layer.load(2);
        fetchLowTemperatureWork({ltAerationJobRecordId})
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              const {ltAerationJobRecord} = ret.data;
              this.detail = ltAerationJobRecord;
              document.getElementById('aerationStartDatetime').value = ltAerationJobRecord.aerationStartDatetime;
              document.getElementById('aerationEndDatetime').value = ltAerationJobRecord.aerationEndDatetime;
              this.getCargo(ltAerationJobRecord.warehouseGbCode);
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      selectGrainInspection(item) {
        this.detail.grainInfoCheckAnalysis = item.grainCheckRecordId;
        this.detail.storehouseGbCode = item.storehouseGbCode;
        this.detail.storehouseName = item.storehouseName;
        this.detail.warehouseGbCode = item.warehouseGbCode;
        this.detail.warehouseName = item.warehouseName;
        this.isShowGrainInspectionPopup = false;
        this.getCargo(item.warehouseGbCode);
      },
      submitEvent() {
        this.$router.back();
      },
      getCargo(warehouseGbCode) {
        cargo(warehouseGbCode)
          .then(ret => {
            if (ret.code == 200) {
              this.cargoList = ret.data.cargoList;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          }).catch(err => {
          layer.alert(err.message, {closeBtn: 0});
        });
      },
    },
    mounted() {
      if (this.$route.query.id) {
        this.getDetail(this.$route.query.id);
      }
    }
  }
</script>
