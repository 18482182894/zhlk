<template>
  <div class="content">
    <div class="menuManage operationLog priceManage">
      <div id="printContent">
        <table>
          <caption class="title">出库明细单</caption>
          <tr>
            <td rowspan="3" class="wid30">发货</td>
            <td>单位</td>
            <td colspan="7">九寨沟国家粮食储备库</td>
            <td rowspan="3" class="wid30">收货</td>
            <td>单位</td>
            <td colspan="6">{{ listData.customerName }}</td>
            <td rowspan="3" class="wid30">承运</td>
            <td>单位</td>
            <td colspan="6">{{ listData.carrier }}</td>
          </tr>
          <tr>
            <td>地点</td>
            <td colspan="7">九寨沟国家粮食储备库</td>
            <td>地点</td>
            <td colspan="6">{{ listData.customerName }}</td>
            <td>工具</td>
            <td colspan="6">汽车</td>
          </tr>
          <tr>
            <td>日期</td>
            <td colspan="7">{{ listData.settlementDate }}</td>
            <td>日期</td>
            <td colspan="6">{{ listData.settlementDate }}</td>
            <td>车号</td>
            <td colspan="6">{{ listData.plateNumber }}</td>
          </tr>
          <tr>
            <td colspan="2">品&emsp;名</td>
            <td colspan="6">{{ listData.grainKind }}</td>
            <td colspan="15" style="text-align: left;">检验凭单编号或主要检验内容</td>
          </tr>
          <tr>
            <td colspan="8">发&emsp;货&emsp;方&emsp;托&emsp;收</td>
            <td colspan="15">收&emsp;货&emsp;方&emsp;实&emsp;收</td>
          </tr>
          <tr>
            <td colspan="2">等&emsp;级</td>
            <td colspan="6">{{ listData.grainLevel }}</td>
            <td colspan="3">等&emsp;级</td>
            <td colspan="12">{{ listData.grainLevel }}</td>
          </tr>
          <tr>
            <td colspan="2">数&emsp;量</td>
            <td colspan="6">{{ listData.settlementWeight }}</td>
            <td colspan="3">数&emsp;量</td>
            <td colspan="12">{{ listData.settlementWeight }}</td>
          </tr>
          <tr>
            <td colspan="2">单&emsp;价</td>
            <td colspan="6">{{ listData.unitPrice }}</td>
            <td colspan="3">包（件）数</td>
            <td colspan="12">
              <input type="text" class="inputData"/>
            </td>
          </tr>
          <tr>
            <td colspan="2">金&emsp;额</td>
            <td colspan="6">{{ listData.settlementTotalMoney }}</td>
            <td colspan="15"></td>
          </tr>
          <tr>
            <td>发货方</td>
            <td colspan="3">(公章)</td>
            <td class="wid30">负责人</td>
            <td colspan="2">(盖章)</td>
            <td class="wid30" colspan="2">经手人</td>
            <td colspan="2">(盖章)</td>
            <td class="wid30">承运方</td>
            <td colspan="2">(盖章)</td>
            <td class="wid30">收货方</td>
            <td colspan="3">(公章)</td>
            <td>负责人</td>
            <td colspan="2">盖章)</td>
            <td class="wid30">经手人</td>
            <td colspan="2">(盖章)</td>
          </tr>
        </table>
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
  .inputData{
    border: 0;
    display: inline-block;
    width: 30px;
  }
  body{
    font-size: 20px;
  }
  #printContent{
    width: 800px;
    margin: 0 auto;
  }
  table{
    width:800px;
    height: 300px;
    border-collapse:collapse;
  }
  table tr td{
    font-size: 20px;
    text-align: center;
    border:1px solid #333;
  }
  .wid30{
    width: 20px;
  }
  .title{
    font-size: 20px;
    font-weight: bold;
    margin-bottom: .5rem;
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
      }
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
              console.log(vm.listData);
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
          name: "outOfStockStep",
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
