<template>
  <div class="content">
    <div class="menuManage roleManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">新增粮食数量监测记录</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div>
              <span>
                仓库:
                <select class="select-style excision" v-model="detail.storehouseGbCode">
                  <option
                    v-for="item in storehouseList"
                    :key="item.storehouseGbCode"
                    :value="item.storehouseGbCode"
                    v-text="item.storehouseName"
                  />
                </select>
              </span>
              <span>
                廒间：
                <select class="select-style excision" v-model="detail.warehouseGbCode">
                  <option
                    v-for="item in granaryList"
                    :key="item.warehouseGbCode"
                    :value="item.warehouseGbCode"
                    v-text="item.warehouseName"
                  />
                </select>
              </span>
              <span>
                货位：
                <select class="select-style excision" v-model="detail.cargoCode">
                  <option
                    v-for="item in cargoList"
                    :key="item.cargoPosition"
                    :value="item.cargoPosition"
                    v-text="item.cargoName"
                  />
                </select>
              </span>
              <br />
              <span>
                仓库状态：
                <input
                  type="text"
                  class="input-text"
                  readonly
                  v-model="detail.storehouseStatus"
                />
              </span>
              <span>
                粮食品种：
                <input
                  type="text"
                  class="input-text"
                  readonly
                  v-model="detail.grainVarietyName"
                />
              </span>
              <span>
                保管帐ID：
                <input
                  type="text"
                  class="input-text"
                  readonly
                  v-model="detail.warehouseKeepingAccountId"
                />
              </span>
              <span>
                粮食性质：
                <input
                  type="text"
                  class="input-text"
                  readonly
                  v-model="detail.grainPropertyName"
                />
              </span>
              <span>
                粮权所属：
                <input
                  type="text"
                  class="input-text"
                  readonly
                  v-model="detail.grainRightsBelongto"
                />
              </span>
              <span>
                收获年度：
                <input type="text" class="input-text" readonly v-model="detail.harvestYear" />
              </span>
              <span>
                库存数量：
                <input type="text" class="input-text" readonly v-model="detail.storageNum" />
              </span>
              <span>
                检测数量：
                <input type="text" class="input-text" readonly v-model="detail.checkMan" />
              </span>
              <span>
                粮食等级：
                <input type="text" class="input-text" readonly v-model="detail.grainLevelName" />
              </span>
              <span>
                测试时间：
                <input
                  type="text"
                  class="input-text Wdate"
                  onclick="WdatePicker({dateFmt: 'yyyy-MM-dd HH:mm:ss',maxDate:'%y-%M-%d'})"
                  id="testDatetime"
                />
              </span>
              <span>
                廒间原始编号：
                <input type="text" class="input-text" v-model="detail.warehouseOriginalId" />
              </span>
              <span style="width: 100%">
                测试结果：
                <textarea class="edit-textarea" v-model="detail.testResult" />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="edit-btn">
        <button class="edit-submit" @click="submitEvent();" v-if="see">提交</button>
        <button class="edit-back" @click="detailBack();">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  addQuantityDetection,
  fetchQuantityDetection,
  fetchWarehouse,
  getGrainUseState
} from "@/api/intelligentWarehous/quantityDetection";
import {
  granary,
  storehouse,
  cargo,
  grainOilLevel,
  grainNature
} from "@/api/systemManage/dropDown";
import { grainDetail } from "@/api/systemManage/basicData/grainVarieties";

