<template>
    <div class="content">
        <div class="menuManage operationLog company">
            <div class="lookup">
                盘点仓库：
                <select name="" class="select-style excision" v-model="postData.storehouseGbCode" @change="getWarehouse(postData.storehouseGbCode);">
                    <option value="">请选择</option>
                    <option v-for="item in storehouseList" :value="item.storehouseGbCode" v-text="item.storehouseName">
                    </option>
                </select>
                盘点廒间：
                <select name="" class="select-style excision" v-model="postData.warehouseGbCode">
                    <option value="">请选择</option>
                    <option v-for="item in granaryList" :value="item.storehouseGbCode" v-text="item.warehouseName">
                    </option>
                </select>
                盘点时间：
                <input type="text" class="input-text Wdate" onclick="WdatePicker({})" id="startTime">至
                <input type="text" class="input-text Wdate excision" onclick="WdatePicker({})" id="endTime">

                <div class="btn btn-add" @click="getList(1);">
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
                        <th style="width: 10%;">仓库</th>
                        <th style="width: 15%;">廒间</th>
                        <th style="width: 7%;">账面数量(千克)</th>
                        <th style="width: 7%;">实际数量(千克)</th>
                        <th style="width: 7%;">损溢数量(千克)</th>
                        <th style="width: 5%;">损溢率</th>
                        <th style="width: 8%;">盘点人</th>
                        <th style="width: 13%;">盘点时间</th>
                        <th style="width: 8%;">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,i) in listData">
                        <td><input type="checkbox" ></td>
                        <td v-if="sortOrder=='0'" v-text="i+1"></td>
                        <td v-else v-text="listData.length-i"></td>
                        <td v-text="item.storehouseName"></td>
                        <td v-text="item.warehouseName"></td>
                        <td v-text="item.accountsInventoryWeight"></td>
                        <td v-text="item.realInventoryWeight"></td>
                        <td v-text="item.lossOverflowNumber"></td>
                        <td v-text="item.lossOverflowRate"></td>
                        <td v-text="item.inventoryPerson"></td>
                        <td v-text="item.inventoryDate"></td>
                        <td>
                            <div class="table-btn btn-yellow" @click="jumpDetail(item.inventoryId);">详情</div>
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
  import { stockChecksList } from "@/api/business/warehousingStock/stockChecks";
  import { storehouse, granary } from "@/api/systemManage/dropDown";
  // import selectGrain from "../../../grainVaiety";
  export default {
    name: "company",
    // components:{selectGrain},
    data() {
      return {
        allChecked: false,
        sortOrder: "0", //0 顺序，1 倒序
        startTime: this.$route.query.startTime?this.$route.query.startTime:"",
        endTime: this.$route.query.endTime?this.$route.query.endTime:"",
        postData: {
          storehouseGbCode: this.$route.query.storehouseGbCode?this.$route.query.storehouseGbCode:"",
          warehouseGbCode: this.$route.query.warehouseGbCode?this.$route.query.warehouseGbCode:"",
          pageSize: 10,
          pageNo: this.$route.query.pageNo?this.$route.query.pageNo:0
        },
        listData: [],
        storehouseList:'',//仓房下拉
        granaryList:''//廒间
      };
    },
    methods: {
      getList: function(pageNo) {
        //获取列表
        var vm = this;
        vm.postData.pageNo = pageNo;
        vm.postData.startTime=$('#startTime').val();
        vm.postData.endTime=$('#endTime').val();
        layer.load(2);
        stockChecksList(vm.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.listData = ret.data.inventoryList;
              for(var i in vm.listData) {
                const time = vm.listData[i].inventoryDate.slice(0,10)
                vm.listData[i].inventoryDate = time
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
          name: "stockChecksEdit",
          query: {
            id: id,
            storehouseGbCode: vm.postData.storehouseGbCode,
            warehouseGbCode: vm.postData.warehouseGbCode,
            startTime: document.getElementById('startTime').value,
            endTime: document.getElementById('endTime').value,
            pageNo: vm.postData.pageNo
          }
        });
      },
      jumpDetail: function(id) {
        var vm = this;
        this.$router.push({
          name: "stockChecksDetail",
          query: {
            id: id,
            storehouseGbCode: vm.postData.storehouseGbCode,
            warehouseGbCode: vm.postData.warehouseGbCode,
            startTime: document.getElementById('startTime').value,
            endTime: document.getElementById('endTime').value,
            pageNo: vm.postData.pageNo
          }
        });
      },
      getWarehouse:function (id) {
        var vm = this;
        
        granary(id).then(ret => {//廒间
            if (ret.code == 200) {
              // console.log(JSON.stringify(ret))
              vm.granaryList = ret.data.dataList;
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
        }).catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
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
      $('#startTime').val(this.$route.query.startTime);
      $('#endTime').val(this.$route.query.endTime);
      vm.getList(1);
      vm.getDropDown();
    }
  };
</script>
