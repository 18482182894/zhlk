<template>
  <div class="content">
    <div class="menuManage operationLog company">
      <div class="lookup">
        仓库：
        <select name="" class="select-style excision" v-model="postData.storehouseGbCode"
                @change="getWarehouse(postData.storehouseGbCode);">
          <option value="">请选择</option>
          <option v-for="item in storehouseList" :value="item.storehouseGbCode" v-text="item.storehouseName"></option>
        </select>
        廒间：
        <select name="" class="select-style excision" v-model="postData.warehouseGbCode">
          <option value="">请选择</option>
          <option v-for="item in granaryList" :value="item.warehouseGbCode" v-text="item.warehouseName"></option>
        </select>
        粮食品种：
        <div class="grainVariety excision">
          <treeselect v-model="postData.grainKind" :multiple="false" :options="grainVarietyList"/>
        </div>
        月份：
        <input type="text" class="input-text Wdate excision" onclick="WdatePicker({skin:'whyGreen',dateFmt:'yyyy-MM'})"
               id="initialTimeMonth">
        <div class="btn btn-add" @click="getList(1)">
          <img src="../../../../../static/images/search.png" alt="">
          <label>查找</label>
        </div>
      </div>
      <div>
        <div class="btn btn-add excision" @click="jumpstockSetup();">
          <label>初期库存设置</label>
        </div>
        <div class="btn btn-add" @click="jumpSettlement();">
          <label>结算周期设置</label>
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
          <th style="width: 10%;">仓库</th>
          <th style="width: 10%;">廒间</th>
          <th style="width: 10%;">粮食品种</th>
          <th style="width: 10%;">粮食性质</th>
          <th style="width: 5%;">月份</th>
          <th style="width: 5%;">期初库存(千克)</th>
          <th style="width: 5%;">期末库存(千克)</th>
          <th style="width: 5%;">本期入仓(千克)</th>
          <th style="width: 5%;">本期出仓(千克)</th>
          <th style="width: 5%;">结存性质</th>
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
          <td v-text="item.grainKind"></td>
          <td v-text="item.grainAttribute"></td>
          <td v-text="item.initialTimeMonth"></td>
          <td v-text="item.initialStock"></td>
          <td v-text="item.endStock"></td>
          <td v-text="item.thisPeriodInput"></td>
          <td v-text="item.thisPeriodOutput"></td>
          <td v-text="item.storageProperties==1?'已月结':'未月结'"></td>
          <td>
            <div class="table-btn btn-green" @click="showPopup(item);">月结</div>
            <div class="table-btn btn-yellow" @click="jumpDetail(item.initialTimeMonth);">出入库明细</div>
          </td>
        </tr>
        </tbody>
      </table>
      <!-- 分页容器 -->
      <div id="PageBar"></div>
    </div>
    <!-- 月结弹出层 -->
    <div class="popup" :style="editPopup==1?'display:block;':''">
      <div class="popup-main planPopup-edit-main operationLog">
        <div class="popup-title">
          <label>月结确认单</label>
          <em class="popup-close" @click="closePopup('edit');">×</em>
        </div>
        <div class="popup-content">
          <div class="userManage-detail">
            <div>
                            <span>
                                结存月份：
                                <label v-text="detailData.initialTimeMonth"></label>
                            </span>
              <span>
                                仓库：
                                <label v-text="detailData.storehouseName"></label>
                            </span>
              <span>
                                廒间：
                                <label v-text="detailData.warehouseName"></label>
                            </span>
              <span>
                                粮食品种：
                                <label v-text="detailData.grainKind"></label>
                            </span>
              <span>
                                粮食性质：
                                <label v-text="detailData.grainAttribute"></label>
                            </span>
              <span>
                                期初库存(千克)：
                                <label v-text="detailData.initialStock"></label>
                            </span>
              <span>
                                期末库存(千克)：
                                <label v-text="detailData.endStock"></label>
                            </span>
              <span>
                                本期入仓(千克)：
                                <label v-text="detailData.thisPeriodInput"></label>
                            </span>
              <span>
                                本期出仓(千克)：
                                <label v-text="detailData.thisPeriodOutput"></label>
                            </span>
            </div>
          </div>
        </div>
        <div class="edit-btn">
          <button class="edit-submit" @click="submitEvent(detailData.warehouseKeepingAccountId);">确认月结</button>
          <button class="edit-back" @click="closePopup();">返回</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style type="text/css" scoped>
  .operationLog .lookup .excision {
    margin-right: 20px;
  }

  .planPopup-edit-main {
    width: 890px;
    height: 37%;
  }

  .edit-btn {
    margin-top: 50px;
  }
