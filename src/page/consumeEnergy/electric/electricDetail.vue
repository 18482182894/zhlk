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
                仓房：
                <label v-text="detailData.storehouseName"></label>
              </span>
              <span>
                廒间：
                <label v-text="detailData.warehouseName"></label>
              </span>
              <span>
                用电项目：
                <label v-if="parseInt(detailData.electricConsumerItem)==1" v-text="'熏蒸作业'"></label>
                <label v-if="parseInt(detailData.electricConsumerItem)==2" v-text="'通风作业'"></label>
                <label v-if="parseInt(detailData.electricConsumerItem)==3" v-text="'低温储粮'"></label>
                <label v-if="parseInt(detailData.electricConsumerItem)==4" v-text="'值仓'"></label>
                <label v-if="parseInt(detailData.electricConsumerItem)==5" v-text="'其它'"></label>
              </span>
              <span>
                开始时间：
                <label v-text="detailData.startDatetime"></label>
              </span>
              <span>
                作业前电表数据(kW·h)：
                <label v-text="detailData.beforeJobMeterData"></label>
              </span>
              <span>
                作业状态:
                <label v-text="detailData.afterJobMeterData==0?'未完成':'已完成'"></label>
              </span>
              <span>
                结束时间：
                <label v-text="detailData.endDatetime"></label>
              </span>
              <span>
                作业后电表数据(kW·h)：
                <label v-text="detailData.afterJobMeterData"></label>
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
import { electricDetail } from "@/api/energyConsumption/public";
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
      electricDetail(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.detailData = ret.data.electricCollect;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.data, { closeBtn: 0 });
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
