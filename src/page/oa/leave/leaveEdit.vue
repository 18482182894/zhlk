<template>
  <div class="content">
    <div class="menuManage roleManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">请假信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div>
              <!--<span v-if="postData.documentId">-->
              <!--文件编号：-->
              <!--<input type="text" class="input-text" readonly="readonly" v-model="submitData.fileId" >-->
              <!--</span>-->
              <!-- <span>
                                申请部门：
                                <input type="text" class="input-text" v-model="submitData.applyDeptName">
                            </span>
              <span>
                                申请人：
                                <input type="text" class="input-text" v-model="submitData.applyStaffName">
              </span>-->
              <span>请假类型：
                <!-- <input type="text" class="input-text" v-model="submitData.leaveType"> -->
                <select name class="select-style" v-model="submitData.leaveType">
                  <option
                    v-for="item in leaveTypeList"
                    :value="item.dicInfoValue"
                  >{{item.dicInfoValue}}</option>
                </select>
              </span>
              <span>
                请假开始时间：
                <input
                  type="text"
                  class="input-text Wdate"
                  onclick="WdatePicker()"
                  id="leaveStartDate"
                >
              </span>
              <span>
                请假结束时间：
                <input
                  type="text"
                  class="input-text Wdate"
                  onclick="WdatePicker()"
                  id="leaveEndDate"
                >
              </span>
              <span style="width: 100%;">请假事由：
                <!-- <input type="text" class="input-text "  v-model="submitData.leaveReason" > -->
                <textarea class="edit-textarea" v-model="submitData.leaveReason"></textarea>
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
            <img
              :src="submitData.imageFileUrl?submitData.imageFileUrl:'../../../../static/images/upload-pic.png'"
              alt
            >
            <!-- <label class="fc-red">只支持.jpg格式</label> -->
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
import {
  editLeaveApplication,
  getLeaveApplication,
  addLeaveApplication
} from "../../../api/oa/leaveApplication";
import { leaveType } from "@/api/systemManage/dropDown";
import { uploadPic } from "@/utils/public";
export default {
  name: "leaveEdit",
  data() {
    return {
      sortOrder: "0", //0 顺序，1 倒序
      postData: {
        leaveApplyId: this.$route.query.id
      },
      leaveTypeList: "", //请假类型
      submitData: {
        leaveApplyId: "",
        leaveType: "",
        leaveStartDate: "",
        leaveEndDate: "",
        leaveReason: "",
        imageFile: "",
        imageFileUrl: ""
      }
      // editPopup: 0, // 控制菜单编辑弹出层的显影，1为显示
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      getLeaveApplication(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            // console.log(ret.data.dataMap)
            vm.submitData.leaveApplyId = ret.data.dataMap.leaveApplyId;
            vm.submitData.leaveStartDate = ret.data.dataMap.leaveStartDate;
            $("#leaveStartDate").val(ret.data.dataMap.leaveStartDate);
            vm.submitData.leaveEndDate = ret.data.dataMap.leaveEndDate;
            $("#leaveEndDate").val(ret.data.dataMap.leaveEndDate);
            vm.submitData.leaveReason = ret.data.dataMap.leaveReason;
            vm.submitData.imageFile = ret.data.dataMap.imageFile;

            vm.$nextTick(function() {
              vm.getDropDown();
              vm.submitData.leaveType = ret.data.dataMap.leaveType;
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
      let leaveType_transfer=this.$route.query.leaveType_transfer;
      let leaveStartDate_transfer=this.$route.query.leaveStartDate_transfer;
      let leaveEndDate_transfer=this.$route.query.leaveEndDate_transfer;
      let pageNo=this.$route.query.pageNo;
      var vm = this;
      vm.submitData.leaveStartDate = $("#leaveStartDate").val();
      vm.submitData.leaveEndDate = $("#leaveEndDate").val();
      if (vm.submitData.leaveType == "") {
        layer.msg("请填写请假类型");
        return;
      }
      if (vm.submitData.leaveStartDate == "") {
        layer.msg("请填写请假开始时间");
        return;
      }
      if (vm.submitData.leaveEndDate == "") {
        layer.msg("请填写请假结束时间");
        return;
      }
      if (vm.submitData.leaveReason == "") {
        layer.msg("请填写请假事由");
        return;
      }
      if (this.$route.query.id) {
        layer.load(2);
        editLeaveApplication(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("编辑请假申请成功！");
              this.$router.push({
                name: "leaveList",
                query: {
                  leaveType:leaveType_transfer,
                  leaveStartDate:leaveStartDate_transfer,
                  leaveEndDate:leaveEndDate_transfer,
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
        vm.submitData.planId = "";
        layer.load(2);
        addLeaveApplication(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("新增请假申请成功！");
              this.$router.push({
                name: "leaveList",
                query: {
                  leaveType:leaveType_transfer,
                  leaveStartDate:leaveStartDate_transfer,
                  leaveEndDate:leaveEndDate_transfer,
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
    getDropDown: function() {
      //获取下拉项
      var vm = this;
      leaveType({})
        .then(ret => {
          //请假类型
          if (ret.code == 200) {
            console.log(JSON.stringify(ret));
            vm.leaveTypeList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    detailBack:function () {
      var vm=this;
      let leaveType_transfer=this.$route.query.leaveType_transfer;
      let leaveStartDate_transfer=this.$route.query.leaveStartDate_transfer;
      let leaveEndDate_transfer=this.$route.query.leaveEndDate_transfer;
      let pageNo=this.$route.query.pageNo;
      this.$router.push({
        name: "leaveList",
        query: {
          leaveType:leaveType_transfer,
          leaveStartDate:leaveStartDate_transfer,
          leaveEndDate:leaveEndDate_transfer,
          pageNo:pageNo
        }
      });
    }
  },
  mounted() {
    var vm = this;
    if (this.$route.query.id) {
      // console.log(this.$route.query.id)
      vm.getDetail();
    } else {
      vm.getDropDown();
    }
    uploadPic("uploadPic", function(ret) {
      if (ret.code == 200) {
        vm.submitData.imageFile = ret.data.fileName;
        vm.submitData.imageFileUrl = ret.data.fileUrl;
      } else {
        layer.alert("上传文件出错", { closeBtn: 0 });
      }
    });
  }
};
</script>

<style scoped>
</style>
