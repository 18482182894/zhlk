<template>
  <div class="content">
    <div class="menuManage operationLog roleManage">
      <div class="lookup">
        员工名称：
        <input type="text" class="input-text excision" v-model="postData.staff_name">
        是否绑定用户：
        <select class="select-style excision" v-model="postData.isBind" >
          <option value="0">未绑定</option>
          <option value="1">已绑定</option>
        </select>

        
          <div class="btn btn-add" @click="getList(0);">
            <img src="../../../../static/images/search.png" alt>
            <label>查找</label>
          </div>
      </div>
      <div>
        <div class="btn btn-add" @click="jumpEdit();">
          <img src="../../../../static/images/add.png" alt>
          <label>新增</label>
        </div>
        <div class="btn btn-del" @click="delData();">
          <img src="../../../../static/images/del.png" alt>
          <label>删除</label>
        </div>
        <select name class="select-style" v-model="sortOrder" @change="changeSortOrder();">
          <option value>排序方式</option>
          <option value="0">顺序</option>
          <option value="1">倒序</option>
        </select>
      </div>
      <table class="customTable">
        <thead>
          <tr>
            <th>
              <input type="checkbox" v-model="allChecked" @change="checkAll();">
            </th>
            <th>序号</th>
            <th>姓名</th>
            <th>性别</th>
            <th>入职时间</th>
            <th>部门</th>
            <th>身份证</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in listData">
            <td>
              <input
                type="checkbox"
                :value="item.staff_id"
                v-model="delList.staff_idList"
                @change="clickChange();"
              >
            </td>
            <td v-if="sortOrder=='0'" v-text="i+1"></td>
            <td v-else v-text="listData.length-i"></td>
            <td v-text="item.staff_name"></td>
            <td v-text="item.sex==0?'女':'男'"></td>
            <td v-text="item.entry_date"></td>
            <td v-text="item.dept_name"></td>
            <td v-text="item.identity_no"></td>
            <td>
              <div class="table-btn btn-yellow" @click="jumpDetail(item.staff_id);">详情</div>
              <div class="table-btn btn-green" @click="jumpEdit(item.staff_id);">编辑</div>
              <div class="table-btn btn-green" @click="jumpDeparture(item.staff_id);">离职</div>
              <!-- <div class="table-btn btn-red" @click="delData(item.staff_id);">删除</div> -->
              <div class="table-btn btn-change" v-if="item.user_name==''" @click="showPopup(item.staff_id);">绑定用户</div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 分页容器 -->
      <div id="PageBar"></div>
    </div>

      <!-- 选择来文弹出层 -->
      <div class="popup" :style="editPopup==1?'display:block;':''">
        <div class="popup-main planPopup-edit-main operationLog">
          <div class="popup-title">
            <label>选择用户</label>
            <em class="popup-close" @click="closePopup('edit');">×</em>
          </div>
          <div class="popup-content">

              <div class="lookup">
                用户名：
                <input type="text" class="input-text excision" v-model="userListData.userName">

                <div class="btn btn-add" @click="getUserList(1);">
                  <img src="../../../../static/images/search.png" alt>
                  <label>查找</label>
                </div>
              </div>
              <table class="customTable">
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox">
                    </th>
                    <th>序号</th>
                    <th>用户名</th>
                    <!-- <th>角色名称</th> -->
                    <th>注册时间</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,i) in userList">
                    <td>
                      <input type="checkbox" >
                    </td>
                    <td v-if="sortOrder=='0'" v-text="i+1"></td>
                    <td v-else v-text="userList.length-i"></td>
                    <td v-text="item.userName"></td>
                    <!-- <td v-text="item.role_names?item.role_names:''"></td> -->
                    <td v-text="item.createTime"></td>
                    <td>
                        <div class="table-btn btn-change" @click="bindUser(item);">绑定用户</div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- 分页容器 -->
              <div id="PageBar1" class="PageBar"></div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { staffList, staffDel,staffbindUser } from "@/api/systemManage/staff";
