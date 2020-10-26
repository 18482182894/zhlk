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
                粮情分析记录：
                <input type="text" class="input-text" placeholder="点击选择" readonly
                       v-model="detail.grainInfoCheckAnalysis" @click="isShowGrainInspectionPopup=true">
              </span>
              <span v-if="detail.fumigationId">
                熏蒸单编号：
                <input type="text" class="input-text" readonly v-model="detail.fumigationId"/>
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
                申请日期：
                <input type="text" class="input-text Wdate"
                       onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" id="applyDate"/>
              </span>
              <span>
                药剂名称：
                <input type="text" class="input-text" placeholder="点击选择" readonly
                       v-model="detail.medicineName" @click="isShowMedicinePopup=true">
              </span>
              <span>
                药剂类型：
                <input type="text" class="input-text" readonly v-model="detail.medicineDosageFormName"/>
              </span>
              <span>
                药剂有效期：
                <input type="text" class="input-text Wdate"
                       onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" id="effectiveDate"/>
              </span>
              <span>
                领用数量：
                <input type="num" class="input-text" v-model="detail.receiveNum"/>
              </span>
              <span>
                药品单位：
                <select class="select-style excision" v-model="detail.meterUnit">
                 <option
                   v-for="item in unitsCodeList"
                   :key="item.dicInfoCode"
                   :value="item.dicInfoCode"
                   v-text="item.dicInfoValue"/>
                </select>
              </span>
              <span>
                施药量：
                <input type="num" class="input-text" v-model="detail.applicationRate"/>
              </span>
              <span>
                施药量单位：
                <select class="select-style excision" v-model="detail.applicationMeterUnit">
                 <option
                   v-for="item in unitsCodeList"
                   :key="item.dicInfoCode"
                   :value="item.dicInfoCode"
                   v-text="item.dicInfoValue"/>
                </select>
              </span>
              <span>
                暂存地点：
                <input type="text" class="input-text" v-model="detail.tempStoreAddr"/>
              </span>
              <span>
                领取人：
                <select class="select-style excision" v-model="detail.receivePerson">
                 <option
                   v-for="item in staffListData"
                   :key="item.staff_id"
                   :value="item.staff_id"
                   v-text="item.staff_name"/>
                </select>
              </span>
              <span>
                领取时间：
                <input type="text" class="input-text Wdate"
                       onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" id="receiveDatetime"/>
              </span>
              <span>
                熏蒸方式：
                <select class="select-style excision" v-model="detail.fumigationType">
                 <option
                   v-for="item in fumigationTypeList"
                   :key="item.dicInfoCode"
                   :value="item.dicInfoCode"
                   v-text="item.dicInfoValue"/>
                </select>
              </span>
              <span>
                警戒距离：
                <input type="num" class="input-text" v-model="detail.alertDistance"/>
              </span>
              <br>
              <span style="width: 100%;">
                残渣处理：
                <textarea class="edit-textarea" v-model="detail.residueProcess"></textarea>
              </span>
              <span style="width: 100%;">
                备案机关意见：
                <textarea class="edit-textarea" v-model="detail.korOfficeOpinion"></textarea>
              </span>
              <span>
                备案时间：
                <input type="text" class="input-text Wdate"
                       onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" id="korDatetime"/>
              </span>
              <span>
                备案人：
                <select class="select-style excision" v-model="detail.korPerson">
                 <option
                   v-for="item in staffListData"
                   :key="item.staff_id"
                   :value="item.staff_id"
                   v-text="item.staff_name"/>
                </select>
              </span>
              <span>
                填报人：
                <select class="select-style excision" v-model="detail.fillInPerson">
                 <option
                   v-for="item in staffListData"
                   :key="item.staff_id"
                   :value="item.staff_id"
                   v-text="item.staff_name"/>
                </select>
              </span>
              <span>
                填报人电话：
                <input type="text" class="input-text" v-model="detail.fillInTelephone"/>
              </span>
              <span>
                填报人邮箱：
                <input type="text" class="input-text" v-model="detail.fillInEmail"/>
              </span>
              <span>
                原始记录ID：
                <input type="text" class="input-text" v-model="detail.originalRecordId"/>
              </span>
              <br>
              <span>
                熏蒸人：
                <input type="text" class="input-text" placeholder="点击选择" readonly
                       v-model="detail.fumigationPersonName" @click="isShowFumigationPersonPopup=true">
              </span>
              <span>
                仓房：
                <input type="text" class="input-text" readonly v-model="detail.storehouseName"/>
              </span>
              <span>
                廒间：
                <input type="text" class="input-text" readonly v-model="detail.warehouseName"/>
              </span>
              <span>
                粮食品种：
                <input type="text" class="input-text" readonly v-model="detail.grainVarietyName"/>
              </span>
              <span>
                粮食数量：
                <input type="text" class="input-text" readonly v-model="detail.grainNum"/>
              </span>
              <span>
                堆装方式：
                <select class="select-style excision" v-model="detail.stackingMethodCode">
                 <option
                   v-for="item in stackingMethodList"
                   :key="item.dicInfoCode"
                   :value="item.dicInfoCode"
                   v-text="item.dicInfoValue"/>
                </select>
              </span>
              <span>
                当前害虫：
                 <select class="select-style excision" v-model="detail.currentPests">
                 <option
                   v-for="item in insectKindDictList"
                   :key="item.dicInfoCode"
                   :value="item.dicInfoCode"
                   v-text="item.dicInfoValue"/>
                </select>
              </span>
              <span>
                害虫密度：
                <input type="text" class="input-text" v-model="detail.pestsDensity"/>
              </span>
              <span>
                入仓时间：
                <input type="text" class="input-text Wdate"
                       onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" id="importDatetime"/>
              </span>
              <span>
                上次熏蒸时间：
                <input type="text" class="input-text Wdate"
                       onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" id="lasttimeFumigationTime"/>
              </span>
              <span>
                计划熏蒸时间：
                <input type="text" class="input-text Wdate"
                       onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" id="planFumigationTime"/>
              </span>
              <span>
                熏蒸前发芽率：
                <input type="text" class="input-text" v-model="detail.beforeFumigationSproutingRate"/>
              </span>
              <span>
                熏蒸前粮温：
                <input type="text" class="input-text" v-model="detail.beforeFumigationGrainTemp"/>
              </span>
              <span>
                熏蒸前粮食水温：
                <input type="text" class="input-text" v-model="detail.beforeFumigationGrainWater"/>
              </span>
              <br>
              <span style="width: 100%;">
                备注：
                <textarea class="edit-textarea" v-model="detail.memo"></textarea>
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
          <div class="upload-pic">
            <div id="uploadPic"></div>
            <img :src="fileUrl || '../../../../../static/images/upload-pic.png'" alt=""/>
            <!--<label class="fc-red">只支持.jpg格式</label>-->
          </div>
        </div>
      </div>
      <div class="edit-btn">
        <button class="edit-submit" @click="submitEvent();">提交</button>
        <button class="edit-back"@click="detailBack();">返回</button>
      </div>
    </div>
    <SelectTablePopup
      v-if="isShowGrainInspectionPopup"
      title="请选择粮情分析记录"
      list-key="dataList"
      :api="fetchGrainInspectionList"
      @hide="isShowGrainInspectionPopup=false">
      <template slot-scope="scope">
        <table class="customTable">
          <thead>
          <tr>
            <th style="width:5%;">序号</th>
            <th style="width:7.5%;">仓房</th>
            <th style="width:7.5%;">廒间</th>
            <th style="width:7.5%;">粮堆最高点温度</th>
            <th style="width:7.5%;">粮堆最低点温度</th>
            <th style="width:7.5%;">整仓平均粮温</th>
            <th style="width:7.5%;">检查人员</th>
            <th style="width:7.5%;">检查时间</th>
            <th style="width:7.5%;">编辑状态</th>
            <th style="width:7.5%;">审核状态</th>
            <th style="width:10%;">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,i) in scope.list">
            <td v-text="i+1"></td>
            <td v-text="item.storehouseName"></td>
            <td v-text="item.warehouseName"></td>
            <td v-text="item.grainHeapMaxTemperature"></td>
            <td v-text="item.grainHeapMinTemperature"></td>
            <td v-text="item.wholeAvgGrainTemperature"></td>
            <td v-text="item.checkMan"></td>
            <td v-text="item.checkDatetime"></td>
            <td v-text="draftStatusMap[item.draftStatus]"></td>
            <td v-text="auditStateMap[item.auditState]"></td>
            <td>
              <div class="table-btn btn-green" @click="selectGrainInspection(item)">选择</div>
            </td>
          </tr>
          </tbody>
        </table>
      </template>
    </SelectTablePopup>
    <SelectTablePopup
      v-if="isShowMedicinePopup"
      title="请选择药剂"
      list-key="dataList"
      :api="fetchMedicineList"
      @hide="isShowMedicinePopup=false">
      <template slot-scope="scope">
        <table class="customTable">
          <thead>
          <tr>
            <th style="width:4%;">序号</th>
            <th style="width:5%;">药品编码</th>
            <th style="width:10%;">药品名称</th>
            <th style="width:10%;">药剂种类</th>
            <th style="width:5%;">库存数量</th>
            <th style="width:5%;">价格</th>
            <th style="width:5%;">计量单位</th>
            <th style="width:30%;">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,i) in scope.list">
            <td v-text="i+1"></td>
            <td v-text="item.medicineId"></td>
            <td v-text="item.medicineName"></td>
            <td v-text="item.medicineDosageForm"></td>
            <td v-text="item.inventoryNum"></td>
            <td v-text="item.price"></td>
            <td v-text="item.meterUnit"></td>
            <td>
              <div class="table-btn btn-green" @click="selectMedicine(item)">选择</div>
            </td>
          </tr>
          </tbody>
        </table>
      </template>
    </SelectTablePopup>
    <SelectTablePopup
      v-if="isShowFumigationPersonPopup"
      title="请选择熏蒸人"
      list-key="fumigationRecordList"
      :api="fetchFumigationStaffList"
      @hide="isShowFumigationPersonPopup=false">
      <template slot-scope="scope">
        <div class="btn btn-add" @click="showAddFumigationPersonPopup">
          <img src="../../../../../static/images/add.png" alt="">
          <label>新增</label>
        </div>
        <table class="customTable">
          <thead>
          <tr>
            <th style="width:4%;">序号</th>
            <th style="width:10%;">姓名</th>
            <th style="width:10%;">职务</th>
            <th style="width:10%;">职业资质</th>
            <th style="width:10%;">身体状态</th>
            <th style="width:10%;">任务分工</th>
            <th style="width:10%;">是否外请人员</th>
            <th style="width:10%;">备注</th>
            <th style="width:30%;">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,i) in scope.list">
            <td v-text="i+1"></td>
            <td v-text="item.staffName"></td>
            <td v-text="item.staffPosition"></td>
            <td v-text="item.vocationalQualifications"></td>
            <td v-text="item.bodyStatus"></td>
            <td v-text="item.taskDivision"></td>
            <td v-text="['正式','外包'][item.outsourceFlag]"></td>
            <td v-text="item.memo"></td>
            <td>
              <div class="table-btn btn-green" @click="selectFumigationPerson(item)">选择</div>
            </td>
          </tr>
          </tbody>
        </table>
      </template>
    </SelectTablePopup>
    <AddFumigationPersonPopup
      v-if="isShowAddFumigationPersonPopup"
      @hide="hideAddFumigationPersonPopup"/>
  </div>
