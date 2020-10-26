<template>
  <div style="width: 1100px;margin: auto;overflow: hidden">
    <div class="content" id="div_print">
      <div class="wrapepr">
        <h2>粮油进（出）仓单</h2>
        <div>
          <p class="title">填写单位：三台琴泉粮站</p>
          <p>
            <span style="display: inline-block;width: 230px;">粮种：{{postSearchData.grainVariety}}</span>
            <span ref="storeName1">仓号：仓房（<input type="text" ref="storeName" style="width: 100px;"/>）</span>
            <span style="margin-left: 200px;">单位：千克</span>
          </p>
        </div>
        <table>
          <tr>
            <td>性质</td>
            <td>本月收入</td>
            <td>本月支出</td>
            <td colspan="2">摘要</td>
            <td>原始凭证<br />张数</td>
            <td colspan="2">其中：分等级数量</td>
          </tr>
          <tr>
            <td>{{postSearchData.grainAttribute}}</td>
            <td>{{postSearchData.importGrainNum}}</td>
            <td>{{postSearchData.exportGrainNum}}</td>
            <td colspan="2" ref="abstract1">
              <input type="text" ref="abstract"/>
            </td>
            <td>{{postSearchData.importBillNum}}</td>
            <td>1</td>
            <td ref="numberOne1">
              <input type="text" ref="numberOne"/>
            </td>
          </tr>
          <tr>
            <td ref="NatureOne1">
              <input type="text" ref="NatureOne"/>
            </td>
            <td ref="income1">
              <input type="text" ref="income"/>
            </td>
            <td ref="outcome1">
              <input type="text" ref="outcome"/>
            </td>
            <td colspan="2" ref="abstractOne1">
              <input type="text" ref="abstractOne"/>
            </td>
            <td ref="voucherNumber1">
              <input type="text" ref="voucherNumber"/>
            </td>
            <td>2</td>
            <td ref="numberTwo1">
              <input type="text" ref="numberTwo"/>
            </td>
          </tr>
          <tr>
            <td ref="NatureTwo1">
              <input type="text" ref="NatureTwo"/>
            </td>
            <td ref="incomeOne1">
              <input type="text" ref="incomeOne"/>
            </td>
            <td ref="outcomeOne1">
              <input type="text" ref="outcomeOne"/>
            </td>
            <td colspan="2" ref="abstractTwo1">
              <input type="text" ref="abstractTwo"/>
            </td>
            <td ref="voucherNumberOne1">
              <input type="text" ref="voucherNumberOne"/>
            </td>
            <td>3</td>
            <td ref="numberThree1">
              <input type="text" ref="numberThree"/>
            </td>
          </tr>
          <tr>
            <td ref="NatureThree1">
              <input type="text" ref="NatureThree"/>
            </td>
            <td ref="incomeTwo1">
              <input type="text" ref="incomeTwo"/>
            </td>
            <td ref="outcomeTwo1">
              <input type="text" ref="outcomeTwo"/>
            </td>
            <td colspan="2" ref="abstractThree1">
              <input type="text" ref="abstractThree"/>
            </td>
            <td ref="voucherNumberTwo1">
              <input type="text" ref="voucherNumberTwo"/>
            </td>
            <td>4</td>
            <td ref="numberFour1">
              <input type="text" ref="numberFour"/>
            </td>
          </tr>
          <tr>
            <td>合计</td>
            <td ref="incomeThree1">
              <input type="text" ref="incomeThree"/>
            </td>
            <td ref="outcomeThree1">
              <input type="text" ref="outcomeThree"/>
            </td>
            <td colspan="2" ref="abstractFour1">
              <input type="text" ref="abstractFour"/>
            </td>
            <td ref="voucherNumberThree1">
              <input type="text" ref="voucherNumberThree"/>
            </td>
            <td>5</td>
            <td ref="numberFive1">
              <input type="text" ref="numberFive"/>
            </td>
          </tr>
        </table>
        <p>
          <span class="wid300">审核人：</span>
          <span class="wid300">制表人：</span>
          <span>{{ year_ }}年{{ month_ }}月</span>
        </p>
        <p>注：性质分中央储备粮油、特种储备粮油、国家临时储备粮油（含最低收购价粮、中央临时储备粮油、
          临时储存进口粮、<br/>国家临时储备粮）商品粮</p>
        <button id="bt" class="table-btn btn-blue noprint" @click="printTable('div_print')">点击打印</button>
        <div class="detail-back">
          <button @click="detailBack();">返回</button>
        </div>
      </div>
    </div>
	<!-- <div class="copyright" style="margin-left: -2.8rem;">
		<p>Copyright © 四川百威智联科技有限公司 © 版权所有 电话：028-62631082</p>
	</div> -->
  </div>
