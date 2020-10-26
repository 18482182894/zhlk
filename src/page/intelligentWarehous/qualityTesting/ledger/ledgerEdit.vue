<template>
  <div class="content">
    <div class="menuManage userManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">基础信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div>
              <span>
                质检单ID：
                <input type="text" readonly class="input-text" v-model="qualityTest.qualityBillId">
              </span>
              <span>
                粮食品种(小类)：
                <input type="text" readonly class="input-text" v-model="grainKindValue">
              </span>
              <span>
                宜存率：
                <input type="text" class="input-text" v-model="detail.survivalRate">
              </span>
              <span>
                宜存数量(千克)：
                <input type="text" class="input-text" v-model="detail.survivalNum">
              </span>
              <span>
                轻度不宜存数量(千克)：
                <input type="text" class="input-text" v-model="detail.lightNotSurvivalNum">
              </span>
              <span>
                重度不宜存数量(千克)：
                <input type="text" class="input-text" v-model="detail.severeNotSurvivalNum">
              </span>
              <span>
                未检测数量(千克)：
                <input type="text" class="input-text" v-model="detail.notCheckOutNum">
              </span>
              <span>
                单位：
                <input type="text" class="input-text" v-model="detail.company">
              </span>
              <!--<span>
                收获年度：
                <input type="text" class="input-text" v-model="detail.collectionYear">
              </span>-->
              <span>
                日期：
                <input type="text" class="input-text Wdate" onclick="WdatePicker({maxDate:'%y-%M-%d'})" id="accountDate"/>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="edit-btn">
        <button class="edit-submit" @click="submitEvent();">提交</button>
        <button class="edit-back" @click="detailBack();">返回</button>
      </div>
    </div>
  </div>
</template>

<style type="text/css" scoped>
  .tag-box .edit-btn {
    margin-top: 15px;
  }
</style>
<script>
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import {fetchLedger, addLedger, fetchQualityTest} from "@/api/intelligentWarehous/qualityTest";
  import { grainDetail } from "@/api/systemManage/basicData/grainVarieties";
  export default {
    name: "warehouseEdit",
    components: {
      Treeselect
    },
    data() {
      return {
        detail: {},
        qualityTest: {},
        grainVarietyList: [],
        grainPropertyList: [],
        grainKindValue: '',
        postData: {
          storehouseGbCode: this.$route.query.storehouseGbCode,
          warehouseGbCode: this.$route.query.warehouseGbCode,
          testType: this.$route.query.testType,
          grainKind: this.$route.query.grainKind,
          pageSize: 10,
          pageNo: this.$route.query.pageNo!=null?this.$route.query.pageNo:1,
          originalPageName:this.$route.query.originalPageName!=null?this.$route.query.originalPageName:'qualityTesting',
        }
      }
    },
    methods: {
      getDetail: function (id) {
        var vm = this;
        layer.load(2);
        fetchLedger(id)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              console.log(ret)
              this.detail = ret.data.accountDetail;
              this.grainKindValue = this.$route.query.grainKind;
              this.qualityTest.qualityBillId = this.detail.qualityBillId;
              document.getElementById('accountDate').value = this.detail.accountDate;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      getQualityTestDetail: function (id) {
        var vm = this;
        layer.load(2);
        fetchQualityTest(id)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              this.qualityTest = ret.data.dataMap;
              this.qualityTest.qualityBillId = this.$route.query.qualityBillId;
              // this.grainKindValue = this.$route.query.grainKind;
              this.grainKindValue = this.qualityTest.grainKind;
              grainDetail({ grainVarietyId: ret.data.dataMap.grainKind })
                .then(ret => {
                  if (ret.code == 200) {
                    this.grainKindValue = ret.data.grainVariety.grainVarietyName;
                  } else {
                    layer.alert(err.message, { closeBtn: 0 });
                  }
                })
                .catch(err => {
                  layer.alert(err.message, { closeBtn: 0 });
                });
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      submitEvent() {
        this.detail.accountDate = document.getElementById('accountDate').value;
        if (this.detail.survivalRate === '') return layer.msg("请输入宜存率");
        if (this.detail.survivalNum === '') return layer.msg("请输入宜存数量");
        if (this.detail.lightNotSurvivalNum === '') return layer.msg("请输入轻度不宜存数量");
        if (this.detail.severeNotSurvivalNum === '') return layer.msg("请输入重度不宜存数量");
        if (this.detail.notCheckOutNum === '') return layer.msg("请输入未检测数量");
        if (this.detail.company === '') return layer.msg("请输入单位");
        if (this.detail.accountDate === '') return layer.msg("请选择日期");
        if (this.qualityTest.applyRecordId) { // 质检单进入设置质检单ID
          this.detail.qualityBillId = this.qualityTest.qualityBillId;
          this.detail.grainKind = this.qualityTest.grainKind;
        }
        // this.detailBack();
        addLedger(this.detail)
          .then((ret) => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("保存成功！");
              // this.$router.back();
              this.detailBack();
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
      },
    },
    mounted() {
      if (this.$route.query.applyRecordId) {
        this.getQualityTestDetail(this.$route.query.applyRecordId);
      }
      if (this.$route.query.qualityAccountId) {
        this.getDetail(this.$route.query.qualityAccountId);
      }
    }
  }
</script>
