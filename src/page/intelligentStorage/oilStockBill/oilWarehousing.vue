<template>
  <div>
    <div class="content" id="div_print">
      <div class="wrapepr">
        <h2>
          <div id="title1" ref="title1">
            <input type="text" id="title" ref="title"/>
          </div>
          粮油收购凭证</h2>
        <div style="text-align: left;margin: 20px;">
          <span>开票单位：三台琴泉粮站</span>
          <span>{{year_}}年{{month_}}月{{day_}}日</span>
          <span style="display:inline-block;width: 348px;">单位：数量/千克，价格/元/千克</span>
        </div>
        <table>
          <tr>
            <td>售粮人</td>
            <td colspan="2" v-text="stockInfo.customerName"></td>
            <td>地址</td>
            <td colspan="2" ref="addressTd">
              <input type="text" ref="address">
            </td>
            <td>身份证号码</td>
            <td colspan="2" v-text="stockInfo.identification"></td>
          </tr>
          <tr>
            <td>品名</td>
            <td v-text="stockInfo.grainKind"></td>
            <td>等级</td>
            <td v-text="stockInfo.grainLevel"></td>
            <td>水分</td>
            <td v-text="stockInfo.waterValue"></td>
            <td>杂质</td>
            <td colspan="2" v-text="stockInfo.impurityValue"></td>
          </tr>
          <tr>
            <td>单价</td>
            <td>{{stockInfo.unitPrice}}</td>
            <td>水分扣价%</td>
            <td>{{stockInfo.waterIncreDercePrice}}</td>
            <td>杂质扣价%</td>
            <td>{{stockInfo.impurityIncreDecrePrice}}</td>
            <td>结算价格</td>
            <td colspan="2">{{stockInfo.settlementTotalMoney}}元</td>
          </tr>
          <tr>
            <td rowspan="2">结算数量</td>
            <td colspan="3">{{stockInfo.settlementWeight}}Kg（小写）</td>
            <td rowspan="2">实付金额</td>
            <td colspan="4">{{stockInfo.settlementTotalMoney}}元（小写）</td>
          </tr>
          <tr>
            <td colspan="3">{{getNumberChinese(stockInfo.settlementWeight)}}千克（大写）</td>
            <td colspan="4">{{getMoneyChinese(stockInfo.settlementTotalMoney)}}（大写）</td>
          </tr>
          <tr>
            <td rowspan="2">备注</td>
            <td colspan="9" ref="remarks1" class="remarks1">
              <input type="text" ref="remarks" class="remarks"/>
            </td>
          </tr>
        </table>
        <p style="text-align: left;margin: 20px auto;">
          <span>开票员签字：</span>
          <span>付款员签字：</span>
          <span>售粮人签字：</span>
        </p>
        <p style="text-align: left;">说明：1、开票员凭检验员、检斤员、保管员签字的《粮油入库登记检验检斤单》填写收购凭证，否则无效。</p>
      </div>
      <button id="bt" class="table-btn btn-blue noprint" @click="printTable('div_print')">点击打印</button>
      <div class="detail-back">
        <button @click="detailBack();">返回</button>
      </div>
    </div>
  </div>
</template>
<style type="text/css" scoped >
  *{
    padding: 0;
    margin: 0;
  }
  input{
    border: 0;
    outline: none;
    text-align: left;
    line-height: 36px;
    font-size: 24px;
    font-weight: bold;
  }
  .content{
    width: 1200px;
    text-align: center;
    color: #000;
	margin-bottom: 1rem;
  }
  h2{
    text-align: center;
  }
  span{
    display: inline-block;
    width: 310px;
    text-align: left;
  }
  table{
    width:100%;
    border-collapse:collapse;
    margin: 20px auto;
  }
  table tr td{
    width: 60px;
    text-align: center;
    padding: 5px;
    border:1px solid #333;
    letter-spacing: 2px;
  }
  .wrapepr {
    width: 100%;
    line-height: 36px;
    font-size: 24px;
    font-weight: bold;
  }
  .remarks {
    width: 100%;
  }
  #bt{
    width: 100px;
    display: block;
    margin: 20px auto 50px;
    text-align: center;
  }
  @media print {
    .noprint {
      display: none;
    }
  }
  #title1{
    display: inline-block;
  }
  #title{
    text-align: center;
    border-bottom: 2px solid #000;
    font-size: 24px;
    font-weight: bold;
  }

