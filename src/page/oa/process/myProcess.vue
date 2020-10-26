<template>
  <div class="content">
    <div class="menuManage operationLog priceManage">
      <div class="lookup">
        审批单名称：
        <input name="" class="select-style excision" v-model="postData.billName">
        开始时间：
        <input type="text" class="input-text Wdate excision" onclick="WdatePicker({})" id="begainTime">
        结束时间：
        <input type="text" class="input-text Wdate excision" onclick="WdatePicker({})" id="endTime">

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
          <option value="0">正序</option>
          <option value="1">倒序</option>
        </select>
      </div>
      <table class="customTable">
        <thead>
        <tr>
          <th style="width:2.5%;"><input type="checkbox" v-model="allChecked" @change="checkAll();"></th>
          <th style="width:2.5%;">序号</th>
          <th style="width:10%;">审批单名称</th>
          <th style="width:10%;">流程名称</th>
          <th style="width:10%;">审批单状态</th>
          <th style="width:10%;">发起时间</th>
          <th style="width:20%;">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,i) in listData">
          <td><input type="checkbox" :value="item.dataList" @change="clickChange();"></td>
          <td v-if="sortOrder=='0'" v-text="i+1"></td>
          <td v-else v-text="listData.length-i"></td>
          <td v-text="item.billName"></td>
          <td v-text="item.flowName" ></td>
          <td>
            <label v-if="item.status==-1" class="fc-blue">尚未提交</label>
            <label v-if="item.status==0" class="fc-red">审核不通过</label>
            <label v-if="item.status==10">未审核</label>
            <label v-if="item.status==99" class="fc-green">审核通过</label>
          </td>
          <td v-text="item.createTime"></td>

          <td>
            <div class="table-btn btn-yellow" @click="jumpDetail(item.billId,item.flowName);">详情</div>
          </td>
        </tr>
        </tbody>
      </table>
      <div id="PageBar"></div>
    </div>
  </div>
</template>
<style type="text/css" scoped>
  .excision{
    margin-right: 2rem;
  }
</style>
<script>
  import { getMyNoticeList , deleMyNotice } from "../../../api/oa/notice";

  export default {
        name: "myProcess",
      data() {
        return {
          sortOrder: "0", //0 顺序，1 倒序
          postData: {
            // applicantId:"",
            billName: "",
            endTime:"",
            begainTime: "",
            pageSize: 10,
            pageNo: 0
          },
          // grainVarietyList: "",
          // grainOilLevelList: "",
          // inventoryPropertyList: "",
          allChecked: false,
          delList: {
            planIdList: [],
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
          vm.postData.begainTime=$('#begainTime').val();
          vm.postData.endTime=$('#endTime').val();
          layer.load(2);
          getMyNoticeList(vm.postData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                vm.listData = ret.data.dataList;
                // console.log (JSON.stringify(vm.listData));
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
        checkAll: function() {
          //全选
          var vm = this;
          if (vm.allChecked) {
            for (var i = 0; i < vm.listData.length; i++) {
              vm.delList.leaveApplyIdList.push(vm.listData[i].originalBillId);
            }
          } else {
            vm.delList.dataList = [];
          }
        },
        clickChange: function() {
          //监听input选中状态，控制全选input的选中
          var vm = this;
          if (vm.delList.leaveApplyIdList.length == vm.listData.length) {
            vm.allChecked = true;
          } else {
            vm.allChecked = false;
          }
        },
        jumpDetail: function(id,str) {
          //跳转到详情
          var vm = this;
          if (str=='请假流程') {
            this.$router.push({
              name: "leaveDetail",
              query: {
                id: id
              }
            });
          }else{
            this.$router.push({
              name: "reimbDetail",
              query: {
                id: id
              }
            });
          }
        },
        jumpEdit: function() {
          //跳转到编辑或新增页面
          var vm = this;
          this.$router.push({
            name: "addProcess"
          });
        },
      },
      mounted() {
        this.getList(1);
      }
    };
</script>

<style scoped>

</style>
