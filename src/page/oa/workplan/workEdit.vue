<template>
  <div class="content">
    <div class="menuManage userManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">基础信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div>
                            <span>
                                <label>计划名称：</label>
                                <input type="text" class="input-text" v-model="submitData.planName">
                            </span>
              <span>
                                <label>开始时间：</label>
                                <input type="text" class="input-text Wdate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"  id="planStartDatetime" >
                            </span>
              <span>
                                <label>结束时间：</label>
                                <input type="text" class="input-text Wdate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"  id="planEndDatetime" >
                            </span>
              <span>
                                <label>负责人：</label>
                                <!-- <input type="text" class="input-text" v-model="submitData.personInChargeId"> -->
                                <select name="" class="select-style" v-model="submitData.personInChargeId">
                                    <option v-for="item in staffListData" :value="item.staff_id" v-text="item.staff_name">
                                    </option>
                                </select>
                            </span>
              <span>
                                <label>类型：</label>
                                <input type="text" class="input-text" v-model="submitData.planType">
                            </span>
              <span>
                                <label>参与人：</label>
                                <!-- <input type="text" class="input-text" v-model="submitData.participants"> -->
                                <select name="" class="select-style" v-model="submitData.participants">
                                    <option v-for="item in staffListData" :value="item.staff_name" v-text="item.staff_name">
                                    </option>
                                </select>
                            </span>
              <span>
                                <label>状态：</label>
                                <select v-model="submitData.status" v-if="postData.planId" class="select-style" >
                                  <option value="0">未开始</option>
                                  <option value="1">进行中</option>
                                  <option value="2">已结束</option>
                                </select>
                                <select v-model="submitData.status" v-else  disabled="disabled" class="select-style">
                                  <option value="0">未开始</option>
                                  <option value="1">进行中</option>
                                  <option value="2">已结束</option>
                                </select>
                            </span>
              <!-- <span>
                  <label>廒间名称：</label>
                  <input type="text" class="input-text" v-model="submitData.warehouseName">
              </span> -->
            </div>
          </div>
        </div>
      </div>
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">计划内容</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div>
                  <span style="width: 100%;">
                      <textarea class="edit-textarea" v-model="submitData.planContent"></textarea>
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
  import { getPlan , editPlan , addPlan} from "../../../api/oa/plan";
  import { staffList} from "@/api/systemManage/staff";

  export default {
        name: "workEdit",
      data() {
        return {
          postData: {
            planId: this.$route.query.id,
            planName_transfer: this.$route.query.planName_transfer,
            pageNo:this.$route.query.pageNo,
          },
          participants: "",
          submitData: {
            planId: "",
            planName: "",
            planType: "",
            planStartDatetime: "",
            planEndDatetime: "",
            personInChargeId: "",
            participants: "",
            status: "0",
            planContent: "",
          },
          staffListData:[],
          // granaryList:[]
        };
      },
      methods: {
        getDetail: function() {
          var vm = this;
          layer.load(2);
          getPlan(vm.postData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                vm.submitData.planId = ret.data.plan.planId;
                vm.submitData.planName = ret.data.plan.planName;
                vm.submitData.planType = ret.data.plan.planType;
                $("#planStartDatetime").val(ret.data.plan.planStartDatetime);
                $("#planEndDatetime").val(ret.data.plan.planEndDatetime);
                  vm.submitData.personInChargeId = ret.data.plan.personInCharge;
                  vm.submitData.participants = ret.data.plan.participants;

                vm.submitData.status = ret.data.plan.status;
                vm.submitData.planContent = ret.data.plan.planContent;


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
          vm.submitData.planStartDatetime =  $("#planStartDatetime").val();
          vm.submitData.planEndDatetime =  $("#planEndDatetime").val();
          let planName_transfer=this.$route.query.planName_transfer;
          let pageNo=this.$route.query.pageNo;
          if (vm.submitData.planName == "") {
            layer.msg("请填写计划名称");
            return;
          }
          if (vm.submitData.planStartDatetime == "") {
            layer.msg("请填写开始时间");
            return;
          }
          if (vm.submitData.planEndDatetime == "") {
            layer.msg("请填写结束时间");
            return;
          }
          if (vm.submitData.personInChargeId == "") {
            layer.msg("请填写负责人");
            return;
          }
          if (vm.submitData.planType == "") {
            layer.msg("请填写类型");
            return;
          }
          if (vm.submitData.participants == "") {
            layer.msg("请填写参与人");
            return;
          }
          if (vm.submitData.enterpriseCode == "") {
            layer.msg("请填写企业编码");
            return;
          }
          if (vm.submitData.status === "") {
            layer.msg("请填写当前状态");
            return;
         }

          if (this.$route.query.id) {
            layer.load(2);
            editPlan(vm.submitData)
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  layer.msg("编辑工作计划成功！");
                  this.$router.push({
                    name: "workplanList",
                    query:{
                      planName:planName_transfer,
                      pageNo:pageNo
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
            addPlan(vm.submitData)
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  layer.msg("新增工作计划成功！");
                  this.$router.push({
                    name: "workplanList",
                    query:{
                      planName:planName_transfer,
                      pageNo:pageNo
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
        detailBack:function () {
          var vm=this;
          let planName_transfer=this.$route.query.planName_transfer;
          let pageNo=this.$route.query.pageNo;
          this.$router.push({
            name: "workplanList",
            query: {
              planName:planName_transfer,
              pageNo:pageNo
            }
          });
        }
      },
      mounted() {
        var vm = this;
        vm.getDropDown();
        if (this.$route.query.id) {
          vm.getDetail();
        }
      }
    };
</script>

<style scoped>

</style>
