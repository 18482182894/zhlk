<template>
  <div class="content">
    <div class="menuManage roleManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">基础信息详情</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <span>
              检查编码：
              <label type="text" class="input-text" v-text="detailData.jcbh"></label>
            </span>
            <span>
              受查单位：
              <label type="text" class="input-text" v-text="detailData.scdw"></label>
            </span>
            <span>
              受查日期：
              <label type="text" class="input-text" v-text="detailData.scrq"></label>
            </span>
            <span style="display: none;">
              限定日期：
              <label type="text" class="input-text" v-text="detailData.xdrq"></label>
            </span>
            <span style="display: none;">
              上报单位：
              <label type="text" class="input-text" v-text="detailData.sbdw"></label>
            </span>
            <span>
              存在问题：
              <label type="text" class="input-text" v-text="detailData.czwt"></label>
            </span>
            <span>
              检查人：
              <label type="text" class="input-text" v-text="detailData.jcr"></label>
            </span>
            <span>
              整改负责人：
              <label type="text" class="input-text" v-text="detailData.zgfzr"></label>
            </span>
            <span>
              检查处理意见：
              <label type="text" class="input-text" v-text="detailData.jcclyj"></label>
            </span>
            <span>
              受查单位意见：
              <label type="text" class="input-text" v-text="detailData.scdwyj"></label>
            </span>
            <span>
              班组负责人：
              <label type="text" class="input-text" v-text="detailData.bzfzr"></label>
            </span>
            <span>
              填表日期：
              <label type="text" class="input-text" v-text="detailData.tbrq"></label>
            </span>
            <span>
              通知单号：
              <label type="text" class="input-text" v-text="detailData.tzdh"></label>
            </span>
            <span style="display: none;">
              汇报单位：
              <label type="text" class="input-text" v-text="detailData.hbdw"></label>
            </span>
            <span>
              整改内容：
              <label type="text" class="input-text" v-text="detailData.zgnr"></label>
            </span>
            <span>
              整改措施：
              <label type="text" class="input-text" v-text="detailData.zgcs"></label>
            </span>
            <span>
              验收结果：
              <label type="text" class="input-text" v-text="detailData.ysjg"></label>
            </span>
            <span>
              验收人：
              <label type="text" class="input-text" v-text="detailData.ysr"></label>
            </span>
            <span style="display: none;">
              完成日期：
              <label type="text" class="input-text" v-text="detailData.wcrq"></label>
            </span>
            <span style="display: none;">
              反馈日期：
              <label type="text" class="input-text" v-text="detailData.fkrq"></label>
            </span>
            <span>
              是否删除：
              <label type="text" class="input-text" v-if="detailData.sfsc == 0">{{ '否' }}</label>
              <label type="text" class="input-text" v-if="detailData.sfsc == 1">{{ '是' }}</label>
            </span>
          </div>
        </div>
      </div>
      <div class="edit-btn" style="margin-bottom: 20px;">
        <button class="edit-back" @click="detailBack();">返回</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .userManage-detail >span{
    font-size: 14px;
    color: #4A4A4A;
    display: inline-block;
    vertical-align: middle;
    width: 24%;
    min-width: 20%;
    padding: 15px 10px 15px 0;
    box-sizing: border-box;
  }
  .input-text{
    border: 0px;
  }
</style>

<script>
  import {rectificationDetail} from "../../../api/safetyTraining/rectificationAccounts";

  export default {
    name: "rectificationAccountsDetail",
    data() {
      return {
        postData: {
          jcbh: this.$route.query.jcbh,
        },
        detailData: "",
      };
    },
    methods: {
      getDetail: function() {
        var vm = this;
        layer.load(2);
        rectificationDetail(vm.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.detailData=ret.data.safetyAbarbeitung;
              console.log(vm.detailData);
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
          name: "rectificationAccounts",
          query: {}
        });
      }
    },
    mounted() {
      var vm = this;
      vm.getDetail();
    }
  };
</script>

