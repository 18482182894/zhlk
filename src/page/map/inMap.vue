<template>
  <div class="content">
    <div class="menuManage operationLog company">
      <div class="lookup">
        仓房：
        <select class="select-style excision" v-model="storehouse"  @change="getGranary();">
            <option value=''>请选择</option>
            <option :value="item" v-for="item in storehouseList" v-text="item.storehouseName"></option>
        </select>
        廒间：
        <select class="select-style excision" v-model="postData.warehouseName">
            <option value=''>请选择</option>
            <option :value="item.warehouseName" v-for="item in granaryList" v-text="item.warehouseName"></option>
        </select>
        摄像机名称：
        <input type="text" class="input-text excision"  v-model="postData.cameraName">

        <div class="btn btn-add" @click="getList(0)">
          <img src="../../../static/images/search.png" alt="">
          <label>查找</label>
        </div>
      </div>
      <div>
        <!-- <select name="" class="select-style">
            <option value="">显示条数</option>
        </select> -->
        <select name="" class="select-style" v-model="sortOrder" @change="changeSortOrder();">
          <option value="">排序方式</option>
          <option value="0">顺序</option>
          <option value="1">倒序</option>
        </select>
      </div>
      <table class="customTable">
        <thead>
            <tr>
              <th style="width: 5%;"><input type="checkbox" ></th>
              <th style="width: 5%;">序号</th>
              <th style="width: 10%;">监控点编码</th>
              <th style="width: 10%;">摄像机名称</th>
              <th style="width: 10%;">仓库</th>
              <th style="width: 10%;">廒间</th>
              <th style="width: 5%;">摄像机状态</th>

              <th style="width: 20%;">操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item,i) in listData">
                <td><input type="checkbox" ></td>
                <td v-if="sortOrder=='0'" v-text="i+1"></td>
                <td v-else v-text="listData.length-i"></td>
                <td v-text="item.cameraId"></td>
                <td v-text="item.cameraName"></td>
                <td v-text="item.storehouseName"></td>
                <td v-text="item.warehouseName"></td>
                <td v-text="item.cameraStatus"></td>
                <td>
                <div class="table-btn btn-yellow" @click="showCamera(item);">查看</div>
                </td>
            </tr>
        </tbody>
      </table>
      <!-- 分页容器 -->
      <div id="PageBar"></div>
    </div>
    <div class="camera-content" v-show="isShow==1" @click="closeCamera();">
        <input type="hidden" id="message" >
        <div class="hover-div hover-div-monitor " id="hover">
           <iframe src="" id="iframe"></iframe>
        </div>
    </div>
  </div>
</template>
<style scoped>

</style>
<script>
import {warehouseMonitorList,detailCamera } from "../../api/map/map";
import {storehouse,granary} from "@/api/systemManage/dropDown";  
    export default {
        name: "inMap",
      data() {
        return {
          isShow:0,//0隐藏，1显示
          allChecked: false,
          sortOrder: "0", //0 顺序，1 倒序
          postData:{
              storehouseName:'',
              warehouseName:'',
              cameraName:'',
              pageSize:10,
              pageNo:0
          },
          storehouse:'',
          listData: [],
          oLiveView:{
              iProtocol: 1,            // protocol 1：http, 2:https
              szIP: "",    // protocol ip
              szPort: "",            // protocol port
              szUsername: "",     // device username
              szPassword: "", // device password
              iStreamType: 2,          // stream 1：main stream  2：sub-stream  3：third stream  4：transcode stream
              iChannelID: 1,           // channel no
              bZeroChannel: false      // zero channel                
          },
          storehouseList:[],//仓房下拉
          granaryList:[]//廒间
        };
      },
      methods: {
        getList: function(pageNo) {
          //获取列表
          var vm = this;
          vm.postData.pageNo=pageNo;
          layer.load(2);
          warehouseMonitorList(vm.postData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                vm.listData = ret.data.dataList;
                laypage({
                      //分页
                      cont: "PageBar", //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                      pages: ret.page.totalPages, //通过后台拿到的总页数
                      curr: pageNo,
                      skin: "#95C93E", //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                      jump: function(obj, first) {
                        //触发分页后的回调
                        if (!first) {
                          //一定要加此判断，否则初始时会无限刷新
                          vm.getList(obj.curr);
                        }
                      }
                    });
              }else {
                if (ret.code == "500" && ret.data == "查询错误，没有数据") {
                  layer.msg("暂无数据");
                  vm.listData = [];
                } else {
                  layer.alert(ret.data, { closeBtn: 0 });
                }
              }
            })
            .catch(err => {
              layer.alert(err.data, { closeBtn: 0 });
            });
        },
        changeSortOrder: function() {
          var vm = this;
          vm.listData.reverse();
        },
        jumpDetail: function(id) {
          var vm = this;
          this.$router.push({
            name: "taskDetail",
            query: {
              id: id
            }
          });
        },
        getDropDown: function() {//获取下拉项
          var vm = this;
          
          storehouse()
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                console.log(ret)
                vm.storehouseList = ret.data.dataList;
              } else {
                if (ret.code == 500&&ret.data=='查询错误，没有数据') {
                    vm.storehouseList=[];
                }else{
                    layer.alert(ret.data, { closeBtn: 0 });
                }
              }
            })
            .catch(err => {
              layer.alert(err.data, { closeBtn: 0 });
            });
        },
        getGranary:function () {//廒间下拉列表
          var vm = this;
          // console.log(JSON.stringify(vm.storehouse))
          vm.postData.storehouseName = vm.storehouse.storehouseName;
          layer.load(2);
          granary(vm.storehouse.storehouseGbCode).then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                vm.granaryList = ret.data.dataList;
              } else {
                if (ret.code == 500&&ret.data=='查询错误，没有数据') {
                    vm.granaryList=[];
                }else{
                    layer.alert(ret.data, { closeBtn: 0 });
                }
              }
            })
            .catch(err => {
              layer.alert(err.data, { closeBtn: 0 });
            });            
        },
        showCamera:function (data) {
            var vm=this;
            vm.oLiveView.szIP=data.dvrIp;
            vm.oLiveView.szPort=data.dvrPort;
            vm.oLiveView.szUsername=data.userName;
            vm.oLiveView.szPassword=data.userPwd;
            vm.oLiveView.iChannelID=data.channelNo;
            vm.isShow=1; 
            console.log(vm.oLiveView)
            $('#message').val(JSON.stringify(vm.oLiveView)); 
            document.querySelector('#iframe').src='../../../static/html/camera.html';        
        },
        closeCamera:function () {
            var vm=this;
            vm.isShow=0;  
            console.log(document.querySelector('#iframe').contentWindow)
            document.querySelector('#iframe').contentWindow.closeCamera();           
        }
      },
      mounted() {
        var vm = this;
        vm.getList(1);
        vm.getDropDown();
      }
    };
</script>

