<template>
    <div>
        <div class="content" id="div_print">
            <div class="wrapepr">
              <h2>发货明细表</h2>
              <p>品名：{{stockInfo.grainKind}}</p>
              <table>
                <tr>
                  <td colspan="4" class="leter60">发货</td>
                  <td colspan="4" class="leter60">收货</td>
                  <td colspan="4" class="leter60">承运</td>
                </tr>
                <tr>
                  <td class="leter10">单位</td>
                  <td colspan="3">三台县琴泉粮站储备库</td>
                  <td class="leter10">单位</td>
                  <td colspan="3" ref="receiving1" class="receiving1">
                    <input type="text" ref="receiving"/>
                  </td>
                  <td class="leter10">单位</td>
                  <td colspan="3">{{stockInfo.carrier}}</td>
                </tr>
                <tr>
                  <td class="leter10">地点</td>
                  <td colspan="3" ref="delivery1" class="delivery1">
                    <input type="text" ref="delivery"/>
                  </td>
                  <td class="leter10">地点</td>
                  <td colspan="3" ref="receipt1" class="receipt1">
                    <input type="text" ref="receipt"/>
                  </td>
                  <td class="leter10">工具</td>
                  <td colspan="3">{{stockInfo.shoppingType}}</td>
                </tr>
                <tr>
                  <td class="leter10">日期</td>
                  <td colspan="3">{{stockInfo.settlementDate}}</td>
                  <td class="leter10">日期</td>
                  <td colspan="3">{{stockInfo.settlementDate}}</td>
                  <td class="leter10">车号</td>
                  <td colspan="3">{{stockInfo.plateNumber}}</td>
                </tr>
                <tr>
                  <td class="leter10">等级</td>
                  <td colspan="3">{{stockInfo.grainLevel}}</td>
                  <td class="leter10">等级</td>
                  <td colspan="3">{{stockInfo.grainLevel}}</td>
                  <td rowspan="3" class="leter10">主要检验项目</td>
                  <td class="leter10">水份</td>
                  <td class="leter10">杂质</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="leter10">数量</td>
                  <td colspan="3">{{stockInfo.settlementWeight}}</td>
                  <td class="leter10">数量</td>
                  <td colspan="3">{{stockInfo.settlementWeight}}</td>
                  <td>{{stockInfo.waterIncrementDecrement}}</td>
                  <td>{{stockInfo.impurityIncrementDecrement}}</td>
                  <td></td>
                </tr>
                <tr>
                  <td colspan="3">包装物品名规格等级</td>
                  <td class="leter10">数量</td>
                  <td colspan="3">包装物品名规格等级</td>
                  <td class="leter10">数量</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td colspan="3" v-if="stockInfo.packType=='01'">{{'包装'}}/{{stockInfo.grainKind}}/{{stockInfo.grainLevel}}</td>
                  <td colspan="3" v-if="stockInfo.packType=='02'">{{'散装'}}/{{stockInfo.grainKind}}/{{stockInfo.grainLevel}}</td>
                  <td>{{stockInfo.settlementWeight}}</td>
                  <td colspan="3" v-if="stockInfo.packType=='01'">{{'包装'}}/{{stockInfo.grainKind}}/{{stockInfo.grainLevel}}</td>
                  <td colspan="3" v-if="stockInfo.packType=='02'">{{'散装'}}/{{stockInfo.grainKind}}/{{stockInfo.grainLevel}}</td>
                  <td>{{stockInfo.settlementWeight}}</td>
                  <td rowspan="2" class="leter10">备注</td>
                  <td colspan="3" ref="remarks1" class="remarks1">
                    <input type="text" ref="remarks"/>
                  </td>
                </tr>
              </table>
              <div style="text-align: left">
                <span class="first_span">发货单位</span>
                <span>负责人</span>
                <span>经手人</span>
                <span>承运人</span>
              </div>
              <div style="text-align: left;margin-top: 20px;">
                <span class="first_span">收货单位</span>
                <span>负责人</span>
                <span>经手人</span>
              </div>
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
  .content{
    width: 1200px;
    text-align: center;
    color: #000;
	margin-bottom: 1rem;

  }
  input{
    border: none;
    outline: none;
  }
  h2{
    letter-spacing: 20px;
    width: 20%;
    font-size: 24px;
    font-weight: bold;
    margin: 0 auto;
    border-bottom: 3px double black;
  }
  p{
    text-align: left;
  }
  table{
    width:100%;
    border-collapse:collapse;
  }
  table tr td{
    width: 60px;
    text-align: center;
    padding: 5px;
    border:1px solid #333;
    letter-spacing: 2px;
  }
  .leter60{
    letter-spacing: 60px;
  }
  .leter10{
    letter-spacing: 14px;
  }
  span{
    display: inline-block;
    width: 266px;
    text-align: left;
  }
  .first_span{
    width: 360px;
  }
  .wrapepr {
    width: 100%;
    line-height: 36px;
    font-size: 24px;
    font-weight: bold;
  }
  .copyright p{
    width: 100%;
    height: 1.87rem;
    background-color: #363636;
    text-align: center;
    line-height: 1.87rem;
    color: #ffffff;
    font-size: 1rem;
    position: fixed;
    bottom: 0;
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
</style>
<script>
import { myPrint,changeMoneyToChinese,TransformToChinese,getNowFormatDate } from "@/utils/public";
import { getOilOutStockById } from "@/api/intelligentStorage/public";
export default {
  name: "document",
  data() {
    return {
      id_: '',      // 库存单号
      year_: '',
      month_ : '',
      day_: '',
      stockInfo: {  // 出/出库详情
        billId:"",
        cardNo:"",
        carrier:"",
        customerName:"",
        grainKind:"",
        grainKindId:'',
        grainLevel:'',
        grossWeight:'',
        incrementDecrementTotal:'',
        netWeight:'',
        packType:'',
        plateNumber:'',
        registerNo:'',
        registerType:'',
        settlementDate:'',
        settlementTotalMoney:'',
        settlementWeight:'',
        tareWeight:'',
        waterOrimpurityValue:'',
        impurityIncrementDecrement:'',
        waterIncrementDecrement:'',
        shoppingType:'',
        unitPrice:''
      }
    };
  },
  methods: {
    getMoneyChinese: function(num){
        return changeMoneyToChinese(num)
    },
    getNumberChinese: function(num){
        return TransformToChinese(num)
    },
    // 获取出库详情
    getOutGoingById: function(){
        var vm = this;
        //console.log('出库单详情', this.id_)
        getOilOutStockById({settlementId: this.id_}).then( res => {
            //console.log("res", res);
            if(res.code == 200){
                vm.stockInfo = res.data.detail;
                console.log(vm.stockInfo);
            }else{
                // layer.alert(res.message, { closeBtn: 0 });
            }

        }).catch(err => {
          // layer.alert(err.message, { closeBtn: 0 });
        });
    },
    printTable(id_) {
      const receiving = this.$refs.receiving.value;
      this.$refs.receiving1.innerHTML = receiving;
      $('.receiving1').css('font-size','24px');
      const delivery = this.$refs.delivery.value;
      this.$refs.delivery1.innerHTML = delivery;
      $('.delivery1').css('font-size','24px');
      const receipt = this.$refs.receipt.value;
      this.$refs.receipt1.innerHTML = receipt;
      $('.receipt1').css('font-size','24px');
      const remarks = this.$refs.remarks.value;
      this.$refs.remarks1.innerHTML = remarks;
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
          name: "oilOutStorageStep",
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
    this.getOutGoingById();
    const dataTime = getNowFormatDate().split(' ')[0].split('-');
    vm.year_ = dataTime[0];
    vm.month_ = dataTime[1];
    vm.day_ = dataTime[2];
    //console.log(dataTime)
  }
};

</script>
