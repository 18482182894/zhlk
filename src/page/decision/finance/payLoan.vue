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
                <th style="width:5%;"><input type="checkbox" ></th>
                <th style="width:5%;">序号</th>
                <th style="width:10%;">申请单号</th>
                <th style="width:10%;">申请单类型</th>
                <th style="width:10%;">客户名称</th>
                <th style="width:10%;">执行数量</th>
                <th style="width:7.5%;">执行单价</th>
                <th style="width:10%;">未结算数量</th>
                <th style="width:7.5%;">未支付金额</th>
                <th style="width:10%;">已结算数量</th>
                <th style="width:7.5%;">已结算金额</th>
            </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in listData">
            <td><input type="checkbox" ></td>
            <td v-if="sortOrder=='0'" v-text="i+1"></td>
            <td v-else v-text="listData.length-i"></td>
            <td v-text="item.applyId"></td>
            <td v-text="item.formType"></td>
            <td v-text="item.customerName"></td>
            <td v-text="item.quantity"></td>
            <td v-text="item.grainPrice"></td>
            <td v-text="item.unSumWeight"></td>
            <td v-text="item.unSumMoney"></td>
            <td v-text="item.sumWeight"></td>
            <td v-text="item.sumMoney"></td>
          </tr>
        </tbody>
      </table>
      <!-- 分页容器 -->
      <div id="PageBar"></div>
    </div>
  </div>
</template>

<script>
import { goodsPay } from "@/api/statisticalAnalysis.js"; 
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
      goodsPay(vm.postData)
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

