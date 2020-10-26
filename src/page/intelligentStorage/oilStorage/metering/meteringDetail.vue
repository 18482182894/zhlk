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
                                卡号：
                                <label v-text="detailData.cardNo"></label>
                            </span>
                           <!--  <span>
                                通知单号：
                                <label v-text="detailData.storehouseName"></label>
                            </span> -->
                            <span>
                                出入库类型：
                                <label v-text="detailData.registorType"></label>
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
                                毛重(千克)：
                                <label v-text="detailData.grossWeight"></label>
                            </span>
                            <span>
                                皮重(千克)：
                                <label v-text="detailData.tareWeight"></label>
                            </span>
                            <span>
                                净重(千克)：
                                <label v-text="detailData.netWeight"></label>
                            </span>
                            <span>
                                水份增扣量(千克)：
                                <label v-text="detailData.waterIncrementDecrement"></label>
                            </span>
                            <span>
                                杂质增扣量(千克)：
                                <label v-text="detailData.impurityIncrementDecrement"></label>
                            </span>
                            <span>
                                其他增扣量(千克)：
                                <label v-text="detailData.otherIncrementDecrement"></label>
                            </span>
                            <span>
                                扣量总计(千克)：
                                <label v-text="detailData.incrementDecrementTotal"></label>
                            </span>
                            <span>
                                结算重量(千克)：
                                <label v-text="detailData.totalWeight"></label>
                            </span>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">计量监控</div>
                </div>
                <div class="tag-box-content">
                    <div class="register-img" >
                        <input type="hidden" id="message" >
                        <iframe src="" id="iframe"></iframe>
                    </div>
                    <div class="register-img" >
                        <input type="hidden" id="message1" >
                        <iframe src="" id="iframe1"></iframe>
                    </div>
                    <div class="register-img" >
                        <input type="hidden" id="message2" >
                        <iframe src="" id="iframe2"></iframe>
                    </div>
                    <div class="register-img" >
                        <input type="hidden" id="message3" >
                        <iframe src="" id="iframe3"></iframe>
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
import { meteringDetail} from "@/api/intelligentStorage/public"; 
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
        detailData: "",
        oLiveView:{
            iProtocol: 1,            // protocol 1：http, 2:https
            szIP: "192.168.188.240",    // protocol ip
            szPort: "80",            // protocol port
            szUsername: "admin",     // device username
            szPassword: "12345", // device password
            iStreamType: 1,          // stream 1：main stream  2：sub-stream  3：third stream  4：transcode stream
            iChannelID: 1,           // channel no
            bZeroChannel: false      // zero channel                
        }
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      meteringDetail(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            console.log(JSON.stringify(ret))
            vm.detailData = ret.data.weighingDetail;
            
              grainDetail({grainVarietyId:ret.data.weighingDetail.grainVariety}).then(ret=>{
                  layer.closeAll('loading');
                  if (ret.code==200) {
                      vm.detailData.grainVariety=ret.data.grainVariety.grainVarietyName;
                      
                  }else{
                      layer.alert(err.data, { closeBtn: 0 }); 
                  }

              }).catch(err=>{
                  layer.alert(err.data, { closeBtn: 0 }); 
              });
              vm.showCamera('message','iframe',vm.oLiveView);
              vm.showCamera('message1','iframe1',vm.oLiveView);
              vm.showCamera('message2','iframe2',vm.oLiveView);
              vm.showCamera('message3','iframe3',vm.oLiveView);
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.data, { closeBtn: 0 });
        });
    },
    showCamera:function (id,iframe,message) {
        var vm=this;
        $('#'+id).val(JSON.stringify(message)); 
        document.querySelector('#'+iframe).src='../../../../static/html/video.html';          
    },
    detailBack:function () {
      var vm = this;
      if(this.$route.query.type){
        this.$router.back(-1);
      }else{
          vm.$router.push({
            name: "oilStorageStep",
            query: {
              step: 4
            }
          });
      }
    }
  },
  mounted() {
    var vm = this;
    vm.getDetail();
  }
};
</script>
