<template>
    <div class="content">
        <div class="menuManage roleManage">
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">基础信息</div>
                </div>
                <div class="tag-box-content">
                    <div class="userManage-detail userManage-edit">
                        <div v-if="isShow==0">
                            <!-- 新增 -->
                            <span>
                                品种：
                                <div class="edit-grainVariety">
                                  <treeselect v-model="submitNewData.grainVarietyId" :multiple="false" :options="grainVarietyList" />
                                </div>
                            </span>
                            <span>
                                等级：
                                <select name="" class="select-style" v-model="submitNewData.grainOilLevelId">
                                    <option v-for="item in grainOilLevelList" :value="item.dicInfoCode" v-text="item.dicInfoValue"></option>
                                </select>
                            </span>
                            <span>
                                 粮食性质：
                                <select name="" class="select-style" v-model="submitNewData.inventoryPropertyId">
                                    <option v-for="item in grainNatureList" :value="item.dicInfoCode" v-text="item.dicInfoValue"></option>
                                </select>
                            </span>
                            <span>
                                价格(元/千克)：
                                <input type="num" class="input-text" v-model="submitNewData.price">
                            </span>
                            <span>
                                 备注：
                                <input type="text" class="input-text" v-model="submitNewData.memo">
                            </span>                        
                        </div>
                        <div v-else>
                            <!-- 编辑 -->
                            <span>
                                价格(元/千克)：
                                <input type="num" class="input-text" v-model="submitEditData.price">
                            </span>
                            <span>
                                 备注：
                                <input type="text" class="input-text" v-model="submitEditData.memo">
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
import { priceDetail, priceNew, priceEdit } from "@/api/systemManage/price";
import {
  grainVariety,
  grainOilLevel,
  grainNature
} from "@/api/systemManage/dropDown";
export default {
  name: "priceManageEdit",
  components: { Treeselect },
  data() {
    return {
      postData: {
        priceId: this.$route.query.id
      },
      isShow: 0,
      detailData: "",
      submitNewData: {
        grainVarietyId: null,
        inventoryPropertyId: "",
        grainOilLevelId: "",
        price: "",
        memo: ""
      },
      submitEditData: {
        priceId: this.$route.query.id,
        price: "",
        memo: ""
      },
      grainVarietyList: "",
      grainOilLevelList: "",
      grainNatureList: ""
    };
  },
  methods: {
    getDetail: function() {
      //获取编辑详情
      var vm = this;
      layer.load(2);
      priceDetail(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.detailData = ret.data.priceInfo;
            vm.submitEditData.price = ret.data.priceInfo.price;
            vm.submitEditData.memo = ret.data.priceInfo.memo;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    submitEvent: function() {
      //提交
      var vm = this;
      if (vm.postData.priceId) {
        //编辑提交
        if (vm.submitEditData.price == "") {
          layer.msg("请填写价格");
          return;
        }
        layer.load(2);
        priceEdit(vm.submitEditData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("编辑价格成功！");
              this.$router.push({
                name: "priceManage",
                query: {
                  grainVarietyId:this.$route.query.grainVarietyId,
                  grainAttributeId:this.$route.query.grainAttributeId,
                  grainLevelId:this.$route.query.grainLevelId,
                  pageNo:this.$route.query.pageNo
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
        //新增提交
        if (vm.submitNewData.grainVarietyId == "") {
          layer.msg("请选择粮食品种");
          return;
        }
        if (vm.submitNewData.inventoryPropertyId == "") {
          layer.msg("请选择库存性质");
          return;
        }
        if (vm.submitNewData.grainOilLevelId == "") {
          layer.msg("请选择粮油等级");
          return;
        }
        if (vm.submitNewData.price == "") {
          layer.msg("请填写价格");
          return;
        }
        layer.load(2);
        priceNew(vm.submitNewData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("新增价格成功！");
              this.$router.push({
                name: "priceManage",
                query: {
                  grainVarietyId:this.$route.query.grainVarietyId,
                  grainAttributeId:this.$route.query.grainAttributeId,
                  grainLevelId:this.$route.query.grainLevelId,
                  pageNo:this.$route.query.pageNo
                }
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
            vm.grainVarietyList = ret.data.grainVarietyList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
      grainOilLevel({})
        .then(ret => {
          //粮油等级
          if (ret.code == 200) {
            vm.grainOilLevelList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
      grainNature({})
        .then(ret => {
          //库存性质
          if (ret.code == 200) {
            vm.grainNatureList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    detailBack:function () {
        /*this.$router.back(-1);*/
      this.$router.push({
        name: "priceManage",
        query: {
          grainVarietyId:this.$route.query.grainVarietyId,
          grainAttributeId:this.$route.query.grainAttributeId,
          grainLevelId:this.$route.query.grainLevelId,
          pageNo:this.$route.query.pageNo
        }
      });
    }
  },
  mounted() {
    var vm = this;
    if (this.$route.query.id) {
      vm.isShow = 1;
      vm.getDetail();
    } else {
      vm.getDropDown();
    }
  }
};
</script>
