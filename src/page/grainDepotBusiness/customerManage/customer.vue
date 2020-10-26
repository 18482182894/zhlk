<template>
  <div class="content">
    <div class="menuManage operationLog ">
      <div class="lookup">
        客户名称：
        <input type="text" class="input-text excision" v-model="postData.customerName">
        客户类型：
        <select name="" class="select-style  excision" v-model="postData.classify">
          <option value="">客户类型</option>
          <option value="true">个人客户</option>
          <option value="false">企业客户</option>
        </select>
        城 市：
        <input type="text" class="input-text " v-model="postData.district">


          <div class="btn btn-add"  @click="getList(1);">
            <img src="../../../../static/images/search.png" alt="">
            <label>查找</label>
          </div>
      </div>
      <div>
        <div class="btn btn-add" @click="jumpEdit('','');">
          <img src="../../../../static/images/add.png" alt="">
          <label>新增</label>
        </div>
        <div class="btn btn-blank" @click="jumpBadRecord();">
          <label>不良记录</label>
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
            <th style="width:2.5%;"><input type="checkbox" v-model="allChecked" @change="checkAll();"></th>
            <th style="width:2.5%;">序号</th>
            <th style="width:7.5%;">客户名称</th>
            <th style="width:7.5%;">客户类型</th>
            <th style="width:10%;">企业性质</th>
            <th style="width:5%;">城市</th>
            <th style="width:10%;">联系电话</th>
            <th style="width:10%;">客户描述</th>
            <th style="width:5%;">编辑状态</th>
            <th style="width:10%;">审核状态</th>
            <th style="width:30%;">操作</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="(item,i) in listData">
                <td><input type="checkbox" :value="item.customerId" v-model="delList.customerIdList" @change="clickChange();"></td>
                <td v-if="sortOrder=='0'" v-text="i+1"></td>
                <td v-else v-text="listData.length-i"></td>
            <td v-text="item.customerName"></td>
            <td v-text="item.classify=='true'?'个人客户':'企业客户'" ></td>
            <td v-text="item.generalProperty"></td>
            <td v-text="item.district"></td>
            <td v-text="item.mobile"></td>
            <td v-text="item.remark"></td>
            <td v-text="item.draftStatus==0?'草稿':'正式文档'"></td>
            <!-- <td v-text="item.customerStatus"></td> -->
            <td>
              <label v-if="item.status==0" class="fc-red">审核不通过</label>
              <label v-if="item.status==10">未审核</label>
              <label v-if="item.status==11" class="fc-green">审核中</label>
              <label v-if="item.status==99" class="fc-green">审核通过</label>
            </td>
            <td>
              <div class="table-btn btn-yellow" @click="jumpDetail(item.customerId);">详情</div>
              <div class="table-btn btn-green" @click="jumpEdit(item.customerId,'edit');" v-if="item.draftStatus==0">编辑</div>
              <div class="table-btn btn-change" v-if="item.status==99" @click="jumpEdit(item.customerId,'change');">信息变更</div>
              <!-- <div class="table-btn btn-blood" v-if="item.status==99" @click="jumpBadRecord(item.customerName);">不良记录</div> -->
              <div class="table-btn btn-submit" @click="submitAudit(item.customerId);" v-if="item.draftStatus==0">提交审核</div>
              <div class="table-btn btn-again" v-if="item.status==0" @click="submitAudit(item.customerId);">再次申请</div>
              <div class="table-btn btn-red" @click="delData(item.customerId,item.status);" v-if="item.draftStatus==0||item.status==99">删除</div>
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
import { getCustomerList, deleCustomer,addCustomerByCheck,deleCustomerByCheck } from "@/api/business/customer";
export default {
  name: "document",
  data() {
    return {
      sortOrder: "0", //0 顺序，1 倒序
      postData: {
        customerName: this.$route.query.customerName,
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
        customerIdList: []
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
      getCustomerList(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.listData = ret.data.customerList;
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
    delData: function(id,status) {
      //删除
      var vm = this;
      if (id) {
        vm.delList.customerIdList = [];
        vm.delList.customerIdList.push(id);
      } else {
        if (vm.delList.customerIdList.length == []) {
          layer.msg("请至少选择一条数据！");
          return;
        }
      }
      layer.confirm('确定删除？', {
        btn: ['确定','取消'] //按钮
      }, function(){
        layer.load(2);
        var delStr = vm.delList.customerIdList.join(",");
        deleCustomer({ customerIdList: delStr })
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("删除客户提交成功！");
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
          vm.delList.customerIdList.push(vm.listData[i].customerId);
        }
      } else {
        vm.delList.customerIdList = [];
      }
    },
    clickChange: function() {
      //监听input选中状态，控制全选input的选中
      var vm = this;
      if (vm.delList.customerIdList.length == vm.listData.length) {
        vm.allChecked = true;
      } else {
        vm.allChecked = false;
      }
    },
    jumpDetail: function(id,district,classify,customerName,pageNo) {
      //跳转到详情
      var vm = this;
      this.$router.push({
        name: "customerDetail",
        query: {
          id: id,
          district:vm.postData.district,
          classify:vm.postData.classify,
          customerName:vm.postData.customerName,
          pageNo:vm.postData.pageNo
        }
      });
    },
    jumpEdit: function(id,type,district,classify,customerName,pageNo) {
      //跳转到编辑或新增页面
      var vm = this;
      this.$router.push({
        name: "customerEdit",
        query: {
          id: id,
          type:type,
          district:vm.postData.district,
          classify:vm.postData.classify,
          customerName:vm.postData.customerName,
          pageNo:vm.postData.pageNo
        }
      });
    },
    jumpBadRecord:function (name) {//跳转到不良记录
      var vm = this;
        this.$router.push({
          name: "badRecord",
          query: {
            name: name,
            district:vm.postData.district,
            classify:vm.postData.classify,
            customerName:vm.postData.customerName,
            pageNo:vm.postData.pageNo
          }
        });
    },
    submitAudit:function (id) {//提交审核
        var vm=this;
        layer.load(2);
        addCustomerByCheck({ customerId: id }).then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("提交成功！");
              vm.getList(0);
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
        }).catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
        });
    }
  },
  mounted() {
    this.getList(1);
  }
};

</script>
