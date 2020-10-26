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
                                仓房：
                                <select name="" class="select-style" v-model="storehouse" @change="getWarehouse(storehouse);">
                                    <option v-for="item in storehouseList" :value="item" v-text="item.storehouseName">
                                    </option>
                                </select>
                            </span>
                            <span>
                                廒间：
                                <select name="" class="select-style" v-model="warehouse">
                                    <option v-for="item in granaryList" :value="item" v-text="item.warehouseName">
                                    </option>
                                </select>
                            </span>
                            <span>
                                期初时间：
                                <input type="text" class="input-text Wdate" onclick="WdatePicker({skin:'whyGreen',dateFmt:'yyyy-MM'})"  id="initialTimeMonth" >
                            </span>
                            <span>
                                粮食品种：
                                  <div class="edit-grainVariety">
                                    <treeselect v-model="submitData.grainKind" :multiple="false" :options="grainVarietyList" />
                                  </div>
                            </span>
                            <span>
                                存粮性质：
                                <select name="" class="select-style" v-model="submitData.grainAttribute">
                                    <option v-for="item in grainNatureList" :value="item.dicInfoCode" v-text="item.dicInfoValue">
                                    </option>
                                </select>
                            </span>
                            <span>
                                粮食等级：
                                <select name="" class="select-style" v-model="submitData.grainLevel">
                                    <option v-for="item in grainOilLevelList" :value="item.dicInfoCode" v-text="item.dicInfoValue">
                                    </option>
                                </select>
                            </span>
                            <span>
                                粮食产地：
                                <input type="text" class="input-text" v-model="submitData.grainProductArea">
                            </span>
                            <span>
                                粮权所属：
                                <input type="text" class="input-text" v-model="submitData.grainRightsBelongto">
                            </span>
                            <!-- <span>
                                封仓时间：
                                <input type="text" class="input-text Wdate" onclick="WdatePicker({})"  id="qualitativeDate" >
                            </span> -->
                            <span>
                                仓库状态：
                                <select name="" class="select-style excision" v-model="submitData.warehouseState">
                                    <option value="">选择状态</option>
                                    <option value="封仓">封仓</option>
                                    <option value="入库作业">入库作业</option>
                                    <option value="出库作业">出库作业</option>
                                    <option value="倒仓作业">倒仓作业</option>
                                    <option value="空仓">空仓</option>
                                </select>
                            </span>
                            <span>
                                期初库存(千克)：
                                <input type="number" class="input-text" v-model="submitData.initialStock">
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="edit-btn">
                <button class="edit-submit" @click="submitEvent();">提交</button>
                <button class="edit-back" @click="detailBack();">取消</button>
            </div>
        </div>
    </div>
</template>
<style type="text/css" scoped>
  .edit-p{
    text-align: center;
    font-size: 14px;
  }
</style>
<script>
 // import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import { openingInventory } from "@/api/business/warehousingStock/account";
  import { grainVariety, storehouse, granary, grainNature, grainOilLevel } from "@/api/systemManage/dropDown";
export default {
  name: "warehouseEdit",
  components: { Treeselect },
  data() {
    return {
        storehouse:'',
        warehouse:'',
        submitData:{
            storehouseGbCode:'',
            warehouseGbCode:'',
            storehouseName:'',
            warehouseName:'',
            initialTimeMonth:'',
            grainKind:null,
            grainAttribute:'',
            grainLevel:'',
            grainProductArea:'',
            grainRightsBelongto:'',
            initialStock:'',
            warehouseState:''
        },
        grainOilLevelList:'',//粮食等级
        grainVarietyList:[],//粮食品种下拉
        storehouseList:'',//仓房下拉
        grainNatureList:'',//粮食性质下拉
        granaryList:''//廒间
    }
  },
  methods: {
    submitEvent: function() {
      var vm = this;

      vm.submitData.storehouseGbCode=vm.storehouse.storehouseGbCode;
      vm.submitData.storehouseName=vm.storehouse.storehouseName;
      vm.submitData.warehouseGbCode=vm.warehouse.warehouseGbCode;
      vm.submitData.warehouseName=vm.warehouse.warehouseName;
      vm.submitData.initialTimeMonth=$('#initialTimeMonth').val();
      if (vm.submitData.storehouseGbCode == "") {
        layer.msg("请选择仓房");
        return;
      }
      if (vm.submitData.warehouseGbCode == "") {
        layer.msg("请选择廒间");
        return;
      }
      if (vm.submitData.initialTimeMonth == "") {
        layer.msg("请填写期初时间");
        return;
      }
      if (vm.submitData.grainAttribute == "") {
        layer.msg("请填写粮食性质");
        return;
      }
      if (vm.submitData.grainKind == "") {
        layer.msg("请填写粮食品种");
        return;
      }
      if (vm.submitData.grainLevel == "") {
        layer.msg("请填写粮食等级");
        return;
      }
      if (vm.submitData.grainProductArea == "") {
        layer.msg("请填写粮食产地");
        return;
      }
      if (vm.submitData.grainRightsBelongto == "") {
        layer.msg("请填写粮权所属");
        return;
      }
      if (vm.submitData.initialStock == "") {
        layer.msg("请填写期初库存");
        return;
      }
      if (vm.submitData.warehouseState == "") {
        layer.msg("请填写仓库状态");
        return;
      }
        layer.load(2);
        openingInventory(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("设置成功！");
              this.$router.push({
                name: "account"
              });
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          })
          .catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
          });
    },
      getWarehouse:function (data) {
        var vm = this;

        granary(data.storehouseGbCode).then(ret => {//廒间
            if (ret.code == 200) {
              // console.log(JSON.stringify(ret))
              vm.granaryList = ret.data.dataList;
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
        }).catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
        });
      },
    getDropDown: function() {//获取下拉项
      var vm = this;
      grainVariety({}).then(ret => {//粮食品种
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret))
            vm.grainVarietyList = ret.data.grainVarietyList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
      }).catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
      });
      storehouse('').then(ret => {//仓房
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret))
            vm.storehouseList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
      }).catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
      });
      grainNature({}).then(ret => {//粮食性质
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret))
            vm.grainNatureList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
      }).catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
      });
      grainOilLevel({}).then(ret => {//粮食等级
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret))
            vm.grainOilLevelList = ret.data.dataList;
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
    this.getDropDown();
  }
}
</script>
