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
                                卡号：
                                <label v-text="detailData.cardNo"></label>
                            </span>
                           <!--  <span>
                                通知单号：
                                <label v-text="detailData.storehouseName"></label>
                            </span> -->
                            <span>
                                出入库类型：
                                <label v-text="detailData.registorType"></label>
                            </span>
                            <span>
                                车牌号：
                                <label v-text="detailData.plateNumber"></label>
                            </span>
                            <span>
                                粮油品种：
                                <label v-text="detailData.grainVariety"></label>
                            </span>
                            <span>
                                毛重(千克)：
                                <label v-text="detailData.grossWeight"></label>
                            </span>
                            <span>
                                皮重(千克)：
                                <label v-text="detailData.tareWeight"></label>
                            </span>
                            <span>
                                净重(千克)：
                                <label v-text="detailData.netWeight"></label>
                            </span>
                            <span>
                                水份增扣量(千克)：
                                <label v-text="detailData.waterIncrementDecrement"></label>
                            </span>
                            <span>
                                杂质增扣量(千克)：
                                <label v-text="detailData.impurityIncrementDecrement"></label>
                            </span>
                            <span>
                                其他增扣量(千克)：
                                <label v-text="detailData.otherIncrementDecrement"></label>
                            </span>
                            <span>
                                扣量总计(千克)：
                                <label v-text="detailData.incrementDecrementTotal"></label>
                            </span>
                            <span>
                                结算重量(千克)：
                                <label v-text="detailData.totalWeight"></label>
                            </span>

                        </div>
                    </div>
                </div>
            </div>
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">计量监控</div>
                </div>
                <div class="tag-box-content">
                  <img :src="detailData.truckFrontPic" class="register-img">
                  <img :src="detailData.truckUpperPic" class="register-img">
                  <img :src="detailData.truckBackPic"  class="register-img">
                  <img :src="detailData.poundRoomPic"  class="register-img">
                </div>
            </div>
            <div class="detail-back">
                <button @click="detailBack();">返回</button>
            </div>
        </div>
    </div>
</template>

<script>
import { meteringDetail} from "@/api/intelligentStorage/public";
export default {
  name: "companyDetail",
  data() {
    return {
      postData: {
        registorNo: this.$route.query.id
      },
      detailData: ""
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      meteringDetail(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            console.log(JSON.stringify(ret))
            vm.detailData = ret.data.weighingDetail;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    detailBack:function () {
      var vm = this;
      if(this.$route.query.type){
        this.$router.back(-1);
      }else{
          vm.$router.push({
            name: "oilOutStorageStep",
            query: {
              step: 4,
              condition:this.$route.query.condition
            }
          });
      }
    }
  },
  mounted() {
    var vm = this;
    vm.getDetail();
  }
};
</script>
