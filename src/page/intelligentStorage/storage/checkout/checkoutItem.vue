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
                                粮食品种：
                                <label v-text="submitData.grainVarietyName"></label>
                            </span>
                            <span>
                                粮食性质：
                                <label v-text="submitData.grainAttributeValue"></label>
                            </span>
                        </div>
                    </div>
                </div>
            </div>            
            <table class="customTable">
              <thead>
                <tr>
                  <th style="width:5%;"><input type="checkbox" ></th>
                  <th style="width:5%;">序号</th>
                  <th style="width:20%;">指标分类</th>
                  <th style="width:20%;">指标项</th>
                  <th style="width:20%;">增扣标准</th>
                  <th style="width:20%;">结果值</th>
                  <th style="width:10%;">增扣量</th>
                </tr>
              </thead>
              <tbody>
                          <tr v-for="(item,i) in detailData">
                            <td><input type="checkbox" ></td>
                            <td v-text="i+1"></td>
                            <td v-text="item.indicatorKind"></td>
                            <td v-text="item.indicatorName"></td>
                            <td v-text="item.standardValue"></td>
                            <td>
                                <input type="number" class="input-text" v-model="item.resultValue" @change="getDeduction(item,i);">
                            </td>
                            <td v-text="item.deduction"></td>
                          </tr>
              </tbody>
            </table>
            <div class="edit-btn">
                <button class="edit-submit" @click="submitEvent();">提交</button>
                <button class="edit-back" @click="detailBack();">返回</button>
            </div>
        </div>
    </div>
</template>

<script>
  import { checkout ,checkoutItemList,CalculatingIncrement,checkoutLED} from "@/api/intelligentStorage/public";
export default {
  name: "companyDetail",
  data() {
    return {
        detailData: "",
        submitData:{
            registorNo:'',
            cardNo:'',
            samplingId:'',
            grainVariety:'',
            grainAttribute:'',
            testDatetime:'',
            testPerson:'',
            testPersonName:'',
            totalLevel:'',
            waterIncrementDecrement:'',
            impurityIncrementDecrement:'',
            otherIncrementDecrement:'',
            testIndicatorList:[],
            grainVarietyName:'',
            grainAttributeValue:'',
            deduction: ''
        },
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      checkoutItemList({grainVarietyId:vm.submitData.grainVariety})
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            console.log(JSON.stringify(ret));
              for (var i = 0; i <ret.data.IncreaseDecreaseItemList.length; i++) {
                ret.data.IncreaseDecreaseItemList[i]['resultValue']='';
                ret.data.IncreaseDecreaseItemList[i]['deduction']='';
              }
            vm.detailData = ret.data.IncreaseDecreaseItemList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    submitEvent: function() {
      var vm = this;

      if (vm.submitData.testPerson == "") {
        layer.msg("请选择检验人");
        return;
      }
      for (var i = 0; i < vm.detailData.length; i++) {
        if (vm.detailData[i].resultValue=='') {
          layer.msg("请填写第"+(i+1)+"项结果值！");
          return;
        }else{ 
          if (vm.detailData[i].increaseDecreaseItem== '01010301' ) {
              vm.submitData.impurityIncrementDecrement=vm.detailData[i].deduction;
          } 
          if (vm.detailData[i].increaseDecreaseItem=='020101') {
              vm.submitData.waterIncrementDecrement=vm.detailData[i].deduction;
          }
          if (vm.detailData[i].increaseDecreaseItem!= '01010301'&&vm.detailData[i].increaseDecreaseItem!='020101') {
              vm.submitData.otherIncrementDecrement+=vm.detailData[i].deduction;
          }
        }
      }

      layer.load(2);
      if(vm.submitData.impurityIncrementDecrement == '') {
        vm.submitData.impurityIncrementDecrement = 0
      }
      if(vm.submitData.waterIncrementDecrement == '') {
        vm.submitData.waterIncrementDecrement = 0
      }
      if(vm.submitData.otherIncrementDecrement == '') {
        vm.submitData.otherIncrementDecrement = 0
      }
      var list=vm.submitData.testIndicatorList;
      vm.submitData.testIndicatorList="";
      vm.submitData.testIndicatorList={
        testIndicatorList:list
      };
      vm.submitData.deduction = vm.submitData.waterIncrementDecrement+vm.submitData.impurityIncrementDecrement+vm.submitData.otherIncrementDecrement
      if(vm.submitData.deduction == 0) {
        vm.submitData.deduction = list[0].level
      }
      // console.log(JSON.stringify(vm.submitData))
      checkout(vm.submitData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {

            layer.msg("检验成功！");
            checkoutLED({
                registorNo:vm.submitData.registorNo,
                // deduction:vm.submitData.waterIncrementDecrement+vm.submitData.impurityIncrementDecrement+vm.submitData.otherIncrementDecrement,
                deduction:vm.submitData.deduction,
                waterIncrementDecrement:vm.submitData.waterIncrementDecrement,
                impurityIncrementDecrement:vm.submitData.impurityIncrementDecrement,
                otherIncrementDecrement:vm.submitData.otherIncrementDecrement,
                plateNumber:vm.submitData.plateNumber,
                deviceBarcode:'led201901241414'
            }).then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  // console.log(JSON.stringify(ret));

                } else {
                  layer.alert(ret.data, { closeBtn: 0 });
                }
              })
              .catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
              });

            vm.$router.push({
              name: "storageStep",
              query: {
                step: 3
              }
            });

          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
        
    },
    getDeduction:function (item,num) {
      var vm = this;
      layer.load(2);
      CalculatingIncrement({
        grainVarietyId:vm.submitData.grainVariety,
        resultValue:item.resultValue,
        increaseDecreaseItem:item.increaseDecreaseItem
      }).then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            console.log(JSON.stringify(ret));
              
            vm.detailData[num].deduction=ret.data.result;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });      
    },
    detailBack:function () {
      var vm = this;
          vm.$router.push({
            name: "storageStep",
            query: {
              step: 3
            }
          });
    }
  },
  mounted() {
    var vm = this;
      vm.submitData=vm.$route.query.data;
      console.log(JSON.stringify(vm.submitData))
      vm.getDetail();
  }
};
</script>
