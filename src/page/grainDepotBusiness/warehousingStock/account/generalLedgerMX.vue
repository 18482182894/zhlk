<template>
    <div class="content">
        <div class="account-qh">
          <div :class="editPopup==0?'account-item account-on':'account-item'" @click="showPopup(0);">
            本期入仓详情
          </div>
          <div :class="editPopup==1?'account-item account-on':'account-item'" @click="showPopup(1);">
            本期出仓详情
          </div>
        </div>
        <div class="menuManage operationLog company">
            <div class="lookup">
                <!-- 入库时间：
                <input type="text" class="input-text excision Wdate" onclick="WdatePicker({maxDate:'%y-%M-%d'})" id="initialDate"> -->
                入库类型：
                <select name="" class="select-style excision" v-model="postSearchData.billType">
                    <option value="" >请选择</option>
                    <option v-for="item in StorageTypeList" :value="item.dicInfoValue" v-text="item.dicInfoValue"></option>
                </select>

                <div class="btn btn-add" @click="searchList();">
                    <img src="../../../../../static/images/search.png" alt="">
                    <label>查找</label>
                </div>
            </div>
            <div>
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
                        <th style="width: 5%;"><input type="checkbox" ></th>
                        <th style="width: 5%;">序号</th>
                        <th style="width: 10%;">结算单号</th>
                        <th style="width: 7">车牌号</th>
                        <th style="width: 7%">仓房</th>
                        <th style="width: 7%;" v-if="editPopup==0">入库类型</th>
                        <th style="width: 7%;" v-else>出库类型</th>
                        <th style="width: 7%;">粮食品种</th>
                        <th style="width: 7%;" v-if="editPopup==0">入库毛重(千克)</th>
                        <th style="width: 7%;" v-else>出库毛重(千克)</th>
                        <th style="width: 7%;" v-if="editPopup==0">入库重量(千克)</th>
                        <th style="width: 7%;" v-else>出库重量(千克)</th>
                        <th style="width: 10%;" v-if="editPopup==0">入库时间</th>
                        <th style="width: 10%;" v-else>出库时间</th>
                        <th style="width: 18%;">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,i) in listData">
                        <td><input type="checkbox" ></td>
                        <td v-if="sortOrder=='0'" v-text="i+1"></td>
                        <td v-else v-text="listData.length-i"></td>
                        <td v-text="item.billId"></td>
                        <td v-text="item.plateNumber"></td>
                        <td v-text="item.storehouseName"></td>
                        <td v-text="item.billType"></td>
                        <td v-text="item.grainVariety"></td>
                        <td v-text="item.grossWeight"></td>
                        <td v-text="item.shipingCount"></td>
                        <td v-text="item.inHouseTime"></td>
                        <td>
                            <div class="table-btn btn-yellow" @click="jumpDetail(item.billId);">详情</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
      <div class="detail-back">
          <button @click="detailBack();">返回</button>
      </div>
    </div>
</template>

<script>
  import { generalLedgerMX, SettlementMX } from "@/api/business/warehousingStock/account";
  import { outStorageType } from "@/api/systemManage/dropDown";
  export default {
    name: "company",
    data() {
      return {
        allChecked: false,
        sortOrder: "0", //0 顺序，1 倒序
        // postListData:{
        //   initialTimeMonth:this.$route.query.month
        // },
        postSearchData:{
          settlementDate:this.$route.query.settlementDate,
          settlementMonth:this.$route.query.settlementMonth,
          settlementQuarter:this.$route.query.settlementQuarter,
          settlementYear:this.$route.query.settlementYear,
          billType:'',
          outInType:1,
          grainVariety:this.$route.query.grainVariety
        },
        guideStep:this.$route.query.guideStep,//结单类型（日月季年）
        listData: [],
        StorageTypeList:'',//出入库类型下拉
        editPopup: 0, // 控制菜单编辑弹出层的显影，1为显示
      };
    },
    methods: {
      // getList: function() {
      //   //获取列表
      //   var vm = this;
      //   layer.load(2);
      //   generalLedgerMX(vm.postListData)
      //     .then(ret => {
      //       layer.closeAll("loading");
      //       if (ret.code == 200) {
      //         console.log(JSON.stringify(ret))
      //         vm.listData = ret.data.dataList;
      //       }else {
      //         if (ret.code == "500" && ret.data == "查询错误，没有数据") {
      //           layer.msg("暂无数据");
      //           vm.listData = [];
      //         } else {
      //           layer.alert(ret.data, { closeBtn: 0 });
      //         }
      //       }
      //     })
      //     .catch(err => {
      //       layer.alert(err.message, { closeBtn: 0 });
      //     });
      // },
      searchList: function() {
        //获取列表
        var vm = this;
        if (vm.editPopup==0) {
            vm.postSearchData.outInType = 1;
        }else{
            vm.postSearchData.outInType = 2;
        }
        // vm.postSearchData.initialDate=$('#initialDate').val();
        layer.load(2);
        SettlementMX(vm.postSearchData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.listData = ret.data.dataList;
            }else {
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
        if (vm.editPopup==0) {
            this.$router.push({
              name: "settleDetail",
              query: {
                id: id
              }
            });
        }else{
            this.$router.push({
              name: "settleOutDetail",
              query: {
                id: id
              }
            });
        }
      },
      showPopup: function(num) {// 展示弹出层
          var vm = this;
          if (vm.editPopup!=num) {
            vm.editPopup = num;
          }
          $('#initialDate').val('');
          vm.postSearchData.initialDate='';
          vm.postSearchData.outInType='';

          vm.searchList();
      },
      getDropDown: function() {//获取下拉项
        var vm = this;
        outStorageType({}).then(ret => {//出入库类型
            if (ret.code == 200) {
              // console.log(JSON.stringify(ret))
              vm.StorageTypeList = ret.data.dataList;
              vm.postSearchData.billType = vm.StorageTypeList.dicInfoValue
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
        }).catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
        });
      },
      detailBack:function () {//返回
          var vm = this;
          if (this.$route.query.name=="account") {
            this.$router.push({
              name: "account",
              query: {
                storehouseGbCode: this.$route.query.storehouseGbCode,
                warehouseGbCode: this.$route.query.warehouseGbCode,
                grainKind: this.$route.query.grainKind,
                initialTimeMonth:this.$route.query.initialTimeMonth,
                pageNo: this.$route.query.pageNo
              }
            });
          }
          else if(this.$route.query.name=="generalLedger"){
            this.$router.push({
              name: "generalLedger",
              query: {
                storehouseGbCode: this.$route.query.storehouseGbCode,
                warehouseGbCode: this.$route.query.warehouseGbCode,
                grainKind: this.$route.query.grainKind,
                startMonth:this.$route.query.startMonth,
                endMonth:this.$route.query.endMonth,
                pageNo: this.$route.query.pageNo
              }
            });
          }
          else if(this.$route.query.name=="report"){
            this.$router.push({
              name: "report"
            });
          }
      }
    },
    mounted() {
      var vm = this;
        vm.searchList();
        vm.getDropDown();
        /*console.log(JSON.stringify(this.$route.query.settlementDate))
        console.log(JSON.stringify(this.$route.query.settlementMonth))
        console.log(JSON.stringify(this.$route.query.settlementQuarter))
        console.log(JSON.stringify(this.$route.query.settlementYear))
        console.log(JSON.stringify(this.$route.query.grainVariety))*/
    }
  };
</script>
