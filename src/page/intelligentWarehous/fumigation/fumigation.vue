<template>
  <div class="content">
    <div class="menuManage operationLog ">
      <div class="lookup">
        仓房：
        <select class="select-style excision" v-model="postData.storehouseGbCode">
          <option
            v-for="item in storehouseList"
            :key="item.storehouseGbCode"
            :value="item.storehouseGbCode"
            v-text="item.storehouseName"/>
        </select>
        廒间：
        <select class="select-style excision" v-model="postData.warehouseGbCode">
          <option
            v-for="item in granaryList"
            :key="item.warehouseGbCode"
            :value="item.warehouseGbCode"
            v-text="item.warehouseName"/>
        </select>
		<div class="btn btn-add" @click="getFumigationHome">
		  <img src="../../../../static/images/search.png" alt="">
		  <label>查找</label>
		</div>
      </div>
      <div>
        <div class="btn btn-add" @click="$router.push({name: 'fumigationGasStrength'})">
          <label>气体浓度</label>
        </div>
        <div class="btn btn-add" @click="$router.push({name: 'fumigationOperation'})">
          <label>熏蒸申请</label>
        </div>
        <div class="btn btn-add" @click="$router.push({name: 'bulkGas'})">
          <label>散气作业</label>
        </div>
        <div class="btn btn-add" @click="getFumigationHome">
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
              <label>PH<sub>3</sub> |</label>
              <div class="middle-item-right">
                <p>{{aVGGas.ph3 === null || typeof aVGGas.ph3 === 'undefined' ? '-' : `${aVGGas.ph3}PPM`}}</p>
                <p>磷化氢</p>
              </div>
            </div>
            <div class="middle-item">
              <label>O<sub>2</sub> |</label>
              <div class="middle-item-right">
                <p>{{aVGGas.o2 === null || typeof aVGGas.o2 === 'undefined' ? '-' : `${aVGGas.o2}%VOL`}}</p>
                <p>氧气</p>
              </div>
            </div>
            <div class="middle-item">
              <label>CO<sub>2</sub> |</label>
              <div class="middle-item-right">
                <p>{{aVGGas.co2 === null || typeof aVGGas.co2 === 'undefined' ? '-' : `${aVGGas.co2}PPM`}}</p>
                <p>二氧化碳</p>
              </div>
            </div>
            <!-- <div class="middle-item">
              <label>虫害 |</label>
              <div class="middle-item-right">
                <p>{{aVGInsector.density === null || typeof aVGInsector.density === 'undefined' ? '-' : `${aVGInsector.density}`}}</p>
                <p>{{aVGInsector.quantity}}头/kg</p>
              </div>
            </div> -->
          </div>
          <!-- <div class="modified-right">
            <p>熏蒸作业</p>
            <div class="btn btn-add" @click="jumpEdit();">
              <label>开始</label>
            </div>
            <div class="btn" style="background: #EF0421;margin-right: 0;" @click="jumpEdit();">
              <label>停止</label>
            </div>
          </div> -->
        </div>
        <div class="modified-content-top">
          <h4>上次检测时间：{{lastChecktime}}</h4>
        </div>
        <div class="modified-content">
          <div class="modified-checkpoint" v-for="item in checkList">
            <h4>监测点{{item.pointPosition}}</h4>
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
              <!-- <p>
                <label>虫</label>
                <label>{{item.density}}</label>
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
  import {storehouse, granary} from "@/api/systemManage/dropDown";
  import {fetchFumigationHome} from "@/api/intelligentWarehous/fumigation";
  import { jumpData } from "@/api/intelligentWarehous/fumigation";
  export default {
    name: "contract",
    data() {
      return {
        postData: {
          storehouseGbCode: '',
          warehouseGbCode: '',
        },
        aVGGas: {},
        aVGInsector: {},
        checkList: [],
        storehouseList: [],//仓房下拉列表
        granaryList: [],//廒间下拉列表
        lastChecktime: ''
      };
    },
    methods: {
      changeSortOrder: function () {//倒序
        var vm = this;
        vm.listData.reverse();
      },
      getList: function (pageNo) {//获取列表
        var vm = this;
        vm.postData.pageNo = pageNo;
        layer.load(2);
        getConstractList(vm.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.listData = ret.data.contractList;
              laypage({
                //分页
                cont: "PageBar", //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                pages: ret.page.totalPages, //通过后台拿到的总页数
                curr: pageNo,
                skin: "#95C93E", //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                jump: function (obj, first) {
                  //触发分页后的回调
                  if (!first) {
                    //一定要加此判断，否则初始时会无限刷新
                    vm.getList(obj.curr);
                  }
                }
              });
            } else {
              if (ret.code == "500" && ret.data == "查询错误，没有数据") {
                layer.msg("暂无数据");
                vm.listData = [];
              } else {
                layer.alert(ret.data, {closeBtn: 0});
              }
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      jumpInsect: function () {
        //跳转到虫情
        var vm = this;
        this.$router.push({
          name: "insectPest"
        });
      },
      jumpTem: function () {
        //跳转到温度
        var vm = this;
        this.$router.push({
          name: "temperature"
        });
      },
      jumpEdit: function(warehouseGbCode) {
        var vm = this;
        if (!this.postData.storehouseGbCode) return layer.msg("请选择仓房");
        if (!this.postData.warehouseGbCode) return layer.msg("请选择熬间");
        layer.msg("气体采集中，大约需要2分钟");
        jumpData({ warehouseGbCode, type: "熏蒸气体" }).then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            console.log('发送采集命令成功')
          }
        });
      },
      getFumigationHome() {
        layer.load(2);
        fetchFumigationHome(this.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              const {aVGGas, aVGInsector, gasMonitorList = [], insectMonitorList = []} = ret.data;
              if (Array.isArray(aVGGas) && aVGGas.length) {
                this.aVGGas = this.setGasPercentage(aVGGas[0]);
              }
              if (Array.isArray(aVGInsector) && aVGInsector.length) {
                this.aVGInsector = aVGInsector[0];
              }
              gasMonitorList.forEach((gas, index) => {
                this.setGasPercentage(gas);
                if (insectMonitorList[index]) {
                  gas.density = insectMonitorList[index].density;
                }
              });
              this.checkList = gasMonitorList;
              if(this.checkList.length > 0 && this.checkList[0].checkTime) {
                this.lastChecktime = this.checkList[0].checkTime
              } else {
                this.lastChecktime = ''
              }
            } else {
              if (ret.code == "500" && ret.data == "查询错误，没有数据") {
                layer.msg("暂无数据");
              } else {
                layer.alert(ret.data, {closeBtn: 0});
              }
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      setGasPercentage(gas) {
        return gas;
        const {ph3, co2, o2} = gas;
        const total = ph3*1 + co2*1 + o2*1;
        if (total === 0) {
          gas.ph3 = 0;
          gas.co2 = 0;
          gas.o2 = 0;
        } else {
          gas.ph3 = ph3 > 0 ? (ph3 * 100 / total).toFixed(2) : 0;
          gas.co2 = co2 > 0 ? (co2 * 100 / total).toFixed(2) : 0;
          gas.o2 = o2 > 0 ? (o2 * 100 / total).toFixed(2) : 0;
        }
        return gas;
      },
      getStorehouse() { // 获取仓房列表
        storehouse('')
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
      }
    },
    watch: {
      'postData.storehouseGbCode'(newCode, oldCode) { // 监听仓房变化获取廒间列表
        if (newCode && newCode !== oldCode) {
          this.granaryList = [];
          this.postData.warehouseGbCode = '';
          this.getGranary(newCode);
        }
      }
    },
    mounted() {
      this.getFumigationHome();
      this.getStorehouse();
    }
  };

</script>
