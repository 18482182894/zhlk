<template>
  <div class="content">
    <div class="menuManage roleManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">设备维修信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div>
              <span>
                                设备名称：
                                <input type="text" class="input-text" v-model="submitData.equipmentName">
                            </span>
              <span>
                                条形码：
                                <input type="text" class="input-text" v-model="submitData.equipmentCode">
                            </span>
              <span>
                                维护部位：
                                <input type="text" class="input-text" v-model="submitData.repairParts">
                            </span>
              <span>
                                实施开始时间：
                                <input type="text"  class="input-text Wdate" onclick="WdatePicker({maxDate:'%y-%M-%d',dateFmt:'yyyy-MM-dd HH:mm:ss',})"  id="repairStartDatetime" >
                            </span>
              <span>
                                实施结束时间：
                                <input type="text"  class="input-text Wdate" onclick="WdatePicker({maxDate:'%y-%M-%d',dateFmt:'yyyy-MM-dd HH:mm:ss',})"  id="repairEndDatetime" >
                            </span>
              <span>
                                维护人：
                                <select name="" class="select-style" v-model="repairAdmin">
                                    <option v-for="item in staffListData" :value="item" v-text="item.staff_name">
                                    </option>
                                </select>
                            </span>
              <span>
                                维护费用：
                                <input type="number" class="input-text" v-model="submitData.repairFee">
                            </span>
              <br>
              <span style="width: 100%;">
                                维护原因：
                                <textarea class="edit-textarea"  v-model="submitData.repairReason"></textarea>
                            </span>
              <br>
              <span style="width: 100%;">
                                备注：
                                <textarea class="edit-textarea"  v-model="submitData.memo"></textarea>
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
  import{ addRepair , editRepair , getRepair} from "../../../api/devicesManage/repair";
  import { staffList} from "@/api/systemManage/staff";

  export default {
        name: "repairEdit",
        data() {
      return {
        sortOrder: "0", //0 顺序，1 倒序
        postData: {
          equipmentRepairId: ''
        },
        repairAdmin:'',
        staffListData:[],
        submitData: {
          equipmentName:'',

          equipmentRepairId: "",
          equipmentCode: "",
          repairParts: "",
          repairStartDatetime: "",
          repairEndDatetime: "",
          repairAdmin:'',

          repairAdminName:'',

          repairFee:'',
          repairReason:'',
          memo:'',

        },
        editPopup: 0, // 控制菜单编辑弹出层的显影，1为显示
      };
    },
    methods: {
      getDetail: function() {
        var vm = this;
        layer.load(2);
        getRepair(vm.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.submitData.equipmentName = ret.data.dataMap.equipmentName;
              
              vm.submitData.equipmentRepairId = ret.data.dataMap.equipmentRepairId;
              vm.submitData.equipmentCode = ret.data.dataMap.equipmentCode;
              vm.submitData.repairParts = ret.data.dataMap.repairParts;
              vm.submitData.repairStartDatetime = ret.data.dataMap.repairStartDatetime;
              $('#repairStartDatetime').val(ret.data.dataMap.repairStartDatetime);
              vm.submitData.repairEndDatetime = ret.data.dataMap.repairEndDatetime;
              $('#repairEndDatetime').val(ret.data.dataMap.repairEndDatetime);
              // vm.submitData.repairAdmin = ret.data.dataMap.repairAdmin;
              vm.submitData.repairFee = ret.data.dataMap.repairFee;
              vm.submitData.repairReason = ret.data.dataMap.repairReason;
              vm.submitData.memo = ret.data.dataMap.memo;

              vm.$nextTick(function() {
                vm.repairAdmin={
                    staff_id:ret.data.dataMap.repairAdmin,
                    staff_name:ret.data.dataMap.repairAdminName
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
        vm.submitData.repairStartDatetime=$('#repairStartDatetime').val();
        vm.submitData.repairEndDatetime=$('#repairEndDatetime').val();

          vm.submitData.repairAdmin=vm.repairAdmin.staff_id;
          vm.submitData.repairAdminName=vm.repairAdmin.staff_name;

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
        if (vm.submitData.repairAdmin == "") {
          layer.msg("请填写维护人");
          return;
        }
        if (vm.submitData.repairFee == "") {
          layer.msg("请填写维护费用");
          return;
        }
        if (this.$route.query.type=='edit') {
          layer.load(2);
          editRepair(vm.submitData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                layer.msg("编辑维修单成功！");
                this.$router.push({
                  name: "repair",
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
          vm.submitData.equipmentRepairId='';
          layer.load(2);
          addRepair(vm.submitData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                layer.msg("新增维修单成功！");
                this.$router.push({
                  name: "repair",
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
        if (this.$route.query.type=='add') {
          vm.postData.equipmentRepairId=this.$route.query.data.equipmentRepairId;

          vm.getDetail();
        }
        if (this.$route.query.type=='edit') {
          vm.postData.equipmentRepairId=this.$route.query.data.equipmentRepairId;

          vm.getDetail();
        }else{
          // console.log(JSON.stringify(this.$route.query.data))
          vm.submitData.equipmentName=this.$route.query.data.equipmentName;
          // vm.submitData.equipmentId=this.$route.query.data.equipmentId;
          vm.submitData.equipmentCode=this.$route.query.data.equipmentCode;
          // vm.submitData.equipmentType=this.$route.query.data.equipmentType;

          vm.getDropDown();

        }
    }
    };
</script>

<style scoped>

</style>