import { unboundUser } from "@/api/systemManage/user";
export default {
  name: "staffManage",
  data() {
    return {
      postData: {
        staff_id:this.$route.query.staff_id?this.$route.query.staff_id:"",
        staff_name: this.$route.query.staff_name?this.$route.query.staff_name:"",
        isBind:'',
        pageSize: 10,
        pageNo: this.$route.query.pageNo?this.$route.query.pageNo:0
      },
      userListData:{
        userName: "",
        pageSize: 6,
        pageNo: 0
      },
      staff_id:'',
      allChecked: false,
      sortOrder: "0", //0 顺序，1 倒序
      delList: {
        staff_idList: []
      },
      listData: [],
      userList:[],
      editPopup: 0 // 控制菜单编辑弹出层的显影，1为显示
    };
  },
  methods: {
    changeSortOrder: function() {
      var vm = this;
      vm.listData.reverse();
    },
    getList: function(pageNo) {
      //获取列表
      var vm = this;
      vm.postData.pageNo = pageNo;
      layer.load(2);
      staffList(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.listData = ret.data.staffList;
            for(var i in vm.listData) {
              const time = vm.listData[i].entry_date.slice(0,10)
              vm.listData[i].entry_date = time
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
    getUserList:function (pageNo) {
      //获取列表
      var vm = this;
      vm.userListData.pageNo = pageNo;
      layer.load(2);
      unboundUser(vm.userListData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.userList = ret.data.dataList;
            console.log(JSON.stringify(ret))
            laypage({
              //分页
              cont: "PageBar1", //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
              pages: ret.page.totalPages, //通过后台拿到的总页数
              curr: pageNo,
              skin: "#95C93E", //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
              jump: function(obj, first) {
                //触发分页后的回调
                if (!first) {
                  //一定要加此判断，否则初始时会无限刷新
                  vm.getUserList(obj.curr);
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
    showPopup: function(id) {
      // 展示弹出层
      var vm = this;
      vm.staff_id=id;
      vm.getUserList(1);
      vm.editPopup = 1;
    },
    closePopup: function() {
      // 隐藏弹出层
      var vm = this;
      vm.editPopup = 0;
    },
    delData: function(id) {
      //删除
      var vm = this;
      if (id) {
        vm.delList.staff_idList = [];
        vm.delList.staff_idList.push(id);
      } else {
        if (vm.delList.staff_idList.length == 0) {
          layer.msg("请至少选择一条数据！");
          return;
        } else {
          if (vm.delList.staff_idList.length > 1) {
            layer.msg("只能选择一条数据！");
            return;
          }
        }
      }
      layer.confirm(
        "确定删除？",
        {
          btn: ["确定", "取消"] //按钮
        },
        function() {
          layer.load(2);
          var delstr = vm.delList.staff_idList.join(",");
          staffDel({ staff_id: delstr })
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
        }
      );
    },
    checkAll: function() {
      //全选
      var vm = this;
      if (vm.allChecked) {
        for (var i = 0; i < vm.listData.length; i++) {
          vm.delList.staff_idList.push(vm.listData[i].staff_id);
        }
      } else {
        vm.delList.staff_idList = [];
      }
    },
    clickChange: function() {
      //监听input选中状态，控制全选input的选中
      var vm = this;
      if (vm.delList.staff_idList.length == vm.listData.length) {
        vm.allChecked = true;
      } else {
        vm.allChecked = false;
      }
    },
    bindUser:function (data) {
      var vm=this;
      staffbindUser({
        staff_id:vm.staff_id, 
        user_name:data.userName,
        user_pwd:data.password
      }).then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                layer.msg("绑定成功！");
                vm.closePopup();
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
    jumpEdit: function(id) {
      var vm = this;
      this.$router.push({
        name: "staffManageEdit",
        query: {
          id: id,
          //新增
          staff_id:vm.postData.staff_id,
          staff_name:vm.postData.staff_name,
          pageNo:vm.postData.pageNo
        }
      });
    },
    jumpDeparture: function(id) {
      var vm = this;
      this.$router.push({
        name: "staffManageDeparture",
        query: {
          id: id,
          //新增
          staff_id:vm.postData.staff_id,
          staff_name:vm.postData.staff_name,
          pageNo:vm.postData.pageNo
        }
      });
    },
    jumpDetail: function(id) {
      var vm = this;
      this.$router.push({
        name: "staffManageDetail",
        query: {
          id: id,
          //新增
          staff_id:vm.postData.staff_id,
          staff_name:vm.postData.staff_name,
          pageNo:vm.postData.pageNo
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
