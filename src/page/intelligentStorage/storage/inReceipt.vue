<template>
  <div class="content">
    <div class="menuManage operationLog priceManage">
      <div id="printContent">
        <table>
          <span class="number">{{ registerPostData.settlementId }}</span>
          <caption class="title">入库明细单</caption>
          <tr>
            <td class="wid65">发货单位</td>
            <td colspan="4">{{ listData.customerName}}</td>
            <td>收货单位</td>
            <td colspan="2">阿坝九寨沟国家粮食储备库有限责任公司</td>
            <td class="wid65">收货日期</td>
            <td colspan="3">{{ listData.settlementDate }}</td>
          </tr>
          <tr>
            <td colspan="3">承运单位及车(船)号</td>
            <td colspan="2">{{ listData.plateNumber }}</td>
            <td>品&emsp;名</td>
            <td colspan="2">{{ listData.grainKind }}</td>
            <td>等级</td>
            <td>{{ listData.grainLevel }}</td>
            <td>附件</td>
            <td>
              <input type="text" class="inputData"/>
              张</td>
          </tr>
          <tr>
            <td colspan="4"></td>
            <td colspan="2">包装方式</td>
            <td>单位</td>
            <td>数量</td>
            <td rowspan="5">实收情况</td>
            <td>粮油</td>
            <td colspan="2">{{ listData.settlementWeight }}公斤</td>
          </tr>
          <tr>
            <td>品&emsp;&emsp;名</td>
            <td colspan="3">{{ listData.grainKind }}</td>
            <td colspan="2" rowspan="4">{{ listData.packType == '01' ? " 散装 " : " 包装 "}}</td>
            <td rowspan="4">kg</td>
            <td rowspan="4">{{ listData.settlementWeight }}</td>
            <td>件&emsp;数</td>
            <td colspan="2">
              <input type="text" class="inputData"/>
              件</td>
          </tr>
          <tr>
            <td>等&emsp;&emsp;级</td>
            <td colspan="3">{{ listData.grainLevel }}</td>
            <td rowspan="3">损&emsp;耗</td>
            <td rowspan="3" colspan="2">{{ listData.incrementDecrementTotal }}kg</td>
          </tr>
          <tr>
            <td>发运数量</td>
            <td colspan="3">{{ listData.settlementWeight }}公斤</td>
          </tr>
          <tr>
            <td>件&emsp;数</td>
            <td colspan="3">
              <input type="text" class="inputData"/>
              件</td>
          </tr>
        </table>
        <p>
          <span style="margin-left: 1rem;">复核:</span>
          <span>收货:</span>
          <span>制单:</span>
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
    right:120px;
  }
  .inputData{
    border: 0;
    display: inline-block;
    width: 30px;
  }
  body table tr td{
    font-size:20px;
  }
  table{
    width: 1000px;
    height: 360px;
    border-collapse:collapse;
  }
  table tr td{
    text-align: center;
    border:1px solid #333;
  }
  p span{
    display: inline-block;
    width: 20%;
    font-size:20px;
  }
  .wid30{
    width: 30px;
  }
  .wid65{
    width: 65px;
  }
  .wid140{
    width: 140px;
  }
  .title{
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  .number{
    position: absolute;
    top: 16px;
    right: 470px;
    font-size: 18px;
  }
</style>
<script>
  import { myPrint} from "@/utils/public";
  import { inReceiptList } from "@/api/systemManage/dropDown";
  export default {
    name:'inReceipt',
    data(){
      return{
        registerPostData: {
          settlementId:this.$route.query.id
        },
        listData:[]
      };
    },
    methods:{
      getDetail: function() {
        var vm = this;
        layer.load(2);
        inReceiptList({settlementId:vm.registerPostData.settlementId})
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.listData = ret.data.detail;
              vm.settlementId=vm.registerPostData.settlementId;
              //console.log(vm.settlementId);
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          })
          .catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
          });
      },
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
          query: {}
        });
      }
    },
    mounted() {
      var vm=this;
      vm.getDetail();
    }
  }
</script>
