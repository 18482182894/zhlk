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
                            <span>
                                入库单号：
                                <label v-text="detailData.registerNo"></label>
                            </span>
                            <span>
                                是否复查：
                                <label v-text="detailData.checkFlag==1?'是':'否'"></label>
                            </span>
                            <span>
                                销卡时间：
                                <label v-text="detailData.goOutDatetime"></label>
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
import { CardRecordDetail} from "@/api/intelligentStorage/public";
export default {
  name: "companyDetail",
  data() {
    return {
      postData: {
        cardNo: this.$route.query.data.cardNo,
        registerNo: this.$route.query.data.registerNo
      },
      detailData: ""
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      CardRecordDetail(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.detailData = ret.data.cardUseRecord;
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
          vm.$router.push({
            name: "outOfStockStep",
            query: {
              step: 7,
              condition:this.$route.query.condition
            }
          });
    }
  },
  mounted() {
    var vm = this;
    vm.getDetail();
  }
};
</script>
