<template>
  <div class="content">
    <div class="menuManage roleManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">设备编辑</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div>
              <!--<span v-if="postData.equipmentCode">-->
              <!--文件编号：-->
              <!--<input type="text" class="input-text" readonly="readonly" v-model="submitData.fileId" >-->
              <!--</span>-->
              <span>
                                设备名称：
                                <input type="text" class="input-text" readonly="readonly" v-model="submitData.equipmentName">
                            </span>
              <!--<span>-->
              <!--发文日期：-->
              <!--<input type="text" class="input-text Wdate" onclick="WdatePicker({maxDate:'%y-%M-%d'})"  id="releaseDate" >-->
              <!--</span>-->
              <span>
                                设备类型：
                                <input type="text" class="input-text" readonly="readonly" v-model="submitData.equipmentType=='0'?'计量（检验）设备':'仓储设备'">
                            </span>
              <span>
                                设备条码:
                                <input type="text" class="input-text" readonly="readonly" v-model="submitData.equipmentCode">
                            </span>
              <span>
                                设备编号：
                                <input type="text" class="input-text" readonly="readonly" v-model="submitData.equipmentId">
                            </span>
              <span>
                                负责人：
                                <select name="" class="select-style"  disabled="disabled" style="background: #F4F4F4;" v-model="equipmentAdmin">
                                    <option v-for="item in staffListData" :value="item" v-text="item.staff_name">
                                    </option>
                                </select>
                            </span>
              <span>
                                单价：
                                <input type="number" class="input-text" v-model="submitData.procurementPrice">
                            </span>
              <span>
                                设备规格型号：
                                <input type="text" class="input-text" v-model="submitData.equipmentSpecifications">
                            </span>
              <span>
                                初始化负责人：
                                <select name="" class="select-style" v-model="initialAdmin">
                                    <option v-for="item in staffListData" :value="item" v-text="item.staff_name">
                                    </option>
                                </select>
                            </span>
              <span>
                                维修电话：
                                <input type="text" class="input-text" v-model="submitData.repairTelephone">
                            </span>
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
  import{addDeviceInit , getDeviceInit , editDeviceInit} from "../../../api/devicesManage/deviceManage";
  import { staffList} from "@/api/systemManage/staff";
  import {
    grainVariety,grainOilLevel
  } from "@/api/systemManage/dropDown";
  import { checkPhone, uploadPic } from "@/utils/public";
    export default {
        name: "initializeEdit",
      data() {
        return {
          sortOrder: "0", //0 顺序，1 倒序
          postData: {
            equipmentInitialId: ''
          },
          equipmentAdmin:'',
          initialAdmin:'',
          grainVarietyList:[],
          grainOilLevelList:[],
          staffListData:[],
          submitData: {
            equipmentId:'',
            equipmentCode:'',
            equipmentName: "",
            equipmentType: "",
            equipmentAdmin: "",
            equipmentAdminName:'',
            procurementPrice: "",
            equipmentSpecifications: "",
            repairTelephone:'',
            equipmentEntryRecordId:'',
            initialAdmin: "",
            initialAdminName:'',
            equipmentInitialId:''
          },
          editPopup: 0, // 控制菜单编辑弹出层的显影，1为显示
        };
      },
      methods: {
        getDetail: function() {
          var vm = this;
          layer.load(2);
          getDeviceInit(vm.postData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                // console.log(JSON.stringify(ret.data.equipmentInitialDetail))
                vm.submitData.equipmentId = ret.data.equipmentInitialDetail.equipmentId;
                vm.submitData.equipmentName = ret.data.equipmentInitialDetail.equipmentName;
                vm.submitData.equipmentCode = ret.data.equipmentInitialDetail.equipmentCode;
                vm.submitData.equipmentType = ret.data.equipmentInitialDetail.equipmentType;
                vm.submitData.equipmentAdmin = ret.data.equipmentInitialDetail.equipmentAdmin;
                vm.submitData.equipmentAdminName = ret.data.equipmentInitialDetail.equipmentAdminName;
                vm.submitData.procurementPrice = ret.data.equipmentInitialDetail.procurementPrice;
                vm.submitData.equipmentSpecifications = ret.data.equipmentInitialDetail.equipmentSpecifications;
                vm.submitData.repairTelephone = ret.data.equipmentInitialDetail.repairTelephone;
                vm.submitData.equipmentEntryRecordId = ret.data.equipmentInitialDetail.equipmentEntryRecordId;
                vm.submitData.initialAdmin = ret.data.equipmentInitialDetail.initialAdmin;
                vm.submitData.initialAdminName = ret.data.equipmentInitialDetail.initialAdminName;
                vm.submitData.equipmentInitialId = ret.data.equipmentInitialDetail.equipmentInitialId;

                vm.$nextTick(function() {

                  vm.equipmentAdmin={
                    staff_id:ret.data.equipmentInitialDetail.equipmentAdmin,
                    staff_name:ret.data.equipmentInitialDetail.equipmentAdminName
                  };
                  vm.initialAdmin={
                    staff_id:ret.data.equipmentInitialDetail.initialAdmin,
                    staff_name:ret.data.equipmentInitialDetail.initialAdminName
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
        submitEvent: function() {
          var vm = this;
          vm.submitData.releaseDate=$('#releaseDate').val();
          if (vm.equipmentAdmin!='') {
            vm.submitData.equipmentAdmin=vm.equipmentAdmin.staff_id;
            vm.submitData.equipmentAdminName=vm.equipmentAdmin.staff_name;
          }else{
            vm.submitData.equipmentAdmin='';
            vm.submitData.equipmentAdminName='';
          }
          if (vm.initialAdmin!='') {
            vm.submitData.initialAdmin=vm.initialAdmin.staff_id;
            vm.submitData.initialAdminName=vm.initialAdmin.staff_name;            
          }else{
            vm.submitData.initialAdmin='';
            vm.submitData.initialAdminName='';   
          }
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
          if (vm.submitData.equipmentAdmin == "") {
            layer.msg("请填写负责人");
            return;
          }
          if (vm.submitData.procurementPrice == "") {
            layer.msg("请填写单价");
            return;
          }
          if (vm.submitData.equipmentSpecifications == "") {
            layer.msg("请填写设备规格");
            return;
          }
          if (vm.submitData.initialAdmin == "") {
            layer.msg("请填写初始化负责人");
            return;
          }
          if (vm.submitData.repairTelephone == "") {
            layer.msg("请填写维修电话");
            return;
          }

                console.log(JSON.stringify(vm.submitData))
          if (this.$route.query.type=='edit') {
            layer.load(2);
            editDeviceInit(vm.submitData)
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  layer.msg("初始化成功！");
                  this.$router.push({
                    name: "initialize",
                    query: {
                      equipmentName:this.$route.query.equipmentName,
                      equipmentCode:this.$route.query.equipmentCode,
                      equipmentType:this.$route.query.equipmentType,
                      pageNo:this.$route.query.pageNo

                    }
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
            addDeviceInit(vm.submitData)
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  layer.msg("初始化成功！");
                  this.$router.push({
                    name: "initialize",
                    query: {
                      equipmentName:this.$route.query.equipmentName,
                      equipmentCode:this.$route.query.equipmentCode,
                      equipmentType:this.$route.query.equipmentType,
                      pageNo:this.$route.query.pageNo

                    }
                  });
                } else {
                  layer.alert(ret.data, { closeBtn: 0 });
                }
              })
              .catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
              });
          }
/*          this.$router.push({//提交后筛选条件带回
            name:this.$route.query.name,
            query: {
              equipmentName:this.$route.query.equipmentName,
              equipmentCode:this.$route.query.equipmentCode,
              equipmentType:this.$route.query.equipmentType,
              pageNo:this.$route.query.pageNo

            }
          });*/
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
        if (this.$route.query.type=='edit') {
          vm.postData.equipmentInitialId=this.$route.query.data.equipmentInitialId;
          // vm.submitData.equipmentName=this.$route.query.data.equipmentName;
          // vm.submitData.equipmentId=this.$route.query.data.equipmentId;
          // vm.submitData.equipmentCode=this.$route.query.data.equipmentCode;

          vm.getDetail();
        }else{
          console.log(JSON.stringify(this.$route.query.data))
          vm.submitData.equipmentName=this.$route.query.data.equipmentName;
          vm.submitData.equipmentId=this.$route.query.data.equipmentId;
          vm.submitData.equipmentCode=this.$route.query.data.equipmentCode;
          vm.submitData.equipmentType=this.$route.query.data.equipmentType;
          vm.submitData.equipmentAdmin=this.$route.query.data.equipmentAdmin;
          vm.submitData.equipmentAdminName=this.$route.query.data.equipmentAdminName;
          vm.submitData.equipmentEntryRecordId=this.$route.query.data.equipmentEntryRecordId;
          vm.submitData.equipmentSpecifications=this.$route.query.data.equipmentModel;
          vm.equipmentAdmin={
            staff_id:this.$route.query.data.equipmentAdmin,
            staff_name:this.$route.query.data.equipmentAdminName
          };

          vm.getDropDown();

        }
      }
    };
</script>

<style scoped>

</style>
