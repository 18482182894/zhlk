<template>
    <main id="replace">
        <!-- 左侧菜单 -->
        <div class="main-left" style="opacity: 0.8;">
            <div class="logo">
                <img src="../../static/images/logo_big2.png" alt="">
                <!-- <h1 class="logo_title">百威智联</h1> -->
            </div>
            <ul class="menu-ul">
                <li v-for="item in moduleList" @mouseover="showMenu(item.childModuleLst);" @click="jump(item)"><a title="">
                    <i class="iconfont menu-icon" v-html="item.icon"></i>
                    <label v-text="item.moduleName">粮库业务</label>
                </a></li>
            </ul>
        </div>
        <!-- 二级菜单 -->
        <div class="menu-left" style="opacity: 0.8;" v-if="isShow==1" @click="closeMenu();">
            <div class="menu-left-content" @mouseleave="closeMenu();">
                <div v-for="item in childModuleList">
                    <h3><i class="h-icon"></i><label v-text="item.moduleName">菜单管理</label></h3>
                    <div class="menu-items">
                        <label  v-for="child in item.childModuleLst" @click="jump(child);" v-text="child.moduleName">菜单管理</label>
                    </div>
                </div>
            </div>
        </div>

        <div class="main-right">
            <div class="main-right-top">
                <div class="mrt-left">
                    <div class="title-route route-desktop" @click="jumpDesktop();">
                        <img src="static/images/icon_zhuomian.png" alt="">
                        <label>我的桌面</label>
                    </div>

                    <div class="title-route route-on">
                        <!-- <img src="static/images/" alt=""> -->
                        <label style="color:#4A90E2!important" mouseover="moduleName"></label>
                        <label >
                            <span v-if=" ($route.meta.path instanceof Array) == false" >{{$route.meta.name ? $route.meta.name : ''}}</span>
                            <span>
                                <router-link :key="index" v-for="(item,index) in $route.meta.path" v-if="$route.meta.path instanceof Array && index!=$route.meta.path.length-1" :to="item" class="fc-blue">{{$route.meta.name[index] ? $route.meta.name[index] : ''}}
                                    <span style="color:black" v-if="index!=$route.meta.path.length-1">></span>
                                </router-link>
                                <span style="color:black" v-if="index=$route.meta.path.length-1">{{$route.meta.name[index] ? $route.meta.name[index] : ''}}</span>
                            </span>
                        </label>

                        <!-- <div class="title-route route-on" v-if="showModule">
                            <img :src="showModule.icon" alt="">
                            <label v-text="showModule.moduleName"></label>
                        </div>  -->

                    </div>
                </div>
                <div class="mrt-right">
                    <label>您好！</label>
                    <label class="fc-blue text-under" v-text="postData.userName"></label>
                    <img src="static/images/warning.png" @click="jumpWarningList();" alt="">
                    <em class="news-icon" v-if="isSee" v-text="warningcnts"></em>
                    <!-- <img src="static/images/messege.png" alt="">
                    <em class="news-icon">1</em> -->
                    <img src="static/images/back.png" alt="" @click="exitLogon();">
                </div>
            </div>
            <router-view/>
			<div class="copyright">
			    <p>Copyright © 四川百威智联科技有限公司 © 版权所有</p>
			</div>
        </div>
    </main>
</template>

<style type="text/css" scoped>
    .logo_title {
      position: relative;
      /* top: -38px; */
      top: 130px;
      text-align: center;
      color: #CDA871;
      font-size: 26px;
      font-weight: normal;
      text-shadow: 1px 1px #8e8e4c;
    }
</style>

<script>
import {
    getModuleList
} from '@/api/login';
import { noReadWaringCnts } from '@/api/warning/showWarningList';
export default {
  name: 'App',
  data () {
    return {
      isShow: 0 ,// 控制menu-left显影，1为显示
      isSee: false,
      warningcnts: '',
      postData:{
        userName:JSON.parse(localStorage.getItem("userInfo")).userName,
        password:JSON.parse(localStorage.getItem("userInfo")).password
      },
      key:'',
      moduleList:[],
      threeModule:[],
      moduleName:'',
      childModuleList:[]
    }
  },
  methods: {
    getNavList (list) { //获取菜单列表
        var vm=this;
        layer.load(2);
        getModuleList(vm.postData).then(ret=>{
            layer.closeAll('loading');
            if (ret.code==200) {
                vm.moduleList=ret.data.moduleList;
            }else if(ret.code==500){
              //console.log('69')
              return false
            }else{
                layer.alert(ret.data, { closeBtn: 0 });
            }

        }).catch(err=>{
            layer.alert(err.data, { closeBtn: 0 });
        });
        // 获取报警记录(未读数量)
        noReadWaringCnts(vm.postData)
         .then(ret=>{
          layer.closeAll('loading');
            if (ret.code==200) {
                vm.warningcnts=ret.data.counts;
                if(vm.warningcnts >= 100) {
                  vm.isSee = true
                  vm.warningcnts = '99+'
                } else if(vm.warningcnts <= 0) {
                  vm.isSee = false
                }
            }else{
                layer.alert(ret.data, { closeBtn: 0 });
            }
         })
         .catch(err=>{
          layer.alert(err.data, { closeBtn: 0 });
         });
    },
    showMenu (list) { //展示二级菜单
        var vm = this;
        vm.childModuleList=list;
        if (list.length==0) {
          vm.childModuleList=list;
          vm.isShow = 0;
        }else{
          vm.childModuleList=list;
          vm.isShow = 1;
        }
    },
    closeMenu () { //隐藏二级菜单
      var vm = this;
      vm.isShow = 0;
    },
    jump (data) {
      var vm=this;
      if (data.childModuleLst) {
        if (data.childModuleLst.length==0) {
          // vm.key=Math.random();
          this.$router.push(data.moduleUrl);
          vm.closeMenu();
        }
      }else{
          // vm.key=Math.random();
        this.$router.push(data.moduleUrl);
        vm.closeMenu()
      }
    },
    jumpDesktop:function(){
      var vm=this;
          vm.$router.push({
            name: "index"
          });
    },
    jumpWarningList:function(){
      var vm = this;
      vm.$router.push({
        name:"showWarningList",
        query: {
           readFlag:'未读'
        }
      });
    },
    exitLogon () {//退出登录
        window.localStorage.removeItem("userInfo");
        this.$router.push({path:'/login'},function(){location.reload();})
    }
  },
  mounted () {
    var vm=this;
    // console.log( this.$route.meta.path instanceof Array)
    vm.getNavList();
  }
}
</script>
