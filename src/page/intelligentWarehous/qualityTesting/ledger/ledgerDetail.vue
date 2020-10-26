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
                质检单ID：
                <label v-text="detail.qualityBillId"></label>
              </span>
              <span>
                质量台账编号：
                <label v-text="detail.qualityAccountId"></label>
              </span>
              <span>
                粮食品种(小类)：
                <label v-text="detail.grainKindValue"></label>
              </span>
              <span>
                库存性质：
                <label v-text="detail.grainPropertiesValue"></label>
              </span>
              <span>
                宜存率：
                <label v-text="detail.survivalRate"></label>
              </span>
              <span>
                宜存数量（千克）：
                <label v-text="detail.survivalNum"></label>
              </span>
              <span>
                轻度不宜存数量（千克）：
                <label v-text="detail.lightNotSurvivalNum"></label>
              </span>
              <span>
                重度不宜存数量（千克）：
                <label v-text="detail.severeNotSurvivalNum"></label>
              </span>
              <span>
                未检测数量(千克)：
                <label v-text="detail.notCheckOutNum"></label>
              </span>
              <span>
                单位：
                <label v-text="detail.company"></label>
              </span>
              <span>
                收获年度：
                <label v-text="detail.collectionYear"></label>
              </span>
              <span>
                日期：
                <label v-text="detail.accountDate"></label>
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
  import {fetchLedger} from "@/api/intelligentWarehous/qualityTest";

  export default {
    name: "companyDetail",
    data() {
      return {
        detail: {},
        postData: {
          qualityAccountId:this.$route.query.qualityAccountId,
          grainKind:this.$route.query.grainKind,
          grainProperties: this.$route.query.grainProperties,
          pageSize: 10,
          pageNo: this.$route.query.pageNo!=null?this.$route.query.pageNo:1,
        }
      };
    },
    methods: {
      getDetail (id) {
        var vm = this;
        layer.load(2);
        fetchLedger(id)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.detail = ret.data.accountDetail;
              //console.log(vm.detail);
              const testDate = this.detail.accountDate.slice(0,10)
              this.detail.accountDate = testDate;
              const {grainKindValue, grainPropertiesValue} = this.$route.query;
              vm.detail.grainKindValue = grainKindValue;
              vm.detail.grainPropertiesValue = grainPropertiesValue;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      detailBack: function () {
        this.$router.push({
          name: "qualityTestingLedger",
          query: {
            grainKind:this.postData.grainKind,
            grainProperties: this.postData.grainProperties,
            pageSize: 10,
            pageNo: this.postData.pageNo,
          }
        })
      }
    },
    mounted() {
      if (this.$route.query.qualityAccountId) {
        this.getDetail(this.$route.query.qualityAccountId);
      }
    }
  };
</script>