</style>
<script>
  import { myPrint,changeMoneyToChinese,TransformToChinese,getNowFormatDate } from "@/utils/public";
  import { getOilStockById } from "@/api/intelligentStorage/public";
  export default {
    name: "document",
    data() {
      return {
        id_: '',      // 库存单号
        year_: '',
        month_ : '',
        day_: '',
        stockInfo: {  // 出/入库详情
          billId:"",
          cardNo:"",
          carrier:"",
          customerName:"",//售粮人
          grainKind:"",//品名
          waterValue:"",//水份
          grainKindId:"",
          grainLevel:"",//等级
          identification:"",//身份证
          waterIncrementDecrement:"",
          impurityValue:"", //杂质
          impurityIncrementDecrement:"",
          grossWeight:'',
          incrementDecrementTotal:'',
          netWeight:'',
          packType:'',
          plateNumber:'',
          registerNo:'',
          registerType:'',
          settlementDate:'',
          settlementTotalMoney:'',//结算价格
          settlementWeight:'',//结算重量
          tareWeight:'',
          address:'',
          unitPrice:''
        },
      roughOut: ''
      };
    },
    methods: {
      getMoneyChinese: function(num){
        return changeMoneyToChinese(num)
      },
      getNumberChinese: function(num){
        return TransformToChinese(num)
      },
      // 获取入库详情
      getWarehousingById: function(){
        var vm = this;
        //console.log('入库单详情', this.id_)
        getOilStockById({settlementId: this.id_}).then( res => {
          //console.log("res", res);
          if(res.code == 200){
            vm.stockInfo = res.data.detail;
            //console.log(vm.stockInfo);
            if(vm.stockInfo.water && vm.stockInfo.impurity == '出糙率(%)') {
              if(vm.stockInfo.waterValue == vm.stockInfo.impurityValue && vm.stockInfo.waterValue !='0' && vm.stockInfo.impurityValue !='0') {
                vm.roughOut = vm.stockInfo.waterValue
                vm.stockInfo.waterValue = ''
                vm.stockInfo.impurityValue = ''
              }else {
                vm.roughOut = ''
              }
            }
            if(vm.stockInfo.water && vm.stockInfo.impurity == '无') {
              vm.roughOut = ''
              vm.stockInfo.waterValue = ''
              vm.stockInfo.impurityValue = ''
            }
            if(vm.stockInfo.waterValue != vm.stockInfo.impurityValue && vm.stockInfo.waterValue !='0' && vm.stockInfo.impurityValue !='0') {
              vm.roughOut = ''
            }
          }else{
            // layer.alert(res.message, { closeBtn: 0 });
          }

        }).catch(err => {
          // layer.alert(err.message, { closeBtn: 0 });
        });
      },
      printTable(id_) {
        const title = this.$refs.title.value;
        this.$refs.title1.innerHTML = title;
        $('#title1').css('font-size','24px');
        this.$refs.title1.style.borderBottom = '2px solid #000';
        if(this.$refs.title.value==''){
          this.$refs.title1.style.marginBottom='-10px';
          this.$refs.title1.style.width = '300px';
        }
        const remarksVal = this.$refs.remarks.value;
        this.$refs.remarks1.innerHTML = remarksVal;
        this.$refs.addressTd.innerHTML = this.$refs.address.value;
        $('.remarks1').css('font-size','24px');
        $('#bt').css('display','none');
        $('.detail-back').css('display','none');
        myPrint(id_)
      },
      detailBack:function () {
        var vm = this;
        if(this.$route.query.type){
          this.$router.back(-1);
        }else{
          vm.$router.push({
            name: "oilStorageStep",
            query: {
              step: 6
            }
          });
        }
      }
    },
    mounted() {
      var vm = this;
      vm.id_ = this.$route.query.id
      this.getWarehousingById();
      const dataTime = getNowFormatDate().split(' ')[0].split('-');
      vm.year_ = dataTime[0];
      vm.month_ = dataTime[1];
      vm.day_ = dataTime[2];
    }
  };

</script>
