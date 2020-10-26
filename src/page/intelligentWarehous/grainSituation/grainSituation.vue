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
        存粮品种：
        <div class="grainVariety excision">
          <treeselect v-model="postData.grainVariety" :multiple="false" :options="grainVarietyList" placeholder="请选择存粮品种" />
        </div>
        <br/>
        时间：
        <input style="width: 12rem;" type="text" class="input-text Wdate" id="startTime"
               onclick="WdatePicker({dateFmt: 'yyyy-MM-dd HH:mm:ss',maxDate:'%y-%M-%d'})"/>~
        <input style="width: 12rem;" type="text" class="input-text Wdate" id="endTime"
               onclick="WdatePicker({dateFmt: 'yyyy-MM-dd HH:mm:ss',maxDate:'%y-%M-%d'})"/>
	   <div class="btn btn-add" @click="getList(1);" style="margin-left: 2rem;">
		 <img src="../../../../static/images/search.png" alt="">
		 <label>查找</label>
	   </div>
	   <br>
        最高温度：
        <div class="temperature excision">
          <span @click="getByMaxTemperature('')">不限</span>
          <span @click="getByMaxTemperature('1')">≤15°C</span>
          <span @click="getByMaxTemperature('2')">15°C-20°C</span>
          <span @click="getByMaxTemperature('3')">20°C-28°C</span>
          <span @click="getByMaxTemperature('4')">≥28°C</span>
        </div>
        平均温度：
        <div class="temperature">
          <span @click="getByAvgTemperature('')">不限</span>
          <span @click="getByAvgTemperature('1')">≤15°C</span>
          <span @click="getByAvgTemperature('2')">15°C-20°C</span>
          <span @click="getByAvgTemperature('3')">20°C-28°C</span>
          <span @click="getByAvgTemperature('4')">≥28°C</span>
        </div>
      </div>
      <div>
        <!--<div class="btn btn-collect" @click="jumpEdit();">-->
          <!--<label>采集</label>-->
        <!--</div>-->
        <!--<div class="btn btn-auto" @click="jumpEdit();">-->
          <!--<label>自动采集设置</label>-->
        <!--</div>-->
        <select name="" class="select-style" v-model="sortOrder" @change="changeSortOrder();">
          <option value="">排序方式</option>
          <option value="0">顺序</option>
          <option value="1">倒序</option>
        </select>
      </div>
      <table class="customTable">
        <thead>
        <tr>
          <th style="width:2.5%;"><input type="checkbox"/></th>
          <th style="width:2.5%;">序号</th>
          <th style="width:7.5%;">仓房名称</th>
          <th style="width:7.5%;">廒间号</th>
          <th style="width:20%;">存粮</th>
          <th style="width:8%;">粮温
            <p class="flex-around">
              <label>最高</label>
              <label>平均</label>
              <label>最低</label>
            </p>
          </th>
          <!-- <th style="width:8%;">虫情
            <p class="flex-around">
              <label>最高</label>
              <label>平均</label>
              <label>最低</label>
            </p>
          </th> -->
          <th style="width:10%;">气体平均值
            <p class="flex-around">
              <label>PH3</label>
              <label>O2</label>
              <label>CO2</label>
              <!-- <label>N2</label> -->
            </p>
          </th>
          <th style="width:10%;">时间</th>
          <th style="width:24%;">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, i) in listData">
          <td><input type="checkbox"></td>
          <td v-if="sortOrder=='0'" v-text="i+1"></td>
          <td v-else v-text="listData.length-i"></td>
          <td v-text="item.storehouseName"></td>
          <td v-text="item.warehouseName"></td>
          <td>
            <span>{{item.grainProperty}}</span>
            <br>
            <span>{{item.grainVariety}} | {{item.weight}}千克</span>
          </td>
          <td>
            <p class="flex-around">
              <label v-text="item.maxTemperature"></label>
              <label v-text="item.avgTemperature"></label>
              <label v-text="item.minTemperature"></label>
            </p>
          </td>
          <!-- <td>
            <p class="flex-around">
              <label v-text="item.maxquantity"></label>
              <label v-text="item.avgquantity"></label>
              <label v-text="item.minquantity"></label>
            </p>
          </td> -->
          <td>
            <p class="flex-around">
              <!--<label v-text="item.ph3"></label>-->
              <!--<label v-text="item.o2"></label>-->
              <!--<label v-text="item.co2"></label>-->
              <!--<label v-text="item.n2"></label>-->
              <label>{{item.ph3}}PPM</label>
              <label>{{item.o2}}%VOL</label>
              <label>{{item.co2}}PPM</label>
              <!-- <label>{{item.n2}}%</label> -->
            </p>
          </td>
          <td v-text="item.searchTime.slice(0, 10)"></td>
          <td>
            <div class="table-btn btn-green" @click="jumpTem(item);">粮温</div>
            <!-- <div class="table-btn btn-green" @click="jumpInsect(item);">虫情</div> -->
            <div class="table-btn btn-green" @click="jumpGas(item);">气体</div>
          </td>
        </tr>
        </tbody>
      </table>
      <!-- 分页容器 -->
      <div id="PageBar"></div>
    </div>
  </div>
