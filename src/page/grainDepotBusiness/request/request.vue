<template>
  <div class="content">
    <div class="menuManage operationLog ">
      <div class="lookup">
        申请单名称：
          <input type="text" class="input-text excision" v-model="postData.applyName">

        <div class="btn btn-add" @click="getList(0);">
          <img src="../../../../static/images/search.png" alt="">
          <label>查找</label>
        </div>
      </div>
      <div>
        <div class="btn btn-add" @click="jumpEdit();">
          <img src="../../../../static/images/add.png" alt="">
          <label>新增申请单</label>
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
            <th style="width:7.5%;">申请单编号</th>
            <th style="width:7.5%;">合同编号</th>
            <th style="width:5%;">客户名称</th>
            <th style="width:10%;">申请单名称</th>
            <th style="width:5%;">车辆数量</th>
            <th style="width:10%;">开单日期</th>
            <th style="width:8%;">粮食数量(千克)</th>
            <th style="width:7.5%;">编辑状态</th>
            <th style="width:7.5%;">审核状态</th>
            <th style="width:27%;">操作</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="(item,i) in listData">
                <td><input type="checkbox" :value="item.applyId" v-model="delList.applyIdList" @change="clickChange();"></td>
                <td v-if="sortOrder=='0'" v-text="i+1"></td>
                <td v-else v-text="listData.length-i"></td>
            <td v-text="item.applyId"></td>
            <td v-text="item.contractId"></td>
            <td v-text="item.customerName"></td>
            <td v-text="item.applyName"></td>
            <td v-text="item.vehicleNum"></td>
            <td v-text="item.applyDate"></td>
            <td v-text="item.quantity"></td>
            <td v-text="item.draftStatus==0?'草稿':'正式文档'"></td>
            <td>
              <label v-if="item.status==0" class="fc-red">审核不通过</label>
              <label v-if="item.status==10">未审核</label>
              <label v-if="item.status==11" class="fc-green">审核中</label>
              <label v-if="item.status==99" class="fc-green">审核通过</label>
            </td>
            <td>
              <div class="table-btn btn-yellow" @click="jumpDetail(item.applyId,'detail');">详情</div>
              <div class="table-btn btn-green" @click="jumpEdit(item.applyId,'edit');" v-if="item.draftStatus==0">编辑</div>
              <div class="table-btn btn-submit" @click="submitAudit(item.applyId);" v-if="item.draftStatus==0">提交审核</div>
              <div class="table-btn btn-submit" @click="jumpNotice(item);" v-if="item.status==99">通知单</div>
              <div class="table-btn btn-again" v-if="item.status==0" @click="jumpEdit(item.applyId,'edit');">再编辑</div>
              <div class="table-btn btn-red" @click="delData(item.applyId,item.status);" v-if="item.draftStatus==0">删除</div>
            </td>
          </tr>
          </tr>
        </tbody>
      </table>
      <!-- 分页容器 -->
      <div id="PageBar"></div>
    </div>
  </div>
</template>
<script>
import { getRequestNoteList, deleRequestNote,submitRequestNoteByCheck } from "@/api/business/requestNote";
export default {
  name: "document",

  data() {
    return {
      sortOrder: "0", //0 顺序，1 倒序
      postData: {
        applyName:this.$route.query.applyName?this.$route.query.applyName:"",
        formType:this.$route.meta.warehouseType,
        pageSize: 10,
        pageNo: this.$route.query.pageNo?this.$route.query.pageNo:1
      },
      grainVarietyList: "",
      grainOilLevelList: "",
      inventoryPropertyList: "",
      allChecked: false,
      delList: {
        applyIdList: []
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
      getRequestNoteList(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret))
            vm.listData = ret.data.dataList;
            for(var i in vm.listData) {
              const time = vm.listData[i].applyDate.slice(0,10)
              vm.listData[i].applyDate = time
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
        vm.delList.applyIdList = [];
        vm.delList.applyIdList.push(id);
      } else {
        if (vm.delList.applyIdList.length == []) {
          layer.msg("请至少选择一条数据！");
          return;
        }
      }
      layer.load(2);
      var delStr = vm.delList.applyIdList.join(",");
      deleRequestNote({ applyIdList: delStr })
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
    },
    checkAll: function() {
      //全选
      var vm = this;
      if (vm.allChecked) {
        for (var i = 0; i < vm.listData.length; i++) {
          vm.delList.applyIdList.push(vm.listData[i].applyId);
        }
      } else {
        vm.delList.applyIdList = [];
      }
    },
    clickChange: function() {
      //监听input选中状态，控制全选input的选中
      var vm = this;
      if (vm.delList.applyIdList.length == vm.listData.length) {
        vm.allChecked = true;
      } else {
        vm.allChecked = false;
      }
    },
    submitAudit:function (id) {//提交审核
        var vm=this;
        submitRequestNoteByCheck({ applyId: id }).then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("提交成功！");
              vm.getList(1);
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
        }).catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
        });
    },
    jumpDetail: function(id) {
      //跳转到详情
      var vm = this;
      this.$router.push({
        name: "requestDetail",
        query: {
          id: id,
          applyName:vm.postData.applyName,
          pageNo:vm.postData.pageNo

        }
      });
    },
    jumpEdit: function(id) {
      //跳转到编辑或新增页面
      var vm = this;
      this.$router.push({
        name: "requestEdit",
        query: {
          id: id,
          applyName:vm.postData.applyName,
          pageNo:vm.postData.pageNo
        }
      });
    },
    jumpNotice: function(data) {//跳转到通知单
      var vm = this;
      this.$router.push({
        name: "notice",
        query: {
          data: data,
          applyName:vm.postData.applyName,
          pageNo:vm.postData.pageNo
        }
      });
    },
  },
  mounted() {
    // console.log(this.$route.meta.warehouseType)
    this.getList(this.postData.pageNo);
    // var vm = this;
    // vm.getList(vm.postData.pageNo);
  },
  watch:{      // this.$route.path      
      '$route.path':function(newVal,oldVal){        
          console.log(newVal+"---"+oldVal);        
          if(newVal === oldVal){                
          } else{
            this.postData.formType=this.$route.meta.warehouseType;
            this.getList(0);
          }    
        }    
    }
};

</script>
