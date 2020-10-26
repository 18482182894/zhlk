<template>
  <div class="content">
    <div class="menuManage roleManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">故障单信息</div>
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
                                <input type="text" class="input-text" readonly="readonly" v-model="submitData.equipmentType=='0'?'计量(检验)设备':'仓储设备'">
                            </span>
              <span>
                                设备编号：
                                <input type="text" class="input-text" readonly="readonly" v-model="submitData.equipmentId">
                            </span>
              <span>
                                负责人：
                                <select name="" class="select-style" v-model="failureAdmin">
                                    <option v-for="item in staffListData" :value="item" v-text="item.staff_name">
                                    </option>
                                </select>
                            </span>

              <span>
                                备注：
                                <input type="text" class="input-text" v-model="submitData.memo">
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
  import {getEquipmentFailureList , getEquipmentFailure, editEquipmentFailure,addEquipmentFailure} from "../../../api/devicesManage/equipmentFailure";
  import { staffList} from "@/api/systemManage/staff";
  import {
    grainVariety,grainOilLevel
  } from "@/api/systemManage/dropDown";

  export default {
        name: "faultEdit",
    data() {
      return {
        sortOrder: "0", //0 顺序，1 倒序
        postData: {
          equipmentFailureId: this.$route.query.id
        },
        failureAdmin:'',
          staffListData:[],
        submitData: {
          equipmentName:'',
          equipmentId:'',
          equipmentType:'',

          equipmentFailureId: "",
          equipmentCode: " ",
          failureAdmin: "",
          memo:"",

        }
      };
    },
    methods: {
      getDetail: function() {
        var vm = this;
        layer.load(2);
        getEquipmentFailure(vm.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.submitData.equipmentType = ret.data.equipmentFailure.equipmentType;
              vm.submitData.equipmentName = ret.data.equipmentFailure.equipmentName;
              vm.submitData.equipmentId = ret.data.equipmentFailure.equipmentId;
              vm.submitData.equipmentFailureId = ret.data.equipmentFailure.equipmentFailureId;
              vm.submitData.equipmentCode = ret.data.equipmentFailure.equipmentCode;
              // vm.submitData.failureAdmin = ret.data.equipmentFailure.failureAdmin;
              vm.submitData.memo = ret.data.equipmentFailure.memo;
              vm.$nextTick(function() {

                  vm.failureAdmin={
                    staff_id:ret.data.equipmentFailure.failureAdmin,
                    staff_name:ret.data.equipmentFailure.failureAdminName
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

          vm.submitData.failureAdmin=vm.failureAdmin.staff_id;
          vm.submitData.failureAdminName=vm.failureAdmin.staff_name;
        if (vm.submitData.failureAdmin == "") {
          layer.msg("请填写设备编号");
          return;
        }
        if (this.$route.query.type=='edit') {
          layer.load(2);
          editEquipmentFailure(vm.submitData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                layer.msg("编辑故障单成功！");
                this.$router.push({
                  name: "fault",
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
          layer.load(2);
          addEquipmentFailure(vm.submitData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                layer.msg("新增故障单成功！");
                this.$router.push({
                  name: "fault",
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
          vm.postData.equipmentFailureId=this.$route.query.id;

          vm.getDetail();
        }else{
          // console.log(JSON.stringify(this.$route.query.data))
          vm.submitData.equipmentName=this.$route.query.data.equipmentName;
          vm.submitData.equipmentId=this.$route.query.data.equipmentId;
          vm.submitData.equipmentCode=this.$route.query.data.equipmentCode;
          vm.submitData.equipmentType=this.$route.query.data.equipmentType;

          vm.getDropDown();

        }
    }
  };
</script>

<style scoped>

</style>
