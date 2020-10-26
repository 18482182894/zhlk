<template>
  <div class="content">
    <div class="menuManage operationLog priceManage">
      <div class="lookup">
        业务流程名称
        <input name="" class="select-style excision" v-model="postData.flow_name">

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
          <th style="width:7.5%;">流程编号</th>
          <th style="width:7.5%;">业务流程名</th>
          <th style="width:10%;">流程简述</th>
          <th style="width:10%;">新增日期</th>
          <th style="width:10%;">更新时间</th>
          <th style="width:30%;">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,i) in listData">
          <td><input type="checkbox" :value="item.flow_id" v-model="delList.flow_id" @change="clickChange();"></td>
          <td v-if="sortOrder=='0'" v-text="i+1"></td>
          <td v-else v-text="listData.length-i"></td>
          <td v-text="item.flow_id"></td>
          <td v-text="item.flow_name" ></td>
          <td v-text="item.flow_desc"></td>
          <td v-text="item.create_time"></td>
          <!--<td v-text="item.draftStatus==0?'草稿':'正式文档'"></td>-->
           <td v-text="item.update_time"></td>
          <td>
            <div class="table-btn btn-yellow" @click="jumpDetail(item.flow_id);">详情</div>
            <div class="table-btn btn-green" @click="jumpEdit(item.flow_id);">编辑</div>
            <div class="table-btn btn-red" @click="delData(item.flow_id);">删除</div>
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
  import { getFlowList , deleFlow } from "../../../api/workflow/flow";

  export default {
        name: "setupList",
      data() {
        return {
          sortOrder: "0", //0 顺序，1 倒序
          postData: {
            flow_id: "",
            flow_name: this.$route.query.flow_name ?  this.$route.query.flow_name : "",
            pageSize: 10,
            pageNo:this.$route.query.pageNo ?  this.$route.query.pageNo : 0
          },
          grainVarietyList: "",
          grainOilLevelList: "",
          inventoryPropertyList: "",
          allChecked: false,
          delList: {
            flow_id: [],
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
          getFlowList(vm.postData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                vm.listData = ret.data.flowList;
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
            vm.delList.flow_id = [];
            vm.delList.flow_id.push(id);
          } else {
            if (vm.delList.flow_id.length == []) {
              layer.msg("请至少选择一条数据！");
              return;
            }
          }
          layer.confirm('确定删除？', {
            btn: ['确定','取消'] //按钮
          }, function(){
            layer.load(2);
            var delStr = vm.delList.flow_id.join(",");
            deleFlow({ flow_id: delStr })
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
              vm.delList.flow_id.push(vm.listData[i].flow_id);
            }
          } else {
            vm.delList.flow_id = [];
          }
        },
        clickChange: function() {
          //监听input选中状态，控制全选input的选中
          var vm = this;
          if (vm.delList.flow_id.length == vm.listData.length) {
            vm.allChecked = true;
          } else {
            vm.allChecked = false;
          }
        },
        jumpDetail: function(id) {
          //跳转到详情
          var vm = this;
          this.$router.push({
            name: "setupDetail",
            query: {
              id: id,
              flow_name:vm.postData.flow_name,
              pageNo:vm.postData.pageNo,
            }
          });
        },
        jumpEdit: function(id) {
          //跳转到编辑或新增页面
          var vm = this;
          this.$router.push({
            name: "setupEdit",
            query: {
              id: id,
              flow_name:vm.postData.flow_name,
              pageNo:vm.postData.pageNo,
            }
          });
        },
        jumpBadRecord:function (name) {//跳转到不良记录
          var vm = this;
          this.$router.push({
            name: "badRecord",
            query: {
              name: name
            }
          });
        }
      },
      mounted() {
        this.getList(this.postData.pageNo);
      }
    };
</script>
