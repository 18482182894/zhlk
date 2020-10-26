<template>
  <div class="content">
    <div class="menuManage userManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">视频报警信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail">
            <div>
                            <!-- <span>
                                报警编号：
                                <label v-text="detailData.enterpriseName"></label>
                            </span> -->
              <span>
                                录像机：
                                <label v-text="detailData.dvrName"></label>
                            </span>
              <span>
                                通道号：
                                <label v-text="detailData.channelNo"></label>
                            </span>
              <span>
                                报警类型：
                                <label v-text="detailData.warningType"></label>
                            </span>
              <span>
                                报警时间：
                                <label v-text="detailData.warningDatetime"></label>
                            </span>
              <span>
                                报警原因：
                                <label v-text="detailData.warningReason"></label>
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
import {detailVideoAlarm} from "../../../api/map/map";
    export default {
        name: "videoWarningDetail",
      data() {
        return {
          postData: {
            warningId: this.$route.query.id,
			warningType:this.$route.query.warningType,
			pageNo:this.$route.query.pageNo
          },
          detailData: ""
        };
      },
      methods: {
        getDetail: function() {
          var vm = this;
          layer.load(2);
          detailVideoAlarm(vm.postData)
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
          //this.$router.back(-1);
		  var vm = this;
		  this.$router.push({
            name: "videoWarning",
            query: {
              warningType: vm.postData.warningType,
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

