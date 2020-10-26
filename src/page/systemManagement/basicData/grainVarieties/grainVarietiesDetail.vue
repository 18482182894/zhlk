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
                                粮油品种：
                                <label v-text="detailData.grainVarietyName"></label>
                            </span>
                            <span>
                                备 注：
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
    grainDetail
} from '@/api/systemManage/basicData/grainVarieties'
export default {
  name: 'grainVarietiesDetail',
  data () {
    return {
        postData:{
            grainVarietyId:this.$route.query.id,
            grainVarietyName:this.$route.query.grainVarietyName,
            pageNo:this.$route.query.pageNo
        },
        detailData:''
    }
  },
  methods: {
    getDetail:function () {
        var vm=this;
          layer.load(2);
          grainDetail(vm.postData).then(ret=>{
              layer.closeAll('loading');
              if (ret.code==200) {
                  vm.detailData=ret.data.grainVariety;

              }else{
                  layer.alert(ret.data, { closeBtn: 0 });
              }

          }).catch(err=>{
              layer.alert(err.data, { closeBtn: 0 });
          });
      },
    detailBack:function (id,grainVarietyName) {
      var vm=this;
      this.$router.push({
        name: "grainVarieties",
        query: {
          id:id,
          grainVarietyName:vm.postData.grainVarietyName,
          pageNo:vm.postData.pageNo
        }
      });
    }
  },
  mounted () {
      var vm=this;
      vm.getDetail();
  }
}
</script>
