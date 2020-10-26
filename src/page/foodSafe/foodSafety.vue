<template>
  <div class="content">
    <div class="menuManage operationLog company">
      <div class="lookup">
        仓房号：
        <select
          name
          class="select-style excision"
          v-model="postData.storehouseGbCode"
          @change="getWarehouse(postData.storehouseGbCode);"
        >
          <option value>请选择</option>
          <option
            v-for="item in storehouseList"
            :value="item.storehouseGbCode"
            v-text="item.storehouseName"
          ></option>
        </select>
        廒间：
        <select name class="select-style excision" v-model="postData.warehouseGbCode">
          <option value>请选择</option>
          <option
            v-for="item in granaryList"
            :value="item.warehouseGbCode"
            v-text="item.warehouseName"
          ></option>
        </select>
        仓房状态：
        <select name class="select-style excision" v-model="postData.warehouseState">
          <option value>选择状态</option>
          <option value="封仓">封仓</option>
          <option value="入库作业">入库作业</option>
          <option value="出库作业">出库作业</option>
          <option value="倒仓作业">倒仓作业</option>
          <option value="空仓">空仓</option>
        </select>
        <br />存粮品种：
        <div class="grainVariety excision">
          <treeselect v-model="postData.grainKind" :multiple="false" :options="grainVarietyList" />
        </div>
        <!-- <div class="select-style">
                    <div class="select-show">
                      
                    </div>
                    <div class="select-option">
                      <div class="select-item">
                        <div>
                            <label><input type="checkbox" value=""></label>
                            <label for="trigger"></label>
                            <input type="radio" name="trigger">
                            <selectGrain></selectGrain>
                        </div>
                      </div>
                    </div>
        </div>-->
        存粮性质：
        <select name class="select-style excision" v-model="postData.grainAttribute">
          <option value>请选择</option>
          <option
            v-for="item in grainNatureList"
            :value="item.dicInfoCode"
            v-text="item.dicInfoValue"
          ></option>
        </select>

        <div class="btn btn-add" @click="getList(1);">
          <img src="../../../static/images/search.png" alt />
          <label>查找</label>
        </div>
      </div>
      <div>
        <!-- <div class="btn btn-add" @click="jumpEdit();">
                    <img src="../../../../../static/images/add.png" alt="">
                    <label>新增</label>
        </div>-->
        <!-- <select name="" class="select-style">
                    <option value="">显示条数</option>
        </select>-->
        <select name class="select-style" v-model="sortOrder" @change="changeSortOrder();">
          <option value>排序方式</option>
          <option value="0">顺序</option>
          <option value="1">倒序</option>
        </select>
      </div>
      <table class="customTable">
        <thead>
          <tr>
            <th style="width: 2.5%;">
              <input type="checkbox" />
            </th>
            <th style="width: 2.5%;">序号</th>
            <th style="width: 10%;">仓房</th>
            <th style="width: 10%;">廒间</th>
            <th style="width: 5%;">粮食品种</th>
            <th style="width: 5%;">粮食性质</th>
            <!-- <th style="width: 7.5%;">实际容量(kg)</th> -->
            <th style="width: 7%;">当前数量(千克)</th>
            <!-- <th style="width: 7.5%;">累计入仓(kg)</th>
            <th style="width: 7.5%;">累计出仓(kg)</th>-->
            <th style="width: 5%;">仓库状态</th>
            <th style="width: 10%;">开始日期</th>
            <th style="width: 10%;">结束日期</th>
            <!-- <th style="width: 5%;">数据状态</th> -->
            <th style="width: 8%;">操作</th>
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
            <td v-text="item.grainKind"></td>
            <td v-text="item.grainAttribute"></td>
            <!-- <td v-text="item.actualCapacity"></td> -->
            <td v-text="item.currentQuantity"></td>
            <!-- <td v-text="item.accumulativeInput"></td>
            <td v-text="item.accumulativeOutput"></td>-->
            <td v-text="item.warehouseState"></td>
            <td v-text="item.startDate"></td>
            <td v-text="item.endDate"></td>
            <!-- <td v-text="item.dataState"></td> -->
            <td>
              <div class="table-btn btn-yellow" @click="jumpDetail(item.storagehouseAccountNo);">详情</div>
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
.operationLog .lookup .excision {
  margin-right: 5rem;
}
</style>
<script>
// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { inventoryList, barn } from "@/api/business/warehousingStock/inventory";
import {
  grainVariety,
  storehouse,
  grainNature,
  granary
} from "@/api/systemManage/dropDown";
// import selectGrain from "../../../grainVaiety";
export default {
  name: "company",
  components: { Treeselect },
  data() {
    return {
      postData: {
        storehouseGbCode: "",
        warehouseGbCode: "",
        warehouseState: "",
        grainKind: null,
        grainAttribute: "",
        pageSize: 10,
        pageNo: 0
      },
      sortOrder: "0", //0 顺序，1 倒序
      listData: [],
      grainVarietyList: [], //粮食品种下拉
      storehouseList: "", //仓房下拉
      grainNatureList: "", //粮食性质下拉
      granaryList: "" //廒间
    };
  },
  methods: {
    getList: function(pageNo) {
      //获取列表
      var vm = this;
      vm.postData.pageNo = pageNo;
      layer.load(2);
      inventoryList(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.listData = ret.data.dataList;
            for (var i in vm.listData) {
              const startTime = vm.listData[i].startDate.slice(0, 10);
              const endTime = vm.listData[i].endDate.slice(0, 10);
              vm.listData[i].startDate = startTime;
              vm.listData[i].endDate = endTime;
            }
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
    changeSortOrder: function() {
      var vm = this;
      vm.listData.reverse();
    },
    jumpDetail: function(id) {
      var vm = this;
      this.$router.push({
        name: "foodDetail",
        query: {
          id: id
        }
      });
    },
    barnMethod: function(id) {
      var vm = this;
      barn({ storagehouseAccountNo: id })
        .then(ret => {
          //封仓
          console.log(JSON.stringify(ret));
          if (ret.code == 200) {
            layer.msg("操作成功！");
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    clearingHouse: function(id, type) {
      //清仓
      var vm = this;
      this.$router.push({
        name: "profitAndLossEdit",
        query: {
          id: id,
          type: type
        }
      });
    },
    getWarehouse: function(id) {
      var vm = this;

      granary(id)
        .then(ret => {
          //廒间
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret))
            vm.granaryList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getDropDown: function() {
      //获取下拉项
      var vm = this;
      grainVariety({})
        .then(ret => {
          //粮食品种
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret))
            vm.grainVarietyList = ret.data.grainVarietyList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
      storehouse("")
        .then(ret => {
          //仓房
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret))
            vm.storehouseList = ret.data.dataList;
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
            // console.log(JSON.stringify(ret))
            vm.grainNatureList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
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
