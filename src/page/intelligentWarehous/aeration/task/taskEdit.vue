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
                       v-model="detail.grainCheckRecordId" @click="isShowGrainInspectionPopup=true">
              </span>
              <span>
                仓房：
                <input type="text" class="input-text" readonly v-model="detail.storehouseName">
              </span>
              <span>
                廒间：
                <input type="text" class="input-text" readonly v-model="detail.warehouseName">
              </span>
              <span>
               货位：
                <select class="select-style excision" v-model="detail.cargoCode">
                  <option
                    v-for="item in cargoList"
                    :key="item.cargoPosition"
                    :value="item.cargoPosition"
                    v-text="item.cargoName"/>
                </select>
              </span>
              <span>
                通风类型：
                <select class="select-style excision" v-model="detail.aerationType">
                  <option :value="item.dicInfoCode" v-for="item in ventilationMethodList" v-text="item.dicInfoValue"/>
                </select>
              </span>
              <span>
                通风方式（*）：
                <select class="select-style excision" v-model="detail.aerationMode">
                  <option :value="item.dicInfoCode" v-for="item in ventilationModeList" v-text="item.dicInfoValue"/>
                </select>
              </span>
              <span>
                通风目的：
                <select class="select-style excision" v-model="detail.aerationPurpose">
                  <option :value="item.dicInfoCode" v-for="item in ventilationPurposeList" v-text="item.dicInfoValue"/>
                </select>
              </span>
              <span>
                粮食品种：
                <treeselect v-model="detail.grainVariety" :multiple="false" :options="grainVarietyList" placeholder="请选择粮食品种"/>
              </span>
              <span>
                粮层厚度：
                <input type="number" class="input-text" v-model="detail.grainLayerThickness">
              </span>
              <span>
                送风方式位：
                <input type="number" class="input-text" v-model="detail.sendWindTypeBit">
              </span>
              <span>
                通风开始时间：
                <input type="text" class="input-text Wdate"
                       onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" id="aerationStartDatetime">
              </span>
              <span>
                预计通风时长：
                <input type="number" class="input-text" v-model="detail.estimateAerationDuration">
              </span>
              <span>
                总耗电：
                <input type="number" class="input-text" v-model="detail.totalConsumePower">
              </span>
              <span>
                累计总风量：
                <input type="number" class="input-text" v-model="detail.totalWindPower">
              </span>
              <span>
                风网总阻力：
                <input type="number" class="input-text" v-model="detail.windNetTotalResistance">
              </span>
              <span>
                单位通风量：
                <input type="number" class="input-text" v-model="detail.unitAerationNum">
              </span>
              <span>
                最大梯度值开始前温度℃：
                <input type="number" class="input-text" v-model="detail.maxGvBsTemp">
              </span>
              <span>
                最大梯度值开始后温度℃：
                <input type="number" class="input-text" v-model="detail.maxGvAsTemp">
              </span>
              <span>
                最大梯度值开始前水分/RH：
                <input type="number" class="input-text" v-model="detail.maxGvBsWater">
              </span>
              <span>
                最大梯度值开始后水分/RH：
                <input type="number" class="input-text" v-model="detail.maxGvAsWater">
              </span>
              <span>
                大气温度 C：
                <input type="number" class="input-text" v-model="detail.airTemp">
              </span>
              <span>
                大气湿度/RH：
                <input type="number" class="input-text" v-model="detail.airHumidity">
              </span>
              <span>
                通风执行日期：
                <input type="text" class="input-text Wdate"
                       onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"
                       id="aerationExeDate">
              </span>
              <span>
                登记日期：
                <input type="text" class="input-text Wdate"
                       onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"
                       id="registorDate">
              </span>
              <span>
                原始记录ID：
                <input type="number" class="input-text" v-model="detail.originalRecordId">
              </span>
              <span>
                负责人：
                <select class="select-style" v-model="detail.responsiblePersonId">
                  <option v-for="item in staffList" :value="item.staff_id" v-text="item.staff_name"/>
                </select>
              </span>
              <span>
                通风前粮食温度℃：
                <input type="number" class="input-text" v-model="detail.beforeAerationGrainTemp">
              </span>
              <span>
                通风后粮食温度℃：
                <input type="number" class="input-text" v-model="detail.afterAerationGrainTemp">
              </span>
              <span>
                通风前粮食水分/RH：
                <input type="number" class="input-text" v-model="detail.beforeAerationGrainWater">
              </span>
              <span>
                通风后粮食水分/RH：
                <input type="number" class="input-text" v-model="detail.afterAerationGrainWater">
              </span>
              <span style="width: 100%;">
                备注：
                <textarea class="edit-textarea" v-model="detail.memo"></textarea>
              </span>
            </div>
          </div>
        </div>

        <table class="customTable">
          <thead>
          <tr>
            <th>序号</th>
            <th>机械种类</th>
            <th>机械名称</th>
            <th>通风总耗能（瓦特）</th>
            <th>累计总风量</th>
            <th>送风方式位</th>
            <th>风网阻力（/N）</th>
            <th>开启时间</th>
            <th>结束时间</th>
            <th>合计时间（小时）</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,i) in deviceTypeList">
            <td v-text="i+1"></td>
            <td v-text="item.machineType"></td>
            <td v-text="item.machineName"></td>
            <td>
              <input class="input-text" type="text" style="width: 60px" v-model="item.aerationTotalEnergyConsumption"/>
            </td>
            <td>
              <input class="input-text" type="text" style="width: 60px" v-model="item.cumulativeTotalWindNum"/>
            </td>
            <td>
              <input class="input-text" type="text" style="width: 60px" v-model="item.sendWindTypeBit"/>
            </td>
            <td>
              <input class="input-text" type="text" style="width: 60px" v-model="item.windNetTotalResistance"/>
            </td>
            <td>
              <input type="text" class="input-text Wdate"
                     onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"
                     :id="`startDatetime-${i}`">
            </td>
            <td>
              <input type="text" class="input-text Wdate"
                     onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"
                     :id="`endDatetime-${i}`">
            </td>
            <td>
              <input type="text" class="input-text Wdate"
                     onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"
                     :id="`totalTime-${i}`">
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="edit-btn">
        <button class="edit-submit" @click="submitEvent">提交</button>
        <button class="edit-back" @click="editBack">返回</button>
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
  </div>
