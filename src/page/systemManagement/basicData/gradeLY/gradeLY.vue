<template>
    <div class="content">
        <div class="menuManage operationLog libraryType">
            <div>
                <div class="btn btn-add">
                    <img src="../../../../../static/images/search.png" alt="">
                    <label>查找</label>
                </div>
            </div>
            <div class="lookup">
                等  &nbsp; &nbsp; &nbsp;  级：
                <select name="" class="select-style excision" v-model="postData.grainOilLevelId">
                    <option v-for="item in grainOilLevelList" :value="item.grainOilLevelId" v-text="item.grainOilLevelValue"></option>
                </select>
            </div>
            <div>
                <div class="btn btn-add" @click="jumpEdit();">
                    <img src="../../../../../static/images/add.png" alt="">
                    <label>新增</label>
                </div>
                <div class="btn btn-del" @click="delData();">
                    <img src="../../../../../static/images/del.png" alt="">
                    <label>删除</label>
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
                        <th><input type="checkbox" v-model="allChecked" @change="checkAll();"></th>
                        <th>序号</th>
                        <th>粮油等级</th>
                        <th>备注</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,i) in listData">
                        <td><input type="checkbox" :value="item.grainOilLevelId" v-model="delList.grainOilLevelIdList" @change="clickChange();"></td>
                        <td v-if="sortOrder=='0'" v-text="i+1"></td>
                        <td v-else v-text="listData.length-i"></td>
                        <td v-text="item.grainOilLevelValue"></td>
                        <td v-text="item.memo"></td>
                        <td>
                            <div class="table-btn btn-yellow" @click="jumpDetail(item.grainOilLevelId);">详情</div>
                            <div class="table-btn btn-green" @click="jumpEdit(item.grainOilLevelId);">编辑</div>
                            <div class="table-btn btn-red" @click="delData(item.grainOilLevelId);">删除</div>
                        </td>
                    </tr>
                </tbody>
            </table>           
        </div>
    </div>
</template>

<script>
import { gradeLYList, gradeLYDel } from "@/api/systemManage/basicData/gradeLY";
export default {
  name: "gradeLY",
  data() {
    return {
      postData: {
        grainOilLevelId: ""
      },
      allChecked: false,
      sortOrder: "0", //0 顺序，1 倒序
      grainOilLevelList: "",
      delList: {
        grainOilLevelIdList: []
      },
      listData: []
    };
  },
  methods: {
    getList: function() {
      //获取列表
      var vm = this;
      layer.load(2);
      gradeLYList({})
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
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    changeSortOrder: function() {
      var vm = this;
      vm.listData.reverse();
    },
    delData: function(id) {
      //删除
      var vm = this;
      if (id) {
        vm.delList.grainOilLevelIdList = [];
        vm.delList.grainOilLevelIdList.push(id);
      } else {
        if (vm.delList.grainOilLevelIdList.length == []) {
          layer.msg("请至少选择一条数据！");
          return;
        } else {
          if (vm.delList.grainOilLevelIdList.length > 1) {
            layer.msg("只能选择一条数据！");
            return;
          }
        }
      }

      layer.confirm('确定删除？', {
        btn: ['确定','取消'] //按钮
      }, function(){
      layer.load(2);
      gradeLYDel(vm.delList)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            layer.msg("删除成功！");
            vm.getList();
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
      grainOilLevel({})
        .then(ret => {
          //粮油等级
          if (ret.code == 200) {
            vm.grainOilLevelList = ret.data.dataList;
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
          vm.delList.grainOilLevelIdList.push(vm.listData[i].grainOilLevelId);
        }
      } else {
        vm.delList.grainOilLevelIdList = [];
      }
    },
    clickChange: function() {
      //监听input选中状态，控制全选input的选中
      var vm = this;
      if (vm.delList.grainOilLevelIdList.length == vm.listData.length) {
        vm.allChecked = true;
      } else {
        vm.allChecked = false;
      }
    },
    jumpEdit: function(id) {
      var vm = this;
      this.$router.push({
        name: "gradeLYEdit",
        query: {
          id: id
        }
      });
    },
    jumpDetail: function(id) {
      var vm = this;
      this.$router.push({
        name: "gradeLYDetail",
        query: {
          id: id
        }
      });
    }
  },
  mounted() {
    var vm = this;
    vm.getList();
    vm.getDropDown();
  }
};
</script>
