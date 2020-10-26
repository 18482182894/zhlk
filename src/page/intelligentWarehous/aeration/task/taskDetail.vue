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
                通风类型：
                <label v-text="detail.aerationType"></label>
              </span>
              <span>
                通风方式(*)：
                <label v-text="detail.aerationMode"></label>
              </span>
              <span>
                通风目的：
                <label v-text="detail.aerationPurpose"></label>
              </span>
              <span>
                粮食品种：
                <label v-text="detail.grainVariety"></label>
              </span>
              <span>
                粮层厚度：
                <label v-text="detail.grainLayerThickness"></label>
              </span>
              <span>
                送风方式位：
                <label v-text="detail.sendWindTypeBit"></label>
              </span>
              <span>
                通风开始时间：
                <label v-text="detail.aerationStartDatetime"></label>
              </span>
              <span>
                预计通风时长：
                <label v-text="detail.estimateAerationDuration"></label>
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
                风网总阻力：
                <label v-text="detail.windNetTotalResistance"></label>
              </span>
              <span>
                单位通风量：
                <label v-text="detail.unitAerationNum"></label>
              </span>
              <span>
                最大梯度值开始前温度℃：
                <label v-text="detail.maxGvBsTemp"></label>
              </span>
              <span>
                最大梯度值开始后温度℃：
                <label v-text="detail.maxGvAsTemp"></label>
              </span>
              <span>
                最大梯度值开始前水分/RH：
                <label v-text="detail.maxGvBsWater"></label>
              </span>
              <span>
                最大梯度值开始后水分/RH：
                <label v-text="detail.maxGvAsWater"></label>
              </span>
              <span>
                大气温度℃：
                <label v-text="detail.airTemp"></label>
              </span>
              <span>
                大气湿度/RH：
                <label v-text="detail.airHumidity"></label>
              </span>
              <span>
                通风执行日期：
                <label v-text="detail.aerationExeDate"></label>
              </span>
              <span>
                登记日期：
                <label v-text="detail.registorDate"></label>
              </span>
              <span>
                原始记录ID：
                <label v-text="detail.originalRecordId"></label>
              </span>
              <span>
                负责人：
                <label v-text="detail.responsiblePerson"></label>
              </span>
              <br>
              <span>
                通风前粮食温度℃：
                <label v-text="detail.beforeAerationGrainTemp"></label>
              </span>
              <span>
                通风后粮食温度℃：
                <label v-text="detail.afterAerationGrainTemp"></label>
              </span>
              <span>
                通风前粮食水分/RH：
                <label v-text="detail.beforeAerationGrainWater"></label>
              </span>
              <span>
                通风后粮食水分/RH：
                <label v-text="detail.afterAerationGrainWater"></label>
              </span>
              <br>
              <span>
                备注：
                <label v-text="detail.memo"></label>
              </span>
            </div>
          </div>
        </div>
        <table class="customTable">
          <thead>
          <tr>
            <th><input type="checkbox"></th>
            <th>序号</th>
            <th>机械种类</th>
            <th>机械名称</th>
            <th>通风总耗能（瓦特）</th>
            <th>累计总风量</th>
            <th>送风方式位</th>
            <th>风网阻力（/N）</th>
            <th>开启时间</th>
            <th>结束时间</th>
            <th>合计时间（小时）</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,i) in detail.detailList">
            <td><input type="checkbox"></td>
            <td v-text="i+1"></td>
            <td v-text="item.machineType"></td>
            <td v-text="item.machineName"></td>
            <td v-text="item.aerationTotalEnergyConsumption"></td>
            <td v-text="item.cumulativeTotalWindNum"></td>
            <td v-text="item.sendWindTypeBit"></td>
            <td v-text="item.windNetTotalResistance"></td>
            <td v-text="item.startDatetime"></td>
            <td v-text="item.endDatetime"></td>
            <td v-text="item.totalTime"></td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="detail-back">
        <button @click="detailBack();">返回</button>
      </div>
    </div>
	<div class="copyright">
		<p>Copyright © 四川百威智联科技有限公司 © 版权所有 电话：028-62631082</p>
	</div>
  </div>
</template>

<script>
  import {fetchAerationWork} from "@/api/intelligentWarehous/aeration";

  export default {
    name: "taskDetail",
    data() {
      return {
        detail: {},
        postData:{
          storehouseGbCode: this.$route.query.storehouseGbCode,
          warehouseGbCode: this.$route.query.warehouseGbCode,
          aerationType:this.$route.query.aerationType,
          leaveStartDate:this.$route.query.leaveStartDate,
          leaveEndDate:this.$route.query.leaveEndDate,
          pageNo: this.$route.query.pageNo,
        },
      };
    },
    methods: {
      getDetail (aerationJobRecordId) {
        layer.load(2);
        fetchAerationWork({aerationJobRecordId})
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              const {aerationJobRecord} = ret.data;
              this.detail = aerationJobRecord;
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
        this.$router.push({
          name: "aerationTask",
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
    mounted() {
      if (this.$route.query.id) {
        this.getDetail(this.$route.query.id);
      }
    }
  };
</script>
