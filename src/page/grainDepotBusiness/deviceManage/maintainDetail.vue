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
                                保养负责人：
                                <label v-text="detailData.maintainAdminName"></label>
                            </span>
              <span>
                                保养费用:
                                <label v-text="detailData.maintainFee"></label>
                            </span>
              <span>
                                下一任负责人：
                                <label v-text="detailData.nextMaintainAdminName"></label>
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
  import {getMaintain} from "../../../api/devicesManage/deviceManage";

  export default {
        name: "maintainDetail",
      data() {
        return {
          postData: {
            equipmentMaintainId: this.$route.query.id
          },
          detailData: ""
        };
      },
      methods: {
        getDetail: function() {
          var vm = this;
          layer.load(2);
          getMaintain(vm.postData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                vm.detailData = ret.data.equipmentMaintainDetail;
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
