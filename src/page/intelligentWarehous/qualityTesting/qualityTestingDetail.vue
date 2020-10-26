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
                仓房：
                <label v-text="qualityTest.storehouseName"></label>
              </span>
              <span>
                廒间：
                <label v-text="qualityTest.warehouseName"></label>
              </span>
              <span><label v-text="qualityTest.testType"></label>
                检验类型：
                <label v-if="qualityTest.testType == '01' ">{{ '入仓验收' }}</label>
                <label v-if="qualityTest.testType == '02' ">{{ '出仓检验' }}</label>
                <label v-if="qualityTest.testType == '03' ">{{ '3月末普检' }}</label>
                <label v-if="qualityTest.testType == '04' ">{{ '9月末普检' }}</label>
                <label v-if="qualityTest.testType == '05' ">{{ '入仓初检' }}</label>
                <label v-if="qualityTest.testType == '06' ">{{ '月度检查' }}</label>
                <label v-if="qualityTest.testType == '07' ">{{ '3月末库内普查' }}</label>
                <label v-if="qualityTest.testType == '08' ">{{ '9月末库内普查' }}</label>
              </span>
              <span>
                检验人：
                <label v-text="qualityTest.testPerson"></label>
              </span>
              <span>
                检验时间：
                <label v-text="qualityTest.testDate"></label>
              </span>
              <span>
                备注：
                <label v-text="qualityTest.memo"></label>
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
  import {fetchQualityTest} from "@/api/intelligentWarehous/qualityTest";

  export default {
    name: "companyDetail",
    data() {
      return {
        qualityTest: {},
        postData: {
          storehouseGbCode: this.$route.query.storehouseGbCode,
          warehouseGbCode: this.$route.query.warehouseGbCode,
          testType: this.$route.query.testType,
          grainKind: this.$route.query.grainKind,
          pageSize: 10,
          pageNo: this.$route.query.pageNo!=null?this.$route.query.pageNo:1,
          originalPageName:this.$route.query.originalPageName!=null?this.$route.query.originalPageName:'qualityTesting',
        }
      };
    },
    methods: {
      getDetail(id) {
        layer.load(2);
        fetchQualityTest(id)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              this.qualityTest = ret.data.dataMap;
              const testDate = this.qualityTest.testDate.slice(0,10)
              this.qualityTest.testDate = testDate
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      detailBack:function () {
        this.$router.push({
          name: "qualityTesting",
          query: {
            storehouseGbCode: this.postData.storehouseGbCode,
            warehouseGbCode: this.postData.warehouseGbCode,
            testType: this.postData.testType,
            grainKind: this.postData.grainKind,
            pageNo: this.postData.pageNo,
            originalPageName:this.postData.originalPageName
          }
        })
      }
    },
    mounted() {
      if (this.$route.query.applyRecordId) {
        this.getDetail(this.$route.query.applyRecordId);
      }
    }
  };
</script>
