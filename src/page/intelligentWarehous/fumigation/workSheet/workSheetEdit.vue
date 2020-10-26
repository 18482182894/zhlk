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
                <input type="text" class="input-text" placeholder="点击选择" readonly
                       v-model="detail.fumigationId" @click="isShowFumigationPopup=true">
              </span>
              <br>
              <span v-if="detail.jobBillId">
                新增作业单号：
                <input type="text" class="input-text" readonly v-model="detail.jobBillId">
              </span>
              <span>
                负责人：
                <select class="select-style excision" v-model="detail.responsiblePerson">
                 <option
                   v-for="item in staffListData"
                   :key="item.staff_id"
                   :value="item.staff_id"
                   v-text="item.staff_name"/>
                </select>
              </span>
              <span>
                作业时间：
                <input type="text" class="input-text Wdate"
                       onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" id="jobDatetime"/>
              </span>
              <span>
                操作人：
                <select class="select-style excision" v-model="detail.opPerson">
                 <option
                   v-for="item in staffListData"
                   :key="item.staff_id"
                   :value="item.staff_id"
                   v-text="item.staff_name"/>
                </select>
              </span>
              <span>
                熏蒸过程：
                <select class="select-style excision" v-model="detail.fumigationProcess">
                  <option value="安全检查">安全检查</option>
                  <option value="施药申请">施药申请</option>
                  <option value="正式施药">正式施药</option>
                  <option value="施药完毕">施药完毕</option>
                  <option value="补药申请">补药申请</option>
                  <option value="补药完毕">补药完毕</option>
                  <option value="散气操作">散气操作</option>
                  <option value="效果检查">效果检查</option>
                </select>
              </span>
              <span>
                仓温：
                <input type="text" class="input-text" readonly v-model="detail.storehouseTemp">
              </span>
              <span>
                外温：
                <input type="text" class="input-text" readonly v-model="detail.outsideTemp">
              </span>
              <span>
                仓湿：
                <input type="text" class="input-text" readonly v-model="detail.storehouseHumidity">
              </span>
              <span>
                外湿：
                <input type="text" class="input-text" readonly v-model="detail.outsideHumidity">
              </span>
              <span>
                平均粮温：
                <input type="text" class="input-text" readonly v-model="detail.avgGrainTemp">
              </span>
              <span>
                最高粮温：
                <input type="text" class="input-text" readonly v-model="detail.maxGrainTemp">
              </span>
              <span>
                最低粮温：
                <input type="text" class="input-text" readonly v-model="detail.minGrainTemp">
              </span>
              <span>
                粮食品种：
                <treeselect v-model="detail.grainVariety" :multiple="false" :options="grainVarietyList" placeholder="请选择粮食品种"/>
              </span>
              <span>
                主要害虫：
                <select class="select-style excision" v-model="detail.mainInsects">
                 <option
                   v-for="item in insectKindDictList"
                   :key="item.dicInfoCode"
                   :value="item.dicInfoCode"
                   v-text="item.dicInfoValue"/>
                </select>
              </span>
              <span>
                害虫密度：
                <input type="number" class="input-text" v-model="detail.insectDensity">
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="edit-btn">
        <button class="edit-submit" @click="submitEvent();">提交</button>
        <button class="edit-back" @click="$router.back()">返回</button>
      </div>
    </div>
    <SelectTablePopup
      v-if="isShowFumigationPopup"
      title="请选择熏蒸单"
      list-key="fumigationRecordList"
      :search-data="{auditState: '99'}"
      :api="fetchFumigationBillList"
      @hide="isShowFumigationPopup=false">
      <template slot-scope="scope">
        <table class="customTable">
          <thead>
          <tr>
            <th style="width: 3%;">序号</th>
            <th style="width: 5%;">仓房</th>
            <th style="width: 5%;">廒间</th>
            <th style="width: 5%;">负责人</th>
            <th style="width: 5%;">药剂名称</th>
            <th style="width: 5%;">熏蒸方式</th>
            <th style="width: 5%;">申请时间</th>
            <th style="width: 5%;">编辑状态</th>
            <th style="width: 5%;">审核状态</th>
            <th style="width: 10%;">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,i) in scope.list">
            <td v-text="i+1"></td>
            <td v-text="item.storehouseName"></td>
            <td v-text="item.warehouseName"></td>
            <td v-text="item.responsiblePersonValue"></td>
            <td v-text="item.medicineName"></td>
            <td v-text="item.fumigationTypeVaule"></td>
            <td v-text="item.applyDate.slice(0,10)"></td>
            <td v-text="draftStatusMap[item.draftStatus]"></td>
            <td v-text="auditStateMap[item.auditState]"></td>
            <td>
              <div class="table-btn btn-green" @click="selectFumigation(item)">选择</div>
            </td>
          </tr>
          </tbody>
        </table>
      </template>
    </SelectTablePopup>
  </div>
