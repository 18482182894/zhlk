<template>
  <div class="content">
    <div class="menuManage userManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">基础信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail">
            <div>
              <span>
                粮情检查分析：
                <label v-text="detail.grainInfoCheckAnalysis"></label>
              </span>
              <span>
                仓房：
                <label v-text="detail.storehouseName"></label>
              </span>
              <span>
                廒间：
                <label v-text="detail.warehouseName"></label>
              </span>
              <span>
                货位：
                <label v-text="detail.cargoName"></label>
              </span>
              <span>
                作业类型：
                <label v-text="detail.jobType"></label>
              </span>
              <span>
                冷源方式：
                <label v-text="detail.coldSourceMode"></label>
              </span>
              <span>
                开始时间：
                <label v-text="detail.aerationStartDatetime"></label>
              </span>
              <span>
                结束时间：
                <label v-text="detail.aerationEndDatetime"></label>
              </span>
              <span>
                气温最高值：
                <label v-text="detail.maxTempValue"></label>
              </span>
              <span>
                湿度最高值：
                <label v-text="detail.maxHumidityValue"></label>
              </span>
              <span>
                作业前粮温最高值：
                <label v-text="detail.beforeJobMaxTempValue"></label>
              </span>
              <span>
                作业后粮温最高值：
                <label v-text="detail.afterJobMaxTempValue"></label>
              </span>
              <span>
                气温最低值：
                <label v-text="detail.minTempValue"></label>
              </span>
              <span>
                湿度最低值：
                <label v-text="detail.minHumidityValue"></label>
              </span>
              <span>
                作业前粮温最低值：
                <label v-text="detail.beforeJobMinTempValue"></label>
              </span>
              <span>
                作业后粮温最低值：
                <label v-text="detail.afterJobMinTempValue"></label>
              </span>
              <span>
                气温平均值：
                <label v-text="(1*detail.maxTempValue + 1*detail.minTempValue) / 2"></label>
              </span>
              <span>
                湿度平均值：
                <label v-text="(1*detail.maxHumidityValue + 1*detail.minHumidityValue) / 2"></label>
              </span>
              <span>
                作业前粮温平均值：
                <label v-text="(1*detail.beforeJobMaxTempValue + 1*detail.beforeJobMinTempValue) / 2"></label>
              </span>
              <span>
                作业后粮温平均值：
                <label v-text="(1*detail.afterJobMaxTempValue + 1*detail.afterJobMinTempValue) / 2"></label>
              </span>
              <span>
                作业前粮温梯度值：
                <label v-text="detail.beforeJobTempGv"></label>
              </span>
              <span>
                作业后粮温梯度值：
                <label v-text="detail.afterJobTempGv"></label>
              </span>
              <span>
                总耗电：
                <label v-text="detail.totalConsumePower"></label>
              </span>
              <span>
                累计总风量：
                <label v-text="detail.totalWindPower"></label>
              </span>
              <span>
                作业目的：
                <label v-text="detail.jobPurpose"></label>
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
         <tr v-for="(item,i) in detail.detailList">
            <td><input type="checkbox"></td>
            <td v-text="i+1"></td>
            <td v-text="item.machineType"></td>
            <td v-text="item.machineName"></td>
            <td v-text="item.aerationTotalEnergyConsumption"></td>
            <td v-text="item.startDatetime"></td>
            <td v-text="item.endDatetime"></td>
            <td v-text="item.totalTime"></td>
        </tr>
        </tbody>
      </table>
      <div class="detail-back">
        <button @click="detailBack();">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {fetchLowTemperatureWork} from "@/api/intelligentWarehous/lowTemperature";

  export default {
    name: "jobLogDetail",
    data() {
      return {
        detail: {},
      };
    },
    methods: {
      getDetail (ltAerationJobRecordId) {
        layer.load(2);
        fetchLowTemperatureWork({ltAerationJobRecordId})
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              const {ltAerationJobRecord} = ret.data;
              this.detail = ltAerationJobRecord;
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
        this.$router.back(-1);
      }
    },
    mounted() {
      if (this.$route.query.id) {
        this.getDetail(this.$route.query.id);
      }
    }
  };
</script>