</template>
<style type="text/css" scoped>
  .lookup .excision {
    margin-right: 2rem;
  }

  .temperature {
    display: inline-flex;
    margin: 0;
  }
</style>
<script>
  import Treeselect from '@riophae/vue-treeselect';
  import '@riophae/vue-treeselect/dist/vue-treeselect.css';
  import {fetchGrainSituationList} from "@/api/intelligentWarehous/grainSituation";
  import {storehouse, granary, grainVariety} from "@/api/systemManage/dropDown";

  export default {
    name: "contract",
    components: {Treeselect},
    data() {
      return {
        sortOrder: "0", //0 顺序，1 倒序
        postData: {
          storehouseGbCode: '',
          warehouseGbCode: '',
          grainVariety: null,
          startTime: '',
          endTime: '',
          pageSize: 10,
          pageNo: ''
        },
        listData: [],
        storehouseList: [],//仓房下拉列表
        granaryList: [],//廒间下拉列表
        grainVarietyList: [],
        currentPage: ''
      };
    },
    methods: {
      changeSortOrder () {//倒序
        var vm = this;
        vm.listData.reverse();
      },
      getList(pageNo, extra = {}) {//获取列表
        var vm = this;
        vm.postData.pageNo = pageNo;
        vm.postData.startTime = document.getElementById('startTime').value;
        vm.postData.endTime = document.getElementById('endTime').value;
        layer.load(2);
        fetchGrainSituationList({...vm.postData, ...extra})
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.listData = ret.data.dataList;
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
                    const str = JSON.stringify(obj.curr)
                    sessionStorage.setItem("pageNo", str)
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
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      getByMaxTemperature(temperature) {
        this.getList(1, {maxTemperature: temperature})
      },
      getByAvgTemperature(temperature) {
        this.getList(1, {avgTemperature: temperature})
      },
      jumpInsect ({storehouseGbCode, warehouseGbCode}) {
        //跳转到虫情
        this.$router.push({
          name: "insectPest",
          query: {storehouseGbCode, warehouseGbCode}
        });
      },
      jumpTem ({storehouseGbCode, warehouseGbCode}) {
        //跳转到温度
        this.$router.push({
          name: "temperature",
          query: {storehouseGbCode, warehouseGbCode}
        });
      },
      jumpGas ({storehouseGbCode, warehouseGbCode}) {
        //跳转到气体
        this.$router.push({
          name: "gasDetection",
          query: {storehouseGbCode, warehouseGbCode}
        });
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
      },
      getGrainVariety() { //获取粮食品种
        grainVariety({})
          .then(ret => {//粮食品种
          if (ret.code == 200) {
            this.grainVarietyList = ret.data.grainVarietyList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        }).catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
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
    beforeRouteEnter (to, from, next) {
      next(vm => {
        if(from.name == 'temperature' || from.name == 'gasDetection' || from.name == 'insectPest') {
          vm.postData.pageNo = sessionStorage.getItem("pageNo") * 1
          vm.getList(vm.postData.pageNo)
        } else {
          vm.postData.pageNo = 1
          vm.getList(vm.postData.pageNo)
        }
      })
    },
    mounted() {
      this.getStorehouse();
      this.getGrainVariety();
    }
  };

</script>
