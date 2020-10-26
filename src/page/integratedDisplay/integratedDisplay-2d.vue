<template>
  <div class="content">
    <div class="comprehensive">
        <div class="comprehensive-top">
            <div :class="isShow==1?'top-item top-this':'top-item'" @click="changeItem(1);">仓房信息</div>
            <div :class="isShow==2?'top-item top-this':'top-item'" @click="changeItem(2);">储粮情况</div>
            <div :class="isShow==3?'top-item top-this':'top-item'" @click="changeItem(3);">三温两湿</div>
            <div :class="isShow==4?'top-item top-this':'top-item'" @click="changeItem(4);">虫害监控</div>
            <div :class="isShow==5?'top-item top-this':'top-item'" @click="changeItem(5);">气体监控</div>
            <div :class="isShow==6?'top-item top-this':'top-item'" @click="changeItem(6);">视屏监控</div>
            <div :class="isShow==7?'top-item top-this':'top-item'" @click="changeItem(7);">设备管理</div>
        </div>
        <div v-if="isShow==6" class="comprehensive-content">
            <div class="fictitious" id="fictitious">
                <img src="../../../static/images/show-2d.jpg" alt="" @click="closeCamera();">
                <div class="Camera-item" v-for="item in listData" v-bind:style="item.style" @click="showCamera(item);"></div>
            </div>
            <input type="hidden" id="message" >
            <div class="hover-div hover-div-monitor " v-show="cameraShow==1" id="hover">
            <iframe src="" id="iframe"></iframe>
            </div>
        </div>
        <div v-else class="comprehensive-content">
          <div class="fictitious" id="fictitious">
            <div class="fictitious-main">
              <div class="cf-item" style="position: absolute;top: 12%;left: 16%;">
                <!--<div class="cf-item-child" @mouseover="hoverDiv('w201843228835202101','s201843219929049101');">1</div>-->
                <div class="cf-item-child" @mouseover="hoverDiv('w201954262645108118','s201954194653957102');"></div>
              </div>
              <div class="cf-item" style="position: absolute;top: 12%;left: 31%;">
                <!--<div class="cf-item-child" @mouseover="hoverDiv('w201843228940029102','s201843219940501102');">2</div>-->
                <div class="cf-item-child" @mouseover="hoverDiv('w201954263079935119','s201954260742708103');"></div>
              </div>
              <div class="cf-item" style="position: absolute;top: 12%;left: 52%;">
                <!--<div class="cf-item-child" @mouseover="hoverDiv('w201843229278167103','s201843219943913103');">3</div>-->
                <div class="cf-item-child" @mouseover="hoverDiv('w201954268954462120','s201954260899136104');"></div>
              </div>
              <div class="cf-item" style="position: absolute;top: 12%;left: 69%;">
                <!--<div class="cf-item-child" @mouseover="hoverDiv('w201844774594286102','s201844774082089101');">4</div>-->
                <div class="cf-item-child" @mouseover="hoverDiv('w201954272027046121','s201954261078977105');"></div>
              </div>
              <div class="cf-item" style="position: absolute;top: 31%;left: 16%;">
                <!--<div class="cf-item-child" @mouseover="hoverDiv('w201951234190526102','s201951239217901104');">5</div>-->
                <div class="cf-item-child" @mouseover="hoverDiv('w201954272201615122','s201954261219256106');"></div>
              </div>
              <div class="cf-item" style="position: absolute;top: 31%;left: 31%;">
                <!--<div class="cf-item-child" @mouseover="hoverDiv('w201947450667833101','s201947447071984103');">6</div>-->
                <div class="cf-item-child" @mouseover="hoverDiv('w201954272340163123','s201954261369239107');"></div>
              </div>
              <div class="cf-item" style="position: absolute;top: 33%;left: 53%;">
                <!--<div class="cf-item-child" @mouseover="hoverDiv('w201951239690370105','s201947550850895101');">7</div>-->
                <div class="cf-item-child" @mouseover="hoverDiv('w201954272492377124','s201954261483513108');"></div>
              </div>
              <div class="cf-item" style="position: absolute;top: 33%;left: 71%;">
                <!--<div class="cf-item-child" @mouseover="hoverDiv('w201843229278167103','s201843219943913103');">8</div>-->
                <div class="cf-item-child" @mouseover="hoverDiv('w201954272671080125','s201954261587038109');"></div>
              </div>
              <div class="cf-item" style="position: absolute;top: 53%;left: 15%;">
                <!--<div class="cf-item-child" @mouseover="hoverDiv('w201843229278167103','s201843219943913103');">9</div>-->
                <div class="cf-item-child" @mouseover="hoverDiv('w201954272850562126','s201954261706021110');"></div>
              </div>
              <div class="cf-item" style="position: absolute;top: 54%;left: 32%;">
                <!--<div class="cf-item-child" @mouseover="hoverDiv('w201844774594286102','s201844774082089101');">10</div>-->
                <div class="cf-item-child" @mouseover="hoverDiv('w201954273001293127','s201954261797284111');"></div>
              </div>
              <div class="cf-item" style="position: absolute;top: 55%;left: 54%;">
                <!--<div class="cf-item-child" @mouseover="hoverDiv('w201951234190526102','s201951239217901104');">11</div>-->
                <div class="cf-item-child" @mouseover="hoverDiv('w201954273122337128','s201954261898126112');"></div>
              </div>
              <div class="cf-item" style="position: absolute;top: 55%;left: 74%;">
                <!--<div class="cf-item-child" @mouseover="hoverDiv('w201947450667833101','s201947447071984103');">12</div>-->
                <div class="cf-item-child" @mouseover="hoverDiv('w201954273355127129','s201954262005535113');"></div>
              </div>
              <div class="cf-item" style="position: absolute;top: 76%;left: 14%;">
                <!--<div class="cf-item-child" @mouseover="hoverDiv('w201843228835202101','s201843219929049101');">13</div>-->
                <div class="cf-item-child" @mouseover="hoverDiv('w201954273624079130','s201954262094380114');"></div>
              </div>
              <div class="cf-item" style="position: absolute;top: 78%;left: 33%;">
                <!--<div class="cf-item-child" @mouseover="hoverDiv('w201947450667833101','s201947447071984103');">14</div>-->
                <div class="cf-item-child" @mouseover="hoverDiv('w201954273806557131','s201954262187390115');"></div>
              </div>
              <div class="cf-item" style="position: absolute;top: 79%;left: 55%;">
                <!--<div class="cf-item-child" @mouseover="hoverDiv('w201844774594286102','s201844774082089101');">15</div>-->
                <div class="cf-item-child" @mouseover="hoverDiv('w201954273952951132','s201954262295174116');"></div>
              </div>
              <div class="cf-item" style="position: absolute;top: 81%;left: 76%;">
                <!--<div class="cf-item-child" @mouseover="hoverDiv('w201843229278167103','s201843219943913103');">16</div>-->
                <div class="cf-item-child" @mouseover="hoverDiv('w201954274269748133','s201954262401054117');"></div>
              </div>
            </div>
            <div v-if="isShow==1"  class="hover_div" id="hover">
                <div class="close" @click="hideDiv" >×</div>
                <p>仓房：<label v-text="storehouseInfo.storehouseName"></label></p>
                <p>仓库类型：<label v-text="storehouseInfo.storehouseType"></label></p>
                <p>仓房状态：<label v-text="storehouseInfo.storehouseState"></label></p>
                <p><label class="fc-blue" @click="jumpDetail(storehouseInfo.storehouseGbCode);">详情</label></p>
            </div>
            <div v-if="isShow==2" class="hover_div" id="hover">
                <div class="close" @click="hideDiv" >×</div>
                <p>廒间：<label v-text="warehouseInfo.warehouseName"></label></p>
                <p>品种：<label v-text="warehouseInfo.realGrainLoading"></label> </p>
                <p>设计容量：<label v-text="warehouseInfo.designCapacity"></label></p>
                <p>当前容量：<label v-text="warehouseInfo.nowQuantity"></label> </p>
                <p>状态：<label v-text="warehouseInfo.currentState"></label></p>
                <p><label class="fc-blue" @click="jumpDetail(warehouseInfo.warehouseGbCode)">详情</label></p>
            </div>
            <div v-if="isShow==3" class="hover_div" id="hover">
                <div class="close" @click="hideDiv" >×</div>
                <p>仓房：<label v-text="temperatureDetail.storehouseName"></label></p>
                <p>廒间：<label v-text="temperatureDetail.warehouseName"></label></p>
                <p>仓内温度：<label v-text="temperatureDetail.insideTemperature"></label></p>
                <p>仓内湿度：<label v-text="temperatureDetail.insideHumidity"></label></p>
                <p>仓外温度：<label v-text="temperatureDetail.outsideTemperature"></label></p>
                <p>仓外湿度：<label v-text="temperatureDetail.outsideHumidity"></label></p>
                <p>平均粮温：<label v-text="temperatureDetail.avgTemperature"></label></p>
                <p><label class="fc-blue" @click="jumpDetail();">详情</label></p>
            </div>
            <div v-if="isShow==4" class="hover_div" id="hover">
                <div class="close" @click="hideDiv" >×</div>
                <p>仓房：<label v-text="insectPestData.storehouseName"></label></p>
                <p>廒间：<label v-text="insectPestData.warehouseName"></label></p>
                <p>虫类：<label v-text="insectPestData.insectKind"></label></p>
                <p>数量：<label v-text="insectPestData.quantity"></label></p>
                <p>密度：<label v-text="insectPestData.density"></label></p>
                <p><label class="fc-blue" @click="jumpDetail">详情</label></p>
            </div>
            <div v-if="isShow==5" class="hover_div" id="hover">
                <div class="close" @click="hideDiv" >×</div>
                <p>仓房：<label v-text="gasDetail.storehouseName"></label></p>
                <p>廒间：<label v-text="gasDetail.warehouseName"></label></p>
                <p>O<sub>2</sub>：<label v-text="gasDetail.avO2"></label></p>
                <p>CO<sub>2</sub>：<label v-text="gasDetail.avCo2"></label></p>
              <p>SO<sub>2</sub>F<sub>2</sub>：<label v-text="gasDetail.avN2"></label></p>
                <p>PH<sub>3</sub>：<label v-text="gasDetail.avPh3"></label></p>
                <p><label class="fc-blue" @click="jumpDetail">详情</label></p>
            </div>
            <div v-if="isShow==7" class="hover_div" id="hover">
                <div class="close" @click="hideDiv" >×</div>
                <p>仓房：<label v-text="equipmentDetail.storehouseName"></label></p>
                <p>廒间：<label v-text="equipmentDetail.warehouseName"></label></p>
                <p v-for="item in equipmentDetail.detail"><label v-text="item.deviceName+'：'"></label><label v-text="item.count"></label></p>
                <p><label class="fc-blue" @click="jumpDetail">控制</label></p>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>
