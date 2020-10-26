<template>
  <div class="content">
    <div class="menuManage roleManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">基础信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail">
            <!--<img src="../../../../static/images/user.png" alt="">-->
            <div>
              <span>
                申请部门：
                <label v-text="detailData.applyDeptName"></label>
              </span>
              <span>
                申请人：
                <label v-text="detailData.applyStaffName"></label>
              </span>
              <span>
                请假类型：
                <label v-text="detailData.leaveType"></label>
              </span>
              <span>
                请假开始时间：
                <label v-text="detailData.leaveStartDate"></label>
              </span>
              <span>
                请假结束时间:
                <label v-text="detailData.leaveEndDate"></label>
              </span>
              <span>
                相差时间（天）：
                <label v-text="detailData.totalDay"></label>
              </span>
              <span style="width: 100%;">请假事由：
                <pre v-text="detailData.leaveReason"></pre>
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
            <img :src="detailData.imageFile" alt>
          </div>
        </div>
      </div>
      <div class="detail-back">
        <button @click="detailBack();">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getLeaveApplication } from "../../../api/oa/leaveApplication";

export default {
  name: "leaveDetail",
  data() {
    return {
      postData: {
        leaveApplyId: this.$route.query.id,
      },
      detailData: ""
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
            vm.detailData = ret.data.dataMap;
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
    vm.getDetail();
  }
};
</script>

<style scoped>
</style>
