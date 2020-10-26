<template>
    <div class="content">
        <div class="menuManage roleManage">
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">设备信息</div>
                </div>
                <div class="tag-box-content">
                    <div class="userManage-detail userManage-edit">
                        <div>
                            <span>
                                设备名称：
                                <label v-text="detailData.deviceName"></label>
                            </span>
                            <span>
                                设备编号：
                                <label v-text="detailData.deviceId"></label>
                            </span>
                            <span>
                                PC主机：
                                <label v-text="detailData.pcHostIp"></label>
                            </span>
                            <span>
                                设备地址：
                                <label v-text="detailData.deviceAddress"></label>
                            </span>
                            <span>
                                设备端口：
                                <label v-text="detailData.devicePort" ></label>
                            </span>


                            <span>
                                库点功能位置：
                                <label v-text="detailData.funcPositionCode"></label>
                            </span>
                            <span>
                                设备朝向：
                                <label v-text="detailData.deviceOrientation"></label>
                            </span>
                            <span>
                                位置信息：
                                <label v-text="detailData.positionMessage"></label>
                            </span>
                            <span>
                                用户名：
                                <label v-text="detailData.userName" ></label>
                            </span>
                            <span>
                                密码：
                                <label v-text="detailData.password"></label>
                            </span>

                            
                            <span style="width: 100%;">
                                设备描述：
                                <label style="width: 95%;" v-text="detailData.memo" ></label>
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
<style type="text/css" scoped>
    .planPopup-edit-main {
        width: 980px;
        height: 350px;
    }
</style>
<script>
import {wlInfo} from "@/api/IOT/iot.js"; 
export default {
  name: "priceManageDetail",
  data() {
    return {
      postData: {
        deviceBarcode: this.$route.query.id
      },
      detailData: "",
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      wlInfo(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.detailData = ret.data.data;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    detailBack:function () {
        this.$router.back(-1);
    }
  },
  mounted() {
    var vm = this;
    vm.getDetail();
  }
};
</script>
