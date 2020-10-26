<template>
    <div class="content">
        <div class="menuManage roleManage">
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">基础信息</div>
                </div>
                <div class="tag-box-content">
                    <div class="userManage-detail ">
                        <div>
                            <span>
                                品种：
                                <label v-text="detailData.grainVarietyName"></label>
                            </span>
                            <span>
                                粮食性质：
                                <label v-text="detailData.inventoryPropertyValue"></label>
                            </span>
                            <span>
                                指标项：
                                <label v-text="detailData.indicatorName"></label>
                            </span>
                            <span>
                                上限：
                                <label v-text="detailData.upperLimitValue"></label>
                            </span>
                            <span>
                                下限：
                                <label v-text="detailData.lowerLimitValue"></label>
                            </span>
                            <span>
                                等级：
                                <label v-text="detailData.grainLevelValue"></label>
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
import {
    testSetupDetail
} from '@/api/systemManage/basicData/testSetup'
export default {
    name: 'desktop',
    data () {
      return {
            postData:{
                testStandardId:this.$route.query.id,
                grainVarietyId: this.$route.query.grainVarietyId,
                inventoryPropertyId:this.$route.query.inventoryPropertyId,
                pageNo:this.$route.query.pageNo
            },
            detailData:''
      }
    },
    methods: {
        getDetail:function () {
          var vm=this;
            layer.load(2);
            testSetupDetail(vm.postData).then(ret=>{
                layer.closeAll('loading');
                if (ret.code==200) {
                    vm.detailData=ret.data.testStandardDetail;

                }else{
                    layer.alert(ret.data, { closeBtn: 0 });
                }

            }).catch(err=>{
                layer.alert(err.message, { closeBtn: 0 });
            });
        },
        detailBack:function (id,grainVarietyId,inventoryPropertyId,pageNo) {
          var vm = this;
          this.$router.push({
            name: "testSetup",
            query: {
              id: id,
              grainVarietyId:vm.postData.grainVarietyId,
              inventoryPropertyId:vm.postData.inventoryPropertyId,
              pageNo:vm.postData.pageNo
            }
          });
        }
    },
    mounted () {
        var vm=this;
        vm.getDetail();
    },
}

</script>
