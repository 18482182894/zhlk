<template>
    <div class="content">
        <div class="menuManage roleManage">
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">基础信息</div>
                </div>
                <div class="tag-box-content">
                    <div class="userManage-detail userManage-edit">
                        <div>
                            <span v-if="!postData.testStandardId">
                                化验编号：
                                <input type="text" class="input-text" v-model="submitData.testStandardId">
                            </span>
                            <span v-if="!postData.testStandardId">
                                品种：
                                <div class="edit-grainVariety">
                                  <treeselect v-model="submitData.grainVarietyId" :multiple="false" :options="grainVarietyList" />
                                </div>
                            </span>
                            <span>
                                等级：
                                <select name="" class="select-style" v-model="submitData.grainLevel">
                                    <option v-for="item in grainOilLevelList" :value="item.dicInfoCode" v-text="item.dicInfoValue"></option>
                                </select>
                            </span>
                            <span v-if="!postData.testStandardId">
                                粮食性质：
                                <select name="" class="select-style" v-model="submitData.inventoryPropertyId">
                                    <option v-for="item in inventoryPropertyList" :value="item.dicInfoCode" v-text="item.dicInfoValue"></option>
                                </select>
                            </span>
                            <span v-if="!postData.testStandardId">
                                指标项分类：
                                <select name="" class="select-style" v-model="submitData.indicatorType" @change="getIndicator();">
                                    <option value="1" >质量指标</option>
                                    <!-- <option value="2" >存储品质指标</option> -->
                                </select>
                            </span>
                            <span v-if="!postData.testStandardId">
                                指标项：
                                <select name="" class="select-style" v-model="submitData.indicatorId">
                                    <option v-for="item in indicatorList" :value="item.indicatorId" v-text="item.indicatorName"></option>
                                </select>
                            </span>
                            <span>
                                上限值：
                                <input type="text" class="input-text" v-model="submitData.upperLimitValue">
                            </span>
                            <span>
                                下限值：
                                <input type="text" class="input-text" v-model="submitData.lowerLimitValue">
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
import {
  testSetupDetail,
  testSetupEdit,
  testSetupNew
} from "@/api/systemManage/basicData/testSetup";
import { grainVariety, grainNature, indicator, grainOilLevel } from "@/api/systemManage/dropDown";
export default {
  name: "desktop",
  components: { Treeselect },
  data() {
    return {
      postData: {
        testStandardId:this.$route.query.id,
        grainVarietyId: this.$route.query.grainVarietyId,
        inventoryPropertyId:this.$route.query.inventoryPropertyId,
        pageNo:this.$route.query.pageNo
      },
      submitData: {
        testStandardId: "",
        grainVarietyId:null,
        inventoryPropertyId: "",
        indicatorId: "",
        upperLimitValue: "",
        lowerLimitValue: "",
        grainLevel:'',
        indicatorType:'1',
        memo: ""
      },
      grainVarietyList: [],
      inventoryPropertyList: [],
      indicatorList:[],
      grainOilLevelList:[]
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      testSetupDetail(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.submitData.testStandardId = this.$route.query.id;
            vm.submitData.grainVarietyId = ret.data.testStandardDetail.grainVarietyId;
            vm.submitData.inventoryPropertyId =ret.data.testStandardDetail.inventoryPropertyId;
            vm.submitData.indicatorId = ret.data.testStandardDetail.indicatorId;
            vm.submitData.upperLimitValue =ret.data.testStandardDetail.upperLimitValue;
            vm.submitData.lowerLimitValue =ret.data.testStandardDetail.lowerLimitValue;
            vm.submitData.grainLevel =ret.data.testStandardDetail.grainLevel;
            vm.submitData.memo = ret.data.testStandardDetail.memo;
            vm.$nextTick(function() {
              vm.getDropDown();
              vm.getIndicator();
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
      vm.submitData.testSetupDetail = vm.testSetupLabel;
      if (vm.submitData.testStandardId == "") {
        layer.msg("请填写化验编号");
        return;
      }
      if (vm.submitData.grainVarietyId == "") {
        layer.msg("请选择品种");
        return;
      }
      if (vm.submitData.grainLevel == "") {
        layer.msg("请选择等级");
        return;
      }
      if (vm.submitData.inventoryPropertyId == "") {
        layer.msg("请选择库存状态");
        return;
      }
      if (vm.submitData.upperLimitValue == "") {
        layer.msg("请填写上限");
        return;
      }
      if (vm.submitData.lowerLimitValue == "") {
        layer.msg("请填写上限");
        return;
      }
      if (this.$route.query.id) {
        layer.load(2);
        testSetupEdit(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("编辑标准成功！");
              this.$router.push({
                name: "testSetup",
                query: {
                  grainVarietyId:vm.postData.grainVarietyId,
                  inventoryPropertyId:vm.postData.inventoryPropertyId,
                  pageNo:vm.postData.pageNo
                }
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
        testSetupNew(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("新增标准成功！");
              this.$router.push({
                name: "testSetup"
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
    getDropDown: function() {
      //获取下拉项
      var vm = this;
      grainVariety({})
        .then(ret => {
          //粮食品种
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret));
            vm.grainVarietyList = ret.data.grainVarietyList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
      grainNature({})
        .then(ret => {
          //粮食性质
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret));
            vm.inventoryPropertyList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
      grainOilLevel({})
        .then(ret => {
          //粮食等级
          if (ret.code == 200) {
            vm.grainOilLevelList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getIndicator:function () {//获取指标项
      var vm=this;
      indicator({indicatorType:vm.submitData.indicatorType})
        .then(ret => {//指标项
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret))
            vm.indicatorList = ret.data.indicatorList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    detailBack:function (id,grainVarietyId,inventoryPropertyId,pageNo) {
      var vm = this;
      this.$router.push({
        name: "testSetup",
        query: {
          id: id,
          grainVarietyId:vm.postData.grainVarietyId,
          inventoryPropertyId:vm.postData.inventoryPropertyId,
          pageNo:vm.postData.pageNo
        }
      });
    }
  },
  mounted() {
    var vm = this;
    if (this.$route.query.id) {
      vm.getDetail();
    } else {
      vm.getDropDown();
      vm.getIndicator();
    }
  }
};
</script>
