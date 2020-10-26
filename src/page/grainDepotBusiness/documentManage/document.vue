<template>
  <div class="content">
    <div class="menuManage operationLog ">
      <div class="lookup">
        来文号：
        <input type="text" class="input-text excision" v-model="postData.documentId">
        来文名称：
        <input type="text" class="input-text excision " v-model="postData.fileName">

        <div class="btn btn-add" @click="getList(0);">
          <img src="../../../../static/images/search.png" alt="">
          <label>查找</label>
        </div>
      </div>
      <div>
        <div class="btn btn-add" @click="jumpEdit();">
          <img src="../../../../static/images/add.png" alt="">
          <label>新增</label>
        </div>
        <select name="" class="select-style" v-model="sortOrder" @change="changeSortOrder();">
          <option value="">排序方式</option>
          <option value="0">顺序</option>
          <option value="1">倒序</option>
        </select>
      </div>
      <table class="customTable">
        <thead>
          <tr>
            <th style="width:5%;"><input type="checkbox" v-model="allChecked" @change="checkAll();"></th>
            <th style="width:5%;">序号</th>
            <th style="width:10%;">来文号</th>
            <th style="width:15%;">文件编号</th>
            <th style="width:15%;">文件名称</th>
            <th style="width:10%;">发文日期</th>
            <th style="width:10%;">类型</th>
            <th style="width:30%;">操作</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="(item,i) in listData">
                <td><input type="checkbox" :value="item.documentId" v-model="delList.documentIdList" @change="clickChange();"></td>
                <td v-if="sortOrder=='0'" v-text="i+1"></td>
                <td v-else v-text="listData.length-i"></td>
            <td v-text="item.documentId"></td>
            <td v-text="item.fileId"></td>
            <td v-text="item.fileName"></td>
            <td v-text="item.releaseDate"></td>
            <td v-text="item.Type"></td>
            <td>
              <div class="table-btn btn-yellow" @click="jumpDetail(item.documentId);">详情</div>
              <div class="table-btn btn-green" @click="jumpEdit(item.documentId);" >编辑</div>
              <div class="table-btn btn-red" @click="delData(item.documentId);">删除</div>
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
import { getDocReviceList, deleDocRevice } from "@/api/business/docRevices";
export default {
  name: "document",
  data() {
    return {
      sortOrder: "0", //0 顺序，1 倒序
      postData: {
        pageSize: 10,
        pageNo: 0,
        fileName: this.$route.query.fileName,
        documentId: this.$route.query.documentId
      },
      grainVarietyList: "",
      grainOilLevelList: "",
      inventoryPropertyList: "",
      allChecked: false,
      delList: {
        documentIdList: []
      },
      listData: []
    };
  },
  methods: {
    changeSortOrder: function() {//倒序
      var vm = this;
      vm.listData.reverse();
    },
    getList: function(pageNo) {//获取列表
      var vm = this;
      vm.postData.pageNo = pageNo;
      layer.load(2);
      getDocReviceList(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.listData = ret.data.dataList;
            for(var i in vm.listData) {
              const releaseTime = vm.listData[i].releaseDate.slice(0,10)
              vm.listData[i].releaseDate = releaseTime
            }
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
    delData: function(id) {
      //删除
      var vm = this;
      if (id) {
        vm.delList.documentIdList = [];
        vm.delList.documentIdList.push(id);
      } else {
        if (vm.delList.documentIdList.length == []) {
          layer.msg("请至少选择一条数据！");
          return;
        }
      }
      layer.confirm('确定删除？', {
        btn: ['确定','取消'] //按钮
      }, function(){
        layer.load(2);
        var delStr = vm.delList.documentIdList.join(",");
        deleDocRevice({ documentIdList: delStr })
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
      }, function(){
      });
    },
    checkAll: function() {
      //全选
      var vm = this;
      if (vm.allChecked) {
        for (var i = 0; i < vm.listData.length; i++) {
          vm.delList.documentIdList.push(vm.listData[i].documentId);
        }
      } else {
        vm.delList.documentIdList = [];
      }
    },
    clickChange: function() {
      //监听input选中状态，控制全选input的选中
      var vm = this;
      if (vm.delList.documentIdList.length == vm.listData.length) {
        vm.allChecked = true;
      } else {
        vm.allChecked = false;
      }
    },
    jumpDetail: function(id,documentId,fileName,pageNo) {
      //跳转到详情
      var vm = this;
      this.$router.push({
        name: "documentDetail",
        query: {
          id: id,
          documentId:vm.postData.documentId,
          fileName:vm.postData.fileName,
          pageNo:vm.postData.pageNo
        }
      });
    },
    jumpEdit: function(id,fileName,documentId,pageNo) {
      //跳转到编辑或新增页面
      var vm = this;
      this.$router.push({
        name: "documentEdit",
        query: {
          id: id,
          fileName:vm.postData.fileName,
          documentId:vm.postData.documentId,
          pageNo:vm.postData.pageNo
        }
      });
    },
  },
  mounted() {
    this.getList(0);
  }
};

</script>
