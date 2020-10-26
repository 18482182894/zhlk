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
                粮情分析记录：
                <label v-text="detail.grainInfoCheckAnalysis"></label>
              </span>
              <span>
                熏蒸单编号：
                <label v-text="detail.fumigationId"></label>
              </span>
              <span>
                负责人：
                <label v-text="detail.responsiblePerson"></label>
              </span>
              <span>
                申请日期：
                <label v-text="detail.applyDate && detail.applyDate.slice(0,10)"></label>
              </span>
              <span>
                药剂名称：
                <label v-text="detail.medicineName"></label>
              </span>
              <span>
                药剂类型：
                <label>{{detail.medicineDosageForm | medicineDosageFormFormat}}</label>
              </span>
              <span>
                药剂有效期：
                <label v-text="detail.effectiveDate && detail.effectiveDate.slice(0,10)"></label>
              </span>
              <span>
                领用数量：
                <label v-text="detail.receiveNum"></label>
              </span>
              <span>
                药品单位：
                <label v-text="detail.meterUnit"></label>
              </span>
              <span>
                施药量：
                <label v-text="detail.applicationRate"></label>
              </span>
              <span>
                施药量单位：
                <label v-text="detail.applicationMeterUnit"></label>
              </span>
              <span>
                暂存地点：
                <label v-text="detail.tempStoreAddr"></label>
              </span>
              <span>
                领取人：
                <label v-text="detail.receivePerson"></label>
              </span>
              <span>
                领取时间：
                <label v-text="detail.receiveDatetime"></label>
              </span>
              <span>
                熏蒸方式：
                <label v-text="detail.fumigationType"></label>
              </span>
              <span>
                警戒距离：
                <label v-text="detail.alertDistance"></label>
              </span>
              <br>
              <span>
                残渣处理：
                <label v-text="detail.residueProcess"></label>
              </span>
              <br>
              <span>
                备案机关意见：
                <label v-text="detail.korOfficeOpinion"></label>
              </span>
              <br>
              <span>
                备案人：
                <label v-text="detail.korPerson"></label>
              </span>
              <span>
                备案时间：
                <label v-text="detail.korDatetime"></label>
              </span>
              <span>
                填报人：
                <label v-text="detail.fillInPerson"></label>
              </span>
              <span>
                填报人电话：
                <label v-text="detail.fillInTelephone"></label>
              </span>
              <span>
                填报人邮箱：
                <label v-text="detail.fillInEmail"></label>
              </span>
              <span>
                原始记录ID：
                <label v-text="detail.originalRecordId"></label>
              </span>
              <br>
              <span>
                熏蒸人：
                <label v-text="detail.fumigationPerson"></label>
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
                粮食品种：
                <label v-text="detail.grainVariety"></label>
              </span>
              <span>
                粮食数量：
                <label v-text="detail.grainNum"></label>
              </span>
              <span>
                堆装方式：
                <label v-text="detail.stackingMethodCode"></label>
              </span>
              <span>
                当前害虫：
                <label v-text="detail.currentPests"></label>
              </span>
              <span>
                害虫密度：
                <label v-text="detail.pestsDensity"></label>
              </span>
              <span>
                入仓时间：
                <label v-text="detail.importDatetime"></label>
              </span>
              <span>
                上次熏蒸时间：
                <label v-text="detail.lasttimeFumigationTime"></label>
              </span>
              <span>
                熏蒸前发芽率：
                <label v-text="detail.beforeFumigationSproutingRate"></label>
              </span>
              <span>
                熏蒸前粮温：
                <label v-text="detail.beforeFumigationGrainTemp"></label>
              </span>
              <span>
                熏蒸前粮食水温：
                <label v-text="detail.beforeFumigationGrainWater"></label>
              </span>
              <br>
              <span>
                备注：
                <label v-text="detail.memo"></label>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">附件</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail">
            <div>
              <img :src="detail.attachmentsUrl"/>
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
  import {fetchFumigationBill, fetchFumigationStaff} from "@/api/intelligentWarehous/fumigation";
  import {staffDetail} from "@/api/systemManage/staff";
  import {warehouseDetail} from "@/api/systemManage/basicData/warehouse";
  import {grainDetail} from "@/api/systemManage/basicData/grainVarieties";
  import {insectKindDict, unitsCode, fumigationType, grainNature, stackingMethod} from "@/api/systemManage/dropDown";

  export default {
    name: "companyDetail",
    data() {
      return {
        detail: {},
      };
    },
    methods: {
      getDetail(fumigationId) {
        layer.load(2);
        fetchFumigationBill({fumigationId})
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              const {fumigationRecordDetail} = ret.data;
              this.detail = fumigationRecordDetail;
              this.getStaffDetail(this.detail.responsiblePerson, 'responsiblePerson');
              this.getStaffDetail(this.detail.receivePerson, 'receivePerson');
              this.getStaffDetail(this.detail.korPerson, 'korPerson');
              this.getStaffDetail(this.detail.fillInPerson, 'fillInPerson');
              this.getUnitsCodeDetail();
              this.getFumigationTypeDetail();
              this.getGrainDetail(this.detail.grainVariety);
              this.getInsectKindDetail();
              this.getStackingMethodDetail();
              this.getFumigationStaffDetail(this.detail.fumigationPerson);
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      getStaffDetail(staff_id, key) {
        staffDetail({staff_id})
          .then(ret => {
            if (ret.code == 200) {
              this.detail[key] = ret.data.staffDetail.staff_name;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      getWarehouseDetail(storehouseGbCode) {
        warehouseDetail({storehouseGbCode})
          .then(ret => {
            if (ret.code == 200) {
              this.detail.graindepotGbCode = ret.data.dataMap.graindepotGbCode;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      getInsectKindDetail() {
        insectKindDict()
          .then(ret => {
            if (ret.code == 200) {
              const currentPests = ret.data.dataList.find(k => k.dicInfoCode === this.detail.currentPests);
              if (currentPests) {
                this.detail.currentPests = currentPests.dicInfoValue;
              }
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      getUnitsCodeDetail() {
        unitsCode()
          .then(ret => {
            if (ret.code == 200) {
              const meterUnit = ret.data.dataList.find(k => k.dicInfoCode === this.detail.meterUnit);
              if (meterUnit) {
                this.detail.meterUnit = meterUnit.dicInfoValue;
              }
              const applicationMeterUnit = ret.data.dataList.find(k => k.dicInfoCode === this.detail.applicationMeterUnit);
              if (applicationMeterUnit) {
                this.detail.applicationMeterUnit = applicationMeterUnit.dicInfoValue;
              }
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      getFumigationTypeDetail() {
        fumigationType()
          .then(ret => {
            if (ret.code == 200) {
              const fumigationType = ret.data.dataList.find(k => k.dicInfoCode === this.detail.fumigationType);
              if (fumigationType) {
                this.detail.fumigationType = fumigationType.dicInfoValue;
              }
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      getGrainDetail(grainVarietyId) {
        grainDetail({grainVarietyId})
          .then(ret => {
            if (ret.code == 200) {
              const {grainVariety} = ret.data;
              this.detail.grainVariety = grainVariety.grainVarietyName;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      getStackingMethodDetail() {
        stackingMethod()
          .then(ret => {
            if (ret.code == 200) {
              const stackingMethodCode = ret.data.dataList.find(k => k.dicInfoCode === this.detail.stackingMethodCode);
              if (stackingMethodCode) {
                this.detail.stackingMethodCode = stackingMethodCode.dicInfoValue;
              }
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      getFumigationStaffDetail(staffId) {
        fetchFumigationStaff({staffId})
          .then(ret => {
            if (ret.code == 200) {
              const {fumigationStaffDetail} = ret.data;
              this.detail.fumigationPerson = fumigationStaffDetail.staffName;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      detailBack () {
        var vm = this;
        vm.$router.push({

          name: "fumigationOperation",
          query: {
            storehouseGbCode:this.$route.query.storehouseGbCode,
            warehouseGbCode:this.$route.query.warehouseGbCode,
            pageNo:this.$route.query.pageNo,
          }
        });
      },
    },
    mounted() {
      if (this.$route.query.id) {
        this.getDetail(this.$route.query.id);
      }
    }
  };
</script>