</template>

<style type="text/css" scoped>
</style>

<script>
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import SelectTablePopup from '@/components/SelectTablePopup';
  import {fetchGrainInspectionList} from "@/api/intelligentWarehous/grainInspection";
  import dictListMixin from '@/mixin/dictList';
  import {fetchEquipmentListByWarehouse} from "@/api/IOT/iot";
  import {addAerationWork, editAerationWork, fetchAerationWork} from "@/api/intelligentWarehous/aeration";

  export default {
    name: "taskEdit",
    components: {
      Treeselect,
      SelectTablePopup,
    },
    mixins: [dictListMixin],
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
        postData:{
          storehouseGbCode: this.$route.query.storehouseGbCode,
          warehouseGbCode: this.$route.query.warehouseGbCode,
          aerationType:this.$route.query.aerationType,
          leaveStartDate:this.$route.query.leaveStartDate,
          leaveEndDate:this.$route.query.leaveEndDate,
          pageNo: this.$route.query.pageNo,
        },
        detail: {
          grainCheckRecordId: '',
          storehouseGbCode: '',
          storehouseName: '',
          warehouseGbCode: '',
          warehouseName: '',
          cargoCode: '',
          aerationMode: '',
          aerationType: '',
          aerationPurpose: '',
          grainVariety: null,
          grainLayerThickness: '',
          sendWindTypeBit: '',
          estimateAerationDuration: '',
          totalConsumePower: '',
          totalWindPower: '',
          windNetTotalResistance: '',
          unitAerationNum: '',
          maxGvBsTemp: '',
          maxGvAsTemp: '',
          maxGvBsWater: '',
          maxGvAsWater: '',
          airTemp: '',
          airHumidity: '',
          aerationExeDate: '',
          registorDate: '',
          originalRecordId: '',
          responsiblePersonId: '',
          beforeAerationGrainTemp: '',
          afterAerationGrainTemp: '',
          beforeAerationGrainWater: '',
          afterAerationGrainWater: '',
          memo: '',
        },
        deviceTypeList: [],
        isShowGrainInspectionPopup: false,
      }
    },
    methods: {
      fetchGrainInspectionList,
      getDetail (aerationJobRecordId) {
        layer.load(2);
        fetchAerationWork({aerationJobRecordId})
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              const {aerationJobRecord} = ret.data;
              this.detail = aerationJobRecord;
              document.getElementById('aerationStartDatetime').value = aerationJobRecord.aerationStartDatetime;
              this.getCargo(aerationJobRecord.warehouseGbCode);
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
        this.detail.grainCheckRecordId = item.grainCheckRecordId;
        this.detail.storehouseGbCode = item.storehouseGbCode;
        this.detail.storehouseName = item.storehouseName;
        this.detail.warehouseGbCode = item.warehouseGbCode;
        this.detail.warehouseName = item.warehouseName;
        this.isShowGrainInspectionPopup = false;
        this.getCargo(item.warehouseGbCode);
        this.getEquipmentList(item.warehouseGbCode);
      },
      submitEvent() {
        this.detail.aerationExeDate = document.getElementById('aerationExeDate').value;
        this.detail.registorDate = document.getElementById('registorDate').value;
        if (!this.detail.grainCheckRecordId) return layer.msg("请选择粮情检查记录");
        if (!this.detail.cargoCode) return layer.msg("请选择货位");
        if (!this.detail.aerationType) return layer.msg("请选择通风类型");
        if (!this.detail.aerationMode) return layer.msg("请选择通风方式");
        if (!this.detail.aerationPurpose) return layer.msg("请选择通风目的");
        if (!this.detail.grainVariety) return layer.msg("请选择粮食品种");
        if (!this.detail.grainLayerThickness) return layer.msg("请填写粮层厚度");
        if (!this.detail.sendWindTypeBit) return layer.msg("请填写送风方式位");
        if (!this.detail.estimateAerationDuration) return layer.msg("请填写预计通风时长");
        if (!this.detail.totalConsumePower) return layer.msg("请填写总耗电");
        if (!this.detail.totalWindPower) return layer.msg("请填写累计总风量");
        if (!this.detail.windNetTotalResistance) return layer.msg("请填写风网总阻力");
        if (!this.detail.unitAerationNum) return layer.msg("请填写单位通风量");
        if (!this.detail.maxGvBsTemp) return layer.msg("请填写最大梯度值开始前温度");
        if (!this.detail.maxGvAsTemp) return layer.msg("请填写最大梯度值开始后温度");
        if (!this.detail.maxGvBsWater) return layer.msg("请填写最大梯度值开始前水分");
        if (!this.detail.maxGvAsWater) return layer.msg("请填写最大梯度值开始后水分");
        if (!this.detail.airTemp) return layer.msg("请填写大气温度");
        if (!this.detail.airHumidity) return layer.msg("请填写大气湿度");
        if (!this.detail.aerationExeDate) return layer.msg("请选择通风执行日期");
        if (!this.detail.registorDate) return layer.msg("请选择登记日期");
        if (!this.detail.originalRecordId) return layer.msg("请填写原始记录ID");
        if (!this.detail.responsiblePersonId) return layer.msg("请选择负责人");
        if (!this.detail.beforeAerationGrainTemp) return layer.msg("请填写通风前粮食温度");
        if (!this.detail.afterAerationGrainTemp) return layer.msg("请填写通风后粮食温度");
        if (!this.detail.beforeAerationGrainWater) return layer.msg("请填写通风前粮食水分");
        if (!this.detail.afterAerationGrainWater) return layer.msg("请填写通风后粮食水分");
        for(let i = 0; i < this.deviceTypeList.length; i++) {
          const device = this.deviceTypeList[i];
          if (!device.aerationTotalEnergyConsumption) return layer.msg(`请填写设备${device.machineName}的通风总耗能`);
          if (!device.cumulativeTotalWindNum) return layer.msg(`请填写设备${device.machineName}的累计总风量`);
          if (!device.sendWindTypeBit) return layer.msg(`请填写设备${device.machineName}的送风方式位`);
          if (!device.windNetTotalResistance) return layer.msg(`请填写设备${device.machineName}的风网阻力`);
        }
        const api = this.detail.aerationJobRecordId ? editAerationWork : addAerationWork;
        console.log(JSON.stringify(this.deviceTypeList))
        layer.load(2);
        api({...this.detail, detailList: JSON.stringify(this.deviceTypeList)})
          .then((ret) => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("保存成功！");
              this.editBack();
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      editBack(){
        this.$router.push({
          name: "aerationTask",
          query: {
            storehouseGbCode: this.postData.storehouseGbCode,
            warehouseGbCode: this.postData.warehouseGbCode,
            aerationType:this.postData.aerationType,
            leaveStartDate:this.postData.leaveStartDate,
            leaveEndDate:this.postData.leaveEndDate,
            pageNo:this.postData.pageNo,
          }
        })
      },
      getEquipmentList(warehouseGbCode) {
        layer.load(2);
        fetchEquipmentListByWarehouse({warehouseGbCode, funcPositionName: '通风'})
          .then((ret) => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              this.deviceTypeList = (ret.data.dataList || []).map((device) => ({
                machineType: device.deviceName,
                machineName: device.deviceName,
                aerationTotalEnergyConsumption: '',
                cumulativeTotalWindNum: '',
                sendWindTypeBit: '',
                windNetTotalResistance: '',
              }));
            } else {
              this.deviceTypeList = [];
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
    },
    mounted() {
      this.getGrainVariety();
      this.getVentilationMethodList();
      this.getVentilationModeList();
      this.getVentilationPurposeList();
      this.getStaff();
      if (this.$route.query.id) {
        this.getDetail(this.$route.query.id);
      }
    }
  }
</script>
