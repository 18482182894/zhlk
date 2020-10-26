
<template>
  <div class="content">
    <div class="desktop-middle">
      <div class="desktop-item" toUrl="/devicesManage/device/basicinfo" @click="jump($event);">
        <img src="../../../../static/images/rizhi.png" alt="">
        <p>设备基础信息</p>
      </div>
      <div class="desktop-item" toUrl="/devicesManage/device/standing" @click="jump($event);">
        <img src="../../../../static/images/caiwu.png" alt="">
        <p>设备台账</p>
      </div>
      <div class="desktop-item" toUrl="/devicesManage/device/putin" @click="jump($event);">
        <img src="../../../../static/images/xitong.png" alt="">
        <p>设备入库</p>
      </div>
      <div class="desktop-item" toUrl="/devicesManage/device/initialize" @click="jump($event);">
        <img src="../../../../static/images/richeng.png" alt="">
        <p>设备初始化</p>
      </div>
      <div class="desktop-item" toUrl="/devicesManage/device/build" @click="jump($event);">
        <img src="../../../../static/images/news.png" alt="">
        <p>设备安装</p>
      </div>
      <div class="desktop-item" toUrl="/devicesManage/device/maintain" @click="jump($event);">
        <img src="../../../../static/images/gonggao.png" alt="">
        <p>设备保养</p>
      </div>
      <div class="desktop-item" toUrl="/devicesManage/device/debug" @click="jump($event);">
        <img src="../../../../static/images/caiwu.png" alt="">
        <p>设备调试</p>
      </div>
      <div class="desktop-item" toUrl="/devicesManage/device/fault" @click="jump($event);">
        <img src="../../../../static/images/toupiao.png" alt="">
        <p>设备故障</p>
      </div>
      <div class="desktop-item" toUrl="/devicesManage/device/check" @click="jump($event);">
        <img src="../../../../static/images/caiwu.png" alt="">
        <p>设备验收</p>
      </div>
      <div class="desktop-item" toUrl="/devicesManage/device/repair" @click="jump($event);">
        <img src="../../../../static/images/caiwu.png" alt="">
        <p>设备维修</p>
      </div>
      <!-- <div class="desktop-item" toUrl="/devicesManage/device/return" @click="jump($event);">
        <img src="../../../../static/images/caiwu.png" alt="">
        <p>设备借用</p>
      </div> -->
      <div class="desktop-item" toUrl="/devicesManage/device/return" @click="jump($event);">
        <img src="../../../../static/images/caiwu.png" alt="">
        <p>设备归还</p>
      </div>
      <div class="desktop-item" toUrl="/devicesManage/device/scrap" @click="jump($event);">
        <img src="../../../../static/images/caiwu.png" alt="">
        <p>设备报废</p>
      </div>
    </div>
  </div>
</template>


<script>
  // import {} from "@/api/business/plan"
  export default {
    name: "device",
    data () {
      return {
      }
    },
    methods: {
      jump (event) {
        let vm=this;
        let dom=event.currentTarget;
        let url = dom.getAttribute('toUrl');
        this.$router.push(url);
      }
    },
    mounted() {
    },
  }
</script>

<style scoped>

</style>

