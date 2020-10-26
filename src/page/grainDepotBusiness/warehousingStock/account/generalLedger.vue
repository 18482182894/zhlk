<template>
    <div class="content">
        <div class="menuManage operationLog company">
            <div class="lookup">
                粮食品种：
                <div class="grainVariety excision">
                    <treeselect v-model="postData.grainKind" :multiple="false" :options="grainVarietyList" />
                </div>
                月份：
                <input type="text" class="input-text Wdate" onclick="WdatePicker({skin:'whyGreen',dateFmt:'yyyy-MM'})" id="startMonth">~
                <input type="text" class="input-text Wdate excision" onclick="WdatePicker({skin:'whyGreen',dateFmt:'yyyy-MM'})" id="endMonth">
                <div class="btn btn-add" @click="getList(1);">
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
                        <th style="width: 10%;">月份</th>
                        <th style="width: 10%;">粮食品种</th>
                        <th style="width: 10%;">粮食性质</th>
                        <th style="width: 7%;">期初库存(千克)</th>
                        <th style="width: 7%;">期末库存(千克)</th>
                        <th style="width: 8%;">本期入仓(千克)</th>
                        <th style="width: 8%;">本期出仓(千克)</th>
                        <th style="width: 10%;">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,i) in listData">
                        <td><input type="checkbox" ></td>
                        <td v-if="sortOrder=='0'" v-text="i+1"></td>
                        <td v-else v-text="listData.length-i"></td>
                        <td v-text="item.initialTimeMonth"></td>
                        <td v-text="item.grainKind"></td>
                        <td v-text="item.grainAttribute"></td>
                        <td v-text="item.initialStock"></td>
                        <td v-text="item.endStock"></td>
                        <td v-text="item.thisPeriodInput"></td>
                        <td v-text="item.thisPeriodOutput"></td>
                        <td>
                            <div class="table-btn btn-yellow" @click="jumpDetail(item.initialTimeMonth);">出入库明细</div>
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
  // import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import { generalLedgerList } from "@/api/business/warehousingStock/account";
  import { grainVariety } from "@/api/systemManage/dropDown";
  export default {
    name: "company",
    components: { Treeselect },
    data() {
      return {
        allChecked: false,
        sortOrder: "0", //0 顺序，1 倒序
        startMonth:this.$route.query.startMonth?this.$route.query.startMonth:"",
        endMonth:this.$route.query.endMonth?this.$route.query.endMonth:"",
        postData: {
          grainKind: this.$route.query.grainKind?this.$route.query.grainKind:null,
          startMonth:this.$route.query.startMonth?this.$route.query.startMonth:"",
          endMonth:this.$route.query.endMonth?this.$route.query.endMonth:"",
          pageSize: 10,
          pageNo: 0
        },
        listData: [],
        grainVarietyList:[],//粮食品种下拉
        editPopup: 0, // 控制菜单编辑弹出层的显影，1为显示
      };
    },
    methods: {
      getList: function(pageNo) {
        //获取列表
        var vm = this;
        vm.postData.pageNo = pageNo;
        layer.load(2);
        generalLedgerList(vm.postData)
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
      changeSortOrder: function() {
        var vm = this;
        vm.listData.reverse();
      },
      jumpDetail: function(month) {
        var vm = this;
        this.$router.push({
          name: "generalLedgerMX",
          query: {
            month: month,
            grainKind:vm.postData.grainKind,
            startMonth:document.getElementById("startMonth").value,
            endMonth:document.getElementById("endMonth").value,
            name:"generalLedger"
          }
        });
      },
      getDropDown: function() {//获取下拉项
        var vm = this;
        grainVariety({}).then(ret => {//粮食品种
            if (ret.code == 200) {
              // console.log(JSON.stringify(ret))
              vm.grainVarietyList = ret.data.grainVarietyList;
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
      document.getElementById("startMonth").value=this.$route.query.startMonth ? this.$route.query.startMonth : "";
      document.getElementById("endMonth").value=this.$route.query.endMonth ? this.$route.query.endMonth : "";
      vm.getList(1);
      vm.getDropDown();
    }
  };
</script>
