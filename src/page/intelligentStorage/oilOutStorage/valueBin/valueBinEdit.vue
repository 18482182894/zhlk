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
                                卡号：
                                <input type="text" class="input-text" v-model="submitData.cardNo" @change="getData(submitData.cardNo);">
                            </span>
                            <span>
                                其他扣量（KG）：<u>正数为加,负数为减</u>
                                <input type="number" class="input-text" v-model="submitData.otherIncrementDecrement">
                            </span>
                            <span>
                                水份（KG）：<u>正数为加,负数为减</u>
                                <input type="number" class="input-text" v-model="submitData.waterIncrementDecrement">
                            </span>
                            <span>
                                杂质（KG）：<u>正数为加,负数为减</u>
                                <input type="number" class="input-text" v-model="submitData.impurityIncrementDecrement">
                            </span>
                            <span>
                                油罐信息：
                                <!-- <select name="" class="select-style" v-model="submitData.storehouseGbCode" @change="getGranary(submitData.storehouseGbCode);">
                                    <option :value="item.storehouseGbCode" v-for="item in storehouseList" v-text="item.storehouseName"></option>
                                </select> -->
                                 <input type="text" class="input-text" v-model="submitData.warehouseName" readonly>
                            </span>
                            <!-- <span>
                                仓廒信息：
                                <select name="" class="select-style" v-model="submitData.warehouseGbCode" @change="getCargo(submitData.warehouseGbCode);">
                                    <option :value="item.warehouseGbCode" v-for="item in granaryList" v-text="item.warehouseName"></option>
                                </select>
                            </span>
                            <span>
                                货位信息：
                                <select name="" class="select-style" v-model="submitData.cargoPosition">
                                    <option :value="item.cargoPosition" v-for="item in cargoList" v-text="item.cargoName"></option>
                                </select>
                            </span> -->
                            <span>
                                车牌号：
                                <input type="text" class="input-text" v-model="submitData.plateNumber">
                            </span>
                            <span>
                                出入库类型：
                                <input type="text" class="input-text" v-model="submitData.registorType">
                            </span>
                            <span>
                                粮油品种：
                                <input type="text" class="input-text" v-model="submitData.grainVarietyValue">
                            </span>
                            <span>
                                粮食性质：
                                <input type="text" class="input-text" v-model="submitData.grainAttributeValue">
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">监控</div>
                </div>
                <div class="tag-box-content">
                  <img :src="submitData.monitorImage" alt="" class="register-img">
                </div>
            </div>
            <div class="edit-btn">
                <button class="edit-submit" @click="submitEvent();">开始值仓</button>
                <button class="edit-back" @click="detailBack();">结束值仓</button>
            </div>
        </div>
    </div>
</template>

<style type="text/css" scoped>
  .tag-box .edit-btn{
    margin-top: 15px;
  }
</style>
<script>
import { oilValueBinGetData, oilValueBin } from "@/api/intelligentStorage/public";
import { getOilList } from '@/api/intelligentWarehous/oilCan'
import {getNowFormatDate} from "@/utils/public";
export default {
  name: "warehouseEdit",
  data() {
    return {
        postData:{
            reverseJobId:this.$route.query.id
        },
        detailData:{
          outStorehouseGbCode:'',
          inStorehouseGbCode:''
        },
        submitData:{
            cardNo:'',
            registorNo:'',
            waterIncrementDecrement:0,
            impurityIncrementDecrement:0,
            otherIncrementDecrement:0,
            storehouseGbCode:'',
            warehouseGbCode:'',
            cargoPosition:'',
            plateNumber:'',
            registorType:'',
            grainVariety:'',
            grainVarietyValue:'',
            grainAttribute:'',
            grainAttributeValue:'',
            monitorImage:'pic1.jpg',
            startTime:'',
            oilCanCode: ''
        },
        storehouseList:'',//仓房下拉
        granaryList:'',//廒间
        cargoList:'',//货位
    }
  },
  methods: {
    getData: function(id) {//通过卡号获取信息
      var vm = this;
      vm.submitData.startTime=getNowFormatDate();
      console.log(vm.submitData.startTime)
      layer.load(2);
      oilValueBinGetData({cardNo:id})
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            console.log(JSON.stringify(ret))
            vm.submitData.registorNo=ret.data.msg.registorNo;
            // vm.submitData.waterIncrementDecrement=ret.data.msg.registorNo;
            // vm.submitData.impurityIncrementDecrement=ret.data.msg.registorNo;
            // vm.submitData.otherIncrementDecrement=ret.data.msg.registorNo;
            vm.submitData.warehouseGbCode = ret.data.msg.oilCanCode;
            vm.submitData.warehouseName = ret.data.msg.oilCanName;
            vm.submitData.oilCanCode = ret.data.msg.oilCanCode;
            vm.submitData.plateNumber=ret.data.msg.plateNumber;
            vm.submitData.registorType=ret.data.msg.registorType;
            vm.submitData.grainVariety=ret.data.msg.grainVariety;
            vm.submitData.grainVarietyValue=ret.data.msg.grainVarietyValue;
            vm.submitData.grainAttribute=ret.data.msg.grainAttribute;
            vm.submitData.grainAttributeValue=ret.data.msg.grainAttributeValue;

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
        layer.load(2);
        oilValueBin(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            console.log(vm.$route)
            if (ret.code == 200) {
              var otherIncrementDecrement=vm.submitData.otherIncrementDecrement;
              var waterIncrementDecrement=vm.submitData.waterIncrementDecrement;
              var impurityIncrementDecrement=vm.submitData.impurityIncrementDecrement;
              layer.confirm('你确定扣(加)<br/>' +
                '其他扣量:'+otherIncrementDecrement+'<br/>'
                +'水分:'+waterIncrementDecrement+'<br/>'
                +'杂质:'+impurityIncrementDecrement+'', {
                btn: ['确定','取消'] //按钮
              }, function() {
                layer.closeAll();
                layer.msg("值仓成功！");
                vm.$router.push({
                  name: "oilOutStorageStep",
                  query: {
                    step: 5,
                    condition:vm.$route.query.condition
                  }
                });
              })
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
            name: "oilOutStorageStep",
            query: {
              step: 5,
              condition:this.$route.query.condition
            }
          });
    }
  },
  mounted () {
      var vm=this;
  }
}
</script>
