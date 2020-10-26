<template>
  <div class="content">
    <div class="videoRetrieval">
      <div class="lookup">
        设备名称：
        <input type="text" class="input-text excision" v-model="postData.deviceName">

        <div class="btn btn-add" @click="getList(1);">
          <img src="../../../static/images/search.png" alt="">
          <label>查找</label>
        </div>
      </div>
      <div>
        <div class="btn btn-add" @click="jumpAdd();">
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
            <th style="width:15%;">设备类型</th>
            <th style="width:15%;">设备型号</th>
            <th style="width:30%;">操作</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="(item,i) in listData">
                <td><input type="checkbox" :value="item.deviceId" v-model="deviceIdList" @change="clickChange();"></td>
                <td v-if="sortOrder=='0'" v-text="i+1"></td>
                <td v-else v-text="listData.length-i"></td>
                <td v-text="item.deviceName"></td>
                <td v-text="item.deviceType"></td>
                <td v-text="item.deviceModel"></td>
                <td>
                  <div class="table-btn btn-yellow" @click="jumpDetail(item.deviceId);">详情</div>
                  <div class="table-btn btn-red" @click="delData(item.deviceId);">删除</div>
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
</style>
<script>
import { equipmentInfo,delequipmentInfo} from "@/api/IOT/iot.js"; 

export default {
  name: "document",
  data() {
    return {
      sortOrder: "0", //0 顺序，1 倒序
      requestData:'',
      postData: {
        deviceName:'',
        pageSize: 10,
        pageNo:1
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
      deviceIdList: [],
      detailData:'',
      listData: [],
      editPopup: 0, // 控制菜单编辑弹出层的显影，1为显示
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
      equipmentInfo(vm.postData)
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
        vm.deviceIdList = [];
        vm.deviceIdList.push(id);
      } else {
        if (vm.deviceIdList.length == 0) {
          layer.msg("请至少选择一条数据！");
          return;
        }
      }
      layer.confirm('确定删除？', {
        btn: ['确定','取消'] //按钮
      }, function(){
      layer.load(2);
      var delstr = vm.deviceIdList.join(",");
      delequipmentInfo({ deviceIdList: delstr })
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            layer.msg("删除成功！");
            vm.deviceIdList = [];
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
          vm.deviceIdList.push(vm.listData[i].deviceId);
        }
      } else {
        vm.deviceIdList = [];
      }
    },
    clickChange: function() {
      //监听input选中状态，控制全选input的选中
      var vm = this;
      if (vm.deviceIdList.length == vm.listData.length) {
        vm.allChecked = true;
      } else {
        vm.allChecked = false;
      }
    },
    showPopup: function() {// 展示弹出层
        var vm = this;
        vm.getList(1);
        vm.editPopup = 1;
    },
    closePopup: function() {// 隐藏弹出层
        var vm = this;
        vm.editPopup = 0;
    },
    jumpDetail: function(id) {
      //跳转到详情
      var vm = this;
      this.$router.push({
        name: "equipmentDetail",
        query: {
          id: id
        }
      });
    },
    jumpAdd: function(id,type) {
      //跳转到编辑或新增页面
      var vm = this;
      this.$router.push({
        name: "equipmentEdit",
        query: {
          id: id,
          type:type
        }
      });
    },
  },
  mounted() {
    this.getList(1);
  }
};

</script>
