<template>
  <div class="content">
    <div class="menuManage operationLog ">
      <div>
        <div class="btn btn-add" @click="getGasForList">
          <img src="../../../../../static/images/search.png" alt="">
          <label>查找</label>
        </div>
      </div>
      <div class="lookup">
        仓房：
        <select class="select-style excision" v-model="postData.storehouseGbCode">
          <option value="">请选择</option>
          <option
            v-for="item in storehouseList"
            :key="item.storehouseGbCode"
            :value="item.storehouseGbCode"
            v-text="item.storehouseName"/>
        </select>
        廒间：
        <select class="select-style excision" v-model="postData.warehouseGbCode">
          <option value="">请选择</option>
          <option
            v-for="item in granaryList"
            :key="item.warehouseGbCode"
            :value="item.warehouseGbCode"
            v-text="item.warehouseName"/>
        </select>
      </div>
      <div class="modified">
        <div class="modified-top">
          <div class="modified-middle">
            <div class="middle-item">
              <label>PH<sub>3</sub> |</label>
              <div class="middle-item-right">
                <p>{{gasMonitorDetail.avPh3}}PPM</p>
                <p>磷化氢</p>
              </div>
            </div>
            <!-- <div class="middle-item">
              <label>N<sub>2</sub> |</label>
              <div class="middle-item-right">
                <p>{{gasMonitorDetail.avN2}}%</p>
                <p>氮气</p>
              </div>
            </div> -->
            <div class="middle-item">
              <label>O<sub>2</sub> |</label>
              <div class="middle-item-right">
                <p>{{gasMonitorDetail.avO2}}%VOL</p>
                <p>氧气</p>
              </div>
            </div>
            <div class="middle-item">
              <label>CO<sub>2</sub> |</label>
              <div class="middle-item-right">
                <p>{{gasMonitorDetail.avCo2}}PPM</p>
                <p>二氧化碳</p>
              </div>
            </div>
          </div>
        </div>
        <div class="modified-content">
          <div class="modified-checkpoint" v-for="(item, index) in gasMonitorList">
            <h4>检测点{{index+1}}</h4>
            <div class="checkpoint-content">
              <p>
                <label>O<sub>2</sub></label>
                <label>{{item.o2}}%VOL</label>
              </p>
              <p>
                <label>CO<sub>2</sub></label>
                <label>{{item.co2}}PPM</label>
              </p>
              <p>
                <label>PH<sub>3</sub></label>
                <label>{{item.ph3}}PPM</label>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="detail-back">
        <button @click="$router.back()">返回</button>
      </div>
    </div>
  </div>
</template>
<style type="text/css" scoped>
  .lookup .excision {
    margin-right: 2rem;
  }

  .modified .modified-middle {
    width: auto;
    margin: 0 auto;
  }
  .detail-back {
    padding-top: 30px;
  }
</style>
<script>
  import {fetchGasForDetail, fetchGasForList} from "@/api/intelligentWarehous/grainSituation";
  import {storehouse, granary} from "@/api/systemManage/dropDown";

  export default {
    name: "contract",
    data() {
      return {
        postData: {
          storehouseGbCode: '',
          warehouseGbCode: '',
        },
        atmosphere: {
          insectMonitorList: [],
          kichoConcentrationList: [],
          kichoGasPage: [{}],
          kichoInsectPage: [{}],
        },
        gasMonitorDetail: {},
        gasMonitorList: [],
        storehouseList: [],//仓房下拉列表
        granaryList: [],//廒间下拉列表
      };
    },
    methods: {
      getGasForDetail(gasMonitor) {
        layer.load(2);
        fetchGasForDetail({gasMonitor})
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              this.gasMonitorDetail = ret.data.gasMonitorDetail;
              this.gasMonitorList = ret.data.gasMonitorList;
              this.initStorehouseGbCodeByQuery = true;
              this.postData.storehouseGbCode = this.gasMonitorDetail.storehouseGbCode;
              this.postData.warehouseGbCode = this.gasMonitorDetail.warehouseGbCode;
              this.getStorehouse();
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      getGasForList() {
        layer.load(2);
        fetchGasForList(this.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              this.gasMonitorDetail = ret.data.gasMonitorDetail;
              this.gasMonitorList = ret.data.gasMonitorList;
              console.log(this.gasMonitorList)
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      getStorehouse() { // 获取仓房列表
        storehouse()
          .then((ret) => {
            if (ret.code == 200) {
              this.storehouseList = ret.data.dataList;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      getGranary(code) { // 获取廒间列表
        granary(code)
          .then((ret) => {
            if (ret.code == 200) {
              this.granaryList = ret.data.dataList;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      jumpGasStrength() {
        this.$router.push({name: 'gasStrength'});
      },
      jumpNitrogenAndOxygen() {
        this.$router.push({name: 'nitrogenAndOxygen'});
      },
      jumpExhaustingQi() {
        this.$router.push({name: 'exhaustingQi'});
      },
    },
    watch: {
      'postData.storehouseGbCode'(newCode, oldCode) { // 监听仓房变化获取廒间列表
        if (newCode && newCode !== oldCode) {
          if (!this.initStorehouseGbCodeByQuery) {
            this.postData.warehouseGbCode = '';
          }
          this.initStorehouseGbCodeByQuery = false;
          this.granaryList = [];
          this.getGranary(newCode);
        }
      }
    },
    mounted() {
      if (this.$route.query.gasMonitor) {
        this.getGasForDetail(this.$route.query.gasMonitor);
      }
    }
  };

</script>
