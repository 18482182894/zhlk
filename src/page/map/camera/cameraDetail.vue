<template>
  <div class="content">
    <div class="menuManage userManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">摄像头信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail">
            <div>
                            <span>
                                摄像头编码：
                                <label v-text="detailData.cameraCode"></label>
                            </span>
              <span>
                                摄像头IP：
                                <label v-text="detailData.cameraIp"></label>
                            </span>
              <span>
                                硬盘录像机名称：
                                <label v-text="detailData.dvrName"></label>
                            </span>
              <span>
                                登陆用户名：
                                <label v-text="detailData.userName"></label>
                            </span>
              <span>
                                登陆密码：
                                <label v-text="detailData.userPwd"></label>
                            </span>
              <span>
                                厂家：
                                <label v-text="detailData.factoryName"></label>
                            </span>
              <span>
                                摄像头端口：
                                <label v-text="detailData.cameraPort"></label>
                            </span>
              <span>
                                摄像头ID：
                                <label v-text="detailData.cameraId"></label>
                            </span>
              <span>
                                显示排序：
                                <label v-text="detailData.sortNo"></label>
                            </span>
              <span>
                                通道名称：
                                <label v-text="detailData.channelName"></label>
                            </span>
              <span>
                                通道号：
                                <label v-text="detailData.channelNo"></label>
                            </span>
              <span>
                                链接方式：
                                <label v-text="detailData.connectionType"></label>
                            </span>
              <span>
                                是否在仓内：
                                <label v-text="detailData.storehouseInsideFlg"></label>
                            </span>
              <span>
                                是否有效：
                                <label v-text="detailData.effictiveFlg"></label>
                            </span>
              <span>
                                是否地磅现场：
                                <label v-text="detailData.weighingMachineSite"></label>
                            </span>
              <span>
                                是否入仓现场：
                                <label v-text="detailData.getintoFlg"></label>
                            </span>
              <span>
                                是否可控 ：
                                <label v-text="detailData.ctrlFlg"></label>
                            </span>
              <span v-if="detailData.storehouseInsideFlg=='否'">
                                摄像头位置 ：
                                <label v-text="detailData.cameraPosition"></label>
                            </span>
              <span>
                                摄像头状态 ：
                                <label v-text="detailData.cameraStatus"></label>
                            </span>
              <br>
              <span>
                                流媒体链接地：
                                <label v-text="detailData.streamingMediaUrl"></label>
                            </span>
              <br>
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
<style scoped>

</style>
<script>
import {detailCamera} from "../../../api/map/map";
    export default {
        name: "cameraDetail",
        data() {
          return {
            postData: {
              cameraCode:this.$route.query.cameraCode,
			  cameraCodeCondition:this.$route.query.cameraCodeCondition,
			  pageNo:this.$route.query.pageNo
            },
            detailData: ""
          };
        },
        methods: {
          getDetail: function() {
            var vm = this;
            layer.load(2);
            detailCamera(vm.postData)
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
            //this.$router.back(-1);
			var vm = this;
		    this.$router.push({
            name: "cameraList",
            query: {
              cameraCodeCondition:vm.postData.cameraCodeCondition,
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

