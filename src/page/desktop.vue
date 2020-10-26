<template>
  <div class="content">
    <div class="desktop-middle">
      <!-- <div class="desktop-item">
          <img src="" alt="">
          <p>电子邮件</p>
      </div> -->
      <!--<div class="desktop-item">
          <img src="../../static/images/news.png" alt="">
          <p>新闻</p>
      </div>-->
      <div class="desktop-item" @click="jumpNoticeList();">
        <img src="../../static/images/gonggao.png" alt="">
        <p>公告通知</p>
      </div>
      <div class="desktop-item" @click="jumpApprovalList();">
        <img src="../../static/images/work.png" alt="">
        <p>我的工作</p>
      </div>
      <div class="desktop-item" @click="jumpWorkplanList();">
        <img src="../../static/images/richeng.png" alt="">
        <p>工作计划</p>
      </div>
      <!--<div class="desktop-item">
          <img src="../../static/images/toupiao.png" alt="">
          <p>投票</p>
      </div>-->
      <!--<div class="desktop-item">
          <img src="../../static/images/rizhi.png" alt="">
          <p>工作日志</p>
      </div>-->
      <!--<div class="desktop-item">
          <img src="../../static/images/xitong.png" alt="">
          <p>系统设置</p>
      </div>-->
      <!--<div class="desktop-item">
          <img src="../../static/images/caiwu.png" alt="">
          <p>财务管理</p>
      </div>-->
    </div>
  </div>
</template>
<style type="text/css" scoped>
  .copyright {
    width: 100%;
    height: 1.87rem;
    background-color: #363636;
    text-align: center;
    line-height: 1.87rem;
    color: #ffffff;
    font-size: 1rem;
    position: fixed;
    bottom: 0;
  }
</style>
<script>
  export default {
    name: 'desktop',
    data () {
      return {
      }
    },
    methods: {
      jumpNoticeList: function() {
        var vm = this;
        this.$router.push({
          name: "noticeList",
        });
      },
      jumpApprovalList: function() {
        var vm = this;
        this.$router.push({
          name: "approvalList",
        });
      },
      jumpWorkplanList: function() {
        var vm = this;
        this.$router.push({
          name: "workplanList",
        });
      },
    },
    mounted() {
    },
  }

</script>
