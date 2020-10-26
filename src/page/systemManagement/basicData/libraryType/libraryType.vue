<template>
    <div class="content">
        <div class="menuManage operationLog libraryType">
            <div class="lookup">
                类型名称：
                <input type="text" class="input-text excision" v-model="postData.grainDepotTypeName">

                <div class="btn btn-add" @click="getList(0);">
                    <img src="../../../../../static/images/search.png" alt="">
                    <label>查找</label>
                </div>
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
                        <th>类型名称</th>
                        <th>备注</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,i) in listData">
                        <td><input type="checkbox" :value="item.grainDepotTypeId" v-model="delList.grainDepotTypeIdList" @change="clickChange();"></td>
                        <td v-if="sortOrder=='0'" v-text="i+1"></td>
                        <td v-else v-text="listData.length-i"></td>
                        <td v-text="item.grainDepotTypeName"></td>
                        <td v-text="item.memo"></td>
                        <td>
                            <div class="table-btn btn-yellow" @click="jumpDetail(item.grainDepotTypeId);">详情</div>
                            <div class="table-btn btn-green" @click="jumpEdit(item.grainDepotTypeId);">编辑</div>
                            <div class="table-btn btn-red" @click="delData(item.grainDepotTypeId);">删除</div>
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
  libraryTypeList,
  libraryTypeDel
} from "@/api/systemManage/basicData/libraryType";
export default {
  name: "libraryType",
  data() {
    return {
      postData: {
        grainDepotTypeName:this.$route.query.grainDepotTypeName?this.$route.query.grainDepotTypeName:"",
        pageSize: 10,
        pageNo: this.$route.query.pageNo?this.$route.query.pageNo:0
      },
      allChecked: false,
      sortOrder: "0", //0 顺序，1 倒序
      delList: {
        grainDepotTypeIdList: []
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
      libraryTypeList(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.listData = ret.data.grainDepotTypeList;
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
          }  else {
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
        vm.delList.grainDepotTypeIdList = [];
        vm.delList.grainDepotTypeIdList.push(id);
      } else {
        if (vm.delList.grainDepotTypeIdList.length == []) {
          layer.msg("请至少选择一条数据！");
          return;
        }
      }
      layer.confirm('确定删除？', {
        btn: ['确定','取消'] //按钮
      }, function(){
      layer.load(2);
      var delstr = vm.delList.grainDepotTypeIdList.join(",");
      libraryTypeDel({ grainDepotTypeIdList: delstr })
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
    checkAll: function() {
      //全选
      var vm = this;
      if (vm.allChecked) {
        for (var i = 0; i < vm.listData.length; i++) {
          vm.delList.grainDepotTypeIdList.push(vm.listData[i].grainDepotTypeId);
        }
      } else {
        vm.delList.grainDepotTypeIdList = [];
      }
    },
    clickChange: function() {
      //监听input选中状态，控制全选input的选中
      var vm = this;
      if (vm.delList.grainDepotTypeIdList.length == vm.listData.length) {
        vm.allChecked = true;
      } else {
        vm.allChecked = false;
      }
    },
    jumpEdit: function(id) {
      var vm = this;
      this.$router.push({
        name: "libraryTypeEdit",
        query: {
          id: id,
          //下面新增
          grainDepotTypeName:vm.postData.grainDepotTypeName,
          pageNo:vm.postData.pageNo
        }
      });
    },
    jumpDetail: function(id) {
      var vm = this;
      this.$router.push({
        name: "libraryTypeDetail",
        query: {
          id: id,
          //下面新增
          grainDepotTypeName:vm.postData.grainDepotTypeName,
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
    vm.getList(vm.postData.pageNo);
  }
};
</script>
