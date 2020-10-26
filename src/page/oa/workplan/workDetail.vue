<template>
  <div class="content">
    <div class="menuManage roleManage">
      <div class="tag-box">
      <div class="tag-box-top">
        <div class="tag-title">基础信息</div>
      </div>
      <div class="tag-box-content">
        <div class="userManage-detail">
          <div>
                            <span>
                                计划名称：
                                <label v-text="detailData.planName"></label>
                            </span>
            <span>
                                开始时间：
                                <label v-text="detailData.planStartDatetime"></label>
                            </span>
            <span>
                                结束时间：
                                <label v-text="detailData.planEndDatetime"></label>
                            </span>
            <span>
                                负责人：
                                <label v-text="detailData.personInCharge"></label>
                            </span>
            <span>
                                类型：
                                <label v-text="detailData.planType"></label>
                            </span>
            <span>
                                参与人：
                                <label v-text="detailData.participants"></label>
                            </span>
            <span>
                                状态：
                                <label v-text="detailData.status==0?'未开始':(detailData.status==1?'进行中':'已结束')"></label>
                            </span>
          </div>
        </div>
      </div>
    </div>
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">计划内容</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail">
            <div>
              <span style="width: 100%;">
                  <label v-text="detailData.planContent"></label>
              </span>
            </div>
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
  import{ getPlan} from "../../../api/oa/plan";
  import { staffList} from "@/api/systemManage/staff";

  export default {
        name: "workDetail",
    data() {
      return {
        postData: {
          planId: this.$route.query.id,
          planName_transfer: this.$route.query.planName_transfer,
          pageNo:this.$route.query.pageNo,
        },
        detailData: ""
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
              // console.log(JSON.stringify(ret))
              vm.detailData = ret.data.plan;
              staffList({
                pageSize: 1000,
                pageNo: 0
              }).then(ret => {//职工列表
                  if (ret.code == 200) {
                    // console.log(JSON.stringify(ret))
                    for (var i = 0; i < ret.data.staffList.length; i++) {
                      if (ret.data.staffList[i].staff_id==vm.detailData.personInCharge) {
                        vm.detailData.personInCharge=ret.data.staffList[i].staff_name;
                      }
                    }
                    // vm.staffListData = ret.data.staffList;
                  } else {
                    layer.alert(ret.data, { closeBtn: 0 });
                  }
              }).catch(err => {
                  layer.alert(err.message, { closeBtn: 0 });
              });

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
      vm.getDetail();
    }
  };
</script>

<style scoped>

</style>