</template>
<style scoped>
  *{
    padding: 0;
    margin: 0;
  }
  input{
    border: none;
    outline: none;
    text-align: center;
  }
  .content{
    width: 1200px;
    text-align: center;
    color: #000;
	margin-bottom: 2rem;
  }
  h2{
    letter-spacing: 20px;
    border-bottom: 3px double #000;
    width: 32%;
    margin: auto;
    font-weight: bold;
  }
  p{
    text-align: left;
    margin: 10px 0 10px 0px;
  }
  table{
    width:80%;
    border-collapse:collapse;
    margin: 0px 0 10px 0px;
  }
  table tr td{
    width: 60px;
    height: 40px;
    text-align: center;
    padding: 5px;
    border:1px solid #333;
    letter-spacing: 2px;
  }
  .wid300{
    display: inline-table;
    width: 260px;
  }
  .wrapepr {
    width: 100%;
    line-height: 30px;
    font-size: 16px;
    font-weight: bold;
  }
  #bt{
    width: 100px;
    display: block;
    margin: 20px auto 50px;
    text-align: center;
  }
	/* .copyright p{
	  width: 100%;
	  height: 1.87rem;
	  background-color: #363636;
	  text-align: center;
	  line-height: 1.87rem;
	  color: #ffffff;
	  font-size: 1rem;
	  position: fixed;
	  bottom: 0;
	} */
  @media print {
    .noprint {
      display: none;
    }
  }
</style>
<script>
  import { myPrint, } from "@/utils/public";
  import { generalLedgerMX, SettlementMX } from "@/api/business/warehousingStock/account";

  export default {
    name:'monthlyStatement',
    data(){
      return{
        year_:'',
        month_:'',
        day_:'',
        postSearchData:{
          settlementDate:this.$route.query.settlementDate,
          grainVariety:this.$route.query.grainVariety,
          grainAttribute:this.$route.query.grainAttribute,
          importGrainNum:this.$route.query.importGrainNum,
          exportGrainNum:this.$route.query.exportGrainNum,
          importBillNum:this.$route.query.importBillNum
        },
      }
    },
    methods:{
      printTable(id_) {
        const storeName=this.$refs.storeName.value;
        this.$refs.storeName1.innerHTML='仓号：仓房('+storeName+')';
        const abstract=this.$refs.abstract.value;
        this.$refs.abstract1.innerHTML=abstract;
        const numberOne=this.$refs.numberOne.value;
        this.$refs.numberOne1.innerHTML=numberOne;
        /*const Nature=this.$refs.Nature.value;
        this.$refs.Nature1.innerHTML=Nature;*/
        const NatureOne=this.$refs.NatureOne.value;
        this.$refs.NatureOne1.innerHTML=NatureOne;
        const income=this.$refs.income.value;
        this.$refs.income1.innerHTML=income;
        const outcome=this.$refs.outcome.value;
        this.$refs.outcome1.innerHTML=outcome;
        const abstractOne=this.$refs.abstractOne.value;
        this.$refs.abstractOne1.innerHTML=abstractOne;
        const voucherNumber=this.$refs.voucherNumber.value;
        this.$refs.voucherNumber1.innerHTML=voucherNumber;
        const numberTwo=this.$refs.numberTwo.value;
        this.$refs.numberTwo1.innerHTML=numberTwo;
        const NatureTwo=this.$refs.NatureTwo.value;
        this.$refs.NatureTwo1.innerHTML=NatureTwo;
        const incomeOne=this.$refs.incomeOne.value;
        this.$refs.incomeOne1.innerHTML=incomeOne;
        const outcomeOne=this.$refs.outcomeOne.value;
        this.$refs.outcomeOne1.innerHTML=outcomeOne;
        const abstractTwo=this.$refs.abstractTwo.value;
        this.$refs.abstractTwo1.innerHTML=abstractTwo;
        const voucherNumberOne=this.$refs.voucherNumberOne.value;
        this.$refs.voucherNumberOne1.innerHTML=voucherNumberOne;
        const numberThree=this.$refs.numberThree.value;
        this.$refs.numberThree1.innerHTML=numberThree;
        const NatureThree=this.$refs.NatureThree.value;
        this.$refs.NatureThree1.innerHTML=NatureThree;
        const incomeTwo=this.$refs.incomeTwo.value;
        this.$refs.incomeTwo1.innerHTML=incomeTwo;
        const outcomeTwo=this.$refs.outcomeTwo.value;
        this.$refs.outcomeTwo1.innerHTML=outcomeTwo;
        const abstractThree=this.$refs.abstractThree.value;
        this.$refs.abstractThree1.innerHTML=abstractThree;
        const voucherNumberTwo=this.$refs.voucherNumberTwo.value;
        this.$refs.voucherNumberTwo1.innerHTML=voucherNumberTwo;
        const numberFour=this.$refs.numberFour.value;
        this.$refs.numberFour1.innerHTML=numberFour;
        const incomeThree=this.$refs.incomeThree.value;
        this.$refs.incomeThree1.innerHTML=incomeThree;
        const outcomeThree=this.$refs.outcomeThree.value;
        this.$refs.outcomeThree1.innerHTML=outcomeThree;
        const abstractFour=this.$refs.abstractFour.value;
        this.$refs.abstractFour1.innerHTML=abstractFour;
        const voucherNumberThree=this.$refs.voucherNumberThree.value;
        this.$refs.voucherNumberThree1.innerHTML=voucherNumberThree;
        const numberFive=this.$refs.numberFive.value;
        this.$refs.numberFive1.innerHTML=numberFive;
        $('#bt').css('display','none');
        $('.detail-back').css('display','none');
        myPrint(id_)
      },
      detailBack:function () {
        var vm = this;
        vm.$router.push({
          name: "report",
          query: {}
        });
      },
    },
    mounted() {
      var vm=this;
      //console.log(vm.postSearchData.settlementDate)
      vm.year_=vm.postSearchData.settlementDate.slice(0,4);
      vm.month_=vm.postSearchData.settlementDate.slice(5,7);
    }
  }
</script>

