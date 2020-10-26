<template>
  <div class="content">
    <div class="menuManage operationLog">
      <div class="lookup">
        借电仓房：
        <select
          class="select-style excision"
          v-model="postData.borrowstorehouseGbCode"
          @change="getGranary(postData.borrowstorehouseGbCode,1);"
        >
          <option value>请选择</option>
          <option
            :value="item.storehouseGbCode"
            v-for="item in storehouseList"
            v-text="item.storehouseName"
          ></option>
        </select>
        借电廒间：
        <select class="select-style excision" v-model="postData.borrowWarehouseGbCode">
          <option value>请选择</option>
          <option
            :value="item.warehouseGbCode"
            v-for="item in granaryBorrowList"
            v-text="item.warehouseName"
          ></option>
        </select>
        被借电仓房：
        <select
          class="select-style excision"
          v-model="postData.borrowedstorehouseGbCode"
          @change="getGranary(postData.borrowedstorehouseGbCode,2);"
        >
          <option value>请选择</option>
          <option
            :value="item.storehouseGbCode"
            v-for="item in storehouseList"
            v-text="item.storehouseName"
          ></option>
        </select>
        被借电廒间：
        <select
          class="select-style excision"
          v-model="postData.borrowedWarehouseGbCode"
        >
          <option value>请选择</option>
          <option
            :value="item.warehouseGbCode"
            v-for="item in granaryBeBorrowedList"
            v-text="item.warehouseName"
          ></option>
        </select>
        <br />操作时间：
        <input
          type="text"
          class="input-text Wdate"
          onclick="WdatePicker({maxDate:'%y-%M-%d'})"
          id="startTime"
        />~
        <input
          type="text"
          class="input-text Wdate excision"
          onclick="WdatePicker({maxDate:'%y-%M-%d'})"
          id="endTime"
        />

        <div class="btn btn-add" @click="getList(1);">
          <img src="../../../../static/images/search.png" alt />
          <label>查找</label>
        </div>
      </div>
      <div>
        <!--<div class="btn btn-add" @click="showPopup('','add');">-->
        <div class="btn btn-add" @click="jumpEdit();">
          <img src="../../../../static/images/add.png" alt />
          <label>新建</label>
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
            <th style="width:5%;">
              <input type="checkbox" />
            </th>
            <th style="width:5%;">序号</th>
            <th style="width:15%;">借电廒间</th>
            <th style="width:15%;">被借廒间</th>
            <th style="width:15%;">开始时间</th>
            <th style="width:15%;">结算时间</th>
            <th style="width:7.5%;">借电前电表读数</th>
            <th style="width:7.5%;">借电后电表读数</th>
            <th style="width:5%;">能耗合计(kW·h)</th>
            <th style="width:10%;">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in listData">
            <td>
              <input type="checkbox" />
            </td>
            <td v-if="sortOrder=='0'" v-text="i+1"></td>
            <td v-else v-text="listData.length-i"></td>
            <td v-text="item.borrowWarehouseName"></td>
            <td v-text="item.borrowedWarehouseName"></td>
            <td v-text="item.startDatetime"></td>
            <td v-text="item.endDatetime"></td>
            <td v-text="item.beforeBorrowMeterData"></td>
            <td v-text="item.afterBorrowMeterData"></td>
            <td v-text="item.totalEnergyConsumption"></td>
            <td>
              <div class="table-btn btn-yellow" @click="jumpDetail(item.id);">详情</div>
              <!-- <div class="table-btn btn-red" @click="delData(item.id);">删除</div> -->
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 分页容器 -->
      <div id="PageBar"></div>
    </div>
  </div>
</template>
<style type="text/css" scoped></style>
<script>
import {
  borrowElectricityList,
  borrowElectricityDel
} from "@/api/energyConsumption/public";
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
        borrowstorehouseGbCode: "",
        borrowWarehouseGbCode: "",
        borrowedstorehouseGbCode: "",
        borrowedWarehouseGbCode: "",
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
      storehouseList: [], //仓房下拉列表
      granaryBorrowList: [], //借电廒间下拉列表
      granaryBeBorrowedList: [] //被借电廒间下拉列表
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
      borrowElectricityList(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.listData = ret.data.borrowRecordList;
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
    delData: function(id) {
      //删除
      var vm = this;
      if (id) {
        vm.delList.billIdList = [];
        vm.delList.billIdList.push(id);
      } else {
        if (vm.delList.billIdList.length == []) {
          layer.msg("请至少选择一条数据！");
          return;
        }
      }
      layer.load(2);
      var delStr = vm.delList.billIdList.join(",");
      borrowElectricityDel({ billIdList: delStr })
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            layer.msg("删除成功！");
            vm.getList(1);
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    jumpDetail: function(id) {
      //跳转到详情
      var vm = this;
      this.$router.push({
        name: "borrowElectricityDetail",
        query: {
          id: id
        }
      });
    },
    jumpEdit: function(id) {
      //跳转到详情
      var vm = this;
      this.$router.push({
        name: "borrowElectricityEdit",
        query: {
          id: id
        }
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
    getGranary: function(id, type) {
      //廒间下拉列表
      var vm = this;
      layer.load(2);
      granary(id)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            if (type == 1) {
              vm.granaryBorrowList = ret.data.dataList;
            } else {
              vm.granaryBeBorrowedList = ret.data.dataList;
            }
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
    vm.getDropDown();
    vm.getList(1);
  }
};
</script>
