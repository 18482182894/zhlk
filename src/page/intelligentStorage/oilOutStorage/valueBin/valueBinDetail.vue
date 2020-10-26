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
                                车牌号：
                                <label v-text="detailData.plateNumber"></label>
                            </span>
                            <span>
                                出入库类型：
                                <label v-text="detailData.registorType"></label>
                            </span>
                            <span>
                                粮油品种：
                                <label v-text="detailData.grainVariety"></label>
                            </span>
                            <span>
                                粮食性质：
                                <label v-text="detailData.grainAttribute"></label>
                            </span>
                            <span>
                                油罐信息：
                                <label v-text="detailData.warehouseName"></label>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">监控</div>
                </div>
                <div class="tag-box-content">
                  <img :src="detailData.monitorImage" alt="" class="register-img">
                </div>
            </div>
            <div class="detail-back">
                <button @click="detailBack();">返回</button>
            </div>
        </div>
    </div>
</template>

<script>
import { valueBinDetail} from "@/api/intelligentStorage/public";
import {
    grainDetail
} from '@/api/systemManage/basicData/grainVarieties'
import {grainNature
} from "@/api/systemManage/dropDown";

export default {
  name: "companyDetail",
  data() {
    return {
      postData: {
        registorNo: this.$route.query.id
      },
      detailData: "",
      grainNaturelList:[],
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      valueBinDetail(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.detailData = ret.data.ondutyDetail;

             grainDetail({grainVarietyId:ret.data.ondutyDetail.grainVariety}).then(ret=>{
                  layer.closeAll('loading');
                  if (ret.code==200) {
                      vm.detailData.grainVariety=ret.data.grainVariety.grainVarietyName;

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
      var vm = this;
      if(this.$route.query.type){
        this.$router.back(-1);
      }else{
          vm.$router.push({
            name: "oilOutStorageStep",
            query: {
              step: 5,
              condition:this.$route.query.condition
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
