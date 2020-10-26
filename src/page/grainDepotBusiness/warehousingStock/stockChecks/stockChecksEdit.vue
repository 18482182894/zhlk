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
                                <select name="" class="select-style" v-model="storehouse"  @change="getWarehouse(storehouse);">
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
                                粮食品种：
                                  <div class="edit-grainVariety">
                                    <treeselect v-model="submitData.grainKind" :multiple="false" :options="grainVarietyList" />
                                  </div>
                            </span>
                            <span>
                                盘点人：
                                <input type="text" class="input-text" v-model="submitData.inventoryPerson">
                            </span>
                            <span>
                                账面库存重量（千克）：
                                <input type="number" class="input-text" v-model="submitData.accountsInventoryWeight">
                            </span>
                            <span>
                                实际库存重量（千克）：
                                <input type="number" class="input-text" v-model="submitData.realInventoryWeight">
                            </span>
                            <span>
                                盘点日期：
                                <input type="text" class="input-text Wdate" onclick="WdatePicker({})"  id="inventoryDate" >
                            </span>
                            <span>
                                备注：
                                <input type="text" class="input-text" v-model="submitData.memo">
                            </span>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div class="edit-btn">
                <button class="edit-submit" @click="submitEvent();">提交</button>
                <button class="edit-back" @click="detailBack();">返回</button>
            </div>
        </div>
    </div>
</template>

<script>
 // import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import { stockChecksAdd } from "@/api/business/warehousingStock/stockChecks";
  import { grainVariety, storehouse, granary } from "@/api/systemManage/dropDown";
export default {
  name: "warehouseEdit",
  components: { Treeselect },
  data() {
    return {
        storehouse:'',
        warehouse:'',
        submitData:{
            storehouseName:'',
            storehouseGbCode:'',
            warehouseGbCode:'',
            warehouseName:'',
            grainKind:null,
            inventoryPerson:'',
            accountsInventoryWeight:'',
            realInventoryWeight:'',
            inventoryDate:'',
            memo:''
        },
        grainVarietyList:[],//粮食品种下拉
        storehouseList:'',//仓房下拉
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
      if (vm.submitData.storehouseGbCode == "") {
        layer.msg("请选择仓房");
        return;
      }
      if (vm.submitData.warehouseGbCode == "") {
        layer.msg("请选择廒间");
        return;
      }
      if (vm.submitData.grainKind == "") {
        layer.msg("请填写粮食品种");
        return;
      }
      if (vm.submitData.inventoryPerson == "") {
        layer.msg("请填写盘点人");
        return;
      }
      if (vm.submitData.accountsInventoryWeight == "") {
        layer.msg("请填写账面库存");
        return;
      }
      if (vm.submitData.realInventoryWeight == "") {
        layer.msg("请填写实际库存");
        return;
      }
      vm.submitData.inventoryDate = $("#inventoryDate").val();
      if (vm.submitData.inventoryDate == "") {
        layer.msg("请填写盘点日期");
        return;
      }
      layer.load(2);
      stockChecksAdd(vm.submitData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            layer.msg("新增盘点记录成功！");
            this.$router.push({
              name: "stockChecks",
              query: {
                storehouseGbCode: this.$route.query.storehouseGbCode,
                warehouseGbCode: this.$route.query.warehouseGbCode,
                startTime: this.$route.query.startTime,
                endTime: this.$route.query.endTime,
                pageNo: this.$route.query.pageNo
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
    },
    detailBack:function () {
        //this.$router.back(-1);
      this.$router.push({
        name: "stockChecks",
        query: {
          // id: id,
          storehouseGbCode: this.$route.query.storehouseGbCode,
          warehouseGbCode: this.$route.query.warehouseGbCode,
          startTime: this.$route.query.startTime,
          endTime: this.$route.query.endTime,
          pageNo: this.$route.query.pageNo
        }
      });
    }
  },
  mounted () {
    var vm=this;
    vm.getDropDown();
  }
}
</script>
