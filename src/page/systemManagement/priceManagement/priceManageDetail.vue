<template>
    <div class="content">
        <div class="menuManage roleManage">
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">基础信息</div>
                </div>
                <div class="tag-box-content">
                    <div class="userManage-detail userManage-edit">
                        <div>
                            <span>
                                 品种：
                                <label v-text="detailData.grainVariety"></label>
                            </span>
                            <span>
                                粮食性质：
                                <label v-text="detailData.grainAttribute"></label>
                            </span>
                            <span>
                                 等级：
                                <label v-text="detailData.grainLevel"></label>
                            </span>
                            <span>
                                结算价格(元/千克)：
                                <label v-text="detailData.price"></label>
                            </span>
                            <span>
                                备注：
                                <label v-text="detailData.memo" ></label>
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
import { priceDetail } from "@/api/systemManage/price";
export default {
  name: "priceManageDetail",
  data() {
    return {
      postData: {
        priceId: this.$route.query.id
      },
      detailData: ""
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      priceDetail(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.detailData = ret.data.priceInfo;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    detailBack:function () {
        /*this.$router.back(-1);*/
      this.$router.push({
        name: "priceManage",
        query: {
          grainVarietyId:this.$route.query.grainVarietyId,
          grainAttributeId:this.$route.query.grainAttributeId,
          grainLevelId:this.$route.query.grainLevelId,
          pageNo:this.$route.query.pageNo
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
