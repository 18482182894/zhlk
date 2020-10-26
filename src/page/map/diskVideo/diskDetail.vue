<template>
  <div class="content">
    <div class="menuManage userManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">硬盘录像机信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail">
            <div>
                            <span>
                                硬盘录像机名称：
                                <label v-text="detailData.dvrName"></label>
                            </span>
              <span>
                                硬盘录像机IP：
                                <label v-text="detailData.dvrIp"></label>
                            </span>
              <span>
                               硬盘录像机端口：
                                <label v-text="detailData.dvrPort"></label>
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
                                硬盘录像机ID：
                                <label v-text="detailData.dvrId"></label>
                            </span>
              <span>
                               外网IP：
                                <label v-text="detailData.dvrInternetIp"></label>
                            </span>
              <span>
                                外网端口号：
                                <label v-text="detailData.dvrInternetPort"></label>
                            </span>
              <span>
                                摄像机数量：
                                <label v-text="detailData.videoCamera"></label>
                            </span>
              <span>
                                是否流媒体：
                                <label v-text="detailData.streamingMedia==1?'是':'否'"></label>
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
import {detailDigitalVideoRecorder, } from "../../../api/map/map";
    export default {
        name: "diskDetail",
      data() {
        return {
          postData: {
            dvrCode:this.$route.query.id,
			dvrName:this.$route.query.dvrName,
			pageNo:this.$route.query.pageNo
          },
          detailData: ""
        };
      },
      methods: {
        getDetail: function() {
          var vm = this;
          layer.load(2);
          detailDigitalVideoRecorder(vm.postData)
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
          var vm = this;
		    this.$router.push({
            name: "diskList",
            query: {
              dvrName:vm.postData.dvrName,
			  pageNo:vm.postData.pageNo
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

