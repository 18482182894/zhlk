<template>
    <div class="content">
        <div class="menuManage operationLog">
            <div class="lookup">
                品  &nbsp; &nbsp; &nbsp;  种：
                <div class="grainVariety excision">
                    <treeselect v-model="postData.grainVarietyId" :multiple="false" :options="grainVarietyList" />
                </div>
                粮食性质：
                <select name="" class="select-style excision" v-model="postData.inventoryPropertyId">
                    <option value="">请选择</option>
                    <option v-for="item in inventoryPropertyList" :value="item.dicInfoCode" v-text="item.dicInfoValue"></option>
                </select>

              <div style="display: inline-block">
                <div class="btn btn-add" @click="getList(0)">
                  <img src="../../../../static/images/search.png" alt="">
                  <label>查找</label>
                </div>
              </div>
            </div>
            <div>
                <div class="btn btn-add" @click="jumpEdit();">
                    <img src="../../../../static/images/add.png" alt="">
                    <label>新增</label>
                </div>
                <div class="btn btn-del" @click="delData();">
                    <img src="../../../../static/images/del.png" alt="">
                    <label>删除</label>
                </div>
            </div>
            <table class="customTable">
                <thead>
                    <tr>
                        <th style="width:2.5%;"><input type="checkbox" v-model="allChecked" @change="checkAll();"></th>
                        <th style="width:2.5%;">序号</th>
                        <th style="width: 10%;">粮食品种</th>
                        <th style="width: 7.5%;">粮食性质</th>
                        <th style="width: 10%;">指标分类</th>
                        <th style="width: 7.5%;">指标项</th>
                        <th style="width: 5%;">上限</th>
                        <th style="width: 5%;">下限</th>
                        <th style="width: 5%;">等级</th>
                        <th style="width: 10%;">备注</th>
                        <th style="width: 30%;">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,i) in listData">
                        <td><input type="checkbox" :value="item.testStandardId" v-model="delList.testStandardIds" @change="clickChange();"></td>
                        <td v-text="i+1"></td>
                        <td v-text="item.grainVarietyName"></td>
                        <td v-text="item.inventoryPropertyValue"></td>
                        <td v-text="item.indicatorType"></td>
                        <td v-text="item.indicatorName"></td>
                        <td v-text="item.upperLimitValue"></td>
                        <td v-text="item.lowerLimitValue"></td>
                        <td v-text="item.grainLevelValue"></td>
                        <td v-text="item.memo"></td>
                        <td>
                            <div class="table-btn btn-yellow" @click="jumpDetail(item.testStandardId);">详情</div>
                            <div class="table-btn btn-green" @click="jumpEdit(item.testStandardId);">编辑</div>
                            <div class="table-btn btn-red" @click="delData(item.testStandardId);">删除</div>
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

import {
  testSetupList,
  testSetupDel
} from "@/api/systemManage/basicData/testSetup";
import { grainVariety, inventoryProperty , grainNature} from "@/api/systemManage/dropDown";
export default {
  name: "testSetup",
  components: { Treeselect },
  data() {
    return {
      postData: {
        grainVarietyId: this.$route.query.grainVarietyId,
        inventoryPropertyId: this.$route.query.inventoryPropertyId,
        pageSize: 10,
        pageNo: 0
      },
      allChecked: false,
      delList: {
        testStandardIds: []
      },
      listData: [],
      grainVarietyList: [],
      inventoryPropertyList: [],
      options:[]
    };
  },
  methods: {
    getList: function(pageNo) {
      //获取列表
      var vm = this;
      vm.postData.pageNo = pageNo;
      layer.load(2);
      testSetupList(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.listData = ret.data.testStandardList;
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
          } else {
            if (ret.code == "500" && ret.data == "没有数据") {
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
    delData: function(id) {
      //删除
      var vm = this;
      if (id) {
        vm.delList.testStandardIds = [];
        vm.delList.testStandardIds.push(id);
      } else {
        if (vm.delList.testStandardIds.length == []) {
          layer.msg("请至少选择一条数据！");
          return;
        }
      }
      layer.confirm('确定删除？', {
        btn: ['确定','取消'] //按钮
      }, function(){
      layer.load(2);
      var delstr = vm.delList.testStandardIds.join(",");
      testSetupDel({ testStandardIds: delstr })
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            layer.msg("删除成功！");
            vm.postData.pageNo = 0;
            vm.getList(0);
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
      });
    },
    getDropDown: function() {
      //获取下拉项
      var vm = this;
      grainVariety({})
        .then(ret => {
          //粮食品种
          if (ret.code == 200) {
            vm.grainVarietyList = ret.data.grainVarietyList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
      grainNature({})
        .then(ret => {
          //库存性质
          if (ret.code == 200) {
            vm.inventoryPropertyList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    checkAll: function() {
      //全选
      var vm = this;
      if (vm.allChecked) {
        for (var i = 0; i < vm.listData.length; i++) {
          vm.delList.testStandardIds.push(vm.listData[i].testStandardId);
        }
      } else {
        vm.delList.testStandardIds = [];
      }
    },
    clickChange: function() {
      //监听input选中状态，控制全选input的选中
      var vm = this;
      if (vm.delList.testStandardIds.length == vm.listData.length) {
        vm.allChecked = true;
      } else {
        vm.allChecked = false;
      }
    },
    jumpDetail: function(id,grainVarietyId,inventoryPropertyId,pageNo) {
      var vm = this;
      this.$router.push({
        name: "testSetupDetail",
        query: {
          id: id,
          grainVarietyId:vm.postData.grainVarietyId,
          inventoryPropertyId:vm.postData.inventoryPropertyId,
          pageNo:vm.postData.pageNo
        }
      });
    },
    jumpEdit: function(id,grainVarietyId,inventoryPropertyId,pageNo) {
      var vm = this;
      this.$router.push({
        name: "testSetupEdit",
        query: {
          id: id,
          grainVarietyId:vm.postData.grainVarietyId,
          inventoryPropertyId:vm.postData.inventoryPropertyId,
          pageNo:vm.postData.pageNo
        }
      });
    }
  },
  mounted() {
    var vm = this;
    vm.getList(0);
    vm.getDropDown();
  }
};
</script>
