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
                                盘点编号：
                                <label v-text="detailData.inventoryId"></label>
                            </span>
                            <span>
                                盘点仓库：
                                <label v-text="detailData.storehouseName"></label>
                            </span>
                            <span>
                                倒出廒间：
                                <label v-text="detailData.warehouseName"></label>
                            </span>
                            <span>
                                粮食品种：
                                <label v-text="detailData.grainKind"></label>
                            </span>
                            <span>
                                盘点人：
                                <label v-text="detailData.inventoryPerson"></label>
                            </span>
                            <span>
                                账面库存重量（千克）：
                                <label v-text="detailData.accountsInventoryWeight"></label>
                            </span>
                            <span>
                                实际库存重量（千克）：
                                <label v-text="detailData.realInventoryWeight"></label>
                            </span>
                            <span>
                                盘点日期：
                                <label v-text="detailData.inventoryDate"></label>
                            </span>
                            <span>
                                备注：
                                <label v-text="detailData.memo"></label>
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
  import { stockChecksDetail } from "@/api/business/warehousingStock/stockChecks";
import {
    grainDetail
} from '@/api/systemManage/basicData/grainVarieties'
export default {
  name: "companyDetail",
  data() {
    return {
      postData: {
        inventoryId: this.$route.query.id
      },
      detailData: ""
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      stockChecksDetail(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.detailData = ret.data.inventoryDetail;
            const inventoryDate = vm.detailData.inventoryDate.slice(0,10)
            vm.detailData.inventoryDate = inventoryDate
            grainDetail({grainVarietyId:ret.data.inventoryDetail.grainKind}).then(ret=>{
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
        name: "stockChecks",
        query: {
          storehouseGbCode: this.$route.query.storehouseGbCode,
          warehouseGbCode: this.$route.query.warehouseGbCode,
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
