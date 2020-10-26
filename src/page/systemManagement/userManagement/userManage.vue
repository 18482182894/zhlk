<template>
  <div class="content">
    <div class="menuManage operationLog userManage">
      <div class="lookup">
        姓名搜索：
        <input type="text" class="input-text excision" v-model="postData.userName">

        <div class="btn btn-add" @click="getList(1);">
          <img src="../../../../static/images/search.png" alt>
          <label>查找</label>
        </div>
      </div>
      <div>
        <div class="btn btn-add" @click="jumpEdit();">
          <img src="../../../../static/images/add.png" alt>
          <label>新增</label>
        </div>
        <!-- <div class="btn btn-export" @click="changeRole('add');">
                    <img src="../../../../static/images/add.png" alt="">
                    <label>添加权限</label>
                </div>
                <div class="btn btn-del" @click="changeRole('del');">
                    <img src="../../../../static/images/del.png" alt="">
                    <label>删除权限</label>
        </div>-->
        <!-- <select name="" class="select-style">
                    <option value="">显示条数</option>
        </select>-->
        <select name class="select-style" v-model="sortOrder" @change="changeSortOrder();">
          <option value>排序方式</option>
          <option value="0">正序</option>
          <option value="1">倒序</option>
        </select>
      </div>
      <table class="customTable">
        <thead>
          <tr>
            <th>
              <input type="checkbox" @change="checkAll()" v-model="allChecked">
            </th>
            <th>序号</th>
            <th>用户名</th>
            <th>角色名称</th>
            <th>注册时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in listData">
            <td>
              <input type="checkbox" :value="item" v-model="roleIdList" @change="clickChange();">
            </td>
            <td v-if="sortOrder=='0'" v-text="i+1"></td>
            <td v-else v-text="listData.length-i"></td>
            <td v-text="item.user_name?item.user_name:''"></td>
            <td v-text="item.role_names?item.role_names:''"></td>
            <td v-text="item.create_time?item.create_time:''"></td>
            <td>
              <div class="table-btn btn-yellow" @click="jumpDetail(item.user_id);">详情</div>
              <div class="table-btn btn-green" @click="jumpEdit(item.user_id);">编辑</div>
              <div class="table-btn btn-red" @click="jumpDel(item.user_id);">删除</div>
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
import { userList,userDel } from "@/api/systemManage/user";
export default {
  name: "userManage",
  data() {
    return {
      postData: {
        userName:  this.$route.query.userName?this.$route.query.userName:"",
        pageSize: 10,
        pageNo:  this.$route.query.pageNo?this.$route.query.pageNo:0
      },
      listData: "",
      roleIdList: [],
      user_idList: [],
      showList: "",
      sortOrder: "0", //0 顺序，1 倒序
      allChecked: false
    };
  },
  methods: {
    getList: function(pageNo) {
      //获取列表
      var vm = this;
      vm.postData.pageNo = pageNo;
      layer.load(2);
      userList(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret))
            vm.listData = ret.data.dataList;
            // console.log(vm.listData );

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
          vm.roleIdList.push(vm.listData[i]);
        }
      } else {
        vm.roleIdList = [];
      }
    },
    clickChange: function() {
      //监听input选中状态，控制全选input的选中
      var vm = this;
      if (vm.roleIdList.length == vm.listData.length) {
        vm.allChecked = true;
      } else {
        vm.allChecked = false;
      }
    },
    changeSortOrder: function() {
      var vm = this;
      vm.listData.reverse();
    },
    jumpEdit: function(id) {
      var vm = this;
      this.$router.push({
        name: "userManageEdit",
        query: {
          id: id,
          //新增
          userName:vm.postData.userName,
          pageNo:vm.postData.pageNo
        }
      });
    },
    jumpDetail: function(id) {
      var vm = this;
      this.$router.push({
        name: "userManageDetail",
        query: {
          id: id,
          //新增
          userName:vm.postData.userName,
          pageNo:vm.postData.pageNo
        }
      });
    },
    jumpDel:function (id) {
      var vm=this;
      layer.confirm('确定删除？', {
        btn: ['确定','取消'] //按钮
      }, function(){
        layer.load(2);
        //var delStr = vm.roleIdList.join(",");
        userDel({ userId: id })
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
      }, function(){
      });
    },
    changeRole: function(e) {
      var vm = this;
      // console.log(JSON.stringify(this.$route.query.data));
      if (vm.roleIdList == "") {
        layer.msg("请选择一条数据！");
        return;
      }
      if (vm.roleIdList.length > 1) {
        layer.msg("只能选择一条数据！");
        return;
      }
      this.$router.push({
        name: "changeRole",
        query: {
          type: e,
          sorts: "user",
          data: vm.roleIdList[0]
        }
      });
    }
  },
  mounted() {
    var vm = this;
    vm.getList(vm.postData.pageNo);
  }
};
</script>
