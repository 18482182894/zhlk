<template>
  <div class="content">
    <div class="menuManage operationLog priceManage">
      <div class="lookup">
        标题：
        <input name="" class="select-style excision" v-model="postData.applyTitle">
        费用金额：
        <input name="" class="select-style excision" v-model="postData.totalFee">

          <div class="btn btn-add"  @click="getList(0);">
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
        <th style="width:2.5%;"><input type="checkbox" v-model="allChecked" @change="checkAll();"></th>
        <th style="width:2.5%;">序号</th>
        <th style="width:7.5%;">报销标题</th>
        <th style="width:7.5%;">报销金额</th>
        <th style="width:10%;">报销时间</th>
        <th style="width:10%;">编辑状态</th>
        <th style="width:10%;">审核状态</th>
        <th style="width:30%;">操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,i) in listData">
        <td><input type="checkbox" :value="item.reimbursementId" v-model="delList.reimbursementIds" @change="clickChange();"></td>
        <td v-if="sortOrder=='0'" v-text="i+1"></td>
        <td v-else v-text="listData.length-i"></td>
        <td v-text="item.applyTitle"></td>
        <td v-text="item.totalFee" ></td>
        <td v-text="item.applyDatetime"></td>
        <!--<td v-text="item.remark"></td>-->
        <td v-text="item.draftStatus==0?'草稿':'正式文档'"></td>
        <!-- <td v-text="item.customerStatus"></td> -->
        <td>
          <label v-if="item.status==10" class="fc-blue">未审核</label>
          <label v-if="item.status==0" class="fc-red">审核不通过</label>
          <label v-if="item.status==99" class="fc-green">审核通过</label>
        </td>
        <td>
          <div class="table-btn btn-yellow" @click="jumpDetail(item.reimbursementId);">详情</div>
          <div class="table-btn btn-green" v-if="item.draftStatus==0"  @click="jumpEdit(item.reimbursementId);">编辑</div>
          <div class="table-btn btn-submit" @click="submitAudit(item.reimbursementId);" v-if="item.draftStatus==0">提交审核</div>
          <div class="table-btn btn-again" v-if="item.status==0" @click="jumpEdit(item.reimbursementId,'add');">再次申请</div>
          <div class="table-btn btn-red" v-if="item.draftStatus==0"  @click="delData(item.reimbursementId);">删除</div>
        </td>
      </tr>
      </tbody>
    </table>
      <!--&lt;!&ndash; 分页容器 &ndash;&gt;-->
      <div id="PageBar"></div>
    </div>
  </div>
</template>

<script>
  import { getReimbursementList , deleReimbursementByBatch,submitReimbursementByCheck } from "../../../api/oa/reimbursement";

  export default {
        name: "reimbList",
      data() {
        return {
          sortOrder: "0", //0 顺序，1 倒序
          postData: {
            applyTitle: this.$route.query.applyTitle ?  this.$route.query.applyTitle : "",
            totalFee: this.$route.query.totalFee ?  this.$route.query.totalFee : "",
            pageSize: 10,
            pageNo:this.$route.query.pageNo ?  this.$route.query.pageNo : 0
          },
          grainVarietyList: "",
          grainOilLevelList: "",
          inventoryPropertyList: "",
          allChecked: false,
          delList: {
            reimbursementIds: [],
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
          getReimbursementList(vm.postData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                vm.listData = ret.data.reimbursementList;
                // console.log (vm.listData)
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
            vm.delList.reimbursementIds = [];
            vm.delList.reimbursementIds.push(id);
          } else {
            if (vm.delList.reimbursementIds.length == []) {
              layer.msg("请至少选择一条数据！");
              return;
            }
          }
          layer.confirm('确定删除？', {
            btn: ['确定','取消'] //按钮
          }, function(){
            layer.load(2);
            var delStr = vm.delList.reimbursementIds.join(",");
            deleReimbursementByBatch({ reimbursementIds: delStr })
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  layer.msg("删除成功！");
                  vm.postData.pageNo = 1;
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
              vm.delList.reimbursementIds.push(vm.listData[i].reimbursementId);
            }
          } else {
            vm.delList.reimbursementIds = [];
          }
        },
        clickChange: function() {
          //监听input选中状态，控制全选input的选中
          var vm = this;
          if (vm.delList.reimbursementIds.length == vm.listData.length) {
            vm.allChecked = true;
          } else {
            vm.allChecked = false;
          }
        },
        jumpDetail: function(id) {
          //跳转到详情
          var vm = this;
          this.$router.push({
            name: "reimbDetail",
            query: {
              id: id,
              applyTitle:vm.postData.applyTitle,
              pageNo:vm.postData.pageNo,
              totalFee:vm.postData.totalFee
            }
          });
        },
        jumpEdit: function(id) {
          //跳转到编辑或新增页面
          var vm = this;
          this.$router.push({
            name: "reimbEdit",
            query: {
              id: id,
              applyTitle:vm.postData.applyTitle,
              pageNo:vm.postData.pageNo,
              totalFee:vm.postData.totalFee
            }
          });
        },
        submitAudit:function (id) {//提交审核
            var vm=this;
            submitReimbursementByCheck({ reimbursementId: id }).then(ret => {
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
      },
      mounted() {
        this.getList(this.postData.pageNo);
      }
    };
</script>
