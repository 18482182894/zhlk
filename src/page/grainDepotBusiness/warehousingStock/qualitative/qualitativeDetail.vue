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
                                定性编号:
                                <label v-text="detailData.qualitativeId"></label>
                            </span>
                            <span>
                                仓房：
                                <label v-text="detailData.storehouseName"></label>
                            </span>
                            <span>
                                廒间：
                                <label v-text="detailData.warehouseName"></label>
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
                                数量（千克）：
                                <label v-text="detailData.grainNumber"></label>
                            </span>
                            <span>
                                定性日期：
                                <label v-text="detailData.qualitativeDate"></label>
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
  import { qualitativeDetailApi } from "@/api/business/warehousingStock/qualitative";
import {grainNature} from "@/api/systemManage/dropDown";
import {
    grainDetail
} from '@/api/systemManage/basicData/grainVarieties'
export default {
  name: "companyDetail",
  data() {
    return {
      postData: {
        qualitativeId: this.$route.query.id
      },
      grainNaturelList:[],
      detailData: ""
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      qualitativeDetailApi(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          // console.log(JSON.stringify(ret))
          if (ret.code == 200) {
            vm.detailData = ret.data.qualitativeDetail;

             grainDetail({grainVarietyId:ret.data.qualitativeDetail.grainKind}).then(ret=>{
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
        name: "qualitative",
        query: {
          storehouseGbCode: this.$route.query.storehouseGbCode,
          grainKind: this.$route.query.grainKind,
          grainAttribute: this.$route.query.grainAttribute,
          startTime: this.$route.query.startTime,
          endTime: this.$route.query.endTime,
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
