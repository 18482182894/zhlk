<template>
  <div class="content">
    <div class="menuManage operationLog">
      <div class="lookup">
        仓房：
        <select
          class="select-style excision"
          v-model="postData.storehouseGbCode"
          @change="getGranary(postData.storehouseGbCode);"
        >
          <option value>请选择</option>
          <option
            :value="item.storehouseGbCode"
            v-for="item in storehouseList"
            v-text="item.storehouseName"
          ></option>
        </select>
        廒间：
        <select class="select-style excision" v-model="postData.warehouseGbCode">
          <option value>请选择</option>
          <option
            :value="item.warehouseGbCode"
            v-for="item in granaryList"
            v-text="item.warehouseName"
          ></option>
        </select>
        用电项目：
        <select class="select-style excision" v-model="postData.electricConsumerItem">
          <option value>请选择</option>
          <option value="1">熏蒸作业</option>
          <option value="2">通风作业</option>
          <option value="3">低温储粮</option>
          <option value="4">值仓</option>
          <option value="5">其它</option>
        </select>
        时间：
        <input
          type="text"
          class="input-text Wdate"
          onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"
          id="startTime"
        />~
        <input
          type="text"
          class="input-text Wdate excision"
          onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"
          id="endTime"
        />
        <div class="btn btn-add" @click="getList(0);">
          <img src="../../../../static/images/search.png" alt />
          <label>查找</label>
        </div>
      </div>
      <div>
        <div class="btn btn-auto" @click="jumpChart();">
          <label>统计图表</label>
        </div>
        <select name class="select-style" v-model="sortOrder" @change="changeSortOrder();">
          <option value>排序方式</option>
          <option value="0">顺序</option>
          <option value="1">倒序</option>
        </select>
      </div>
      <table class="customTable">
        <thead>
          <tr>
            <th style="width:2.5%;">
              <input type="checkbox" />
            </th>
            <th style="width:2.5%;">序号</th>
            <th style="width:7.5%;">仓房</th>
            <th style="width:7.5%;">廒间</th>
            <th style="width:7.5%;">用电项目</th>
            <th style="width:7.5%;">开始时间</th>
            <th style="width:7.5%;">结算时间</th>
            <th style="width:5%;">运行时间总长(h)</th>
            <th style="width:7.5%;">作业前电表数据</th>
            <th style="width:7.5%;">作业后电表数据</th>
            <th style="width:5%;">能耗合计(kW·h)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in listData">
            <td>
              <input type="checkbox" />
            </td>
            <td v-if="sortOrder=='0'" v-text="i+1"></td>
            <td v-else v-text="listData.length-i"></td>
            <td v-text="item.storehouseName"></td>
            <td v-text="item.warehouseName"></td>
            <td>
              <label v-if="parseInt(item.electricConsumerItem)==1" v-text="'熏蒸作业'"></label>
              <label v-if="parseInt(item.electricConsumerItem)==2" v-text="'通风作业'"></label>
              <label v-if="parseInt(item.electricConsumerItem)==3" v-text="'低温储粮'"></label>
              <label v-if="parseInt(item.electricConsumerItem)==4" v-text="'值仓'"></label>
              <label v-if="parseInt(item.electricConsumerItem)==5" v-text="'其它'"></label>
            </td>
            <td v-text="item.startDatetime"></td>
            <td v-text="item.endDatetime"></td>
            <td v-text="item.timeTotalLength"></td>
            <td v-text="item.beforeJobMeterData"></td>
            <td v-text="item.afterJobMeterData"></td>
            <td v-text="item.totalEnergyConsumption"></td>
          </tr>
          <tr>
            <td colspan="7" rowspan>汇总</td>
            <td colspan rowspan v-text="totalRunningTime"></td>
            <td colspan="2" rowspan></td>
            <td colspan rowspan v-text="totalEnergy"></td>
          </tr>
        </tbody>
      </table>
      <!-- 分页容器 -->
      <div id="PageBar"></div>
    </div>
  </div>
</template>
<style type="text/css" scoped>
.excision {
  margin-right: 2rem;
}
</style>
<script>
import { energyStatisticsList } from "@/api/energyConsumption/public";
import {
  graindepot,
  storehouse,
  granary,
  cargo
} from "@/api/systemManage/dropDown";

export default {
  name: "document",
  data() {
    return {
      sortOrder: "0", //0 顺序，1 倒序
      postData: {
        storehouseGbCode: "",
        warehouseGbCode: "",
        electricConsumerItem: "",
        startTime: "",
        endTime: "",
        pageSize: 10,
        pageNo: 0
      },
      allChecked: false,
      delList: {
        billIdList: []
      },
      listData: [],
      totalRunningTime: "",
      totalEnergy: "",
      storehouseList: [], //仓房下拉列表
      granaryList: [] //廒间下拉列表
    };
  },
  methods: {
    changeSortOrder: function() {
      //倒序
      var vm = this;
      vm.listData.reverse();
    },
    getList: function(pageNo) {
      //获取列表
      var vm = this;
      vm.postData.pageNo = pageNo;
      vm.postData.startTime = $("#startTime").val();
      vm.postData.endTime = $("#endTime").val();
      layer.load(2);
      energyStatisticsList(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.listData = ret.data.energyReportList;
            vm.totalRunningTime = ret.data.totalRunningTime;
            vm.totalEnergy = ret.data.totalEnergy;
            laypage({
              //分页
              cont: "PageBar", //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
              pages: ret.page.totalPages, //通过后台拿到的总页数
              curr: pageNo,
              skin: "#95C93E", //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
              jump: function(obj, first) {
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
              layer.alert(ret.data, { closeBtn: 0 });
            }
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    jumpChart: function() {
      //跳转到新增
      var vm = this;
      this.$router.push({
        name: "consumeEnergy_statisticsChart"
      });
    },
    getDropDown: function() {
      //获取下拉项
      var vm = this;

      storehouse()
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            console.log(ret);
            vm.storehouseList = ret.data.dataList;
          } else {
            if (ret.code == 500 && ret.data == "查询错误，没有数据") {
              vm.storehouseList = [];
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getGranary: function(id) {
      //廒间下拉列表
      var vm = this;
      layer.load(2);
      granary(id)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.granaryList = ret.data.dataList;
          } else {
            if (ret.code == 500 && ret.data == "查询错误，没有数据") {
              vm.granaryList = [];
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    }
  },
  mounted() {
    var vm = this;
    vm.getList(1);
    vm.getDropDown();
  }
};
</script>

