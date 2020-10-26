<template>
    <div class="content">
        <div class="menuManage userManage">
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">基础信息</div>
                </div>
                <div class="tag-box-content">
                    <div class="userManage-detail userManage-edit">
                        <div>
                            <span>
                                卡号：
                                <input type="text" class="input-text" readonly="readonly" v-model="submitData.cardNo" @change="getData(submitData.cardNo);">
                            </span>
                            <span>
                                出入库类型：
                                <input type="text" class="input-text" readonly="readonly" v-model="submitData.registorType">
                            </span>
                            <span>
                                车牌号：
                                <input type="text" class="input-text" readonly="readonly" v-model="submitData.plateNumber">
                            </span>
                            <span>
                                粮油品种：
                                <input type="text" class="input-text" readonly="readonly" v-model="submitData.grainNumber">
                            </span>
                            <span>
                                毛重(千克)：
                                <input type="text" class="input-text" readonly="readonly" v-model="submitData.grossWeight">
                            </span>
                            <span>
                                皮重(千克)：
                                <input type="number" class="input-text" readonly="readonly"  v-model="submitData.tareWeight">
                            </span>
                            <span>
                                净重(千克)：
                                <input type="number" class="input-text" readonly="readonly" v-model="submitData.netWeight">
                            </span>
                            <span>
                                水分增扣量(千克)：
                                <input type="number" class="input-text" readonly="readonly" v-model="submitData.waterIncrementDecrement">
                            </span>
                            <span>
                                杂质增扣量(千克)：
                                <input type="number" class="input-text" readonly="readonly" v-model="submitData.impurityIncrementDecrement">
                            </span>
                            <span>
                                其他扣量(千克)：
                                <input type="number" class="input-text" readonly="readonly" v-model="submitData.otherIncrementDecrement">
                            </span>
                            <span>
                                扣量总计(千克)：
                                <input type="number" class="input-text" readonly="readonly" v-model="submitData.incrementDecrementTotal">
                            </span>
                            <span>
                                结算重量(千克)：
                                <input type="number" class="input-text" readonly="readonly" v-model="submitData.totalWeight">
                            </span>
                            <!-- <span>
                                <input type="number" class="input-text"  v-model="IsGetWeigh" @change="getWeighInfo();">
                            </span> -->

                        </div>
                    </div>
                </div>
                <!-- <div class="edit-btn">
                    <button class="edit-submit" @click="submitEvent();">手动开闸A</button>
                    <button class="edit-back" @click="detailBack();">手动开闸B</button>
                </div> -->
            </div>
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">称重信息</div>
                </div>
                <div class="tag-box-content">
                    <div class="weigh-info">
                      <div class="weigh-left" v-text="currentStep"></div>
                      <div class="weigh-right" v-text="currentStep=='毛重'?submitData.grossWeight+'kg':submitData.tareWeight+'kg'"></div>
                    </div>
                </div>
                <div class="edit-btn">
                    <button class="edit-submit" @click="closeWebSocket();">称重确定</button>
                </div>
            </div>
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">计量监控</div>
                </div>
                <div class="tag-box-content">
                    <div class="register-img" v-for="(item,i) in videoList">
                        <input type="hidden" :id="'message'+i" >
                        <iframe src="" :id="'iframe'+i"></iframe>
                    </div>
                </div>
            </div>
            <div class="edit-btn">
                <button class="edit-submit" @click="submitEvent();">提交</button>
                <!-- <button class="edit-submit" @click="send();">提交</button> -->
                <button class="edit-back" @click="detailBack();">返回</button>
            </div>
        </div>
    </div>
</template>

<style type="text/css" scoped>
  .tag-box .edit-btn{
    margin-top: 15px;
  }
</style>
<script>

var websocket = null;

