<template>
  <div class="content">
    <div class="menuManage operationLog">
      <div class="lookup">
        操作时间：
        <input
          type="text"
          class="input-text Wdate"
          onclick="WdatePicker({dateFmt:'yyyy'})" id="startYear"
        >~
        <input
          type="text"
          class="input-text Wdate excision"
          onclick="WdatePicker({dateFmt:'yyyy'})" id="endYear"
        >
        粮食品种：
        <div class="grainVariety excision">
            <treeselect v-model="postData.grainKindId" :multiple="false" :options="grainVarietyList" />
        </div>
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
            <th style="width:5%;">
              <input type="checkbox" >
            </th>
            <th style="width:5%;">序号</th>
            <th style="width:10%;">年度</th>
            <th style="width:10%;">粮食品种</th>
            <th style="width:10%;">采购数量（千克）</th>
            <th style="width:10%;">采购金额（元）</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in listData">
            <td><input type="checkbox" ></td>
            <td v-if="sortOrder=='0'" v-text="i+1"></td>
            <td v-else v-text="listData.length-i"></td>
            <td v-text="item.year"></td>
            <td v-text="item.grainKind"></td>
            <td v-text="item.totalWeight"></td>
            <td v-text="item.totalMoney"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  // import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { grainVariety,  } from "@/api/systemManage/dropDown";
import { crkContrast } from "@/api/statisticalAnalysis.js"; 
export default {
  name: "inContast",
  components: { Treeselect },
  data() {
    return {
      sortOrder: "0", //0 顺序，1 倒序
      postData: {
        noticeType: 1,
        startYear: "",
        endYear: '',
        grainKindId: null
      },
      grainVarietyList: [],
      allChecked: false,
      delList: {
        billIdList: []
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
      crkContrast(vm.postData)
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
    getDropDown: function() {
      //获取下拉项
      var vm = this;
      grainVariety({})
        .then(ret => {
          //粮食品种
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret));
            vm.grainVarietyList = ret.data.grainVarietyList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
  },
  mounted() {
    this.getDropDown();
    this.getList();
  }
};
</script>

<style scoped>
</style>
