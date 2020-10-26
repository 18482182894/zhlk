<template>
  <div class="content">
    <div class="menuManage userManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">新增熏蒸</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div>
              <span>
                熏蒸编号：
                <label>{{detail.fumigationId}}</label>
              </span>
              <br>
              <span>
                新增作业单号：
                <label>{{detail.jobBillId}}</label>
              </span>
              <span>
                负责人：
                <label>{{detail.responsiblePerson}}</label>
              </span>
              <span>
                作业时间：
                <label>{{detail.jobDatetime}}</label>
              </span>
              <span>
                操作人：
                <label>{{detail.opPerson}}</label>
              </span>
              <span>
                熏蒸过程：
                <label>{{detail.fumigationProcess}}</label>
              </span>
              <span>
                仓温：
                <label>{{detail.storehouseTemp}}</label>
              </span>
              <span>
                外温：
                <label>{{detail.outsideTemp}}</label>
              </span>
              <span>
                仓湿：
                <label>{{detail.storehouseHumidity}}</label>
              </span>
              <span>
                外湿：
                <label>{{detail.outsideHumidity}}</label>
              </span>
              <span>
                平均粮温：
                <label>{{detail.avgGrainTemp}}</label>
              </span>
              <span>
                最高粮温：
                <label>{{detail.maxGrainTemp}}</label>
              </span>
              <span>
                最低粮温：
                <label>{{detail.minGrainTemp}}</label>
              </span>
              <span>
                粮食品种：
                <label>{{detail.grainVariety}}</label>
              </span>
              <span>
                主要害虫：
                <label>{{detail.mainInsects}}</label>
              </span>
              <span>
                害虫密度：
                <label>{{detail.insectDensity}}</label>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="edit-btn">
        <button class="edit-submit" @click="$router.back()">返回</button>
      </div>
    </div>
  </div>
</template>
<style type="text/css" scoped>
</style>
<script>
  import {fetchFumigationWorkBill} from "@/api/intelligentWarehous/fumigation";
  import {fetchGrainTemperature} from "@/api/intelligentWarehous/grainSituation";
  import {storehouse, granary, insectKindDict, grainVariety} from "@/api/systemManage/dropDown";
  import {staffDetail} from "@/api/systemManage/staff";
  import {grainDetail} from "@/api/systemManage/basicData/grainVarieties";

  export default {
    name: "workSheetDetail",
    data() {
      return {
        detail: {},
      }
    },
    methods: {
      getDetail(jobBillId) {
        layer.load(2);
        fetchFumigationWorkBill({jobBillId})
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              this.detail = ret.data.fumigationJobBillDetail;
              this.getStaffDetail(this.detail.responsiblePerson, 'responsiblePerson');
              this.getStaffDetail(this.detail.opPerson, 'opPerson');
              this.getGrainDetail(this.detail.grainVariety);
              this.getInsectKindDetail(this.detail.mainInsects);
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
      getInsectKindDetail() {
        insectKindDict()
          .then(ret => {
            if (ret.code == 200) {
              const currentPests = ret.data.dataList.find(k => k.dicInfoCode === this.detail.mainInsects);
              if (currentPests) {
                this.detail.mainInsects = currentPests.dicInfoValue;
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
    },
    mounted() {
      if (this.$route.query.id) {
        this.getDetail(this.$route.query.id);
      }
    }
  }
</script>
