<template>
    <div class="content">
        <div class="menuManage userManage">
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">基础信息</div>
                </div>
              <OBJECT id='CVR_IDCard' height='0' width='0' classid='clsid:10946843-7507-44FE-ACE8-2B3483D179B7' name='CVR_IDCard'></OBJECT>
                <div class="tag-box-content">
                    <div class="userManage-detail userManage-edit">
                        <div>
                            <span>
                                记录编号：
                                <input type="text" class="input-text" v-model="submitData.registorNo" readonly="readonly">
                            </span>
                            <span>
                                卡号：
                                <input type="text" class="input-text" v-model="submitData.cardNo" >
                            </span>
                            <span>
                                身份证号：
                                <input type="number" name='CardNo' class="input-text" v-model="submitData.identityNo" @click="autoGetID();" readonly="readonly">
                            </span>
                            <span>
                                承运人：
                                <input type="text" name='CardName' class="input-text" v-model="submitData.carrier" @click="autoGetID();"  readonly="readonly">
                            </span>
                            <span>
                                <p>车牌号：</P>
                                <input type="text" class="input-text" v-model="submitData.plateNumber" @click="autoGetVehicle();" readonly="readonly">
                                <!-- <button class='table-btn plBtn' @click="autoGetVehicle();">登记</button>
                                <button class="table-btn plBtn" @click="autoGetVehicleOne();">地磅</button> -->
                            </span>
                            <span>
                                日期：
                                <input type="text" class="input-text Wdate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"  id="registorDate" >
                            </span>
                            <span>
                                包装方式：
                                <select name="" class="select-style" v-model="submitData.packType">
                                  <option value="01">散装</option>
                                  <option value="02">包装</option>
                                </select>
                            </span>
                            <span>
                                登记出入库类型：
                                <select name="" class="select-style" v-model="submitData.registorType">
                                  <option value="销售">销售</option>
                                  <option value="收购">收购</option>
                                  <option value="调入">调入</option>
                                  <option value="调出">调出</option>
                                  <option value="调增">调增</option>
                                  <option value="调减">调减</option>
                                  <option value="溢余">溢余</option>
                                  <option value="损耗">损耗</option>
                                  <option value="收成品">收成品</option>
                                  <option value="加工出">加工出</option>
                                  <option value="库调入">库调入</option>
                                  <option value="库调出">库调出</option>
                                </select>
                            </span>
                            <span>
                                通知单号：
                                <input type="text" class="input-text" v-model="submitData.billId" @blur='autoGetData();'>
                            </span>
                            <span>
                                客户名称：
                                <input type="text" class="input-text" v-model="submitData.customerName" readonly="readonly">
                            </span>
                            <span>
                                存粮性质：
                                <input type="text" class="input-text" v-model="submitData.grainAttributeValue" readonly="readonly">
                            </span>
                            <span>
                                粮食品种：
                                <input type="text" class="input-text" v-model="submitData.grainVarietyValue" readonly="readonly">
                            </span>

                        </div>
                    </div>
                </div>
            </div>
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">身份证信息</div>
                </div>
                <div class="tag-box-content">
                  <img :src="'data:image/jpeg;base64,'+submitData.identityImageFile" alt="" class="register-img" name=PhotoDisplay >
                  <img :src="submitData.plateNumberImageFile" title="车牌照" class="register-img">
                  <!-- <img src="" title="车牌拍照时候的视频截图" class="register-img"> -->
                  <div class="register-img photo-box">
                    <img :src="submitData.realPersonImageUrl" title="真人拍照" class="register-img photo-taking">
                    <!-- <video id="video" class="register-img" controls autobuffer></video> -->
                    <div id="webcam"   class="register-img photo-taking" :style="photoType==0?'':'visibility:hidden;'"></div>
                    <!-- <div class="table-btn btn-green photo-btn" v-if="photoType==0" @click="callCamera();">打开摄像头</div>
                    <div class="table-btn btn-green photo-btn" v-else @click="takePhoto();">拍照</div> -->
                    <div class="table-btn btn-green photo-btn play" v-if="photoType==0" >拍照</div>
                    <div class="table-btn btn-green photo-btn " v-else @click="showCamera();">打开摄像头</div>
                    <!-- <div id="status">倒计时</div> -->
                    <!-- <input type="file" accept="video/*" capture="camcorder"> -->
                  </div>
                  <div class="register-img">
                    <div id="qrcode"></div>
                    <div class="table-btn btn-green" @click="printPic();">打印</div>
                  </div>
                </div>
            </div>
            <div class="edit-btn">
                <button class="edit-submit" @click="submitEvent();">提交</button>
                <button class="edit-back" @click="detailBack();">返回</button>
            </div>
          <object id="CertCtl" type="application/cert-reader" width="0" height="0"></object>
        </div>
    </div>
