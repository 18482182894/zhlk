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
                <label v-text="detail.applyRecordId"></label>
              </span>
              <span>
                仓房：
                <label v-text="detail.storehouseName"></label>
              </span>
              <span>
                廒间：
                <label v-text="detail.warehouseName"></label>
              </span>
              <span>
                货位：
                <label v-text="detail.cargoName"></label>
              </span>
              <span>
                对应保管帐ID：
                <label v-text="detail.warehouseKeepingAccountId"></label>
              </span>
              <span>
                检验类型：
                <label v-text="detail.testType"></label>
              </span>
              <span>
                粮食品种：
                <label v-text="detail.grainVarietyName"></label>
              </span>
              <span>
                粮食等级：
                <label v-text="detail.grainLevelName"></label>
              </span>
              <span>
                收获年度：
                <label v-text="detail.collectionYear"></label>
              </span>
              <span>
                 样品编码：
                <label v-text="detail.sampleId"></label>
               </span>
              <span>
                样品数量(千克)：
                <label v-text="detail.sampleNum"></label>
              </span>
              <span>
                扦样人：
                <label v-text="detail.samplePerson"></label>
              </span>
              <span>
                检验单位：
                <label v-text="detail.sampleTestCompany"></label>
              </span>
              <span>
                扦样时间：
                <label v-text="detail.sampleDateTime"></label>
              </span>
              <span>
                质检时间：
                <label v-text="detail.checkDateTime"></label>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">第三方质检结果附件</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div>
              <img style="max-width: 100%; max-height: 300px" v-if="detail.threePartyAttachment" :src="detail.threePartyAttachment"/>
            </div>
          </div>
        </div>
      </div>
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">化验指标</div>
        </div>
        <div class="tag-box-content">
          <table class="customTable">
            <thead>
            <tr>
              <th>序号</th>
              <th>检验项目</th>
              <th>结果值</th>
              <th>检验结果</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(result, i) in detail.resultList">
              <td>{{i + 1}}</td>
              <td>{{result.qualityItemName}}</td>
              <td>{{result.resultValue}}</td>
              <td>{{result.storagableValue}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="edit-btn">
        <button class="edit-submit" @click="detailBack()">返回</button>
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
  import {fetchApplyRecord} from "@/api/intelligentWarehous/qualityTest";
  import {staffList} from "@/api/systemManage/staff";
  import {grainOilLevel} from "@/api/systemManage/dropDown";
  import {goodsDetail} from "@/api/systemManage/basicData/goodsAllocation";
  import {warehouseDetail} from "@/api/systemManage/basicData/warehouse";
  import {grainDetail} from "@/api/systemManage/basicData/grainVarieties";
  import {storageIndexList} from "@/api/systemManage/basicData/testSetup";

  export default {
    name: "warehouseEdit",
    data() {
      return {
        detail: {},
        postData: {
          storehouseGbCode:this.$route.query.storehouseGbCode,
          warehouseGbCode:this.$route.query.warehouseGbCode,
          pageSize: 10,
          pageNo:this.$route.query.pageNo!=null?this.$route.query.pageNo:1,
          originalPageName:this.$route.query.originalPageName!=null?this.$route.query.originalPageName:'management',
        }
      }
    },
    methods: {
      getDetail(qualityBillId) {
        var vm = this;
        layer.load(2);
        fetchApplyRecord({qualityBillId})
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              const {qualityBill} = ret.data;
              this.detail.applyRecordId = qualityBill.applyRecordId;
              this.detail.testType = qualityBill.testType;
              this.detail.warehouseKeepingAccountId = qualityBill.warehouseKeepingAccountId;
              this.detail.sampleNum = qualityBill.sampleNum;
              this.detail.samplePerson = qualityBill.samplePerson;
              this.detail.sampleTestCompany = qualityBill.sampleTestCompany;
              this.detail.sampleDateTime = qualityBill.sampleDateTime;
              this.detail.checkDateTime = qualityBill.checkDateTime;
              this.detail.sampleId = qualityBill.sampleId;
              this.detail.threePartyAttachment = qualityBill.threePartyAttachment;
              this.getGoods(qualityBill.cargoPosition);
              this.getStorehouse(qualityBill.storehouseGbCode);
              this.getGrainDetail(qualityBill.grainKind);
              this.getGrainOilLevel(qualityBill.grainLevel);
              this.getStorageIndex(qualityBill.grainKind, qualityBill.storagableResultList);
              if(qualityBill.collectionYear == 'null') {
                this.detail.collectionYear = ''
              }else {
                this.detail.collectionYear = qualityBill.collectionYear
              }
            } else {
              layer.closeAll("loading");
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      detailBack: function () {
        this.$router.push({
          name: this.postData.originalPageName,
          query: {
            storehouseGbCode:this.postData.storehouseGbCode,
            warehouseGbCode:this.postData.warehouseGbCode,
            testType: this.postData.testType,
            grainKind: this.postData.grainKind,
            pageSize: 10,
            pageNo:this.postData.pageNo,
            originalPageName:this.postData.originalPageName
          }
        })
      },
      getStorageIndex(grainVarietyId, storagableResultList) {
        storageIndexList({grainVarietyId, pageNo: 1, pageSize: 1000})
          .then(ret => {
            if (ret.code == 200) {
              const {dataList} = ret.data;
              const resultList = dataList.map(item => {
                const result = storagableResultList.find((result) => result.id == item.qualityItemId);
                return {...result, qualityItemName: item.indicatorName};
              });
              this.$set(this.detail, 'resultList', resultList);
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          }).catch(err => {
          layer.alert(err.message, {closeBtn: 0});
        });
      },
      getGoods(cargoPosition) {
        goodsDetail({cargoPosition})
          .then(ret => {
            if (ret.code == 200) {
              const {cargoDetail} = ret.data;
              this.$set(this.detail, 'warehouseName', cargoDetail.warehouseName);
              this.$set(this.detail, 'cargoName', cargoDetail.cargoName);
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          }).catch(err => {
          layer.alert(err.message, {closeBtn: 0});
        });
      },
      getStorehouse(storehouseGbCode) {
        warehouseDetail({storehouseGbCode})
          .then(ret => {
            if (ret.code == 200) {
              const {dataMap} = ret.data;
              this.$set(this.detail, 'storehouseName', dataMap.storehouseName);
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          }).catch(err => {
          layer.alert(err.message, {closeBtn: 0});
        });
      },
      getGrainDetail(grainVarietyId) {
        grainDetail({grainVarietyId})
          .then(ret => {
            if (ret.code == 200) {
              const {grainVariety} = ret.data;
              this.$set(this.detail, 'grainVarietyName', grainVariety.grainVarietyName);
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          }).catch(err => {
          layer.alert(err.message, {closeBtn: 0});
        });
      },
      getGrainOilLevel(level) {
        grainOilLevel()
          .then(ret => {
            if (ret.code == 200) {
              const grainLevelName = ret.data.dataList.find(l => l.dicInfoCode == level).dicInfoValue;
              this.$set(this.detail, 'grainLevelName', grainLevelName);
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          }).catch(err => {
          layer.alert(err.message, {closeBtn: 0});
        });
      },
    },
    mounted() {
      if (this.$route.query.qualityBillId) {
        this.getDetail(this.$route.query.qualityBillId);
      }
    }
  }
</script>