<style type="text/css" scoped >
  .comprehensive-content{
      top: 80px;
      overflow: auto;
  }
  .comprehensive-content .fictitious{
    width: 1658px;
    height: 896px;
    position: relative;
      background: url(../../../static/images/show-2d.jpg);
      background-size: 100% 100%;
  }
  #fictitious img{
    width: 100%;
    height:100%;
  }
  .comprehensive-content .fictitious .Camera-item{
      width: 30px;
      height: 30px;
      position: absolute;
      background: url(../../../static/images/monitor.png);
  }
  .fictitious-main{
    position: absolute;
    width: 54%;
    height: 50%;
    left: 50%;
    top: 15%;
    transform: translate(-50%,0%) skew(133deg,197deg);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }
  .fictitious-main .cf-item{
    cursor: pointer;
    width: 14%;
    margin: -2% 0 0 0;
    height: 46px;
    display: flex;
  }
  .fictitious-main .cf-item .cf-item-child{
    width: 100%;
  }
  .hover_div{
      width: 175px;
      border-radius: 8px;
      background: rgba(255,255,255,0.6);
      padding: 18px;
      display: none;
      position: absolute;
  }
  .hover_div p{
    line-height: 20px;
    font-size: 12px;
    color: #000000;
  }
  .hover_div .close{
      position: absolute;
      right: 5px;
      top: 5px;
  }
  .hover_div-monitor{
    width: auto;
  }
  .bottom-div{
    width: 50%;
    background-color: rgb(207,170,82);
    border-radius: 5px;
    color: white;
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin-top: 20px;
    font-weight: bold;
  }
  .text-div{
    width: 60%;
   margin-top: 20px;
    font-weight: bold;
  }
  .add-minus{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 60%;
    margin-top: 10px;
    font-weight: bold;
  }
  .add-icon{
    width: 30%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .add-icon img{
    width: 30%;
  }
  .btn-div{
    display: flex;
    flex-direction: column;
    align-items: center;

  }
  .check-div{
    width: 100%;
    height: 150px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 10px;

  }
  .check-div img{
   width: 55%;
  }
  .tittle-div{
    background-color: rgb(149,201,62);
    color: white;
    border-radius: 5px;
    height: 30px;
    width: 100%;
    text-align: center;
    line-height: 30px;
    font-size: 15px;
  }
  .map{
    width: 96%;
    margin: 2%;
    height: 600px;
    border: 1px black solid;
    margin-top: 50px;
      background: url(../../../static/images/show-2d.jpg);
      background-size: 100% 100%;
  }
  .img{
    border: 1px black solid;
    width: 60%;
  }
  .img img{
    width: 100%;
    height: 100%;
  }
  .btn-div{
    width: 35%;
    margin-left: 30px;
  }
  .use-div{
    display: flex;
    flex-direction: row;
    width: 700px;
    height: 350px;
    /*border: black 1px solid;*/
    /*background: #fff;*/
    /*box-shadow: gainsboro 0px 2px 5px 1px ;*/
  }
</style>
<script>
import { warehouseDetail } from '@/api/systemManage/basicData/warehouse'
import { granaryDetail } from "@/api/systemManage/granary";
import { granaryStatus } from "@/api/systemManage/dropDown";
import { grainDetail} from '@/api/systemManage/basicData/grainVarieties'
import {fetchGrainTemperature  } from "@/api/intelligentWarehous/grainSituation";
import {fetchInsectPestList} from '@/api/intelligentWarehous/grainSituation';
import {fetchGasList} from "@/api/intelligentWarehous/grainSituation";
import {reservoirMonitorList} from "@/api/map/map";
import {equipmentStatistics} from "@/api/IOT/iot";
import {getDvr} from "@/api/business/warehousingStock/inventory";

export default {
  name: "document",
  data() {
    return {
        isShow:1,//切换展示内容
        storehouseInfo:'',//仓房信息
        warehouseInfo:'',//廒间信息
        temperatureDetail:'',//三温两湿
        insectPestData:'',//虫害监控
        gasDetail:'',//气体
        selectStorehouse:'',
        selectWarehouse:'',
        equipmentDetail:{
            storehouseName:'',
            warehouseName:'',
            detail:'',
        },//设备
        clientX:'',
        clientY:'',
        cameraShow:0,//0隐藏，1显示
        postData:{
            cameraName:'',
            pageSize:1000,
            pageNo:0
        },
        listData: [],//库区摄像头列表
        oLiveView:{
            iProtocol: 1,            // protocol 1：http, 2:https
            szIP: "",    // protocol ip
            szPort: "",            // protocol port
            szUsername: "",     // device username
            szPassword: "", // device password
            iStreamType: 1,          // stream 1：main stream  2：sub-stream  3：third stream  4：transcode stream
            iChannelID: 1,           // channel no
            bZeroChannel: false      // zero channel
        }
    };
  },
  methods: {
    hoverDiv:function(id,storehouseGbCode){
        var vm=this;
        vm.selectStorehouse=storehouseGbCode;
        vm.selectWarehouse=id;
        vm.clientX=event.clientX;
        vm.clientY=event.clientY;
        switch (parseInt(vm.isShow)) {
          case 1:
            warehouseDetail({storehouseGbCode:storehouseGbCode}).then(ret=>{
                if (ret.code==200) {
                    vm.storehouseInfo=ret.data.dataMap;
                    //console.log(vm.storehouseInfo);
                    vm.storehouseInfo.storehouseType=ret.data.dataMap.storehouseType[0].dicInfoValue;
                    vm.storehouseInfo.storehouseState=ret.data.dataMap.storehouseState[0].dicInfoValue;
                    vm.showDiv(id);
                }else{
                    // layer.alert(ret.data, { closeBtn: 0 });
                }

            }).catch(err=>{
                // layer.alert(err.data, { closeBtn: 0 });
            });
            break;
          case 2:
            granaryDetail({warehouseGbCode:id}).then(ret=>{
                if (ret.code==200) {
                  var data=ret.data.dataMap;
                  grainDetail({grainVarietyId:data.realGrainLoading}).then(ret=>{
                      layer.closeAll('loading');
                      if (ret.code==200) {
                          data.realGrainLoading=ret.data.grainVariety.grainVarietyName;

                      }else{
                        //   layer.alert(ret.data, { closeBtn: 0 });
                      }

                  }).catch(err=>{
                    //   layer.alert(err.data, { closeBtn: 0 });
                  });
                  granaryStatus()
                    .then(ret => {//当前状态
                      if (ret.code == 200) {
                        var granaryStatusList = ret.data.dataList;

                          for (var i = granaryStatusList.length - 1; i >= 0; i--) {
                            if (granaryStatusList[i].dicInfoCode==data.currentState) {

                              data.currentState=granaryStatusList[i].dicInfoValue;
                            }
                          }
                      } else {
                        layer.alert(ret.data, { closeBtn: 0 });
                      }
                    })
                    .catch(err => {
                      layer.alert(err.data, { closeBtn: 0 });
                    });

                  vm.warehouseInfo=data;
                    vm.showDiv(id);
                }else{
                    // layer.alert(ret.data, { closeBtn: 0 });
                }

            }).catch(err=>{
                // layer.alert(err.data, { closeBtn: 0 });
            });

            break;
          case 3:
                fetchGrainTemperature({storehouseGbCode: storehouseGbCode,warehouseGbCode: id,startTime: '',endTime: '',})
                .then((ret) => {
                    layer.closeAll("loading");
                    if (ret.code == 200) {
                        //console.log(JSON.stringify(ret))
                        vm.temperatureDetail = ret.data.temperatureDetail;
                        vm.showDiv(id);
                    } else {
                        if (ret.code == "500" && ret.data == "查询错误，没有数据") {
                            layer.msg("暂无数据");
                        } else {
                            // layer.alert(ret.data, {closeBtn: 0});
                        }
                    }
                })
                .catch(err => {
                    layer.closeAll("loading");
                    // layer.alert(err.message, {closeBtn: 0});
                });

            break;
          case 4:
                fetchInsectPestList({storehouseGbCode: storehouseGbCode,warehouseGbCode: id,pageSize: 1,pageNo: 0})
                .then(ret => {
                    layer.closeAll("loading");
                    if (ret.code == 200) {
                        vm.insectPestData = ret.data.dataList[0];
                        vm.showDiv(id);
                    } else {
                        if (ret.code == "500" && ret.data == "查询错误，没有数据") {
                            layer.msg("暂无数据");
                        } else {
                            // layer.alert(ret.data, {closeBtn: 0});
                        }
                    }
                })
                .catch(err => {
                    layer.closeAll("loading");
                    // layer.alert(err.data, {closeBtn: 0});
                });

            break;
          case 5:
                fetchGasList({storehouseGbCode: storehouseGbCode,warehouseGbCode: id,pageSize: 1,pageNo: 0})
                .then(ret => {
                    layer.closeAll("loading");
                    if (ret.code == 200) {
                        vm.gasDetail = ret.data.gasMonitorList[0];
                        vm.showDiv(id);
                    } else {
                        if (ret.code == "500" && ret.data == "查询错误，没有数据") {
                            layer.msg("暂无数据");
                        } else {
                            // layer.alert(ret.data, {closeBtn: 0});
                        }
                    }
                })
                .catch(err => {
                    layer.closeAll("loading");
                    // layer.alert(err.message, {closeBtn: 0});
                });

            break;
          case 6:

            break;
          case 7:
                equipmentStatistics({storehouseGbCode: storehouseGbCode,warehouseGbCode: id,})
                .then(ret => {
                    layer.closeAll("loading");
                    if (ret.code == 200) {
                        vm.equipmentDetail = ret.data;
                        vm.showDiv(id);
                    } else {
                        if (ret.code == "500" && ret.data == "查询错误，没有数据") {
                            layer.msg("暂无数据");
                        } else {
                            // layer.alert(ret.data, {closeBtn: 0});
                        }
                    }
                })
                .catch(err => {
                    layer.closeAll("loading");
                    // layer.alert(err.message, {closeBtn: 0});
                });

            break;
        }
    },
    showDiv:function (id) {
        var vm=this;
        var oDiv = $("#fictitious");
        var offset = oDiv.offset();
        var y = vm.clientY ; //鼠标据顶部的距离
        var x = vm.clientX ; //鼠标据左部的距离
        var t = offset.top; //div距顶部的距离
        var l = offset.left; //div距左部的距离
        $('#hover').css('display','block');
        $('#hover').css('top',y-t+2);
        $('#hover').css('left',x-l-175);
    },
    hideDiv:function () {
        $('#hover').css('display','none');
    },
    jumpDetail:function(id){
        var vm=this;
        switch (parseInt(vm.isShow)) {
            case 1:
                this.$router.push({
                    name: "warehouseDetail",
                    query: {
                        id: id
                    }
                });
                break;
            case 2:
                this.$router.push({
                    name: "granaryDetail",
                    query: {
                        id: id
                    }
                });
                break;
            case 3:
                this.$router.push({
                    name: "temperature",
                    query: {selectStorehouse, selectWarehouse}
                });
                break;
            case 4:
                this.$router.push({
                    name: "insectPest",
                    query: {selectStorehouse, selectWarehouse}
                });
                break;
            case 5:
                this.$router.push({
                    name: "gasDetection",
                    query: {selectStorehouse, selectWarehouse}
                });
                break;
            case 6:

            case 7:
                this.$router.push({
                    name: "aerationIndex",
                    query: {selectStorehouse, selectWarehouse}
                });
                break;
        }
    },
    changeItem:function (num) {
        var vm=this;
        vm.isShow=num;
        if(num==6){
            vm.getList();
        }
    },
    getList: function() {
      //获取列表
      var vm = this;
      layer.load(2);
      reservoirMonitorList(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            for (var i = 0; i < ret.data.dataList.length; i++) {
              ret.data.dataList[i]['style']={
                left:ret.data.dataList[i].cameraPosition.split(',')[0]+'px',
                top:ret.data.dataList[i].cameraPosition.split(',')[1]-30+'px'
              }
            }
            vm.listData = ret.data.dataList;
            //console.log(JSON.stringify(vm.listData));
          }else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    showCamera:function (data) {
      var vm=this;
      //console.log(data);
      vm.oLiveView.szIP=data.dvrIp;
      vm.oLiveView.szPort=data.dvrPort;
      vm.oLiveView.szUsername=data.userName;
      vm.oLiveView.szPassword=data.userPwd;
      vm.oLiveView.iChannelID=data.channelNo;
      vm.cameraShow=1;
      //console.log(vm.oLiveView);
      $('#message').val(JSON.stringify(vm.oLiveView));
      document.querySelector('#iframe').src='../../../static/html/camera.html';
    },
    closeCamera:function () {
      var vm=this;
      vm.cameraShow=0;
      //console.log(document.querySelector('#iframe').contentWindow)
      document.querySelector('#iframe').contentWindow.closeCamera();
    }
  },
  mounted() {

  }
};

</script>
