<template>
  <div class="content">
    <div class="menuManage operationLog ">
      <div class="lookup">
        客户名称：
        <input type="text" class="input-text excision" v-model="postData.customerName">


          <div class="btn btn-add" @click="getList(1);">
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
          <option value="0">正序</option>
          <option value="1">倒序</option>
        </select>
      </div>
      <table class="customTable">
        <thead>
          <tr>
            <th style="width:5%;"><input type="checkbox" v-model="allChecked" @change="checkAll();"></th>
            <th style="width:5%;">序号</th>
            <th style="width:10%;">客户名称</th>
            <th style="width:15%;">发生日期</th>
            <th style="width:10%;">记录类型</th>
            <th style="width:15%;">涉及金额</th>
            <th style="width:15%;">涉粮数量</th>
            <th style="width:10%;">上报状况</th>
            <th style="width:15%;">操作</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="(item,i) in listData">
                <td><input type="checkbox" :value="item.id" v-model="delList.ids" @change="clickChange();"></td>
                <td v-if="sortOrder=='0'" v-text="i+1"></td>
                <td v-else v-text="listData.length-i"></td>
                <td v-text="item.customerName"></td>
                <td v-text="item.happenDate"></td>
                <td v-text="item.recordType"></td>
                <td v-text="item.money"></td>
                <td v-text="item.quantity"></td>
                <td v-text="item.uploadStatus"></td>
                <td>
                  <div class="table-btn btn-red" @click="delData(item.id);">删除</div>
                </td>
            </tr>
        </tbody>
      </table>
            <div class="detail-back">
                <button @click="detailBack();">返回</button>
            </div>
      <!-- 分页容器 -->
      <div id="PageBar"></div>
    </div>
  </div>
</template>
<script>
import { getCustomerBadLogList, deleCustomerBadLog } from "@/api/business/contract";
export default {
  name: "document",
  data() {
    return {
      sortOrder: "0", //0 顺序，1 倒序
      postData: {
        customerName: this.$route.query.name,
        customer: this.$route.query.customerName,
        classify: this.$route.query.classify,
        district: this.$route.query.district,
        pageSize: 10,
        pageNo:1
      },
      grainVarietyList: "",
      grainOilLevelList: "",
      inventoryPropertyList: "",
      allChecked: false,
      delList: {
        ids: []
      },
      listData: []
    };
  },
  methods: {
    changeSortOrder: function() {//倒序
      var vm = this;
      vm.listData.reverse();
    },
    getList: function(pageNo) {
      //获取列表
      var vm = this;
      vm.postData.pageNo = pageNo;
      layer.load(2);
      getCustomerBadLogList(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.listData = ret.data.customerBadRecordList;
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
        vm.delList.ids = [];
        vm.delList.ids.push(id);
      } else {
        if (vm.delList.ids == []) {
          layer.msg("请至少选择一条数据！");
          return;
        }
      }

      layer.confirm('确定删除？', {
        btn: ['确定','取消'] //按钮
      }, function(){
        layer.load(2);
        var delStr = vm.delList.ids.join(",");
        deleCustomerBadLog({ ids: delStr })
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("删除成功！");
              vm.delList.ids = [];
              vm.getList(1);
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
          vm.delList.ids.push(vm.listData[i].id);
        }
      } else {
        vm.delList.ids = [];
      }
    },
    clickChange: function() {
      //监听input选中状态，控制全选input的选中
      var vm = this;
      if (vm.delList.ids.length == vm.listData.length) {
        vm.allChecked = true;
      } else {
        vm.allChecked = false;
      }
    },
    jumpDetail: function(pageNo,customerName) {
      //跳转到详情
      var vm = this;
      this.$router.push({
        name: "documentDetail",
        query: {
          id: id,
          customerName:vm.postData.customer,
          classify:vm.postData.classify,
          district:vm.postData.district,
          pageNo:vm.postData.pageNo
        }
      });
    },
    jumpEdit: function() {//跳转到新增页面
      var vm = this;
      this.$router.push({
        name: "badRecordAdd",
        query: {
          customerName:vm.postData.customerName,
          pageNo:vm.postData.pageNo
        }
      });
    },
    detailBack:function () {
      var vm = this;
      this.$router.push({
        name: "customer",
        query: {
          customerName:vm.postData.customer,
          classify:vm.postData.classify,
          district:vm.postData.district,
          pageNo:vm.postData.pageNo
        }
      });
}
  },
  mounted() {
    this.getList(1);
  }
};

</script>
