<template>
  <div class="content">
    <div class="menuManage operationLog ">
      <div>
        <div class="btn btn-add" @click="getList();">
          <img src="../../../../static/images/search.png" alt="">
          <label>查找</label>
        </div>
      </div>
      <div class="lookup">
        仓房：
        <input type="text" class="input-text excision">
        廒间：
        <input type="text" class="input-text excision">
        用电项目：
        <input type="text" class="input-text excision">
        时间：
        <input type="text" class="input-text Wdate" onclick="WdatePicker({maxDate:'%y-%M-%d'})">~
        <input type="text" class="input-text Wdate" onclick="WdatePicker({maxDate:'%y-%M-%d'})">
      </div>
      <div>
        <div class="btn btn-add">
          <img src="../../../../static/images/add.png" alt="">
          <label>新建</label>
        </div>
        <div class="btn btn-auto">
          <label>统计列表</label>
        </div>
        <select name="" class="select-style" v-model="sortOrder" @change="changeSortOrder();">
          <option value="">排序方式</option>
          <option value="0">顺序</option>
          <option value="1">倒序</option>
        </select>
      </div>
      <table class="customTable">
        <thead>
        <tr>
          <th style="width:2.5%;"><input type="checkbox" v-model="allChecked" @change="checkAll();"></th>
          <th style="width:2.5%;">序号</th>
          <th style="width:7.5%;">仓房</th>
          <th style="width:7.5%;">廒间</th>
          <th style="width:7.5%;">用电项目</th>
          <th style="width:7.5%;">开始时间</th>
          <th style="width:7.5%;">结算时间</th>
          <th style="width:5%;">运行时间总长</th>
          <th style="width:7.5%;">作业前水表数据</th>
          <th style="width:7.5%;">作业后水表数据</th>
          <th style="width:5%;">能耗合计</th>
          <th style="width:15%;">操作</th>
        </tr>
        </thead>
        <tbody>
        <!-- <tr v-for="(item,i) in listData">
            <td><input type="checkbox" :value="item.billId" v-model="delList.billIdList" @change="clickChange();"></td>
            <td v-if="sortOrder=='0'" v-text="i+1"></td>
            <td v-else v-text="listData.length-i"></td>
            <td v-text="item.billId"></td>
            <td v-text="item.deliveryCustomer"></td>
            <td v-text="item.billMan"></td>
            <td v-text="item.billDate"></td>
            <td v-text="item.shipingCount"></td>
            <td v-text="item.receivedMoney"></td>
            <td v-text="item.applyId"></td>
            <td>
              <div class="table-btn btn-yellow" @click="showPopup(item.billId,'detail');">详情</div>
              <div class="table-btn btn-red" @click="delData(item.billId);">删除</div>
            </td>
        </tr> -->
        <tr>
          <td><input type="checkbox" ></td>
          <td>1</td>
          <td>2号</td>
          <td>小麦</td>
          <td>储备粮</td>
          <td>倒仓作业</td>
          <td>储备粮</td>
          <td>倒仓作业</td>
          <td>32156</td>
          <td>32156</td>
          <td>文本</td>
          <td>
            <div class="table-btn btn-yellow">详情</div>
            <!--<div class="table-btn btn-yellow" @click="jumpDetail();">详情</div>-->
            <!--<div class="table-btn btn-submit" @click="jumpDetail();">完成</div>-->
          </td>
        </tr>
        </tbody>
      </table>
      <!-- 分页容器 -->
      <div id="PageBar"></div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "energyList",
      data() {
        return {
          sortOrder: "0", //0 顺序，1 倒序
          requestData:this.$route.query.data,
          postData: {
            billMan: "",
            deliveryCustomer:'',
            pageSize: 10,
            pageNo: 0
          },
          showType:'',
          submitData:{
            applyId:this.$route.query.data.applyId,
            graindepot:'',
            warehouse:'',
            granary:'',
            goodsLocation:'',
            shipingCount:'',
            memo:''
          },
          grainVarietyList: "",
          grainOilLevelList: "",
          inventoryPropertyList: "",
          allChecked: false,
          delList: {
            billIdList: []
          },
          detailData:'',
          listData: [],
          graindepotList:[],//库点下拉列表
          storehouseList:[],//仓房下拉列表
          granaryList:[],//廒间下拉列表
          cargoList:[],//货位下拉列表
          editPopup: 0, // 控制菜单编辑弹出层的显影，1为显示
        };
      },
      methods: {
        changeSortOrder: function() {//倒序
          var vm = this;
          vm.listData.reverse();
        },
        getList: function() {//获取列表
          var vm = this;
          layer.load(2);
          getNoticeList(vm.postData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                vm.listData = ret.data.dataList;
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
          deleNotice({ billIdList: delStr })
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
        checkAll: function() {
          //全选
          var vm = this;
          if (vm.allChecked) {
            for (var i = 0; i < vm.listData.length; i++) {
              vm.delList.billIdList.push(vm.listData[i].billId);
            }
          } else {
            vm.delList.billIdList = [];
          }
        },
        clickChange: function() {
          //监听input选中状态，控制全选input的选中
          var vm = this;
          if (vm.delList.billIdList.length == vm.listData.length) {
            vm.allChecked = true;
          } else {
            vm.allChecked = false;
          }
        },
        jumpDetail: function(id,type) {
          //跳转到详情
          var vm = this;
          this.$router.push({
            name: "balancePayDetail",
            query: {
              id: id,
              type:type
            }
          });
        },
        jumpPay: function(id,type) {
          //跳转到编辑或新增页面
          var vm = this;
          this.$router.push({
            name: "balancePay",
            query: {
              id: id,
              type:type
            }
          });
        },
        getDropDown: function(num,id) {//获取下拉项
          var vm = this;
          if (num==0) {
            graindepot({}).then(ret => {//库点
              if (ret.code == 200) {
                console.log(JSON.stringify(ret));
                vm.graindepotList = ret.data.dataList;
              } else {
                layer.alert(ret.data, { closeBtn: 0 });
              }
            }).catch(err => {
              layer.alert(err.message, { closeBtn: 0 });
            });
            storehouse({}).then(ret => {//仓房
              if (ret.code == 200) {
                console.log(JSON.stringify(ret));
                vm.storehouseList = ret.data.dataList;
              } else {
                layer.alert(ret.data, { closeBtn: 0 });
              }
            }).catch(err => {
              layer.alert(err.message, { closeBtn: 0 });
            });
            granary({}).then(ret => {//廒间
              if (ret.code == 200) {
                console.log(JSON.stringify(ret));
                vm.granaryList = ret.data.dataList;
              } else {
                layer.alert(ret.data, { closeBtn: 0 });
              }
            }).catch(err => {
              layer.alert(err.message, { closeBtn: 0 });
            });
          }
          if (num==3) {
            cargo(id).then(ret => {//货位
              if (ret.code == 200) {
                console.log(JSON.stringify(ret));
                vm.cargoList = ret.data.cargoList;
              } else {
                layer.alert(ret.data, { closeBtn: 0 });
              }
            }).catch(err => {
              layer.alert(err.message, { closeBtn: 0 });
            });
          }
        }
      },
      mounted() {
        // this.getList(1);
      }
    };
</script>

<style type="text/css" scoped>
  .userManage-detail div{
    line-height: 20px;
  }
  .planPopup-edit-main{
    height: 40%;
  }
  .popup .popup-content{
    border-bottom: 0;
  }
  .edit-btn button{
    margin-right: 60px;
  }
</style>
