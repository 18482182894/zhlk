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
                                设备名称：
                                <label v-text="detailData.equipmentName"></label>
                            </span>
              <span>
                                维护原因：
                                <label v-text="detailData.repairReason"></label>
                            </span>
              <span>
                                维护部门：
                                <label v-text="detailData.repairParts"></label>
                            </span>
              <span>
                                实施开始时间：
                                <label v-text="detailData.repairStartDatetime"></label>
                            </span>
              <span>
                                实施结束时间:
                                <label v-text="detailData.repairEndDatetime"></label>
                            </span>
              <span>
                                维护人：
                                <label v-text="detailData.repairAdmin"></label>
                            </span>
              <span>
                                条形码：
                                <label v-text="detailData.equipmentCode"></label>
                            </span>
              <span>
                                维护费用：
                                <label v-text="detailData.repairFee"></label>
                            </span>
              <span>
                                备注：
                                <label v-text="detailData.memo"></label>
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
  import {getRepair} from "../../../api/devicesManage/repair";

  export default {
        name: "repairDetail",
    data() {
      return {
        postData: {
          equipmentRepairId: this.$route.query.id
        },
        detailData: ""
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
        this.$router.push({
          name:this.$route.query.name,
          query: {
            equipmentName:this.$route.query.equipmentName,
            pageNo:this.$route.query.pageNo

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
