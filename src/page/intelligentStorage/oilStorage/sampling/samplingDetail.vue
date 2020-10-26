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
                            <span>
                                扦样编号：
                                <label v-text="detailData.samplingId"></label>
                            </span>
                            <span>
                                扦样单号：
                                <label v-text="detailData.samplingBillNo"></label>
                            </span>
                            <span>
                                扦样人：
                                <label v-text="detailData.samplingPerson"></label>
                            </span>
                            <span>
                                送样人：
                                <label v-text="detailData.sendSamplePerson"></label>
                            </span>
                            <span>
                                粮油品种：
                                <label v-text="grainVariety"></label>
                            </span>
                            <span>
                                样品重量(千克):
                                <label v-text="detailData.sampleWeight"></label>
                            </span>
                            <span>
                                扦样时间：
                                <label v-text="detailData.samplingDatetime"></label>
                            </span>
                            <span>
                                车牌号：
                                <label v-text="detailData.plateNumber"></label>
                            </span>
                            <br>
                            <span style="width: 50%;">
                                二维码：
                                <div id="qrcode" class="edit-code"></div>
                                <button class="table-btn btn-green"  @click="printPic();">打印</button>
                            </span>
                            
                        </div>
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
import { samplingDetail} from "@/api/intelligentStorage/public";  
import { myPrint} from "@/utils/public"; 
import QRCode from 'qrcodejs2'
export default {
  name: "companyDetail",
  data() {
    return {
      postData: {
        registorNo: this.$route.query.id
      },
      grainVariety:this.$route.query.data,
      detailData: ""
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      samplingDetail(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.detailData = ret.data.dataMap;
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
              step: 2
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
