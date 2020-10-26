<template>
  <div class="content">
    <div class="menuManage roleManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">安装信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail">
            <!--<img src="../../../../static/images/user.png" alt="">-->
            <div >
                            <span>
                                设备名称：
                                <label v-text="detailData.equipmentName"></label>
                            </span>
              <span>
                                设备类型：
                                <label v-text="detailData.equipmentType?'计量设备':'仓储设备'"></label>
                            </span>
              <span>
                                设备编号：
                                <label v-text="detailData.equipmentId"></label>
                            </span>
              <span>
                                安装费用：
                                <label v-text="detailData.intallFee"></label>
                            </span>
              <span>
                                维修电话:
                                <label v-text="detailData.telephone"></label>
                            </span>
              <span>
                                安装位置：
                                <label v-text="detailData.installPlace"></label>
                            </span>
              <span>
                                安装公司：
                                <label v-text="detailData.installCompany"></label>
                            </span>
              <span>
                                责任人：
                                <label v-text="detailData.installAdminName"></label>
                            </span>
              <span>
                                下一责任人：
                                <label v-text="detailData.nextInstallAdminName"></label>
                            </span>
              <!--<span>-->
                                <!--开票信息（发票抬头）：-->
                                <!--<label v-text="detailData.invoiceTitle"></label>-->
                            <!--</span>-->
              <!--<span>-->
                                <!--税号：-->
                                <!--<label v-text="detailData.taxNumber"></label>-->
                            <!--</span>-->
              <!--<span>-->
                                <!--开户行名称：-->
                                <!--<label v-text="detailData.bankName"></label>-->
                            <!--</span>-->
              <!--<span>-->
                                <!--银行账户名称：-->
                                <!--<label v-text="detailData.accountName"></label>-->
                            <!--</span>-->
              <!--<span>-->
                                <!--开户账号：-->
                                <!--<label v-text="detailData.accountNumber"></label>-->
                            <!--</span>-->
              <!--<span>-->
                                <!--开户地址：-->
                                <!--<label v-text="detailData.accountAddress"></label>-->
                            <!--</span>-->
              <!--<span>-->
                                <!--种植面积：-->
                                <!--<label v-text="detailData.plantAcreage"></label>-->
                            <!--</span>-->
              <!--<span>-->
                                <!--每亩的价外补贴数量：-->
                                <!--<label v-text="detailData.subsidy"></label>-->
                            <!--</span>-->
              <!--<span>-->
                                <!--客户分组编码：-->
                                <!--<label v-text="detailData.customerGroupId"></label>-->
                            <!--</span>-->
              <!--<span>-->
                                <!--城市：-->
                                <!--<label v-text="detailData.district"></label>-->
                            <!--</span>-->
              <!--<span>-->
                                <!--客户描述：-->
                                <!--<label >缺少字段</label>-->
                            <!--</span>-->
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
  import{ getDeviceInstall} from "../../../api/devicesManage/deviceManage";

  export default {
        name: "deviceDetail",
    data() {
      return {
        postData: {
          equipmentInstall: this.$route.query.id
        },
        detailData: ""
      };
    },
    methods: {
      getDetail: function() {
        var vm = this;
        layer.load(2);
        getDeviceInstall(vm.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.detailData = ret.data.equipmentInstallDetail;
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