export default {
  name: "priceManageEdit",
  data() {
    return {
      detail: {
        storehouseGbCode: "",
        storehouseName: "",
        warehouseGbCode: "",
        warehouseName: "",
        cargoCode: "",
        cargoName: "",
        storehouseStatus: "",
        grainVariety: "",
        grainVarietyName: "",
        warehouseKeepingAccountId: "",
        grainProperty: "",
        grainPropertyName: "",
        grainRightsBelongto: "",
        harvestYear: "",
        storageNum: "",
        checkNum: 0,
        grainLevel: "",
        grainLevelName: "",
        testDatetime: "",
        warehouseOriginalId: "",
        testResult: "",
        grainInfo3dImage: "",
        insideMonitorImage: ""
      },
      postData: {
        storehouseGbCode: this.$route.query.storehouseGbCode,
        warehouseGbCode: this.$route.query.warehouseGbCode,
        pageNo: this.$route.query.pageNo != null ? this.$route.query.pageNo : 0
      },
      storehouseList: [], //仓房下拉列表
      granaryList: [], //廒间下拉列表
      cargoList: [], //货位下拉列表
      grainLevelList: [], //粮食等级下拉列表
      grainNatureList: [], //粮食性质下拉列表
      see: true
    };
  },
  methods: {
    submitEvent: function() {
      this.detail.testDatetime = document.getElementById("testDatetime").value;
      if (!this.detail.storehouseGbCode) return layer.msg("请选择仓房");
      if (!this.detail.warehouseGbCode) return layer.msg("请选择仓廒");
      if (!this.detail.cargoCode) return layer.msg("请选择货位");
      if (!this.detail.warehouseKeepingAccountId)
        return layer.msg("请填写保管帐ID");
      if (!this.detail.testDatetime) return layer.msg("请选择测试时间");
      if (!this.detail.warehouseOriginalId)
        return layer.msg("请填写廒间原始编号");
      if (!this.detail.testResult) return layer.msg("请填写测试结果");
      this.detail.storehouseName = this.storehouseList.find(
        storehouse =>
          this.detail.storehouseGbCode === storehouse.storehouseGbCode
      ).storehouseName;
      this.detail.warehouseName = this.granaryList.find(
        granary => this.detail.warehouseGbCode === granary.warehouseGbCode
      ).warehouseName;
      this.detail.cargoName = this.cargoList.find(
        granary => this.detail.cargoCode === granary.cargoPosition
      ).cargoName;
      layer.load(2);
      addQuantityDetection(this.detail)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            layer.msg("新增粮食在线监测数据成功！");
            this.gobackTo();
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.closeAll("loading");
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    detailBack: function() {
      this.gobackTo();
    },
    getStorehouse() {
      // 获取仓房列表
      storehouse("")
        .then(ret => {
          if (ret.code == 200) {
            this.storehouseList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getGranary(code) {
      // 获取廒间列表
      granary(code)
        .then(ret => {
          if (ret.code == 200) {
            this.granaryList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getCargo(code) {
      // 获取货位列表
      cargo(code)
        .then(ret => {
          if (ret.code == 200) {
            this.cargoList = ret.data.cargoList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getGrainLevel() {
      // 获取粮食等级下拉列表
      grainOilLevel()
        .then(ret => {
          if (ret.code == 200) {
            this.grainLevelList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getGrainNature() {
      // 获取粮食性质下拉列表
      grainNature()
        .then(ret => {
          if (ret.code == 200) {
            this.grainNatureList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getWarehouse(warehouseGbCode) {
      fetchWarehouse({ warehouseGbCode })
        .then(ret => {
          if (ret.code == 200) {
            const { dataMap } = ret.data;
            this.detail.storehouseStatus = dataMap.warehouseState;
            this.detail.warehouseKeepingAccountId =
              dataMap.warehouseKeepingAccountId;
            this.detail.grainRightsBelongto = dataMap.grainRightsBelongto;
            this.detail.harvestYear = dataMap.harvestYear;
            this.detail.storageNum = dataMap.currentQuantity;
            this.detail.grainLevel = dataMap.grainLevel;
            this.detail.grainLevelName = this.grainLevelList.find(
              level => level.dicInfoCode == dataMap.grainLevel
            ).dicInfoValue;
            this.detail.grainProperty = dataMap.grainAttribute;
            this.detail.grainPropertyName = this.grainNatureList.find(
              level => level.dicInfoCode == dataMap.grainAttribute
            ).dicInfoValue;
            this.getGrainVariety(dataMap.grainKind);
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getGrainVariety(grainVarietyId) {
      // 获取粮食种类
      grainDetail({ grainVarietyId }) 
        .then(ret => {
          if (ret.code == 200) {
            const { grainVariety } = ret.data;
            this.detail.grainVariety = grainVariety.grainVarietyId;
            this.detail.grainVarietyName = grainVariety.grainVarietyName;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    clearGrainInfo() {
      this.detail.storehouseStatus = "";
      this.detail.warehouseKeepingAccountId = "";
      this.detail.grainRightsBelongto = "";
      this.detail.harvestYear = "";
      this.detail.storageNum = "";
      this.detail.grainLevel = "";
      this.detail.grainLevelName = "";
      this.detail.grainProperty = "";
      this.detail.grainPropertyName = "";
      this.detail.grainVariety = "";
      this.detail.grainVarietyName = "";
    },

    gobackTo() {
      var vm = this;
      this.$router.push({
        name: "quantityDetection",
        query: {
          storehouseGbCode: vm.postData.storehouseGbCode,
          warehouseGbCode: vm.postData.warehouseGbCode,
          pageNo: vm.postData.pageNo
        }
      });
    },
    getState(warehouseGbCode) {
      getGrainUseState({ warehouseGbCode })
        .then(ret => {
          const vm = this
          if (ret.code == 200) {
            if (ret.data.state == "false") {
              layer.confirm("该廒间正在采集粮食数量数据，请稍后再试",{
                btn:['确认']
              },function (index) {
                vm.see = false
                layer.close(index);
              })
            } else {
              vm.see = true;
            }
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    }
  },
  watch: {
    "detail.storehouseGbCode"(newCode, oldCode) {
      // 监听仓房变化获取廒间列表
      if (newCode && newCode !== oldCode) {
        if (!this.storehouseGbCodeChangeByDetail) {
          this.detail.warehouseGbCode = "";
          this.detail.cargoCode = "";
          this.clearGrainInfo();
        }
        this.storehouseGbCodeChangeByDetail = false;
        this.granaryList = [];
        this.getGranary(newCode);
      }
    },
    "detail.warehouseGbCode"(newCode, oldCode) {
      // 监听仓房变化获取廒间列表
      if (newCode && newCode !== oldCode) {
        if (!this.warehouseGbCodeChangeByDetail) {
          this.detail.cargoCode = "";
          this.clearGrainInfo();
        }
        this.warehouseGbCodeChangeByDetail = false;
        this.cargoList = [];
        this.getState(newCode);
        this.getCargo(newCode);
        this.getWarehouse(newCode);
      }
    }
  },
  mounted() {
    this.getStorehouse();
    this.getGrainLevel();
    this.getGrainNature();
  }
};
</script>
