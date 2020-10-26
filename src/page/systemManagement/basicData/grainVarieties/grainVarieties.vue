<template>
    <div class="content">
        <div class="menuManage operationLog libraryType">
            <div class="lookup">
                粮食品种：
                <input type="text" class="input-text excision" v-model="postData.grainVarietyName">
                <div class="btn btn-add" @click="getList(0);">
                    <img src="../../../../../static/images/search.png" alt="">
                    <label>查找</label>
                </div>
            </div>
            <div>
                <div class="btn btn-add" @click="jumpEdit('add','');">
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
                    <option value="0">正序</option>
                    <option value="1">倒序</option>
                </select>
            </div>
            <table class="customTable">
                <thead>
                    <tr>
                        <th><input type="checkbox" v-model="allChecked" @change="checkAll();"></th>
                        <th>序号</th>
                        <th>粮食品种</th>
                        <th>备注</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,i) in listData">
                        <td><input type="checkbox" :value="item.grainVarietyId" v-model="delList.grainVarietyIdList" @change="clickChange();"></td>
                        <td v-if="sortOrder=='0'" v-text="i+1"></td>
                        <td v-else v-text="listData.length-i"></td>
                        <td v-text="item.grainVarietyName"></td>
                        <td v-text="item.memo"></td>
                        <td>
                            <div class="table-btn btn-yellow" @click="jumpDetail(item.grainVarietyId);">详情</div>
                            <div class="table-btn btn-green" @click="jumpEdit('edit',item.grainVarietyId);">编辑</div>
                            <div class="table-btn btn-red" @click="delData(item.grainVarietyId);">删除</div>
                            <div class="table-btn btn-blue" @click="jumpNext(item.grainVarietyId);">下一级</div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- 分页容器 -->
            <div id="PageBar"></div>
          <div class="detail-back">
            <button @click="detailBack()">返回</button>
          </div>
        </div>
    </div>
</template>

<script>
import {
  grainList,
  grainDel
} from "@/api/systemManage/basicData/grainVarieties";
export default {
  name: "grainVarieties",
  data() {
    return {
      postData: {
        grainVarietyName: this.$route.query.grainVarietyName,
        pageSize: 10,
        pageNo: 1
      },
      allChecked: false,
      sortOrder: "0", //0 顺序，1 倒序
      delList: {
        grainVarietyIdList: []
      },
      listData: []
    };
  },
  methods: {
    getList: function(pageNo) {
      //获取列表
      var vm = this;
      vm.postData.pageNo = pageNo;
      layer.load(2);
      grainList(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.listData = ret.data.grainVarietyList;
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
        vm.delList.grainVarietyIdList = [];
        vm.delList.grainVarietyIdList.push(id);
      } else {
        if (vm.delList.grainVarietyIdList.length == []) {
          layer.msg("请至少选择一条数据！");
          return;
        }
      }
      layer.confirm('确定删除？', {
        btn: ['确定','取消'] //按钮
      }, function(){
        layer.load(2);
        var delStr = vm.delList.grainVarietyIdList.join(",");
        grainDel({ grainVarietyIdList: delStr })
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("删除成功！");
              vm.delList.grainVarietyIdList = [];
              vm.getList(1);
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          })
          .catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
          });
        });
    },
    checkAll: function() {
      //全选
      var vm = this;
      if (vm.allChecked) {
        for (var i = 0; i < vm.listData.length; i++) {
          vm.delList.grainVarietyIdList.push(vm.listData[i].grainVarietyId);
        }
      } else {
        vm.delList.grainVarietyIdList = [];
      }
    },
    clickChange: function() {
      //监听input选中状态，控制全选input的选中
      var vm = this;
      if (vm.delList.grainVarietyIdList.length == vm.listData.length) {
        vm.allChecked = true;
      } else {
        vm.allChecked = false;
      }
    },
    jumpEdit: function(type, id,grainVarietyName) {
      var vm = this;
      this.$router.push({
        name: "grainVarietiesEdit",
        query: {
          id: id,
          type: type,
          grainVarietyName:vm.postData.grainVarietyName,
          pageNo:vm.postData.pageNo
        }
      });
    },
    jumpDetail: function(id,grainVarietyName) {
      var vm = this;
      this.$router.push({
        name: "grainVarietiesDetail",
        query: {
          id: id,
          grainVarietyName:vm.postData.grainVarietyName,
          pageNo:vm.postData.pageNo
        }
      });
    },
    jumpNext: function(id,grainVarietyName) {
      var vm = this;
      this.$router.push({
        name: "grainVarietiesNext",
        query: {
          id: id,
          grainVarietyName:vm.postData.grainVarietyName,
          pageNo:vm.postData.pageNo
        }
      });
    },
    detailBack: function() {
      this.$router.push({
        name: "basicDataMain"
      });
    }
  },
  mounted() {
    var vm = this;
    vm.getList(1);
  }
};
</script>
