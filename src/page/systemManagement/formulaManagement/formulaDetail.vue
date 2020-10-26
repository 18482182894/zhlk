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
                                公式名称：
                                <label v-text="detailData.formulaName"></label>
                            </span>
                            <span>
                                公式状态：
                                <label v-text="detailData.formulaStatus==0?'停止':'启用'"></label>
                            </span>
                            <span>
                                公式结构：
                                <label v-text="detailData.formulaDetail"></label>
                            </span>
                            <span>
                                备注：
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
import { formulaDetail } from "@/api/systemManage/basicData/formula";
export default {
  name: "formulaDetail",
  data() {
    return {
      postData: {
        formulaId: this.$route.query.id
      },
      detailData: ""
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      formulaDetail(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.detailData = ret.data.formula;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    detailBack:function () {
       /* this.$router.back(-1);*/
      this.$router.push({
        name: "formula",
        query: {
          formulaName:this.$route.query.formulaName,
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