</template>
<style type="text/css" scoped>
</style>
<script>
  import Vue from 'vue';
  import SelectTablePopup from '@/components/SelectTablePopup';
  import AddFumigationPersonPopup from './AddFumigationPersonPopup';
  import {staffList} from "@/api/systemManage/staff";
  import {fetchWarehouse} from "@/api/intelligentWarehous/quantityDetection";
  import {unitsCode, grainNature, stackingMethod, insectKindDict, fumigationType} from "@/api/systemManage/dropDown";
  import {fetchMedicineList, fetchMedicineDetail} from "@/api/intelligentWarehous/pharmacy";
  import {
    fetchFumigationStaffList,
    fetchFumigationBill,
    addFumigationBill,
    editFumigationBill,
    fetchFumigationStaff
  } from "@/api/intelligentWarehous/fumigation";
  import {fetchGrainInspectionList} from "@/api/intelligentWarehous/grainInspection";
  import {uploadPic} from "@/utils/public";
import {
    grainDetail
} from '@/api/systemManage/basicData/grainVarieties'

  export default {
    name: "warehouseEdit",
    components: {
      SelectTablePopup,
      AddFumigationPersonPopup,
    },
    data() {
      return {
        isShowGrainInspectionPopup: false,
        isShowMedicinePopup: false,
        isShowFumigationPersonPopup: false,
        isShowAddFumigationPersonPopup: false,
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
        fileUrl: '',
        detail: {
          grainInfoCheckAnalysis: '',
          fumigationId: '',
          responsiblePerson: '',
          applyDate: '',
          medicineName: '',
          medicineDosageForm: '',
          medicineDosageFormName: '',
          effectiveDate: '',
          receiveNum: '',
          meterUnit: '',
          applicationRate: '',
          applicationMeterUnit: '',
          tempStoreAddr: '',
          receivePerson: '',
          receiveDatetime: '',
          fumigationType: '',
          alertDistance: '',
          residueProcess: '',
          korOfficeOpinion: '',
          korDatetime: '',
          korPerson: '',
          fillInPerson: '',
          fillInTelephone: '',
          fillInEmail: '',
          originalRecordId: '',
          fumigationPerson: '',
          fumigationPersonName: '',
          grainVariety: '',
          grainVarietyName: '',
          grainNum: '',
          stackingMethodCode: '',
          currentPests: '',
          pestsDensity: '',
          importDatetime: '',
          lasttimeFumigationTime: '',
          planFumigationTime: '',
          beforeFumigationSproutingRate: '',
          beforeFumigationGrainTemp: '',
          beforeFumigationGrainWater: '',
          memo: '',
          attachments: '',
        },
        staffListData: [],
        unitsCodeList: [],
        medicineCodeList: [],
        stackingMethodList: [],
        insectKindDictList: [],
        fumigationTypeList: [],
      };
    },
    methods: {
      fetchGrainInspectionList,
      fetchMedicineList,
      fetchFumigationStaffList,
      getDetail(fumigationId) {
        layer.load(2);
        fetchFumigationBill({fumigationId})
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              const {fumigationRecordDetail} = ret.data;
              this.detail = {...this.detail, ...fumigationRecordDetail};
              const medicineDosageFormFormat = Vue.filter('medicineDosageFormFormat');
              this.detail.medicineDosageFormName = medicineDosageFormFormat(this.detail.medicineDosageForm);
              this.fileUrl = fumigationRecordDetail.attachmentsUrl;
              document.getElementById('applyDate').value = fumigationRecordDetail.applyDate.slice(0, 10);
              document.getElementById('effectiveDate').value = fumigationRecordDetail.effectiveDate.slice(0, 10);
              document.getElementById('receiveDatetime').value = fumigationRecordDetail.receiveDatetime;
              document.getElementById('korDatetime').value = fumigationRecordDetail.korDatetime;
              document.getElementById('importDatetime').value = fumigationRecordDetail.importDatetime;
              document.getElementById('lasttimeFumigationTime').value = fumigationRecordDetail.lasttimeFumigationTime;
              document.getElementById('planFumigationTime').value = fumigationRecordDetail.planFumigationTime;
              this.getGrainVarietyDetail();
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
      submitEvent() {
        this.detail.applyDate = document.getElementById('applyDate').value;
        this.detail.effectiveDate = document.getElementById('effectiveDate').value;
        this.detail.receiveDatetime = document.getElementById('receiveDatetime').value;
        this.detail.korDatetime = document.getElementById('korDatetime').value;
        this.detail.importDatetime = document.getElementById('importDatetime').value;
        this.detail.lasttimeFumigationTime = document.getElementById('lasttimeFumigationTime').value;
        this.detail.planFumigationTime = document.getElementById('planFumigationTime').value;
        if (!this.detail.grainInfoCheckAnalysis) return layer.msg("请选择粮情分析记录");
        if (!this.detail.responsiblePerson) return layer.msg("请选择负责人");
        if (!this.detail.applyDate) return layer.msg("请选择申请日期");
        if (!this.detail.medicineName) return layer.msg("请选择药剂");
        if (!this.detail.effectiveDate) return layer.msg("请选择药剂有效期");
        if (!this.detail.receiveNum) return layer.msg("请填写领用数量");
        if (!this.detail.meterUnit) return layer.msg("请选择药品单位");
        if (!this.detail.applicationRate) return layer.msg("请填写施药量");
        if (!this.detail.applicationMeterUnit) return layer.msg("请选择施药量单位");
        if (!this.detail.tempStoreAddr) return layer.msg("请填写暂存地点");
        if (!this.detail.receivePerson) return layer.msg("请选择领取人");
        if (!this.detail.receiveDatetime) return layer.msg("请选择领取时间");
        if (!this.detail.fumigationType) return layer.msg("请选择熏蒸方式");
        if (!this.detail.alertDistance) return layer.msg("请填写警戒距离");
        if (!this.detail.residueProcess) return layer.msg("请填写残渣处理");
        if (!this.detail.korOfficeOpinion) return layer.msg("请填写备案机关意见");
        if (!this.detail.korDatetime) return layer.msg("请选择备案时间");
        if (!this.detail.korPerson) return layer.msg("请选择备案人");
        if (!this.detail.fillInPerson) return layer.msg("请选择填报人");
        if (!this.detail.fillInTelephone) return layer.msg("请填写填报人电话");
        if (!this.detail.fillInEmail) return layer.msg("请填写填报人邮箱");
        if (!this.detail.originalRecordId) return layer.msg("请填写原始记录ID");
        if (!this.detail.fumigationPerson) return layer.msg("请选择熏蒸人");
        if (!this.detail.fumigationPerson) return layer.msg("请选择熏蒸人");
        if (!this.detail.stackingMethodCode) return layer.msg("请选择堆装方式");
        if (!this.detail.currentPests) return layer.msg("请选择当前害虫");
        if (!this.detail.pestsDensity) return layer.msg("请填写害虫密度");
        if (!this.detail.importDatetime) return layer.msg("请选择入仓时间");
        if (!this.detail.lasttimeFumigationTime) return layer.msg("请选择上次熏蒸时间");
        if (!this.detail.planFumigationTime) return layer.msg("请选择计划熏蒸时间");
        if (!this.detail.beforeFumigationSproutingRate) return layer.msg("请填写熏蒸前发芽率");
        if (!this.detail.beforeFumigationGrainTemp) return layer.msg("请填写熏蒸前粮温");
        if (!this.detail.beforeFumigationGrainWater) return layer.msg("请填写熏蒸前粮食水温");
        if (!this.detail.memo) return layer.msg("请填写备注");
        if (!this.detail.attachments) return layer.msg("请选择附件");
        const api = this.detail.fumigationId ? editFumigationBill : addFumigationBill;
        layer.load(2);
        api(this.detail)
          .then((ret) => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("保存成功！");
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
      selectGrainInspection(item) {
        this.detail.grainInfoCheckAnalysis = item.grainCheckRecordId;
        this.detail.storehouseGbCode = item.storehouseGbCode;
        this.detail.storehouseName = item.storehouseName;
        this.detail.warehouseGbCode = item.warehouseGbCode;
        this.detail.warehouseName = item.warehouseName;
        this.isShowGrainInspectionPopup = false;
        this.getWarehouseInfo(item.warehouseGbCode);
      },
      getWarehouseInfo(warehouseGbCode) {
        fetchWarehouse({warehouseGbCode})
          .then((ret) => {
            if (ret.code == 200) {
              const {dataMap} = ret.data;
              this.detail.grainNum = dataMap.currentQuantity;
              this.getGrainKind(dataMap.grainKind);
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      getGrainKind(grainVariety) {

              grainDetail({grainVarietyId:grainVariety}).then(ret=>{
                  layer.closeAll('loading');
                  if (ret.code==200) {
                      this.detail.grainVarietyName=ret.data.grainVariety.grainVarietyName;
                      this.detail.grainVariety=ret.data.grainVariety.grainVarietyId;

                  }else{
                      layer.alert(err.message, { closeBtn: 0 });
                  }

              }).catch(err=>{
                  layer.alert(err.message, { closeBtn: 0 });
              });
      },
      getGrainVarietyDetail() {
        grainNature()
          .then(ret => {
            if (ret.code == 200) {
              const grainVariety = ret.data.dataList.find(k => k.dicInfoCode === this.detail.grainVariety);
              if (grainVariety) {
                this.detail.grainVarietyName = grainVariety.dicInfoValue;
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
              this.detail.fumigationPersonName = fumigationStaffDetail.staffName;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      selectMedicine(medicine) {
        this.detail.medicineId = medicine.medicineId;
        this.isShowMedicinePopup = false;
        this.getMedicineDetail(medicine.id);
      },
      selectFumigationPerson(person) {
        this.detail.fumigationPerson = person.staffId;
        this.detail.fumigationPersonName = person.staffName;
        this.isShowFumigationPersonPopup = false;
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
      getUnitsCode() {
        unitsCode()
          .then((ret) => {
            if (ret.code == 200) {
              this.unitsCodeList = ret.data.dataList;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      getStackingMethod() {
        stackingMethod()
          .then((ret) => {
            if (ret.code == 200) {
              this.stackingMethodList = ret.data.dataList;
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
      getFumigationType() {
        fumigationType()
          .then((ret) => {
            if (ret.code == 200) {
              this.fumigationTypeList = ret.data.dataList;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      getMedicineDetail(id) {
        fetchMedicineDetail({id})
          .then(ret => {
            if (ret.code == 200) {
              this.detail.medicineName = ret.data.storgeDetail.medicineName;
              this.detail.medicineDosageForm = ret.data.storgeDetail.medicineDosageForm;
              this.detail.medicineDosageFormName = ret.data.storgeDetail.medicineDosageFormName;
              this.detail.meterUnit = ret.data.storgeDetail.meterUnit;
              this.detail.meterUnitName = ret.data.storgeDetail.meterUnitName;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      showAddFumigationPersonPopup() {
        this.isShowFumigationPersonPopup = false;
        this.isShowAddFumigationPersonPopup = true;
      },
      hideAddFumigationPersonPopup() {
        this.isShowFumigationPersonPopup = true;
        this.isShowAddFumigationPersonPopup = false;
      },
      initUpload() {
        uploadPic("uploadPic", (ret) => {
          if (ret.code == 200) {
            this.detail.attachments = ret.data.fileName;
            this.fileUrl = ret.data.fileUrl;
          } else {
            layer.alert("上传文件出错", {closeBtn: 0});
          }
        });
      },
      detailBack () {
        var vm = this;
        vm.$router.push({
          name: "fumigationOperation",
          query: {
            storehouseGbCode:this.$route.query.storehouseGbCode,
            warehouseGbCode:this.$route.query.warehouseGbCode,
            pageNo:this.$route.query.pageNo
          }
        });
      },
    },
    mounted() {
      this.getStaff();
      this.getUnitsCode();
      this.getStackingMethod();
      this.getInsectKindDict();
      this.getFumigationType();
      this.initUpload();
      if (this.$route.query.id) {
        this.getDetail(this.$route.query.id);
      }
    }
  }
</script>
