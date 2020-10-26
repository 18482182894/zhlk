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
                                倒仓单号：
                                <label v-text="detailData.reverseJobId"></label>
                            </span>
                            <span>
                                倒出仓：
                                <label v-text="detailData.outStorehouseName"></label>
                            </span>
                            <span>
                                倒出廒间：
                                <label v-text="detailData.outWarehouseName"></label>
                            </span>
                            <span>
                                倒入仓：
                                <label v-text="detailData.inStorehouseName"></label>
                            </span>
                            <span>
                                倒入廒间：
                                <label v-text="detailData.inWarehouseName"></label>
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
                                创建日期：
                                <label v-text="detailData.createDate"></label>
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
  import { reverseDetail } from "@/api/business/warehousingStock/reverse";
import {
    grainDetail
} from '@/api/systemManage/basicData/grainVarieties'
export default {
  name: "companyDetail",
  data() {
    return {
      postData: {
        reverseJobId: this.$route.query.id
      },
      detailData: ""
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      reverseDetail(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.detailData = ret.data.reverseJob;
            const createDate = vm.detailData.createDate.slice(0,10)
            vm.detailData.createDate = createDate
            grainDetail({grainVarietyId:ret.data.reverseJob.grainKind}).then(ret=>{
                  layer.closeAll('loading');
                  if (ret.code==200) {
                      vm.detailData.grainKind=ret.data.grainVariety.grainVarietyName;
                      
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
    detailBack:function () {
       // this.$router.back(-1);
      this.$router.push({
        name: "reverse",
        query: {
          grainKindId: this.$route.query.grainKindId,
          pageNo: this.$route.query.pageNo,
          startDate: this.$route.query.startDate,
          endDate: this.$route.query.endDate
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
