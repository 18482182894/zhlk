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
                                <input type="text" class="input-text" v-model="submitData.cardNo" @change="getData(submitData.cardNo);">
                            </span>
                            <!-- <span>
                                扦样编码：
                                <input type="number" class="input-text" v-model="submitData.samplingId">
                            </span> -->
                            <span>
                                粮油品种：
                                <input type="text" class="input-text" v-model="grainVariety" readonly="readonly">
                            </span>
                            <span>
                                车牌号：
                                <input type="text" class="input-text" v-model="submitData.plateNumber" readonly="readonly">
                            </span>
                            <span>
                                扦样单号：
                                <input type="text" class="input-text" v-model="submitData.samplingBillNo">
                            </span>
                            <span>
                                扦样人：
                                <input type="text" class="input-text" v-model="submitData.samplingPerson">
                            </span>
                            <span>
                                送样人：
                                <input type="text" class="input-text" v-model="submitData.sendSamplePerson">
                            </span>
                            <span>
                                样品重量(千克)：
                                <input type="number" class="input-text" v-model="submitData.sampleWeight">
                            </span>
                            <span>
                                扦样时间：
                                <input type="text" class="input-text Wdate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"  id="samplingDatetime" >
                            </span>
                            <span style="width: 50%;">
                                二维码：
                                <div id="qrcode" class="edit-code"></div>
                                <button class="table-btn btn-green" @click="printPic();">打印</button>
                            </span>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div class="edit-btn">
                <button class="edit-submit" @click="submitEvent();">提交</button>
                <button class="edit-back" @click="detailBack();">返回</button>
            </div>
        </div>
    </div>
</template>
<style type="text/css" scoped>
  .userManage-detail .edit-code{
    margin: 0;
  }
  span .table-btn{
    display: inline-block;
    vertical-align: bottom;
  }
</style>
<script>
import QRCode from 'qrcodejs2'
import { getDataByCard,oilSampling} from "@/api/intelligentStorage/public";  
import { grainDetail } from '@/api/systemManage/basicData/grainVarieties'
import { myPrint} from "@/utils/public"; 
export default {
  name: "warehouseEdit",
  data() {
    return {
        postData:{
            registorNo:this.$route.query.id
        },
        grainVariety:'',
        submitData:{
            registorNo:'',
            cardNo:'',
            samplingBillNo:'',
            samplingPerson:'',
            sendSamplePerson:'',
            sampleWeight:'',
            samplingDatetime:'',
            billId:'',
            plateNumber:'',
            qrCodeNumber:''
        },
    }
  },
  methods: {
    // getDetail: function() {
    //   var vm = this;
    //   layer.load(2);
    //   samplingDetail(vm.postData)
    //     .then(ret => {
    //       layer.closeAll("loading");
    //       if (ret.code == 200) {
    //         // console.log(JSON.stringify(ret.data.dataMap))
    //         vm.submitData.registorNo = ret.data.dataMap.registorNo;
    //         vm.submitData.cardNo = ret.data.dataMap.cardNo;
    //         vm.submitData.samplingBillNo = ret.data.dataMap.samplingBillNo;
    //         vm.submitData.samplingPerson = ret.data.dataMap.samplingPerson;
    //         vm.submitData.sendSamplePerson = ret.data.dataMap.sendSamplePerson;
    //         vm.submitData.sampleWeight = ret.data.dataMap.sampleWeight;
    //         $('#samplingDatetime').val(ret.data.dataMap.samplingDatetime);

    //         vm.submitData.billId = ret.data.dataMap.billId;
    //         vm.submitData.plateNumber = ret.data.dataMap.plateNumber;
    //         vm.submitData.qrCodeNumber = ret.data.dataMap.qrCodeNumber;
            
    //         vm.$nextTick(function() {
    //           vm.getDropDown();
    //         });
    //       } else {
    //         layer.alert(ret.data, { closeBtn: 0 });
    //       }
    //     })
    //     .catch(err => {
    //       layer.alert(err.message, { closeBtn: 0 });
    //     });
    // },
    getData:function (id) {
      var vm=this;
      console.log(111)
      if (id!='') {
          layer.load(2);
          getDataByCard({cardNo:id})
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                // console.log(JSON.stringify(ret.data))
                vm.submitData.registorNo = ret.data.registorDetail.registorNo;
                vm.submitData.plateNumber = ret.data.registorDetail.plateNumber;
                // vm.submitData.sendSamplePerson = ret.data.registorDetail.grainVariety;
                 grainDetail({grainVarietyId:ret.data.registorDetail.grainVariety}).then(ret=>{
                        layer.closeAll('loading');
                        if (ret.code==200) {
                            vm.grainVariety=ret.data.grainVariety.grainVarietyName;
                            
                        }else{
                            layer.alert(err.message, { closeBtn: 0 }); 
                        }

                    }).catch(err=>{
                        layer.alert(err.message, { closeBtn: 0 }); 
                    });
              
                  vm.qrcode();
              } else {
                layer.alert(ret.data, { closeBtn: 0 });
              }
            })
            .catch(err => {
              layer.alert(err.message, { closeBtn: 0 });
            });
        }
    },
    submitEvent: function() {
      var vm = this;
      vm.submitData.samplingDatetime=$('#samplingDatetime').val();
      if (vm.submitData.cardNo == "") {
        layer.msg("请填写卡号");
        return;
      }
      if (vm.submitData.samplingBillNo == "") {
        layer.msg("请填写扦样单号");
        return;
      }
      if (vm.submitData.samplingPerson == "") {
        layer.msg("请填写扦样人");
        return;
      }
      if (vm.submitData.sendSamplePerson == "") {
        layer.msg("请填写送样人");
        return;
      }
      if (vm.submitData.sampleWeight == "") {
        layer.msg("请填写样品重量");
        return;
      }
      if (vm.submitData.samplingDatetime == "") {
        layer.msg("请填写扦样时间");
        return;
      }
      if (vm.submitData.plateNumber == "") {
        layer.msg("请填写车牌号");
        return;
      }

      layer.load(2);
      oilSampling(vm.submitData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            layer.msg("扦样成功！");
            vm.$router.push({
              name: "oilStorageStep",
              query: {
                step: 2
              }
            });
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    qrcode () { //绘制二维码
      var vm=this;
      let qrcode = new QRCode('qrcode', { 
        width: 200, height: 200, // 高度 
        text: vm.submitData.registorNo,// 二维码内容 
        render: 'table' ,
        // 设置渲染方式（有两种方式 table和canvas，默认是canvas） 
        // background: '#f0f' 
        // foreground: '#ff0' 
      }) 
      console.log(qrcode) 
    },
    printPic:function () {
        myPrint('qrcode');
    },
    detailBack:function () {
      var vm = this;
          vm.$router.push({
            name: "oilStorageStep",
            query: {
              step: 2
            }
          });
    }
  },
  mounted () {
      var vm=this;
      // if (this.$route.query.id) {
      //     vm.getDetail();
      // }else{
      //   vm.getDropDown();
      // }
  }
}
</script>
