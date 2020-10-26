<template>
  <div class="content">
    <div class="menuManage roleManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">基本信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div>
              <span>
                                设备编号：
                                <input type="text" class="input-text"  readonly="readonly" v-model="submitData.equipmentId">
                            </span>
              <span>
                                设备条码：
                                <input type="text" class="input-text" readonly="readonly" v-model="submitData.equipmentCode">
                            </span>
              <span>
                                设备状态：
                                <select name="" class="select-style" disabled="disabled" v-model="submitData.status">
                                  <option :value="item.dicInfoCode" v-for="item in deviceStatusList">{{item.dicInfoValue}}</option>
                                </select>
                            </span>
              <span>
                                设备入库记录编号：
                                <input type="text" class="input-text" readonly="readonly" v-model="submitData.equipmentEntryRecordId">
                            </span>
              <span>
                                当前周期工作时间：
                                <input type="text" class="input-text"  v-model="submitData.currentPeriodWorkHour">
                            </span>
             <!--  <span>
                                使用寿命：
                                <input type="text" class="input-text" v-model="submitData.lifeLengthHour">
                            </span> -->
              <!-- <span style="width: 100%">
                                备注：
                                <textarea class="edit-textarea" v-model="submitData.memo"></textarea>
                            </span> -->
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


<script>
import { getEquipmentEntryRecord ,standingEdit} from "../../../api/devicesManage/equipmentEntryRecord";
  import { staffList} from "@/api/systemManage/staff";
  import {deviceStatus  } from "@/api/systemManage/dropDown";

  export default {
        name: "checkEdit",
      data() {
        return {
          sortOrder: "0", //0 顺序，1 倒序
          postData: {
            equipmentEntryRecordId: this.$route.query.id
          },
          equipmentAdmin:'',
          initialAdmin:'',
          staffListData:[],
          submitData: {
            equipmentCode: "",
            equipmentId:'',
            status: "",
            createTime: "",
            // lifeLengthHour: "",
            currentPeriodWorkHour: "",
            equipmentEntryRecordId: "",
            // memo: ""
          },
          equipmentName:'',
          equipmentType:'',
          editPopup: 0, // 控制菜单编辑弹出层的显影，1为显示
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
                console.log(JSON.stringify(ret))
                vm.submitData.equipmentCode = ret.data.entryRecord.equipmentCode;
                vm.submitData.equipmentId = ret.data.entryRecord.equipmentId;
                vm.submitData.status = ret.data.entryRecord.status;
                vm.submitData.createTime = ret.data.entryRecord.createTime;
                // vm.submitData.lifeLengthHour = ret.data.entryRecord.lifeLengthHour;
                vm.submitData.currentPeriodWorkHour = ret.data.entryRecord.currentPeriodWorkHour;
                vm.submitData.equipmentEntryRecordId = ret.data.entryRecord.equipmentEntryRecordId;
                // vm.submitData.memo = ret.data.entryRecord.remarks;

              } else {
                layer.alert(ret.data, { closeBtn: 0 });
              }
            })
            .catch(err => {
              layer.alert(err.message, { closeBtn: 0 });
            });
        },
        submitEvent: function() {
          var vm = this;
        
          if (vm.submitData.currentPeriodWorkHour == "") {
            layer.msg("请填写当前周期工作时间");
            return;
          }
            layer.load(2);
            standingEdit(vm.submitData)
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  layer.msg("编辑成功！");
                  this.$router.push({
                    name: "standing"
                  });
                } else {
                  layer.alert(ret.data, { closeBtn: 0 });
                }
              })
              .catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
              });
          this.$router.push({//提交后筛选条件带回
            name:this.$route.query.name,
            query: {
              equipmentName:this.$route.query.equipmentName,
              equipmentCode:this.$route.query.equipmentCode,
              equipmentType:this.$route.query.equipmentType,
              pageNo:this.$route.query.pageNo

            }
          });
        },
        getDropDown: function() {//获取下拉项
          var vm = this;
          staffList({
              pageSize: 1000,
              pageNo: 0
            }).then(ret => {//职工列表
                if (ret.code == 200) {
                  // console.log(JSON.stringify(ret))
                  for (var i = 0; i < ret.data.staffList.length; i++) {
                    vm.staffListData.push({
                      staff_id:ret.data.staffList[i].staff_id,
                      staff_name:ret.data.staffList[i].staff_name
                    });
                  }
                  // vm.staffListData = ret.data.staffList;
                } else {
                  layer.alert(ret.data, { closeBtn: 0 });
                }
            }).catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
            });
            deviceStatus({}).then(ret => {//设备状态
                if (ret.code == 200) {
                  // console.log(JSON.stringify(ret))
                  vm.deviceStatusList = ret.data.dataList;
                } else {
                  layer.alert(ret.data, { closeBtn: 0 });
                }
            }).catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
            });
        },
        detailBack:function () {//返回
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
        vm.getDropDown();
        vm.getDetail();
      }
    };
</script>
