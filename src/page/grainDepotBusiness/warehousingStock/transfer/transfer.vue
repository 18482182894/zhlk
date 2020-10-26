<template>
    <div class="content">
        <div class="menuManage operationLog company">
            <div class="lookup">
                移交仓房：
                <select name="" class="select-style excision" v-model="postData.storehouseGbCode">
                    <option v-for="item in storehouseList" :value="item.storehouseGbCode" v-text="item.storehouseName">
                    </option>
                </select>
                新保管员：
                <input type="text" class="input-text excision" v-model="postData.newAdmin">
                原保管员：
                <input type="text" class="input-text excision" v-model="postData.nowAdmin">
                交接时间：
                <input type="text" class="input-text Wdate" onclick="WdatePicker({maxDate:'%y-%M-%d'})" id="exchangeStartDate">至
                <input type="text" class="input-text Wdate" onclick="WdatePicker({maxDate:'%y-%M-%d'})" id="exchangeEndDate">
				<div class="btn btn-add" @click="getList(1)" style="margin-left: 1rem;">
					<img src="../../../../../static/images/search.png" alt="">
					<label>查找</label>
				</div>
			</div>
            <div>
                <div class="btn btn-add" @click="jumpEdit();">
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
                        <th style="width: 5%;"><input type="checkbox" ></th>
                        <th style="width: 5%;">序号</th>
                        <th style="width: 10%;">记录编号</th>
                        <th style="width: 10%;">移交仓房</th>
                        <th style="width: 10%;">移交廒间</th>
                        <th style="width: 5%;">原保管员</th>
                        <th style="width: 5%;">新保管员</th>
                        <th style="width: 5%;">监交人</th>
                        <th style="width: 10%;">登记时间</th>
                        <th style="width: 10%;">交接日期</th>
                        <th style="width: 15%;">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,i) in listData">
                        <td><input type="checkbox" ></td>
                        <td v-if="sortOrder=='0'" v-text="i+1"></td>
                        <td v-else v-text="listData.length-i"></td>
                        <td v-text="item.transferId"></td>
                        <td v-text="item.storehouseName"></td>
                        <td v-text="item.warehouseName"></td>
                        <td v-text="item.nowAdmin"></td>
                        <td v-text="item.newAdmin"></td>
                        <td v-text="item.monitor"></td>
                        <td v-text="item.registorDate"></td>
                        <td v-text="item.exchangeDate"></td>
                        <td>
                            <div class="table-btn btn-yellow" @click="jumpDetail(item.transferId);">详情</div>
                            <div class="table-btn btn-green" @click="jumpEdit(item.transferId);">编辑</div>
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
    .operationLog .lookup .excision{
      margin-right: 20px;
    }
</style>
<script>
  import { transferList } from "@/api/business/warehousingStock/transfer";
  import { storehouse, granary } from "@/api/systemManage/dropDown";
  // import selectGrain from "../../../grainVaiety";
  export default {
    name: "company",
    // components:{selectGrain},
    data() {
      return {
        allChecked: false,
        sortOrder: "0", //0 顺序，1 倒序
        exchangeStartDate: this.$route.query.exchangeStartDate?this.$route.query.exchangeStartDate:"",
        exchangeEndDate: this.$route.query.exchangeEndDate?this.$route.query.exchangeEndDate:"",
        postData: {
          storehouseGbCode: this.$route.query.storehouseGbCode?this.$route.query.storehouseGbCode:"",
          nowAdmin: this.$route.query.nowAdmin?this.$route.query.nowAdmin:"",
          newAdmin: this.$route.query.newAdmin?this.$route.query.newAdmin:"",
          pageSize: 10,
          pageNo: this.$route.query.pageNo?this.$route.query.pageNo:0
        },
        listData: [],
        storehouseList:'',//仓房下拉
      };
    },
    methods: {
      getList: function(pageNo) {
        //获取列表
        var vm = this;
        vm.postData.pageNo = pageNo;
        vm.postData.exchangeStartDate=$('#exchangeStartDate').val();
        vm.postData.exchangeEndDate=$('#exchangeEndDate').val();
        layer.load(2);
        transferList(vm.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.listData = ret.data.dataList;
              for(var i in vm.listData) {
                const registorTime = vm.listData[i].registorDate.slice(0,10)
                const exchangeTime = vm.listData[i].exchangeDate.slice(0,10)
                vm.listData[i].registorDate = registorTime
                vm.listData[i].exchangeDate = exchangeTime
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
      jumpEdit: function(id) {
        var vm = this;
        this.$router.push({
          name: "transferEdit",
          query: {
            id: id,
            storehouseGbCode: vm.postData.storehouseGbCode,
            nowAdmin: vm.postData.nowAdmin,
            newAdmin: vm.postData.newAdmin,
            pageNo: vm.postData.pageNo,
            exchangeStartDate: $('#exchangeStartDate').val(),
            exchangeEndDate: $('#exchangeEndDate').val()
          }
        });
      },
      jumpDetail: function(id) {
        var vm = this;
        this.$router.push({
          name: "transferDetail",
          query: {
          id: id,
          storehouseGbCode: vm.postData.storehouseGbCode,
          nowAdmin: vm.postData.nowAdmin,
          newAdmin: vm.postData.newAdmin,
          pageNo: vm.postData.pageNo,
          exchangeStartDate: document.getElementById("exchangeStartDate").value,
          exchangeEndDate: $('#exchangeEndDate').val()
          }
        });
      },
      getDropDown: function() {//获取下拉项
        var vm = this;
        storehouse('').then(ret => {//仓房
            if (ret.code == 200) {
              // console.log(JSON.stringify(ret))
              vm.storehouseList = ret.data.dataList;
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
        }).catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
        });
      }
    },
    mounted() {
      var vm = this;
      $('#exchangeStartDate').val(this.$route.query.exchangeStartDate);
      $('#exchangeEndDate').val(this.$route.query.exchangeEndDate);
      vm.getList(1);
      vm.getDropDown();
    }
  };
</script>
