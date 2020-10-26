<template>
  <div class="content">
    <div class="videoRetrieval">
      <div>

      </div>
      <div class="lookup">
        粮食品种：
        <div class="grainVariety excision">
          <treeselect v-model="postData.grainKind" :multiple="false" :options="grainVarietyList" placeholder="请选择粮食品种"/>
        </div>
        库存性质：
        <select class="select-style excision" v-model="postData.grainProperties">
          <option value="">请选择</option>
          <option
            v-for="item in grainPropertyList"
            :key="item.dicInfoCode"
            :value="item.dicInfoCode"
            v-text="item.dicInfoValue"/>
        </select>
        <div class="btn btn-add" @click="getList(1)">
          <img src="../../../../../static/images/search.png" alt="">
          <label>查找</label>
        </div>
      </div>
      <div>
        <!--<div class="btn btn-add" @click="jumpEdit();">
          <img src="../../../../../static/images/add.png" alt="">
          <label>新增</label>
        </div>-->
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
          <th style="width:10%;">库存性质</th>
          <th style="width:10%;">粮食品种</th>
          <th style="width:5%;">宜存率</th>
          <th style="width:5%;">收获年度</th>
          <th style="width:10%;">时间</th>
          <th style="width:20%;">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,i) in listData">
          <td><input type="checkbox"></td>
          <td v-if="sortOrder=='0'" v-text="i+1"></td>
          <td v-else v-text="listData.length-i"></td>
          <td v-text="item.storehouseName"></td>
          <td v-text="item.warehouseName"></td>
          <td v-text="item.grainPropertiesValue"></td>
          <td v-text="item.grainKindValue"></td>
          <td v-text="item.survivalRate"></td>
          <td v-text="item.collectionYear"></td>
          <td v-text="item.accountDate"></td>
          <td>
            <div class="table-btn btn-yellow" @click="jumpDetail(item)">详情</div>
           <!-- <div class="table-btn btn-green" @click="jumpEdit(item)">编辑</div>
            <div class="table-btn btn-red" @click="delData(item.qualityAccountId)">删除</div>-->
          </td>
        </tr>
        </tbody>
      </table>
      <!-- 分页容器 -->
      <div id="PageBar"></div>
      <!-- <div class="edit-btn">
        <button class="edit-submit" @click="$router.back()">返回</button>
      </div>-->
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
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import {fetchLedgerList} from "@/api/intelligentWarehous/qualityTest";
  import {grainNature, grainVariety} from "@/api/systemManage/dropDown";

  export default {
    name: "document",
    components: {
      Treeselect
    },
    data() {
      return {
        sortOrder: '0',
        postData: {
          grainKind:this.$route.query.grainKind,
          grainProperties: this.$route.query.grainProperties,
          pageSize: 10,
          pageNo: this.$route.query.pageNo!=null?this.$route.query.pageNo:1,
        },
        listData: [],
        grainVarietyList: [],
        grainPropertyList: [],
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
        fetchLedgerList(vm.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.listData = ret.data.accounList;
              for(var i in vm.listData) {
                vm.listData[i].accountDate = vm.listData[i].accountDate.slice(0,10)
              }
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
      jumpDetail: function ({qualityAccountId, grainKindValue, grainPropertiesValue}) {
        //跳转到详情
        var vm = this;
        this.$router.push({
          name: "qualityTestingLDetail",
          query: {
            qualityAccountId: qualityAccountId,
            grainKindValue:grainKindValue,
            grainPropertiesValue:grainPropertiesValue,
            grainKind:this.postData.grainKind,
            grainProperties: this.postData.grainProperties,
            pageSize: 10,
            pageNo: this.postData.pageNo,
          }
        });
      },
      jumpEdit: function ({qualityAccountId, grainKindValue}) {
        //跳转到编辑或新增页面
        var vm = this;
        this.$router.push({
          name: "qualityTestingLedgerEdit",
          query: {qualityAccountId, grainKind: grainKindValue}
        });
      },
      delData(id){
        layer.load(2);
        removeLedger(id)
          .then((ret) => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              this.detail = ret.data;
              layer.alert('删除成功', {closeBtn: 0});
              this.getList(this.postData.pageNo);
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch((err) => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          })
      },
      getGrainVariety() { //获取粮食品种
        grainVariety({})
          .then(ret => {//粮食品种
            if (ret.code == 200) {
              this.grainVarietyList = ret.data.grainVarietyList;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          }).catch(err => {
          layer.alert(err.message, {closeBtn: 0});
        });
      },
      getGrainProperty() { //获取库存性质
        grainNature({})
          .then(ret => {
            if (ret.code == 200) {
              this.grainPropertyList = ret.data.dataList;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          }).catch(err => {
          layer.alert(err.message, {closeBtn: 0});
        });
      },
    },
    mounted() {
      this.getList(this.postData.pageNo);
      if(this.postData.warehouseGbCode){
        this.getGranary(this.postData.storehouseGbCode);
      }
      this.getGrainVariety();
      this.getGrainProperty();
    }
  };

</script>
