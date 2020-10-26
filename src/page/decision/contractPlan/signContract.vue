<template>
  <div class="content">
    <div class="menuManage operationLog">
      <div class="lookup">
        操作时间：
        <input type="text" class="input-text Wdate" onclick="WdatePicker()" id="startYear">~
        <input type="text" class="input-text Wdate excision" onclick="WdatePicker()" id="endYear">
        合同名称：
        <input type="text" class="input-text excision" v-model="postData.contractTitle">
        <div class="btn btn-add" @click="getList();">
          <img src="../../../../static/images/search.png" alt>
          <label>查找</label>
        </div>
      </div>
      <select name class="select-style" v-model="sortOrder" @change="changeSortOrder();">
        <option value>排序方式</option>
        <option value="0">顺序</option>
        <option value="1">倒序</option>
      </select>
      <table class="customTable">
        <thead>
          <tr>
            <th style="width:2.5%;">
              <input type="checkbox" >
            </th>
            <th style="width:2.5%;">序号</th>
            <th style="width:10%;">合同名称</th>
            <th style="width:10%;">合同类型</th>
            <th style="width:10%;">合同开始时间</th>
            <th style="width:10%;">合同结束时间</th>
            <th style="width:7.5%;">完成进度</th>
            <th style="width:10%;">合同执行数量</th>
            <th style="width:7.5%;">合同已完成数量</th>
            <th style="width:10%;">合同未完成数量</th>
            <th style="width:7.5%;">未结算数量</th>
            <th style="width:7.5%;">已结算数量</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in listData">
            <td><input type="checkbox" ></td>
            <td v-if="sortOrder=='0'" v-text="i+1"></td>
            <td v-else v-text="listData.length-i"></td>
            <td v-text="item.contractTitle"></td>
            <td v-text="item.contractTypeValue"></td>
            <td v-text="item.enableDate"></td>
            <td v-text="item.disableDate"></td>
            <td v-text="item.progress"></td>
            <td v-text="item.grainQuantity"></td>
            <td v-text="item.finishedQuantity"></td>
            <td v-text="item.unfinishedQuantity"></td>
            <td v-text="item.unsumWeight"></td>
            <td v-text="item.sumWeight"></td>
          </tr>
        </tbody>
      </table>
      <!-- 分页容器 -->
      <div id="PageBar"></div>
    </div>
  </div>
</template>

<script>
import { contractSigning } from "@/api/statisticalAnalysis.js"; 
export default {
  name: "signContract",
  data() {
    return {
      sortOrder: "0", //0 顺序，1 倒序
      postData: {
        contractTitle: "",
        startYear: "",
        endYear: '',
      },
      listData: [],
    };
  },
  methods: {
    changeSortOrder: function() {
      //倒序
      var vm = this;
      vm.listData.reverse();
    },
    getList: function() {
      //获取列表
      var vm = this;
      vm.postData.startYear=$('#startYear').val();
      vm.postData.endYear=$('#endYear').val();
      layer.load(2);
      contractSigning(vm.postData)
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
          layer.alert(err.data, { closeBtn: 0 });
        });
    },
  },
  mounted() {
    this.getList();
  }
};
</script>

