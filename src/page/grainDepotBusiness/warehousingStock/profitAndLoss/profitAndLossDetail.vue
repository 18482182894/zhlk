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
                                损溢编号：
                                <label v-text="detailData.lossOverflowId"></label>
                            </span>
                            <span>
                                仓房：
                                <label v-text="detailData.storehouseName"></label>
                            </span>
                            <span>
                                存粮性质：
                                <label v-text="detailData.grainAttribute"></label>
                            </span>
                            <span>
                                粮食品种：
                                <label v-text="detailData.grainKind"></label>
                            </span>
                            <span>
                                损溢数量（千克）：
                                <label v-text="detailData.lossOverflowNumber"></label>
                            </span>
                            <span>
                                损溢率：
                                <label v-text="detailData.lossOverflowRate"></label>
                            </span>
                            <span>
                                损溢状态：
                                <label v-text="detailData.overflowType"></label>
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
  import { profitAndLossDetail } from "@/api/business/warehousingStock/profitAndLoss";
import {grainNature} from "@/api/systemManage/dropDown";
import {
    grainDetail
} from '@/api/systemManage/basicData/grainVarieties'
export default {
  name: "companyDetail",
  data() {
    return {
      postData: {
        lossOverflowId: this.$route.query.id
      },
      grainNaturelList:[],
      detailData: ""
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      profitAndLossDetail(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.detailData = ret.data.lossOverflowDetail;
            console.log(vm.detailData)
            grainDetail({grainVarietyId:ret.data.lossOverflowDetail.grainKind}).then(ret=>{
                  layer.closeAll('loading');
                  if (ret.code==200) {
                      vm.detailData.grainKind=ret.data.grainVariety.grainVarietyName;
                      
                  }else{
                      layer.alert(err.message, { closeBtn: 0 }); 
                  }

              }).catch(err=>{
                  layer.alert(err.message, { closeBtn: 0 }); 
              });
              grainNature({}).then(ret => {//粮食性质
                  if (ret.code == 200) {
                    vm.grainNaturelList = ret.data.dataList;
                    for (var i = 0; i < vm.grainNaturelList.length; i++) {//粮食性质
                        if (vm.grainNaturelList[i].dicInfoCode== vm.detailData.grainAttribute) {
                            vm.detailData.grainAttribute=vm.grainNaturelList[i].dicInfoValue
                        }
                    }
                  } else {
                    layer.alert(ret.data, { closeBtn: 0 });
                  }
              }).catch(err => {
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
    detailBack:function () {
        //this.$router.back(-1);
      this.$router.push({
        name: "profitAndLoss",
        query: {
          storehouseGbCode: this.$route.query.storehouseGbCode,
          grainKind: this.$route.query.grainKind,
          grainAttribute: this.$route.query.grainAttribute,
          pageNo: this.$route.query.pageNo
        }
      });
    }
  },
  mounted() {
    var vm = this;
    vm.getDetail();
  }
};
</script>
