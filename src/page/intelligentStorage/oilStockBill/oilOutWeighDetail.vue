<template>
  <div>
    <div style="width: 1100px;margin: auto;">
      <select v-model="isShow">
        <option value="1">出库过磅单</option>
        <option value="2">转运单</option>
      </select>
      <!--<div class="conent" id="div_print" style="display: table;">
        <div class="wrapepr">
            <h1>过磅单</h1>
            <div class="number" style="float:right;">{{id_}}</div>
            <br>
            <div class="flex_Row">
                <div class="flex_Row">
                    <label>售粮单位/个人：</label>
                    <div contenteditable="true" style="width: 230px;">{{weighInfo.customerName}}</div>
                  <div>
                    <span ref="warehouseNo1">仓&nbsp;号：{{weighInfo.storehouseName}}</span>
                  </div>
                </div>
                <div class="textRight">车牌号：{{weighInfo.plateNumber}}</div>
                <div class="flex_1 textCenter dataTime">
                    <span>{{year_}}</span>年
                    <span>{{month_}}</span>月
                    <span>{{day_}}</span>日
                </div>

            </div>
            <table>
                <tr>
                    <td style="border-left: 0px;">货物名称</td>
                    <td>单位</td>
                    <td>毛重</td>
                    <td>皮重</td>
                    <td>扣重</td>
                    <td style="border-right: 0px">净重</td>
                </tr>
                <tr>
                    <td style="border-left: 0px;"><span class="input">{{weighInfo.grainVariety}}</span></td>
                    <td><span class="input">公斤</span></td>
                    <td><span class="input">{{weighInfo.grossWeight}}</span></td>
                    <td><span class="input">{{weighInfo.tareWeight}}</span></td>
                    <td><span class="input">{{weighInfo.incrementDecrementTotal}}</span></td>
                    <td style="border-right: 0px"><span class="input">{{weighInfo.netWeight}}</span></td>
                </tr>
                <tr>
                  <td style="border-left: 0px;border-right: 0px;">备注:</td>
                  <td colspan="5" style="border-right: 0px;border-left: 0px;" ref="remarks1">
                    <input type="text" style="width: 100%;margin-left: -240px;" ref="remarks"/>
                  </td>
                </tr>
                &lt;!&ndash;<tr>
                    <td><span contenteditable="true" class="input"></span></td>
                    <td><span contenteditable="true" class="input"></span></td>
                    <td><span contenteditable="true" class="input"></span></td>
                    <td><span contenteditable="true" class="input"></span></td>
                    <td><span contenteditable="true" class="input"></span></td>
                    <td><span contenteditable="true" class="input"></span></td>
                </tr>
                <tr>
                    <td><span contenteditable="true" class="input"></span></td>
                    <td><span contenteditable="true" class="input"></span></td>
                    <td><span contenteditable="true" class="input"></span></td>
                    <td><span contenteditable="true" class="input"></span></td>
                    <td><span contenteditable="true" class="input"></span></td>
                    <td><span contenteditable="true" class="input"></span></td>
                </tr>
                <tr>
                    <td><span contenteditable="true" class="input"></span></td>
                    <td><span contenteditable="true" class="input"></span></td>
                    <td><span contenteditable="true" class="input"></span></td>
                    <td><span contenteditable="true" class="input"></span></td>
                    <td><span contenteditable="true" class="input"></span></td>
                    <td><span contenteditable="true" class="input"></span></td>
                </tr>&ndash;&gt;
            </table>
            <p style="margin:10px auto" class="flex_Row">
                司磅： <span contenteditable="true" class="input flex_1"></span>
                驾驶员签字： <span contenteditable="true" class="input flex_1"></span>
                收货人： <span contenteditable="true" class="input flex_1"></span>
            </p>
        </div>
      </div>-->
      <div class="content" id="div_print" style="display: table;">
        <div class="wrapepr" v-if="isShow == 1">
          <h2>三台县琴泉粮站出库过磅码单</h2>
          <table>
            <tr>
              <td>过磅时间</td>
              <td colspan="2">{{year_}}/{{month_}}/{{day_}}</td>
              <td>码单编号</td>
              <td>{{weighInfo.id}}</td>
              <td></td>
            </tr>
            <tr>
              <td>品 名</td>
              <td colspan="2">{{weighInfo.grainVariety}}</td>
              <td>车 号</td>
              <td>{{weighInfo.plateNumber}}</td>
              <td></td>
            </tr>
            <tr>
              <td>规 格</td>
              <td colspan="2" v-if="weighInfo.packType=='01'">{{ '包装' }}</td>
              <td colspan="2" v-if="weighInfo.packType=='02'">{{ '散装' }}</td>
              <td>毛 重</td>
              <td>{{weighInfo.grossWeight}}</td>
              <td>Kg</td>
            </tr>
            <tr>
              <td>发货单位</td>
              <td colspan="2">{{weighInfo.getName}}</td>
              <td>皮 重</td>
              <td>{{weighInfo.tareWeight}}</td>
              <td>Kg</td>
            </tr>
            <tr>
              <td>收货单位</td>
              <td colspan="2">{{weighInfo.sendName}}</td>
              <td>扣 杂</td>
              <td>{{weighInfo.impurityIncrementDecrement}}</td>
              <td>Kg</td>
            </tr>
            <tr>
              <td>油 罐</td>
              <td colspan="2">{{weighInfo.oilCanName}}</td>
              <td>扣 水</td>
              <td>{{weighInfo.waterIncrementDecrement}}</td>
              <td>Kg</td>
            </tr>
            <tr>
              <td>司磅员</td>
              <td colspan="2" ref="agent1">
                <input type="text" ref="agent" />
              </td>
              <td>净 重</td>
              <td>{{weighInfo.netWeight}}</td>
              <td>Kg</td>
            </tr>
            <tr>
              <td>保管员</td>
              <td colspan="2" ref="Storekeeper1">
                <input type="text" ref="Storekeeper" />
              </td>
              <td>运粮师傅</td>
              <td>{{weighInfo.carrier}}</td>
              <td></td>
            </tr>
            <tr>
              <td>备 注</td>
              <td colspan="5" ref="remarks1">
                <input type="text" ref="remarks" />
              </td>
            </tr>
          </table>
        </div>
        <div class="wrapepr" v-if="isShow == 2" style="display: table;">
          <p class="ZY_title">粮食转运发件单</p>
          <p style="text-align: left;margin-left: 5%;">
            <span>结算单位：三台琴泉粮站</span>
            <span ref="ZY_time" style="width: 340px;">
              <!--{{year_}}年{{month_}}月{{day_}}日-->
              <input type="text" class="ZY_time" ref="ZY_year" />年
              <input type="text" class="ZY_time" ref="ZY_month" />月
              <input type="text" class="ZY_time" ref="ZY_day" />日
            </span>
          </p>
          <table>
            <tr>
              <td rowspan="2">承运单位</td>
              <td colspan="2" rowspan="2" ref="Shipment1">
                <input type="text" ref="Shipment" v-text="weighInfo.carrier" />
              </td>
              <td rowspan="2">工作摘要</td>
              <td colspan="2" rowspan="2" ref="abstract1">
                <input type="text" ref="abstract" />
              </td>
              <td colspan="3">粮&emsp;&emsp;&emsp;&emsp;&emsp;食</td>
              <td colspan="3">麻&emsp;&emsp;&emsp;&emsp;&emsp;袋</td>
            </tr>
            <tr>
              <td>品名</td>
              <td>等级</td>
              <td>数量</td>
              <td>呈色</td>
              <td>单位</td>
              <td>数量</td>
            </tr>
            <tr>
              <td rowspan="2">
                发货
                <br />单位
              </td>
              <td colspan="2" rowspan="2" ref="Deliver1">
                <input type="text" ref="Deliver" />
              </td>
              <td rowspan="2">
                起运
                <br />地点
              </td>
              <td colspan="2" rowspan="2" ref="startShipment1">
                <input type="text" ref="startShipment" />
              </td>
              <td rowspan="2" ref="ProductName1">
                <input type="text" ref="ProductName" />
              </td>
              <td rowspan="2" ref="Grade1">
                <input type="text" ref="Grade" />
              </td>
              <td rowspan="2" ref="numberBefore1">
                <input type="text" ref="numberBefore" />
              </td>
              <td rowspan="2" ref="Coloration1">
                <input type="text" ref="Coloration" />
              </td>
              <td rowspan="2">条</td>
              <td rowspan="2" ref="numberAfter1">
                <input type="text" ref="numberAfter" />
              </td>
            </tr>
            <tr></tr>
            <tr>
              <td rowspan="2">
                收货
                <br />单位
              </td>
              <td colspan="2" rowspan="2" ref="receivingGoods1">
                <input type="text" ref="receivingGoods" />
              </td>
              <td rowspan="2">
                到达
                <br />地点
              </td>
              <td colspan="2" rowspan="2" ref="Arrive1">
                <input type="text" ref="Arrive" />
              </td>
              <td rowspan="2" ref="ProductNameOne1">
                <input type="text" ref="ProductNameOne" />
              </td>
              <td rowspan="2" ref="GradeOne1">
                <input type="text" ref="GradeOne" />
              </td>
              <td rowspan="2" ref="numberBeforeOne1">
                <input type="text" ref="numberBeforeOne" />
              </td>
              <td rowspan="2" ref="ColorationOne1">
                <input type="text" ref="ColorationOne" />
              </td>
              <td rowspan="2">条</td>
              <td rowspan="2" ref="numberAfterOne1">
                <input type="text" ref="numberAfterOne" />
              </td>
            </tr>
            <tr></tr>
            <tr>
              <td rowspan="2" colspan="2">备注</td>
              <td rowspan="2" colspan="10" ref="remarks1">
                <input type="text" ref="remarks" />
              </td>
            </tr>
          </table>
          <p style="text-align: left;margin-left: 5%;">
            <span>发货人</span>
            <span>承运人</span>
            <span>收货人</span>
          </p>
        </div>
        <button id="bt" class="table-btn btn-blue noprint" @click="printTable('div_print')">点击打印</button>
        <div class="detail-back">
          <button @click="detailBack();">返回</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style type="text/css" scoped >
