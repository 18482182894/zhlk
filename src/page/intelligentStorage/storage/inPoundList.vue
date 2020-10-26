<template>
  <div class="content">
    <div class="menuManage operationLog priceManage">
      <div class="conten" id="printContent">
        <h2>九寨沟国家粮食储备库</h2>
        <p>
          <label>司机：</label>
          <label>张三</label>
        </p>
        <p>
          <label>车牌：</label>
          <label>川A8888</label>
        </p>
        <p>
          <label>品种：</label>
          <label>稻谷</label>
        </p>
        <p>
          <label>毛重：</label>
          <label>75kg</label>
        </p>
        <p>
          <label>皮重：</label>
          <label>5kg</label>
        </p>
        <p>
          <label>净重：</label>
          <label>70kg</label>
        </p>
        <p class="lastData">
          <label>签字：</label>
        </p>
      </div>
      <div class="btn btn-print" @click="printData();">
        <label>打印</label>
      </div>
      <div class="detail-back">
        <button @click="detailBack();">返回</button>
      </div>
    </div>
  </div>
</template>
<style type="text/css" scoped>
  .btn-print{
    position: absolute;
    right: 120px;
  }
  .conten{
    width: 188px;
    padding: 20px;
  }
  label{
    line-height: 1.5rem;
  }
  h2{
    margin: 0 0 2rem 3rem;
  }
  .lastData{
    margin: 2rem;
  }
</style>
<script>
  import { myPrint} from "@/utils/public";
  export default {
    name: 'poundList',
    data() {
      return {

      }
    },
    methods:{
      printData:function () {//打印
        var vm = this;
        vm.showType='detail';
        layer.load(2);
        vm.$nextTick(function () {
          myPrint('printContent');
        });
      },
      detailBack:function () {
        var vm = this;
        vm.$router.push({
          name: "storageStep",
          query: {

          }
        });
      }
    },
    mounted() {

    }
  }
</script>
