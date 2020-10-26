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
                            <span v-if="postData.qualitativeId">
                                定性编号：
                                <input type="text" class="input-text" v-model="submitData.qualitativeId">
                            </span>
                            <span>
                                仓房：
                                <select name="" class="select-style" v-model="storehouse"  @change="getWarehouse(storehouse)">
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
                                存粮性质：
                                <select name="" class="select-style" v-model="submitData.grainAttribute">
                                    <option v-for="item in grainNatureList" :value="item.dicInfoCode" v-text="item.dicInfoValue">
                                    </option>
                                </select>
                            </span>
                            <span>
                                数量（千克）：
                                <input type="number" class="input-text" v-model="submitData.grainNumber">
                            </span>
                            <span>
                                定性日期：
                                <input type="text" class="input-text Wdate" onclick="WdatePicker({maxDate:'%y-%M-%d'})"  id="qualitativeDate" >
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
  import { qualitativeEditApi, qualitativeDetailApi, qualitativeAddApi } from "@/api/business/warehousingStock/qualitative";
  import { grainVariety, storehouse, granary, grainNature } from "@/api/systemManage/dropDown";
export default {
  name: "warehouseEdit",
  components: { Treeselect },
  data() {
    return {
        postData:{
            qualitativeId:this.$route.query.id
        },
        storehouse:'',
        warehouse:'',
        submitData:{
            qualitativeId:'',
            storehouseGbCode:'',
            storehouseName:'',
            warehouseGbCode:'',
            warehouseName:'',
            grainAttribute:'',
            grainKind:null,
            grainNumber:'',
            qualitativeDate:''
        },
        grainVarietyList:[],//粮食品种下拉
        storehouseList:'',//仓房下拉
        grainNatureList:'',//粮食性质下拉
        granaryList:''//廒间
    }
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      qualitativeDetailApi(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          console.log(JSON.stringify(ret))
          if (ret.code == 200) {
            vm.submitData.qualitativeId = ret.data.qualitativeDetail.qualitativeId;
            
            // vm.submitData.storehouseGbCode = ret.data.qualitativeDetail.storehouseGbCode;
            // vm.submitData.storehouseName = ret.data.qualitativeDetail.storehouseName;
            // vm.submitData.warehouseGbCode = ret.data.qualitativeDetail.warehouseGbCode;
            // vm.submitData.warehouseName = ret.data.qualitativeDetail.warehouseName;
            vm.storehouse={
              storehouseGbCode:ret.data.qualitativeDetail.storehouseGbCode,
              storehouseName:ret.data.qualitativeDetail.storehouseName
            }
            vm.warehouse={
              warehouseGbCode:ret.data.qualitativeDetail.warehouseGbCode,
              warehouseName:ret.data.qualitativeDetail.warehouseName
            }
            vm.submitData.grainAttribute = ret.data.qualitativeDetail.grainAttribute;
            vm.submitData.grainKind = ret.data.qualitativeDetail.grainKind;
            vm.submitData.grainNumber = ret.data.qualitativeDetail.grainNumber;
            vm.submitData.qualitativeDate = ret.data.qualitativeDetail.qualitativeDate;
            $("#qualitativeDate").val(ret.data.qualitativeDetail.qualitativeDate);
            vm.$nextTick(function() {
              vm.getDropDown();
            });
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
      vm.submitData.storehouseGbCode=vm.storehouse.storehouseGbCode;
      vm.submitData.storehouseName=vm.storehouse.storehouseName;
      vm.submitData.warehouseGbCode=vm.warehouse.warehouseGbCode;
      vm.submitData.warehouseName=vm.warehouse.warehouseName;
      if (vm.postData.qualitativeId) {
        if (vm.submitData.qualitativeId == "") {
          layer.msg("请填写定性编号");
          return;
        }
      }
      if (vm.submitData.storehouseGbCode == "") {
        layer.msg("请填写仓房编号");
        return;
      }
      if (vm.submitData.storehouseName == "") {
        layer.msg("请填写仓房名称");
        return;
      }
      if (vm.submitData.warehouseGbCode == "") {
        layer.msg("请填写廒间编号");
        return;
      }
      if (vm.submitData.warehouseName == "") {
        layer.msg("请填写廒间名称");
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
      if (vm.submitData.grainNumber == "") {
        layer.msg("请填写数量");
        return;
      }
      vm.submitData.qualitativeDate = $("#qualitativeDate").val();
      if (vm.submitData.qualitativeDate == "") {
        layer.msg("请填写定性日期");
        return;
      }
      if (this.$route.query.id) {
        layer.load(2);
        qualitativeEditApi(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("编辑定性记录成功！");
              this.$router.push({
                name: "qualitative"
              });
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          })
          .catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
          });
      } else {
        layer.load(2);
        qualitativeAddApi(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("新增定性记录成功！");
              this.$router.push({
                name: "qualitative"
              });
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          })
          .catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
          });
      }
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
    },
    detailBack:function () {
        //this.$router.back(-1);
      this.$router.push({
        name: "qualitative",
        query: {
          storehouseGbCode: this.$route.query.storehouseGbCode,
          grainKind: this.$route.query.grainKind,
          grainAttribute: this.$route.query.grainAttribute,
          startTime: this.$route.query.startTime,
          endTime: this.$route.query.endTime,
          pageNo: this.$route.query.pageNo
        }
      });
    }
  },
  mounted () {
      var vm=this;
      if (this.$route.query.id) {
          vm.getDetail();
      }else{
        vm.getDropDown();
      }
  }
}
</script>
