<template>
    <div class="content">
        <div class="menuManage userManage">
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">基础信息</div>
                </div>
                <div class="tag-box-content">
                    <div class="userManage-detail">
                        <div>

                            <span>
                                记录编号：
                                <label v-text="detailData.registorNo"></label>
                            </span>
                            <span>
                                卡号：
                                <label v-text="detailData.cardNo"></label>
                            </span>
                            <span>
                                客户名称：
                                <label v-text="detailData.customerName"></label>
                            </span>
                            <span>
                                身份证号：
                                <label v-text="detailData.identityNo"></label>
                            </span>
                            <span>
                                承运人：
                                <label v-text="detailData.carrier"></label>
                            </span>
                            <span>
                                日期：
                                <label v-text="detailData.registorDate"></label>
                            </span>
                            <span>
                                包装方式：
                                <label v-text="detailData.packType==1?'散装':'包装'"></label>
                            </span>
                            <span>
                                车牌号：
                                <label v-text="detailData.plateNumber"></label>
                            </span>
                            <span>
                                粮油品种：
                                <label v-text="detailData.grainVariety"></label>
                            </span>
                            <span>
                                油罐名称：
                                <label v-text="detailData.warehouseName"></label>
                            </span>
                            <span>
                                登记出入库类型：
                                <label v-text="detailData.registorType"></label>
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
                  <img :src="detailData.identityImageFile" alt="" class="register-img">
                  <img :src="detailData.realPersonImageFile" title="证人拍照时候的视频截图" class="register-img">
                  <img :src="detailData.plateNumberImageFile" title="车牌拍照时候的视频截图" class="register-img">
                  <div class="register-img">
                    <div id="qrcode" class="edit-code"></div>
                    <div class="table-btn btn-green" @click="printPic();">打印</div>
                  </div>
                </div>
            </div>
            <div class="detail-back">
                <button @click="detailBack();">返回</button>
            </div>
        </div>
    </div>
</template>

<script>
import { registerDetail} from "@/api/intelligentStorage/public"; 
import { myPrint} from "@/utils/public"; 
import QRCode from 'qrcodejs2' 
import {
    grainDetail
} from '@/api/systemManage/basicData/grainVarieties'
export default {
  name: "companyDetail",
  data() {
    return {
      postData: {
        registorNo: this.$route.query.id
      },
      detailData: ""
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      registerDetail(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret))
            vm.detailData = ret.data.dataMap;
            const registorDate = vm.detailData.registorDate.slice(0,10)
            vm.detailData.registorDate = registorDate
              grainDetail({grainVarietyId:ret.data.dataMap.grainVariety}).then(ret=>{
                  layer.closeAll('loading');
                  if (ret.code==200) {
                      vm.detailData.grainVariety=ret.data.grainVariety.grainVarietyName;
                      
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
    qrcode () { //绘制二维码
      var vm=this;
      var QRcodeData=localStorage.getItem("QRcodeData");
      let qrcode = new QRCode('qrcode', { 
        width: 200, height: 200, // 高度 
        text: vm.postData.registorNo,// 二维码内容 
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
      if(this.$route.query.type){
        this.$router.back(-1);
      }else{
          vm.$router.push({
            name: "oilStorageStep",
            query: {
              step: 1
            }
          });
      }
    }
  },
  mounted() {
    var vm = this;
    vm.getDetail();
    vm.qrcode();
  }
};
</script>