</template>

<style scoped>
  .plBtn{
    height: 28px;
    padding: 0px;
    line-height: 28px;
    margin: 0px;
    color: black;
    outline: none;
    background-color: transparent;
    border: 1px solid #b9b9b9;
  }
  .input-text{
    padding: 0px;
  }
</style>

<script>

import QRCode from 'qrcodejs2'
import { registerDetail, registerInfo, registerCode, getLicensePlate, gateOpening } from "@/api/intelligentStorage/public";
import { getNotice } from "@/api/business/notice";
import { grainDetail } from '@/api/systemManage/basicData/grainVarieties';
import { meteringGetNumFront } from "@/api/intelligentStorage/public";
import { myPrint} from "@/utils/public";
export default {
  name: "warehouseEdit",
  data() {
    return {
        postData:{
            reverseJobId:this.$route.query.id
        },
        photoType:0,//1拍照，0打开摄像头
        submitData:{
          registorNo:'',
          cardNo:'',
          billId:'',
          customerName:'',
          identityNo:'',
          carrier:'',
          registorDate:'',
          packType:'',
          plateNumber:'',
          grainVariety:'',
          grainVarietyValue:'',
          registorType:'',
          grainAttribute:'',
          grainAttributeValue:'',
          noticeType:2,
          identityImageFile:'',
          plateNumberImageFile:'',
          realPersonImageFile:'',
          cargoName:'',
          cargoPosition:'',
          warehouseName:'',
          warehouseGbCode:'',
          storehouseName:'',
          storehouseGbCode:''
        }
    }
  },
  methods: {
    /*readCard:function (){//身份证读取信息
      var vm=this;
        ReadIDCard();
        function ReadIDCard() {
           clearForm();
           var ret = CVR_IDCard.ReadCard();
           console.log(JSON.stringify(CVR_IDCard))
           if (ret == "0"){
              fillForm();
              return;
           }

           alert("提醒:" + ret);
        }

        function fillForm() {
          var pName=CVR_IDCard.Name;
          var pSex=CVR_IDCard.Sex;
          var pNation=CVR_IDCard.Nation;
          var pBorn=CVR_IDCard.Born;
          var pAddress=CVR_IDCard.Address;
          var pCardNo=CVR_IDCard.CardNo;
          var pPolice=CVR_IDCard.IssuedAt;
          var pActivityLFrom=CVR_IDCard.EffectedDate;
          var pActivityLTo=CVR_IDCard.ExpiredDate;
          var pDeviceNo=CVR_IDCard.CardReaderId;
          var pPhotoBuffer=CVR_IDCard.Picture;

          vm.submitData.identityNo=pCardNo;
          vm.submitData.carrier=pName;
          vm.submitData.identityImageFile=pPhotoBuffer;
          console.log(pPhotoBuffer)
            // vm.submitData.realPersonImageFile='data:image/jpeg;base64,'+pPhotoBuffer;

        }

        function clearForm() {

          vm.submitData.identityNo='';
          vm.submitData.carrier='';
          vm.submitData.identityImageFile='';

        }
    },*/
    //华视
    connect:function() {
      var vm=this;
      clearForm();
      var CertCtl = document.getElementById("CertCtl");
      try {
        var result = CertCtl.connect();
        //document.getElementById("result").value = result;
        //console.log(result);
      } catch (e) {
      }
      function clearForm() {
        vm.submitData.identityNo='';
        vm.submitData.carrier='';
        vm.submitData.identityImageFile='';
      }
    },
    readCert:function (){//身份证读取信息
      function toJson(str) {
        //var obj = JSON.parse(str);
        //return obj;
        return eval('('+str+')');
      }
      var vm=this;
      clearForm();
      var CertCtl = document.getElementById("CertCtl");
      try{
        var result = CertCtl.readCert();
        var resultObj = toJson(result);
        //console.log(resultObj);
        var CVR_IDCard=resultObj.resultContent;
        if (resultObj.resultFlag == 0) {
          var pName=CVR_IDCard.partyName;//姓名
          var pSex=CVR_IDCard.gender;//性别
          var pNation=CVR_IDCard.nation;//民族
          var pBorn=CVR_IDCard.bornDay;//出生日期
          var pAddress=CVR_IDCard.certAddress;//地址
          var pCardNo=CVR_IDCard.certNumber;//身份证号码
          var pPolice=CVR_IDCard.certOrg;//签发机关
          var pActivityLFrom=CVR_IDCard.effDate;//起始有效期
          var pActivityLTo=CVR_IDCard.expDate;//终止有效期
          //var pDeviceNo=CVR_IDCard.CardReaderId;
          var pPhotoBuffer=CVR_IDCard.identityPic;//照片
          vm.submitData.identityNo=pCardNo;
          vm.submitData.carrier=pName;
          vm.submitData.identityImageFile=pPhotoBuffer;
        }
      }catch (e){
        alert(e);
      }
      function clearForm() {
        vm.submitData.identityNo='';
        vm.submitData.carrier='';
        vm.submitData.identityImageFile='';
      }
    },
    autoGetID:function () {
      var vm=this;
      vm.readCert();
    },
    produceCode:function () {//生成记录编码
      var vm=this;
      layer.load(2);
      registerCode({})
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret))
            vm.submitData.registorNo=ret.data.registorNo;
            vm.qrcode();
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    autoGetData:function () {//获取通知单信息
      var vm=this;
      layer.load(2);
      getNotice({billId:vm.submitData.billId})
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            console.log(JSON.stringify(ret))
            vm.submitData.customerName=ret.data.dataMap.deliveryCustomer;
            vm.submitData.grainVariety=ret.data.dataMap.goodsKind;
            vm.submitData.grainAttributeValue=ret.data.dataMap.grainAttributeValue;
            vm.submitData.grainAttribute=ret.data.dataMap.grainAttribute;
            vm.submitData.cargoName=ret.data.dataMap.goodsLocation;
            vm.submitData.cargoPosition=ret.data.dataMap.goodsLocationCode;
            vm.submitData.warehouseName=ret.data.dataMap.granary;
            vm.submitData.warehouseGbCode=ret.data.dataMap.granaryCode;
            vm.submitData.storehouseName=ret.data.dataMap.warehouse;
            vm.submitData.storehouseGbCode=ret.data.dataMap.warehouseCode;

              grainDetail({grainVarietyId:ret.data.dataMap.goodsKind}).then(ret=>{
                  layer.closeAll('loading');
                  if (ret.code==200) {
                      vm.submitData.grainVarietyValue=ret.data.grainVariety.grainVarietyName;

                  }else{
                      layer.alert(err.message, { closeBtn: 0 });
                  }

              }).catch(err=>{
                  layer.alert(err.message, { closeBtn: 0 });
              });

          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    autoGetVehicle:function () {//登记获取车牌信息
      var vm=this;
      // layer.load(2);
      getLicensePlate()
        .then(ret => {
          // layer.closeAll("loading");
          if (ret.code == 200) {
            console.log(JSON.stringify(ret))
            vm.submitData.plateNumber=ret.data.lpr.license;
            vm.submitData.plateNumberImageFile=ret.data.lpr.url;

          } else {
            layer.alert(ret.data, { closeBtn: 0 });
            // setTimeout(vm.autoGetVehicle(),2000)
            // vm.autoGetVehicle();
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    autoGetVehicleOne:function () {//地磅房获取车牌信息
      var vm=this;
      // layer.load(2);
      meteringGetNumFront()
        .then(ret => {
          // layer.closeAll("loading");
          if (ret.code == 200) {
            //console.log(JSON.stringify(ret))
            vm.submitData.plateNumber=ret.data.lpr.license;
            vm.submitData.plateNumberImageFile=ret.data.lpr.url;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
            // setTimeout(vm.autoGetVehicle(),2000)
            // vm.autoGetVehicle();
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

    },
    submitEvent: function() {
      var vm = this;
      vm.submitData.registorDate=$('#registorDate').val();
      if (vm.submitData.cardNo == "") {
        layer.msg("请填写卡号");
        return;
      }
      if (vm.submitData.billId == "") {
        layer.msg("请填写通知单号");
        return;
      }
      if (vm.submitData.registorDate == "") {
        layer.msg("请填写日期");
        return;
      }
      if (vm.submitData.packType == "") {
        layer.msg("请选择包装方式");
        return;
      }
      layer.load(2);
      var data="registorNo="+vm.submitData.registorNo+"&cardNo="+vm.submitData.cardNo+"&billId="+vm.submitData.billId+"&customerName="+vm.submitData.customerName+"&identityNo="+vm.submitData.identityNo+"&carrier="+vm.submitData.carrier+"&registorDate="+vm.submitData.registorDate+"&packType="+vm.submitData.packType+"&plateNumber="+vm.submitData.plateNumber+"&grainVariety="+vm.submitData.grainVariety+"&registorType="+vm.submitData.registorType+"&grainAttribute="+vm.submitData.grainAttribute+"&noticeType="+vm.submitData.noticeType+"&plateNumberImageFile="+vm.submitData.plateNumberImageFile+"&realPersonImageFile="+vm.submitData.realPersonImageFile+"&identityImageFile="+vm.submitData.identityImageFile+"&cargoName="+vm.submitData.cargoName+"&cargoPosition="+vm.submitData.cargoPosition+"&warehouseName="+vm.submitData.warehouseName+"&warehouseGbCode="+vm.submitData.warehouseGbCode+"&storehouseName="+vm.submitData.storehouseName+"&storehouseGbCode="+vm.submitData.storehouseGbCode;
      // console.log(data)
      registerInfo(data)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            layer.msg("登记成功！");
            vm.$router.push({
              name: "outOfStockStep",
              query: {
                step: 1
              }
            });
            // layer.confirm('是否打开砸门？', {
            //   btn: ['确定','取消'] //按钮
            // }, function(){

            //   gateOpening().then(ret => {
            //       layer.closeAll("loading");
            //       console.log(JSON.stringify(ret))
            //       if (ret.code == 200) {

            //           layer.msg("登记成功！");
            //           vm.$router.push({
            //             name: "outOfStockStep",
            //             query: {
            //               step: 1
            //             }
            //           });

            //       } else {
            //         layer.alert(ret.data, { closeBtn: 0 });
            //       }
            //   }).catch(err => {
            //       layer.alert(err.message, { closeBtn: 0 });
            //   });


            // });
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    printPic:function () {
        myPrint('qrcode');
    },
    showCamera:function () {
      var vm=this;
      vm.photoType=0;
    },
    detailBack:function () {
      var vm = this;
          vm.$router.push({
            name: "outOfStockStep",
            query: {
              step: 1,
              condition:this.$route.query.condition
            }
          });
    }
  },
  mounted () {
      var vm=this;
      vm.connect();
      vm.produceCode();
      // if (this.$route.query.id) {
      //     vm.getDetail();
      // }else{
      //   // vm.autoGetVehicle();
      //   vm.produceCode();
      // }

      var w = 220, h = 220;                                       //摄像头配置,创建canvas
    var pos = 0, ctx = null, saveCB, image = [];
    var canvas = document.createElement("canvas");
    // $("body").append(canvas);
    canvas.setAttribute('width', w);
    canvas.setAttribute('height', h);
    ctx = canvas.getContext("2d");
    image = ctx.getImageData(0, 0, w, h);

    $("#webcam").webcam({
        width: w,
        height: h,
        mode: "callback",                       //stream,save，回调模式,流模式和保存模式
        swffile: "../../../../../static/js/jQuery-webcam-master/jscam_canvas_only.swf",
        // onTick: function(remain) {
        //     if (0 == remain) {
        //         $("#status").text("拍照成功!");
        //     } else {
        //         $("#status").text("倒计时"+remain + "秒钟...");
        //     }
        // },
        onSave: function(data){              //保存图像
            var col = data.split(";");
            var img = image;
            for(var i = 0; i < w; i++) {
                var tmp = parseInt(col[i]);
                img.data[pos + 0] = (tmp >> 16) & 0xff;
                img.data[pos + 1] = (tmp >> 8) & 0xff;
                img.data[pos + 2] = tmp & 0xff;
                img.data[pos + 3] = 0xff;
                pos+= 4;
            }
            if (pos >= 4 * w * h) {

                ctx.putImageData(img,0,0);      //转换图像数据，渲染canvas
                pos = 0;
                var Imagedata=canvas.toDataURL();  //上传给后台的图片数据
                // console.log(Imagedata)
                vm.submitData.realPersonImageUrl=canvas.toDataURL();
                vm.submitData.realPersonImageFile=canvas.toDataURL().substring(22);
                vm.photoType=1;
            }

        },
        onCapture: function () {               //捕获图像
            webcam.save();
        },
        debug: function (type, string) {       //控制台信息
            console.log(type + ": " + string);
        },
        onLoad: function() {                   //flash 加载完毕执行
            console.log('加载完毕！')
            var cams = webcam.getCameraList();
            for(var i in cams) {
                $("body").append("<p>" + cams[i] + "</p>");
            }
        }
    });

    $(".play").click(function(){
        webcam.capture(1);        //拍照，参数5是倒计时
    });

  }
}
</script>
