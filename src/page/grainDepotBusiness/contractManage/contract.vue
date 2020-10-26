<template>
  <div class="content">
    <div class="menuManage operationLog ">
      <div class="lookup">
        合同标题：
        <input type="text" class="input-text excision" v-model="postData.contractTitle">
        合同类型：
        <select name="" class="select-style  excision" v-model="postData.contractType">
          <option value="">合同类型</option>
          <option value="1">收购合同</option>
          <option value="2">销售合同</option>
          <option value="3">代储合同</option>
        </select>

        <div class="btn btn-add" @click="getList(1);">
          <img src="../../../../static/images/search.png" alt="">
          <label>查找</label>
        </div>
      </div>
      <div>
        <div class="btn btn-add" @click="jumpEdit('','add');">
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
            <th style="width:2.5%;"><input type="checkbox" v-model="allChecked" @change="checkAll();"></th>
            <th style="width:2.5%;">序号</th>
            <th style="width:7.5%;">合同标题</th>
            <th style="width:7.5%;">合同类型</th>
            <th style="width:10%;">粮食品种</th>
            <th style="width:5%;">客户名称</th>
            <th style="width:5%;">签订人</th>
            <th style="width:5%;">粮食单价</th>
            <th style="width:5%;">总金额</th>
            <th style="width:10%;">合同进度</th>
            <th style="width:7.5%;">编辑状态</th>
            <th style="width:7.5%;">审核状态</th>
            <th style="width:30%;">操作</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="(item,i) in listData">
                <td><input type="checkbox" :value="item.contractId" v-model="delList.contractIds" @change="clickChange();"></td>
                <td v-if="sortOrder=='0'" v-text="i+1"></td>
                <td v-else v-text="listData.length-i"></td>
            <td v-text="item.contractTitle"></td>
            <td>
              <label v-if="item.contractType==1">收购合同</label>
              <label v-if="item.contractType==2">销售合同</label>
              <label v-if="item.contractType==3">代储合同</label>
            </td>
            <td v-text="item.grainKindVlue"></td>
            <td v-text="item.customerName"></td>
            <td v-text="item.signingMan"></td>
            <td v-text="item.grainPrice"></td>
            <td v-text="item.moneyQuantity"></td>
            <td>
              <label v-text="item.progress"></label>
              <br>
              <div class="planProgress">
                <div class="planProgress-content" :style="item.progress?'width:'+item.progress:'width:0;'"></div>
              </div>
            </td>
            <td v-text="item.draftStatus==0?'草稿':'正式文档'"></td>
            <!-- <td v-text="item.customerStatus"></td> -->
            <td v-text="item.statusValue">
              <!-- <label v-if="item.status==0" class="fc-red">审核不通过</label>
              <label v-if="item.status==10">未审核</label>
              <label v-if="item.status==11" class="fc-green">审核中</label>
              <label v-if="item.status==99" class="fc-green">审核通过</label> -->
            </td>
            <td>
              <div class="table-btn btn-yellow" @click="jumpDetail(item.contractId,'detail');">详情</div>
              <div class="table-btn btn-green" @click="jumpEdit(item.contractId,'edit');" v-if="item.draftStatus==0&&item.contractStatus<3">编辑</div>
              <div class="table-btn btn-change" v-if="item.status==99&&item.contractStatus<3" @click="jumpEdit(item.contractId,'edit');">合同变更</div>
              <div class="table-btn btn-blood" v-if="item.status==99&&item.contractStatus<3" @click="jumpDetail(item.contractId,'suspend');">合同中止</div>
              <div class="table-btn btn-submit" @click="submitAudit(item.contractId);" v-if="item.draftStatus==0">提交审核</div>
              <div class="table-btn btn-again" v-if="item.status==0" @click="submitAudit(item.contractId);">再次申请</div>
              <div class="table-btn btn-red" @click="delData(item.contractId,item.status);" v-if="(item.draftStatus==0)&&item.contractStatus<3">删除</div>
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
import { getConstractList, deleConstract,submitConstractByCheck } from "@/api/business/contract";
export default {
  name: "contract",
  data() {
    return {
      sortOrder: "0", //0 顺序，1 倒序
      postData: {
        contractTitle: this.$route.query.contractTitle,
        contractType: this.$route.query.contractType,
        pageSize: 10,
        pageNo:1
      },
      grainVarietyList: "",
      grainOilLevelList: "",
      inventoryPropertyList: "",
      allChecked: false,
      delList: {
        contractIds: []
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
      getConstractList(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret))
            vm.listData = ret.data.contractList;
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
    delData: function(id,status) {
      //删除
      var vm = this;
      if (id) {
        vm.delList.contractIds = [];
        vm.delList.contractIds.push(id);
      } else {
        if (vm.delList.contractIds.length == []) {
          layer.msg("请至少选择一条数据！");
          return;
        }
      }
      layer.confirm('确定删除？', {
        btn: ['确定','取消'] //按钮
      }, function(){
        layer.load(2);
        var delStr = vm.delList.contractIds.join(",");
        deleConstract({ contractIds: delStr })
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("删除成功！");
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
          vm.delList.contractIds.push(vm.listData[i].contractId);
        }
      } else {
        vm.delList.contractIds = [];
      }
    },
    clickChange: function() {
      //监听input选中状态，控制全选input的选中
      var vm = this;
      if (vm.delList.contractIds.length == vm.listData.length) {
        vm.allChecked = true;
      } else {
        vm.allChecked = false;
      }
    },
    jumpDetail: function(id,type,contractType,pageNo,contractTitle) {
      //跳转到详情
      var vm = this;
      this.$router.push({
        name: "contractDetail",
        query: {
          id: id,
          type:type,
          contractType:vm.postData.contractType,
          contractTitle:vm.postData.contractTitle,
          pageNo:vm.postData.pageNo
        }
      });
    },
    jumpEdit: function(id,type,contractType,pageNo,contractTitle) {
      //跳转到编辑或新增页面
      var vm = this;
      this.$router.push({
        name: "contractEdit",
        query: {
          id: id,
          type:type,
          contractType:vm.postData.contractType,
          contractTitle:vm.postData.contractTitle,
          pageNo:vm.postData.pageNo
        }
      });
    },
    submitAudit:function (id) {//提交审核
        var vm=this;
        submitConstractByCheck({ contractId: id }).then(ret => {
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
