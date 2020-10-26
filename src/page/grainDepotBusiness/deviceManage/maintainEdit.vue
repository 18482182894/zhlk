<template>
  <div class="content">
    <div class="menuManage roleManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">设备保养编辑</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div>
              <span>
                                设备名称：
                                <input type="text" class="input-text" readonly="readonly" v-model="submitData.equipmentName">
                            </span>
              <span>
                                设备类型：
                                <input type="text" class="input-text" readonly="readonly" v-model="submitData.equipmentType=='0'?'计量（检验）设备':'仓储设备'">
                            </span>
              <span>
                                设备编号：
                                <input type="text" class="input-text" readonly="readonly" v-model="submitData.equipmentId">
                            </span>
              <span>
                                负责人：
                                <select name="" class="select-style" disabled="disabled" style="background: #F4F4F4;" v-model="maintainAdmin">
                                    <option v-for="item in staffListData" :value="item" v-text="item.staff_name">
                                    </option>
                                </select>
                            </span>
              <span>
                                保养费用：
                                <input type="number" class="input-text" v-model="submitData.maintainFee">
                            </span>
              <span>
                                下一任负责人：
                                <select name="" class="select-style" v-model="nextMaintainAdmin">
                                    <option v-for="item in staffListData" :value="item" v-text="item.staff_name">
                                    </option>
                                </select>
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
  import { staffList} from "@/api/systemManage/staff";
  import { getMaintain , addMaintain , editMaintain} from "../../../api/devicesManage/deviceManage";
  import {
    grainVariety,grainOilLevel
  } from "@/api/systemManage/dropDown";
  import { checkPhone, uploadPic } from "@/utils/public";
    export default {
        name: "maintainEdit",
      data() {
        return {
          sortOrder: "0", //0 顺序，1 倒序
          postData: {
            equipmentMaintainId: ''
          },
          maintainAdmin:'',
          nextMaintainAdmin:'',
          staffListData:[],
          submitData: {
            equipmentId:'',
            equipmentCode: "",
            equipmentName: "",
            equipmentType: "",
            maintainAdmin:'',
            maintainAdminName: "",
            maintainFee: "",
            nextMaintainAdmin:'',
            nextMaintainAdminName:'',
            equipmentMaintainId:'',
          },
          editPopup: 0, // 控制菜单编辑弹出层的显影，1为显示
        };
      },
      methods: {
        getDetail: function() {
          var vm = this;
          layer.load(2);
          getMaintain(vm.postData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                vm.submitData.equipmentCode = ret.data.equipmentMaintainDetail.equipmentCode;
                vm.submitData.equipmentId = ret.data.equipmentMaintainDetail.equipmentId;
                vm.submitData.equipmentName = ret.data.equipmentMaintainDetail.equipmentName;
                vm.submitData.equipmentType = ret.data.equipmentMaintainDetail.equipmentType;

                // vm.submitData.maintainAdmin = ret.data.equipmentMaintainDetail.maintainAdmin;
                // vm.submitData.maintainAdminName = ret.data.equipmentMaintainDetail.maintainAdminName;

                vm.submitData.maintainFee = ret.data.equipmentMaintainDetail.maintainFee;
                vm.submitData.equipmentMaintainId = ret.data.equipmentMaintainDetail.equipmentMaintainId;

                // vm.submitData.nextMaintainAdmin = ret.data.equipmentMaintainDetail.nextMaintainAdmin;
                // vm.submitData.nextMaintainAdminName = ret.data.equipmentMaintainDetail.nextMaintainAdminName;

                vm.$nextTick(function() {

                  vm.maintainAdmin={
                    staff_id:ret.data.equipmentMaintainDetail.maintainAdmin,
                    staff_name:ret.data.equipmentMaintainDetail.maintainAdminName
                  };
                  vm.nextMaintainAdmin={
                    staff_id:ret.data.equipmentMaintainDetail.nextMaintainAdmin,
                    staff_name:ret.data.equipmentMaintainDetail.nextMaintainAdminName
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
          vm.submitData.maintainAdmin=vm.maintainAdmin.staff_id;
          vm.submitData.maintainAdminName=vm.maintainAdmin.staff_name;
          vm.submitData.nextMaintainAdmin=vm.nextMaintainAdmin.staff_id;
          vm.submitData.nextMaintainAdminName=vm.nextMaintainAdmin.staff_name;
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
          if (vm.submitData.maintainAdminName == "") {
            layer.msg("请填写负责人");
            return;
          }
          if (vm.submitData.maintainFee == "") {
            layer.msg("请填写保养费用");
            return;
          }
          if (vm.submitData.nextMaintainAdminName == "") {
            layer.msg("请填写下一任责任人");
            return;
          }
          if (this.$route.query.type=='edit') {
            layer.load(2);
            editMaintain(vm.submitData)
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  layer.msg("保养成功！");
                  this.$router.push({
                    name: "maintain",
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
            addMaintain(vm.submitData)
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  layer.msg("保养成功！");
                  this.$router.push({
                    name: "maintain",
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
           /*this.$router.push({//提交后筛选条件带回
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
          vm.postData.equipmentMaintainId=this.$route.query.data.equipmentMaintainId;
          // vm.submitData.equipmentName=this.$route.query.data.equipmentName;
          // vm.submitData.equipmentId=this.$route.query.data.equipmentId;
          // vm.submitData.equipmentCode=this.$route.query.data.equipmentCode;

          vm.getDetail();
        }else{
          console.log(JSON.stringify(this.$route.query.data))
          vm.submitData.equipmentName=this.$route.query.data.equipmentName;
          vm.submitData.equipmentType=this.$route.query.data.equipmentType;
          vm.submitData.equipmentCode=this.$route.query.data.equipmentCode;
          vm.submitData.equipmentId=this.$route.query.data.equipmentId;
          vm.maintainAdmin={
            staff_id:this.$route.query.data.equipmentAdmin,
            staff_name:this.$route.query.data.equipmentAdminName
          };

          vm.getDropDown();

        }
      }
    };
</script>
