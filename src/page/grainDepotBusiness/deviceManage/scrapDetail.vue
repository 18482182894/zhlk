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
                                <label v-text="detailData.equipmentType?'计量设备':'仓储设备'"></label>
                            </span>
              <span>
                                设备编号：
                                <label v-text="detailData.equipmentId"></label>
                            </span>
              <span>
                                报废负责人：
                                <label v-text="detailData.abandonedAdminName"></label>
                            </span>
              <span>
                                下一任负责人:
                                <label v-text="detailData.nextAbandonedAdminName"></label>
                            </span>
              <span>
                                报废说明：
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
  import { getEquipmentAbandoned } from "../../../api/devicesManage/equipmentAbandoned";

  export default {
        name: "scrapDetail",
    data() {
      return {
        postData: {
          equipmentAbandonedId: this.$route.query.id
        },
        detailData: ""
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
              console.log(JSON.stringify(ret))
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
      vm.getDetail();
    }
  };
</script>

<style scoped>

</style>
