<template>
    <div class="content">
        <div class="menuManage roleManage">
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">基础信息</div>
                </div>
                <div class="tag-box-content">
                    <div class="userManage-detail">
                        <div>
                            <span>
                                合同标题：
                                <label v-text="detailData.contractTitle"></label>
                            </span>
                            <span>
                                合同编号：
                                <label v-text="detailData.contractId"></label>
                            </span>
                            <span>
                                申请单编号：
                                <label v-text="detailData.applyId"></label>
                            </span>
                            <span>
                                申请单名称：
                                <label v-text="detailData.applyName"></label>
                            </span>
                            <span>
                                客户名称：
                                <label v-text="detailData.customerName"></label>
                            </span>
                            <span>
                                联系人：
                                <label v-text="detailData.linkman"></label>
                            </span>
                            <span>
                                联系方式：
                                <label v-text="detailData.linkmanTelephone"></label>
                            </span>
                            <span>
                                身份证号码：
                                <label v-text="detailData.customerIdentity"></label>
                            </span>
                            <span>
                                粮食品种：
                                <label v-text="detailData.goodsKind"></label>
                            </span>
                            <span>
                                收获年度：
                                <label v-text="detailData.harvestYear"></label>
                            </span>
                            <span>
                                粮食数量（千克）：
                                <label v-text="detailData.quantity"></label>
                            </span>
                            <span>
                                粮食产地：
                                <label v-text="detailData.productArea"></label>
                            </span>
                            <span>
                                粮食性质：
                                <label v-text="detailData.grainAttribute"></label>
                            </span>
                            <span>
                                出入库类型：
                                <label v-text="detailData.outInType"></label>
                            </span>
                            <span>
                                运输方式：
                                <label v-text="detailData.shippingType"></label>
                            </span>
                            <span>
                                车辆：
                                <label v-text="detailData.vehicleNum"></label>
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
import { getRequestNote } from "@/api/business/requestNote";
import {grainNature} from "@/api/systemManage/dropDown";
import {
    grainDetail
} from '@/api/systemManage/basicData/grainVarieties'
export default {
  name: "planManageDetail",
  data() {
    return {
      postData: {
        applyId: this.$route.query.id
      },
      detailData: ""
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      getRequestNote(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret))
            vm.detailData = ret.data.dataMap;

              grainDetail({grainVarietyId:vm.detailData.goodsKind}).then(ret=>{
                  layer.closeAll('loading');
                  if (ret.code==200) {
                      vm.detailData.goodsKind=ret.data.grainVariety.grainVarietyName;
                      
                  }else{
                      layer.alert(ret.data, { closeBtn: 0 }); 
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
       //applyName:this.$route.query.applyName
      this.$router.push({
        name: "request",
        query: {
          applyName:this.$route.query.applyName,
          pageNo:this.$route.query.pageNo

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
