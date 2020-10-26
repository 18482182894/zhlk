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
                                粮食品种：
                                <label v-text="detailData.grainKind"></label>
                            </span>
                            <span>
                                粮食性质：
                                <label v-text="detailData.grainAttribute"></label>
                            </span>
                            <span>
                                当前数量（千克）：
                                <label v-text="detailData.currentQuantity"></label>
                            </span>
                            <span>
                                累计入仓（千克）：
                                <label v-text="detailData.accumulativeInput"></label>
                            </span>
                            <span>
                                累计出仓（千克）：
                                <label v-text="detailData.accumulativeOutput"></label>
                            </span>
                            <span>
                                粮食等级：
                                <label v-text="detailData.grainLevel"></label>
                            </span>
                            <span>
                                开始日期：
                                <label v-text="detailData.startDate"></label>
                            </span>
                            <span>
                                结束日期：
                                <label v-text="detailData.endDate"></label>
                            </span>
                            <span>
                                仓房号：
                                <label v-text="detailData.storehouseName"></label>
                            </span>
                            <span>
                                库存识别码：
                                <label v-text="detailData.stockIdentificationCode"></label>
                            </span>
                            <span>
                                保管账ID：
                                <label v-text="detailData.warehouseKeepingAccountId"></label>
                            </span>
                            <span>
                                二维码：
                                <img :src="detailData.qrCodeUrl" alt="">
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
  import { inventoryDetail } from "@/api/business/warehousingStock/inventory";
import {
    grainDetail
} from '@/api/systemManage/basicData/grainVarieties'
import {grainNature, grainOilLevel } from "@/api/systemManage/dropDown";
export default {
  name: "companyDetail",
  data() {
    return {
      postData: {
        storagehouseAccountNo: this.$route.query.id
      },
      detailData: ""
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      inventoryDetail(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.detailData = ret.data.dataMap;
            const startDate = vm.detailData.startDate.slice(0,10)
            vm.detailData.startDate = startDate
            if(vm.detailData.endDate) {
              const endDate = vm.detailData.endDate.slice(0,10)
              vm.detailData.endDate= endDate
            }
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

              grainDetail({grainVarietyId:ret.data.dataMap.grainKind}).then(ret=>{
                  layer.closeAll('loading');
                  if (ret.code==200) {
                      vm.detailData.grainKind=ret.data.grainVariety.grainVarietyName;
                      
                  }else{
                      layer.alert(err.message, { closeBtn: 0 }); 
                  }

              }).catch(err=>{
                  layer.alert(err.message, { closeBtn: 0 }); 
              });

                grainOilLevel({}).then(ret => {//粮食等级
                  if (ret.code == 200) {
                    vm.grainOilLevelList = ret.data.dataList;
                    for (var i = 0; i < vm.grainOilLevelList.length; i++) {//取粮食等级
                        if (vm.grainOilLevelList[i].dicInfoCode== vm.detailData.grainLevel) {
                            vm.detailData.grainLevel=vm.grainOilLevelList[i].dicInfoValue
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
        name: "inventoryAccount",
        query: {
          storehouseGbCode:this.$route.query.storehouseGbCode,
          warehouseGbCode:this.$route.query.warehouseGbCode,
          warehouseState:this.$route.query.warehouseState,
          grainKind:this.$route.query.grainKind,
          grainAttribute:this.$route.query.grainAttribute,
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