</style>
<script>
  // import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import {warehouseList, warehouseSettle,} from "@/api/business/warehousingStock/account";
  import {grainVariety, storehouse, granary} from "@/api/systemManage/dropDown";
  // import selectGrain from "../../../grainVaiety";
  export default {
    name: "company",
    components: {Treeselect},
    data() {
      return {
        allChecked: false,
        sortOrder: "0", //0 顺序，1 倒序
        initialTimeMonth: this.$route.query.initialTimeMonth ? this.$route.query.initialTimeMonth : "",
        postData: {
          storehouseGbCode: this.$route.query.storehouseGbCode ? this.$route.query.storehouseGbCode : "",
          warehouseGbCode: this.$route.query.warehouseGbCode ? this.$route.query.warehouseGbCode : "",
          grainKind: this.$route.query.grainKind ? this.$route.query.grainKind : null,
          pageSize: 10,
          pageNo: 0
        },
        detailData: '',
        listData: [],
        grainVarietyList: [],//粮食品种下拉
        storehouseList: '',//仓房下拉
        granaryList: '',//廒间
        editPopup: 0, // 控制菜单编辑弹出层的显影，1为显示
      };
    },
    methods: {
      getList: function (pageNo) {
        //获取列表
        var vm = this;
        vm.postData.initialTimeMonth = $('#initialTimeMonth').val();
        layer.load(2);
        vm.postData.pageNo = pageNo;
        warehouseList(vm.postData)
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
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      changeSortOrder: function () {
        var vm = this;
        vm.listData.reverse();
      },
      jumpstockSetup: function () {
        var vm = this;
        this.$router.push({
          name: "stockSetup",
          query: {
            month: $("#initialTimeMonth").val(),
            storehouseGbCode: vm.postData.storehouseGbCode,
            warehouseGbCode: vm.postData.warehouseGbCode,
            pageNo: vm.postData.pageNo,
            grainKind: vm.postData.grainKind
          }
        });
      },
      jumpSettlement: function () {
        var vm = this;
        this.$router.push({
          name: "settlementCycle",
          query: {
            month: $("#initialTimeMonth").val(),
            pageNo: vm.postData.pageNo,
            grainKind: vm.postData.grainKind
          }
        });
      },
      jumpDetail: function (month) {
        var vm = this;
        this.$router.push({
          name: "generalLedgerMX",
          query: {
            month: month,
            storehouseGbCode: vm.postData.storehouseGbCode,
            warehouseGbCode: vm.postData.warehouseGbCode,
            pageNo: vm.postData.pageNo,
            grainKind: vm.postData.grainKind,
            initialTimeMonth: document.getElementById("initialTimeMonth").value,
            name: "account"
          }
        });
      },
      showPopup: function (item) {// 展示弹出层
        var vm = this;
        vm.detailData = item;
        vm.editPopup = 1;
      },
      closePopup: function () {// 隐藏弹出层
        var vm = this;
        vm.editPopup = 0;
      },
      submitEvent: function (id) {//月结
        var vm = this;
        warehouseSettle({warehouseKeepingAccountId: id}).then(ret => {
          if (ret.code == 200) {
            layer.msg("月结成功！");
            vm.postData.storehouseGbCode = '';
            vm.postData.warehouseGbCode = '';
            vm.postData.grainKind = '';
            vm.postData.initialTimeMonth = '';
            $('#initialTimeMonth').val('');
            vm.getList(1);
            vm.closePopup();
          } else {
            layer.alert(ret.data, {closeBtn: 0});
          }
        }).catch(err => {
          layer.alert(err.message, {closeBtn: 0});
        });
      },
      getWarehouse: function (id) {
        var vm = this;

        granary(id).then(ret => {//廒间
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret))
            vm.granaryList = ret.data.dataList;
          } else {
            layer.alert(ret.data, {closeBtn: 0});
          }
        }).catch(err => {
          layer.alert(err.message, {closeBtn: 0});
        });
      },
      getDropDown: function () {//获取下拉项
        var vm = this;
        grainVariety({}).then(ret => {//粮食品种
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret))
            vm.grainVarietyList = ret.data.grainVarietyList;
          } else {
            layer.alert(ret.data, {closeBtn: 0});
          }
        }).catch(err => {
          layer.alert(err.message, {closeBtn: 0});
        });
        storehouse('').then(ret => {//仓房
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret))
            vm.storehouseList = ret.data.dataList;
          } else {
            layer.alert(ret.data, {closeBtn: 0});
          }
        }).catch(err => {
          layer.alert(err.message, {closeBtn: 0});
        });
      }
    },
    mounted() {
      var vm = this;
      document.getElementById("initialTimeMonth").value = this.$route.query.initialTimeMonth? this.$route.query.initialTimeMonth : "";
      vm.getList(1);
      vm.getDropDown();
    }
  };
</script>
