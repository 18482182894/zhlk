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
                设备名称：
                <label v-text="detailData.equipmentName"></label>
              </span>
              <span>
                计量单位编码：
                <label v-text="detailData.measuringUnitCode"></label>
              </span>
              <span>
                设备类型：
                <label v-text="detailData.equipmentType"></label>
              </span>
              <span>
                设备型号：
                <label v-text="detailData.equipmentModel"></label>
              </span>
              <span>
                设备规格：
                <label v-text="detailData.equipmentSpecifications"></label>
              </span>
              <span>
                设备状态：
                <label v-text="detailData.status"></label>
              </span>
              <span>
                生产厂家：
                <label v-text="detailData.manufacturer"></label>
              </span>
              <span>
                采购价格：
                <label v-text="detailData.procurementPrice"></label>
              </span>
              <span>
                设备描述：
                <label v-text="detailData.equipmentDes"></label>
              </span>
              <span>
                设备管理者：
                <label v-text="detailData.equipmentAdmin"></label>
              </span>
              <span>
                额定工作时间：
                <label v-text="detailData.workTimeRated"></label>
              </span>
              <span>
                单次工作时间：
                <label v-text="detailData.workTimeSingle"></label>
              </span>
              <span>
                采购价格：
                <label v-text="detailData.procurementPrice"></label>
              </span>
              <span>
                采购时间：
                <label v-text="detailData.purchaseTime"></label>
              </span>
              <span>
                检定周期（天）：
                <label v-text="detailData.maintenancePeriodDay"></label>
              </span>
              <!-- <span>
                当前周期工作时间(时)：
                <label v-text="detailData.currentPeriodWorkHour"></label>
              </span> -->
              <span>
                预定检测日期:
                <label v-text="detailData.nextMaintenanceDate"></label>
              </span>
              <span>
                检定提醒日期：
                <label v-text="detailData.maintenanceAlarmDate"></label>
              </span>
              <span>
                原始记录ID：
                <label v-text="detailData.originalId"></label>
              </span>
              <span>
                数量：
                <label v-text="detailData.number"></label>
              </span>
              <span>
                报废报警日：
                <label v-text="detailData.preMaintenanceAlarmDate"></label>
              </span>
              <span>
                预定报废日：
                <label v-text="detailData.scheduleAbandonDate"></label>
              </span>
              <span>
                报废周期（时）：
                <label v-text="detailData.abandonPeriodUseHour"></label>
              </span>
              <span>
                登记人：
                <label v-text="detailData.registrantName"></label>
              </span>
              <span style="width: 100%;">
                备注：
                <label v-text="detailData.remarks"></label>
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
            <img :src="detailData.imageFile" alt>
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
import { getEquipmentEntryRecord } from "../../../api/devicesManage/equipmentEntryRecord";
  import {
    unitType,unitsCode,deviceStatus
  } from "@/api/systemManage/dropDown";
  import { staffDetail} from "@/api/systemManage/staff";

export default {
  name: "goodsAllocationDetail",
  data() {
    return {
      postData: {
        equipmentEntryRecordId: this.$route.query.id
      },
      detailData: ""
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      getEquipmentEntryRecord(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret));
            vm.detailData = ret.data.entryRecord;
            const purchaseTime = vm.detailData.purchaseTime.slice(0,10)
            const nextMaintenanceDate = vm.detailData.nextMaintenanceDate.slice(0,10)
            const maintenanceAlarmDate = vm.detailData.maintenanceAlarmDate.slice(0,10)
            const preMaintenanceAlarmDate = vm.detailData.preMaintenanceAlarmDate.slice(0,10)
            const scheduleAbandonDate = vm.detailData.scheduleAbandonDate.slice(0,10)
            vm.detailData.purchaseTime = purchaseTime
            vm.detailData.nextMaintenanceDate = nextMaintenanceDate
            vm.detailData.maintenanceAlarmDate = maintenanceAlarmDate
            vm.detailData.preMaintenanceAlarmDate = preMaintenanceAlarmDate
            vm.detailData.scheduleAbandonDate = scheduleAbandonDate
            deviceStatus({}).then(ret => {//设备状态
                if (ret.code == 200) {
                  // console.log(JSON.stringify(ret))
                  // vm.deviceStatusList = ret.data.dataList;
                  for (var i = 0; i < ret.data.dataList.length; i++) {
                    if (ret.data.dataList[i].dicInfoCode==vm.detailData.status) {
                      vm.detailData.status=ret.data.dataList[i].dicInfoValue;
                    }
                    
                  }
                } else {
                  layer.alert(ret.data, { closeBtn: 0 });
                }
            }).catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
            });

            unitType({}).then(ret => {//设备类型：
                if (ret.code == 200) {
                  // console.log(JSON.stringify(ret))
                  // vm.unitTypeList = ret.data.dataList;
                  for (var i = 0; i < ret.data.dataList.length; i++) {
                    if (ret.data.dataList[i].dicInfoCode==vm.detailData.equipmentType) {
                      vm.detailData.equipmentType=ret.data.dataList[i].dicInfoValue;
                    }
                    
                  }
                } else {
                  layer.alert(ret.data, { closeBtn: 0 });
                }
            }).catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
            });
            staffDetail({staff_id: vm.detailData.equipmentAdmin}).then(ret => {
                if (ret.code == 200) {
                  vm.detailData.equipmentAdmin = ret.data.staffDetail.staff_name;
                  
                } else {
                  layer.alert(ret.data, { closeBtn: 0 });
                }
            }).catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
            });


            unitsCode({}).then(ret => {//计量单位编码
              if (ret.code == 200) {
                vm.unitsCodeList = ret.data.dataList;

                  for (var i = 0; i < ret.data.dataList.length; i++) {
                    if (ret.data.dataList[i].dicInfoCode==vm.detailData.measuringUnitCode) {
                      vm.detailData.measuringUnitCode=ret.data.dataList[i].dicInfoValue;
                    }
                    
                  }
              } else {
                layer.alert(ret.data, { closeBtn: 0 });
              }
            }).catch(err => {
              layer.alert(err.message, { closeBtn: 0 });
            });

          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    detailBack: function() {
      //this.$router.back(-1);
      this.$router.push({
        name:this.$route.query.name,
        query: {
          equipmentName:this.$route.query.equipmentName,
          equipmentCode:this.$route.query.equipmentCode,
          equipmentType:this.$route.query.equipmentType,
          pageNo:this.$route.query.pageNo

        }
      });
    }
  },
  mounted() {
    var vm = this;
    vm.getDetail();
  }
};
</script>
