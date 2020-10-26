<template>
  <div class="content">
    <div class="menuManage operationLog">
      <div>
        <div class="btn btn-add" @click="getAtmosphereHome">
          <img src="../../../../static/images/search.png" alt />
          <label>查找</label>
        </div>
      </div>
      <div class="lookup">
        仓房：
        <select class="select-style excision" v-model="postData.storehouseGbCode">
          <option value>请选择</option>
          <option
            v-for="item in storehouseList"
            :key="item.storehouseGbCode"
            :value="item.storehouseGbCode"
            v-text="item.storehouseName"
          />
        </select>
        廒间：
        <select class="select-style excision" v-model="postData.warehouseGbCode">
          <option value>请选择</option>
          <option
            v-for="item in granaryList"
            :key="item.warehouseGbCode"
            :value="item.warehouseGbCode"
            v-text="item.warehouseName"
          />
        </select>
      </div>
      <div>
        <div class="btn btn-add" @click="jumpGasStrength();">
          <label>气体浓度详情</label>
        </div>
        <div class="btn btn-add" @click="jumpNitrogenAndOxygen();">
          <label>充氮气作业</label>
        </div>
        <div class="btn btn-add" @click="jumpExhaustingQi();">
          <label>散气作业</label>
        </div>
        <div class="btn btn-add" @click="getAtmosphereHome">
          <label>刷新</label>
        </div>
      </div>
      <div class="modified">
        <div class="modified-top" style="justify-content: space-around">
          <div class="btn btn-add" @click="jumpEdit(postData.warehouseGbCode);">
            <label>数据采集</label>
          </div>
          <div class="modified-middle">
            <div class="middle-item">
              <label>
                PH
                <sub>3</sub> |
              </label>
              <div class="middle-item-right">
                <p>{{atmosphere.kichoGasPage[0].ph3}}PPM</p>
                <p>磷化氢</p>
              </div>
            </div>
            <div class="middle-item">
              <label>
                O
                <sub>2</sub> |
              </label>
              <div class="middle-item-right">
                <p>{{atmosphere.kichoGasPage[0].o2}}%VOL</p>
                <p>氧气</p>
              </div>
            </div>
            <div class="middle-item">
              <label>
                CO
                <sub>2</sub> |
              </label>
              <div class="middle-item-right">
                <p>{{atmosphere.kichoGasPage[0].co2}}PPM</p>
                <p>二氧化碳</p>
              </div>
            </div>
            <!-- <div class="middle-item">
              <label>虫害 |</label>
              <div class="middle-item-right">
                <p>—</p>
                <p>{{atmosphere.kichoInsectPage[0].quantity}}头/kg</p>
              </div>
            </div> -->
          </div>
          <!--<div class="modified-right">-->
          <!--<p>熏蒸作业</p>-->
          <!--<div class="btn btn-add" @click="jumpEdit();">-->
          <!--<label>开始</label>-->
          <!--</div>-->
          <!--<div class="btn" style="background: #EF0421;margin-right: 0;" @click="jumpEdit();">-->
          <!--<label>停止</label>-->
          <!--</div>-->
          <!--</div>-->
        </div>
         <div class="modified-content-top">
          <h4>上次检测时间：{{lastChecktime}}</h4>
        </div>
        <div class="modified-content">
          <div
            class="modified-checkpoint"
            v-for="(item, index) in atmosphere.kichoConcentrationList"
          >
            <h4>检测点{{index+1}}</h4>
            <div class="checkpoint-content">
              <p>
                <label>
                  O
                  <sub>2</sub>
                </label>
                <label>{{item.o2}}%VOL</label>
              </p>
              <p>
                <label>
                  CO
                  <sub>2</sub>
                </label>
                <label>{{item.co2}}PPM</label>
              </p>
              <p>
                <label>
                  PH
                  <sub>3</sub>
                </label>
                <label>{{item.ph3}}PPM</label>
              </p>
              <!-- <p>
                <label>虫</label>
                <label>{{atmosphere.insectMonitorList[index] && atmosphere.insectMonitorList[index].quantity}}</label>
              </p> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style type="text/css" scoped>
.lookup .excision {
  margin-right: 2rem;
}
.modified-content {
  padding-top: 30px;
}
.modified-content-top {
    height: 0px;
    margin-left: 20px;
    font-size: 14px;
}
</style>
<script>
import { fetchAtmosphereHome } from "@/api/intelligentWarehous/atmosphere";
import { storehouse, granary } from "@/api/systemManage/dropDown";
import { jumpData } from "@/api/intelligentWarehous/fumigation";
export default {
  name: "contract",
  data() {
    return {
      postData: {
        storehouseGbCode: "",
        warehouseGbCode: ""
      },
      atmosphere: {
        insectMonitorList: [],
        kichoConcentrationList: [],
        kichoGasPage: [{}],
        kichoInsectPage: [{}]
      },
      storehouseList: [], //仓房下拉列表
      granaryList: [], //廒间下拉列表
      lastChecktime: ''
    };
  },
  methods: {
    getAtmosphereHome() {
      layer.load(2);
      fetchAtmosphereHome(this.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            this.atmosphere = ret.data;
            if(this.atmosphere.kichoConcentrationList && this.atmosphere.kichoConcentrationList[0].checkDatetime) {
              this.lastChecktime = this.atmosphere.kichoConcentrationList[0].checkDatetime
            } else {
              this.lastChecktime = ''
            }
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.closeAll("loading");
          layer.alert(err.message, { closeBtn: 0 });
        });
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
    jumpEdit: function(warehouseGbCode) {
      var vm = this;
      if (!this.postData.storehouseGbCode) return layer.msg("请选择仓房");
      if (!this.postData.warehouseGbCode) return layer.msg("请选择熬间");
      layer.msg("气体采集中，大约需要2分钟");
      jumpData({ warehouseGbCode, type: "智能气调" }).then(ret => {
        layer.closeAll("loading");
        if (ret.code == 200) {
          console.log('发送采集命令成功')
        }
      });
    },
    jumpGasStrength() {
      this.$router.push({ name: "modifiedAtmosphereGasStrength" });
    },
    jumpNitrogenAndOxygen() {
      this.$router.push({ name: "nitrogenAndOxygen" });
    },
    jumpExhaustingQi() {
      this.$router.push({ name: "exhaustingQi" });
    }
  },
  watch: {
    "postData.storehouseGbCode"(newCode, oldCode) {
      // 监听仓房变化获取廒间列表
      if (newCode && newCode !== oldCode) {
        this.granaryList = [];
        this.postData.warehouseGbCode = "";
        this.getGranary(newCode);
      }
    },
    "postData.warehouseGbCode"(newCode, oldCode) {
      // 监听廒间变化重新调查询方法刷新页面数据
      if (newCode && newCode !== oldCode) {
        this.postData.warehouseGbCode = newCode;
        this.getAtmosphereHome(this.postData);
      }
    }
  },
  mounted() {
    this.getStorehouse();
    this.getAtmosphereHome();
  }
};
</script>
