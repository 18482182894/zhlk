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
                                <label>企业编码：</label>
                                <select name="" class="select-style" v-model="submitData.enterpriseCode" @change="getGraindepotGb(submitData.enterpriseCode);">
                                    <option>请选择企业</option>
                                    <option v-for="item in companyDataList" :value="item.enterpriseCode" v-text="item.enterpriseName"></option>
                                </select>
                            </span>
                            <span>
                                <label>库点：</label>
                                <select name="" class="select-style" v-model="submitData.graindepotGbCode" @change="getStorehouse(submitData.graindepotGbCode);">
                                    <option :value="item.graindepotGbCode" v-for="item in graindepotList" v-text="item.graindepotName"></option>
                                </select>
                            </span>
                            <span>
                                <label>仓房：</label>
                                <select name="" class="select-style" v-model="submitData.storehouseGbCode" @change="getGranary(submitData.storehouseGbCode);">
                                    <option :value="item.storehouseGbCode" v-for="item in storehouseList" v-text="item.storehouseName"></option>
                                </select>
                            </span>
                            <span>
                                <label>廒间：</label>
                                <select name="" class="select-style" v-model="warehouseGbCode">
                                    <option :value="item" v-for="item in granaryList" v-text="item.warehouseName"></option>
                                </select>
                            </span>
                            <span>
                                <label>货位编码：</label>
                                <input type="text" class="input-text" v-model="submitData.cargoPosition">
                            </span>
                            <span>
                                <label>货位名称：</label>
                                <input type="text" class="input-text" v-model="submitData.cargoName">
                            </span>
                            <!-- <span>
                                <label>廒间名称：</label>
                                <input type="text" class="input-text" v-model="submitData.warehouseName">
                            </span> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">货位信息</div>
                </div>
                <div class="tag-box-content">
                    <div class="userManage-detail userManage-edit">
                        <div>
                            <span>
                                <label>当前状态：</label>
                                <select name="" class="select-style" v-model="submitData.currentState">
                                    <option v-for="item in granaryStatusList" :value="item.dicInfoCode" v-text="item.dicInfoValue"></option>
                                </select>
                            </span>
                            <span>
                                <label>设计容量（千克）：</label>
                                <input type="text" class="input-text" v-model="submitData.designCapacity">
                            </span>
                            <span>
                                <label>通风方式:</label>
                                <select name="" class="select-style" v-model="submitData.aerationModeCode">
                                    <option v-for="item in VentilationModeList" :value="item.dicInfoCode" v-text="item.dicInfoValue"></option>
                                </select>
                            </span>
                            <span>
                                <label>隔热措施：</label>
                                <input type="text" class="input-text" v-model="submitData.heatInsulation">
                            </span>
                            <span>
                                <label>是否国债投资:</label>
                                <select name="" class="select-style" v-model="submitData.isTreasuryBondsInvested">
                                    <option value="0">是</option>
                                    <option value="1">否</option>
                                </select>
                            </span>
                            <span>
                                <label>责任保管员：</label>
                                <select name="" class="select-style" v-model="submitData.liableMan">
                                    <option v-for="item in staffListData" :value="item.staff_name" v-text="item.staff_name">
                                    </option>
                                </select>
                            </span>
                            <span>
                                <label>设计年限：</label>
                                <input type="text" class="input-text Wdate" onclick="WdatePicker({})"  id="designTime" >
                            </span>
                            <span>
                                <label>启用日期：</label>
                                <input type="text" class="input-text Wdate" onclick="WdatePicker({})"  id="enableDate" >
                            </span>
                            <!-- <span>
                                建成年份：
                                <input type="text" class="input-text" v-model="submitData.">
                            </span> -->
                            <span>
                                <label>气密性：</label>
                                <input type="text" class="input-text" v-model="submitData.airTightness">
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
import {
  goodsDetail,
  goodsEdit,
  goodsNew
} from "@/api/systemManage/basicData/goodsAllocation";
import { graindepot, storehouse, granary,storehouseType,VentilationMode,UsageSituation,StorageQualification, granaryStatus,companyList } from "@/api/systemManage/dropDown";
  import { staffList} from "@/api/systemManage/staff";
