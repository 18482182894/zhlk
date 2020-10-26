<template>
  <div class="content">
    <div class="menuManage operationLog ">
      <div class="lookup">
        仓房：
        <select class="select-style excision" v-model="postData.storehouseGbCode"  @change="getGranary(postData.storehouseGbCode);">
            <option value=''>请选择</option>
            <option :value="item.storehouseGbCode" v-for="item in storehouseList" v-text="item.storehouseName"></option>
        </select>
        廒间：
        <select class="select-style excision" v-model="postData.warehouseGbCode">
            <option value=''>请选择</option>
            <option :value="item.warehouseGbCode" v-for="item in granaryList" v-text="item.warehouseName"></option>
        </select>
          时间：
          <input type="text" class="input-text Wdate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" id="startTime">~
          <input type="text" class="input-text Wdate excision" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" id="endTime">

        <div class="btn btn-add" @click="getList(1);">
          <img src="../../../../static/images/search.png" alt="">
          <label>查找</label>
        </div>
      </div>
      <div>
        <div class="btn btn-add" @click="jumpAdd();">
          <img src="../../../../static/images/add.png" alt="">
          <label>新建</label>
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
            <th style="width:2.5%;"><input type="checkbox" ></th>
            <th style="width:2.5%;">序号</th>
            <th style="width:7.5%;">仓房</th>
            <th style="width:7.5%;">廒间</th>
            <th style="width:7.5%;">记电类型</th>
            <th style="width:7.5%;">用电项目</th>
            <th style="width:7.5%;">开始时间</th>
            <th style="width:7.5%;">结算时间</th>
            <th style="width:5%;">运行时间总长(h)</th>
            <th style="width:5%;">作业前电表数据</th>
            <th style="width:5%;">作业后电表数据</th>
            <th style="width:5%;">能耗合计(kW·h)</th>
            <th style="width:15%;">操作</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="(item,i) in listData">
                <td><input type="checkbox"></td>
                <td v-if="sortOrder=='0'" v-text="i+1"></td>
                <td v-else v-text="listData.length-i"></td>
                <td v-text="item.storehouseName"></td>
                <td v-text="item.warehouseName"></td>
                <td v-text="item.recordType"></td>
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
                <td>
                        <div class="table-btn btn-yellow" @click="jumpDetail(item.id);">详情</div>
                        <div class="table-btn btn-submit" v-if="item.startDatetime == item.endDatetime" @click="finish(item.id,item.afterJobMeterData);">完成</div>
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
</style>
<script>
import { electricList, electricFinish} from "@/api/energyConsumption/public";
import { graindepot, storehouse, granary, cargo} from "@/api/systemManage/dropDown";

export default {
  name: "document",
  data() {
    return {
      sortOrder: "0", //0 顺序，1 倒序
      postData: {
        storehouseGbCode:'',
        warehouseGbCode:'',
        startTime: "",
        endTime:'',
        pageSize: 10,
        pageNo: 0
      },
      listData: [],
      storehouseList:[],//仓房下拉列表
      granaryList:[],//廒间下拉列表
    };
  },
  methods: {
    changeSortOrder: function() {//倒序
      var vm = this;
      vm.listData.reverse();
    },
    getList: function(pageNo) {
      //获取列表
      var vm = this;
      vm.postData.pageNo=pageNo;
      vm.postData.startTime=$('#startTime').val();
      vm.postData.endTime=$('#endTime').val();
      layer.load(2);
      electricList(vm.postData)
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
    finish:function (id,data) {//完成
        var vm = this;
        electricFinish({id:id,afterJobMeterData:data})
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("电能采集完成！");
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
        name: "consumeEnergy_electricDetail",
        query: {
          id: id
        }
      });
    },
    jumpAdd:function () {
      //跳转到新增
      var vm = this;
      this.$router.push({
        name: "consumeEnergy_electricEdit"
      });

    },
    getDropDown: function() {//获取下拉项
      var vm = this;

      storehouse()
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            console.log(ret)
            vm.storehouseList = ret.data.dataList;
          } else {
            if (ret.code == 500&&ret.data=='查询错误，没有数据') {
                vm.storehouseList=[];
            }else{
                layer.alert(ret.data, { closeBtn: 0 });
            }
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getGranary:function (id) {//廒间下拉列表
      var vm = this;
      layer.load(2);
      granary(id).then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.granaryList = ret.data.dataList;
          } else {
            if (ret.code == 500&&ret.data=='查询错误，没有数据') {
                vm.granaryList=[];
            }else{
                layer.alert(ret.data, { closeBtn: 0 });
            }
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
  },
  mounted() {
        var vm = this;
        vm.getList(1);
        vm.getDropDown();
  }
};

</script>
