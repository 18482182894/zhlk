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
                通风作业单号：
                <label v-text="aerationRecord.ventilateId"></label>
              </span>
              <span>
                仓房名称：
                <label v-text="aerationRecord.storehouseName"></label>
              </span>
              <span>
                廒间名称：
                <label v-text="aerationRecord.warehouseName"></label>
              </span>
              <span>
                通风目的：
                <label v-text="aerationRecord.ventilatePurpose"></label>
              </span>
              <span>
                通风类型：
                <label v-text="aerationRecord.ventilateType"></label>
              </span>
              <span>
                风网类型：
                <label v-text="aerationRecord.ventilationType"></label>
              </span>
              <span>
                通风机台数：
                <label v-text="aerationRecord.fanNum"></label>
              </span>
              <span>
                通风机作业人：
                <label v-text="aerationRecord.ventilatePerson"></label>
              </span>
              <span>
                创建时间：
                <label v-text="aerationRecord.createTime"></label>
              </span>
              <span>
                风网开孔率：
                <label v-text="aerationRecord.ventilationHole"></label>
              </span>
              <span>
                通风机型号：
                <label v-text="aerationRecord.fanType"></label>
              </span>
              <span>
                送风方式：
                <label v-text="aerationRecord.blowingType"></label>
              </span>
              <span>
                作业前平均粮温：
                <label v-text="aerationRecord.beforeAvgTem"></label>
              </span>
              <span>
                作业后平均粮温：
                <label v-text="aerationRecord.aftetAvgTem"></label>
              </span>
              <span>
                降温幅度：
                <label v-text="aerationRecord.coolingRange"></label>
              </span>
              <span>
                降温能耗：
                <label v-text="aerationRecord.coolingEnergy"></label>
              </span>
              <span>
                作业第一阶段平均气温：
                <label v-text="aerationRecord.firstAvgTem"></label>
              </span>
              <span>
                作业第二阶段平均气温：
                <label v-text="aerationRecord.secondAvgTem"></label>
              </span>
              <span>
                作业第三阶段平均气温：
                <label v-text="aerationRecord.thirdAvgTem"></label>
              </span>
              <span>
                作业第四阶段平均气温：
                <label v-text="aerationRecord.fourthAvgTem"></label>
              </span>
              <span>
                作业前平均水分：
                <label v-text="aerationRecord.beforeAvgWater"></label>
              </span>
              <span>
                作业后平均水分：
                <label v-text="aerationRecord.aftetAvgWater"></label>
              </span>
              <span>
                降水幅度：
                <label v-text="aerationRecord.rainfallRange"></label>
              </span>
              <span>
                吨降水能耗：
                <label v-text="aerationRecord.rainfallEnergy"></label>
              </span>
              <span>
                失水率：
                <label v-text="aerationRecord.watetLoss"></label>
              </span>
              <span>
                备注：
                <label v-text="aerationRecord.memo"></label>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="detail-back">
      <button @click="detailBack();">返回</button>
    </div>
  </div>
</template>

<script>
import { getAerationRecordDetail } from "@/api/intelligentWarehous/aerationList";
export default {
  name: 'aerationRecordDetail',
  data() {
    return {
      id: this.$route.query.id,
      aerationRecord: {}
    }
  },
  methods: {
    getDetail() {
      layer.load(2);
      getAerationRecordDetail({ventilateId: this.id})
        .then(ret => {
          layer.closeAll("loading");
          if(ret.code === '200') {
            this.aerationRecord = ret.data.dataMap;
            this.aerationRecord.beforeAvgTem = this.aerationRecord.beforeAvgTem + '℃';
            this.aerationRecord.aftetAvgTem = this.aerationRecord.aftetAvgTem + '℃';
            this.aerationRecord.firstAvgTem = this.aerationRecord.firstAvgTem + '℃';
            this.aerationRecord.secondAvgTem = this.aerationRecord.secondAvgTem + '℃';
            this.aerationRecord.thirdAvgTem = this.aerationRecord.thirdAvgTem + '℃';
            this.aerationRecord.fourthAvgTem = this.aerationRecord.fourthAvgTem + '℃';
            this.aerationRecord.coolingEnergy = this.aerationRecord.coolingEnergy + 'kW.h';
            this.aerationRecord.rainfallEnergy = this.aerationRecord.rainfallEnergy + 'kW.h';
            this.aerationRecord.createTime = this.aerationRecord.createTime.slice(0, 10);
          } else {
            layer.alert(ret.data, {closeBtn: 0});
          }    
        })
        .catch(err => {
          layer.alert(err.message, {closeBtn: 0});
        });
    },
    detailBack() {
      this.$router.push({
        name: 'aerationList'
      })
    }
  },
  mounted() {
    if(this.$route.query.id) {
        this.getDetail()
    }
  }
}
</script>

<style>

</style>