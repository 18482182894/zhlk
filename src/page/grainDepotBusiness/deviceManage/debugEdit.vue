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
                                设备名称：
                                <input type="text" class="input-text" readonly="readonly" v-model="submitData.equipmentName">
                            </span>
              <span>
                                设备类型：
                                <input type="text" class="input-text" readonly="readonly" v-model="submitData.equipmentType?'计量设备':'仓储设备'">
                            </span>
              <span>
                                设备编号：
                                <input type="text" class="input-text" readonly="readonly" v-model="submitData.equipmentCode">
                            </span>
              <span>
                                调试负责人：
                                <select name="" class="select-style" v-model="debugAdmin">
                                    <option v-for="item in staffListData" :value="item" v-text="item.staff_name">
                                    </option>
                                </select>
                            </span>
              <span>
                                调试费用：
                                <input type="number" class="input-text" v-model="submitData.debugFee">
                            </span>

              <span>
                                调试记录：
                                <input type="text" class="input-text" v-model="submitData.debugDetail">
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
  import{ addDebug , editDebug , getDebug } from "../../../api/devicesManage/debug";
  import { staffList} from "@/api/systemManage/staff";
  import {
    grainVariety,grainOilLevel
  } from "@/api/systemManage/dropDown";

  export default {
        name: "debugEdit",
    data() {
      return {
        sortOrder: "0", //0 顺序，1 倒序
        postData: {
          equipmentDebugId: this.$route.query.id
        },
        debugAdmin:'',
        staffListData:[],
        submitData: {
          equipmentId:'',
          equipmentName: "",
          equipmentCode:'',
          equipmentType: "",
          equipmentDebugId: "",
          equipmentCode: " ",
          debugAdmin: "",
          debugAdminName:'',
          debugFee:"",
          debugDetail:""
        },
        editPopup: 0, // 控制菜单编辑弹出层的显影，1为显示
      };
    },
    methods: {
      getDetail: function() {
        var vm = this;
        layer.load(2);
        getDebug(vm.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.submitData.equipmentName = ret.data.equipmentDebug.equipmentName;
              vm.submitData.equipmentId = ret.data.equipmentDebug.equipmentId;
              vm.submitData.equipmentDebugId = ret.data.equipmentDebug.equipmentDebugId;
              vm.submitData.equipmentCode = ret.data.equipmentDebug.equipmentCode;
              vm.submitData.debugAdmin = ret.data.equipmentDebug.debugAdmin;
              vm.submitData.debugAdminName = ret.data.equipmentDebug.debugAdminName;
              vm.submitData.debugFee = ret.data.equipmentDebug.debugFee;
              vm.submitData.debugDetail = ret.data.equipmentDebug.debugDetail;

              vm.$nextTick(function() {

                  vm.debugAdmin={
                    staff_id: ret.data.equipmentDebug.debugAdmin,
                    staff_name:ret.data.equipmentDebug.debugAdminName
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

          vm.submitData.debugAdmin=vm.debugAdmin.staff_id;
          vm.submitData.debugAdminName=vm.debugAdmin.staff_name;
        if (vm.submitData.debugAdmin == "") {
          layer.msg("请选择设备责任人");
          return;
        }
        if (vm.submitData.debugFee == "") {
          layer.msg("请填写费用");
          return;
        }
        if (this.$route.query.id) {
          layer.load(2);
          editDebug(vm.submitData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                layer.msg("调试成功！");
                this.$router.push({
                  name: "debug",
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
          addDebug(vm.submitData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                layer.msg("调试成功！");
                this.$router.push({
                  name: "debug",
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
            equipmentCode:this.$route.query.quipmentCode,
            equipmentType:this.$route.query.equipmentType,
            pageNo:this.$route.query.pageNo

          }
        });
      }
    },
    mounted() {
      var vm = this;
        if (this.$route.query.type=='edit') {
          vm.postData.equipmentDebugId=this.$route.query.data.equipmentDebugId;
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

          vm.submitData.debugAdmin=this.$route.query.data.equipmentAdmin;
          vm.submitData.debugAdminName=this.$route.query.data.equipmentAdminName;
          vm.debugAdmin={
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
