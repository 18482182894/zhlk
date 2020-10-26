<template>
  <div class="content">
    <div class="menuManage operationLog company">
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
		<div class="btn btn-add" @click="getList(1)">
		  <img src="../../../../../static/images/search.png" alt="">
		  <label>查找</label>
		</div>
      </div>
      <div>
        <div class="btn btn-add" @click="showAddPopup">
          <label>创建策略</label>
        </div>
        <select class="select-style" v-model="sortOrder" @change="changeSortOrder()">
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
          <th style="width: 10%;">仓房</th>
          <th style="width: 10%;">廒间</th>
          <th style="width: 10%;">定时器cron表达式</th>
          <th style="width: 10%;">创建时间</th>
          <th style="width: 30%;">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,i) in listData">
          <td><input type="checkbox"></td>
          <td v-if="sortOrder=='0'" v-text="i+1"></td>
          <td v-else v-text="listData.length-i"></td>
          <td v-text="item.storehouseName"></td>
          <td v-text="item.warehouseName"></td>
          <td v-text="item.cronStr"></td>
          <td v-text="item.createDatetime"></td>
          <td>
            <div class="table-btn btn-yellow" @click="showDetailPopup(item)">详情</div>
            <div class="table-btn btn-green" @click="showEditPopup(item.warehouseGbCode)">编辑</div>
          </td>
        </tr>
        </tbody>
      </table>
      <!-- 分页容器 -->
      <div id="PageBar"></div>
    </div>
    <!-- 弹出层 -->
    <StrategyPopup
      v-if="isShowPopup"
      :isAdd="isAddStrategy"
      :warehouseGbCode="currentWarehouseGbCode"
      :acquisitionType="postData.acquisitionType"
      @hide="isShowPopup=false"
      @submit="submit"/>
    <StrategyDetailPopup
      v-if="isShowDetailPopup"
      :api="getStrategyDetail"
      @hide="isShowDetailPopup=false"/>
  </div>
</template>

<style type="text/css" scoped>
  .operationLog .lookup .excision {
    margin-right: 20px;
  }
</style>
<script>
  import {storehouse, granary} from "@/api/systemManage/dropDown";
  import {fetchStrategyList, addStrategy, editStrategy, fetchStrategy} from '@/api/intelligentWarehous/strategy';
  import StrategyPopup from '../../StrategyPopup';
  import StrategyDetailPopup from '../../StrategyDetailPopup';

  export default {
    components: {
      StrategyPopup,
      StrategyDetailPopup,
    },
    data() {
      return {
        isShowPopup: false,
        isShowDetailPopup: false,
        isAddStrategy: true,
        currentWarehouseGbCode: '',
        sortOrder: "0", //0 顺序，1 倒序
        postData: {
          acquisitionType: '粮温',
          storehouseGbCode: '',
          warehouseGbCode: '',
          pageSize: 10,
          pageNo: 0
        },
        listData: [],
        storehouseList: [], //仓房下拉
        granaryList: [], // 廒间下拉
      };
    },
    methods: {
      getList: function (pageNo) {
        //获取列表
        var vm = this;
        vm.postData.pageNo = pageNo;
        layer.load(2);
        fetchStrategyList(vm.postData)
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
      changeSortOrder: function () {
        var vm = this;
        vm.listData.reverse();
      },
      showAddPopup() {
        this.isShowPopup = true;
        this.isAddStrategy = true;
      },
      showEditPopup(warehouseGbCode) {
        this.isShowPopup = true;
        this.isAddStrategy = false;
        this.currentWarehouseGbCode = warehouseGbCode;
      },
      showDetailPopup({warehouseGbCode}) {
        this.isShowDetailPopup = true;
        this.currentWarehouseGbCode = warehouseGbCode;
      },
      getStrategyDetail() {
        return fetchStrategy({warehouseGbCode: this.currentWarehouseGbCode, acquisitionType: this.postData.acquisitionType})
      },
      submit(data) {
        layer.load(2);
        const api = this.isAddStrategy ? addStrategy : editStrategy;
        api(data)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.alert(`策略${this.isAddStrategy ? '新增' : '编辑'}成功`, {closeBtn: 0});
              this.isShowPopup = false;
              this.getList(this.isAddStrategy ? 1 : this.postData.pageNo);
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
      this.getList(1);
      this.getStorehouse();
    }
  };
</script>