import {frontByRFID, afterByRFID, getMeteringOutByCardNo, meteringGetNumFront, meteringGetNumAfter, meteringopenFront, meteringopenAfter, TrafficLightsFront, TrafficLightsAfter, meteringoInfraRedFront,meteringoInfraRedAfter,meteringoAudio ,getStep , oilGrossWeight , oilTareWeight, WeightLED } from "@/api/intelligentStorage/public";
import {getNowFormatDate, mul, except, add, minus, TransformToChineseSimple} from "@/utils/public";
import { valueBinDetail, meteringVideo } from "@/api/intelligentStorage/public";
export default {
  name: "warehouseEdit",
  data() {
    return {
        postData:{
            reverseJobId:this.$route.query.id
        },
        detailData:{
          outStorehouseGbCode:'',
          inStorehouseGbCode:''
        },
        type:1,//1为前，2为后
        submitData:{
            cardNo:'',
            billId:'',
            registorNo:'',
            registorType:'',
            grainNumber:'',
            plateNumber:'',
            grossWeight:0,
            tareWeight:0,
            netWeight :0,
            waterIncrementDecrement:0,
            impurityIncrementDecrement:0,
            otherIncrementDecrement:0,
            incrementDecrementTotal:0,
            totalWeight:0,
            truckFrontPic:'pic1.jpg',
            truckUpperPic:'pic2.jpg',
            truckBackPic:'pic3.jpg',
            poundRoomPic:'pic4.jpg',
            totalRate:'',
            startTime:''
        },
        totalRate:'',
        RFIDstate:1,//RFID卡状态：1为未读到数据，2为已读到数据
        waterIncrementDecrementRate:'',
        impurityIncrementDecrementRate:'',
        otherIncrementDecrementRate:'',
        waterIncrementDecrement:'',//值仓取到的扣量
        impurityIncrementDecrement:'',
        otherIncrementDecrement:'',
        currentStep:'',//当前步骤
        Weigh:[],
        IsGetWeigh:1,//1为不取称重数据，0为取
        isEnd:0,//1为称重结束
        IsGetWeighFront:1,
        IsGetWeighAfter:1,
        pageTimer:{
          timer1:'',
          timer2:'',
          timer3:'',
          timer4:'',
          timer5:'',
          timer6:'',
          timer7:'',
        },////定义计时器全局变量
        oLiveView:{
            iProtocol: 1,            // protocol 1：http, 2:https
            szIP: "192.168.188.240",    // protocol ip
            szPort: "80",            // protocol port
            szUsername: "admin",     // device username
            szPassword: "12345", // device password
            iStreamType: 1,          // stream 1：main stream  2：sub-stream  3：third stream  4：transcode stream
            iChannelID: 1,           // channel no
            bZeroChannel: false      // zero channel
        },
        videoList:[]
    }
  },
  methods: {
    getvideo:function () {
        var vm=this;
        meteringVideo({})
        .then(ret => {
            if (ret.code === '200') {
                // console.log(JSON.stringify(ret))
                vm.videoList=ret.data.cameraList;
                vm.$nextTick(function () {
                    for (let i = 0; i < ret.data.cameraList.length; i++) {
                        const element = ret.data.cameraList[i];
                        vm.oLiveView.szIP=element.dvrIp;
                        vm.oLiveView.szPort=element.dvrPort;
                        vm.oLiveView.szUsername=element.userName;
                        vm.oLiveView.szPassword=element.userPwd;
                        vm.oLiveView.iChannelID=element.channelNo;
                        vm.showCamera('message'+i,'iframe'+i,vm.oLiveView);
                    }
                });

            } else {
                layer.alert(ret.data, { closeBtn: 0 });
            }
        })
        .catch(err => {
            layer.alert(err.data, { closeBtn: 0 });
        });

    },
    getCardNoByFront() {
      var vm = this;
      // layer.load(2);
      frontByRFID()
        .then(ret => {
          // layer.closeAll("loading");
          if (ret.code === '200') {
            if (ret.data.result=='查询成功！') {
              // console.log(JSON.stringify(ret))
              vm.submitData.cardNo=ret.data.cardNumber;
              vm.type=1;
              vm.getData();
              vm.RFIDstate=2;
              clearTimeout(vm.pageTimer.timer1);
              vm.submitData.startTime=getNowFormatDate();
            }else{
              if (vm.submitData.cardNo=='') {
                if(vm.RFIDstate == 1){
                  this.getCardNoByAfter();
                }
              }
            }
          } /*else {
            if (vm.submitData.cardNo=='') {
              // setTimeout(vm.getCardNo,2000)
              this.getCardNoByAfter();
            }
          }*/
        })
        .catch(err => {
          // setTimeout(vm.getCardNo,2000)
          //this.getCardNoByAfter();
          // layer.closeAll("loading");
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getCardNoByAfter() {
      var vm = this;
      // layer.load(2);
      afterByRFID()
        .then(ret => {
          // layer.closeAll("loading");
          if (ret.code === '200') {
            if (ret.data.result=='查询成功！') {
                // console.log(JSON.stringify(ret))
                vm.submitData.cardNo=ret.data.cardNumber;
                vm.type=2;
                vm.getData();
                vm.RFIDstate=2;
                clearTimeout(vm.pageTimer.timer1);
                vm.submitData.startTime=getNowFormatDate();
            }else{
                if (vm.submitData.cardNo=='') {
                  if(vm.RFIDstate == 1){
                    this.getCardNoByFront();
                  }
                }
            }
          } /*else {
                if (vm.submitData.cardNo=='') {
                this.getCardNoByFront();
                }
          }*/
        })
        .catch(err => {
          // layer.closeAll("loading");
          //this.getCardNoByFront();
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getData:function () {
      var vm = this;
      layer.load(2);
      getMeteringOutByCardNo({cardNo:vm.submitData.cardNo})
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code === '200') {
              console.log(JSON.stringify(ret));
              vm.submitData.billId=ret.data.msg.billId;
              vm.submitData.registorNo=ret.data.msg.registorNo;
              console.log(ret.data.msg.registorNo)
              vm.submitData.registorType=ret.data.msg.registorType;
              vm.submitData.grainNumber=ret.data.msg.grainVarietyValue;

              vm.submitData.plateNumber=ret.data.msg.plateNumber;
              vm.submitData.grossWeight=ret.data.msg.grossWeight;
              vm.submitData.tareWeight=ret.data.msg.tareWeight;
              vm.submitData.netWeight=ret.data.msg.netWeight;
              vm.waterIncrementDecrementRate=ret.data.msg.waterIncrementDecrementRate;
              vm.impurityIncrementDecrementRate=ret.data.msg.impurityIncrementDecrementRate;
              vm.otherIncrementDecrementRate=ret.data.msg.otherIncrementDecrementRate;
              vm.totalRate=ret.data.msg.totalRate;

              // vm.submitData.totalWeight=ret.data.msg.totalWeight;

              getStep({registorNo:ret.data.msg.registorNo})
                .then(ret => {
                  layer.closeAll("loading");
                  if (ret.code === '200') {
                    console.log(JSON.stringify(ret))
                    vm.currentStep=ret.data.current_step_name;
                    if (ret.data.current_step_name=='毛重') {
                          valueBinDetail({registorNo:vm.submitData.registorNo})
                            .then(ret => {
                              layer.closeAll("loading");
                                console.log(JSON.stringify(ret))
                              if (ret.code == 200) {
                                vm.waterIncrementDecrement=ret.data.ondutyDetail.waterIncrementDecrement;
                                vm.impurityIncrementDecrement=ret.data.ondutyDetail.impurityIncrementDecrement;
                                vm.otherIncrementDecrement=ret.data.ondutyDetail.otherIncrementDecrement;

                              } else {
                                layer.alert(ret.data, { closeBtn: 0 });
                              }
                            })
                            .catch(err => {
                              layer.alert(err.message, { closeBtn: 0 });
                            });
                    }
                  } else {
                      layer.alert(ret.data, { closeBtn: 0 });
                  }
                })
                .catch(err => {
                  layer.alert(err.message, { closeBtn: 0 });
                });

              if (vm.type==1) {
                console.log(vm.type)
                  vm.getFrontPlateNumber();
              }else{
                console.log(vm.type)
                  vm.getAfterPlateNumber();
              }
              vm.websocketOpen();
              // vm.send();
          } else {
              layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getFrontPlateNumber:function () {//前车牌
      var vm = this;
      meteringGetNumFront()
        .then(ret => {
          layer.closeAll("loading");
          console.log(ret.code=== '200')
          if (ret.code === '200') {
              console.log(JSON.stringify(ret));
              if (vm.submitData.plateNumber==ret.data.lpr.license) {
                  vm.openGateFront();
              }
          } else {
            console.log('前')
            vm.pageTimer.timer4=setTimeout(vm.getFrontPlateNumber,2000)
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getAfterPlateNumber:function () {//后车牌
      var vm = this;
      meteringGetNumAfter()
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code === '200') {
              console.log(JSON.stringify(ret));
              if (vm.submitData.plateNumber==ret.data.lpr.license) {
                  vm.openGateAfter();
              }
          } else {
              vm.pageTimer.timer5=setTimeout(vm.getAfterPlateNumber,2000)
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    openGateFront:function () {//开前道闸
      var vm = this;
      meteringopenFront()
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code === '200') {
              console.log(JSON.stringify(ret));
              layer.msg("前道闸已打开");
              vm.openHLDFront();
          } else {
              layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    openGateAfter:function () {//开后道闸
      var vm = this;
      meteringopenAfter()
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code === '200') {
              console.log(JSON.stringify(ret));
              layer.msg("后道闸已打开");
              vm.openHLDAfter();
          } else {
              layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    openHLDFront:function () {//开前红绿灯
      var vm = this;
      TrafficLightsFront()
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code === '200') {
              console.log(JSON.stringify(ret));
              layer.msg("前红绿灯已打开");

              if(vm.isEnd!=1){
                // vm.InfraRedFront();
                // vm.InfraRedAfter();
                vm.IsGetWeighFront=0;
                console.log('-----------------------'+vm.IsGetWeigh+'-------------------')
                vm.IsGetWeigh=0;
                vm.getWeighInfo();
              }
          } else {
              layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    openHLDAfter:function () {//开后红绿灯
      var vm = this;
      TrafficLightsAfter()
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code === '200') {
              console.log(JSON.stringify(ret));
              layer.msg("后红绿灯已打开");

              if(vm.isEnd!=1){
                // vm.InfraRedFront();
                // vm.InfraRedAfter();
                vm.IsGetWeighAfter=0;
                console.log('-----------------------'+vm.IsGetWeigh+'-------------------')
                vm.IsGetWeigh=0;
                vm.getWeighInfo();
              }
          } else {
              layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    // InfraRedFront:function () {//红外光栅前
    //   var vm = this;
    //   meteringoInfraRedFront()
    //     .then(ret => {
    //       layer.closeAll("loading");
    //       vm.pageTimer.timer6=setTimeout(vm.InfraRedAfter,1000)
    //       if (ret.code === '200') {
    //           console.log(JSON.stringify(ret));
    //           if (ret.data.state=== 1) {
    //               vm.sendAudio('车辆未停稳')
    //               vm.IsGetWeighFront=1;
    //           }else{
    //               vm.IsGetWeighFront=0;
    //               if (vm.IsGetWeighAfter==0) {
    //                   vm.IsGetWeigh=0;
    //                   vm.getWeighInfo();
    //               }
    //           }
    //       } else {
    //           layer.alert(ret.data, { closeBtn: 0 });
    //       }
    //     })
    //     .catch(err => {
    //       layer.alert(err.message, { closeBtn: 0 });
    //     });
    // },
    // InfraRedAfter:function () {//红外光栅后
    //   var vm = this;
    //   meteringoInfraRedAfter()
    //     .then(ret => {
    //       layer.closeAll("loading");
    //       vm.pageTimer.timer7=setTimeout(vm.InfraRedFront,1000)
    //       if (ret.code === '200') {
    //           console.log(JSON.stringify(ret));
    //           if (ret.data.state=== 1) {
    //               vm.sendAudio('车辆未停稳')
    //               vm.IsGetWeighAfter=1;
    //           }else{
    //               vm.IsGetWeighAfter=0;
    //               if (vm.IsGetWeighFront==0) {
    //                   vm.IsGetWeigh=0;
    //                   vm.getWeighInfo();
    //               }
    //           }
    //       } else {
    //           layer.alert(ret.data, { closeBtn: 0 });
    //       }
    //     })
    //     .catch(err => {
    //       layer.alert(err.message, { closeBtn: 0 });
    //     });
    // },
    sendAudio:function (message) {//语音
      meteringoAudio(message)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code === '200') {
          } else {
              layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    submitEvent: function() {
      var vm = this;
      //console.log(JSON.stringify(vm.submitData))
      if (vm.currentStep=='毛重') {
        layer.load(2);
        oilGrossWeight(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code === '200') {
              layer.msg("提交成功！");
              // this.$router.push({
              //   name: "reverse"
              // });
              vm.sendAudio('称重结束请下磅');
              if (vm.type==1) {
                vm.openGateAfter();
              }else{
                vm.openGateFront();
              }
                  vm.$router.push({
                    name: "oilOutStorageStep",
                    query: {
                      step: 4,
                      condition:this.$route.query.condition
                    }
                  });
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          })
          .catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
          });
      }
      if(vm.currentStep=='皮重') {
        layer.load(2);
        oilTareWeight(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code === '200') {
              layer.msg("提交成功！");
              // this.$router.push({
              //   name: "reverse"
              // });
              vm.sendAudio('称重结束请下磅');
              if (vm.type==1) {
                vm.openGateAfter();
              }else{
                vm.openGateFront();
              }

              vm.$router.push({
                name: "oilOutStorageStep",
                query: {
                  step: 4,
                  condition:this.$route.query.condition
                }
              });
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          })
          .catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
          });
      }
    },
    closeWebSocket:function () {//关闭称重请求
        var vm=this;
        vm.isEnd=1;//称重结束
        websocket.close();
              console.log(vm.pageTimer.timer6);
              console.log(vm.pageTimer.timer7);
              clearTimeout(vm.pageTimer.timer6);
              clearTimeout(vm.pageTimer.timer7);

        WeightLED({
                registorNo:vm.submitData.registorNo,
                plateNumber:vm.submitData.plateNumber,
                tareWeight:vm.submitData.tareWeight,
                grossWeight:vm.submitData.grossWeight,
                grainKind:vm.submitData.grainNumber,
                deviceBarcode:'led201901241413'
            }).then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  // console.log(JSON.stringify(ret));

                } else {
                  layer.alert(ret.data, { closeBtn: 0 });
                }
              })
              .catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
              });
        if (vm.currentStep=='毛重') {
            vm.sendAudio(vm.currentStep+TransformToChineseSimple(vm.submitData.grossWeight)+'千克');
        } else{
            vm.sendAudio(vm.currentStep+TransformToChineseSimple(vm.submitData.tareWeight)+'千克');
        }
    },
    // send:function () {//发送称重请求
    //     websocket.send('weighbridgeService');
    // },
    getWeighInfo:function () {
      var vm=this;
      console.log('-------------------开始称重-----------------')
      websocket.onmessage = function (event) {
            // console.log(event.data);
            // if (vm.Weigh.length<5) {
            //   vm.Weigh.push(event.data);
            // }
            // console.log('-------------------'+vm.Weigh+'-----------------')
            // console.log('-------------------'+vm.Weigh.length+'-----------------')
            // console.log('-------------------'+vm.Weigh.length==5+'-----------------')
            // if (parseInt(vm.Weigh.length)===5) {
            //     for (var i = 0; i < vm.Weigh.length; i++) {
            //       if (vm.currentStep=='毛重') {
            //         var w=0;
            //         w+=vm.Weigh[i];
            //         vm.submitData.grossWeight=w/5.0;
            //         console.log('-------------------'+vm.submitData.grossWeight+'-----------------')
            //       }
            //       if (vm.currentStep=='皮重') {
            //         var w=0;
            //         w+=vm.Weigh[i];
            //         vm.submitData.tareWeight=w/5.0;
            //         console.log(vm.submitData.tareWeight)
            //         vm.submitData.netWeight=vm.submitData.grossWeight-vm.submitData.tareWeight;//计算净重
            //         vm.submitData.incrementDecrementTotal=vm.submitData.netWeight*vm.totalRate/100.0+vm.waterIncrementDecrement+vm.impurityIncrementDecrement+vm.otherIncrementDecrement;//扣量总计
            //         console.log('------扣量总量：：-------------'+vm.submitData.incrementDecrementTotal+'-----------------')

            //         vm.submitData.waterIncrementDecrement=vm.submitData.netWeight*vm.waterIncrementDecrementRate/100.0;
            //         vm.submitData.impurityIncrementDecrement=vm.submitData.netWeight*vm.impurityIncrementDecrementRate/100.0;
            //         vm.submitData.otherIncrementDecrement=vm.submitData.netWeight*vm.otherIncrementDecrementRate/100.0;

            //         vm.submitData.totalWeight=vm.submitData.netWeight+vm.submitData.incrementDecrementTotal;//结算重量
            //       }
            //     }
            // }
            console.log(vm.currentStep=='毛重')
            console.log(vm.currentStep=='皮重')
            if (vm.currentStep=='皮重') {
                vm.submitData.tareWeight=event.data;
                console.log('-------------------'+vm.submitData.tareWeight+'-----------------')
              }
              if (vm.currentStep=='毛重') {
                vm.submitData.grossWeight=event.data;
                console.log(vm.submitData.grossWeight)
                vm.submitData.netWeight= minus(vm.submitData.grossWeight,vm.submitData.tareWeight);  //vm.submitData.grossWeight-vm.submitData.tareWeight;//计算净重
                vm.submitData.incrementDecrementTotal=  add(add(vm.waterIncrementDecrement,vm.impurityIncrementDecrement),vm.otherIncrementDecrement);//扣量总计   vm.submitData.netWeight*vm.totalRate/100.0
                console.log('------扣量总量：：-------------'+vm.submitData.incrementDecrementTotal+'-----------------')

                vm.submitData.totalWeight=vm.submitData.netWeight+vm.submitData.incrementDecrementTotal;//结算重量
              }
          }

    },
    websocketOpen:function () {
              if ('WebSocket' in window) {
                  websocket = new WebSocket("ws://10.7.34.136:9030/IGIP-BWZL-IOT2/websocket");
                  // alert("success");
              }
              else {
                  // alert('Not support websocket')
              }

              websocket.onerror = function () {
                  setMessageInnerHTML("WebSocket Connect Failure");
              };

              websocket.onopen = function () {
                  setMessageInnerHTML("WebSocket Connect Success!");
                  websocket.send('weighbridgeService');
              }

              // websocket.onmessage = function (event) {
              //     setMessageInnerHTML(event.data);
              // }

              websocket.onclose = function () {
                  setMessageInnerHTML("WebSocket close connect!");
              }

              window.onbeforeunload = function () {
                  closeWebSocket();
              }

              function setMessageInnerHTML(innerHTML) {
                  // document.getElementById('message').innerHTML += innerHTML + '<br/>';

                  layer.msg(innerHTML);
              }

              function closeWebSocket() {
                  websocket.close();
              }

              // function send() {
              //     // var message = document.getElementById('text').value;
              //     console.log(222)
              //     websocket.send('weighbridgeService');
              // }
              // send();

    },
    detailBack:function () {
      var vm = this;
          vm.$router.push({
            name: "oilOutStorageStep",
            query: {
              step: 4,
              condition:this.$route.query.condition
            }
          });
    },
    showCamera:function (id,iframe,message) {
        var vm=this;
        $('#'+id).val(JSON.stringify(message));
        document.querySelector('#'+iframe).src='../../../../static/html/video.html?id='+id;
    },
  },
  mounted () {
      var vm=this;
      vm.getvideo();
      vm.getCardNoByFront();
  },
  destroyed (){
      var vm=this;
      vm.RFIDstate=2;
      websocket.close();
        console.log(vm.pageTimer.timer6);
        console.log(vm.pageTimer.timer7);
      clearTimeout(vm.pageTimer.timer6);
      clearTimeout(vm.pageTimer.timer7);
      window.removeEventListener('resize', this.resizeWin);
  }

};
</script>
