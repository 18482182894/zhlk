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
              检查时间：
              <label type="text" class="input-text" v-text="detailData.jcsj"></label>
            </span>
            <span>
              检查类型：
              <label type="text" class="input-text" v-text="detailData.jclx"></label>
            </span>
            <span>
              组织检查人：
              <label type="text" class="input-text" v-text="detailData.zzjcr"></label>
            </span>
            <span>
              记录人：
              <label type="text" class="input-text" v-text="detailData.jlr"></label>
            </span>
            <span>
              受查单位或部门：
              <label type="text" class="input-text" v-text="detailData.scdwhbm"></label>
            </span>
            <span>
              参加人员：
              <label type="text" class="input-text" v-text="detailData.cjry"></label>
            </span>
            <span>
              检查情况及存在问题：
              <label type="text" class="input-text" v-text="detailData.jcqkjczwt"></label>
            </span>
            <span>
              处理措施及意见：
              <label type="text" class="input-text" v-text="detailData.clcsjyj"></label>
            </span>
            <span>
              被查单位负责人：
              <label type="text" class="input-text" v-text="detailData.bjcdwfzr"></label>
            </span>
            <span>
              检查负责人：
              <label type="text" class="input-text" v-text="detailData.jcdwfzr"></label>
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
  import {checkDetail} from "../../../api/safetyTraining/checklistAccount";

  export default {
    name: "checklistAccountDetail",
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
        checkDetail(vm.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.detailData=ret.data.safetyCheck;
              //console.log(vm.detailData);
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
          name: "checklistAccount",
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

