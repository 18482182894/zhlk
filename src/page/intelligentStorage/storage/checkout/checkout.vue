<template>
    <div class="content">
        <div class="menuManage userManage">
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">基础信息</div>
                </div>
                <div class="tag-box-content">
                    <div class="userManage-detail userManage-edit">
                        <div>
                            <span>
                                登记编号：
                                <input type="text" class="input-text" v-model="submitData.registorNo" @change="getData(submitData.registorNo);">
                            </span>
                            <!-- <span>
                                卡号：
                                <input type="number" class="input-text" v-model="submitData.cardNo" @change="getData(submitData.grainNumber,'card');">
                            </span> -->
                            <!-- <span>
                                扫二维码：
                                <input type="number" class="input-text" v-model="submitData.grainNumber">
                            </span>
 -->                            <span>
                                粮食品种：
                                <input type="text" class="input-text" readonly="readonly" v-model="submitData.grainVarietyName">
                            </span>
                            <span>
                                粮食性质：
                                <input type="text" class="input-text" readonly="readonly" v-model="submitData.grainAttributeValue">
                            </span>
                            <span>
                                检验人：
                                <select name="" class="select-style" v-model="testPerson">
                                    <option v-for="item in staffListData" :value="item" v-text="item.staff_name">
                                    </option>
                                </select>
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
                  <th style="width:10%;">指标分类</th>
                  <th style="width:10%;">指标项</th>
                  <th style="width:20%;">上限</th>
                  <th style="width:20%;">下限</th>
                  <th style="width:15%;">结果值</th>
                  <th style="width:15%;">等级</th>
                </tr>
              </thead>
              <tbody>
                  <tr v-for="(item,i) in submitData.testIndicatorList">
                    <td><input type="checkbox" ></td>
                    <td v-text="i+1"></td>
                    <td v-text="item.indicatorType"></td>
                    <td v-text="item.indicatorName"></td>
                    <td v-text="item.upLevel"></td>
                    <td v-text="item.lowLevel"></td>
                    <td>
                        <input type="number" class="input-text" v-model="item.resultValue" @change="getLevel(item,i);">
                    </td>
                    <td v-text="item.level"></td>
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
<style type="text/css" scoped>
  .userManage-detail .edit-code{
    margin: 0;
  }
  span .table-btn{
    display: inline-block;
    vertical-align: bottom;
  }
</style>
<script>
import { checkoutGetInfo,checkout,getDataByCode,decisionLevel} from "@/api/intelligentStorage/public"; 
import { grainDetail } from '@/api/systemManage/basicData/grainVarieties'
import {grainNature} from "@/api/systemManage/dropDown";
  import { staffList} from "@/api/systemManage/staff";