* {
  padding: 0;
  margin: 0;
}
input {
  border: 0;
  outline: none;
  text-align: center;
  width: 100%;
  line-height: 26px;
  font-size: 18px;
  font-weight: bold;
}
.ZY_time {
  width: 90px;
}
select {
  text-align: left;
}
.content {
  width: 1100px;
  margin-top: 40px;
  text-align: center;
  color: #000;
}
h2 {
  text-align: center;
}
.ZY_title {
  letter-spacing: 20px;
  border-bottom: 3px double #000;
  width: 34%;
  margin: 20px auto;
  font-size: 24px;
  font-weight: bold;
}
span {
  display: inline-block;
  width: 330px;
  text-align: left;
}
table {
  width: 90%;
  border-collapse: collapse;
  margin: 20px auto 0px auto;
}
table tr td {
  text-align: center;
  padding: 5px;
  border: 1px solid #333;
}
.wrapepr {
  width: 100%;
  line-height: 26px;
  font-size: 18px;
  font-weight: bold;
}
#bt {
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
import {
  myPrint,
  changeMoneyToChinese,
  changeNumberToChinese,
  getNowFormatDate
} from "@/utils/public";
import { getOilWeightResult, getSheetData } from "@/api/intelligentStorage/public";
export default {
  name: "document",
  data() {
    return {
      id_: "", // 库存单号
      year_: "",
      month_: "",
      day_: "",
      isShow: 1, //1为磅单，2为转运单
      weighInfo: {
        id: "",
        carrier: "",
        grainVariety: "",
        grossWeight: "",
        netWeight: "",
        plateNumber: "",
        registorNo: "",
        tareWeight: "",
        sendName: "",
        getName: "",
        impurityIncrementDecrement: "",
        waterIncrementDecrement: "",
        packType: "",
        incrementDecrementTotal: ""
      }
    };
  },
  methods: {
    getMoneyChinese: function(num) {
      return changeMoneyToChinese(num);
    },
    getNumberChinese: function(num) {
      return changeNumberToChinese(num);
    },
    // 获取过磅单详情
    getWeightById: function() {
      var vm = this;
      //console.log('过磅单详情', this.id_)
      getOilWeightResult({ registorNo: this.id_ })
        .then(res => {
          if (res.code == 200) {
            //console.log(res);
            vm.weighInfo = res.data.poundListMsg;
            var dataTime = getNowFormatDate();
            var dataTime = dataTime.split(" ")[0].split("-");
            //console.log(dataTime);
            vm.year_ = dataTime[0];
            vm.month_ = dataTime[1];
            vm.day_ = dataTime[2];
            //console.log(vm.weighInfo);
          } else {
            layer.alert(res.data, { closeBtn: 0 });
            if (res.data == "该磅单还不能打印！") {
              setTimeout(() => {
                window.history.back(-1);
                layer.closeAll();
              }, 2000);
            }
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getTransport: function() {
      var vm = this;
      //console.log('过磅单详情', this.id_)
      getSheetData({ registorNo: this.id_ })
        .then(res => {
          if (res.code == 200) {
            console.log(res);
            vm.weighInfo = res.data.poundListMsg;
            var dataTime = getNowFormatDate();
            var dataTime = dataTime.split(" ")[0].split("-");
            //console.log(dataTime);
            vm.year_ = dataTime[0];
            vm.month_ = dataTime[1];
            vm.day_ = dataTime[2];
            //console.log(vm.weighInfo);
          } else {
            layer.alert(res.data, { closeBtn: 0 });
            /* if(res.data == "该转运单还不能打印！"){
              setTimeout(() => {
                window.history.back(-1);
                layer.closeAll();
              }, 2000);
            }*/
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    printTable(id_) {
      if (this.isShow == 1) {
        const warehouseNo = this.$refs.Storekeeper.value;
        const remarks = this.$refs.remarks.value;
        const agent = this.$refs.agent.value;
        this.$refs.Storekeeper1.innerHTML = warehouseNo;
        this.$refs.agent1.innerHTML = agent;
        this.$refs.remarks1.innerHTML = remarks;
      } else {
        const Shipment = this.$refs.Shipment.value;
        this.$refs.Shipment1.innerHTML = Shipment;
        const abstract = this.$refs.abstract.value;
        this.$refs.abstract1.innerHTML = abstract;
        const Deliver = this.$refs.Deliver.value;
        this.$refs.Deliver1.innerHTML = Deliver;
        const startShipment = this.$refs.startShipment.value;
        this.$refs.startShipment1.innerHTML = startShipment;
        const ProductName = this.$refs.ProductName.value;
        this.$refs.ProductName1.innerHTML = ProductName;
        const Grade = this.$refs.Grade.value;
        this.$refs.Grade1.innerHTML = Grade;
        const numberBefore = this.$refs.numberBefore.value;
        this.$refs.numberBefore1.innerHTML = numberBefore;
        const Coloration = this.$refs.Coloration.value;
        this.$refs.Coloration1.innerHTML = Coloration;
        const numberAfter = this.$refs.numberAfter.value;
        this.$refs.numberAfter1.innerHTML = numberAfter;
        const receivingGoods = this.$refs.receivingGoods.value;
        this.$refs.receivingGoods1.innerHTML = receivingGoods;
        const Arrive = this.$refs.Arrive.value;
        this.$refs.Arrive1.innerHTML = Arrive;
        const ProductNameOne = this.$refs.ProductNameOne.value;
        this.$refs.ProductNameOne1.innerHTML = ProductNameOne;
        const GradeOne = this.$refs.GradeOne.value;
        this.$refs.GradeOne1.innerHTML = GradeOne;
        const numberBeforeOne = this.$refs.numberBeforeOne.value;
        this.$refs.numberBeforeOne1.innerHTML = numberBeforeOne;
        const ColorationOne = this.$refs.ColorationOne.value;
        this.$refs.ColorationOne1.innerHTML = ColorationOne;
        const numberAfterOne = this.$refs.numberAfterOne.value;
        this.$refs.numberAfterOne1.innerHTML = numberAfterOne;
        const remarks = this.$refs.remarks.value;
        this.$refs.remarks1.innerHTML = remarks;
        const year = this.$refs.ZY_year.value;
        const month = this.$refs.ZY_month.value;
        const day = this.$refs.ZY_day.value;
        this.$refs.ZY_time.innerHTML = year + "年" + month + "月" + day + "日";
      }
      $("#bt").css("display", "none");
      $(".detail-back").css("display", "none");
      myPrint(id_);
    },
    detailBack: function() {
      var vm = this;
      if (this.$route.query.type) {
        this.$router.back(-1);
      } else {
        vm.$router.push({
          name: "oilOutStorageStep",
          query: {
            step: 4
          }
        });
      }
    }
  },
  mounted() {
    var vm = this;
    vm.id_ = this.$route.query.id;
    /*if(vm.isShow == 2){
        this.getTransport();
      }*/
    //this.getTransport();
    this.getWeightById();
  }
};
</script>
