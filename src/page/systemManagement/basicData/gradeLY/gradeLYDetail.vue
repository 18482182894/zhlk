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
                                粮油等级：
                                <label v-text="detailData.grainOilLevelValue"></label>
                            </span>
                            <span>
                                备 注：
                                <label v-text="detailData.memo"></label>
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
import { gradeLYDetail } from "@/api/systemManage/basicData/gradeLY";
export default {
  name: "gradeLYDetail",
  data() {
    return {
      postData: {
        grainOilLevelId: this.$route.query.id
      },
      detailData: ""
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      gradeLYDetail(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.detailData = ret.data.enterpriseMap;
          } else {
            layer.alert(err.message, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    detailBack:function () {
        this.$router.back(-1);
    }
  },
  mounted() {
    var vm = this;
    vm.getDetail();
  }
};
</script>
