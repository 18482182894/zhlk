<template>
  <div class="content">
    <div class="menuManage roleManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">入库信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div>
              <span>
                                设备名称：
                                <input type="text" class="input-text" v-model="submitData.equipmentName" readonly="readonly" placeholder="选择设备" @click="showPopup();">
                            </span>
              <span>
                                设备编号：
                                <input type="text" class="input-text" v-model="submitData.equipmentId" readonly="readonly" >
                            </span>
              <span>
                                计量单位编码：
                                <select name="" class="select-style" disabled="disabled" v-model="submitData.measuringUnitCode">
                                  <option :value="item.dicInfoCode" v-for="item in unitsCodeList">{{item.dicInfoValue}}</option>
                                </select>
                            </span>
              <span>
                                设备类型：
                                <!-- <input type="text" class="input-text" v-model="submitData.equipmentType?'计量设备':'仓储设备'"> -->
                                <select name="" class="select-style"  disabled="disabled"  v-model="submitData.equipmentType">
                                  <option :value="item.dicInfoCode" v-for="item in unitTypeList">{{item.dicInfoValue}}</option>
                                </select>
                            </span>
              <span>
                                设备型号：
                                <input type="text" class="input-text" v-model="submitData.equipmentModel">
                            </span>
              <span>
                                设备规格：
                                <input type="text" class="input-text" v-model="submitData.equipmentSpecifications">
                            </span>
              <span>
                                设备状态：
                                <!-- <input type="text" class="input-text" readonly="readonly" v-model="submitData.equipmentStatus"> -->
                                <select name="" class="select-style" v-if="postData.equipmentEntryRecordId"  v-model="submitData.equipmentStatus">
                                  <option :value="item.dicInfoCode" v-for="item in deviceStatusList">{{item.dicInfoValue}}</option>
                                </select>
                                <select name="" class="select-style" v-else disabled="disabled" v-model="submitData.equipmentStatus">
                                  <option :value="item.dicInfoCode" v-for="item in deviceStatusList">{{item.dicInfoValue}}</option>
                                </select>
                            </span>
              <span>
                                生产厂家：
                                <input type="text" class="input-text" v-model="submitData.manufacturer">
                            </span>
              <span>
                                采购价格：
                                <input type="text" class="input-text" v-model="submitData.procurementPrice">
                            </span>
              <span>
                                设备描述：
                                <input type="text" class="input-text" v-model="submitData.equipmentDes">
                            </span>
              <span>
                                设备管理者：
                                <!-- <input type="text" class="input-text" v-model="submitData.equipmentAdmin"> -->
                                <select name="" class="select-style" v-model="equipmentAdmin">
                                    <option v-for="item in staffListData" :value="item" v-text="item.staff_name">
                                    </option>
                                </select>
                            </span>
              <span>
                                额定工作时间：
                                <input type="text" class="input-text" v-model="submitData.workTimeRated">
                            </span>
              <span>
                                单次工作时间：
                                <input type="number" class="input-text" v-model="submitData.workTimeSingle">
                            </span>
              <span>
                                采购时间：
                                <input type="text"  class="input-text Wdate" onclick="WdatePicker({})"  id="purchaseTime" >
                            </span>
              <span>
                                检定周期（日）：
                                <input type="text" class="input-text" v-model="submitData.maintenancePeriodDay">
                            </span>
              <!-- <span>
                                当前周期工作时间（时）：
                                <input type="text" class="input-text" v-model="submitData.currentPeriodWorkHour">
                            </span> -->
              <span>
                                预定检测日期：
                                <input type="text"  class="input-text Wdate" onclick="WdatePicker({})"  id="nextMaintenanceDate" >
                            </span>
              <span>
                                检查提醒日期：
                                <input type="text"  class="input-text Wdate" onclick="WdatePicker({})"  id="maintenanceAlarmDate" >
                            </span>
              <span>
                                原始记录ID：
                                <input type="text" class="input-text" v-model="submitData.originalId">
                            </span>
              <span>
                                数量：
                                <input type="text" class="input-text" v-model="submitData.number">
                            </span>
              <span>
                                预定报废日期：
                                <input type="text"  class="input-text Wdate" onclick="WdatePicker({})"  id="scheduleAbandonDate" >
                            </span>
              <span>
                                报废周期（时）：
                                <input type="number" class="input-text" v-model="submitData.abandonPeriodUseHour">
                            </span>
              <span>
                                报废预警日：
                                <input type="text"  class="input-text Wdate" onclick="WdatePicker({})"  id="preMaintenanceAlarmDate" >
                            </span>
              <span>
                                入库时间：
                                <input type="text"  class="input-text Wdate" onclick="WdatePicker({})"  id="entryDatetime" >
                            </span>
              <span>
                                登记人：
                                <!-- <input type="text" class="input-text" v-model="submitData.registrant"> -->
                                <select name="" class="select-style" v-model="registrant">
                                    <option v-for="item in staffListData" :value="item" v-text="item.staff_name">
                                    </option>
                                </select>
                            </span>

              <span style="width: 100%;">
                                备注：
                                <textarea name="" class="edit-textarea"  v-model="submitData.remarks"></textarea>
                            </span>
            </div>
          </div>
        </div>
      </div>
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">图片</div>
        </div>
        <div class="tag-box-content">
          <div class="upload-pic">
          <div id="uploadPic"></div>
          <img :src="submitData.imageFile?submitData.imageFile:'../../../../static/images/upload-pic.png'" alt="">
          <!-- <label class="fc-red">只支持.jpg格式</label> -->
        </div>
        </div>
      </div>
      <div class="edit-btn">
        <button class="edit-submit" @click="submitEvent();">提交</button>
        <button class="edit-back" @click="detailBack();">返回</button>
      </div>


      <!-- 选择来文弹出层 -->
      <div class="popup" :style="editPopup==1?'display:block;':''">
        <div class="popup-main planPopup-edit-main operationLog">
          <div class="popup-title">
            <label>选择设备</label>
            <em class="popup-close" @click="closePopup('edit');">×</em>
          </div>
          <div class="popup-content">
              <div class="lookup">
                设备名称
                <input name="" class="select-style excision" v-model="postData.equipmentName">
                
                设备类型：
                <select name="" class="select-style excision" v-model="postData.equipmentType">
                  <option value="">设备类型</option>
                  <option value="0">计量设备</option>
                  <option value="1">仓储设备</option>
                </select>

                
                  <div class="btn btn-add"  @click="getList(0);">
                    <img src="../../../../static/images/search.png" alt="">
                    <label>查找</label>
                  </div>
              </div>
              <div>
                <div class="btn btn-add" @click="jumpEdit();">
                  <img src="../../../../static/images/add.png" alt="">
                  <label>新增</label>
                </div>
                <select name="" class="select-style" v-model="sortOrder" @change="changeSortOrder();">
                  <option value="">排序方式</option>
                  <option value="0">正序</option>
                  <option value="1">倒序</option>
                </select>
              </div>
              <table class="customTable">
                <thead>
                <tr>
                  <th style="width:5%;"><input type="checkbox" ></th>
                  <th style="width:5%;">序号</th>
                  <th style="width:10%;">设备名称</th>
                  <th style="width:10%;">设备类型</th>
                  <th style="width:20%;">设备规格描述</th>
                  <th style="width:10%;">计量单位</th>
                  <th style="width:30%;">操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,i) in listData">
                  <td><input type="checkbox"></td>
                  <td v-if="sortOrder=='0'" v-text="i+1"></td>
                  <td v-else v-text="listData.length-i"></td>
                  <td v-text="item.equipmentName"></td>
                  <td v-text="item.equipmentType" ></td>
                  <td v-text="item.equipmentSpecifications"></td>
                  <td v-text="item.measuringUnitCode"></td>
                  <td>
                      <div class="table-btn btn-yellow" @click="checkDocument(item);">选择</div>
                  </td>
                </tr>
                </tbody>
              </table>
              <!--&lt;!&ndash; 分页容器 &ndash;&gt;-->
              <div id="PageBar"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import{getEquipmentEntryRecord , addEquipmentEntryRecord , editEquipmentEntryRecord} from "../../../api/devicesManage/equipmentEntryRecord";
  import { staffList} from "@/api/systemManage/staff";
  import{ getDeviceList } from "../../../api/devicesManage/device";
  import {
    unitsCode,deviceStatus,unitType
  } from "@/api/systemManage/dropDown";
  import { checkPhone, uploadPic } from "@/utils/public";

  export default {
        name: "putinEdit",
    data() {
      return {
        sortOrder: "0", //0 顺序，1 倒序
        postData: {
          equipmentEntryRecordId: this.$route.query.id
        },
        listPostData: {
          equipmentName: "",
          equipmentType: "",
          // measuringUnitCode: "",
          pageSize: 6,
          pageNo:1
        },
        listData:'',
        unitsCodeList:[],
        staffListData:[],
        deviceStatusList:'',
        unitTypeList:'',//设备类型
        registrant:'',//登记人
        equipmentAdmin:'',//设备管理者
        submitData: {
          equipmentName: "",
          measuringUnitCode:'',
          equipmentId:'',
          equipmentModel: "",
          equipmentType: "",
          equipmentSpecifications: "",
          equipmentStatus: "0",
          manufacturer:'',
          procurementPrice:'',
          equipmentDes:'',
          equipmentAdmin:'',
          workTimeRated:'',
          workTimeSingle:'',

          purchaseTime:'',
          maintenancePeriodDay:'',
          currentPeriodWorkHour:'',
          nextMaintenanceDate:'',
          maintenanceAlarmDate:'',
          originalId:'',
          number:'',
          scheduleAbandonDate:'',
          abandonPeriodUseHour:'',
          preMaintenanceAlarmDate:'',
          remarks:'',
          registrant:'',
          imageFile:''

        },
      editPopup: 0 // 控制菜单编辑弹出层的显影，1为显示
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
              vm.submitData.equipmentEntryRecordId = ret.data.entryRecord.equipmentEntryRecordId;
              vm.submitData.equipmentName = ret.data.entryRecord.equipmentName;
              vm.submitData.measuringUnitCode = ret.data.entryRecord.measuringUnitCode;
              vm.submitData.equipmentId = ret.data.entryRecord.equipmentId;
              vm.submitData.equipmentType = ret.data.entryRecord.equipmentType;
              vm.submitData.equipmentModel = ret.data.entryRecord.equipmentModel;
              vm.submitData.equipmentSpecifications = ret.data.entryRecord.equipmentSpecifications;
              // vm.submitData.equipmentStatus = ret.data.entryRecord.equipmentStatus;
              vm.submitData.manufacturer = ret.data.entryRecord.manufacturer;
              vm.submitData.procurementPrice = ret.data.entryRecord.procurementPrice;
              vm.submitData.equipmentDes = ret.data.entryRecord.equipmentDes;
              vm.submitData.equipmentAdmin = ret.data.entryRecord.equipmentAdmin;
              vm.submitData.workTimeRated = ret.data.entryRecord.workTimeRated;
              vm.submitData.workTimeSingle = ret.data.entryRecord.workTimeSingle;
              if (ret.data.entryRecord.purchaseTime) {
                vm.submitData.purchaseTime = ret.data.entryRecord.purchaseTime.substr(0,10);
                $('#purchaseTime').val(ret.data.entryRecord.purchaseTime.substr(0,10))
              }
              vm.submitData.maintenancePeriodDay = ret.data.entryRecord.maintenancePeriodDay;
              if (ret.data.entryRecord.nextMaintenanceDate) {
                vm.submitData.nextMaintenanceDate = ret.data.entryRecord.nextMaintenanceDate.substr(0,10);
                $('#nextMaintenanceDate').val(ret.data.entryRecord.nextMaintenanceDate.substr(0,10))
              }
              if (ret.data.entryRecord.maintenanceAlarmDate) {
                vm.submitData.maintenanceAlarmDate = ret.data.entryRecord.maintenanceAlarmDate.substr(0,10);
                $('#maintenanceAlarmDate').val(ret.data.entryRecord.maintenanceAlarmDate.substr(0,10))
              }
              if (ret.data.entryRecord.scheduleAbandonDate) {
                vm.submitData.scheduleAbandonDate = ret.data.entryRecord.scheduleAbandonDate.substr(0,10);
                $('#scheduleAbandonDate').val(ret.data.entryRecord.scheduleAbandonDate.substr(0,10))
              }
              vm.submitData.abandonPeriodUseHour = ret.data.entryRecord.abandonPeriodUseHour;
              if (ret.data.entryRecord.preMaintenanceAlarmDate) {
                vm.submitData.preMaintenanceAlarmDate = ret.data.entryRecord.preMaintenanceAlarmDate.substr(0,10);
                $('#preMaintenanceAlarmDate').val(ret.data.entryRecord.preMaintenanceAlarmDate.substr(0,10))
              }
              vm.submitData.remarks = ret.data.entryRecord.remarks;
              vm.submitData.number = ret.data.entryRecord.number;

              vm.submitData.registrant = ret.data.entryRecord.registrant;
              vm.submitData.registrantName = ret.data.entryRecord.registrantName;

              vm.submitData.currentPeriodWorkHour = ret.data.entryRecord.currentPeriodWorkHour;
              vm.submitData.originalId = ret.data.entryRecord.originalId;
              if (ret.data.entryRecord.entryDatetime) {
                vm.submitData.entryDatetime = ret.data.entryRecord.entryDatetime.substr(0,10);
                $('#entryDatetime').val(ret.data.entryRecord.entryDatetime.substr(0,10))
              }
              vm.submitData.imageFile = ret.data.entryRecord.imageFile;



              vm.$nextTick(function() {
                vm.registrant={
                    staff_id:ret.data.entryRecord.registrant,
                    staff_name:ret.data.entryRecord.registrantName
                  };
                vm.equipmentAdmin={
                    staff_id:ret.data.entryRecord.equipmentAdmin,
                    staff_name:ret.data.entryRecord.equipmentAdminName
                  };
                vm.getDropDown();
              });
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          })
          .catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
          });
      },

      getList: function(pageNo) {//获取列表
        var vm = this;
        vm.listPostData.pageNo = pageNo;
        layer.load(2);
        getDeviceList(vm.listPostData)
          .then(ret => {
            layer.closeAll("loading");

            // console.log (JSON.stringify(ret));
            if (ret.code == 200) {
              vm.listData = ret.data.dataList;
              laypage({
                //分页
                cont: "PageBar", //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                pages: ret.page.totalPages, //通过后台拿到的总页数
                curr: pageNo,
                skin: "#95C93E", //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                jump: function(obj, first) {
                  //触发分页后的回调
                  if (!first) {
                    //一定要加此判断，否则初始时会无限刷新
                    vm.getList(obj.curr);
                  }
                }
              });
            } else {
              if (ret.code == "500" && ret.data == "查询错误，没有数据") {
                layer.msg("暂无数据");
                vm.listData = [];
              } else {
                layer.alert(ret.data, { closeBtn: 0 });
              }
            }
          })
          .catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
          });
      },
    showPopup: function() {
      // 展示弹出层
      var vm = this;
      vm.getList(1);
      vm.editPopup = 1;
    },
    closePopup: function() {
      // 隐藏弹出层
      var vm = this;
      vm.editPopup = 0;
    },
    checkDocument: function(data) {
      //选择设备
      var vm = this;
      console.log(JSON.stringify(data))
      vm.submitData.equipmentName = data.equipmentName;
      vm.submitData.equipmentId = data.equipmentId;
      vm.submitData.measuringUnitCode = data.measuringUnitCode;
      vm.submitData.equipmentType = data.equipmentType;
      vm.closePopup();
    },
      submitEvent: function() {
        var vm = this;
        vm.submitData.purchaseTime=$('#purchaseTime').val();
        vm.submitData.nextMaintenanceDate=$('#nextMaintenanceDate').val();
        vm.submitData.maintenanceAlarmDate=$('#maintenanceAlarmDate').val();
        vm.submitData.scheduleAbandonDate=$('#scheduleAbandonDate').val();
        vm.submitData.preMaintenanceAlarmDate=$('#preMaintenanceAlarmDate').val();


          vm.submitData.registrant=vm.registrant.staff_id;
          vm.submitData.registrantName=vm.registrant.staff_name;
          vm.submitData.equipmentAdmin=vm.equipmentAdmin.staff_id;
          vm.submitData.equipmentAdminName=vm.equipmentAdmin.staff_name;
        if (vm.submitData.equipmentName == "") {
          layer.msg("请填写项目名称");
          return;
        }
        if (vm.submitData.equipmentType == "") {
          layer.msg("请填写类型");
          return;
        }
        if (vm.submitData.equipmentId == "") {
          layer.msg("请填写设备编号");
          return;
        }
        if (vm.submitData.equipmentModel == "") {
          layer.msg("请填写设备型号");
          return;
        }
        if (vm.submitData.equipmentSpecifications == "") {
          layer.msg("请填写设备规格");
          return;
        }
        if (vm.submitData.equipmentStatus == "") {
          layer.msg("请填写设备状态");
          return;
        }
        if (vm.submitData.manufacturer == "") {
          layer.msg("请填写生产厂家");
          return;
        }
        if (vm.submitData.procurementPrice == "") {
          layer.msg("请填写采购价格");
          return;
        }
        if (vm.submitData.equipmentDes == "") {
          layer.msg("请填写设备描述");
          return;
        }
        if (vm.submitData.equipmentAdmin == "") {
          layer.msg("请填写设备管理者");
          return;
        }
        if (vm.submitData.workTimeRated == "") {
          layer.msg("请填写额定工作时间");
          return;
        }
        if (vm.submitData.workTimeSingle == "") {
          layer.msg("请填写单次工作时间");
          return;
        }
        if (vm.submitData.purchaseTime == "") {
          layer.msg("请填写采购时间");
          return;
        }
        if (vm.submitData.maintenancePeriodDay == "") {
          layer.msg("请填写检定周期");
          return;
        }
        // if (vm.submitData.currentPeriodWorkHour === "") {
        //   layer.msg("请填写当前周期工作时间");
        //   return;
        // }
        if (vm.submitData.nextMaintenanceDate == "") {
          layer.msg("请填写预定检测日期");
          return;
        }
        if (vm.submitData.maintenanceAlarmDate == "") {
          layer.msg("请填写检定提醒日期");
          return;
        }
        if (vm.submitData.originalId == "") {
          layer.msg("请填写原始记录ID");
          return;
        }
        if (vm.submitData.number == "") {
          layer.msg("请填写数量");
          return;
        }
        // console.log(JSON.stringify(vm.submitData))
        if (this.$route.query.id) {
          layer.load(2);
          editEquipmentEntryRecord(vm.submitData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                layer.msg("入库成功！");
                this.$router.push({
                  name: "putin"
                });
              } else {
                layer.alert(ret.data, { closeBtn: 0 });
              }
            })
            .catch(err => {
              layer.alert(err.message, { closeBtn: 0 });
            });
        } else {
          vm.submitData.planId='';
          layer.load(2);
          addEquipmentEntryRecord(vm.submitData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                layer.msg("入库成功！");
                this.$router.push({
                  name: "putin"
                });
              } else {
                layer.alert(ret.data, { closeBtn: 0 });
              }
            })
            .catch(err => {
              layer.alert(err.message, { closeBtn: 0 });
            });
        }
        this.$router.push({//提交后筛选条件带回
          name:this.$route.query.name,
          query: {
            equipmentType:this.$route.query.equipmentType,
            pageNo:this.$route.query.pageNo

          }
        });
      },
      getDropDown: function() {//获取下拉项
        var vm = this;
        unitsCode({}).then(ret => {//计量单位编码
          if (ret.code == 200) {
            vm.unitsCodeList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        }).catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
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
            unitType({}).then(ret => {//设备状态
                if (ret.code == 200) {
                  // console.log(JSON.stringify(ret))
                  vm.unitTypeList = ret.data.dataList;
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
      if (this.$route.query.id) {
        vm.getDetail();
      }else{
        vm.getDropDown();
      }
      uploadPic("uploadPic", function(ret) {
        if (ret.code == 200) {
          console.log(JSON.stringify(ret))
          vm.submitData.imageFile=ret.data.fileUrl;
        } else {
          layer.alert("上传文件出错", { closeBtn: 0 });
        }
      });
    }
  };
</script>

<style scoped>

</style>
