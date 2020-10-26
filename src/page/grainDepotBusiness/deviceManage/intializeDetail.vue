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
                                设备类型：
                                <label v-text="detailData.equipmentType=='0'?'计量(检验)设备':'仓储设备'"></label>
                            </span>
              <span>
                                设备编号：
                                <label v-text="detailData.equipmentId"></label>
                            </span>
              <span>
                                负责人：
                                <label v-text="detailData.equipmentAdminName"></label>
                            </span>
              <span>
                                单价:
                                <label v-text="detailData.procurementPrice"></label>
                            </span>
              <span>
                                设备规格型号：
                                <label v-text="detailData.equipmentSpecifications"></label>
                            </span>
              <span>
                                初始化负责人：
                                <label v-text="detailData.initialAdminName"></label>
                            </span>
              <span>
                                维修电话：
                                <label v-text="detailData.repairTelephone"></label>
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
  import{ getDeviceInit } from "../../../api/devicesManage/deviceManage";

  export default {
        name: "intializeDetail",
    data() {
      return {
        postData: {
          equipmentInitialId: this.$route.query.id
        },
        detailData: ""
      };
    },
    methods: {
      getDetail: function() {
        var vm = this;
        layer.load(2);
        getDeviceInit(vm.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.detailData = ret.data.equipmentInitialDetail;
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          })
          .catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
          });
      },
      detailBack:function () {
        //this.$router.back(-1);
        this.$router.push({
          name:this.$route.query.name,
          query: {
            equipmentName:this.$route.query.equipmentName,
            equipmentType:this.$route.query.equipmentType,
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
