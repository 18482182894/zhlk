<template>
  <div class="content">
    <div class="videoRetrieval">
      <div>

      </div>
      <div class="lookup">
        仓房：
        <select class="select-style excision" v-model="postData.storehouseGbCode">
          <option value="">请选择</option>
          <option
            v-for="item in storehouseList"
            :key="item.storehouseGbCode"
            :value="item.storehouseGbCode"
            v-text="item.storehouseName"/>
        </select>
        廒间：
        <select class="select-style excision" v-model="postData.warehouseGbCode">
          <option value="">请选择</option>
          <option
            v-for="item in granaryList"
            :key="item.warehouseGbCode"
            :value="item.warehouseGbCode"
            v-text="item.warehouseName"/>
        </select>
        <div class="btn btn-add" @click="getList(1);">
          <img src="../../../../../static/images/search.png" alt="">
          <label>查找</label>
        </div>
      </div>
      <div>
        <select name="" class="select-style" v-model="sortOrder" @change="changeSortOrder();">
          <option value="">排序方式</option>
          <option value="0">顺序</option>
          <option value="1">倒序</option>
        </select>
      </div>
      <table class="customTable">
        <thead>
        <tr>
          <th style="width:5%;"><input type="checkbox"></th>
          <th style="width:5%;">序号</th>
          <th style="width:10%;">仓房</th>
          <th style="width:10%;">廒间</th>
          <th style="width:10%;">质检类型</th>
          <th style="width:10%;">粮食品种</th>
          <th style="width:10%;">粮食等级</th>
          <th style="width:10%;">收获年度</th>
          <th style="width:10%;">扦样时间</th>
          <th style="width:10%;">质检时间</th>
          <th style="width:15%;">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,i) in listData">
          <td><input type="checkbox"/></td>
          <td v-if="sortOrder=='0'" v-text="i+1"></td>
          <td v-else v-text="listData.length-i"></td>
          <td v-text="item.storehouseName"></td>
          <td v-text="item.warehouseName"></td>
          <td v-text="item.testType"></td>
          <td v-text="item.grainKind"></td>
          <td v-text="item.grainLevel"></td>
          <td v-text="item.collectionYear"></td>
          <td v-text="item.sampleDateTime"></td>
          <td v-text="item.checkDateTime"></td>
          <td>
            <div class="table-btn btn-yellow" @click="jumpDetail(item)">详情</div>
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
  .IOTType-popup {
    width: 600px;
    height: 400px;
  }

  .popup-content p input {
    width: 420px;
  }

  .popup-content .text-justify label {
    display: inline-block;
    vertical-align: middle;
    font-size: .875rem;
    text-align: center;
    text-align-last: initial;
  }

  .text-justify div {
    display: inline-block;
    width: 440px;
  }

  .text-justify div .select-style {
    width: 90px;
  }
</style>
<script>
  import {fetchApplyRecordList} from "@/api/intelligentWarehous/qualityTest";
  import {storehouse, granary} from "@/api/systemManage/dropDown";

  export default {
    name: "document",
    data() {
      return {
        sortOrder: "0", //0 顺序，1 倒序
        postData: {
          storehouseGbCode:this.$route.query.storehouseGbCode,
          warehouseGbCode:this.$route.query.warehouseGbCode,
          pageSize: 10,
          pageNo:this.$route.query.pageNo!=null?this.$route.query.pageNo:1,
          originalPageName:this.$route.query.originalPageName!=null?this.$route.query.originalPageName:'management',
        },
        listData: [],
        storehouseList: [],//仓房下拉列表
        granaryList: [],//廒间下拉列表
      };
    },
    methods: {
      changeSortOrder: function () {//倒序
        var vm = this;
        vm.listData.reverse();
      },
      getList(pageNo) {//获取列表
        var vm = this;
        vm.postData.pageNo = pageNo;
        layer.load(2);
        fetchApplyRecordList(vm.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.listData = ret.data.dataList;
              vm.listData.forEach(function(item){
                if(item.collectionYear == 'null') {
                  item.collectionYear = ''
                }
              })
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
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      jumpDetail({qualityBillId}) {
        this.$router.push({
          name: "managementDetail",
          query: {
            qualityBillId:qualityBillId,
            storehouseGbCode:this.postData.storehouseGbCode,
            warehouseGbCode:this.postData.warehouseGbCode,
            pageSize: 10,
            pageNo:this.postData.pageNo,
            originalPageName:this.postData.originalPageName
          }
        });
      },
      getStorehouse() { // 获取仓房列表
        storehouse('')
          .then((ret) => {
            if (ret.code == 200) {
              this.storehouseList = ret.data.dataList;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      getGranary(code) { // 获取廒间列表
        granary(code)
          .then((ret) => {
            if (ret.code == 200) {
              this.granaryList = ret.data.dataList;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
    },
    watch: {
      'postData.storehouseGbCode'(newCode, oldCode) { // 监听仓房变化获取廒间列表
        if (newCode && newCode !== oldCode) {
          this.granaryList = [];
          this.postData.warehouseGbCode = '';
          this.getGranary(newCode);
        }
      }
    },
    mounted() {
      this.getStorehouse();
      this.getList(this.postData.pageNo);
      if(this.postData.warehouseGbCode){
        this.getGranary(this.postData.storehouseGbCode);
      }
    }
  };

</script>
