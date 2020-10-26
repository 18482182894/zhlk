<template>
  <div class="content">
    <div class="menuManage roleManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">验收信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div>
              <span  v-if="postData.equipmentCheckId" >
                                设备验收记录编号：
                                <input type="text" class="input-text" :value="submitData.equipmentCheckId">
                            </span>
           <!--    <span v-if="postData.equipmentCheckId">
                                设备类型：
                                <input style="background-color: gainsboro" disabled="disabled" type="text" class="input-text" :value="equipmentType?'计量设备':'仓储设备'">
                            </span> -->
              <span>
                                设备编号：
                                <input type="text" class="input-text" v-model="submitData.equipmentCode">
                            </span>
              <span>
                                验收负责人：
                                <select name="" class="select-style" v-model="checkAdmin">
                                    <option v-for="item in staffListData" :value="item" v-text="item.staff_name">
                                    </option>
                                </select>
                            </span>
              <br>
              <span>
                                备注：
                                <input type="text" class="input-text" v-model="submitData.checkMemo">
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
  import{editDeviceCheck , getDeviceCheck , addDeviceCheck} from "../../../api/devicesManage/deviceCheck";
  import { staffList} from "@/api/systemManage/staff";
  import {
    grainVariety,grainOilLevel
  } from "@/api/systemManage/dropDown";
  import { checkPhone, uploadPic } from "@/utils/public";

  export default {
        name: "checkEdit",
      data() {
        return {
          sortOrder: "0", //0 顺序，1 倒序
          postData: {
            equipmentCheckId: this.$route.query.id
          },
          checkAdmin:'',
          staffListData:[],
          submitData: {
            equipmentCheckId: "",
            equipmentCode: "",
            checkAdmin: "",
            checkMemo: "",
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
          getDeviceCheck(vm.postData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                console.log(JSON.stringify(ret))
                vm.submitData.equipmentCheckId = ret.data.equipmentCheck.equipmentCheckId;
                vm.submitData.equipmentCode = ret.data.equipmentCheck.equipmentCode;
                vm.submitData.checkAdmin = ret.data.equipmentCheck.checkAdmin;
                vm.submitData.checkMemo = ret.data.equipmentCheck.checkMemo;

                vm.$nextTick(function() {
                  vm.checkAdmin={
                    staff_id:ret.data.equipmentCheck.checkAdmin,
                    staff_name:ret.data.equipmentCheck.checkAdminName
                  };
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
          vm.submitData.checkAdmin=vm.checkAdmin.staff_id;
          vm.submitData.checkAdminName=vm.checkAdmin.staff_name;
          if (this.$route.query.type=='edit') {
            if (vm.submitData.equipmentCheckId == "") {
              layer.msg("请填写设备编号");
              return;
            }
          }
          if (vm.submitData.checkAdmin == "") {
            layer.msg("请填写设备负责人");
            return;
          }
          if (this.$route.query.type=='edit') {
            layer.load(2);
            editDeviceCheck(vm.submitData)
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  layer.msg("验收成功！");
                  this.$router.push({
                    name: "check",
                    query: {
                      equipmentName:this.$route.query.equipmentName,
                      equipmentCode:this.$route.query.quipmentCode,
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
            layer.load(2);
            addDeviceCheck(vm.submitData)
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  layer.msg("验收成功！");
                  this.$router.push({
                    name: "check",
                    query: {
                      equipmentName:this.$route.query.equipmentName,
                      equipmentCode:this.$route.query.quipmentCode,
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
              equipmentCode:this.$route.query.quipmentCode,
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

                  vm.getDropDown();
        if (this.$route.query.type=='edit') {
          // vm.postData.equipmentInitialId=this.$route.query.data.equipmentInitialId;
          // vm.submitData.equipmentName=this.$route.query.data.equipmentName;
          // vm.submitData.equipmentId=this.$route.query.data.equipmentId;
          // vm.submitData.equipmentCode=this.$route.query.data.equipmentCode;

          vm.getDetail();
        }else{
          // console.log(JSON.stringify(this.$route.query.data))
          vm.submitData.equipmentCode=this.$route.query.data.equipmentCode;

        }
      }
    };
</script>
