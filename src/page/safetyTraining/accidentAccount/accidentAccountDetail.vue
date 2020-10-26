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
              事故编码：
              <label type="text" class="input-text" v-text="detailData.sgbh"></label>
            </span>
            <span>
              事故发生时间：
              <label type="text" class="input-text" v-text="detailData.sgfssj"></label>
            </span>
            <span>
              事故发生地点：
              <label type="text" class="input-text" v-text="detailData.sgfsdd"></label>
            </span>
            <span>
              事故类别：
              <label type="text" class="input-text" v-text="detailData.sglb"></label>
            </span>
            <span>
              事故性质：
              <label type="text" class="input-text" v-text="detailData.sgxz"></label>
            </span>
            <span>
              事故负责人：
              <label type="text" class="input-text" v-text="detailData.sgfzr"></label>
            </span>
            <span>
              事故经过：
              <label type="text" class="input-text" v-text="detailData.sgjg"></label>
            </span>
            <span>
              事故损失及危害：
              <label type="text" class="input-text" v-text="detailData.sgss"></label>
            </span>
            <span>
              防范措施：
              <label type="text" class="input-text" v-text="detailData.ffcs"></label>
            </span>
            <span>
              会议地点：
              <label type="text" class="input-text" v-text="detailData.hydd"></label>
            </span>
            <span>
              会议时间：
              <label type="text" class="input-text" v-text="detailData.hysj"></label>
            </span>
            <span>
              记录人：
              <label type="text" class="input-text" v-text="detailData.jlr"></label>
            </span>
            <span>
              主持人：
              <label type="text" class="input-text" v-text="detailData.zcr"></label>
            </span>
            <span>
              参会人员：
              <label type="text" class="input-text" v-text="detailData.chry"></label>
            </span>
            <span>
              事故主要负责人：
              <label type="text" class="input-text" v-text="detailData.zyfzr"></label>
            </span>
            <span>
              事故次要负责人：
              <label type="text" class="input-text" v-text="detailData.cyfzr"></label>
            </span>
            <span>
              事故原因分析：
              <label type="text" class="input-text" v-text="detailData.sgyy"></label>
            </span>
            <span>
              处理意见：
              <label type="text" class="input-text" v-text="detailData.clyj"></label>
            </span>
            <span>
              备注：
              <label type="text" class="input-text" v-text="detailData.bz"></label>
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
  import {accidentDetail} from "../../../api/safetyTraining/accidentAccount";

  export default {
    name: "accidentAccountDetail",
    data() {
      return {
        postData: {
          id: this.$route.query.id,
        },
        detailData: "",
      };
    },
    methods: {
      getDetail: function() {
        var vm = this;
        layer.load(2);
        accidentDetail(vm.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              //console.log(ret);
              vm.detailData=ret.data.detail;
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
          name: "accidentAccount",
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

