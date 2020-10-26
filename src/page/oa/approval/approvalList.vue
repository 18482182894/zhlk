<template>
  <div class="content">
    <div class="menuManage operationLog priceManage">
      <div class="lookup">
        审批单名称
        <input name="" class="select-style excision" v-model="postData.billName">
        审核状态：
        <select name="" class="select-style excision" v-model="postData.overFlg">
          <option value="0">待审核</option>
          <option value="1">审核中</option>
          <option value="2">审核结束</option>
        </select>
        开始时间：
        <input type="text" class="input-text Wdate" onclick="WdatePicker({maxDate:'%y-%M-%d'})" id="beginCreateTime" >~<input type="text" class="input-text Wdate excision" onclick="WdatePicker({maxDate:'%y-%M-%d'})" id="endCreateTime">


          <div class="btn btn-add"  @click="getList(0);">
            <img src="../../../../static/images/search.png" alt="">
            <label>查找</label>
          </div>
      </div>
      <div>
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
          <th style="width:10%;">审批单编号</th>
          <th style="width:10%;">审批单名称</th>
          <th style="width:10%;">流程单名称</th>
          <th style="width:10%;">审批单状态</th>
          <th style="width:10%;">发起时间</th>
          <th style="width:20%;">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,i) in listData">
          <td><input type="checkbox" :value="item.planList"></td>
          <td v-if="sortOrder=='0'" v-text="i+1"></td>
          <td v-else v-text="listData.length-i"></td>
          <td v-text="item.billId"></td>
          <td v-text="item.billName" ></td>
          <td v-text="item.flowName"></td>
          <td v-text="item.billStatus"></td>
          <td v-text="item.creatTime"></td>
          <td>
            <div class="table-btn btn-yellow"@click="jumpDetail(item.billId);">详情</div>
            <div class="table-btn btn-green" v-if="item.billStatus!='审核通过'&&item.billStatus!='审核不通过'" @click="jumpEdit(item.billId);">审核</div>
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
  import {getCheckeDocList} from "../../../api/workflow/checkDoc";

  export default {
        name: "approvalList",
      data() {
        return {
          sortOrder: "0", //0 顺序，1 倒序
          postData: {
            access_token: "",
            billId: "",
            passFlg: "",
            overFlg:this.$route.query.overFlg ?  this.$route.query.overFlg : "",
            billName:this.$route.query.billName ?  this.$route.query.billName : "",
            approveResult: "",
            beginCreateTime:$('#beginCreateTime').val() ? $('#beginCreateTime').val():"",
            endCreateTime: $('#endCreateTime').val() ?  $('#endCreateTime').val():"",
            pageSize: 10,
            pageNo:this.$route.query.pageNo ?  this.$route.query.pageNo : 0
          },
          // grainVarietyList: "",
          // grainOilLevelList: "",
          // inventoryPropertyList: "",
          allChecked: false,
          // delList: {
          //   planIdList: [],
          // },
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
          vm.postData.beginCreateTime=$('#beginCreateTime').val();
          vm.postData.endCreateTime=$('#endCreateTime').val();
          layer.load(2);
          getCheckeDocList(vm.postData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                // console.log (JSON.stringify(ret))
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
        // delData: function(id) {
        //   //删除
        //   var vm = this;
        //   if (id) {
        //     vm.delList.planIdList = [];
        //     vm.delList.planIdList.push(id);
        //   } else {
        //     if (vm.delList.planIdList.length == []) {
        //       layer.msg("请至少选择一条数据！");
        //       return;
        //     }
        //   }
        //   layer.confirm('确定删除？', {
        //     btn: ['确定','取消'] //按钮
        //   }, function(){
        //     layer.load(2);
        //     var delStr = vm.delList.planIdList.join(",");
        //     delePlan({ planIdList: delStr })
        //       .then(ret => {
        //         layer.closeAll("loading");
        //         if (ret.code == 200) {
        //           layer.msg("删除成功！");
        //           vm.postData.pageNo = 1;
        //           vm.getList(1);
        //         } else {
        //           layer.alert(ret.data, { closeBtn: 0 });
        //         }
        //       })
        //       .catch(err => {
        //         layer.alert(err.message, { closeBtn: 0 });
        //       });
        //   }, function(){
        //   });
        //
        // },
        // checkAll: function() {
        //   //全选
        //   var vm = this;
        //   if (vm.allChecked) {
        //     for (var i = 0; i < vm.listData.length; i++) {
        //       vm.delList.planIdList.push(vm.listData[i].planId);
        //     }
        //   } else {
        //     vm.delList.planIdList = [];
        //   }
        // },
        // clickChange: function() {
        //   //监听input选中状态，控制全选input的选中
        //   var vm = this;
        //   if (vm.delList.planIdList.length == vm.listData.length) {
        //     vm.allChecked = true;
        //   } else {
        //     vm.allChecked = false;
        //   }
        // },
        jumpDetail: function(id) {
          //跳转到详情
          var vm = this;
          this.$router.push({
            name: "approvalDetail",
            query: {
              id: id,
              overFlg_transfer:vm.postData.overFlg,
              billName_transfer:vm.postData.billName,
              beginCreateTime_transfer:vm.postData.beginCreateTime,
              endCreateTime_transfer:vm.postData.endCreateTime,
              pageNo:vm.postData.pageNo
            }
          });
        },
        jumpEdit: function(id) {
          //跳转到编辑或新增页面
          var vm = this;
          this.$router.push({
            name: "approval",
            query: {
              id: id,
              overFlg_transfer:vm.postData.overFlg,
              billName_transfer:vm.postData.billName,
              beginCreateTime_transfer:vm.postData.beginCreateTime,
              endCreateTime_transfer:vm.postData.endCreateTime,
              pageNo:vm.postData.pageNo
            }
          });
        },
        // jumpBadRecord:function (name) {//跳转到不良记录
        //   var vm = this;
        //   this.$router.push({
        //     name: "badRecord",
        //     query: {
        //       name: name
        //     }
        //   });
        // }
      },
      mounted() {
        this.$route.query.beginCreateTime ?   $('#beginCreateTime').val(this.$route.query.beginCreateTime): "";
        this.$route.query.endCreateTime ?   $('#endCreateTime').val(this.$route.query.endCreateTime): "";
        this.getList(this.postData.pageNo);
      }
    };
</script>
