<template>
  <div class="content">
    <div class="menuManage roleManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">基础信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail">
            <div>
              <span>
                借电廒间：
                <label v-text="detailData.borrowWarehouseName"></label>
              </span>
              <span>
                被借电廒间：
                <label v-text="detailData.borrowedWardhouseName"></label>
              </span>
              <span>
                借电时间：
                <label v-text="detailData.startDatetime"></label>
              </span>
              <span>
                借电项目：
                <label v-if="parseInt(detailData.borrowItem)==1" v-text="'熏蒸作业'"></label>
                <label v-if="parseInt(detailData.borrowItem)==2" v-text="'通风作业'"></label>
                <label v-if="parseInt(detailData.borrowItem)==3" v-text="'低温储粮'"></label>
                <label v-if="parseInt(detailData.borrowItem)==4" v-text="'值仓'"></label>
                <label v-if="parseInt(detailData.borrowItem)==5" v-text="'其它'"></label>
              </span>
              <span>
                借电前读表数(kW·h)：
                <label v-text="detailData.beforeBorrowMeterData"></label>
              </span>
              <span>
                借电后读表数(kW·h)：
                <label v-text="detailData.afterBorrowMeterData"></label>
              </span>
              <span>
                能耗统计(kW·h)：
                <label v-text="detailData.totalEnergyConsumption"></label>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="detail-back">
        <button @click="detailBack();">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
import { borrowElectricityDetail } from "@/api/energyConsumption/public";
export default {
  name: "documentDetail",
  data() {
    return {
      postData: {
        id: this.$route.query.id
      },
      detailData: ""
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      borrowElectricityDetail(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.detailData = ret.data.borrowRecordDetail;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    detailBack: function() {
      this.$router.back(-1);
    }
  },
  mounted() {
    var vm = this;
    vm.getDetail();
  }
};
</script>
