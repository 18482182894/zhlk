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
                                <label v-text="detailData.equipmentType"></label>
                            </span>
              <span>
                                设备编号：
                                <label v-text="detailData.equipmentId"></label>
                            </span>
              <span>
                                调试责任人：
                                <label v-text="detailData.debugAdminName"></label>
                            </span>
              <span>
                                调试费用:
                                <label v-text="detailData.debugFee"></label>
                            </span>
              <span>
                                调试记录：
                                <label v-text="detailData.debugDetail"></label>
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
  import { getDebug} from "../../../api/devicesManage/debug";
  import {
    unitType
  } from "@/api/systemManage/dropDown";

  export default {
        name: "debugDetail",
    data() {
      return {
        postData: {
          equipmentDebugId: this.$route.query.id
        },
        detailData: ""
      };
    },
    methods: {
      getDetail: function() {
        var vm = this;
        layer.load(2);
        getDebug(vm.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.detailData = ret.data.equipmentDebug;

                unitType({}).then(ret => {//设备类型：
                    if (ret.code == 200) {
                      // console.log(JSON.stringify(ret))
                      // vm.unitTypeList = ret.data.dataList;
                      for (var i = 0; i < ret.data.dataList.length; i++) {
                        if (ret.data.dataList[i].dicInfoCode==vm.detailData.equipmentType) {
                          vm.detailData.equipmentType=ret.data.dataList[i].dicInfoValue;
                        }
                        
                      }
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
