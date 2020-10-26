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
            <h3 class="notice-title" v-text="detailData.noticeTitle"></h3>
            <div>
                            <span>
                                类型：
                                <label v-text="detailData.noticeType"></label>
                            </span>
              <span>
                                发布时间：
                                <label v-text="detailData.releaseDatetime"></label>
                            </span>
              <span>
                                有效时间：
                                <label v-text="detailData.effcetiveDate"></label>
                            </span>
              <span>
                                发布人：
                                <label v-text="detailData.releasePersonName"></label>
                            </span>
              <span>
                                发布部门:
                                <label v-text="detailData.departmentName"></label>
                            </span>
              <div class="notice-content">
                <span>发布内容:</span>
                                <div v-html="detailData.noticeContents"></div>
                            </div>
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
  .notice-title{
    width: 100%;
    text-align: center;
    line-height: 45px;
    font-size: 18px;
    color: #333;
  }
    .notice-content{
        width: 100%;
        font-size: 14px;
        color: #333;
    }
</style>
<script>
  import {noticeDetail} from "../../../api/oa/notice";

  export default {
        name: "noticeDetail",
      data() {
        return {
          postData: {
            noticeId: this.$route.query.id,
          },
          detailData: ""
        };
      },
      methods: {
        getDetail: function() {
          var vm = this;
          layer.load(2);
          noticeDetail(vm.postData)
            .then(ret => {
              layer.closeAll("loading");
              console.log(JSON.stringify(ret))
              if (ret.code == 200) {
                vm.detailData = ret.data.result;
                const releaseDatetime = vm.detailData.releaseDatetime.slice(0,10)
                const effcetiveTime = vm.detailData.effcetiveDate.slice(0,10)
                const effcetiveTime1 = vm.detailData.effcetiveDate.slice(21,22)
                const effcetiveTime2 = vm.detailData.effcetiveDate.slice(22,32)
                vm.detailData.releaseDatetime = releaseDatetime
                vm.detailData.effcetiveDate = effcetiveTime + effcetiveTime1 + effcetiveTime2
              } else {
                layer.alert(ret.data, { closeBtn: 0 });
              }
            })
            .catch(err => {
              layer.alert(err.message, { closeBtn: 0 });
            });
        },
        detailBack:function () {
          var vm=this;
          let id=this.$route.query.id;
          let noticeTitle_transfer=this.$route.query.noticeTitle_transfer;
          let noticeType_transfer=this.$route.query.noticeType_transfer;
          let pageNo=this.$route.query.pageNo;
          this.$router.push({
            name: "noticeList",
            query: {
              id: id,
              noticeTitle:noticeTitle_transfer,
              noticeType:noticeType_transfer,
              pageNo:pageNo
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

