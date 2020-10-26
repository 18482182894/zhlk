<template>
  <div class="content">
    <div class="menuManage roleManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">设备报废编辑</div>
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
                                <input type="text" class="input-text" readonly="readonly" v-model="submitData.equipmentId">
                            </span>
              <span>
                                报废责任人：
                                <select name="" class="select-style" disabled="disabled" style="background: #F4F4F4;"  v-model="equipmentAdmin">
                                    <option v-for="item in staffListData" :value="item" v-text="item.staff_name">
                                    </option>
                                </select>
                            </span>
              <span>
                                下一任责任人：
                                <select name="" class="select-style" v-model="nextAbandonedAdmin">
                                    <option v-for="item in staffListData" :value="item" v-text="item.staff_name">
                                    </option>
                                </select>
                            </span>
              <span>
                                报废说明：
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
  import{getEquipmentAbandoned , addEquipmentAbandoned , editEquipmentAbandoned } from "../../../api/devicesManage/equipmentAbandoned";
  import { staffList} from "@/api/systemManage/staff";

  export default {
        name: "scrapEdit",
    data() {
      return {
        sortOrder: "0", //0 顺序，1 倒序
        postData: {
          equipmentAbandonedId:''
        },
        equipmentAdmin:'',
        nextAbandonedAdmin:'',
        staffListData:[],
        submitData: {
          equipmentId:'',
          equipmentName:'',
          equipmentType:'',
          equipmentCode:'',

          equipmentAbandonedId: "",
          nextAbandonedAdmin: "",
          nextAbandonedAdminName: "",
          memo: "",
        },
        editPopup: 0, // 控制菜单编辑弹出层的显影，1为显示
      };
    },
    methods: {
      getDetail: function() {
        var vm = this;
        layer.load(2);
        getEquipmentAbandoned(vm.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.submitData.equipmentId = ret.data.dataMap.equipmentId;
              vm.submitData.equipmentName = ret.data.dataMap.equipmentName;
              vm.submitData.equipmentCode = ret.data.dataMap.equipmentCode;
              vm.submitData.equipmentType = ret.data.dataMap.equipmentType;
              vm.submitData.nextAbandonedAdminName = ret.data.dataMap.nextAbandonedAdminName;
              // $('#releaseDate').val(ret.data.receivedDocument.releaseDate);
              vm.submitData.nextAbandonedAdmin = ret.data.dataMap.nextAbandonedAdmin;
              vm.submitData.equipmentAbandonedId = ret.data.dataMap.equipmentAbandonedId;
              vm.submitData.memo = ret.data.dataMap.memo;
              // vm.submitData.executeType = ret.data.equipmentMaintainDetail.executeType;
              // vm.submitData.grainKind = ret.data.equipmentMaintainDetail.grainKind;
              // vm.submitData.grainAttribute = ret.data.equipmentMaintainDetail.grainAttribute;
              // vm.submitData.grainOilLevel = ret.data.equipmentMaintainDetail.grainOilLevel;
              // vm.submitData.attachmentFile = ret.data.receivedDocument.attachmentFile;
              vm.$nextTick(function() {

                  vm.equipmentAdmin={
                    staff_id:ret.data.dataMap.abandonedAdmin,
                    staff_name:ret.data.dataMap.abandonedAdminName
                  };
                  vm.nextAbandonedAdmin={
                    staff_id:ret.data.dataMap.nextAbandonedAdmin,
                    staff_name:ret.data.dataMap.nextAbandonedAdminName
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
          vm.submitData.nextAbandonedAdmin=vm.nextAbandonedAdmin.staff_id;
          vm.submitData.nextAbandonedAdminName=vm.nextAbandonedAdmin.staff_name;
        if (vm.submitData.nextAbandonedAdmin == "") {
          layer.msg("请填写下一任责任人");
          return;
        }
        if (vm.submitData.memo == "") {
          layer.msg("请填写报废说明");
          return;
        }
        if (this.$route.query.type=='edit') {
          layer.load(2);
          editEquipmentAbandoned(vm.submitData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                layer.msg("编辑报废单成功！");
                this.$router.push({
                  name: "scrap"
                });
              } else {
                layer.alert(ret.data, { closeBtn: 0 });
              }
            })
            .catch(err => {
              layer.alert(err.message, { closeBtn: 0 });
            });
        } else {
          vm.submitData.equipmentAbandonedId='';
          layer.load(2);
          addEquipmentAbandoned(vm.submitData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                layer.msg("新增报废单成功！");
                this.$router.push({
                  name: "scrap"
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
          name: "scrap",
          query: {
            equipmentType: this.$route.query.equipmentType,
            equipmentName: this.$route.query.equipmentName
          }
        });
      }
    },
    mounted() {
      var vm = this;
        if (this.$route.query.type=='add') {
          vm.postData.equipmentAbandonedId=this.$route.query.data.equipmentAbandonedId;
          vm.getDetail();
        }else{
          if (this.$route.query.type=='edit') {
            vm.postData.equipmentAbandonedId=this.$route.query.data.equipmentAbandonedId;

            vm.getDetail();
          }else{
            // console.log(JSON.stringify(this.$route.query.data))
            vm.submitData.equipmentName=this.$route.query.data.equipmentName;
            vm.submitData.equipmentId=this.$route.query.data.equipmentId;
            vm.submitData.equipmentCode=this.$route.query.data.equipmentCode;
            vm.submitData.equipmentType=this.$route.query.data.equipmentType;
            vm.equipmentAdmin={
              staff_id:this.$route.query.data.equipmentAdmin,
              staff_name:this.$route.query.data.equipmentAdminName
            };

            vm.getDropDown();

          }
        }
    }
  };
</script>

<style scoped>

</style>
