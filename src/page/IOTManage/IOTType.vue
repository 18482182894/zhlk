<template>
  <div class="content">
    <div class="videoRetrieval">
      <div class="lookup">
        设备编号：
        <input type="text" class="input-text excision" v-model="postData.deviceId">
        设备名称：
        <input type="text" class="input-text excision" v-model="postData.deviceName">
        <div class="btn btn-add" @click="getList(0);">
          <img src="../../../static/images/search.png" alt="">
          <label>查找</label>
        </div>
      </div>
      <div>
        <div class="btn btn-add" @click="jumpEdit();">
          <img src="../../../static/images/add.png" alt="">
          <label>新增</label>
        </div>
        <div class="btn btn-del" @click="delData();">
            <img src="../../../static/images/del.png" alt="">
            <label>删除</label>
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
            <th style="width:15%;">设备名称</th>
            <th style="width:15%;">设备编号</th>
            <th style="width:15%;">设备地址</th>
            <th style="width:15%;">设备端口</th>
            <th style="width:30%;">操作</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="(item,i) in listData">
                <td><input type="checkbox" :value="item.deviceBarcode" v-model="delList" @change="clickChange();"></td>
                <td v-if="sortOrder=='0'" v-text="i+1"></td>
                <td v-else v-text="listData.length-i"></td>
                <td>{{item.deviceName}}</td>
                <td>{{item.deviceId}}</td>
                <td>{{item.deviceAddress}}</td>
                <td>{{item.devicePort}}</td>
                <td>
                  <div class="table-btn btn-yellow" @click="jumpDetail(item.deviceBarcode);">详情</div>
                  <div class="table-btn btn-red" @click="delData(item.deviceBarcode);">删除</div>
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
    .IOTType-popup{
      width: 450px;
      height: 320px;
    }
</style>
<script>
import { wltype,delwl} from "@/api/IOT/iot.js";  


export default {
  name: "document",
  data() {
    return {
      sortOrder: "0", //0 顺序，1 倒序
      requestData:'',
      postData: {
        deviceId:'',
        deviceName:'',
        pageSize: 10,
        pageNo: 0
      },
      showType:'',
      submitData:{
        applyId:'',
        graindepot:'',
        warehouse:'',
        granary:'',
        goodsLocation:'',
        shipingCount:'',
        memo:''
      },
      allChecked: false,
      delList: [],
      listData: [],
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
      wltype(vm.postData)
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
        vm.delList = [];
        vm.delList.push(id);
      } else {
        if (vm.delList.length == 0) {
          layer.msg("请至少选择一条数据！");
          return;
        }
      }
      layer.confirm('确定删除？', {
        btn: ['确定','取消'] //按钮
      }, function(){
      layer.load(2);
      var delstr = vm.delList.join(",");
      delwl({ deviceBarcodeList: delstr })
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            layer.msg("删除成功！");
            vm.delList = [];
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
          vm.delList.push(vm.listData[i].deviceBarcode);
        }
      } else {
        vm.delList = [];
      }
    },
    clickChange: function() {
      //监听input选中状态，控制全选input的选中
      var vm = this;
      if (vm.delList.length == vm.listData.length) {
        vm.allChecked = true;
      } else {
        vm.allChecked = false;
      }
    },
    jumpDetail: function(id) {
      //跳转到详情
      var vm = this;
      this.$router.push({
        name: "IOTTypeDetail",
        query: {
          id: id
        }
      });
    },
    jumpEdit: function() {
      //跳转到编辑或新增页面
      var vm = this;
      this.$router.push({
        name: "IOTTypeEdit",
      });
    },
  },
  mounted() {
    this.getList(1);
  }
};

</script>
