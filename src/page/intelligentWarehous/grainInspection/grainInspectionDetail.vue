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
                所属库点国际编码：
                <label v-text="detail.graindepotGbCode"></label>
              </span>
              <span>
                仓房国际编码：
                <label v-text="detail.storehouseGbCode"></label>
              </span>
              <span>
                仓廒编码：
                <label v-text="detail.warehouseGbCode"></label>
              </span>
              <span>
                天气：
                <label v-text="detail.weather"></label>
              </span>
              <span>
                气温：
                <label v-text="detail.airTemperature"></label>
              </span>
              <span>
                大气湿度：
                <label v-text="detail.airHumidity"></label>
              </span>
              <span>
                仓温：
                <label v-text="detail.warehouseTemperature"></label>
              </span>
              <span>
                仓湿：
                <label v-text="detail.warehouseHumidity"></label>
              </span>
              <span>
                数量：
                <label v-text="detail.quantity"></label>
              </span>
              <span>
                检查时间：
                <label v-text="detail.checkDatetime"></label>
              </span>
              <span>
                粮堆最高点温度：
                <label v-text="detail.grainHeapMaxTemperature"></label>
              </span>
              <span>
                粮堆最低点温度：
                <label v-text="detail.grainHeapMinTemperature"></label>
              </span>
              <span>
                最高点部位：
                <label v-text="detail.highestParts"></label>
              </span>
              <span>
                最低点部位：
                <label v-text="detail.lowestParts"></label>
              </span>
              <span>
                可疑点温度：
                <label v-text="detail.suspiciousPointsTemperature"></label>
              </span>

              <span>
                可疑点部位：
                <label v-text="detail.suspiciousPointsParts"></label>
              </span>
              <span>
                整仓平均粮温：
                <label v-text="detail.wholeAvgGrainTemperature"></label>
              </span>
              <span>
                上层温度：
                <label v-text="detail.upperLayerTemperature"></label>
              </span>
              <span>
                中上层温度：
                <label v-text="detail.upperMiddleTemperature"></label>
              </span>
              <span>
                中下层温度：
                <label v-text="detail.lowerMiddleTemperature"></label>
              </span>

              <span>
                下层温度：
                <label v-text="detail.lowerTemperature"></label>
              </span>
              <span>
                虫种：
                <label v-text="detail.insectKind"></label>
              </span>
              <span>
                虫密度：
                <label v-text="detail.insectDensity"></label>
              </span>
              <span>
                变质：
                <label v-text="detail.deterioration"></label>
              </span>
              <span>
                鼠、雀：
                <label v-text="detail.mouseSparrow"></label>
              </span>
              <span>
                检查人员：
                <label v-text="detail.checkMan"></label>
              </span>
              <br>
              <span style="width: 50%">
                事故：
                <label v-text="detail.accident"></label>
              </span>
              <span style="width: 50%">
                仓房状况：
                <label v-text="detail.storehouseStatus"></label>
              </span>
              <span style="width: 50%">
                储粮技术措施：
                <label v-text="detail.storageTechnologyMeasures"></label>
              </span>
              <span style="width: 50%">
                其他：
                <label v-text="detail.others"></label>
              </span>
              <span style="width: 50%">
                粮情分析：
                <label v-text="detail.grainSituationAnalysis"></label>
              </span>
              <span style="width: 50%">
                处理意见：
                <label v-text="detail.handlingOpinions"></label>
              </span>
              <span style="width: 50%">
                科室意见：
                <label v-text="detail.departmentOpinions"></label>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="detail-back">
        <button>打印</button>
        <button @click="detailBack();">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {fetchGrainInspection} from "@/api/intelligentWarehous/grainInspection";
  import {staffDetail} from "@/api/systemManage/staff";
  import {warehouseDetail} from "@/api/systemManage/basicData/warehouse";
  import {insectKindDict} from "@/api/systemManage/dropDown";

  export default {
    name: "grainInspectionDetail",
    data() {
      return {
        detail: {},
      };
    },
    methods: {
      getDetail(id) {
        layer.load(2);
        fetchGrainInspection(id)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              const {dataMap} = ret.data;
              dataMap.graindepotGbCode = '';
              this.detail = dataMap;
              // this.detail.airTemperature += '℃';
              // this.detail.airHumidity += '℃';
              this.detail.warehouseTemperature += '℃';
              // this.detail.warehouseHumidity += '℃';
              this.detail.grainHeapMaxTemperature += '℃';
              this.detail.grainHeapMinTemperature += '℃';
              this.detail.suspiciousPointsTemperature += '℃';
              this.detail.wholeAvgGrainTemperature += '℃';
              this.detail.upperLayerTemperature += '℃';
              this.detail.upperMiddleTemperature += '℃';
              this.detail.lowerMiddleTemperature += '℃';
              this.detail.lowerTemperature += '℃';
              this.getStaffDetail(this.detail.checkMan);
              this.getInsectKind(this.detail.insectKind);
              this.getWarehouseDetail(this.detail.storehouseGbCode);
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      getStaffDetail(staff_id) {
        staffDetail({staff_id})
          .then(ret => {
            if (ret.code == 200) {
              this.detail.checkMan = ret.data.staffDetail.staff_name;
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
      getInsectKind(insectKind) {
        insectKindDict()
          .then(ret => {
            if (ret.code == 200) {
              const kind = ret.data.dataList.find(k => k.dicInfoCode === insectKind);
              if (kind) {
                this.detail.insectKind = kind.dicInfoValue;
              }
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      detailBack: function () {
        this.$router.back();
      }
    },
    mounted() {
      if (this.$route.query.id) {
        this.getDetail(this.$route.query.id);
      }
    }
  };
</script>
