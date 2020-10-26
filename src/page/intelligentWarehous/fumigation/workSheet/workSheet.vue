<template>
  <div class="content">
    <div class="menuManage operationLog company">
      <div>
        <div class="btn btn-add" @click="getList(1)">
          <img src="../../../../../static/images/search.png" alt="">
          <label>查找</label>
        </div>
      </div>
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
      </div>
      <div>
        <div class="btn btn-add" @click="jumpAdd">
          <img src="../../../../../static/images/add.png" alt="">
          <label>新增</label>
        </div>
        <!-- <select name="" class="select-style">
            <option value="">显示条数</option>
        </select> -->
        <select name="" class="select-style" v-model="sortOrder" @change="changeSortOrder();">
          <option value="">排序方式</option>
          <option value="0">顺序</option>
          <option value="1">倒序</option>
        </select>
      </div>
      <table class="customTable">
        <thead>
        <tr>
          <th style="width: 5%;"><input type="checkbox"></th>
          <th style="width: 5%;">序号</th>
          <th style="width: 10%;">作业仓房</th>
          <th style="width: 10%;">作业廒间</th>
          <th style="width: 10%;">作业编号</th>
          <th style="width: 10%;">负责人</th>
          <th style="width: 10%;">熏蒸过程</th>
          <th style="width: 10%;">作业时间</th>
          <th style="width: 15%;">操作</th>
        </tr>
        </thead>
        <tbody>
         <tr v-for="(item,i) in listData">
            <td><input type="checkbox" ></td>
            <td v-if="sortOrder=='0'" v-text="i+1"></td>
            <td v-else v-text="listData.length-i"></td>
            <td v-text="item.storehouseName"></td>
            <td v-text="item.warehouseName"></td>
            <td v-text="item.jobBillId"></td>
            <td v-text="item.responsiblePersonValue"></td>
            <td v-text="item.fumigationProcess"></td>
            <td v-text="item.jobDatetime"></td>
            <td>
                <div class="table-btn btn-yellow" @click="jumpDetail(item.jobBillId)">详情</div>
                <div class="table-btn btn-green" @click="jumpEdit(item.jobBillId)">编辑</div>
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
    margin-right: 20px;
  }
</style>
<script>
  import {storehouse, granary} from "@/api/systemManage/dropDown";
  import {fetchFumigationWorkBillList} from "@/api/intelligentWarehous/fumigation";

  export default {
    name: "workSheet",
    data() {
      return {
        sortOrder: "0", //0 顺序，1 倒序
        postData: {
          storehouseGbCode: '',
          warehouseGbCode: '',
          pageSize: 10,
          pageNo: 0
        },
        listData: [],
        storehouseList: [],//仓房下拉列表
        granaryList: [],//廒间下拉列表
      };
    },
    methods: {
      changeSortOrder: function () {
        var vm = this;
        vm.listData.reverse();
      },
      getList(pageNo) {//获取列表
        var vm = this;
        vm.postData.pageNo = pageNo;
        layer.load(2);
        fetchFumigationWorkBillList(vm.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.listData = ret.data.fumigationStaffList;
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
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      jumpAdd() {
        this.$router.push({
          name: 'workSheetEdit'
        });
      },
      jumpEdit(id) {
        this.$router.push({
          name: 'workSheetEdit',
          query: {id}
        });
      },
      jumpDetail(id) {
        this.$router.push({
          name: 'workSheetDetail',
          query: {id}
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
    },
    watch: {
      'postData.storehouseGbCode'(newCode, oldCode) { // 监听仓房变化获取廒间列表
        if (newCode && newCode !== oldCode) {
          if (!this.storehouseChangeByInit) {
            this.postData.warehouseGbCode = '';
          }
          this.granaryList = [];
          this.getGranary(newCode);
        }
      },
    },
    mounted() {
      this.getList(1);
      this.getStorehouse();
      const {storehouseGbCode, warehouseGbCode} = this.$route.query;
      if (storehouseGbCode && warehouseGbCode) {
        this.storehouseChangeByInit = true;
        this.postData.storehouseGbCode = storehouseGbCode;
        this.postData.warehouseGbCode = warehouseGbCode;
      }
    }
  };
</script>