export default {
  name: "warehouseEdit",
  data() {
    return {
        postData:{
            grainVariety:'',
            grainAttribute:''
        },
        testPerson:'',
        grainNaturelList:[],
        staffListData:[],
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
            waterIncrementDecrement:0,
            impurityIncrementDecrement:0,
            otherIncrementDecrement:0,
            testIndicatorList:[],
            grainVarietyName:'',
            grainAttributeValue:'',
        },
        grainVarietyList: "",
        grainNatureList: "",
    }
  },
  methods: {
    getData:function (id) {
      var vm=this;
      if (id!='') {
          layer.load(2);
          getDataByCode({registorNo:id})
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                console.log(JSON.stringify(ret.data))
                vm.submitData.registorNo = ret.data.sampleInformation.registorNo;
                vm.submitData.billId = ret.data.sampleInformation.billId;
                vm.submitData.plateNumber = ret.data.sampleInformation.plateNumber;
                vm.submitData.cardNo = ret.data.sampleInformation.cardNo;
                vm.submitData.grainVariety = ret.data.sampleInformation.grainVariety;
                vm.submitData.grainAttribute = ret.data.sampleInformation.grainAttribute;
                 grainDetail({grainVarietyId:ret.data.sampleInformation.grainVariety}).then(ret=>{
                        layer.closeAll('loading');
                        if (ret.code==200) {
                            vm.submitData.grainVarietyName=ret.data.grainVariety.grainVarietyName;
                            
                        }else{
                            layer.alert(err.message, { closeBtn: 0 }); 
                        }

                    }).catch(err=>{
                        layer.alert(err.message, { closeBtn: 0 }); 
                    });

                
                  grainNature({}).then(ret => {//粮食性质
                      if (ret.code == 200) {
                        vm.grainNaturelList = ret.data.dataList;
                        for (var i = 0; i < vm.grainNaturelList.length; i++) {//粮食性质
                            if (vm.grainNaturelList[i].dicInfoCode== vm.submitData.grainAttribute) {
                                vm.submitData.grainAttributeValue=vm.grainNaturelList[i].dicInfoValue
                            }
                        }
                      } else {
                        layer.alert(ret.data, { closeBtn: 0 });
                      }
                  }).catch(err => {
                      layer.alert(err.message, { closeBtn: 0 });
                  });
                  vm.getCheckOut();
              } else {
                layer.alert(ret.data, { closeBtn: 0 });
              }
            })
            .catch(err => {
              layer.alert(err.message, { closeBtn: 0 });
            });
        }
    },
    getCheckOut:function () {
      var vm = this;
      layer.load(2);
        checkoutGetInfo({
          grainVarietyId:vm.submitData.grainVariety,
          inventoryPropertyId:vm.submitData.grainAttribute,
      }).then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              for (var i = 0; i < ret.data.testIndicatorList.length; i++) {
                ret.data.testIndicatorList[i]['resultValue']='';
                ret.data.testIndicatorList[i]['level']='';
                ret.data.testIndicatorList[i]['registorNo']=vm.submitData.registorNo;
                ret.data.testIndicatorList[i]['indicatorItem']=ret.data.testIndicatorList[i].indicatorName;
                ret.data.testIndicatorList[i]['upperLimitValue']=ret.data.testIndicatorList[i].upLevel;
                ret.data.testIndicatorList[i]['lowerLimitValue']=ret.data.testIndicatorList[i].lowLevel;
              }
              vm.submitData.testIndicatorList=ret.data.testIndicatorList;
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
      vm.submitData.testPerson=vm.testPerson.staff_id;
      vm.submitData.testPersonName=vm.testPerson.staff_name;
      if (vm.submitData.testPerson == "") {
        layer.msg("请选择检验人");
        return;
      }
      for (var i = 0; i < vm.submitData.testIndicatorList.length; i++) {
        if (vm.submitData.testIndicatorList[i].resultValue=='') {
          layer.msg("请填写第"+(i+1)+"项结果值！");
          return;
        }
        
      }

      this.$router.push({
        name: "checkoutItem",
        query: {
            data:vm.submitData
        }
      });
        
    },
    getLevel:function (item,num) {
      var vm = this;
        decisionLevel({
          indicatorId:item.indicatorId,
          grainVarietyId:vm.submitData.grainVariety,
          inventoryPropertyId:vm.submitData.grainAttribute,
          resultValue:item.resultValue
        }).then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              // console.log(JSON.stringify(ret))
              vm.submitData.testIndicatorList[num].level=ret.data.testStandardLevel.level;
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          })
          .catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
          });
      
    },
    getDropDown: function() {//获取下拉项
      var vm = this;
        staffList({
              pageSize: 1000,
              pageNo: 0
            }).then(ret => {//职工列表
                if (ret.code == 200) {
                  // console.log(JSON.stringify(ret))
                  for (var i = 0; i < ret.data.staffList.length; i++) {
                    vm.staffListData.push({
                      staff_id:ret.data.staffList[i].staff_id,
                      staff_name:ret.data.staffList[i].staff_name
                    });
                  }
                  // vm.staffListData = ret.data.staffList;
                } else {
                  layer.alert(ret.data, { closeBtn: 0 });
                }
            }).catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
            });
    },
    detailBack:function () {
        this.$router.back(-1);
    }
  },
  mounted () {
      var vm=this;
      vm.getDropDown();
      // if (this.$route.query.id) {
      //     vm.getDetail();
      // }else{
      //   vm.getDropDown();
      // }
  }
}
</script>
