<template>
    <div class="content">
        <div class="desktop-middle">
            <!-- <div class="desktop-item">
                <img src="" alt="">
                <p>电子邮件</p>
            </div> -->
            <div class="desktop-item" toUrl="/system/company" @click="jump($event);">
                <img src="../../../../static/images/toupiao.png" alt="">
                <p>仓储企业</p>
            </div>
            <!-- <div class="desktop-item" toUrl="/system/libraryType" @click="jump($event);">
                <img src="../../../../static/images/news.png" alt="">
                <p>库点类型</p>
            </div> -->
            <div class="desktop-item" toUrl="/system/libraryManage" @click="jump($event);">
                <img src="../../../../static/images/gonggao.png" alt="">
                <p>库点管理</p>
            </div>
            <!-- <div class="desktop-item" toUrl="/system/gradeLY" @click="jump($event);">
                <img src="../../../../static/images/work.png" alt="">
                <p>粮油等级</p>
            </div> -->
            <div class="desktop-item" toUrl="/system/warehouse" @click="jump($event);">
                <img src="../../../../static/images/rizhi.png" alt="">
                <p>仓房管理</p>
            </div>
            <div class="desktop-item" toUrl="/system/granary" @click="jump($event);">
                <img src="../../../../static/images/xitong.png" alt="">
                <p>廒间管理</p>
            </div>
            <div class="desktop-item" toUrl="/system/goodsAllocation" @click="jump($event);">
                <img src="../../../../static/images/caiwu.png" alt="">
                <p>货位管理</p>
            </div>
            <div class="desktop-item" toUrl="/system/oilTank" @click="jump($event);">
                <img src="../../../../static/images/caiwu.png" alt="">
                <p>油罐管理</p>
            </div>
            <div class="desktop-item" toUrl="/system/grainVarieties" @click="jump($event);">
                <img src="../../../../static/images/richeng.png" alt="">
                <p>粮食品种</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'desktop',
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