export default {
  name: "goodsAllocation",
  data() {
    return {
      postData: {
        cargoPosition: this.$route.query.id,
        cargoName: this.$route.query.cargoName,
        pageNo:this.$route.query.pageNo
      },
      formulaLabel: "",
      warehouseGbCode:'',//廒间
      submitData: {
        cargoPosition: "",
        cargoName: "",
        enterpriseCode: "",
        storehouseGbCode: "",
        warehouseGbCode: "",
        warehouseName:'',
        isTreasuryBondsInvested: "",
        currentState: "",
        graindepotGbCode: "",
        liableMan: "",
        designCapacity: "",
        aerationModeCode: "",
        heatInsulation: "",
        airTightness: "",
        designTime: "",
        enableDate: ""
      },
      graindepotList:[],
      storehouseList:[],
      granaryList:[],
      companyDataList:[],
        storehouseTypeList:[],
        VentilationModeList:[],
        UsageSituationList:[],
        StorageQualificationList:[],
        staffListData:[],
        granaryStatusList:[],
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      goodsDetail(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.submitData.cargoPosition = ret.data.cargoDetail.cargoPosition;
            vm.submitData.cargoName = ret.data.cargoDetail.cargoName;
            vm.submitData.enterpriseCode = ret.data.cargoDetail.enterpriseCode;
            vm.$nextTick(function() {
              vm.getGraindepotGb(ret.data.cargoDetail.enterpriseCode);
            });
            vm.submitData.graindepotGbCode =ret.data.cargoDetail.graindepotGbCode;
            vm.$nextTick(function() {
              vm.getStorehouse(ret.data.cargoDetail.graindepotGbCode);
            });
            vm.submitData.storehouseGbCode =ret.data.cargoDetail.storehouseGbCode;
            vm.$nextTick(function() {
              vm.getGranary(ret.data.cargoDetail.storehouseGbCode);
            });
            vm.submitData.warehouseGbCode =ret.data.cargoDetail.warehouseGbCode;
            vm.submitData.warehouseName =ret.data.cargoDetail.warehouseName;
            vm.warehouseGbCode={
              warehouseGbCode:ret.data.cargoDetail.warehouseGbCode,
              warehouseName:ret.data.cargoDetail.warehouseName
            }
            vm.submitData.isTreasuryBondsInvested =ret.data.cargoDetail.isTreasuryBondsInvested;
            vm.submitData.currentState = ret.data.cargoDetail.currentState;

            vm.submitData.liableMan = ret.data.cargoDetail.liableMan;
            vm.submitData.designCapacity = ret.data.cargoDetail.designCapacity;
            vm.submitData.aerationModeCode =
              ret.data.cargoDetail.aerationModeCode;
            vm.submitData.heatInsulation = ret.data.cargoDetail.heatInsulation;
            vm.submitData.airTightness = ret.data.cargoDetail.airTightness;
            vm.submitData.designTime = ret.data.cargoDetail.designTime;
            $("#designTime").val(ret.data.cargoDetail.designTime.slice(0, 10));
            vm.submitData.enableDate = ret.data.cargoDetail.enableDate;
            $("#enableDate").val(ret.data.cargoDetail.enableDate.slice(0, 10));
            vm.submitData.warehouseName = ret.data.cargoDetail.warehouseName;
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
      vm.submitData.enableDate = $("#enableDate").val();
      vm.submitData.designTime = $("#designTime").val();
      vm.submitData.warehouseGbCode=vm.warehouseGbCode.warehouseGbCode;
      vm.submitData.warehouseName=vm.warehouseGbCode.warehouseName;
      if (vm.submitData.cargoPosition == "") {
        layer.msg("请填写货位编码");
        return;
      }
      if (vm.submitData.cargoName == "") {
        layer.msg("请填写货位名称");
        return;
      }
      if (vm.submitData.warehouseName == "") {
        layer.msg("请填写廒间名称");
        return;
      }
      if (vm.submitData.warehouseGbCode == "") {
        layer.msg("请填写廒间编码");
        return;
      }
      if (vm.submitData.storehouseGbCode == "") {
        layer.msg("请填写仓房编码");
        return;
      }
      if (vm.submitData.graindepotGbCod == "") {
        layer.msg("请填写库点编码");
        return;
      }
      if (vm.submitData.enterpriseCode == "") {
        layer.msg("请填写企业编码");
        return;
      }
      if (vm.submitData.currentState === "") {
        layer.msg("请填写当前状态");
        return;
      }
      if (vm.submitData.enableDate == "") {
        layer.msg("请填写启用日期");
        return;
      }
      if (this.$route.query.id) {
        layer.load(2);
        goodsEdit(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("编辑货位成功！");
              this.$router.push({
                name: "goodsAllocation",
                query: {
                  cargoName:vm.postData.cargoName,
                  cargoPosition:vm.postData.cargoPosition,
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
        goodsNew(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("新增货位成功！");
              this.$router.push({
                name: "goodsAllocation",
                query: {
                  cargoName:vm.postData.cargoName,
                  cargoPosition:vm.postData.cargoPosition,
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
      }
    },
    getGraindepotGb:function (id) {//获取库点
      var vm = this;
      layer.load(2);
        graindepot(id)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            console.log(JSON.stringify(ret))
            vm.graindepotList = ret.data.dataList;
          } else {
            if (ret.code == 500&&ret.data=='查询错误，没有数据') {
                vm.graindepotList=[];
            }else{
                layer.alert(ret.data, { closeBtn: 0 });
            }
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getStorehouse:function (id) {//仓房
      var vm = this;
      layer.load(2);
      storehouse(id)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.storehouseList = ret.data.dataList;
          } else {
            if (ret.code == 500&&ret.data=='查询错误，没有数据') {
                vm.storehouseList=[];
            }else{
                layer.alert(ret.data, { closeBtn: 0 });
            }
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });

    },
    getGranary:function (id) {//廒间下拉列表
      var vm = this;
      layer.load(2);
      granary(id).then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.granaryList = ret.data.dataList;
          } else {
            if (ret.code == 500&&ret.data=='查询错误，没有数据') {
                vm.granaryList=[];
            }else{
                layer.alert(ret.data, { closeBtn: 0 });
            }
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });

    },
    getDropDown:function () {
      //获取下拉数据
      var vm = this;
      companyList({})
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.companyDataList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
      VentilationMode()
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.VentilationModeList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
        staffList({
              pageSize: 1000,
              pageNo: 0
            }).then(ret => {//职工列表
          layer.closeAll("loading");
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
      UsageSituation()
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.UsageSituationList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });

      StorageQualification()
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.StorageQualificationList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });

      granaryStatus()
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.granaryStatusList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    detailBack:function (id,cargoName,cargoPosition,pageNo) {
      var vm=this;
      this.$router.push({
        name: "goodsAllocation",
        query: {
          id:id,
          cargoName:vm.postData.cargoName,
          cargoPosition:vm.postData.cargoPosition,
          pageNo:vm.postData.pageNo
        }
      });
    }
  },
  mounted() {
    var vm = this;

    if (this.$route.query.id) {
      vm.getDetail();
    }else{
      vm.getDropDown();
    }
  }
};
</script>