</template>
<style type="text/css" scoped>
</style>
<script>
  import Treeselect from '@riophae/vue-treeselect';
  import '@riophae/vue-treeselect/dist/vue-treeselect.css';
  import SelectTablePopup from '@/components/SelectTablePopup';
  import {fetchFumigationBillList, addFumigationWorkBill, editFumigationWorkBill, fetchFumigationWorkBill} from "@/api/intelligentWarehous/fumigation";
  import {fetchGrainTemperature} from "@/api/intelligentWarehous/grainSituation";
  import {storehouse, granary, insectKindDict, grainVariety} from "@/api/systemManage/dropDown";
  import {staffList} from "@/api/systemManage/staff";

  export default {
    name: "workSheetEdit",
    components: {
      SelectTablePopup,
      Treeselect,
    },
    data() {
      return {
        auditStateMap: {
          '-1': '尚未提交',
          '0': '审核不通过',
          '10': '未审核',
          '11': '审核中',
          '99': '审核通过'
        },
        draftStatusMap: {
          '0': '草稿',
          '1': '正式文档'
        },
        detail: {
          storehouseGbCode: '',
          warehouseGbCode: '',
          storehouseName: '',
          warehouseName: '',
          fumigationId: '',
          jobBillId: '',
          responsiblePerson: '',
          jobDatetime: '',
          opPerson: '',
          fumigationProcess: '',
          storehouseTemp: '',
          outsideTemp: '',
          storehouseHumidity: '',
          outsideHumidity: '',
          avgGrainTemp: '',
          maxGrainTemp: '',
          minGrainTemp: '',
          grainVariety: null,
          mainInsects: '',
          insectDensity: '',
          space: '-',
          lowestConcentration: '-',
          highestConcentration: '-',
          avgConcentration: '-',
          memo: '-',
        },
        staffListData: [],
        insectKindDictList: [],
        grainVarietyList: [],
        isShowFumigationPopup: false,
      }
    },
    methods: {
      fetchFumigationBillList,
      getDetail(jobBillId) {
        layer.load(2);
        fetchFumigationWorkBill({jobBillId})
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              const {fumigationJobBillDetail} = ret.data;
              this.detail = {...this.detail, ...fumigationJobBillDetail};
              document.getElementById('jobDatetime').value = this.detail.jobDatetime;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      submitEvent() {
        this.detail.jobDatetime = document.getElementById('jobDatetime').value;
        if (!this.detail.fumigationId) return layer.msg("请选择熏蒸");
        if (!this.detail.responsiblePerson) return layer.msg("请选择负责人");
        if (!this.detail.jobDatetime) return layer.msg("请选择作业时间");
        if (!this.detail.opPerson) return layer.msg("请选择操作人");
        if (!this.detail.fumigationProcess) return layer.msg("请选择熏蒸过程");
        if (!this.detail.grainVariety) return layer.msg("请选择粮食品种");
        if (!this.detail.mainInsects) return layer.msg("请选择主要害虫");
        if (!this.detail.insectDensity) return layer.msg("请选择虫害密度");
        const api = this.detail.jobBillId ? editFumigationWorkBill : addFumigationWorkBill;
        layer.load(2);
        api(this.detail)
          .then((ret) => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("保存成功！");
              this.$router.back();
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });

      },
      selectFumigation(item) {
        this.isShowFumigationPopup = false;
        this.detail.fumigationId = item.fumigationId;
        this.getWarehouseTemperature(item);
      },
      getWarehouseTemperature({storehouseGbCode, warehouseGbCode, storehouseName, warehouseName}) {
        fetchGrainTemperature({storehouseGbCode, warehouseGbCode})
          .then((ret) => {
            if (ret.code == 200) {
              const {temperatureDetail} = ret.data;
              this.detail.storehouseGbCode = storehouseGbCode;
              this.detail.warehouseGbCode = warehouseGbCode;
              this.detail.storehouseName = storehouseName;
              this.detail.warehouseName = warehouseName;
              this.detail.storehouseTemp = temperatureDetail.insideTemperature;
              this.detail.outsideTemp = temperatureDetail.outsideTemperature;
              this.detail.storehouseHumidity = temperatureDetail.insideHumidity;
              this.detail.outsideHumidity = temperatureDetail.outsideHumidity;
              this.detail.avgGrainTemp = temperatureDetail.outsideHumidity;
              this.detail.maxGrainTemp = temperatureDetail.maxTemperature;
              this.detail.minGrainTemp = temperatureDetail.minTemperature;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
      },
      getStaff() { // 获取检查人员列表
        staffList({pageNo: 1, pageSize: 1000})
          .then((ret) => {
            if (ret.code == 200) {
              this.staffListData = ret.data.staffList;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      getInsectKindDict() {
        insectKindDict()
          .then((ret) => {
            if (ret.code == 200) {
              this.insectKindDictList = ret.data.dataList;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      getGrainVariety() {
        grainVariety({})
          .then((ret) => {
            if (ret.code == 200) {
              this.grainVarietyList = ret.data.grainVarietyList;
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
      this.getStaff();
      this.getInsectKindDict();
      this.getGrainVariety();
      if (this.$route.query.id) {
        this.getDetail(this.$route.query.id);
      }
    }
  }
</script>
